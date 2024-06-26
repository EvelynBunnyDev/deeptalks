import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './Header';

import Auth from "../models/Auth.js";
import getThreads from "../models/Threads.js";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [threads, setThreads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => void (async () => {
    const [user, threads] = await Promise.all([Auth.check(), getThreads()]);
    setCurrentUser(user);
    setThreads(Object.values(threads));
    setLoading(false);
  })(), []);

  return (
    <Container maxWidth="lg">
      <NavBar />
      <Typography variant="h4">Welcome to DeepTalks!</Typography>

      {currentUser &&
      <Button variant="contained" component={Link} to="/create-thread" sx={{ mt: 2 }}>
        Throw a Thought
      </Button>}

      {loading ? <Typography>Loading...</Typography> :
      <Box>
        {threads.length === 0 && <Typography variant="body1">No threads available.</Typography>}
        {
          threads.map((thread) => (
            <Paper key={thread._id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}
            >
              <div 
                onClick={() => {
                  navigate(`/thread/${thread._id}`);
                }}
                style={{
                  height: '100%',
                }}
              >
                <Typography variant="h6">{thread.title}</Typography>
                <Typography>{thread.content}</Typography>
              </div>
            </Paper>
          ))
        }

      <Typography variant="h4">Want to speak with a moderator or provide feedback? Email deeptalks.stanford@gmail.com</Typography>

      </Box>}
    </Container>
  );
}
