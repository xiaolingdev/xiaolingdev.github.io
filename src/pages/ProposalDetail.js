import React, { useState, useEffect } from 'react';
import { FileText, Calendar, Users, ExternalLink, Tag, Clock, ArrowLeft, AlertTriangle, Download } from 'lucide-react';
import { diffWords } from 'diff';

// 差異比對視圖組件
const DiffView = ({ oldText, newText, isNewLaw }) => {
  // 如果是新法案，直接顯示新增內容
  if (isNewLaw) {
    return (
      <div className="font-mono text-sm">
        <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded">
          {newText}
        </div>
      </div>
    );
  }
  
  // 既有法案的修改比對
  const diff = diffWords(oldText || '', newText || '');
  return (
    <div className="font-mono text-sm">
      {diff.map((part, index) => {
        // 完整段落替換
        if (part.value.length > 50 && (part.added || part.removed)) {
          return (
            <div
              key={index}
              className={`p-2 my-1 rounded ${
                part.added ? 'bg-green-50 border-l-4 border-green-500' :
                part.removed ? 'bg-red-50 border-l-4 border-red-500' :
                ''
              }`}
            >
              {part.value}
            </div>
          );
        }
        // 小幅修改（字詞層級）
        return (
          <span
            key={index}
            className={
              part.added ? 'bg-yellow-200 mx-1' :
              part.removed ? 'bg-gray-200 line-through mx-1' :
              ''
            }
          >
            {part.value}
          </span>
        );
      })}
    </div>
  );
};

// 時間軸指標組件
const TimelineIndicator = ({ startDate, lastUpdateDate }) => {
  const calculateDaysPassed = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const daysPassed = calculateDaysPassed(startDate, lastUpdateDate);
  const isStalled = calculateDaysPassed(lastUpdateDate || startDate) > 180;

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">法案時程追蹤</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">提案日期</span>
          <span className="font-medium">{formatDate(startDate)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">最新進度日期</span>
          <span className="font-medium">{lastUpdateDate ? formatDate(lastUpdateDate) : '無更新'}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">已經過天數</span>
          <span className="font-medium">{daysPassed} 天</span>
        </div>
        {isStalled && (
          <div className="mt-3 flex items-center text-amber-600">
            <AlertTriangle size={16} className="mr-2" />
            <span>此法案已超過180天未有進度更新</span>
          </div>
        )}
      </div>
    </div>
  );
};

