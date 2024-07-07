import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';

const Home = () => {
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
      color: 'from-green-400 to-blue-500'
    },
    {
      id: 2,
      title: '數位轉型計劃',
      description: '協助傳統產業進行數位化轉型',
      image: '/images/digital-transformation.webp',
      color: 'from-purple-400 to-pink-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <section className="mb-12 relative overflow-hidden rounded-xl shadow-2xl">
        <img src="/images/hero-image.webp" alt="翁曉玲立委" className="w-full h-[70vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-5xl font-bold text-white mb-2">翁曉玲立委</h1>
          <p className="text-2xl text-gray-200">為台灣的未來而努力</p>
        </div>
      </section>

      <section className="mb-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">關於我們</h2>
        <p className="text-xl mb-6 text-gray-600 leading-relaxed">翁曉玲立委致力於為民眾服務，推動進步政策，建設更美好的台灣。我們相信透過共同努力，能夠創造一個更加繁榮、公平且永續的社會。</p>
        <Link to="/about" className="inline-flex items-center text-light-blue hover:text-light-purple transition duration-300 text-lg">
          了解更多 <ArrowRight className="ml-2" />
        </Link>
      </section>

      <section className="mb-12 bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">最新活動</h2>
        <div className="space-y-12">
          {newsItems.map((item, index) => (
            <div key={item.id} className="flex items-start">
              <div className="flex-shrink-0 w-24 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-light-blue to-light-purple text-white shadow-md">
                  <Calendar size={32} />
                </div>
                <p className="mt-2 text-sm font-medium text-gray-500">{item.date}</p>
              </div>
              <div className="ml-8 flex-grow">
                <div className={`h-full border-l-2 border-light-blue pl-8 ${index === newsItems.length - 1 ? '' : 'pb-12'}`}>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-800">{item.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">{item.summary}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/activities" className="inline-flex items-center mt-8 text-light-blue hover:text-light-purple transition duration-300 text-lg">
          查看更多 <ArrowRight className="ml-2" />
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-800">政策議題</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {policies.map((policy) => (
            <div key={policy.id} className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-2xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${policy.color} opacity-80 transition-all duration-300 group-hover:opacity-90`} />
              <img src={policy.image} alt={policy.title} className="w-full h-80 object-cover transition-all duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-3xl font-bold mb-2 text-white">{policy.title}</h3>
                <p className="text-lg text-white mb-4 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">{policy.description}</p>
                <Link to={`/policy-detail`} className="inline-flex items-center text-white hover:text-gray-200 transition duration-300 opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  了解更多 <ArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <Link to="/service" className="block w-full bg-gradient-to-r from-light-blue to-light-purple text-white text-center py-6 rounded-xl hover:from-light-purple hover:to-light-blue transition duration-300 text-2xl font-semibold shadow-lg hover:shadow-xl">
          民眾信箱
        </Link>
      </section>
    </div>
  );
};

export default Home;