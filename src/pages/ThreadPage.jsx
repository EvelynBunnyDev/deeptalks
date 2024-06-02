import React from "react";
import { useNavigate, useParams, Link as RouterLink } from "react-router-dom";
import { Typography, Card, CardContent, Container, Grid, Button } from "@mui/material";  // Import Button from MUI
import NavBar from "./Header";
import Link from "../components/Link";

import Auth from "../models/Auth.js";
import getThreads from "../models/Threads.js";
import getUsers from "../models/Users.js";

export default function ThreadPage() {
  const { threadId } = useParams();
  const [thread, setThread] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => void (async () => {
    const [user, users, threads] = await Promise.all([Auth.check(), getUsers(), getThreads()]);
    setCurrentUser(user);
    setUsers(users);
    const thread = threads[threadId];
    if (!thread) navigate("/");
    setThread(thread);
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
            {/* Add Button to navigate to commenting page */}
            {currentUser && <Button
              component={RouterLink}
              to={`/commenting/${threadId}`}
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}  // Style as needed
            >
              Comment
            </Button>}
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
        </Grid>
      </Grid>}
    </Container>
  );
}
