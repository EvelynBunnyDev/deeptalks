import React, { useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Typography, Card, CardContent, Container, Grid, Button, TextField } from "@mui/material";
import NavBar from "./Header";
import Link from "../components/Link";

import Auth from "../models/Auth.js";
import getThreads, { newComment } from "../models/Threads.js";
import getUsers from "../models/Users.js";

export default function ThreadPage() {
  const { threadId } = useParams();
  const [thread, setThread] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);
  const [comment, setComment] = useState('');

  const handleInputChange = (event) => {
    setComment(event.target.value);
  };

  const reload = async () => {
    const [user, users, threads] = await Promise.all([Auth.check(), getUsers(), getThreads()]);
    setCurrentUser
    (user);
    setUsers(users);
    const thread = threads[threadId];
    if (!thread) return;
    setThread(thread);
  };

  const handleSubmit = async () => {
    await newComment(thread, { content: comment });
    setComment('');  // Clear the comment input field after submission
    await reload();
  };

  React.useEffect(() => void (async () => {
    await reload();
  })(), []);

  return (
    <Container maxWidth="lg">
      <NavBar />
      {!thread ? <Typography>Loading...</Typography> :
      <Grid container spacing={2} direction="column" sx={{ p: 4 }}>
        <Grid container spacing={2} direction="row">
          <Grid item spacing={2}>
            <Typography variant="h3" component="h1">
              {thread.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {thread.content}
            </Typography>
            <Typography variant="body1" paragraph>
              Author: <Link to={`/profile/${thread.author_id}`}>{users[thread.author_id].pseudonym}</Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h4" component="h2">
            Comments
          </Typography>
          {thread.comments.map((comment, index) => {
            const author = users[comment.author_id];
            return (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="subtitle1">
                    Author: <Link to={`/profile/${author._id}`}>{author.pseudonym}</Link>
                  </Typography>
                  <Typography variant="body2">
                    {comment.content}
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
          {currentUser && <>
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
          <Button
            variant="contained"
            color="primary"
            disabled={!comment}
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Post Comment
          </Button>
          </>}
        </Grid>
      </Grid>}
    </Container>
  );
}
