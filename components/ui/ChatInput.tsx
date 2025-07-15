"use client";
import { useState } from "react";
import { LuSend } from "react-icons/lu";

interface ChatInputProps {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const handleClear = () => {
    setMessage("");
  };

  return (
    <div className="flex flex-col max-w-xl  mx-auto w-full">
      {/* Input container with Material Design-inspired elevation */}
      <div
        className={`
          flex items-center border border-black/50 p-1 mx-4   rounded-3xl
          bg-white 
          shadow-md transition-all duration-200
        
        `}
      >
        {/* Input wrapper */}
        <div className="relative max-h-[27px] flex-1 mx-2">
          <input
            className="w-full h-full px-3  bg-transparent border-none focus:outline-none"
            placeholder="Ask a question.."
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />

          {/* Clear button - only show when text is present */}
          {message && (
            <button
              className="absolute right-5 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 "
              onClick={handleClear}
              aria-label="Clear input"
            >
              clear
            </button>
          )}
        </div>

        {/* Action buttons container */}
        <div className="flex items-center">
          {/* Settings button */}

          {/* Send button - changes appearance based on whether there's a message */}
          <button
            className={`
              p-2  rounded-full transition-all
              ${
                message.trim()
                  ? "bg-purple-600 text-white hover:bg-purple-700"
                  : "bg-gray-200 text-gray-400  cursor-not-allowed"
              }
            `}
            onClick={handleSend}
            disabled={!message.trim()}
            aria-label="Send message"
          >
            <LuSend />
          </button>
        </div>
      </div>
    </div>
  );
}
