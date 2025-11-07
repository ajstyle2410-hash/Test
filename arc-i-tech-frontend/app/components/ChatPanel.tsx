'use client';

import { ChatMessage } from "@/app/types";
import { formatRelative } from "@/app/lib/api";
import { useState, useRef, useEffect } from "react";
import { Paperclip, Smile, Send, Loader2 } from "lucide-react";

interface ChatPanelProps {
  title: string;
  messages: ChatMessage[];
  onSend: (message: string, attachments?: File[]) => Promise<void>;
  compact?: boolean;
  disabled?: boolean;
}

export function ChatPanel({
  title,
  messages,
  onSend,
  compact,
  disabled,
}: ChatPanelProps) {
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim() && attachments.length === 0) return;
    setSubmitting(true);
    try {
      await onSend(input.trim(), attachments);
      setInput("");
      setAttachments([]);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachments((prev) => [...prev, ...files]);
  };

  const handlePaste = (event: React.ClipboardEvent) => {
    const files = Array.from(event.clipboardData.files);
    if (files.length > 0) {
      setAttachments((prev) => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">
          Collaborate with the Arc-i-Tech delivery squad.
        </p>
      </div>
      <div
        className={`flex flex-1 flex-col gap-3 overflow-y-auto rounded-xl bg-slate-50 p-4 ${
          compact ? "max-h-72" : "max-h-96"
        }`}
      >
        {messages.length === 0 ? (
          <p className="text-sm text-slate-500">
            Your conversation will appear here. Drop a message to get started.
          </p>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex flex-col ${
                message.senderRole !== "CUSTOMER" ? "items-start" : "items-end"
              }`}
            >
              <div
                className={`group relative rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm ${
                  message.senderRole !== "CUSTOMER"
                    ? "bg-white text-slate-700"
                    : "bg-indigo-600 text-white"
                }`}
              >
                <p className="font-semibold">
                  {message.senderRole !== "CUSTOMER" ? message.senderName : "You"}
                </p>
                <p className="mt-1 whitespace-pre-wrap">{message.message}</p>
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.attachments.map((file, index) => (
                      <div
                        key={index}
                        className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-600"
                      >
                        {file.name}
                      </div>
                    ))}
                  </div>
                )}
                <div className="absolute -right-2 -top-2 hidden group-hover:flex">
                  <button
                    type="button"
                    className="rounded-full bg-white p-1 text-slate-400 hover:text-slate-600"
                  >
                    <Smile className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <span
                className="mt-1 text-xs text-slate-400"
                title={new Date(message.sentAt).toLocaleString()}
              >
                {formatRelative(message.sentAt)}
              </span>
            </div>
          ))
        )}
        {isTyping && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Loader2 className="h-3 w-3 animate-spin" />
            Someone is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs"
              >
                <span className="text-slate-600">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeAttachment(index)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            multiple
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={disabled || submitting}
            className="rounded-full border border-slate-300 p-2 text-slate-400 hover:border-indigo-300 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onPaste={handlePaste}
            disabled={disabled || submitting}
            placeholder="Type your update or question..."
            className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-sm text-slate-700 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-100"
          />
          <button
            type="submit"
            disabled={disabled || submitting || (!input.trim() && attachments.length === 0)}
            className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}