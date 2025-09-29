import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [currentChat, setCurrentChat] = useState(() => {
    return JSON.parse(localStorage.getItem("currentChat")) || [];
  });
  const [conversations, setConversations] = useState(() => {
    return JSON.parse(localStorage.getItem("conversations")) || [];
  });

  // Save conversation + feedback
  const saveConversation = (feedback) => {
    if (!currentChat || currentChat.length === 0) return;

    const newConversation = {
      chat: currentChat,
      feedback,
      timestamp: new Date().toISOString(),
    };

    const updatedConversations = [...conversations, newConversation];

    setConversations(updatedConversations);
    setCurrentChat([]);

    // persist in localStorage
    localStorage.setItem("conversations", JSON.stringify(updatedConversations));
    localStorage.setItem("currentChat", JSON.stringify([]));
  };

  // Save current chat automatically to localStorage
  useEffect(() => {
    localStorage.setItem("currentChat", JSON.stringify(currentChat));
  }, [currentChat]);

  return (
    <ChatContext.Provider
      value={{ currentChat, setCurrentChat, conversations, saveConversation }}
    >
      {children}
    </ChatContext.Provider>
  );
}
