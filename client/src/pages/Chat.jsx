// pages/Chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  Image,
  File,
  Mic,
  X,
  CheckCheck,
  Check,
  User,
  Users,
  Plus,
  LogOut,
  Settings,
  Bell,
  Menu,
  ArrowLeft,
  MessageCircle
} from 'lucide-react';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMobileChat, setShowMobileChat] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock data - Replace with actual API calls
  const [chats, setChats] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=8b5cf6&color=fff',
      lastMessage: 'Hey! How are you doing?',
      timestamp: '10:30 AM',
      unread: 2,
      online: true,
      typing: false,
      isGroup: false
    },
    {
      id: 2,
      name: 'Sarah Williams',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=ec4899&color=fff',
      lastMessage: 'See you tomorrow!',
      timestamp: 'Yesterday',
      unread: 0,
      online: false,
      typing: false,
      isGroup: false
    },
    {
      id: 3,
      name: 'Design Team',
      avatar: 'https://ui-avatars.com/api/?name=Design+Team&background=06b6d4&color=fff',
      lastMessage: 'Mike: Great work everyone!',
      timestamp: 'Yesterday',
      unread: 5,
      online: true,
      typing: false,
      isGroup: true,
      members: ['Alex', 'Sarah', 'Mike', 'John']
    },
    {
      id: 4,
      name: 'John Smith',
      avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=10b981&color=fff',
      lastMessage: 'Thanks for the update',
      timestamp: 'Monday',
      unread: 0,
      online: true,
      typing: false,
      isGroup: false
    },
    {
      id: 5,
      name: 'Development Squad',
      avatar: 'https://ui-avatars.com/api/?name=Dev+Squad&background=f59e0b&color=fff',
      lastMessage: 'Emily: PR merged successfully',
      timestamp: 'Monday',
      unread: 3,
      online: false,
      typing: false,
      isGroup: true,
      members: ['John', 'Emily', 'Chris', 'David']
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      chatId: 1,
      sender: 'Alex Johnson',
      content: 'Hey there! 👋',
      timestamp: '10:30 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: 2,
      chatId: 1,
      sender: 'me',
      content: 'Hi Alex! How are you?',
      timestamp: '10:31 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: 3,
      chatId: 1,
      sender: 'Alex Johnson',
      content: 'I\'m doing great! Working on the new project.',
      timestamp: '10:32 AM',
      type: 'text',
      status: 'read'
    },
    {
      id: 4,
      chatId: 1,
      sender: 'me',
      content: 'Awesome! Let me know if you need any help.',
      timestamp: '10:33 AM',
      type: 'text',
      status: 'delivered'
    }
  ]);

  const [typingUsers, setTypingUsers] = useState({});

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      chatId: selectedChat.id,
      sender: 'me',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
      status: 'sent'
    };

    setMessages([...messages, newMessage]);
    
    // Update last message in chat list
    const updatedChats = chats.map(chat => 
      chat.id === selectedChat.id 
        ? { ...chat, lastMessage: messageInput, timestamp: 'Just now' }
        : chat
    );
    setChats(updatedChats);
    
    setMessageInput('');

    // Simulate message status update
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      );
    }, 2000);

    // Simulate typing indicator
    setTimeout(() => {
      setTypingUsers({ ...typingUsers, [selectedChat.id]: true });
      setTimeout(() => {
        setTypingUsers({ ...typingUsers, [selectedChat.id]: false });
        // Simulate reply
        const replyMessage = {
          id: messages.length + 2,
          chatId: selectedChat.id,
          sender: selectedChat.name,
          content: 'Thanks for your message! I\'ll get back to you shortly.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
          status: 'read'
        };
        setMessages(prev => [...prev, replyMessage]);
      }, 3000);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageStatusIcon = (status) => {
    switch(status) {
      case 'sent':
        return <Check className="w-3 h-3" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  const getUnreadCount = () => {
    return chats.reduce((total, chat) => total + chat.unread, 0);
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    // Mark as read
    const updatedChats = chats.map(c => 
      c.id === chat.id ? { ...c, unread: 0 } : c
    );
    setChats(updatedChats);
    if (window.innerWidth < 768) {
      setShowMobileChat(true);
    }
  };

  const handleBackToChats = () => {
    setShowMobileChat(false);
    setSelectedChat(null);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] bg-black flex overflow-hidden">
      {/* Sidebar - Chat List */}
      <div className={`
        ${showSidebar ? 'w-full md:w-96' : 'w-0'}
        ${showMobileChat ? 'hidden md:block' : 'block'}
        bg-gray-900/50 border-r border-white/10 flex flex-col transition-all duration-300
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">Chats</h2>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Users className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => handleChatSelect(chat)}
              className={`
                flex items-center gap-3 p-4 cursor-pointer transition-all duration-200
                ${selectedChat?.id === chat.id ? 'bg-purple-500/20 border-l-4 border-purple-500' : 'hover:bg-white/5'}
              `}
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  className="w-12 h-12 rounded-full"
                />
                {chat.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-black"></span>
                )}
                {chat.isGroup && (
                  <div className="absolute -bottom-1 -right-1 bg-purple-500 rounded-full p-0.5">
                    <Users className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-500">{chat.timestamp}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-sm text-gray-400 truncate flex-1">
                    {chat.typing ? (
                      <span className="text-purple-400">Typing...</span>
                    ) : (
                      chat.lastMessage
                    )}
                  </p>
                  {chat.unread > 0 && (
                    <span className="ml-2 bg-purple-500 text-white text-xs rounded-full px-2 py-0.5">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`
        flex-1 flex flex-col
        ${showMobileChat ? 'flex' : 'hidden md:flex'}
      `}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gray-900/30">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToChats}
                  className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full"
                  />
                  {selectedChat.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-black"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{selectedChat.name}</h3>
                  <p className="text-xs text-gray-400">
                    {selectedChat.online ? 'Online' : 'Offline'}
                    {selectedChat.isGroup && ` • ${selectedChat.members?.length} members`}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <Phone className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages
                .filter(msg => msg.chatId === selectedChat.id)
                .map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`
                      max-w-[70%] rounded-2xl px-4 py-2
                      ${message.sender === 'me' 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-gray-800 text-gray-200'}
                    `}>
                      {message.sender !== 'me' && (
                        <p className="text-xs text-purple-400 mb-1">{message.sender}</p>
                      )}
                      <p className="text-sm break-words">{message.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-[10px] opacity-70">{message.timestamp}</span>
                        {message.sender === 'me' && getMessageStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
              
              {/* Typing Indicator */}
              {typingUsers[selectedChat.id] && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 rounded-2xl px-4 py-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Area */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-end gap-2">
                <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <div className="flex-1 relative">
                  <textarea
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    rows="1"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                    style={{ minHeight: '40px', maxHeight: '120px' }}
                  />
                  <button className="absolute right-2 bottom-2 p-1 text-gray-400 hover:text-purple-400">
                    <Smile className="w-5 h-5" />
                  </button>
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                  className={`
                    p-2 rounded-xl transition-all
                    ${messageInput.trim() 
                      ? 'bg-purple-500 text-white hover:bg-purple-600' 
                      : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
                  `}
                >
                  <Send className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-purple-400 transition-colors">
                  <Mic className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          // No Chat Selected
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                <MessageCircle className="w-10 h-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Welcome to Chat</h3>
              <p className="text-gray-400">Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;