import React from 'react';
import MessageBubble from './MessageBubble';

const ChatList = ({ messages }) => {
  return (
    <div className="chat-list">
      {messages && messages.length > 0 ? (
        messages.map((message, index) => (
          <MessageBubble key={index} message={message} />
        ))
      ) : (
        <p className="no-messages">No messages yet</p>
      )}
    </div>
  );
};

export default ChatList;
