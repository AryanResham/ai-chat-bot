import React, { useEffect, useState } from "react";
import { getAllChatDetails } from "./services";
import { data } from "react-router";

function Test() {
  const [chats, setChats] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getAllChatDetails();
        setChats(data.chatDetails);
        console.log(data.chatDetails);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>
          <h2>{chat.title}</h2>
          <p>
            {chat.messages.map((message) => (
              <span key={message._id}>
                <span>{message.userMessage}</span>
                <span>{message.systemResponse}</span>
              </span>
            ))}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Test;
