import { createContext, useState, useEffect } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState([]);
  const [savedChats, setSavedChats] = useState([]);

  // Load saved chats and ongoing chat from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedChats")) || [];
    setSavedChats(saved);

    const ongoing = JSON.parse(localStorage.getItem("currentChat")) || [];
    setCurrentChat(ongoing);
  }, []);

  // Persist savedChats to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("savedChats", JSON.stringify(savedChats));
  }, [savedChats]);

  // Persist currentChat to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("currentChat", JSON.stringify(currentChat));
  }, [currentChat]);

  // Add a message to current chat
  const addMessage = (sender, text) => {
    setCurrentChat((prev) => [...prev, { sender, text }]);
  };

  // Save conversation with optional feedback
  const saveConversation = (feedback) => {
    if (currentChat.length === 0) return;

    const chatWithFeedback = {
      id: Date.now(),
      chat: [...currentChat],
      feedback,
    };
    setSavedChats((prev) => [...prev, chatWithFeedback]);
    setCurrentChat([]);
  };

  // Start a new chat (save current if exists)
  const newChat = () => {
    if (currentChat.length > 0) {
      const chatWithId = { id: Date.now(), chat: [...currentChat] };
      setSavedChats((prev) => [...prev, chatWithId]);
    }
    setCurrentChat([]);
  };

  return (
    <ChatContext.Provider
      value={{
        currentChat,
        addMessage,
        setCurrentChat,
        savedChats,
        saveConversation,
        newChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
