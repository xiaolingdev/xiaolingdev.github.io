// 5. 自定義 Hook 用於安全的翻譯 (src/hooks/useTranslation.js)
import { useLanguage } from '../contexts/LanguageContext';

export const useTranslation = () => {
  const { language, t } = useLanguage();

  // 安全的翻譯函數，有 fallback 機制
  const safeT = (key, fallback = null) => {
    const translation = t(key, fallback || key);
    return translation;
  };

  return {
    language,
    t: safeT,
    isZh: language === 'zh',
    isDe: language === 'de'
  };
};

// 6. 語言功能控制組件 (src/components/LanguageControl.js)
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageControl = () => {
  const { isMultilingualEnabled, setIsMultilingualEnabled } = useLanguage();

  // 這個組件可以放在管理後台或開發環境中
  // 用於控制語言切換功能的開關
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg p-4 shadow-lg z-50">
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="multilingual-toggle"
          checked={isMultilingualEnabled}
          onChange={(e) => setIsMultilingualEnabled(e.target.checked)}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="multilingual-toggle" className="text-sm font-medium text-gray-700">
          啟用多語言切換
        </label>
      </div>
    </div>
  );
};

export default LanguageControl;
