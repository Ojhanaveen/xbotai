import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";

export default function FeedbackPage() {
  const { conversations } = useContext(ChatContext);
  const [filter, setFilter] = useState("all"); // filter by rating

  // Apply filter
  const filteredFeedback = conversations.flatMap(conv => {
    if (!conv.feedback) return [];
    if (filter === "all") return conv.feedback;
    return conv.feedback.rating === parseInt(filter) ? [conv.feedback] : [];
  });

  return (
    <div className="feedback-page">
      <h2>Feedback Summary</h2>

      {/* Filter Section */}
      <div className="filters">
        <label>Filter by rating: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="5">⭐ 5</option>
          <option value="4">⭐ 4</option>
          <option value="3">⭐ 3</option>
          <option value="2">⭐ 2</option>
          <option value="1">⭐ 1</option>
        </select>
      </div>

      {/* Feedback List */}
      <ul className="feedback-list">
        {filteredFeedback.length === 0 ? (
          <p>No feedback available.</p>
        ) : (
          filteredFeedback.map((fb, i) => (
            <li key={i} className="feedback-item">
              <p><strong>Rating:</strong> {"⭐".repeat(fb.rating)}</p>
              <p><strong>Comment:</strong> {fb.comment || "No comment"}</p>
              <p><strong>Reaction:</strong> {fb.reaction || "None"}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
