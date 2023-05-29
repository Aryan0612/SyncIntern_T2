import React, { useState, useEffect } from "react";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        timestamp: new Date().toLocaleString(),
      };

      setMessages([...messages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <div>
      <h1>Messenger App</h1>
      <div className="message-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>{message.text}</p>
            <span>{message.timestamp}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input type="text" value={inputMessage} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default App;
