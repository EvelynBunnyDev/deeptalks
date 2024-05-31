import React from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Typography, Card, CardContent, Grid } from "@mui/material";
import { THREADS } from "../configs/threads";

export default function ThreadPage() {
  const { threadId } = useParams();
  const curThread = THREADS[parseInt(threadId)];

  return (
    <Grid container spacing={2} direction="column" sx={{ p: 4 }}>
      <Grid item>
        <Typography variant="h3" component="h1">
          {curThread.title}
        </Typography>
        <Typography variant="body1" paragraph>
          {curThread.content}
        </Typography>
      </Grid>
      {curThread.comments && curThread.comments.length > 0 && (
        <Grid item>
          <Typography variant="h4" component="h2">
            Comments
          </Typography>
          {curThread.comments.map((comment, index) => {
            if (comment.content.trim() !== "") { // Checks if comment content is not just empty spaces
              return (
                <Card key={index} sx={{ mb: 2 }}>
                  <CardContent>
                    <Typography variant="subtitle1">
                      Author: <RouterLink to={`/profile/${comment.author}`}>{comment.author}</RouterLink>
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
  );
}
