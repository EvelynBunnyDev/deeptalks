import Container from "@mui/material/Container";
import Link from "../components/Link.js";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

export default function Profile() {
  const [pseudonym, setPseudonym] = useState("");

  const handlePseudonym = e => {
    const value = e.currentTarget.value;
    setPseudonym(value);
  };
  const handleSave = () => {
    alert(`hi ${pseudonym}`);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h2">Profile</Typography>
      <Typography>
        This is a user profile
      </Typography>
      <Paper elevation={1}>
        <TextField label="Pseudonym" value={pseudonym} onChange={handlePseudonym}/><br/>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </Paper>
      <Link to="/">Home</Link>
    </Container>
  );
};