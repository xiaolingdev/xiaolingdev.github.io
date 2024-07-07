import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">聯繫我們</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">留言給我們</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">姓名</label>
              <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-blue" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">電子郵件</label>
              <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-blue" required />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">留言內容</label>
              <textarea id="message" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-light-blue" required></textarea>
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-light-blue to-light-purple text-white font-bold py-2 px-4 rounded-md hover:from-light-purple hover:to-light-blue transition duration-300">
              送出留言
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">聯絡資訊</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="text-light-blue mr-3" />
              <span>xiao.ling.weng@example.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-light-blue mr-3" />
              <span>(02) 1234-5678</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-light-blue mr-3" />
              <span>台北市中正區青島東路1號</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">辦公時間</h3>
            <p>週一至週五：9:00 - 18:00</p>
            <p>週六、週日：休息</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;