"use client";
import { useEffect, useState } from 'react';
import socket from '../lib/socket';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const ChatComponent = () => {
  const [messages, setMessages] = useState<
    { senderId: string; recipientId: string; content: string; timestamp: Date }[]
  >([]);
  const [messageText, setMessageText] = useState('');
  const { isAuthenticated, user } = useKindeBrowserClient();
  const [recipientId, setRecipientId] = useState(user?.id || '');


  console.log('User:', user);
  console.log('Is Authenticated:', isAuthenticated);    

  useEffect(() => {
    if (user?.id) {
      socket.emit('join', user.id);

      socket.on('receiveMessage', (message) => {
        setMessages((prev) => [...prev, { ...message, senderId: message.senderId || '' }]);
      });
    }

    return () => {
      socket.off('receiveMessage');
    };
  }, [user?.id]);

  const sendMessage = () => {
    if (!recipientId || !messageText.trim()) return;

    const message = {
      senderId: user?.id || '',
      recipientId,
      content: messageText,
      timestamp: new Date(),
    };

    socket.emit('sendNewMessage', {
      recipientId,
      message,
    });

    setMessages((prev) => [...prev, message]);
    setMessageText('');
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Chat</h1>

      {/* Message History */}
      <div className="h-64 overflow-y-auto mb-4 border p-2 rounded">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.senderId}</strong>: {msg.content} <em className="text-gray-500 text-xs">{new Date(msg.timestamp).toLocaleTimeString()}</em>
          </div>
        ))}
      </div>

      {/* Recipient ID */}
      <input
        type="text"
        placeholder="Recipient ID"
        value={recipientId}
        onChange={(e) => setRecipientId(e.target.value)}
        className="border px-2 py-1 rounded w-full mb-2"
      />

      {/* Message Input */}
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1 border px-2 py-1 rounded"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
