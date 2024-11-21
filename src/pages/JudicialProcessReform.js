import React from 'react';
import { Scale, AlertTriangle, Check, X, Users, Calculator } from 'lucide-react';

const JudicialProcessReform = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-gray-50 p-8">
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-red-50 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />

      <div className="relative max-w-7xl mx-auto">
        {/* 標題區 */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-600 to-gray-800">
            大法官審理制度改革
          </h1>
          <p className="mt-4 text-gray-600">維護司法正義，確保審判品質</p>
        </div>

        {/* 核心問題說明 */}
        <div className="bg-white rounded-3xl p-8 shadow-xl mb-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="text-amber-500 w-8 h-8 shrink-0 mt-1" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">現行制度隱憂</h2>
              <p className="text-gray-600 mb-4">
                目前採用現有總額計算，可能導致實際審理人數過少，
                卻仍能做出影響重大的判決
              </p>
              <div className="bg-amber-50 rounded-xl p-4">
                <p className="text-amber-800 font-medium">
                  例如：15位大法官中若有5位缺額，
                  實際僅需5票即可達到現有總額(10人)的過半門檻
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 對比卡片區 */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          {/* 現行制度 */}
          <div className="bg-gray-100 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 rounded-bl-xl">
              現行制度
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">以現有總額計算</h3>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-2">計算基礎</h4>
                <div className="flex items-center gap-2">
                  <Calculator className="text-gray-500 w-5 h-5" />
                  <p className="text-gray-600">扣除缺額後的實際在任人數</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-2">判決門檻</h4>
                <div className="flex items-center gap-2">
                  <Users className="text-gray-500 w-5 h-5" />
                  <p className="text-gray-600">現有總額的 1/2</p>
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-4">
                <h4 className="font-semibold text-red-700 mb-2">潛在問題</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                    <span className="text-red-700">重大判決可能由少數人決定</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <X className="text-red-500 w-5 h-5 shrink-0 mt-1" />
                    <span className="text-red-700">可能因缺額影響判決公正性</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 建議改革 */}
          <div className="bg-blue-50 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-xl">
              建議改革
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">改採法定總額計算</h3>
            
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-2">計算基礎</h4>
                <div className="flex items-center gap-2">
                  <Calculator className="text-blue-500 w-5 h-5" />
                  <p className="text-gray-600">以法定總額15人為基準</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4">
                <h4 className="font-semibold text-gray-700 mb-2">判決門檻</h4>
                <div className="flex items-center gap-2">
                  <Users className="text-blue-500 w-5 h-5" />
                  <p className="text-gray-600">恢復至法定總額的 2/3</p>
                </div>
              </div>

              <div className="bg-blue-100 rounded-xl p-4">
                <h4 className="font-semibold text-blue-700 mb-2">預期效果</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 w-5 h-5 shrink-0 mt-1" />
                    <span className="text-blue-700">確保重大判決需更多共識</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-blue-500 w-5 h-5 shrink-0 mt-1" />
                    <span className="text-blue-700">避免缺額影響判決結果</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 具體數字說明 */}
        <div className="bg-indigo-50 rounded-3xl p-8 shadow-xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">實際影響範例</h3>
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-semibold text-gray-700 mb-4">現行制度案例</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">法定總額</span>
                  <span className="font-bold">15人</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">假設缺額</span>
                  <span className="font-bold text-red-500">5人</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">現有總額</span>
                  <span className="font-bold">10人</span>
                </div>
                <div className="flex justify-between items-center bg-red-50 p-2 rounded">
                  <span className="text-red-700">判決所需票數</span>
                  <span className="font-bold text-red-500">僅需6票</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6">
              <h4 className="font-semibold text-gray-700 mb-4">改革後標準</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">法定總額</span>
                  <span className="font-bold">15人</span>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <span className="text-gray-600">2/3門檻</span>
                  <span className="font-bold text-blue-500">10人</span>
                </div>
                <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                  <span className="text-blue-700">判決所需票數</span>
                  <span className="font-bold text-blue-500">至少10票</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 小結論 */}
        <div className="mt-12 bg-gradient-to-r from-slate-700 to-gray-800 rounded-3xl p-8 text-white">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">改革目標</h3>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-xl">
                確保審判品質
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-xl">
                維護司法正義
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudicialProcessReform;