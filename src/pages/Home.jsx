// Import necessary components from Material-UI and React Router
import { Container, Typography, Button, Box, AppBar, Tab, Tabs } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Threads" />
          <Tab label="Inbox" />
          <Tab label="My Journal" />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Typography variant="h4">Welcome to DeepTalks!</Typography>
        <Button variant="contained" color="primary" component={Link} to="/signup">
          Sign up with stanford.edu email
        </Button>
        <Button variant="contained" component={Link} to="/create-thread" sx={{ mt: 2 }}>
          Throw a Thought
        </Button>
        <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
          {/* Placeholder for threads list */}
          <Typography variant="h6">Recent Threads</Typography>
          {/* Map over threads to create list items */}
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h6">Inbox</Typography>
        {/* Placeholder for inbox messages */}
        
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="h6">My Journal</Typography>
        {/* Placeholder for journal entries */}
      </TabPanel>
    </Container>
  );
}
