import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import "./style.css";

export default function App() {
  return (
    <ChatProvider>
      <Router>
        <header className="topbar">
          <h1>Bot AI</h1>
          <nav>
            <Link to="/">Chat</Link>
            <Link to="/history">Past Conversations</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}
