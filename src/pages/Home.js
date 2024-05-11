import Container from "@mui/material/Container";
import Link from "../components/Link.js";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Container maxWidth="md">
      <Typography variant="h2">hello world</Typography>
      <Typography>
        Welcome to DeepTalks!
      </Typography>
      <Link to="profile">profile</Link>
    </Container>
  );
};