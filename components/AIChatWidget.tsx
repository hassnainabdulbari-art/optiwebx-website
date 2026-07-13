"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIChatWidget() {
  const [sessionId] = useState(() => crypto.randomUUID());
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "ai"; text: string }[]
  >([
    {
      role: "ai",
      text: "👋 Hi! I'm Optiwebx AI Assistant. How can I help you today?",
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
  message: userMessage,
  history: messages,
  sessionId,
}),
      });

      const data = await res.json();
      if (data.reply?.startsWith("APPOINTMENT_READY")) {
  const lines = data.reply.split("\n");

  const appointment = {
    name: lines.find((l: string) => l.startsWith("Name:"))?.replace("Name:", "").trim() || "",
    email: lines.find((l: string) => l.startsWith("Email:"))?.replace("Email:", "").trim() || "",
    whatsapp: lines.find((l: string) => l.startsWith("WhatsApp:"))?.replace("WhatsApp:", "").trim() || "",
    service: lines.find((l: string) => l.startsWith("Service:"))?.replace("Service:", "").trim() || "",
    preferred_date: lines.find((l: string) => l.startsWith("Date:"))?.replace("Date:", "").trim() || "",
    preferred_time: lines.find((l: string) => l.startsWith("Time:"))?.replace("Time:", "").trim() || "",
    message: lines.find((l: string) => l.startsWith("Message:"))?.replace("Message:", "").trim() || "",
  };

  const appointmentRes = await fetch("/api/appointment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });

  if (appointmentRes.ok) {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: "✅ Your appointment has been booked successfully. Our team will contact you shortly.",
      },
    ]);
  } else {
    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        text: "❌ Sorry, appointment booking failed. Please try again.",
      },
    ]);
  }

  return;
}

if (
  data.reply &&
  !data.reply.startsWith("APPOINTMENT_READY")
) {
  setMessages((prev) => [
    ...prev,
    {
      role: "ai",
      text: data.reply,
    },
  ]);
}
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ Sorry, something went wrong.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button with Pulse Animation */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-white shadow-xl backdrop-blur-sm"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        🤖 AI Assistant
      </motion.button>

      {/* Chat Popup */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] rounded-2xl bg-gradient-to-br from-zinc-900/95 via-zinc-800/95 to-zinc-900/95 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-t-2xl">
              <motion.h2 
                className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                Optiwebx AI
              </motion.h2>

              <motion.button
                onClick={() => setOpen(false)}
                className="text-white/60 hover:text-white transition-colors"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                ✖
              </motion.button>
            </div>

            {/* Messages Container */}
            <div className="h-80 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <AnimatePresence initial={false}>
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`rounded-xl p-3 text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white ml-12"
                        : "bg-white/5 backdrop-blur-sm text-gray-200 mr-12 border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-3 mr-12 border border-white/5"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
                          animate={{
                            y: [0, -8, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-white/60">AI is thinking...</span>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="flex gap-2 p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm rounded-b-2xl">
              <motion.input
                ref={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask anything..."
                className="flex-1 rounded-lg bg-white/10 backdrop-blur-sm p-2 text-white outline-none border border-white/10 focus:border-blue-500/50 transition-colors placeholder:text-white/40"
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                disabled={isLoading}
              />

              <motion.button
                onClick={sendMessage}
                disabled={isLoading || !message.trim()}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}