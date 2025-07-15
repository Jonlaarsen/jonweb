"use client";

import { useRef, useEffect } from "react";
import { ChatHistory } from "@/utils/types";
import { FaRobot, FaUser } from "react-icons/fa";

interface MessageWindowProps {
  history: ChatHistory;
}

export default function MessageWindow({ history }: MessageWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div className="flex-1  max-w-md max-h-[20rem] sm:max-h-[25rem]  overflow-y-scroll p-8 sm:p-4 ">
      <div className=" mx-auto">
        {history.map((msg, index) => {
          const isUser = msg.role === "user";

          return (
            <div
              key={index}
              className={`flex pb-2 ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              {/* For bot messages, avatar appears first */}
              {!isUser && (
                <div className="mr-2">
                  <div className="flex mb-2 items-center justify-center w-8 h-8 rounded-full bg-purple-200 border">
                    <FaRobot className="text-zinc-900 text-xl " />
                  </div>
                  <p className="text-xs opacity-50">AI-Bot</p>
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`
                  px-4 py-2 shadow-sm rounded-lg 
                  ${
                    isUser
                      ? "bg-purple-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 rounded-bl-none"
                  }
                  max-w-xs sm:max-w-md
                `}
              >
                <div className="whitespace-pre-wrap break-words">
                  {msg.parts.map((part, idx) => (
                    <span key={idx}>{part.text}</span>
                  ))}
                </div>
              </div>

              {/* For user messages, avatar appears last */}
              {isUser && (
                <div className="ml-2 ">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full border bg-purple-200">
                    <FaUser className="text-zinc-900" />
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Invisible element to help scroll to bottom */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
