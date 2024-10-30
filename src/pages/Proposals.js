import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, FileText, Download, ExternalLink, Tag, Clock, PieChart, BarChart3, BookOpen } from 'lucide-react';
import ProposalDetail from './ProposalDetail';

const ProposalAnalytics = ({ proposals }) => {
  const getStatusCounts = () => {
    const counts = proposals.reduce((acc, proposal) => {
      const status = proposal.議案狀態;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const getTypeCounts = () => {
    const counts = proposals.reduce((acc, proposal) => {
      const type = proposal.議案類別;
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const statusCounts = getStatusCounts();
  const typeCounts = getTypeCounts();

  const getStatusColor = (status) => {
    const colors = {
      '交付審查': 'bg-blue-500',
      '審查完畢': 'bg-green-500',
      '程序委員會': 'bg-yellow-500',
      '退回程序委員會': 'bg-red-500',
      '法規委員會審查': 'bg-purple-500',
    };
    return colors[status] || 'bg-gray-500';
  };

  const getTypeColor = (type) => {
    const colors = {
      '法律案': 'bg-indigo-500',
      '決議案': 'bg-orange-500',
      '預算案': 'bg-green-500',
      '其他': 'bg-gray-500',
    };
    return colors[type] || 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <PieChart className="mr-2" size={24} />
        提案現況分析
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 提案類別統計 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <BookOpen className="mr-2" size={20} />
            提案類別分布
          </h3>
          <div className="space-y-4">
            {Object.entries(typeCounts).map(([type, count]) => (
              <div key={type} className="flex items-center">
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">{type}</span>
                    <span className="text-gray-600">{count} 件</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${getTypeColor(type)} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${(count / proposals.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 提案狀態統計 */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
            <BarChart3 className="mr-2" size={20} />
            提案處理進度
          </h3>
          <div className="space-y-4">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex items-center">
                <div className="flex-grow">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">{status}</span>
                    <span className="text-gray-600">{count} 件</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className={`${getStatusColor(status)} h-2.5 rounded-full transition-all duration-500`}
                      style={{ width: `${(count / proposals.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 總計摘要 */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-indigo-600">{proposals.length}</p>
            <p className="text-gray-600">總提案數</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              {statusCounts['審查完畢'] || 0}
            </p>
            <p className="text-gray-600">已完成審查</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-blue-600">
              {statusCounts['交付審查'] || 0}
            </p>
            <p className="text-gray-600">審查中</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-600">
              {typeCounts['法律案'] || 0}
            </p>
            <p className="text-gray-600">法律修正案</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Proposals = () => {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedProposalId, setSelectedProposalId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://v2.ly.govapi.tw/bills?提案人=翁曉玲');
        if (!response.ok) {
          throw new Error('Failed to fetch proposals');
        }
        const data = await response.json();
        setProposals(data.bills || []);
        setTotalCount(data.total || 0);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching proposals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProposals();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleProposalClick = (proposalId) => {
    setSelectedProposalId(proposalId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProposalId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-xl">載入失敗</p>
          <p className="text-gray-600 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">法案提案</h1>
          <p className="text-xl text-gray-600">共 {totalCount} 件提案</p>
        </div>

        <ProposalAnalytics proposals={proposals} />

        <div className="space-y-8">
          {proposals.map((proposal) => (
            <div 
              key={proposal.議案編號} 
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
              onClick={() => handleProposalClick(proposal.議案編號)}
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* 左側：基本信息 */}
                <div className="flex-grow space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={18} />
                    <span className="text-sm">{formatDate(proposal.資料抓取時間)}</span>
                    <Tag size={18} className="ml-4" />
                    <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                      {proposal.議案類別}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-800 line-clamp-2">
                    {proposal.議案名稱}
                  </h2>

                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">提案單位：</span>
                      {proposal['提案單位/提案委員']}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">提案人：</span>
                      {proposal.提案人.join('、')}
                    </p>
                    <div className="flex items-center space-x-2">
                      <Clock size={18} className="text-gray-500" />
                      <span className="text-sm px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                        {proposal.議案狀態}
                      </span>
                    </div>
                  </div>

                  {/* 案號信息 */}
                  <div className="bg-gray-50 p-3 rounded-md text-sm text-gray-600">
                    <p>字號：{proposal.字號}</p>
                    <p>會期：第{proposal.屆}屆第{proposal.會期}會期</p>
                  </div>
                </div>

                {/* 右側：相關文件 */}
                <div className="flex-shrink-0 md:w-64 space-y-3">
                  <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                    <FileText size={18} className="mr-2" />
                    相關文件
                  </h3>
                  
                  {proposal.相關附件?.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment.網址}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center p-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Download size={16} className="mr-2" />
                      {attachment.名稱}
                    </a>
                  ))}

                  <a
                    href={proposal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={16} className="mr-2" />
                    立院系統連結
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {proposals.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600">目前沒有提案記錄</p>
          </div>
        )}

        <ProposalDetail 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          proposalId={selectedProposalId}
        />
      </div>
    </div>
  );
};

export default Proposals;