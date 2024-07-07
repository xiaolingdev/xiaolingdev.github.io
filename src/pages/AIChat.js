import React, { useState } from 'react';
import { Send, AlertCircle } from 'lucide-react';

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // 模擬AI回應
      setTimeout(() => {
        setMessages(messages => [...messages, { text: '感謝您的提問。我是AI助理，正在處理您的問題。', sender: 'ai' }]);
      }, 1000);
      setInput('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">AI 政策問答</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-light-blue text-white' : 'bg-gray-200'}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t p-4 flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="輸入您的問題..."
            className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-light-blue"
          />
          <button
            onClick={handleSend}
            className="bg-light-blue text-white px-4 py-2 rounded-r-lg hover:bg-light-purple transition duration-300"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      <div className="mt-6 flex items-center text-red-600">
        <AlertCircle size={24} className="mr-2" />
        <p className="text-lg">
          請注意：AI 回應僅供參考，實際政策信息請以官方資料為準。
        </p>
      </div>
    </div>
  );
};

export default AIChat;
