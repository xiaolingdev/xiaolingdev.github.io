import React from 'react';
import { Scale, AlertTriangle, Shield, Gavel, FileText, Users, Heart } from 'lucide-react';

const WuClauseRemoval = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-gray-50 p-8">
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        {/* 標題區 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            支持刪除兩岸人民關係條例第9條之3
          </h1>
          <p className="mt-4 text-gray-600">保障基本人權・維護憲法精神</p>
        </div>

        {/* 現行條文說明 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-12">
          <div className="flex items-start gap-4">
            <FileText className="text-blue-600 w-8 h-8 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">現行條文重點</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-700 mb-3">規範對象</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 前國防政務副首長</li>
                    <li>• 前外交政務副首長</li>
                    <li>• 前大陸事務政務副首長</li>
                    <li>• 少將以上退役軍官</li>
                    <li>• 前情報機關首長</li>
                  </ul>
                </div>
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-bold text-gray-700 mb-3">處罰內容</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>• 停止月退俸50-100%達5年</li>
                    <li>• 情節重大者剝奪月退俸</li>
                    <li>• 罰鍰200萬至1000萬</li>
                    <li>• 追繳註銷獎勳章</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 違憲理由 */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-red-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              <div className="flex items-center gap-3">
                <AlertTriangle className="text-red-500 w-6 h-6" />
                <span>違憲疑慮</span>
              </div>
            </h3>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-700">違反言論自由</h4>
                <p className="text-gray-600 mt-2">
                  過度限制個人表達自由，違反憲法保障的基本人權
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-700">違反比例原則</h4>
                <p className="text-gray-600 mt-2">
                  處罰方式過於嚴厲，與行為不相稱
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-700">侵害生存權</h4>
                <p className="text-gray-600 mt-2">
                  剝奪退休金影響退休人員基本生活保障
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              <div className="flex items-center gap-3">
                <Scale className="text-purple-500 w-6 h-6" />
                <span>法律問題</span>
              </div>
            </h3>
            <div className="space-y-4">
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-700">構成要件不明確</h4>
                <p className="text-gray-600 mt-2">
                  「妨害國家尊嚴」等用語模糊，缺乏明確標準
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-700">審查機制不透明</h4>
                <p className="text-gray-600 mt-2">
                  跨部會審查會運作缺乏明確規範
                </p>
              </div>
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-bold text-gray-700">雙重處罰疑慮</h4>
                <p className="text-gray-600 mt-2">
                  同時課以退休金剝奪與鉅額罰鍰
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 刪除理由 */}
        <div className="bg-blue-50 rounded-3xl p-8 shadow-xl mb-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            <div className="flex items-center gap-3">
              <Gavel className="text-blue-600 w-6 h-6" />
              <span>支持刪除的理由</span>
            </div>
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-3">保障基本人權</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 維護言論自由</li>
                <li>• 保障表意自由</li>
                <li>• 確保生存權利</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-3">促進社會和諧</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 減少社會對立</li>
                <li>• 增進互信理解</li>
                <li>• 維護社會和諧</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-bold text-gray-700 mb-3">符合法治精神</h4>
              <ul className="space-y-2 text-gray-600">
                <li>• 維護法律明確性</li>
                <li>• 確保比例原則</li>
                <li>• 落實正當程序</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 結論 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">刪除條文 捍衛人權</h3>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-xl">
                尊重憲法精神
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-xl">
                維護法治原則
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-xl">
                保障基本人權
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WuClauseRemoval;