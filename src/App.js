import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import AIChat from './pages/AIChat';
import About from './pages/About';
import Achievements from './pages/Achievements';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import ActivityDetail from './pages/Detail';
import PolicyDetail from './pages/PolicyDetail';
import PolicyIssues from './pages/PolicyIssues';
import Proposals from './pages/Proposals'; // 新增這一行
import VideoGallery from './pages/VideoGallery'; // 新增這一行


function App() {
  return (
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="/about" element={<About />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/activity-detail/:id" element={<ActivityDetail />} />
              <Route path="/policy-detail" element={<PolicyDetail />} />
              <Route path="/policy-issues" element={<PolicyIssues />} />
              <Route path="/proposals" element={<Proposals />} /> {/* 新增這一行 */}
              <Route path="/video-gallery" element={<VideoGallery />} /> {/* 新增這一行 */}
              </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    );
}

export default App;
