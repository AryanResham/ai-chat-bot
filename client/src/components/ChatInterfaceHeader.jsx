import React from "react";
import Button from "./Button";

function ChatInterfaceHeader({
  isDarkMode,
  setIsDarkMode,
  startNewConversation,
}) {
  return (
    <>
      <div className="p-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">
            Conversations
          </h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-200 dark:bg-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDarkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <button
          onClick={startNewConversation}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-md"
        >
          + New Chat
        </button>
      </div>
    </>
  );
}

export default ChatInterfaceHeader;
