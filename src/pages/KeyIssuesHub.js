import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Zap, Scale, FileText, Calendar, PieChart, Activity, Shield } from 'lucide-react';

const KeyIssuesHub = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const issues = [
    {
      id: 'legislative',
      title: '立法程序',
      subtitle: '立法程序完整說明',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-green-500 to-teal-500',
      textColor: 'text-green-50',
      description: '深入了解台灣的立法程序與相關制度',
      tags: ['立法程序', '法案審議', '三讀制度'],
      stats: { supporters: '76%', articles: 142 },
      path: 'proess'  // 移除前導斜線
    },
    {
      id: 'nuclear',
      title: '核能政策',
      subtitle: '恢復使用核電的重要性',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-green-500',
      textColor: 'text-blue-50',
      description: '探討核能發電對台灣能源安全與環保的重要性',
      tags: ['能源政策', '環境永續', '電力供應'],
      stats: { supporters: '62%', articles: 156 },
      path: 'nuclearpower'  // 移除前導斜線
    },
    {
      id: 'judicial',
      title: '大法官制度',
      subtitle: '審理案件的門檻與總額改革',
      icon: <Scale className="w-6 h-6" />,
      color: 'from-indigo-500 to-blue-500',
      textColor: 'text-indigo-50',
      description: '探討大法官審理制度的改革方向與影響',
      tags: ['司法改革', '憲政制度', '司法獨立'],
      stats: { supporters: '54%', articles: 89 },
      path: 'reform'  // 移除前導斜線
    },
    {
      id: 'wu-clause',
      title: '兩岸條例修正',
      subtitle: '刪除第9條之3相關規定',
      icon: <FileText className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      textColor: 'text-purple-50',
      description: '探討吳斯懷條款存廢的憲法與人權考量',
      tags: ['兩岸關係', '人權保障', '法規修正'],
      stats: { supporters: '48%', articles: 124 },
      path: 'wuclause'  // 移除前導斜線
    }
  ];

  const IssueCard = ({ issue }) => {
    const isHovered = hoveredCard === issue.id;

    // 修改卡片點擊處理
    const handleCardClick = () => {
      console.log("Navigating to:", issue.path); // 添加導航日誌
      navigate(`/`);  // 添加前導斜線
    };

    return (
      <div
        className={`relative overflow-hidden rounded-3xl transition-all duration-300 ${
          isHovered ? 'scale-102 shadow-2xl' : 'shadow-xl'
        }`}
        onMouseEnter={() => setHoveredCard(issue.id)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${issue.color} opacity-90`} />
        
        <div className="relative p-8">
          <div className="flex justify-between items-start">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 ${issue.textColor} text-sm mb-4`}>
                {issue.icon}
                <span>重要議題</span>
              </div>
              <h3 className={`text-2xl font-bold ${issue.textColor} mb-2`}>{issue.title}</h3>
              <p className={`${issue.textColor} opacity-90 mb-4`}>{issue.subtitle}</p>
            </div>
          </div>

          <p className={`${issue.textColor} opacity-80 mb-6`}>{issue.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {issue.tags.map((tag, index) => (
              <span
                key={index}
                className={`px-3 py-1 rounded-full bg-white/10 ${issue.textColor} text-sm`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <div className={`${issue.textColor}`}>
                <span className="text-sm opacity-80">民意支持度</span>
                <div className="text-xl font-bold">{issue.stats.supporters}</div>
              </div>
              <div className={`${issue.textColor}`}>
                <span className="text-sm opacity-80">相關文章</span>
                <div className="text-xl font-bold">{issue.stats.articles}</div>
              </div>
            </div>
            
            {/* 使用 Link 組件替代 button */}
            <Link
              to={`/${issue.path}`}
              className={`group px-4 py-2 rounded-xl bg-white/20 ${issue.textColor} 
                flex items-center gap-2 transition-all cursor-pointer
                hover:bg-white/30`}
            >
              深入了解
              <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div 
          className={`absolute inset-0 bg-white opacity-0 transition-opacity duration-300 ${
            isHovered ? 'opacity-5' : ''
          }`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 p-8">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
            重要議題專區
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            深入探討攸關台灣未來的關鍵議題，提供完整的分析與討論
          </p>
        </div>

        <div className="grid grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Activity />, label: '追蹤議題', value: '24個' },
            { icon: <Calendar />, label: '每週更新', value: '12次' },
            { icon: <PieChart />, label: '民調資料', value: '186份' },
            { icon: <Shield />, label: '專家觀點', value: '89位' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 text-gray-800 mb-2">
                {stat.icon}
                <span className="font-medium">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">
            查看更多議題
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyIssuesHub;