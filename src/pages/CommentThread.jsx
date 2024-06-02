import React, { useState } from 'react';
import { useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import NavBar from './Header';
import getThreads, { newComment } from "../models/Threads.js";

function CommentPage() {
  const { threadId } = useParams(); // This hooks fetch the thread ID from the URL
  const [thread, setThread] = useState(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  React.useEffect(() => void (async () => {
    const threads = await getThreads();
    const thread = threads[threadId];
    if (!thread) navigate("/");
    setThread(thread);
  })(), []);

  const handleSubmit = async () => {
    await newComment(thread, { content: comment });
    navigate(`/thread/${threadId}`);
  };

  return (
    <Container maxWidth="md">
      <NavBar />
      <Typography variant="h5">
        Comment on Thread: {thread?.title || ""}
      </Typography>
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
      <Button variant="contained" color="primary" disabled={!comment} onClick={handleSubmit}>
        Post Comment
      </Button>
      <Button variant="outlined" component={RouterLink} to={`/thread/${threadId}`} sx={{ mt: 2 }}>
        Cancel
      </Button>
    </Container>
  );
}

export default CommentPage;
