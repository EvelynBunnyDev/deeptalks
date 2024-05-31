// Import necessary components from Material-UI, React Router, and local components
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Paper, THEME_ID } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './Header';
import Threads from './Threads'; 
import { THREADS } from '../configs/threads';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Home() {
  const [value] = useState(0);
  const [threads] = useState(THREADS);
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <NavBar />

      <TabPanel value={value} index={0}>
        <Typography variant="h4">Welcome to DeepTalks!</Typography>
        <Button variant="contained" component={Link} to="/create-thread" sx={{ mt: 2 }}>
          Throw a Thought
        </Button>

      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* Other content if needed */}
        <Typography variant="h6">Additional Resources or Content</Typography>
      </TabPanel>

      <Box>
        {threads.length === 0 && <Typography variant="body1">No threads available.</Typography>}
        {
          threads.map((thread) => (
            <Paper key={thread.id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}
              onClick={() => {
                navigate(`/thread/${thread.id}`);
              }}
            >
              <Typography variant="h6">{thread.title}</Typography>
              <Typography>{thread.content}</Typography>
              {true && (
                <Button component={Link} to={`/commenting`} sx={{ mt: 1 }}>
                  Comment
                </Button>
              )}
            </Paper>
          ))
        }
      </Box>
    </Container>
  );
}
