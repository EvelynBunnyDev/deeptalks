// Corresponds to Task flow 1: Create/Customize your profile in spec

import React, { useState } from 'react';
import { Container, Typography, Button, Checkbox, FormControlLabel, TextField, Select, MenuItem, Box, FormControl, InputLabel, FormGroup, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import QuizComponent from './Quiz';

function ProfileCreation() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
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

  const finishStep = () => {
    navigate("/");
  };

  const ProfileForm = () => (
    <Container maxWidth="sm">
      {step === 1 && (
        <Box>
          <Typography mb={4}>
            When using DeepTalks, you agree to the following rules to ensure a safe, respectful, and engaging environment for all users:
          </Typography>
          <Typography mb={2}><b>Show Respect and Kindness:</b> Treat others with respect and kindness. Harassment, bullying, and hate speech are strictly prohibited.</Typography>
          <Typography mb={2}><b>Post Authentic Content:</b> Share genuine content. Do not spread misinformation or impersonate other members of the Stanford community.</Typography>
          <Typography mb={2}><b>Maintain Privacy:</b> Respect the privacy of others. Do not share personal or confidential information without consent. Posting or threatening to post intimate or sexually explicit media without consent is prohibited.</Typography>
          <Typography mb={2}><b>Adhere to Legal Standards:</b> Do not post or engage in illegal activities, including sharing obscene content or facilitating prohibited transactions.</Typography>
          <Typography mb={2}><b>Community Engagement:</b> Engage authentically with communities. Avoid spamming, vote manipulation, or any behavior that disrupts the platform's normal use.</Typography>
          <Typography mb={4}>
            <b>Disclaimer:</b> DeepTalks is not a mental health platform. Users are not trained in mental health topics. For your well-being, please refer to campus mental health resources available here:  
            <Link href="https://studentaffairs.stanford.edu/mental-health-resources-stanford" target="_blank">Mental Health Resources at Stanford</Link>
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={userInput.agreeNorms} onChange={handleCheckboxChange} name="agreeNorms" />}
            label="I agree to the community norms and values"
          />
          <Button variant="contained" color="primary" onClick={nextStep}>Next</Button>
        </Box>
      )}

      {step === 2 && (
        <QuizComponent />
      )}

      {step === 3 && (
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
          <Button variant="contained" color="primary" onClick={finishStep}>Finish Profile</Button>
        </Box>
      )}
    </Container>
  );

  return <ProfileForm />;
}

export default ProfileCreation;
