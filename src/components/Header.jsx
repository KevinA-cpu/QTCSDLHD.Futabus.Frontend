import React from 'react';
import { Typography, AppBar, Toolbar } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>Header</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
