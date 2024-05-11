import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    primary: {
      main: "#8c1515"
    }
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h2: "h1",
          h3: "h2",
          h4: "h3",
          h5: "h4"
        }
      }
    }
  }
});