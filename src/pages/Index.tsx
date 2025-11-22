import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatHeader } from "@/components/ChatHeader";
import { ChatInterface } from "@/components/ChatInterface";
import { ChatInput } from "@/components/ChatInput";
import CallScreen from "@/components/CallScreen";
import { useToast } from "@/hooks/use-toast";
import { getLegalResponse } from "@/data/legalKnowledge";
import { getDetailedLegalResponse } from "@/data/detailedLaw";
import { getSituationalAdvice } from "@/data/situationalAdvice";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  timestamp: Date;
}

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([
    {
      id: "1",
      title: "Getting started with AI",
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      title: "Project planning discussion",
      timestamp: new Date(Date.now() - 172800000),
    },
    {
      id: "3",
      title: "Code review questions",
      timestamp: new Date(Date.now() - 259200000),
    },
  ]);
  const [currentChatId, setCurrentChatId] = useState("current");
  const { toast } = useToast();

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const lowerContent = content.toLowerCase();
      let answer = null;
      
      // Greetings
      if (lowerContent.match(/^(hi|hello|hey|hii|helo|namaste|namaskar)$/)) {
        answer = "Hello! I'm LaWEase, your intelligent legal assistant. I have comprehensive knowledge of Indian law and constitution. How can I help you today?";
      } else if (lowerContent.match(/^(good morning|good afternoon|good evening|good night)$/)) {
        answer = "Good day! I'm LaWEase, ready to assist you with any questions about Indian law and constitution.";
      } else if (lowerContent.match(/^(how are you|how r u|how are u)$/)) {
        answer = "I'm functioning perfectly, thank you! Ready to help you with Indian constitutional law. What would you like to know?";
      } else if (lowerContent.match(/^(thanks|thank you|thankyou|thx)$/)) {
        answer = "You're welcome! Feel free to ask if you have more questions about Indian law.";
      } else if (lowerContent.match(/^(bye|goodbye|see you|tata)$/)) {
        answer = "Goodbye! Feel free to return anytime you need legal assistance.";
      } else {
        const situationalAnswer = getSituationalAdvice(content);
        const detailedAnswer = getDetailedLegalResponse(content);
        const basicAnswer = getLegalResponse(content);
        answer = situationalAnswer || detailedAnswer || basicAnswer;
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: answer || "I'm LaWEase, your intelligent legal assistant with comprehensive knowledge of Indian law and constitution. Ask me about fundamental rights, landmark cases, constitutional provisions, legal doctrines, Parliament, judiciary, or any aspect of Indian constitutional law!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(Date.now().toString());
    toast({
      title: "New chat started",
      description: "Ready for a fresh conversation!",
    });
  };

  const handleSelectChat = (id: string) => {
    setCurrentChatId(id);
    setMessages([]);
    toast({
      title: "Chat loaded",
      description: "Previous conversation loaded",
    });
  };

  const handleCallClick = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    toast({
      title: "Call ended",
      description: "Voice call has been disconnected",
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {isCallActive && <CallScreen onEndCall={handleEndCall} />}
      
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNewChat={handleNewChat}
        chatHistories={chatHistories}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
          onCallClick={handleCallClick}
        />

        <ChatInterface messages={messages} />

        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Index;
