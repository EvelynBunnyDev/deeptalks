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
      <Grid item>
        <Typography variant="h4" component="h2">
          Comments
        </Typography>
        {curThread.comments.map((comment, index) => (
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
        ))}
      </Grid>
    </Grid>
  );
}
