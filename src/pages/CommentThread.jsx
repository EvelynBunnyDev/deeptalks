import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import NavBar from './Header';

function CommentPage() {
  const { threadId } = useParams(); // This hooks fetch the thread ID from the URL
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    console.log(`Post Comment: ${comment} on Thread ID: ${threadId}`);
    // Here you would typically send the comment to the backend
    navigate(`/thread/${threadId}`);
  };

  return (
    <Container maxWidth="md">
      <NavBar />
      <Typography variant="h5">Comment on Thread: {threadId}</Typography>
      <TextField
        label="Your Comment"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={comment}
        onChange={handleInputChange}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Post Comment
      </Button>
    </Container>
  );
}

export default CommentPage;
