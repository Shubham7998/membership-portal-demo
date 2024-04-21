import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
    sx={{
        position: 'absolute', 
        bottom: 0,
        left: 0,
        width: '100%',
        bgcolor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        padding: 1, 
        zIndex: 1, 
      }}
    >
      <Typography variant="body2" component="p">
        &copy; {new Date().getFullYear()} Made with 💪❤️ by Mr ?. All rights reserved.
      </Typography>
      <Typography variant="body2" component="p">
        Embrace the grind. Become your best.
      </Typography>
    </Box>
  );
};

export default Footer;
