import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Paper, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import NavBar from './Header';

function JournalPage() {
  const [journal, setJournal] = useState({
    id: 1,
    title: 'Reflections on Today',
    date: 'May 14, 2024',
    content: 'Today was a truly memorable and joyful day, marked by laughter and lively conversations as I celebrated another year of life surrounded by my closest friends. \nThe afternoon sun filtered through the leaves, casting dappled shadows on the grass where we gathered, a gentle breeze occasionally stirring the balloons and streamers that decorated the garden. As the day unfolded, each moment seemed to bring its own burst of happiness. Friends, who had come from near and far, brought with them not just thoughtful gifts, but the warmth of their presence, making the day feel all the more special. We shared stories and reminisced about past adventures, our laughter ringing out and blending with the sounds of the neighborhood around us. The conversation flowed effortlessly, touching on everything from trivial daily occurrences to deep, reflective discussions about our hopes and dreams. It felt as if with each topic we covered, we were weaving a richer tapestry of our collective experiences, drawing us closer together. \nThe highlight of the day was when we gathered around the table, faces lit by the soft glow of the candles on the cake. As I blew them out, making a silent wish, I felt a profound sense of gratitude for the wonderful people in my life. It was a simple moment, yet it felt like a snapshot of happiness, captured perfectly in the midst of laughter and the warm glances of friends.'
  });
  const [editableContent, setEditableContent] = useState(journal.content);
  const [editMode, setEditMode] = useState(false);
  const [mode, setMode] = useState('journal'); // 'journal' or 'feedback'
  const navigate = useNavigate();

  const handleSave = () => {
    setJournal({ ...journal, content: editableContent });
    setEditMode(false);
  };

  const handleNewJournal = () => {
    // Initialize new journal with empty fields for title and content
    if (editableContent.trim() === '' || journal.title.trim() === '') {
      alert('Both title and content are required.');
      return;
    }
    setJournal({ id: journal.id + 1, title: '', date: new Date().toISOString().slice(0, 10), content: '' });
    setEditableContent('');
    setEditMode(true);
  };

  const renderJournal = () => (
    <Paper elevation={3} sx={{ p: 2, mt: 1 }}>
      {editMode ? (
        <Box>
          <TextField
            fullWidth
            label="Title"
            value={journal.title}
            onChange={(e) => setJournal({...journal, title: e.target.value})}
            variant="outlined"
            margin="normal"
            required
          />
          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Content"
            value={editableContent}
            onChange={(e) => setEditableContent(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5" gutterBottom>{journal.title}</Typography>
          <Typography paragraph>{journal.content}</Typography>
          <Button variant="outlined" color="primary" onClick={() => setEditMode(true)}>
            Edit
          </Button>
        </Box>
      )}
    </Paper>
  );  

  const handleSubmitFeedback = () => {
    console.log("Submitting feedback form...");
    navigate('/journal'); // Redirect to the journal page after submitting feedback. Need some testing
  };

  const renderFeedbackForm = () => (
    <Box>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Overall Experience</FormLabel>
        <RadioGroup>
          <FormControlLabel value="5" control={<Radio />} label="⭐️⭐️⭐️⭐️⭐️ (Excellent)" />
          <FormControlLabel value="4" control={<Radio />} label="⭐️⭐️⭐️⭐️ (Good)" />
          <FormControlLabel value="3" control={<Radio />} label="⭐️⭐️⭐️ (Average)" />
          <FormControlLabel value="2" control={<Radio />} label="⭐️⭐️ (Poor)" />
          <FormControlLabel value="1" control={<Radio />} label="⭐️ (Very Poor)" />
        </RadioGroup>
      </FormControl>
      <FormControl component="fieldset" sx={{ mt: 2 }}>
        <FormLabel component="legend">Respect and Kindness</FormLabel>
        <RadioGroup>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel Label value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </FormControl>
      <TextField
        fullWidth
        multiline
        label="Personal Reflection (Optional)"
        minRows={4}
        variant="outlined"
        margin="normal"
        placeholder="What were the most important points or insights you gained from the conversation?"
      />
      <TextField
        fullWidth
        multiline
        label="Additional Comments"
        minRows={4}
        variant="outlined"
        margin="normal"
        placeholder="Any additional comments or reflections?"
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSubmitFeedback} // Use the handleSubmitFeedback function here
      >
        Submit
      </Button>
    </Box>
  );

  return (
  //   <Container component="main" maxWidth="sm">
  //     <NavBar />
  //     <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
  //       <Typography variant="h4" gutterBottom>
  //         {mode === 'journal' ? journal.title : 'Post-Call Feedback Form'}
  //       </Typography>
  //       <Typography color="textSecondary" gutterBehind>
  //         {journal.date}
  //       </Typography>
  //       {mode === 'journal' ? renderJournal() : renderFeedbackForm()}
  //       <Button variant="outlined" sx={{ mt: 2 }} onClick={() => setMode(mode === 'journal' ? 'feedback' : 'journal')}>
  //         {mode === 'journal' ? 'Fill Feedback Form' : 'Write Journal'}
  //       </Button>
  //       <Button
  //         variant="contained"
  //         color="error"
  //         sx={{ mt: 2 }}
  //         onClick={handleNewJournal}
  //       >
  //         Add New Journal
  //       </Button>
  //     </Paper>
  //   </Container>
  // );
  <Container component="main" maxWidth="md">
  <NavBar />
  <Typography variant="h4" sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
    Journal
  </Typography>
  <Box sx={{ display: 'flex', justifyContent: 'space-evenly', mb: 2 }}>
    <Button variant="contained" color="primary" onClick={() => setMode('feedback')}>
      Post-Call Feedback Form
    </Button>
    <Button variant="contained" color="error" onClick={handleNewJournal}>
      Add New Journal
    </Button>
  </Box>
  <Container sx={{ mt: 2 }}>
    <Typography variant="h5" gutterBottom>
      {mode === 'journal' ? journal.title : 'Post-Call Feedback Form'}
    </Typography>
    <Typography color="textSecondary" gutterBottom>
      {journal.date}
    </Typography>
    {mode === 'journal' ? renderJournal() : renderFeedbackForm()}
  </Container>
</Container>
  );
}

export default JournalPage;
