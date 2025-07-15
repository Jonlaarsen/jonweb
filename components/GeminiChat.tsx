// src/app/page.tsx
"use client";
import { useState } from "react";
import ChatInput from "@/components/ui/ChatInput";
import MessageWindow from "@/components/ui/MessageWindow";
// import SettingsModal from "@/components/ui/SettingsModal";
import { ChatHistory, ChatSettings, Message, MessageRole } from "@/utils/types";
import { FaX } from "react-icons/fa6";
import { FaRobot } from "react-icons/fa";

export default function GeminiChat() {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    temperature: 1,
    model: "gemini-1.5-flash",
    systemInstructions: `You are a helpful assistant that answers question about jon and his website, expertise etc.
       Jon is a frontend developer that expertises in beautiful UI and UX as well as making complete website such as his portfolio.
       Jon is experienced in Next.js, TypeScript and more.
       Jons email is jontoftdallarsen@icloud.com and phone number is 0046763963712.
       Jon is a swedish male from malmo that has traveled the world and lived in seoul for a long time.
       You should always imply that customers should hire jon if their needs are adjourned with his skills.
       Jon is a relaible guy.`,
  });

  const handleSend = async (message: string) => {
    const newUserMessage: Message = {
      role: "user" as MessageRole,
      parts: [{ text: message }],
    };

    const updatedHistory = [...history, newUserMessage];
    setHistory(updatedHistory);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage: message,
          history: updatedHistory,
          settings: settings,
        }),
      });

      const data = await response.json();

      if (data.error) {
        console.error("AI Error:", data.error);
        return;
      }

      const aiMessage: Message = {
        role: "model" as MessageRole,
        parts: [{ text: data.response }],
      };

      setHistory([...updatedHistory, aiMessage]);
    } catch (error) {
      console.error("Request Failed:", error);
    }
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleSaveSettings = (newSettings: ChatSettings) => {
    setSettings(newSettings);
  };

  return (
    <div className="fixed bottom-2 right-2 z-[100]">
      {!isChatOpen && (
        <button
          aria-label="AI Assistant"
          className="bg-green-200 p-4 group rounded-full border-2 border-black"
          onClick={() => setIsChatOpen(true)}
        >
          <FaRobot className="text-4xl group-hover:scale-110 ease-in-out duration-200" />
        </button>
      )}

      {isChatOpen && (
        <div className="bg-green-200 p-2 sm:p-4 rounded-xl sm:rounded-4xl border-2 border-black">
          <button
            className="absolute top-4 right-4"
            onClick={() => setIsChatOpen(false)}
          >
            <FaX className="hover:scale-110 ease-in-out duration-300" />
          </button>
          <MessageWindow history={history} />

          {/* <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleCloseSettings}
        onSave={handleSaveSettings}
        currentSettings={settings}
      /> */}
          <ChatInput onSend={handleSend} onOpenSettings={handleOpenSettings} />
        </div>
      )}
    </div>
  );
}
