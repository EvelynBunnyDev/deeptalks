import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Link
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </Link>
          <Button>butt</Button>
        </header>
      </div>
    </ThemeProvider>
  );
};