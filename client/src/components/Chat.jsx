"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:9876");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    socket.on("message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const data = {
      text: message,
      sender: socket.id,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("message", data);

    setMessage("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        <h2>Socket.IO Chat</h2>

        <div style={styles.messages}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                ...styles.message,
                background:
                  msg.sender === socket.id ? "#DCF8C6" : "#FFFFFF",
                alignSelf:
                  msg.sender === socket.id
                    ? "flex-end"
                    : "flex-start",
              }}
            >
              <p>{msg.text}</p>
              <small>{msg.time}</small>
            </div>
          ))}
        </div>

        <div style={styles.inputArea}>
          <input
            type="text"
            value={message}
            placeholder="Type message..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            style={styles.input}
          />

          <button onClick={sendMessage} style={styles.button}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f4f4f4",
  },

  chatBox: {
    width: "500px",
    height: "700px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    padding: "15px",
  },

  messages: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginTop: "10px",
  },

  message: {
    maxWidth: "70%",
    padding: "10px",
    borderRadius: "10px",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
  },

  inputArea: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },

  button: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};