import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, ChevronDown } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);

  // 當路由改變時關閉菜單
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // 點擊外部關閉菜單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (dropdown, event) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleNavigation = (path) => {
    setActiveDropdown(null);
    setIsMenuOpen(false);
    navigate(path);
  };

  const achievementsItems = [
    { title: '立法成果', path: '/proposals' },
    { title: '質詢影音', path: '/video-gallery' },
  ];

  const activitiesItems = [
    { title: '活動回顧', path: '/past' },
    { title: '活動報名', path: '/activities' },
  ];

  return (
    <header ref={headerRef} className="relative bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMenuOpen(false)}>
            <span className="text-2xl font-bold text-gray-800">翁曉玲</span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMenuOpen}
              aria-label="主選單"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link 
              to="/ai-chat" 
              className="p-2 ml-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              aria-label="AI聊天"
            >
              <MessageCircle size={24} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <NavLink to="/">首頁</NavLink>
            <NavLink to="/about">關於</NavLink>
            <DropdownNavLink
              title="活動報名"
              items={activitiesItems}
              isActive={activeDropdown === 'activities'}
              onClick={(e) => toggleDropdown('activities', e)}
              onNavigation={handleNavigation}
            />
            <NavLink to="/policy-issues">政策議題</NavLink>
            <DropdownNavLink
              title="目前績效"
              items={achievementsItems}
              isActive={activeDropdown === 'achievements'}
              onClick={(e) => toggleDropdown('achievements', e)}
              onNavigation={handleNavigation}
            />
            <NavLink to="/contact">民眾服務</NavLink>
            <Link 
              to="/ai-chat" 
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              aria-label="AI聊天"
            >
              <MessageCircle size={24} />
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <nav className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <MobileNavLink onClick={() => handleNavigation('/')}>首頁</MobileNavLink>
            <MobileNavLink onClick={() => handleNavigation('/about')}>關於</MobileNavLink>
            <MobileDropdownNavLink
              title="活動報名"
              items={activitiesItems}
              isActive={activeDropdown === 'mobile-activities'}
              onClick={(e) => toggleDropdown('mobile-activities', e)}
              onNavigation={handleNavigation}
            />
            <MobileNavLink onClick={() => handleNavigation('/policy-issues')}>
              政策議題
            </MobileNavLink>
            <MobileDropdownNavLink
              title="目前績效"
              items={achievementsItems}
              isActive={activeDropdown === 'mobile-achievements'}
              onClick={(e) => toggleDropdown('mobile-achievements', e)}
              onNavigation={handleNavigation}
            />
            <MobileNavLink onClick={() => handleNavigation('/contact')}>
              民眾服務
            </MobileNavLink>
          </div>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({ to, children }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out
        ${isActive 
          ? 'text-blue-600 bg-blue-50' 
          : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
        }`}
    >
      {children}
    </Link>
  );
};

const DropdownNavLink = ({ title, items, isActive, onClick, onNavigation }) => {
  const dropdownRef = useRef(null);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out
          ${isActive 
            ? 'text-blue-600 bg-blue-50' 
            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
          }`}
        aria-expanded={isActive}
      >
        {title}
        <ChevronDown
          size={16}
          className={`ml-1 transform transition-transform duration-200 ${
            isActive ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="py-1" role="menu">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => onNavigation(item.path)}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150"
              role="menuitem"
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const MobileNavLink = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition duration-150 ease-in-out"
  >
    {children}
  </button>
);

const MobileDropdownNavLink = ({ title, items, isActive, onClick, onNavigation }) => (
  <div className="space-y-1">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition duration-150 ease-in-out"
      aria-expanded={isActive}
    >
      {title}
      <ChevronDown
        size={16}
        className={`transform transition-transform duration-200 ${
          isActive ? 'rotate-180' : ''
        }`}
      />
    </button>
    
    <div
      className={`transition-all duration-200 ${
        isActive ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}
    >
      <div className="pl-4 space-y-1">
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => onNavigation(item.path)}
            className="block w-full text-left px-3 py-2 rounded-md text-sm text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition duration-150 ease-in-out"
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default Header;