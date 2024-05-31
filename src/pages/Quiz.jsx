import React, { useState } from 'react';
import { Box, Typography, FormGroup, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

function QuizComponent() {
  const [userInput, setUserInput] = useState({
    quizAnswer1: '',
    quizAnswer2: '',
    quizAnswer3: '',
    quizAnswer4: '',
    quizAnswer5: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInput(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkAnswers = () => {
    const correctAnswers = {
      quizAnswer1: 'report',
      quizAnswer2: 'respect',
      quizAnswer3: 'prohibited',
      quizAnswer4: 'referResources',
      quizAnswer5: 'noViolation'
    };
    return Object.keys(correctAnswers).every(key => userInput[key] === correctAnswers[key]);
  };

  return (
    <Box>
      <Typography variant="h5">Confirm Understanding</Typography>
      <Typography>You can only hit "Next" when you've got correct answers for all five questions. </Typography>
      <FormGroup>
        <FormControl>
          <InputLabel>What should you do if you see someone spreading misinformation?</InputLabel>
          <Select
            value={userInput.quizAnswer1}
            onChange={handleInputChange}
            name="quizAnswer1"
          >
            <MenuItem value="ignore">Ignore it</MenuItem>
            <MenuItem value="report">Report the content to platform moderators</MenuItem>
            <MenuItem value="spread">Spread it further</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>How should you treat other users on DeepTalks?</InputLabel>
          <Select
            value={userInput.quizAnswer2}
            onChange={handleInputChange}
            name="quizAnswer2"
          >
            <MenuItem value="respect">With respect and kindness</MenuItem>
            <MenuItem value="anyWay">However you want</MenuItem>
            <MenuItem value="indifference">With indifference</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>What type of content is prohibited on DeepTalks?</InputLabel>
          <Select
            value={userInput.quizAnswer3}
            onChange={handleInputChange}
            name="quizAnswer3"
          >
            <MenuItem value="authentic">Authentic content</MenuItem>
            <MenuItem value="prohibited">Misinformation, hate speech, and illegal content</MenuItem>
            <MenuItem value="positive">Positive and supportive content</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>What should you do if someone asks for mental health advice?</InputLabel>
          <Select
            value={userInput.quizAnswer4}
            onChange={handleInputChange}
            name="quizAnswer4"
          >
            <MenuItem value="giveAdvice">Provide your own advice</MenuItem>
            <MenuItem value="referResources">Refer them to campus mental health resources</MenuItem>
            <MenuItem value="ignoreRequest">Ignore their request</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Is it acceptable to share someone's personal information without their consent?</InputLabel>
          <Select
            value={userInput.quizAnswer5}
            onChange={handleInputChange}
            name="quizAnswer5"
          >
            <MenuItem value="yesImportant">Yes, if it's important</MenuItem>
            <MenuItem value="noViolation">No, it's a violation of privacy</MenuItem>
            <MenuItem value="ifClose">Only if you know the person well</MenuItem>
          </Select>
        </FormControl>
      </FormGroup>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => console.log('Next step')}
        disabled={!checkAnswers()}
      >
        Next
      </Button>
    </Box>
  );
}

export default QuizComponent;
