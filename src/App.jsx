import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import ProfileCreation from "./pages/ProfileSetup.jsx";
import CreateThreadPage from "./pages/CreateThread.jsx";
import CommentingPage from "./pages/CommentThread.jsx";
import InboxPage from "./pages/Inbox.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  }, {
    path: "/profile",
    element: <Profile/>
  }, {
    path: "/signup",
    element: <ProfileCreation/>
  }, {
    path: "/create-thread",
    element: <CreateThreadPage/>
  }, {
    path: "/commenting",
    element: <CommentingPage/>
  }, {
    path: "/inbox",
    element: <InboxPage/>
  }
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
};