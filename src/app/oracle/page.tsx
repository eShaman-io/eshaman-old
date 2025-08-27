"use client";

import { useState } from "react";

export default function OraclePage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/oracle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages })
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      }
    } catch (error) {
      console.error("Oracle error:", error);
      setMessages([...newMessages, { role: "assistant", content: "The spirits are quiet right now. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Oracle</h1>
      <p className="text-slate-300 mb-8">
        Ask the Oracle for spiritual guidance, insights, and wisdom.
      </p>
      
      <div className="rounded-2xl bg-white/5 ring-1 ring-white/10 p-6 mb-6 min-h-[400px]">
        <div className="space-y-4 mb-6">
          {messages.length === 0 && (
            <div className="text-center text-slate-400 py-12">
              <p>Welcome, seeker. What guidance do you seek from the Oracle?</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`p-4 rounded-xl ${
              msg.role === "user" 
                ? "bg-purple-500/20 ml-12" 
                : "bg-slate-700/50 mr-12"
            }`}>
              <div className="text-sm text-slate-400 mb-1">
                {msg.role === "user" ? "You" : "Oracle"}
              </div>
              <div>{msg.content}</div>
            </div>
          ))}
          {loading && (
            <div className="bg-slate-700/50 mr-12 p-4 rounded-xl">
              <div className="text-sm text-slate-400 mb-1">Oracle</div>
              <div className="animate-pulse">The Oracle is consulting the spirits...</div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <input
          className="flex-1 rounded-2xl bg-black/30 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-purple-400"
          placeholder="Ask your question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button
          className="rounded-2xl px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:opacity-50"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
        >
          Ask
        </button>
      </div>
    </div>
  );
}