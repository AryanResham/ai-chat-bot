import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ChatInterface from "./components/ChatInterface";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/chat",
      element: <ChatInterface />,
    },
  ]);
  return (
    <div>
      <LandingPage />
      <ChatInterface />
    </div>
  );
}

export default App;
