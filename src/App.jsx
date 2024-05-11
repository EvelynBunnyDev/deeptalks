import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  }, {
    path: "/profile",
    element: <Profile/>
  }
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
};