import React from 'react';
import { Zap, Wind, Cloud, Gauge, Shield, Leaf, BarChart3, AlertTriangle } from 'lucide-react';

const NuclearPowerPolicy = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-8">
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        {/* 標題區 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            恢復核能發電政策
          </h1>
          <p className="mt-4 text-gray-600">穩定供電・環保減碳・經濟發展</p>
        </div>

        {/* 當前挑戰 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">台灣能源現況挑戰</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-red-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Gauge className="text-red-500 w-6 h-6" />
                <h3 className="font-bold text-gray-800">供電吃緊</h3>
              </div>
              <p className="text-gray-600">備用容量率偏低，高峰期供電緊張</p>
            </div>
            <div className="bg-amber-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-amber-500 w-6 h-6" />
                <h3 className="font-bold text-gray-800">電價壓力</h3>
              </div>
              <p className="text-gray-600">發電成本上升，電價調漲壓力大</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Cloud className="text-blue-500 w-6 h-6" />
                <h3 className="font-bold text-gray-800">減碳目標</h3>
              </div>
              <p className="text-gray-600">2050淨零排放目標面臨挑戰</p>
            </div>
          </div>
        </div>

        {/* 核電優勢 */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-blue-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">核電優勢</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Zap className="text-yellow-500 w-6 h-6" />
                  <h4 className="font-bold text-gray-700">穩定供電</h4>
                </div>
                <p className="text-gray-600">全年穩定發電，不受天候影響，可提供基載電力</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Leaf className="text-green-500 w-6 h-6" />
                  <h4 className="font-bold text-gray-700">低碳排放</h4>
                </div>
                <p className="text-gray-600">發電過程零碳排放，有助達成減碳目標</p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="text-blue-500 w-6 h-6" />
                  <h4 className="font-bold text-gray-700">成本效益</h4>
                </div>
                <p className="text-gray-600">長期運轉成本低，可平抑電價上漲壓力</p>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">具體效益</h3>
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-700 mb-3">供電容量提升</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">備用容量率</span>
                  <span className="font-bold text-green-600">+10-15%</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-700 mb-3">碳排放減少</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">年減碳量</span>
                  <span className="font-bold text-green-600">約2000萬噸</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-700 mb-3">發電成本</h4>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">平均度電成本</span>
                  <span className="font-bold text-green-600">較燃氣低30%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 安全管理 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-amber-500 w-8 h-8" />
              <span>安全管理升級</span>
            </div>
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-3">強化監管機制</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 國際安全標準</li>
                <li>• 定期安全評估</li>
                <li>• 即時監測系統</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-3">災防應變提升</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 完整應變計畫</li>
                <li>• 定期演練</li>
                <li>• 跨部門合作</li>
              </ul>
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-3">資訊透明化</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 運轉資訊公開</li>
                <li>• 民眾參與機制</li>
                <li>• 即時通報系統</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 循序推動 */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6">循序推動策略</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white/20 rounded-xl p-4">
              <h4 className="font-bold mb-2">第一階段</h4>
              <p className="text-sm">現有機組安全檢查評估</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <h4 className="font-bold mb-2">第二階段</h4>
              <p className="text-sm">逐步重啟安全無虞機組</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <h4 className="font-bold mb-2">第三階段</h4>
              <p className="text-sm">提升運轉效能與安全</p>
            </div>
            <div className="bg-white/20 rounded-xl p-4">
              <h4 className="font-bold mb-2">第四階段</h4>
              <p className="text-sm">建立長期穩定營運</p>
            </div>
          </div>
        </div>

        {/* 公眾溝通 */}
        <div className="mt-12 bg-slate-50 rounded-3xl p-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">公眾參與機制</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">定期舉辦公聽會與說明會</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">設立地方監督委員會</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">建立即時資訊平台</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">在地回饋措施</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">地方建設補助</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">電費優惠方案</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">就業機會創造</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuclearPowerPolicy;