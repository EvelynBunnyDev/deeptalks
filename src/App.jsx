import style from "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import Deeptalk from "./pages/Deeptalk.jsx";
import ProfileCreation from "./pages/ProfileSetup.jsx";
import CreateThreadPage from "./pages/CreateThread.jsx";
import CommentingPage from "./pages/CommentThread.jsx";
import InboxPage from "./pages/Inbox.jsx";
import JournalPage from "./pages/Journal.jsx";
import SignInSide from "./pages/SignIn.jsx";
import SignUpSide from "./pages/SignUp.jsx";
import ThreadPage from "./pages/ThreadPage.jsx";
import { UserPage } from "./pages/UserPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, {
    path: "/profile/:userId?",
    element: <UserPage />
  }, {
    path: "/deeptalk/:inviteId",
    element: <Deeptalk />
  }, {
    path:"/signin",
    element: <SignInSide/>
  },{
    path:"/sign-up",
    element: <SignUpSide/>
  }, {
    path: "/signup",
    element: <ProfileCreation />
  }, {
    path: "/create-thread",
    element: <CreateThreadPage />
  }, {
    path: "/commenting/:threadId",
    element: <CommentingPage />
  }, {
    path: "/inbox",
    element: <InboxPage />
  }, {
    path: "/journal",
    element: <JournalPage />
  } , {
    // page for each thread with id
    path: "/thread/:threadId",
    element: <ThreadPage />
  }
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};