import React from 'react';
import { Award, Book, Heart, ChevronRight } from 'lucide-react';

const AboutXiaoling = () => {
  return (
    <div className="bg-gray-50">
      <section className="relative h-[60vh]">
        <img src="/images/hero-image.webp" alt="翁曉玲立委" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end items-center text-white text-center p-8">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">翁曉玲</h1>
          <p className="text-2xl sm:text-3xl text-gray-200">為台灣的未來而努力的立法委員</p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">個人簡介</h2>
          <div className="text-lg text-gray-600 leading-relaxed space-y-4">
            <p>
              翁曉玲，出生於台北市，畢業於國立台灣大學法律系，後赴美國哈佛大學攻讀公共政策碩士。回國後，她投身公共事務，致力於推動教育改革、環境保護和社會正義。
            </p>
            <p>
              作為立法委員，翁曉玲一直秉持「為民服務、推動進步」的理念，積極參與立法工作，為台灣的永續發展貢獻自己的力量。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: Award, title: '學歷', items: ['國立台灣大學法律系學士', '哈佛大學公共政策碩士'] },
            { icon: Book, title: '專業領域', items: ['教育政策', '環境法規', '社會福利'] },
            { icon: Heart, title: '志願服務', items: ['弱勢兒童教育', '環境保護志工', '社區營造'] }
          ].map((card, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <card.icon className="text-indigo-600 mb-6" size={48} />
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">{card.title}</h3>
              {card.items.map((item, i) => (
                <p key={i} className="text-gray-600 mb-2">{item}</p>
              ))}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800">政治理念</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            翁曉玲堅信，一個進步的社會應該建立在教育、環保和社會正義的基礎之上。她致力於：
          </p>
          <ul className="space-y-4">
            {[
              '推動教育改革，確保每個孩子都有接受優質教育的機會',
              '制定和完善環境保護法規，推動台灣向綠色經濟轉型',
              '強化社會福利制度，照顧弱勢群體，縮小貧富差距',
              '促進科技創新，提升台灣的國際競爭力'
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight className="text-indigo-600 mt-1 mr-2 flex-shrink-0" size={20} />
                <span className="text-lg text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default AboutXiaoling;