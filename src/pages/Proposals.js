import React, { useEffect, useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Calendar, ArrowRight, FileText, Download, ExternalLink, Tag, Clock, PieChart, BarChart3, BookOpen, Search, Filter, X, ChevronDown } from 'lucide-react';
import ProposalDetail from './ProposalDetail';

// 搜尋框組件
const SearchBox = ({ searchTerm, onSearchChange, onClear }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="搜尋提案名稱、提案人..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
      {searchTerm && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
        </button>
      )}
    </div>
  );
};

// 篩選器組件
const FilterPanel = ({ filters, onFilterChange, proposals }) => {
  const [isOpen, setIsOpen] = useState(false);

  // 獲取所有可用的篩選選項
  const getUniqueValues = (key) => {
    const values = proposals.map(proposal => proposal[key]).filter(Boolean);
    return [...new Set(values)].sort();
  };

  const categories = getUniqueValues('議案類別');
  const statuses = getUniqueValues('議案狀態');
  const sessions = [...new Set(proposals.map(p => `第${p.屆}屆第${p.會期}會期`))].sort();

  const hasActiveFilters = Object.values(filters).some(filter => filter.length > 0);

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      statuses: [],
      sessions: []
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="font-medium text-gray-700">篩選條件</span>
            {hasActiveFilters && (
              <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                已套用篩選
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                清除全部
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <ChevronDown className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 議案類別篩選 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">議案類別</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {categories.map(category => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...filters.categories, category]
                          : filters.categories.filter(c => c !== category);
                        onFilterChange({ ...filters, categories: newCategories });
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 議案狀態篩選 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">議案狀態</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {statuses.map(status => (
                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.statuses.includes(status)}
                      onChange={(e) => {
                        const newStatuses = e.target.checked
                          ? [...filters.statuses, status]
                          : filters.statuses.filter(s => s !== status);
                        onFilterChange({ ...filters, statuses: newStatuses });
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 會期篩選 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">會期</label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {sessions.map(session => (
                  <label key={session} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.sessions.includes(session)}
                      onChange={(e) => {
                        const newSessions = e.target.checked
                          ? [...filters.sessions, session]
                          : filters.sessions.filter(s => s !== session);
                        onFilterChange({ ...filters, sessions: newSessions });
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{session}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 頁面大小選擇器組件
const PageSizeSelector = ({ pageSize, totalCount, onPageSizeChange }) => {
  const options = [5, 10, 20, 50];
  
  return (
    <div className="flex items-center space-x-2 text-sm text-gray-700">
      <span>每頁顯示:</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(parseInt(e.target.value))}
        className="border border-gray-300 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {options.map(option => (
          <option key={option} value={option}>
            {option} 筆
          </option>
        ))}
      </select>
    </div>
  );
};

// 分頁組件
const Pagination = ({ currentPage, totalPages, totalCount, pageSize, onPageChange, onPageSizeChange }) => {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          上一頁
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          下一頁
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-700">
            顯示第 <span className="font-medium">{startItem}</span> 到 <span className="font-medium">{endItem}</span> 筆，
            共 <span className="font-medium">{totalCount}</span> 筆提案
          </p>
          <PageSizeSelector 
            pageSize={pageSize} 
            totalCount={totalCount} 
            onPageSizeChange={onPageSizeChange} 
          />
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              上一頁
            </button>
            
            {totalPages > 1 && getPageNumbers().map((page, index) => {
              if (page === '...') {
                return (
                  <span
                    key={`dots-${index}`}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                  >
                    ...
                  </span>
                );
              }
              
              return (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    page === currentPage
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              下一頁
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const ProposalAnalytics = ({ proposals, currentPage, pageSize, totalCount }) => {
  const getStatusCounts = () => {
    const counts = proposals.reduce((acc, proposal) => {
      const status = proposal.議案狀態;
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    return counts;
  };

  const statusCounts = getStatusCounts();

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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
        <PieChart className="mr-2" size={24} />
        當前頁面提案分析
      </h2>
      <p className="text-gray-600 mb-6 text-sm">
        第 {currentPage} 頁提案統計 ({proposals.length} 件提案) | 總計 {totalCount} 件提案
      </p>

      <div className="grid grid-cols-1 gap-8">
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
            <p className="text-gray-600">當前頁提案</p>
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
              {Object.values(statusCounts).reduce((sum, count) => sum + count, 0) - (statusCounts['審查完畢'] || 0) - (statusCounts['交付審查'] || 0)}
            </p>
            <p className="text-gray-600">其他狀態</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Proposals = () => {
  const [allProposals, setAllProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categories: [],
    statuses: [],
    sessions: []
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProposalId = searchParams.get('proposalId');
  const isModalOpen = Boolean(selectedProposalId);

  // 一次性載入所有提案
  useEffect(() => {
    const fetchAllProposals = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://v2.ly.govapi.tw/bills?提案人=翁曉玲&limit=1000');
        if (!response.ok) {
          throw new Error('Failed to fetch proposals');
        }
        const data = await response.json();
        setAllProposals(data.bills || []);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching proposals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProposals();
  }, []);

  // 過濾和搜尋邏輯
  const filteredProposals = useMemo(() => {
    let filtered = allProposals;

    // 搜尋篩選
    if (searchTerm) {
      filtered = filtered.filter(proposal => 
        proposal.議案名稱.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal['提案單位/提案委員'].toLowerCase().includes(searchTerm.toLowerCase()) ||
        proposal.提案人.some(person => person.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // 類別篩選
    if (filters.categories.length > 0) {
      filtered = filtered.filter(proposal => 
        filters.categories.includes(proposal.議案類別)
      );
    }

    // 狀態篩選
    if (filters.statuses.length > 0) {
      filtered = filtered.filter(proposal => 
        filters.statuses.includes(proposal.議案狀態)
      );
    }

    // 會期篩選
    if (filters.sessions.length > 0) {
      filtered = filtered.filter(proposal => 
        filters.sessions.includes(`第${proposal.屆}屆第${proposal.會期}會期`)
      );
    }

    return filtered;
  }, [allProposals, searchTerm, filters]);

  // 分頁邏輯
  const totalCount = filteredProposals.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProposals = filteredProposals.slice(startIndex, endIndex);

  // 重置頁面當篩選或搜尋改變時
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleProposalClick = (proposalId) => {
    setSearchParams({ proposalId });
  };

  const handleCloseModal = () => {
    setSearchParams({});
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (newSearchTerm) => {
    setSearchTerm(newSearchTerm);
  };

  const handleSearchClear = () => {
    setSearchTerm('');
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入提案資料中...</p>
        </div>
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
          <p className="text-xl text-gray-600">
            {searchTerm || Object.values(filters).some(f => f.length > 0) 
              ? `篩選結果：${totalCount} 件提案` 
              : `共 ${totalCount} 件提案`
            } | 第 {currentPage} 頁，共 {totalPages} 頁
          </p>
        </div>

        {/* 搜尋和篩選區域 */}
        <div className="mb-8 space-y-4">
          {/* 搜尋框 */}
          <div className="max-w-md mx-auto">
            <SearchBox 
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onClear={handleSearchClear}
            />
          </div>

          {/* 篩選器 */}
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            proposals={allProposals}
          />
        </div>

        {/* 統計分析 */}
        {currentProposals.length > 0 && (
          <ProposalAnalytics 
            proposals={currentProposals} 
            currentPage={currentPage} 
            pageSize={pageSize}
            totalCount={totalCount}
          />
        )}

        {/* 提案列表 */}
        <div className="space-y-8">
          {loading && currentPage > 1 && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="text-gray-600 mt-2">載入中...</p>
            </div>
          )}
          
          {!loading && currentProposals.map((proposal) => (
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

        {/* 分頁組件 */}
        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </div>
        )}

        {/* 無資料顯示 */}
        {currentProposals.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">沒有找到符合條件的提案</h3>
              <p className="text-gray-600">
                {searchTerm || Object.values(filters).some(f => f.length > 0)
                  ? '請嘗試調整搜尋關鍵字或篩選條件'
                  : '目前沒有提案記錄'
                }
              </p>
              {(searchTerm || Object.values(filters).some(f => f.length > 0)) && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilters({ categories: [], statuses: [], sessions: [] });
                  }}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-200"
                >
                  清除所有篩選條件
                </button>
              )}
            </div>
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