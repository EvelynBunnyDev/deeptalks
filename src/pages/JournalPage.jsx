import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './Header';
import getJournals, { newJournal } from '../models/Journal';
import Auth from "../models/Auth.js";


export function JournalListPage() {
  const [journals, setJournals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => void (async () => {
    await Auth.require(navigate);
  })(), []);

  useEffect(() => {
    // fetch journals from the server
    getJournals().then((data) => {
      console.log('Journals:', data.entries);
      setJournals(data.entries);
    });
  }, []);

  return (
    <Container component="main" maxWidth="md">
      <NavBar />
      <Typography variant="h4" sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
        Journal
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mb: 2 }}>
        {/* <Button variant="contained" color="primary" onClick={() => { alert('Not implemented'); }}>
          Post-Call Feedback Form
        </Button> */}
        <Button variant="contained" color="error" onClick={() => { navigate("/journal/new"); }}>
          Add New Journal
        </Button>
      </Box>
      {journals.length === 0 ?
        <Typography variant="body1">No journals available.</Typography>
        :
        journals.map((journal) => (
          <Paper key={journal._id} elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
            <Typography variant="h6" gutterBottom>
              {journal.title}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {new Date(journal.time).toLocaleString()}
            </Typography>
            <Typography>
              {journal.content}
            </Typography>
          </Paper>
        ))
      }
    </Container>
  );
}


export function AddNewJournalPage() {
  const [journalContent, setJounralContent] = useState('');
  const [journalTitle, setJournalTitle] = useState('');
  const navigate = useNavigate();

  const handleSave = () => {
    if (!journalContent || !journalTitle) {
      alert('Please fill in the title and content of the journal.');
      return;
    }

    const data = { content: journalContent, title: journalTitle };
    // save the journal to the server
    newJournal(data).then(() => {
      navigate('/journal');
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <NavBar />
      <Paper elevation={3} sx={{ p: 2, mt: 1 }}>
        <Box>
          <TextField
            fullWidth
            label="Title"
            value={journalTitle}
            onChange={(e) => setJournalTitle(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Content"
            value={journalContent}
            onChange={(e) => setJounralContent(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