const ProposalDetail = ({ isOpen, onClose, proposalId }) => {
    const [proposalDetail, setProposalDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('info'); // 'info' or 'comparison'

    useEffect(() => {
      const fetchProposalDetail = async () => {
        if (!proposalId) return;
        
        try {
          setLoading(true);
          const response = await fetch(`https://v2.ly.govapi.tw/bill/${proposalId}`);
          if (!response.ok) {
            throw new Error('Failed to fetch proposal details');
          }
          const data = await response.json();
          setProposalDetail(data.data);
        } catch (err) {
          setError(err.message);
          console.error('Error fetching proposal details:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchProposalDetail();
    }, [proposalId]);

    // 當modal打開時，更新URL
    useEffect(() => {
      if (isOpen && proposalId) {
        const url = new URL(window.location);
        url.searchParams.set('proposalId', proposalId);
        window.history.pushState({}, '', url);
      }
    }, [isOpen, proposalId]);

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-TW', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // 判斷是否為新法案
    const isNewLaw = (table) => {
      return table.立法種類 === '增訂條文';
    };

    // 渲染條文內容區塊
    const renderArticleContent = (row, isNew) => {
      if (isNew) {
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="font-medium text-gray-700">條文內容</h5>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">新增條文</span>
            </div>
            <div className="p-4 bg-white rounded-lg border border-green-200">
              <pre className="whitespace-pre-wrap text-gray-800">{row.增訂}</pre>
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          <div>
            <h5 className="font-medium text-gray-700 mb-2">修正條文</h5>
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <DiffView oldText={row.現行} newText={row.修正} isNewLaw={false} />
            </div>
          </div>
          <div>
            <h5 className="font-medium text-gray-700 mb-2">現行條文</h5>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <pre className="whitespace-pre-wrap text-gray-600">{row.現行}</pre>
            </div>
          </div>
        </div>
      );
    };

    // 渲染修正條文對照表
    const renderComparisonTable = (table, tableIndex) => {
      const isNew = isNewLaw(table);

      return (
        <div key={tableIndex} className="space-y-6 bg-white rounded-lg shadow-sm">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-gray-800">{table.title}</h4>
              {isNew && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  新制定法案
                </span>
              )}
            </div>
          </div>

          <div className="p-4 space-y-8">
            {table.rows.map((row, rowIndex) => (
              <div key={rowIndex} className="border rounded-lg overflow-hidden bg-gray-50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                  {/* 左側：條文內容 */}
                  <div className="space-y-4">
                    {renderArticleContent(row, isNew)}
                  </div>

                  {/* 右側：說明 */}
                  <div className="space-y-4">
                    <h5 className="font-medium text-gray-700">
                      {isNew ? '制定說明' : '修正說明'}
                    </h5>
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <pre className="whitespace-pre-wrap text-gray-600">
                        {row.說明}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden relative">
        {/* 返回按鈕 */}
        <button
          onClick={onClose}
          className="absolute top-6 left-6 p-2 flex items-center text-gray-600 hover:text-gray-900 transition-colors z-20"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          <span className="text-sm">返回</span>
        </button>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="h-64 flex items-center justify-center">
            <div className="text-red-500 text-center">
              <p className="text-xl">載入失敗</p>
              <p className="text-gray-600 mt-2">{error}</p>
            </div>
          </div>
        ) : proposalDetail ? (
          <div className="h-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 border-b border-gray-200 shadow-sm">
              <div className="p-6 pl-24">
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <Calendar size={18} />
                  <span className="text-sm">{formatDate(proposalDetail.提案日期)}</span>
                  <Tag size={18} className="ml-4" />
                  <span className="text-sm bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    {proposalDetail.議案類別}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{proposalDetail.議案名稱}</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 bg-gray-50">
              <div className="max-w-4xl mx-auto space-y-8">
                {/* Timeline Indicator */}
                <TimelineIndicator 
                  startDate={proposalDetail.提案日期}
                  lastUpdateDate={proposalDetail.最新進度日期}
                />

                {/* 案由說明 */}
                {proposalDetail.案由 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">案由說明</h3>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {proposalDetail.案由}
                    </p>
                  </div>
                )}

                {/* Basic Info */}
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">基本資訊</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-medium">提案單位：</span>
                        {proposalDetail['提案單位/提案委員']}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">字號：</span>
                        {proposalDetail.字號}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">會期：</span>
                        第{proposalDetail.屆}屆第{proposalDetail.會期}會期
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <span className="font-medium">提案日期：</span>
                        {formatDate(proposalDetail.提案日期)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">最新進度：</span>
                        {proposalDetail.最新進度日期 ? formatDate(proposalDetail.最新進度日期) : '無更新'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 提案人和連署人 */}
                <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">提案人與連署人</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">提案人</h4>
                      <div className="flex flex-wrap gap-2">
                        {proposalDetail.提案人.map((person) => (
                          <span key={person} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">連署人</h4>
                      <div className="flex flex-wrap gap-2">
                        {proposalDetail.連署人.map((person) => (
                          <span key={person} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                            {person}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 法條內容 */}
                {proposalDetail.對照表?.length > 0 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-800">法條內容</h3>
                    {proposalDetail.對照表.map((table, tableIndex) => 
                      renderComparisonTable(table, tableIndex)
                    )}
                  </div>
                )}

                {/* 相關附件 */}
                {proposalDetail.相關附件?.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800">相關附件</h3>
                    <div className="space-y-2">
                      {proposalDetail.相關附件.map((attachment, index) => (
                        <a
                          key={index}
                          href={attachment.網址}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center p-3 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                        >
                          <FileText size={18} className="mr-2" />
                          {attachment.名稱}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 立院系統連結 */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <a
                    href={proposalDetail.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    在立院系統查看完整內容
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProposalDetail;