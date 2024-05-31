// Corresponds to Task flow 2: Create a thread in spec
import React, { useState } from 'react';
import { Container, TextField, Button, AppBar, Tabs, Tab, Box, Typography } from '@mui/material';
import NavBar from './Header';
import { useNavigate } from 'react-router-dom';

function CreateThreadPage() {
    const [value, setValue] = useState(0);
    const [thread, setThread] = useState({ title: '', content: '', tags: '' });
    const [showThread, setShowThread] = useState(false);
    const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setThread(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    // Assuming a function to send data to backend or state management
    console.log(thread); // TODO: replace this with our backend logic
    setShowThread(true);
  };

    const handleBack = () => {
        setShowThread(false);
        navigate('/')
    };

    return (
        <Container maxWidth="md">
            <NavBar />
            {!showThread ? (
                <Box>
                    <TextField
                        label="Thread Title"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="title"
                        value={thread.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        multiline
                        rows={4}
                        fullWidth
                        margin="normal"
                        name="content"
                        value={thread.content}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Tags"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name="tags"
                        value={thread.tags}
                        onChange={handleInputChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Throw a Thought
                    </Button>
                    <Button variant="outlined" onClick={handleBack} sx={{ mt: 2 }}>
                        Cancel
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Typography variant="h5">{thread.title}</Typography>
                    <Typography paragraph>{thread.content}</Typography>
                    <Typography color="textSecondary">Tags: {thread.tags}</Typography>
                    <Button variant="contained" onClick={handleBack}>
                        Back to Home
                    </Button>
                </Box>
            )}
        </Container>
    );
}

export default CreateThreadPage;
