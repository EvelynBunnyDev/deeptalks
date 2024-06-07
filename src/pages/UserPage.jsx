import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Container, Button } from '@mui/material';

import { USERS } from "../configs/users";
import { useNavigate, useParams } from "react-router-dom";
import { blue } from "@mui/material/colors";
import NavBar from "./Header";
import { useUserStatus } from "../contexts/userCallContext";

export function UserPage() {
  const id = useParams().userId;
  const user = USERS[id];
  const mainContext = useUserStatus();

  const { initiateCallStatus, setInitiateCallStatus } = mainContext;

  function handleInitiateCall() {
    console.log('Initiating call...');
    setInitiateCallStatus(1);

    // @TODO: Implement the call initiation logic here for backend
  }

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
            <Avatar sx={{ width: 120, height: 120, mb: 2, bgcolor: blue[500] }} src="https://avatar.iran.liara.run/public">
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
              {initiateCallStatus === 0 ? (
                <Button variant="contained" color="primary" onClick={handleInitiateCall}>
                  Connect
                </Button>) : (
                <Button variant="contained" color="primary" disabled>
                  Connecting...
                </Button>
              )
              }
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
    <>
      <NavBar />
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
    </>
  );
}


