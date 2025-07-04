import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Calendar, 
  FileText, 
  Clock, 
  Loader, 
  Video, 
  Play, 
  ExternalLink,
  Maximize2,
  X,
  Building
} from 'lucide-react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { VideoModal, VideoCard, LatestIvodSection } from '../components/Home_v'


const Home = () => {
  const [latestBills, setLatestBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestBills = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://v2.ly.govapi.tw/bills?提案人=翁曉玲&limit=3');
        if (!response.ok) {
          throw new Error('Failed to fetch bills');
        }
        const data = await response.json();
        setLatestBills(data.bills || []);
      } catch (err) {
        console.error('Error fetching bills:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBills();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      '交付審查': 'bg-blue-500',
      '審查完畢': 'bg-green-500',
      '程序委員會': 'bg-yellow-500',
      '退回程序委員會': 'bg-red-500',
      '法規委員會審查': 'bg-purple-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const newsItems = [
    {
      id: 1,
      date: '2024-07-01',
      title: '翁曉玲立委提出新的教育改革方案',
      summary: '為了提升台灣的教育品質，翁曉玲立委今日在立法院提出了全新的教育改革方案...'
    },
    {
      id: 2,
      date: '2024-06-28',
      title: '關注環境永續發展：翁曉玲立委參與淨灘活動',
      summary: '為了喚起民眾對海洋污染的重視，翁曉玲立委昨日參與了在新北市舉行的淨灘活動...'
    },
    {
      id: 3,
      date: '2024-06-25',
      title: '推動科技創新：翁曉玲立委訪問科學園區',
      summary: '為了促進台灣的科技發展，翁曉玲立委本週走訪了多家科學園區的企業...'
    }
  ];

  const policies = [
    {
      id: 1,
      title: '綠色能源政策',
      description: '推動可再生能源發展，減少碳排放',
      image: '/images/green-energy.webp',
      color: 'from-emerald-400 to-teal-500'
    },
    {
      id: 2,
      title: '數位轉型計劃',
      description: '協助傳統產業進行數位化轉型',
      image: '/images/digital-transformation.webp',
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  return (
    <div className="bg-gray-50">
      <section className="relative h-screen">
  {/* 電腦版背景圖與遮罩 */}
  <img
    src="/images/logo.jpg"
    alt="翁曉玲立委"
    className="hidden md:block w-full h-full object-cover"
  />
  <div className="hidden md:block absolute inset-0 bg-black bg-opacity-50" />
  
  {/* 手機版背景設計 */}
  <div className="md:hidden absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-slate-900" />
  <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
  
  {/* 手機版裝飾元素 */}
  <div className="md:hidden absolute top-0 left-0 w-full h-full overflow-hidden">
    <div className="absolute top-20 -left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
    <div className="absolute bottom-32 -right-16 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl" />
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
  </div>
  
  {/* 手機版網格背景 */}
  <div className="md:hidden absolute inset-0 opacity-20">
    <div className="absolute inset-0" style={{
      backgroundImage: `
        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
      `,
      backgroundSize: '40px 40px'
    }} />
  </div>
  
  {/* 文字內容（電腦與手機分開處理） */}
  <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
    {/* 電腦版 */}
    <div className="hidden md:flex flex-col text-white">
      <h1 className="text-6xl font-bold mb-4">翁曉玲</h1>
      <p className="text-3xl mb-8">為台灣的未來而努力</p>
      <Link
        to="/about"
        className="bg-white text-gray-800 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300"
      >
        了解更多
      </Link>
    </div>
    
    {/* 手機版 */}
    <div className="md:hidden flex flex-col text-white relative z-10">
      <div className="mb-8">
        <div className="inline-block px-4 py-2 bg-blue-500/20 rounded-full border border-blue-300/30 mb-4">
          <span className="text-blue-200 text-sm font-medium">立法委員</span>
        </div>
        <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
          翁曉玲
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 mx-auto rounded-full mb-4" />
        <p className="text-xl text-blue-100 font-medium leading-relaxed">
          為台灣的未來而努力
        </p>
      </div>
      
      <div className="space-y-4">
        <Link
          to="/about"
          className="inline-block bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
        >
          了解更多
        </Link>
        
        <div className="flex items-center justify-center space-x-6 pt-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
              <span className="text-white text-sm font-bold">策</span>
            </div>
            <span className="text-xs text-blue-200">政策倡議</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
              <span className="text-white text-sm font-bold">意</span>
            </div>
            <span className="text-xs text-blue-200">民意代表</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
              <span className="text-white text-sm font-bold">服</span>
            </div>
            <span className="text-xs text-blue-200">民眾服務</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">關於我們</h2>
        <p className="text-xl mb-8 text-gray-600 leading-relaxed max-w-3xl mx-auto text-center">
          翁曉玲立委致力於為民眾服務，推動進步政策，建設更美好的台灣。我們相信透過共同努力，能夠創造一個更加繁榮、公平且永續的社會。
        </p>
        <div className="text-center">
          <Link to="/about" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300 text-lg font-semibold">
            深入了解 <ArrowRight className="ml-2" />
          </Link>
        </div>
      </section>

            {/* Add Latest IVOD Section here, before Policy Issues */}
      <LatestIvodSection />
       {/* 最新法案區塊 */}
{/* 最新法案區塊 */}
<section className="py-16 bg-gradient-to-b from-white to-gray-50">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">最新法案</h2>
    
    {loading ? (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="flex items-center gap-2 text-indigo-600">
          <Loader className="animate-spin" />
          <span>載入中...</span>
        </div>
      </div>
    ) : error ? (
      <div className="text-center text-red-500 py-8">
        <p>載入失敗</p>
        <p className="text-sm text-gray-500 mt-2">{error}</p>
      </div>
    ) : latestBills.length === 0 ? (
      <div className="text-center text-gray-500 py-8">
        目前沒有法案記錄
      </div>
    ) : (
      <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
        {latestBills.map((bill) => (
          <div 
            key={bill.議案編號} 
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-white text-sm ${getStatusColor(bill.議案狀態)}`}>
                  {bill.議案狀態}
                </span>
                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-sm">
                  {bill.議案類別}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar size={14} className="mr-1" />
                  {bill.資料摘要時間}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {bill.議案名稱}
              </h3>
              
              {bill.案由 && (
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {bill.案由}
                </p>
              )}

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>最新進度：{formatDate(bill.最新進度日期)}</span>
                </div>

                <Link 
                  to={`/proposals?proposalId=${bill.議案編號}`}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
                >
                  查看詳情
                  <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

    <div className="text-center mt-12">
      <Link 
        to="/proposals" 
        className="inline-flex items-center px-6 py-3 bg-indigo-50 text-indigo-600 rounded-full hover:bg-indigo-100 transition-colors text-lg font-semibold"
      >
        查看所有法案 
        <ArrowRight className="ml-2" />
      </Link>
    </div>
  </div>
</section>

      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">政策議題</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {policies.map((policy) => (
              <div key={policy.id} className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                <div className={`absolute inset-0 bg-gradient-to-br ${policy.color} opacity-90 transition-all duration-300 group-hover:opacity-100`} />
                <img src={policy.image} alt={policy.title} className="w-full h-80 object-cover transition-all duration-300 group-hover:scale-105" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-3xl font-bold mb-4 text-white">{policy.title}</h3>
                  <p className="text-lg text-white mb-6 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">{policy.description}</p>
                  <Link to={`/policy/${policy.id}`} className="inline-flex items-center text-white hover:text-gray-200 transition duration-300 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 font-semibold">
                    了解更多 <ArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-t from-indigo-100 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">民眾服務</h2>
          <p className="text-xl mb-12 text-gray-600 text-center max-w-3xl mx-auto">我們致力於提供最優質的民眾服務，傾聽您的聲音，解決您的問題。</p>
          <div className="text-center">
            <Link to="/contact" className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center py-4 px-8 rounded-full hover:from-indigo-700 hover:to-purple-700 transition duration-300 text-xl font-semibold shadow-lg hover:shadow-xl">
              聯絡我們
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;