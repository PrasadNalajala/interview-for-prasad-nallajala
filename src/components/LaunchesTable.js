import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Pagination, Box, CircularProgress, Typography
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const statusStyles = {
  Success: {
    bgcolor: '#DEF7EC',
    color: '#03543F',
  },
  Failed: {
    bgcolor: '#FDE2E1',
    color: '#981B1C',
  },
  Upcoming: {
    bgcolor: '#FEF3C7',
    color: '#92400F',
  },
};

function getStatus(launch) {
  if (launch.upcoming) return 'Upcoming';
  if (launch.success) return 'Success';
  return 'Failed';
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleString('en-GB', {
    day: '2-digit', month: 'long', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'UTC'
  }).replace(',', ' at');
}

export default function LaunchesTable({ launches = [], loading = false, page = 1, pageCount = 10, onPageChange, onRowClick }) {
  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer sx={{ boxShadow: 'none', borderRadius: 0, background: 'transparent' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: '#4B5563', fontWeight: 600 }}>No:</TableCell>
              <TableCell sx={{ color: '#4B5563', fontWeight: 600 }}>Launched (UTC)</TableCell>
              <TableCell sx={{ color: '#4B5563', fontWeight: 600 }}>Location</TableCell>
              <TableCell sx={{ color: '#4B5563', fontWeight: 600 }}>Mission</TableCell>
              <TableCell sx={{ color: '#4B5563', fontWeight: 600 }}>Orbit</TableCell>
              <TableCell sx={{ color: '#4B5563', fontWeight: 600 }}>Launch Status</TableCell>
              <TableCell sx={{ color: '#4B5563', fontWeight: 600 }}>Rocket</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box sx={{ py: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ position: 'relative', width: 64, height: 64, mb: 2 }}>
                      <CircularProgress size={64} thickness={4} sx={{ color: '#1976d2', position: 'absolute', top: 0, left: 0 }} />
                      <RocketLaunchIcon sx={{
                        fontSize: 40,
                        color: '#1976d2',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        animation: 'spin 1.2s linear infinite',
                      }} />
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2, color: '#1976d2', fontWeight: 500 }}>Loading launches...</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : launches.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Box sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">No launches found.</Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              launches.map((launch, idx) => (
                <TableRow key={launch.id} hover sx={{ cursor: 'pointer' }} onClick={() => onRowClick && onRowClick(launch)}>
                  <TableCell sx={{ color: '#1F2937' }}>{String((page - 1) * launches.length + idx + 1).padStart(2, '0')}</TableCell>
                  <TableCell sx={{ color: '#1F2937' }}>{formatDate(launch.date_utc)}</TableCell>
                  <TableCell sx={{ color: '#1F2937' }}>{launch.launchpad?.name || launch.launchpad || '-'}</TableCell>
                  <TableCell sx={{ color: '#1F2937' }}>{launch.name}</TableCell>
                  <TableCell sx={{ color: '#1F2937' }}>{launch.payloads?.[0]?.orbit || '-'}</TableCell>
                  <TableCell>
                    <Chip
                      label={getStatus(launch)}
                      sx={{
                        fontWeight: 600,
                        borderRadius: 999,
                        px: 2.5,
                        bgcolor: statusStyles[getStatus(launch)].bgcolor,
                        color: statusStyles[getStatus(launch)].color,
                        fontSize: 15,
                        letterSpacing: 0.2,
                        boxShadow: 'none',
                        height: 32,
                        minWidth: 90,
                        justifyContent: 'center',
                      }}
                      size="small"
                    />
                  </TableCell>
                  <TableCell sx={{ color: '#1F2937' }}>{launch.rocket?.name || '-'}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
        <Pagination
          count={pageCount}
          page={page}
          onChange={(_, value) => onPageChange && onPageChange(value)}
          color="primary"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}

if (typeof window !== 'undefined' && !document.getElementById('rocket-spin-keyframes')) {
  const style = document.createElement('style');
  style.id = 'rocket-spin-keyframes';
  style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
  document.head.appendChild(style);
} 