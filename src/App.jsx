import "./style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme.js";

import Home from "./pages/Home.jsx";
import ProfileCreation from "./pages/ProfileSetup.jsx";
import CreateThreadPage from "./pages/CreateThread.jsx";
import ThreadPage from "./pages/ThreadPage.jsx";
import { UserPage } from "./pages/UserPage.jsx";
import { AddNewJournalPage, JournalListPage } from "./pages/JournalPage.jsx";
import { IncomingCallWrapper } from "./pages/CallPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }, {
    path: "/profile/:userId?",
    element: <UserPage />
  }, {
    path: "/signup",
    element: <ProfileCreation />
  }, {
    path: "/create-thread",
    element: <CreateThreadPage />
  }, {
    path: "/journal",
    element: <JournalListPage />
  }, {
    path: "/journal/new",
    element: <AddNewJournalPage />
  } , {
    path: "/thread/:threadId",
    element: <ThreadPage />
  }
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <IncomingCallWrapper>
        <RouterProvider router={router} />
      </IncomingCallWrapper>
    </ThemeProvider>
  );
};