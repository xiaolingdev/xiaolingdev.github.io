// 3. 更新後的 Header 組件 (src/components/Header.js)
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, MessageCircle, ChevronDown, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const { language, changeLanguage, t, isMultilingualEnabled } = useLanguage();

  // 當路由改變時關閉菜單
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setIsLangMenuOpen(false);
  }, [location.pathname]);

  // 點擊外部關閉菜單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setActiveDropdown(null);
        setIsLangMenuOpen(false);
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

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    setIsLangMenuOpen(false);
  };

  // 統一的導航項目配置
  const navigationItems = [
    { title: t('nav.home', '首頁'), path: '/' },
    { title: t('nav.about', '關於'), path: '/about' },
    { title: t('nav.videoGallery', '質詢影音'), path: '/video-gallery' },
    { title: t('nav.proposals', '法案進度'), path: '/proposals' },
    { title: t('nav.joinUs', '加入我們'), path: '/join-us' },
    { title: t('nav.contact', '民眾服務'), path: '/contact' },
  ];

  const languages = [
    { code: 'zh', name: t('lang.chinese', '中文'), flag: '🇹🇼' },
    { code: 'de', name: t('lang.german', 'Deutsch'), flag: '🇩🇪' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

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
            {/* 語言切換 - 手機版 */}
            {isMultilingualEnabled && (
              <div className="relative mr-2">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-1 p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="選擇語言"
                >
                  <Globe size={20} />
                  <span className="text-sm">{currentLanguage?.flag}</span>
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                          language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-expanded={isMenuOpen}
              aria-label="主選單"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <Link 
              to="https://claude.ai/public/artifacts/3fd60c8c-1e73-4ad3-b52c-7db2034d9108?fullscreen=true" 
              className="p-2 ml-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              aria-label={t('nav.aiChat', 'AI聊天')}
            >
              <MessageCircle size={24} />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navigationItems.map((item) => (
              <NavLink key={item.path} to={item.path}>
                {item.title}
              </NavLink>
            ))}
            
            {/* 語言切換 - 桌面版 */}
            {isMultilingualEnabled && (
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="選擇語言"
                >
                  <Globe size={18} />
                  <span className="text-sm">{currentLanguage?.flag}</span>
                  <span className="text-sm">{currentLanguage?.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isLangMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 ${
                          language === lang.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <Link 
              to="https://claude.ai/public/artifacts/3fd60c8c-1e73-4ad3-b52c-7db2034d9108?fullscreen=true" 
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-md"
              aria-label={t('nav.aiChat', 'AI聊天')}
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
            {navigationItems.map((item) => (
              <MobileNavLink key={item.path} onClick={() => handleNavigation(item.path)}>
                {item.title}
              </MobileNavLink>
            ))}
            <MobileNavLink onClick={() => handleNavigation('/ai-chat')}>
              {t('nav.aiChat', 'AI聊天')}
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

const MobileNavLink = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition duration-150 ease-in-out"
  >
    {children}
  </button>
);

export default Header;