import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function JournalPage() {
  // Mockup data for the journal
  const initialJournal = {
    id: 1,
    title: 'Reflections on Today',
    date: 'May 14, 2024',
    content: 'Today was a productive day. I learned a lot about React.'
  };

  // State to hold the journal entry
  const [journal, setJournal] = useState(initialJournal);
  // State to hold the editable content
  const [editableContent, setEditableContent] = useState(journal.content);
  // State to toggle edit mode
  const [editMode, setEditMode] = useState(false);

  // Handle saving the edited content
  const handleSave = () => {
    setJournal({ ...journal, content: editableContent });
    setEditMode(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          {journal.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {journal.date}
        </Typography>
        {editMode ? (
          <Box>
            <TextField
              fullWidth
              multiline
              minRows={4}
              value={editableContent}
              onChange={(e) => setEditableContent(e.target.value)}
              variant="outlined"
              margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save Changes
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography paragraph>{journal.content}</Typography>
            <Button variant="outlined" color="primary" onClick={() => setEditMode(true)}>
              Edit
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default JournalPage;
