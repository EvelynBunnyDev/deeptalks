// Corresponds to Task flow 1: Create/Customize your profile in spec

import React, { useState } from 'react';
import { Container, Typography, Button, Checkbox, FormControlLabel, TextField, Select, MenuItem, Box, FormControl, InputLabel, FormGroup } from '@mui/material';

function ProfileCreation() {
  const [step, setStep] = useState(1);
  const [userInput, setUserInput] = useState({
    email: '',
    agreeNorms: false,
    quizAnswer1: '',
    quizAnswer2: '',
    bio: '',
    pseudonym: '',
    personalityType: '',
    interest: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setUserInput(prevState => ({
      ...prevState,
      [name]: checked
    }));
  };

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const ProfileForm = () => (
    <Container maxWidth="sm">
      {step === 1 && (
        <Box>
          <Typography variant="h5">Welcome! Sign Up</Typography>
          <TextField
            label="Stanford.edu Email"
            variant="outlined"
            fullWidth
            margin="normal"
            name="email"
            value={userInput.email}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
        </Box>
      )}

      {step === 2 && (
        <Box>
          <Typography variant="h5">Community Norms and Values</Typography>
          <Typography>1. Active listening, respect, kindness...</Typography>
          <Typography>2. Not a mental health app...</Typography>
          <FormControlLabel
            control={<Checkbox checked={userInput.agreeNorms} onChange={handleCheckboxChange} name="agreeNorms" />}
            label="I agree to the community norms and values"
          />
          <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
        </Box>
      )}

      {step === 3 && (
        <Box>
          <Typography variant="h5">Confirm Understanding</Typography>
          <Typography>Conversation example...</Typography>
          <FormGroup>
            <FormControl>
              <InputLabel>What community norm did speaker 1 follow?</InputLabel>
              <Select
                value={userInput.quizAnswer1}
                onChange={handleInputChange}
                name="quizAnswer1"
              >
                <MenuItem value="activeListening">Active Listening</MenuItem>
                <MenuItem value="respect">Respect</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel>What should you do if someone asks for mental health advice?</InputLabel>
              <Select
                value={userInput.quizAnswer2}
                onChange={handleInputChange}
                name="quizAnswer2"
              >
                <MenuItem value="referToProfessional">Refer to Professional</MenuItem>
                <MenuItem value="giveAdvice">Give Advice</MenuItem>
              </Select>
            </FormControl>
          </FormGroup>
          <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
        </Box>
      )}

      {step === 4 && (
        <Box>
          <Typography variant="h5">Customize Profile</Typography>
          <TextField
            label="Pseudonym"
            variant="outlined"
            fullWidth
            margin="normal"
            name="pseudonym"
            value={userInput.pseudonym}
            onChange={handleInputChange}
          />
          <TextField
            label="Bio"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            name="bio"
            value={userInput.bio}
            onChange={handleInputChange}
          />
          <FormControl fullWidth>
            <InputLabel>Interest</InputLabel>
            <Select
              value={userInput.interest}
              onChange={handleInputChange}
              name="interest"
            >
              <MenuItem value="postGraduation">Post-Graduation Thoughts</MenuItem>
              <MenuItem value="firstExperiences">First Experiences</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Myers Briggs Personality Type"
            variant="outlined"
            fullWidth
            margin="normal"
            name="personalityType"
            value={userInput.personalityType}
            onChange={handleInputChange}
          />
          <Button variant="contained" color="primary" onClick={nextStep}>Finish Profile</Button>
        </Box>
      )}
    </Container>
  );

  return <ProfileForm />;
}

export default ProfileCreation;
