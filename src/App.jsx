import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import HistoryPage from "./pages/HistoryPage";
import FeedbackPage from "./pages/FeedbackPage";
import { ChatProvider } from "./context/ChatContext";
import "./style.css";


export default function App() {
  return (
    <ChatProvider>  
      <Router>
        <header className="topbar">
          <nav>
            <Link to="/">Chat</Link>
            <Link to="/history">Past Conversations</Link>
            <Link to="/feedback">Feedback Summary</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Routes>
      </Router>
    </ChatProvider>
  );
}
