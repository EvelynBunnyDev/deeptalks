import React, { useState } from 'react';
import { Container, Typography, Button, Box, AppBar, Tab, Tabs, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate user login state
    const [threads, setThreads] = useState([
        { 
            id: 1, 
            title: "Life After College", 
            content: "Discuss your experiences and future plans post-graduation." 
        },
        { 
            id: 2, 
            title: "Managing Stress", 
            content: "Share tips and strategies for managing daily stress." 
        }
    ]);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <Container maxWidth="lg">
            <AppBar position="static">
                <Tabs indicatorColor="secondary" textColor="inherit" variant="fullWidth">
                    <Tab label="Home" />
                    <Tab label="Profile" />
                    <Tab label="Settings" />
                </Tabs>
            </AppBar>
            <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={2}>
                {!isLoggedIn ? (
                    <Button onClick={handleLogin} variant="contained" color="primary">Log In</Button>
                ) : (
                    <Button onClick={handleLogout} variant="contained" color="secondary">Log Out</Button>
                )}

                <Box mt={3} width="100%">
                    {threads.map((thread) => (
                        <Paper key={thread.id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                            <Typography variant="h6">{thread.title}</Typography>
                            <Typography>{thread.content}</Typography>
                            {isLoggedIn && (
                                <Button component={Link} to={`/commenting`} sx={{ mt: 1 }}>
                                    Comment
                                </Button>
                            )}
                        </Paper>
                    ))}
                </Box>
                <Box>
                    { threads.length === 0 && <Typography variant="body1">No threads available.</Typography>}
                    {
                        threads.map((thread) => (
                            <Paper key={thread.id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                                <Typography variant="h6">{thread.title}</Typography>
                                <Typography>{thread.content}</Typography>
                                {true && (
                                    <Button component={Link} to={`/commenting`} sx={{ mt: 1 }}>
                                        Comment
                                    </Button>
                                )}
                            </Paper>
                        ))
                    }
                </Box>
            </Box>
        </Container>
    );
}

export default Home;
