// RepairChatBot.js
import React, { useState,} from 'react';
import './RepairchatBot.css';

// A basic chat bot to help users sus out there issues 

const RepairChatBot = () => {
  const [messages, setMessages] = useState([{ sender: 'bot', text: 'Welcome to RepairBot! How can I assist you today?' }]);
  const [userInput, setUserInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleUserInput = (e) => setUserInput(e.target.value);

  const addMessage = (sender, text) => {
    setMessages((prevMessages) => [...prevMessages, { sender, text }]);
  };

  const handleSendMessage = () => {
    if (userInput.trim() === '') return;

    // Add user's message
    addMessage('user', userInput);

    // Clear input and process bot response
    setUserInput('');
    processBotResponse(userInput.toLowerCase());
  };

  const processBotResponse = (input) => {
    setIsBotTyping(true);

    setTimeout(() => {
      switch (true) {
        case /battery/.test(input):
          addMessage('bot', 'It sounds like you’re having battery issues. Is your phone charging but not holding a charge?');
          break;
        case /screen/.test(input):
          addMessage('bot', 'Screen issues can be tricky! Is it cracked or just unresponsive?');
          break;
        case /software/.test(input):
          addMessage('bot', 'For software issues, have you tried restarting or updating the OS?');
          break;
        default:
          addMessage('bot', 'I can help with battery, screen, and software issues! Could you describe the issue?');
          break;
      }
      setIsBotTyping(false);
    }, 1000);
  };

  //Chatbot display
  return (
    <div className="chatbot-container">
      <div className="chatbot-header">RepairBot - Your Phone Repair Assistant</div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isBotTyping && <div className="chatbot-message bot">RepairBot is typing...</div>}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={userInput}
          onChange={handleUserInput}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default RepairChatBot;
