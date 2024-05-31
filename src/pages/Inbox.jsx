// Corresponds to Task flow 8: View your journal in spec

import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

// Mock data for messages
const messages = [
    { id: 1, sender: 'JohnDoe', preview: 'Hey, how are you?', online: true, pastCalls: 3 },
    { id: 2, sender: 'JaneSmith', preview: 'Project update needed!', online: false, pastCalls: 1 }
];

function InboxPage() {
    const [selectedMessage, setSelectedMessage] = useState(null);

    const selectMessage = (message) => {
        setSelectedMessage(message);
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto' }}>
            {!selectedMessage ? (
                <List>
                    {messages.map((message) => (
                        <ListItem onClick={() => selectMessage(message)} key={message.id}>
                            <ListItemAvatar>
                                <Avatar>{message.sender[0]}</Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={message.sender} secondary={message.preview} />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Box>
                    <Typography variant="h5">Conversation with {selectedMessage.sender}</Typography>
                    <Typography variant="body1">Status: {selectedMessage.online ? 'Online' : 'Offline'}</Typography>
                    <Typography variant="body2">Past calls: {selectedMessage.pastCalls}</Typography>
                    <Button variant="contained" color="primary" component={Link} to="/deeptalk-invite">
                        Invite to DeepTalk
                    </Button>
                    <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setSelectedMessage(null)}>
                        Back to Inbox
                    </Button>
                </Box>
            )}
        </Box>
    );
}

export default InboxPage;
