import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function IconeCarregando({tam, sx}:{tam?:number, sx?:any}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={tam} sx={sx}/>
    </Box>
  );
}
