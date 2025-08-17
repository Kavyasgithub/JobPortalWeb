import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingBox = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '500px' }}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingBox;