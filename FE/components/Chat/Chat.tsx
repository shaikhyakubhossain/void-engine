"use client";
import { useState } from "react";
import styles from "./Chat.module.scss";

import ChatHeader from "./ChatHeader";
import EmptyState from "./EmptyState";
import SuggestionGrid from "./SuggestionGrid";
import ChatInput from "./ChatInput";

const Chat = () => {
  const [message, setMessage] = useState("");

  return (
    <main className={styles.chat}>
      <ChatHeader />

      <div className={styles.content}>
        <EmptyState />

        <SuggestionGrid />
      </div>

      <ChatInput
        value={message}
        onChange={setMessage}
        onSubmit={() => {
          console.log(message);
          setMessage("");
        }}
      />
    </main>
  );
};

export default Chat;
