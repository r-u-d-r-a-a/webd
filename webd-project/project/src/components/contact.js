import React from 'react';
import Navbar from './navbar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Contact() {
  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'50px'}}>
      <Card sx={{ width: 745 }}>
      <CardHeader
        title="Contact us"
        
      />
     
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Phone Number: +1 123 456 7890
        </Typography>
        <Typography variant="body2" color="text.secondary">
         Email id: example@gmail.com
        </Typography>
      </CardContent>
     
    </Card>
    </div>
    </div>
  )
}
