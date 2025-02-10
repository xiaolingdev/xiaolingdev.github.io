import React, { useEffect, useState } from 'react';
import { AlertTriangle, X, Check, ExternalLink, Shield } from 'lucide-react';

const SafetyCheck = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const url = urlParams.get('url');
    if (url) {
      setTargetUrl(url);
    } else {
      setError('錯誤：沒有提供目標網址');
    }
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const getSafeCheckUrl = () => {
    return `https://transparencyreport.google.com/safe-browsing/search?url=${encodeURIComponent(targetUrl)}`;
  };

  if (!targetUrl && !error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin">
          <Shield className="w-8 h-8 text-indigo-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="flex items-center justify-center gap-2 text-2xl font-bold">
            <AlertTriangle className="w-6 h-6 text-amber-500" />
            安全檢查提醒
          </h1>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {error ? (
              <div className="text-red-500 font-semibold text-center">
                {error}
              </div>
            ) : (
              <>
                <div className="text-center space-y-4">
                  <p className="text-gray-600">您即將離開本網站並前往：</p>
                  <div className="p-4 bg-gray-50 rounded-lg break-all">
                    <span className="text-gray-800 font-medium">{targetUrl}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 mb-4">
                    為了確保您的安全，建議您先查看 Google 的安全性檢查結果：
                  </p>
                  <a
                    href={getSafeCheckUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors mb-2"
                  >
                    <Shield className="w-5 h-5" />
                    查看安全性報告
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                  <p className="text-sm text-blue-600 text-center">
                    將在新視窗中開啟 Google 安全性檢查
                  </p>
                </div>

                <div className="text-center space-y-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-600">確認安全後，您可以選擇：</p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={targetUrl}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-5 h-5" />
                      繼續前往
                    </a>
                    <button
                      onClick={handleBack}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                      取消
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyCheck;