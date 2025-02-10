import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import emailjs from 'emailjs-com';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');
  
    const serviceId = 'service_e7hhk9e'; // 替換為 EmailJS 提供的 service ID
    const templateId = 'template_phf8mba'; // 替換為 EmailJS 提供的 template ID
    const publicKey = 'rO-ByShZRbYP51mGb'; // 替換為 EmailJS 提供的 public key
    const autoReplyTemplateId = 'template_ohx5jud'; // 替換為 EmailJS 自動回覆的 template ID
    const recaptchaSiteKey = '6LeOxNIqAAAAANXAyHnYCkDGMSFgGuFOvqKl1PaR'; // 替換為你的 Google reCAPTCHA v3 金鑰
  
    try {
      // 確保 grecaptcha 已加載
      if (!window.grecaptcha) {
        throw new Error('Google reCAPTCHA 尚未加載，請稍後再試');
      }
  
      // 取得 reCAPTCHA v3 驗證碼
      const recaptchaToken = await window.grecaptcha.execute(recaptchaSiteKey, { action: 'submit' });
      setCaptchaValue(recaptchaToken);
  
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        date: new Date().toLocaleString(),
        'g-recaptcha-response': recaptchaToken,
      };
  
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      await emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey);
      setFormData({ name: '', email: '', message: '' });
      setCaptchaValue(null);
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitStatus('error');
    }
  };
  

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">聯繫我們</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">留言給我們</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">姓名</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">電子郵件</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">留言內容</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitStatus === 'sending'}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 px-4 rounded-md hover:from-purple-600 hover:to-blue-500 transition duration-300 disabled:opacity-50"
            >
              {submitStatus === 'sending' ? '發送中...' : '送出留言'}
            </button>
            {submitStatus === 'success' && (
              <p className="mt-4 text-green-500 text-center">留言已送出成功！我們會盡快回覆您。</p>
            )}
            {submitStatus === 'error' && (
              <p className="mt-4 text-red-500 text-center">發送失敗，請稍後再試。</p>
            )}
          </form>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">聯絡資訊</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="text-blue-500 mr-3" />
              <span>ly11275f@ly.gov.tw</span>
            </div>
            <div className="flex items-center">
              <Phone className="text-blue-500 mr-3" />
              <span>02-2358-8196</span>
            </div>
            <div className="flex items-center">
              <MapPin className="text-blue-500 mr-3" />
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
