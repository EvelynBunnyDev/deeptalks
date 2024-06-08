import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './Header';


export default function NormsPage() {  
return (
    <Container component="main" maxWidth="md">
      <NavBar />
      <Typography variant="h4" sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
        Community Norms
      </Typography> 
        <Box>
          <Typography mb={4}>
            When using DeepTalks, you agree to the following rules to ensure a safe, respectful, and engaging environment for all users:
          </Typography>
          <Typography mb={2}><b>Show Respect and Kindness:</b> Treat others with respect and kindness. Harassment, bullying, and hate speech are strictly prohibited.</Typography>
          <Typography mb={2}><b>Post Authentic Content:</b> Share genuine content. Do not spread misinformation or impersonate other members of the Stanford community.</Typography>
          <Typography mb={2}><b>Maintain Privacy:</b> Respect the privacy of others. Do not share personal or confidential information without consent. Posting or threatening to post intimate or sexually explicit media without consent is prohibited.</Typography>
          <Typography mb={2}><b>Adhere to Legal Standards:</b> Do not post or engage in illegal activities, including sharing obscene content or facilitating prohibited transactions.</Typography>
          <Typography mb={2}><b>Community Engagement:</b> Engage authentically with communities. Avoid spamming, vote manipulation, or any behavior that disrupts the platform's normal use.</Typography>
          <Typography mb={4}>
            <b>Disclaimer:</b> DeepTalks is not a mental health platform. Users are not trained in mental health topics. For your well-being, please refer to campus mental health resources available here:  
            <Link href="https://studentaffairs.stanford.edu/mental-health-resources-stanford" target="_blank">Mental Health Resources at Stanford</Link>
          </Typography>
        </Box>
</Container>
  );
}
