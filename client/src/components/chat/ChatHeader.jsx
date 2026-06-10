import React from 'react';

const ChatHeader = ({ title, subtitle }) => {
  return (
    <div className="chat-header">
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
};

export default ChatHeader;
