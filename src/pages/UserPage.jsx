import React from "react";
import { Card, CardContent, Typography, Avatar, Box, Container, Button } from '@mui/material';

import { useNavigate, useParams } from "react-router-dom";
import { blue } from "@mui/material/colors";
import NavBar from "./Header";

import { CallContext } from "./CallPage.jsx";
import Api from "../models/Api.js";
import Auth from "../models/Auth.js";
import getUsers from "../models/Users.js";

export function UserPage() {
  const id = useParams().userId;
  const [cur, setCur] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const [callStatus, setCallStatus] = React.useContext(CallContext);

  React.useEffect(() => void (async () => {
    const [cur, users] = await Promise.all([Auth.check(), getUsers()]);
    setCur(cur);
    const user = users[id ?? cur?._id];
    if (!user) navigate("/");
    setUser(user);
  })(), [id, navigate]);

  async function handleInitiateCall() {
    setCallStatus("init", user.pseudonym);
    await Api.req('POST', '/invites', {
      message: 'Would you like to chat?',
      recipient: user._id
    });
  }

  return (
    <Container maxWidth="md">
      <NavBar/>
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
        {user && <Container component="main" maxWidth="sm">
          <Card sx={{ opacity: 0.9 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar sx={{ width: 120, height: 120, mb: 2, bgcolor: blue[500] }} src="https://avatar.iran.liara.run/public">
                ES
              </Avatar>
              <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                {user.pseudonym}
              </Typography>
              <Typography variant="body1" align="center" sx={{ mb: 1 }}>
                {user.bio}
              </Typography>
              {user.interest && <Typography variant="body1" align="center" sx={{ mb: 1 }}>
                <strong>Interested In:</strong> {user.interest === "firstExperiences" ? "First Experiences" : "Graduation Thoughts"}
              </Typography>}
              {user.personalityType && <Typography variant="body1" align="center" sx={{ mb: 1 }}>
                <strong>Personality Type:</strong> {user.personalityType}
              </Typography>}
              {cur && <Box sx={{ mt: 3 }}>
                <Button variant="contained" color="primary" disabled={callStatus != null} onClick={handleInitiateCall}>
                  Connect
                </Button>
              </Box>}
            </CardContent>
          </Card>
        </Container>}
      </Box>
    </Container>
  );
}
