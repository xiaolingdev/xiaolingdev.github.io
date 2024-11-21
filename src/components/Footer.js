import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">翁曉玲立委</h3>
            <p className="mb-4">致力於為台灣的未來打造更美好的願景。</p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<Facebook size={20} />} />
              <SocialLink href="#" icon={<Twitter size={20} />} />
              <SocialLink href="#" icon={<Instagram size={20} />} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">快速連結</h3>
            <ul className="space-y-2">
              <li><FooterLink to="/about">關於我們</FooterLink></li>
              <li><FooterLink to="/activities">最新活動</FooterLink></li>
              <li><FooterLink to="/policy-issues">政策議題</FooterLink></li>
              <li><FooterLink to="/achievements">政績</FooterLink></li>
              <li><FooterLink to="/contact">聯絡我們</FooterLink></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">聯絡資訊</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={20} className="mr-2" />
                台北市中正區青島東路1號
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2" />
                02-2358-8196
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2" />
                <a href="mailto:ly11275f@ly.gov.tw" className="hover:text-indigo-600 transition duration-300">
                  ly11275f@ly.gov.tw
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p>&copy; 2024 翁曉玲立委辦公室. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-indigo-600 transition duration-300"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="hover:text-indigo-600 transition duration-300"
  >
    {children}
  </Link>
);

export default Footer;