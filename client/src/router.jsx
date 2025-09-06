import { createBrowserRouter } from "react-router";
import LandingPage from "./components/LandingPage";
import ChatInterface from "./components/ChatInterface";
import { getAllChatDetails, checkAuth } from "./services";
import RootLayout from "./RootLayout";
import { redirect } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
        loader: async () => {
          const user = await checkAuth();
          if (user) throw redirect("/chat");
          return null;
        },
      },
      {
        path: "chat",
        element: <ChatInterface />,
        loader: async () => {
          const user = await checkAuth();
          if (!user) throw redirect("/");
          const chats = await getAllChatDetails();
          return { chats };
        },
      },
    ],
  },
]);

export default router;
