import React from 'react';
import { Award, Book, Heart } from 'lucide-react';

const AboutXiaoling = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="mb-12 relative overflow-hidden rounded-xl shadow-2xl">
        <img src="/images/hero-image.webp" alt="翁曉玲立委" className="w-full h-[50vh] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-5xl font-bold text-white mb-2">翁曉玲</h1>
          <p className="text-2xl text-gray-200">為台灣的未來而努力的立法委員</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">個人簡介</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          翁曉玲，出生於台北市，畢業於國立台灣大學法律系，後赴美國哈佛大學攻讀公共政策碩士。回國後，她投身公共事務，致力於推動教育改革、環境保護和社會正義。
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          作為立法委員，翁曉玲一直秉持「為民服務、推動進步」的理念，積極參與立法工作，為台灣的永續發展貢獻自己的力量。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <Award className="text-light-blue mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">學歷</h3>
          <p className="text-gray-600">國立台灣大學法律系學士</p>
          <p className="text-gray-600">哈佛大學公共政策碩士</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <Book className="text-light-blue mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">專業領域</h3>
          <p className="text-gray-600">教育政策</p>
          <p className="text-gray-600">環境法規</p>
          <p className="text-gray-600">社會福利</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center">
          <Heart className="text-light-blue mb-4" size={48} />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">志願服務</h3>
          <p className="text-gray-600">弱勢兒童教育</p>
          <p className="text-gray-600">環境保護志工</p>
          <p className="text-gray-600">社區營造</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">政治理念</h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-4">
          翁曉玲堅信，一個進步的社會應該建立在教育、環保和社會正義的基礎之上。她致力於：
        </p>
        <ul className="list-disc list-inside text-lg text-gray-600 leading-relaxed space-y-2">
          <li>推動教育改革，確保每個孩子都有接受優質教育的機會</li>
          <li>制定和完善環境保護法規，推動台灣向綠色經濟轉型</li>
          <li>強化社會福利制度，照顧弱勢群體，縮小貧富差距</li>
          <li>促進科技創新，提升台灣的國際競爭力</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutXiaoling;