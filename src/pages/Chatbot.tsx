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
      content: `Sure! Heres a sample text with 500 words Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum feugiat lectus, eget vulputate erat tempus et. Pellentesque luctus velit quis nisl lobortis, ut consectetur neque eleifend. Aliquam sagittis ultrices lectus, et tempus nisl aliquam at. Suspendisse ac faucibus augue. Ut auctor nunc vel tortor feugiat eleifend. Vestibulum sed malesuada erat. Proin vulputate tristique odio, a viverra lectus varius id. Vestibulum feugiat metus sed mauris interdum tristique. Phasellus ultrices risus et risus consectetur, ac luctus lacus commodo. Nam dignissim, velit a efficitur varius, mi diam dictum orci, vel fermentum orci tellus at turpis. Pellentesque eu feugiat mauris. Aliquam ut malesuada eros, a fringilla enim. Suspendisse nec erat felis. Aenean sagittis, nulla vel aliquet faucibus, urna mi interdum arcu, ac interdum nulla dolor in lectus. Fusce tincidunt arcu sit amet ex sagittis, non suscipit mauris scelerisque. Nulla facilisi.
Etiam tincidunt risus vel tincidunt suscipit. Donec iaculis tellus et arcu tincidunt, nec eleifend arcu luctus. Suspendisse lacinia sagittis diam, eget pulvinar enim vestibulum id. In id metus urna. Proin sodales tincidunt dolor at posuere. Nunc et sem tellus. Sed faucibus diam at varius aliquam. Cras feugiat dolor eget mauris facilisis gravida. Donec luctus lacus sit amet condimentum feugiat. Morbi posuere diam eu lectus blandit, at tempus justo fermentum. Curabitur sollicitudin felis mauris, sed dignissim est facilisis non. Morbi ornare, metus nec facilisis facilisis, nulla justo pharetra velit, et rutrum mi quam in tortor. Integer consequat ex vitae sagittis rutrum. Integer dignissim mauris ac dui interdum, eu viverra arcu tristique.
Quisque auctor euismod purus sed vulputate. Maecenas tempor posuere purus sed congue. Integer in diam semper, faucibus turpis vitae, fermentum tortor. Etiam iaculis quam nec ultrices fringilla. In eu justo id velit dictum consectetur. Maecenas fringilla, dui id pretium sollicitudin, lacus mauris malesuada ante, in facilisis nisi enim eu ex. Donec tincidunt erat et nisi scelerisque vestibulum. Sed sagittis lobortis magna, id condimentum erat consectetur eget.
I hope this sample text helps you with your needs Sure! Heres a sample text with 500 words Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum feugiat lectus, eget vulputate erat tempus et. Pellentesque luctus velit quis nisl lobortis, ut consectetur neque eleifend. Aliquam sagittis ultrices lectus, et tempus nisl aliquam at. Suspendisse ac faucibus augue. Ut auctor nunc vel tortor feugiat eleifend. Vestibulum sed malesuada erat. Proin vulputate tristique odio, a viverra lectus varius id. Vestibulum feugiat metus sed mauris interdum tristique. Phasellus ultrices risus et risus consectetur, ac luctus lacus commodo. Nam dignissim, velit a efficitur varius, mi diam dictum orci, vel fermentum orci tellus at turpis. Pellentesque eu feugiat mauris. Aliquam ut malesuada eros, a fringilla enim. Suspendisse nec erat felis. Aenean sagittis, nulla vel aliquet faucibus, urna mi interdum arcu, ac interdum nulla dolor in lectus. Fusce tincidunt arcu sit amet ex sagittis, non suscipit mauris scelerisque. Nulla facilisi. Etiam tincidunt risus vel tincidunt suscipit. Donec iaculis tellus et arcu tincidunt, nec eleifend arcu luctus. Suspendisse lacinia sagittis diam, eget pulvinar enim vestibulum id. In id metus urna. Proin sodales tincidunt dolor at posuere. Nunc et sem tellus. Sed faucibus diam at varius aliquam. Cras feugiat dolor eget mauris facilisis gravida. Donec luctus lacus sit amet condimentum feugiat. Morbi posuere diam eu lectus blandit, at tempus justo fermentum. Curabitur sollicitudin felis mauris, sed dignissim est facilisis non. Morbi ornare, metus nec facilisis facilisis, nulla justo pharetra velit, et rutrum mi quam in tortor. Integer consequat ex vitae sagittis rutrum. Integer dignissim mauris ac dui interdum, eu viverra arcu tristique. Quisque auctor euismod purus sed vulputate. Maecenas tempor posuere purus sed congue. Integer in diam semper, faucibus turpis vitae, fermentum tortor. Etiam iaculis quam nec ultrices fringilla. In eu justo id velit dictum consectetur. Maecenas fringilla, dui id pretium sollicitudin, lacus mauris malesuada ante, in facilisis nisi enim eu ex. Donec tincidunt erat et nisi scelerisque vestibulum. Sed sagittis lobortis magna, id condimentum erat consectetur eget. I hope this sample text helps you with your needs`,
    },
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
