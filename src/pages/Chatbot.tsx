import React, { useEffect, useRef, useState } from "react";
import "./ChatBot.css";

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

interface Message {
  role: "user" | "bot";
  content: string;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content: `Hi how can i help you today`},

  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);

  const messageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [messages]);
  // Function to handle user input and generate bot response
  const handleUserInput = async () => {
    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");

    try {
      // chatbot
      setIsBotTyping(true);

      const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: input }],
      });
      const botMessage: Message = {
        role: "bot",
        content: chatCompletion.data?.choices[0]?.message?.content,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsBotTyping(false);

      // Generate the financial advice report if the conversation is complete
      if (false) {
        generateReport();
      }
    } catch (error) {
      // Handle error from API request
      console.error(error);
      setIsBotTyping(false);
    }
  };

  // Function to generate the financial advice report
  const generateReport = () => {
    // Retrieve current market data and generate the report
    // Display the report to the user or perform any necessary actions
  };

  return (
    <div className="chatbot-container">
      <h1 className="chatbot-title">
        Chatbot - Investment and Financial Decision Making
      </h1>
      <div className="message-container" ref={messageContainerRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "user" ? "user" : "bot"}`}
          >
            {message.content}
          </div>
        ))}
        {isBotTyping && (
          <div className="message bot typing">
            <div className="dot-1"></div>
            <div className="dot-2"></div>
            <div className="dot-3"></div>
          </div>
        )}
      </div>
      <div className="input-container">
        <input
          type="text"
          className="input-field"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="send-button" onClick={handleUserInput}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
