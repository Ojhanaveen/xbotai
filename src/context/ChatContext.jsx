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

  const saveConversation = (feedback) => {
    const chatWithFeedback = {
      id: Date.now(),
      chat: [...currentChat],
      feedback,
    };
    setSavedChats((prev) => [...prev, chatWithFeedback]);
    setCurrentChat([]); // clear ongoing chat after saving
  };

  const newChat = () => {
    setCurrentChat([]); // clear ongoing chat
  };

  return (
    <ChatContext.Provider
      value={{
        currentChat,
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
