import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const LegislativeProcess = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-sky-50 to-indigo-50 p-8">
      {/* 背景裝飾 */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-50" />

      {/* 法案誕生動畫箭頭 */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-3 animate-bounce">
        <Sparkles className="text-yellow-400 w-6 h-6" />
        <div className="px-4 py-2 bg-yellow-100 rounded-full text-sm font-medium text-yellow-700">
          法案誕生
        </div>
        <Sparkles className="text-yellow-400 w-6 h-6" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            立法程序
          </h1>
        </div>

        {/* 主要內容網格 */}
        <div className="grid grid-cols-3 gap-8">
          {/* 提案階段 */}
          <div className="col-span-2 bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all">
            <div className="flex gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-6 text-blue-800">提案來源</h2>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: '行政院', icon: '🏛️', note: '預算案專屬提案者' },
                    { title: '司法院', icon: '⚖️' },
                    { title: '考試院', icon: '📝' },
                    { title: '監察院', icon: '🔍' },
                    { title: '立法委員', icon: '👥' },
                    { title: '政黨團體', icon: '🎯' }
                  ].map((source, i) => (
                    <div key={i} className="flex items-center bg-blue-50 rounded-xl p-4">
                      <span className="text-2xl mr-3">{source.icon}</span>
                      <div>
                        <div className="font-semibold">{source.title}</div>
                        {source.note && (
                          <div className="text-xs text-blue-600 mt-1">{source.note}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 程序委員會 */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-emerald-800">程序委員會</h2>
            <div className="relative">
              <div className="absolute inset-0 bg-white/50 rounded-2xl" />
              <div className="relative p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-3xl">
                    19人
                  </div>
                </div>
                <p className="text-center text-sm text-emerald-700">
                  依政黨席次比例分配<br />
                  每黨至少1席
                </p>
              </div>
            </div>
          </div>

          {/* 審議程序卡片區 */}
          <div className="col-span-3 grid grid-cols-4 gap-8 mt-8">
            {[
              {
                title: '一讀',
                color: 'from-violet-50 to-purple-50',
                textColor: 'violet',
                content: '院會朗讀標題',
                options: ['交付委員會審查', '逕付二讀']
              },
              {
                title: '委員會審查',
                color: 'from-amber-50 to-orange-50',
                textColor: 'amber',
                content: '邀請各方提供意見',
                details: ['舉行公聽會', '併案審查', '提出審查報告']
              },
              {
                title: '黨團協商',
                color: 'from-cyan-50 to-teal-50',
                textColor: 'cyan',
                content: '政黨間溝通協調',
                details: ['各黨團代表參與', '尋求共識', '化解歧見']
              },
              {
                title: '二讀與三讀',
                color: 'from-rose-50 to-pink-50',
                textColor: 'rose',
                content: '深入討論與定案',
                steps: ['逐條討論', '修正內容', '文字潤飾', '三讀完成']
              }
            ].map((stage, i) => (
              <div key={i} className={`bg-gradient-to-br ${stage.color} rounded-3xl p-8 shadow-xl relative`}>
                <h2 className={`text-2xl font-bold mb-6 text-${stage.textColor}-800`}>
                  {stage.title}
                </h2>
                <div className="space-y-4">
                  <p className="font-medium">{stage.content}</p>
                  {stage.options && (
                    <div className="flex gap-2 flex-wrap">
                      {stage.options.map((opt, j) => (
                        <span key={j} className="px-3 py-1 bg-white/60 rounded-full text-sm">
                          {opt}
                        </span>
                      ))}
                    </div>
                  )}
                  {stage.details && (
                    <ul className="space-y-2">
                      {stage.details.map((detail, j) => (
                        <li key={j} className="flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {stage.steps && (
                    <div className="space-y-2">
                      {stage.steps.map((step, j) => (
                        <div key={j} className="flex items-center space-x-2">
                          <span className={`text-${stage.textColor}-400`}>{j + 1}.</span>
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* 連接箭頭 */}
                {i < 3 && (
                  <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-gray-400 animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 底部總統公布區 */}
          <div className="col-span-3 mt-8">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-3xl p-8 text-white">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">總統公布</h2>
                <div className="flex items-center space-x-4">
                  <div className="px-4 py-2 bg-white/20 rounded-xl">
                    10日內公布
                  </div>
                  <div className="px-4 py-2 bg-white/20 rounded-xl">
                    或請行政院覆議
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 補充說明區 */}
          <div className="col-span-3 mt-12 bg-white/80 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-4 text-gray-700">補充說明</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-600">
                  委員可在下次院會散會前提出復議
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-600">
                  立委任期結束，未完成議案不會延續到下屆
                  <span className="text-sm text-gray-500 block mt-1">
                    (預算及人民請願案除外)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 法案完成動畫箭頭 */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 animate-bounce">
          <Sparkles className="text-green-400 w-6 h-6" />
          <div className="px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-700">
            法案完成
          </div>
          <Sparkles className="text-green-400 w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default LegislativeProcess;