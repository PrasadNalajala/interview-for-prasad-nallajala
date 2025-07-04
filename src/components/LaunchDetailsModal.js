import React from 'react';
import {
  Dialog, DialogContent, IconButton, Typography, Chip, Box, Link, useMediaQuery
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LanguageIcon from '@mui/icons-material/Language';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { useTheme } from '@mui/material/styles';
import dummyRocket from '../assets/rocket.png';

const statusColor = {
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
  });
}

const detailsFields = [
  { label: 'Flight Number', get: l => l.flight_number || '-' },
  { label: 'Mission Name', get: l => l.name },
  { label: 'Rocket Type', get: l => l.rocket?.type || '-' },
  { label: 'Rocket Name', get: l => l.rocket?.name || '-' },
  { label: 'Manufacturer', get: l => l.rocket?.company || 'SpaceX' },
  { label: 'Nationality', get: l => l.rocket?.country || 'SpaceX' },
  { label: 'Launch Date', get: l => formatDate(l.date_utc) },
  { label: 'Payload Type', get: l => l.payloads?.[0]?.type || '-' },
  { label: 'Orbit', get: l => l.payloads?.[0]?.orbit || '-' },
  { label: 'Launch Site', get: l => l.launchpad?.name || '-' },
];

export default function LaunchDetailsModal({ open, onClose, launch }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  if (!launch) return null;
  const patch = launch.links?.patch?.large || launch.links?.patch?.small;
  const wiki = launch.links?.wikipedia;
  const webcast = launch.links?.webcast;
  const youtube = launch.links?.youtube_id ? `https://youtube.com/watch?v=${launch.links.youtube_id}` : null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogContent sx={{ p: { xs: 2, sm: 4 }, maxWidth: '100vw', width: '100%', mx: 'auto', overflowX: 'hidden' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexDirection: { xs: 'column', sm: 'row' }, mb: 2, overflowX: 'hidden', width: '100%' }}>
          <Box sx={{ minWidth: 72, maxWidth: 90, flexShrink: 0, alignSelf: 'flex-start', mt: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={patch || dummyRocket} alt={launch.name} style={{ width: '100%', borderRadius: 8, background: '#f4f4f4', objectFit: 'contain', maxWidth: '100%' }} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0, overflowX: 'hidden', width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 0.5 }}>
              <Typography variant="h6" fontWeight={600} sx={{ mr: 1, fontSize: 20 }}>{launch.name}</Typography>
              <Chip
                label={getStatus(launch)}
                sx={{
                  fontWeight: 600,
                  borderRadius: 999,
                  px: 2.5,
                  bgcolor: statusColor[getStatus(launch)].bgcolor,
                  color: statusColor[getStatus(launch)].color,
                  fontSize: 15,
                  letterSpacing: 0.2,
                  boxShadow: 'none',
                  height: 32,
                  minWidth: 90,
                  justifyContent: 'center',
                }}
                size="small"
              />
            </Box>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 0.5, mb: 1, fontSize: 16 }}>
              {launch.rocket?.name || '-'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, mb: 1 }}>
              {wiki && <IconButton component={Link} href={wiki} target="_blank" rel="noopener" size="small"><LanguageIcon /></IconButton>}
              {webcast && <IconButton component={Link} href={webcast} target="_blank" rel="noopener" size="small"><LiveTvIcon /></IconButton>}
              {youtube && <IconButton component={Link} href={youtube} target="_blank" rel="noopener" size="small"><YouTubeIcon /></IconButton>}
            </Box>
          </Box>
          <IconButton onClick={onClose} sx={{ ml: 'auto', alignSelf: { xs: 'flex-end', sm: 'flex-start' } }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {launch.details && (
          <Typography variant="body1" sx={{ mt: 1, mb: 3, color: 'text.primary', lineHeight: 1.7, fontSize: 15 }}>
            {launch.details} {wiki && <Link href={wiki} target="_blank" rel="noopener">Wikipedia</Link>}
          </Typography>
        )}
        <Box sx={{ mt: 2, overflowX: 'hidden', width: '100%' }}>
          {detailsFields.map(field => (
            <Box key={field.label} sx={{ mb: 1.5, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F3F4F6', pb: 1, overflowX: 'hidden', width: '100%' }}>
              <Typography variant="body2" color="text.secondary" sx={{ minWidth: 140, maxWidth: '50vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{field.label}</Typography>
              <Typography variant="body1" sx={{ fontWeight: 500, fontSize: 15, maxWidth: '50vw', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'right' }}>{field.get(launch)}</Typography>
            </Box>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
} 