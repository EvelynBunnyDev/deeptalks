// Corresponds to Task flow 8: View your journal in spec

import React, { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import INVITES from "../models/invite.js";
import USERS from "../models/user.js";

// Mock data for messages
const messages = [
  { id: 1, sender: 1, preview: 'Hey, how are you?', online: true, pastCalls: 3 },
  { id: 2, sender: 2, preview: 'Project update needed!', online: false, pastCalls: 1 }
];

function InboxPage() {
  const [selectedMessage, setSelectedMessage] = useState(null);
  let [invite, setInvite] = useState(null);

  const selectMessage = (message) => {
    setSelectedMessage(message);
    if (message?.id === 1) setInvite(INVITES[1]);
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      {!selectedMessage ? (
        <List>
          {messages.map((message) => (
            <ListItem button onClick={() => selectMessage(message)} key={message.id}>
              <ListItemAvatar>
                <Avatar>{USERS[message.sender].pseudonym[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={USERS[message.sender].pseudonym} secondary={message.preview} />
            </ListItem>
          ))}
        </List>
      ) : (
        <Box>
          <Typography variant="h5">Conversation with {USERS[selectedMessage.sender].pseudonym}</Typography>
          <Typography variant="body1">Status: {selectedMessage.online ? 'Online' : 'Offline'}</Typography>
          <Typography variant="body2">Past calls: {selectedMessage.pastCalls}</Typography>
          {!invite ? (
            <Button variant="contained" color="primary" component={Link} to={`/profile/${selectedMessage.sender}?invite=1`}>
              Invite to DeepTalk
            </Button>
          ) : (
            <Box>
              <Typography variant="h6">Invitation to DeepTalk</Typography>
              <Typography>Topics: {invite.topics.join(", ")}</Typography>
              <Typography>message: {invite.message}</Typography>
              <Button variant="contained" color="primary" component={Link} to={`/deeptalk/${invite.id}`}>
                Accept
              </Button>
              <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setSelectedMessage(null)}>
                Decline
              </Button>
            </Box>
          )}
        <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setSelectedMessage(null)}>
          Back to Inbox
        </Button>
        </Box>
      )}
    </Box>
  );
}

export default InboxPage;
