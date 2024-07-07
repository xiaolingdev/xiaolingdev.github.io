// components/Footer.js
import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-light-blue text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>辦公室地址: 台北市中山區中山北路二段 123 號</p>
            <p>電話: (02) 1234-5678</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-light-purple"><Facebook size={24} /></a>
            <a href="#" className="hover:text-light-purple"><Twitter size={24} /></a>
            <a href="#" className="hover:text-light-purple"><Instagram size={24} /></a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p>&copy; 2024 翁曉玲立委辦公室. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
