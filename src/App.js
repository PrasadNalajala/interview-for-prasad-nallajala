import * as React from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Typography, Box, Toolbar } from '@mui/material';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import FilterBar from './components/FilterBar';
import { useState } from 'react';
import LaunchesTable from './components/LaunchesTable';
import useLaunches from './hooks/useLaunches';
import LaunchDetailsModal from './components/LaunchDetailsModal';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#005288', // SpaceX blue
    },
    secondary: {
      main: '#e53935', // Accent color
    },
    background: {
      default: '#f4f6f8',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  const [dateRange, setDateRange] = useState('all');
  const [launchType, setLaunchType] = useState('all');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const { launches, loading, error, pageCount } = useLaunches({ page, limit, dateRange, launchType });
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRowClick = (launch) => {
    setSelectedLaunch(launch);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedLaunch(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Toolbar />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <FilterBar
          dateRange={dateRange}
          setDateRange={setDateRange}
          launchType={launchType}
          setLaunchType={setLaunchType}
        />
        <LaunchesTable
          launches={launches}
          loading={loading}
          page={page}
          pageCount={pageCount}
          onPageChange={setPage}
          onRowClick={handleRowClick}
        />
        <LaunchDetailsModal
          open={modalOpen}
          onClose={handleModalClose}
          launch={selectedLaunch}
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
