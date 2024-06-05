import style from "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

import Home from "./pages/Home.jsx";
import Deeptalk from "./pages/Deeptalk.jsx";
import ProfileCreation from "./pages/ProfileSetup.jsx";
import CreateThreadPage from "./pages/CreateThread.jsx";
import CommentingPage from "./pages/CommentThread.jsx";
import JournalPage from "./pages/Journal.jsx";
import ThreadPage from "./pages/ThreadPage.jsx";
import { UserPage } from "./pages/UserPage.jsx";
import { AddNewJournalPage, JournalListPage } from "./pages/JournalPage.jsx";
import { UserStatusProvider } from "./contexts/userCallContext.jsx";
import { IncomingCallWrapper } from "./pages/CallPage.jsx";

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
    path: "/signup",
    element: <ProfileCreation />
  }, {
    path: "/create-thread",
    element: <CreateThreadPage />
  }, {
    path: "/commenting/:threadId",
    element: <CommentingPage />
  }, {
    path: "/journal",
    element: <JournalListPage />
  }, {
    path: "/journal/new",
    element: <AddNewJournalPage />
  } , {
    // page for each thread with id
    path: "/thread/:threadId",
    element: <ThreadPage />
  }
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserStatusProvider>
        <IncomingCallWrapper>
          <RouterProvider router={router} />
        </IncomingCallWrapper>
      </UserStatusProvider>
    </ThemeProvider>
  );
};