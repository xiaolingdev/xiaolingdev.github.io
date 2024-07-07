// components/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, MessageCircle } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-light-blue text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          翁曉玲立委
        </Link>
        <div className="flex items-center md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="mr-4">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link to="/ai-chat">
            <MessageCircle size={24} />
          </Link>
        </div>
        <nav className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex space-x-6">
            <li><Link to="/" className="block py-2">首頁</Link></li>
            <li><Link to="/about" className="block py-2">關於</Link></li>
            <li><Link to="/activities" className="block py-2">官方消息</Link></li>
            <li><Link to="/policy-issues" className="block py-2">政策議題</Link></li>
            <li><Link to="/achievements" className="block py-2">目前績效</Link></li>
            <li><Link to="/contact" className="block py-2">民眾服務</Link></li>
          </ul>
          <Link to="/ai-chat" className="ml-4">
            <MessageCircle size={24} />
          </Link>
        </nav>
      </div>
      {isMenuOpen && (
        <nav className="mt-4 md:hidden">
          <ul className="flex flex-col space-y-2">
            <li><Link to="/" className="block py-2">首頁</Link></li>
            <li><Link to="/about" className="block py-2">關於</Link></li>
            <li><Link to="/activities" className="block py-2">官方消息</Link></li>
            <li><Link to="/policy-issues" className="block py-2">政策議題</Link></li>
            <li><Link to="/achievements" className="block py-2">目前績效</Link></li>
            <li><Link to="/contact" className="block py-2">民眾服務</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
