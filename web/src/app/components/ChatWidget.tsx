"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./ChatWidget.module.css";

type Message = { id: number; role: "user" | "bot"; text: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "bot", text: "Welcome to Agent Factory — how can I help?" },
  ]);
  const [input, setInput] = useState("");
  const idRef = useRef(2);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  function send() {
    const trimmed = input.trim();
    if (!trimmed) return;
    const userMsg: Message = { id: idRef.current++, role: "user", text: trimmed };
    setMessages((s) => [...s, userMsg]);
    setInput("");

    // simulated futuristic bot response
    setTimeout(() => {
      const botMsg: Message = {
        id: idRef.current++,
        role: "bot",
        text: `Processing your request... Received: “${trimmed}”. Suggestion: Try 'deploy' or 'simulate'.`,
      };
      setMessages((s) => [...s, botMsg]);
    }, 900 + Math.random() * 600);
  }

  function onKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") send();
  }

  return (
    <div className={styles.rootButton}>
      {!open && (
        <div
          className={styles.floating}
          role="button"
          aria-label="Open chat"
          onClick={() => setOpen(true)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12c0 4.418 4.03 8 9 8 1.677 0 3.238-.344 4.555-.936L22 20l-1.447-4.444C21.258 14.367 22 13.21 22 12c0-4.418-4.03-8-9-8S4 7.582 4 12z" fill="white" opacity="0.95"/>
          </svg>
        </div>
      )}

      {open && (
        <div className={styles.panel} role="region" aria-label="Chat widget">
          <div className={styles.header}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div className={styles.title}>Agent Factory</div>
              <div className={styles.subtitle}>AI assistant • Active</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className={styles.sendBtn}
                style={{ padding: 6, minWidth: 0 }}
              >
                ✕
              </button>
            </div>
          </div>

          <div className={styles.messages} ref={scrollRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`${styles.msgRow} ${m.role === "user" ? styles.msgUser : ""}`}
                style={{ justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}
              >
                <div className={`${styles.bubble} ${m.role === "user" ? styles.bubbleUser : styles.bubbleBot}`}>
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.inputWrap}>
            <input
              className={styles.input}
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
            />
            <button className={styles.sendBtn} onClick={send} aria-label="Send message">
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
