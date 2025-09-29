import { useState } from "react";
import FeedbackButtons from "./FeedbackButtons";

export default function Message({ sender, text }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`message ${sender}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {sender === "ai" && <span className="sender-name">Soul AI:</span>}
      <p>{text}</p>
      {sender === "ai" && hover && <FeedbackButtons />}
    </div>
  );
}
