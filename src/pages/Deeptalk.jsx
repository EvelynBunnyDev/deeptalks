import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem,
  FormControlLabel, Radio, RadioGroup, TextField, Typography
} from '@mui/material';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import INVITES from "../models/invite.js";
import USERS from "../models/user.js";

export default function Profile() {
  const { inviteId } = useParams();
  const invite = INVITES[inviteId];
  const sender = USERS[invite.sender];
  const recipient = USERS[invite.recipient];

  const [callStatus, setCallStatus] = useState(0);
  const [feedbackType, setFeedbackType] = useState("positive");
  const [feedback, setFeedback] = useState("");

  const navigate = useNavigate();
  const handleFeedback = submit => {
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5">DeepTalk between {sender.pseudonym} and {recipient.pseudonym}</Typography>
      <Typography>Topics: {invite.topics.join(", ")}</Typography>
      <Box>
        {/* TODO: Discord/Zoom avatar */}
        <List sx={{ listStypeType: "disc" }}>
          <ListItem>(Optional) Conversation starter questions</ListItem>
          <ListItem>Remember to communicate any boundaries and ask for consent. Consider sentences like "I'm comfortable discussing ___. I'm not comfortable discussing ___. Is there anything you aren't comfortable talking about?"</ListItem>
          <ListItem>Reminder: Our community norms: 1. Active listening, respect, kindness... 2. Not a mental health app...</ListItem>
        </List>
      </Box>
      <Button variant="contained" color="primary" onClick={() => setCallStatus(1)}>
        Invite to DeepTalk
      </Button>
      <Dialog open={callStatus === 1}>
        <DialogTitle>DeepTalk between {sender.pseudonym} and {recipient.pseudonym}</DialogTitle>
        <DialogContent>
          <DialogContentText>Zoom or Discord</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCallStatus(2)}>Finished Call</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={callStatus === 2} onClose={() => handleFeedback(false)}>
        <DialogTitle>Share Your Feedback</DialogTitle>
        <DialogContent>
          <RadioGroup row value={feedbackType} onChange={e => setFeedbackType(e.target.value)}>
            <FormControlLabel
              control={<Radio/>} value="positive"
              label="Positive"
            />
            <FormControlLabel
              control={<Radio/>} value="negative"
              label="Negative"
            />
          </RadioGroup>
          <TextField
              margin="dense"
              label="Your Feedback"
              type="text"
              fullWidth
              variant="outlined"
              value={feedback}
              onChange={e => setFeedback(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleFeedback(false)}>Skip</Button>
          <Button onClick={() => handleFeedback(true)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};