import {
  Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  FormControlLabel, FormGroup, TextField, Typography
} from '@mui/material';
import { useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import USERS from "../models/user.js";

export default function Profile() {
  const { userId } = useParams();
  const [query, setQuery] = useSearchParams();
  const invite = query.has("invite");
  const user = USERS[userId];

  const handleClose = () => {
    query.delete("invite");
    setQuery(query);
  };

  const [inviteTopics, setInviteTopics] = useState([]);
  const handleTopic = (e, t) => {
    if (e.target.checked) {
      setInviteTopics([...inviteTopics, t]);
    } else {
      inviteTopics.splice(inviteTopics.indexOf(t), 1);
      setInviteTopics([...inviteTopics]);
    }
  };

  const [message, setMessage] = useState("");
  const [agreeNorms, setAgreeNorms] = useState(false);
  const navigate = useNavigate();
  const handleSend = () => {
    navigate("/");
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto' }}>
      <Typography variant="h5">Profile for {user.pseudonym}</Typography>
      <Typography>Status: {user.status}</Typography>
      <Typography>Topics: {user.topics.join(", ")}</Typography>
      <Button variant="contained" color="primary" component={Link} to="?invite=1">
        Invite to DeepTalk
      </Button>
      <Dialog open={invite} onClose={handleClose}>
        <DialogTitle>Invite {user.pseudonym} to DeepTalk</DialogTitle>
        <DialogContent>
          <DialogContentText>Select topic(s):</DialogContentText>
          <FormGroup>
            {user.topics.map(t => (
              <FormControlLabel
                control={<Checkbox checked={inviteTopics.includes(t)} onChange={e => handleTopic(e, t)} />}
                label={t}
              />
            ))}
          </FormGroup>
          <TextField
            margin="dense"
            label="Optional Message"
            type="text"
            fullWidth
            variant="outlined"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox checked={agreeNorms} onChange={e => setAgreeNorms(e.target.checked)} />}
            label="I agree to the community norms and values"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!agreeNorms} onClick={handleSend}>Send Request</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};