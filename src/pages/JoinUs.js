import React from 'react';
import { 
  MapPin, 
  Clock, 
  Users, 
  Calendar,
  DollarSign,
  Mail,
  Phone,
  CheckCircle,
  FileText,
  Award,
  Star,
  Target,
  Building,
  GraduationCap,
  Briefcase,
  Heart,
  ArrowRight,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  Info
} from 'lucide-react';

const JobRecruitment = () => {
  // Check if current date is after July 15, 2025
  const currentDate = new Date();
  const deadline = new Date('2025-07-15');
  const isAfterDeadline = currentDate > deadline;

  // Calculate days remaining until deadline
  const timeRemaining = deadline - currentDate;
  const daysRemaining = Math.ceil(timeRemaining / (1000 * 60 * 60 * 24));

  if (isAfterDeadline) {
    // Show "No positions available" page
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section for No Positions */}
        <section className="relative py-20 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-5 rounded-full blur-xl" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-white bg-opacity-5 rounded-full blur-2xl" />
          </div>
          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
                <Info className="text-white" size={40} />
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                立法委員翁曉玲<br />
                <span className="text-gray-200">國會辦公室</span>
              </h1>
              <div className="inline-block bg-white bg-opacity-20 rounded-full px-8 py-3 mb-8">
                <p className="text-xl md:text-2xl text-white font-medium">
                  招募資訊
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* No Positions Available Content */}
        <section className="py-16 -mt-12 relative z-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
              
              <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-8 text-white text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
                  <AlertCircle className="text-white" size={32} />
                </div>
                <h2 className="text-3xl font-bold mb-2">招募已結束</h2>
                <p className="text-gray-200">感謝您的關注</p>
              </div>

              <div className="p-8 lg:p-12 text-center">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">目前暫無職缺</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    本次招募已於 2025年7月15日 截止。<br />
                    感謝所有應徵者的熱烈參與。
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-200 mb-8">
                  <h4 className="text-xl font-semibold text-blue-800 mb-3">未來機會</h4>
                  <p className="text-blue-700">
                    如有新的職缺釋出，我們會透過官方網站及相關管道公布。<br />
                    請持續關注相關訊息。
                  </p>
                </div>

                {/* Contact Info for Future Opportunities */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-center p-6 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone size={20} className="text-white" />
                    </div>
                    <div className="ml-4">
                      <h5 className="font-semibold text-gray-800">電話諮詢</h5>
                      <p className="text-gray-600">02-23585858-8196</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center p-6 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail size={20} className="text-white" />
                    </div>
                    <div className="ml-4">
                      <h5 className="font-semibold text-gray-800">Email</h5>
                      <p className="text-gray-600">ly11275f@ly.gov.tw</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Show regular job posting page
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl" />
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-white bg-opacity-5 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white bg-opacity-5 rounded-full blur-3xl" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-6">
              <Briefcase className="text-white" size={40} />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              立法委員翁曉玲<br />
              <span className="text-blue-200">國會辦公室召募</span>
            </h1>
            <div className="inline-block bg-white bg-opacity-20 rounded-full px-8 py-3 mb-8">
              <p className="text-xl md:text-2xl text-white font-medium">
                法務研究員和法務助理
              </p>
            </div>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">
              加入我們的專業團隊，參與重要的法案研究與政策制定工作
            </p>
            
            {/* Deadline Alert */}
            <div className="inline-flex items-center bg-red-500 bg-opacity-90 rounded-full px-6 py-3 mb-4">
              <Clock className="mr-3 text-white" size={20} />
              <span className="text-white font-semibold">
                應徵截止：2025年7月15日
                {daysRemaining > 0 && (
                  <span className="ml-2 bg-white bg-opacity-20 rounded-full px-3 py-1 text-sm">
                    剩餘 {daysRemaining} 天
                  </span>
                )}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="container mx-auto px-4">
          {/* Job Card */}
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            
            {/* Job Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-bold mb-4">職位概況</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <DollarSign className="mr-3" size={20} />
                      <span>NT$ 41,000 - 60,000</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-3" size={20} />
                      <span>需求人數：2人</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-3" size={20} />
                      <span>專任全職 · 日班</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-3" size={20} />
                      <span>台北市中正區</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="bg-white bg-opacity-20 rounded-full p-6">
                    <Building className="text-white" size={48} />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 lg:p-12">
              {/* Deadline Notice */}
              <div className="bg-gradient-to-r from-red-50 via-pink-50 to-rose-50 rounded-2xl p-6 border-2 border-red-200 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <Clock className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-red-800 mb-1">應徵期限</h3>
                    <p className="text-red-700 text-lg">
                      即日起至 <span className="font-bold">2025年7月15日</span> 止
                      {daysRemaining > 0 && (
                        <span className="ml-2 bg-red-200 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                          剩餘 {daysRemaining} 天
                        </span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Work Content */}
              <div className="mb-12">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <Target className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">工作內容</h3>
                </div>
                <div className="grid gap-4">
                  <div className="flex items-start p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-400 hover:shadow-md transition-all duration-300">
                    <CheckCircle className="mr-4 text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700 font-medium">法案與預算研究及提案撰寫</span>
                  </div>
                  <div className="flex items-start p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-400 hover:shadow-md transition-all duration-300">
                    <CheckCircle className="mr-4 text-indigo-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700 font-medium">研擬質詢稿</span>
                  </div>
                  <div className="flex items-start p-5 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border-l-4 border-purple-400 hover:shadow-md transition-all duration-300">
                    <CheckCircle className="mr-4 text-purple-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700 font-medium">文獻資料蒐集與研析</span>
                  </div>
                  <div className="flex items-start p-5 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl border-l-4 border-pink-400 hover:shadow-md transition-all duration-300">
                    <CheckCircle className="mr-4 text-pink-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700 font-medium">其他交辦事項</span>
                  </div>
                </div>
              </div>

              {/* Job Details Grid */}
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                
                {/* Requirements */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <GraduationCap className="text-green-600" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">職務要求</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <Award className="mr-2" size={18} />
                        學歷要求
                      </h4>
                      <p className="text-green-700">碩、博士以上</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <FileText className="mr-2" size={18} />
                        科系要求
                      </h4>
                      <p className="text-green-700">人社、經濟、傳播、法政相關科系，法律系尤佳</p>
                    </div>
                    
                    <div className="bg-green-50 rounded-xl p-5 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <TrendingUp className="mr-2" size={18} />
                        擅長工具
                      </h4>
                      <p className="text-green-700">Excel、PowerPoint、Word</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
                      <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                        <Star className="mr-2" size={18} />
                        其他條件
                      </h4>
                      <ul className="text-green-700 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                          <span>具經營社群媒體和撰寫媒體文案經驗者尤佳</span>
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="mr-2 mt-0.5 flex-shrink-0" size={16} />
                          <span>善於溝通表達</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Benefits and Details */}
                <div>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                      <Heart className="text-purple-600" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">職務詳情</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                        <DollarSign className="mr-2" size={18} />
                        工作待遇
                      </h4>
                      <p className="text-purple-700 mb-2">41,000～60,000元</p>
                      <p className="text-sm text-purple-600">（經常性薪資至少比照國科會人力薪資標準）</p>
                      <p className="text-sm text-purple-600">具專業證照者，專業加給另議</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                        <MapPin className="mr-2" size={18} />
                        上班地點
                      </h4>
                      <p className="text-purple-700">台北市中正區濟南路一段3-1號</p>
                      <p className="text-sm text-purple-600">(近捷運善導寺站)</p>
                    </div>
                    
                    <div className="bg-purple-50 rounded-xl p-5 border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                        <Calendar className="mr-2" size={18} />
                        休假制度
                      </h4>
                      <p className="text-purple-700">依公家機關規定</p>
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-200">
                      <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                        <Star className="mr-2" size={18} />
                        福利制度
                      </h4>
                      <div className="space-y-2">
                        <p className="text-purple-700 flex items-center">
                          <CheckCircle className="mr-2" size={16} />
                          週休二日、勞健保
                        </p>
                        <p className="text-purple-700 flex items-center">
                          <CheckCircle className="mr-2" size={16} />
                          年終獎金、加班費
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Instructions */}
              <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200 mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                    <FileText className="text-amber-600" size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-amber-800">應徵方式</h3>
                </div>
                <p className="text-amber-700 leading-relaxed text-lg mb-4">
                  請寄履歷表（註明自傳、學歷、工作經歷以及相關研究與實務經驗說明），後續會主動通知
                </p>
                <div className="bg-amber-100 rounded-lg p-4">
                  <p className="text-amber-800 font-semibold">
                    ⏰ 請務必於 2025年7月15日前投遞履歷
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-t from-gray-100 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">聯絡方式</h2>
              <p className="text-xl text-gray-600">歡迎有興趣的人才與我們聯繫</p>
            </div>
            
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white bg-opacity-20 rounded-full mb-4">
                  <MessageSquare className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">立即聯繫我們</h3>
                <p className="text-indigo-100">我們期待您的加入</p>
              </div>
              
              <div className="p-8 lg:p-12">
                <div className="grid md:grid-cols-2 gap-8">
                  
                  <div className="space-y-6">
                    <div className="flex items-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors">
                      <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users size={24} className="text-white" />
                      </div>
                      <div className="ml-6">
                        <h4 className="font-semibold text-gray-800 text-lg">聯絡人</h4>
                        <p className="text-blue-600 font-medium text-xl">湯小姐</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-6 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
                      <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Phone size={24} className="text-white" />
                      </div>
                      <div className="ml-6">
                        <h4 className="font-semibold text-gray-800 text-lg">電話</h4>
                        <a href="tel:02-23585858-8196" className="text-indigo-600 hover:text-indigo-700 font-medium text-xl">
                          02-23585858-8196
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors">
                      <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <MapPin size={24} className="text-white" />
                      </div>
                      <div className="ml-6">
                        <h4 className="font-semibold text-gray-800 text-lg mb-2">地址</h4>
                        <p className="text-green-600 leading-relaxed">
                          台北市中正區濟南路一段3之1號<br />
                          B1樓2120室
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors">
                      <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Mail size={24} className="text-white" />
                      </div>
                      <div className="ml-6">
                        <h4 className="font-semibold text-gray-800 text-lg">Email</h4>
                        <a href="mailto:ly11275f@ly.gov.tw" className="text-purple-600 hover:text-purple-700 font-medium text-lg">
                          ly11275f@ly.gov.tw
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12 text-center">
                  <a 
                    href="mailto:ly11275f@ly.gov.tw" 
                    className="inline-flex items-center px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <Mail className="mr-3" size={20} />
                    立即投遞履歷
                    <ArrowRight className="ml-3" size={20} />
                  </a>
                  <p className="text-sm text-gray-500 mt-3">
                    請把握時間，應徵截止日期：2025年7月15日
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobRecruitment;