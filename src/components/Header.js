import React from 'react';
import { AppBar, Toolbar, Box } from '@mui/material';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ boxShadow: 'none', background: 'transparent', overflow: 'hidden', width: '100%' }}>
      <Toolbar sx={{ justifyContent: 'center', minHeight: 72, overflow: 'hidden', px: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', overflow: 'hidden' }}>
          <img src={logo} alt="SpaceX" style={{ height: 40, maxWidth: '100%', display: 'block' }} />
        </Box>
      </Toolbar>
    </AppBar>
  );
} 