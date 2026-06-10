import React from 'react';

const MessageBubble = ({ message }) => {
  return (
    <div className={`message-bubble ${message.type || 'received'}`}>
      <div className="message-header">
        <span className="sender">{message.sender}</span>
        <span className="timestamp">{message.timestamp}</span>
      </div>
      <div className="message-content">
        {message.content}
      </div>
    </div>
  );
};

export default MessageBubble;
