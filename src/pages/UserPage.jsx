import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Container, Button } from '@mui/material';

import { USERS } from "../configs/users";
import { useNavigate, useParams } from "react-router-dom";
import { blue } from "@mui/material/colors";
import NavBar from "./Header";
import { useUserStatus } from "../contexts/userCallContext";

import Api from "../models/Api.js";

//list of zoom links for use (probably backend)
//var zoomLinks = Array.of("https://stanford.zoom.us/j/91441772945?pwd=3fpTQrifETgGZInxsxgMLYjBobD7aX.1", "https://stanford.zoom.us/j/95765989080?pwd=AVmO4X3eVNbN3P638oWhzl7GF5aj0Z.1", "https://stanford.zoom.us/j/99865906156?pwd=RsZRyeTJdokNqooqN6ozJ7IsE8dfEK.1", "https://stanford.zoom.us/j/94177491497?pwd=vPNkV9ua0Ls8zS8e81cgQptAAQ1ctp.1"};

export function UserPage() {
  const id = useParams().userId;
  const user = USERS[id];
  const mainContext = useUserStatus();

  const { initiateCallStatus, setInitiateCallStatus } = mainContext;

async  function handleInitiateCall() {
    console.log('Initiating call...');
    setInitiateCallStatus(1);

    alert("Our team is currently fixing up voice chat functionality! please text DeepTalks member Gene S-H Kim who you'd like to chat with at (650) 660-5475 or email gene.sh.kim@stanford.edu so he can facilitate. Thanks for your patience!"); //if simulating



//Back-end stores all call requests made when pressing the "connect" button.
//Each time connect button is pressed, system checks if there is a mutual invite (i.e. person B clicks connect to person A. Mutual invite exists if person A had requested to connect with person B based on info in database)
//If mutual invite exists, alert with new zoom link for person B. person A gets sent push notification with same zoom link.
//If no mutual invite, just posts request to database and alerts user.

    try {
      // Check if there's a pending invite from this user
      const response = await Api.req('GET', '/invites');
      const invites = response.invites;
      const mutualInvite = invites.find(invite => invite.sender_id === id);

      if (mutualInvite) {
        alert("This person also requested to chat with you! Join using the following zoom link: " + "todo backend for non-overlap");
      } else {
        // If no mutual invite, create/store new invite
        const inviteResponse = await api.req('POST', '/invites', {
          message: 'Would you like to chat?',
          recipient: id, 
          topics: ['General']
        });

          alert("Voice chat request sent! We'll send you a notification when the other person requests to connect.");
 
      }
    } catch (error) {
      console.error('Error initiating call:', error);
    }
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


