import React, { useState } from 'react';
import { Container, TextField, Button, AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import NavBar from './Header';
import { Link, useNavigate } from 'react-router-dom';

import Auth from "../models/Auth.js";
import { newThread } from "../models/Threads.js";

function CreateThreadPage() {
  const [thread, setThread] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  React.useEffect(() => void (async () => {
    await Auth.require(navigate);
  })(), []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setThread(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { _id } = await newThread(thread);
    navigate(`/thread/${_id}`);

  };

  return (
    <Container maxWidth="md">
      <NavBar />
      <Box>
        <TextField
            label="Thread Title"
            variant="outlined"
            fullWidth
            margin="normal"
            name="title"
            value={thread.title}
            required
            onChange={handleInputChange}
        />
        <TextField
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            name="content"
            value={thread.content}
            onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" disabled={!thread.title} onClick={handleSubmit}>
          Throw a Thought
        </Button>
        <Button variant="outlined" component={Link} to="/" sx={{ mt: 2 }}>
          Cancel
        </Button>
      </Box>
    </Container>
  );
}

export default CreateThreadPage;
