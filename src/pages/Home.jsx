// Import necessary components from Material-UI, React Router, and local components
import React, { useState } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from './Header';
import Threads from './Threads'; 

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
  const [threads] = useState([
    {
      id: 1,
      title: "Life After College",
      content: "Discuss your experiences and future plans post-graduation."
    },
    {
      id: 2,
      title: "Managing Stress",
      content: "Share tips and strategies for managing daily stress."
    }
  ]);

  return (
    <Container maxWidth="lg">
      <NavBar />

      <TabPanel value={value} index={0}>
        <Typography variant="h4">Welcome to DeepTalks!</Typography>
        <Button variant="contained" component={Link} to="/create-thread" sx={{ mt: 2 }}>
          Throw a Thought
        </Button>

      </TabPanel>
      <TabPanel value={value} index={1}>
        <Threads /> {/* Render the Thread component */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* Other content if needed */}
        <Typography variant="h6">Additional Resources or Content</Typography>
      </TabPanel>

      <Box>
        {threads.length === 0 && <Typography variant="body1">No threads available.</Typography>}
        {
          threads.map((thread) => (
            <Paper key={thread.id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
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
