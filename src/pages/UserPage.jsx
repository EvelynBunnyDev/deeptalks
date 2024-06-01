import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Container, Button } from '@mui/material';

import { USERS } from "../configs/users";
import { useNavigate, useParams } from "react-router-dom";
import { blue } from "@mui/material/colors";

export function UserPage() {
  const id = useParams().userId;
  const user = USERS[id];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `url('https://source.unsplash.com/random/1920x1080?nature,water') no-repeat center center fixed`,
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container component="main" maxWidth="sm">
        <Card sx={{ opacity: 0.9 }}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ width: 120, height: 120, mb: 2, bgcolor: blue[500] }} src="https://i.pravatar.cc/300">
              ES
            </Avatar>
            <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
              {user.name}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              {user.status}
              {user.status === 'online' ? (
                <span style={{ color: 'green', marginLeft: '10px' }}>●</span>
              ) : (
                <span style={{ color: 'red', marginLeft: '10px' }}>●</span>
              )}
            </Typography>
            <Typography variant="body1" align="center" sx={{ mb: 1 }}>
              {user.description}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              {user.email}
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color="primary">
                Connect
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export function UserAvatar(props) {
  const id = props.id;
  const user = USERS[id];

  const navigate = useNavigate();

  // profile photo with name
  return (
    <div
      onClick={() => { navigate('/profile/' + id) }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '10px 50px 0',
      }}
    >
      <img
        src={user.profile_pic} alt="profile"
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          marginBottom: '10px'
        }}

      />
      <Typography>{user.name}</Typography>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {user.status}
        {user.status === 'online' ? (
          <span style={{ color: 'green', marginLeft: '10px' }}>●</span>
        ) : (
          <span style={{ color: 'red', marginLeft: '10px' }}>●</span>
        )}
      </Typography>
    </div>
  );
}

