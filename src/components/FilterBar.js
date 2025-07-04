import React from 'react';
import { Box, FormControl, Select, MenuItem, InputAdornment, OutlinedInput } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

export default function FilterBar({ dateRange, setDateRange, launchType, setLaunchType }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      {/* Date Range Filter */}
      <FormControl size="small" variant="outlined" sx={{ minWidth: 180 }}>
        <Select
          value={dateRange}
          onChange={e => setDateRange(e.target.value)}
          displayEmpty
          input={<OutlinedInput notched={false} startAdornment={<InputAdornment position="start"><CalendarTodayIcon fontSize="small" color="action" /></InputAdornment>} />}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            fontWeight: 500,
            fontSize: 15,
            pl: 0.5,
            background: 'transparent',
            boxShadow: 'none',
            borderRadius: 0,
          }}
        >
          <MenuItem value="6m">Past 6 Months</MenuItem>
          <MenuItem value="12m">Past 12 Months</MenuItem>
          <MenuItem value="all">All Time</MenuItem>
        </Select>
      </FormControl>
      {/* Launch Type Filter */}
      <FormControl size="small" variant="outlined" sx={{ minWidth: 180 }}>
        <Select
          value={launchType}
          onChange={e => setLaunchType(e.target.value)}
          displayEmpty
          input={<OutlinedInput
            notched={false}
            startAdornment={launchType === 'all' ? (
              <InputAdornment position="start">
                <FilterAltOutlinedIcon fontSize="small" color="action" />
              </InputAdornment>
            ) : null}
          />}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
            fontWeight: 500,
            fontSize: 15,
            pl: 0.5,
            background: 'transparent',
            boxShadow: 'none',
            borderRadius: 0,
          }}
        >
          <MenuItem value="all">All Launches</MenuItem>
          <MenuItem value="upcoming">Upcoming Launches</MenuItem>
          <MenuItem value="success">Successful Launches</MenuItem>
          <MenuItem value="failed">Failed Launches</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
} 