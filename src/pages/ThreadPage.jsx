import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Typography, Card, CardContent, Grid, Button } from "@mui/material";  // Import Button from MUI
import { THREADS } from "../configs/threads";
import NavBar from "./Header";
import { getUser } from "../configs/users";
import { UserAvatar } from "./UserPage";

export default function ThreadPage() {
  const { threadId } = useParams();
  const curThread = THREADS[parseInt(threadId)];

  return (
    <>
      <NavBar />
      <Grid container spacing={2} direction="column" sx={{ p: 4 }}>
        <Grid container spacing={2} direction="row">
          <Grid item>
            <UserAvatar id={curThread.author_id} />
          </Grid>
          <Grid item spacing={2}>
            <Typography variant="h3" component="h1">
              {curThread.title}
            </Typography>
            <Typography variant="body1" paragraph>
              {curThread.content}
            </Typography>
            {/* Add Button to navigate to commenting page */}
            <Button
              component={RouterLink}
              to={`/commenting/${threadId}`}
              variant="contained"
              color="primary"
              sx={{ mb: 2 }}  // Style as needed
            >
              Comment
            </Button>
          </Grid>

        </Grid>
        {curThread.comments && curThread.comments.length > 0 && (
          <Grid item>
            <Typography variant="h4" component="h2">
              Comments
            </Typography>
            {curThread.comments.map((comment, index) => {
              if (comment.content.trim() !== "") { // Checks if comment content is not just empty spaces
                const author = getUser(comment.author_id);
                return (
                  <Card key={index} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="subtitle1">
                        Author: <a href={`/profile/${author.id}`}>{author.name}</a>
                      </Typography>
                      <Typography variant="body2">
                        {comment.content}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              }
              return null; // Return null if the comment is empty, thus not rendering anything
            })}
          </Grid>
        )}
      </Grid>
    </>
  );
}
