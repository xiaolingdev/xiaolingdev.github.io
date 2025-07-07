import { translations } from '../translations';

// 1. 語言上下文 Context (src/contexts/LanguageContext.js)
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('zh');
  const [isMultilingualEnabled, setIsMultilingualEnabled] = useState(false); // 控制功能開關

  useEffect(() => {
    // 從 localStorage 讀取語言偏好
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && ['zh', 'de'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (newLanguage) => {
    if (['zh', 'de'].includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem('preferredLanguage', newLanguage);
    }
  };

  // 安全的翻譯函數 - 如果沒有翻譯就回傳原文
  const t = (key, fallback = key) => {
    if (!translations[language] || !translations[language][key]) {
      return fallback;
    }
    return translations[language][key];
  };

  const value = {
    language,
    changeLanguage,
    t,
    isMultilingualEnabled,
    setIsMultilingualEnabled
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};