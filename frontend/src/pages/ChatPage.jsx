import { useEffect, useState } from "react";

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text) return;

    setMessages([...messages, text]);
    setText("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>💬 Chat</h2>

      <div>
        {messages.map((msg, i) => (
          <p key={i}>User: {msg}</p>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />

      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatPage;