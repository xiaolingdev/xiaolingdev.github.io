// 4. 更新後的 App.js
import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
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
import Proposals from './pages/Proposals';
import VideoGallery from './pages/VideoGallery';
import ConstructionLayout from './layouts/ConstructionLayout';
import UnderConstruction from './pages/UnderConstruction';
import LegislativeProcess from './pages/LegislativeProcess';
import JudicialProcessReform from './pages/JudicialProcessReform';
import NuclearPowerPolicy from './pages/NuclearPowerPolicy';
import WuClauseRemoval from './pages/WuClauseRemoval';
import KeyIssuesHub from './pages/KeyIssuesHub';
import NotFound from './pages/NotFound';
import SafetyCheck from './pages/SafetyCheck';
import JoinUs from './pages/JoinUs';

function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const redirectPath = searchParams.get('redirect');

  useEffect(() => {
    if (redirectPath) {
      const decodedPath = decodeURIComponent(redirectPath);
      navigate(decodedPath, { replace: true });
    }
  }, [redirectPath, navigate]);

  return null;
}

function App() {
  return (
    <LanguageProvider>
      <Router>
        <RedirectHandler />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/ai-chat" element={<AIChat />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/video-gallery" element={<VideoGallery />} />
              <Route path="/proposals" element={<Proposals />} /> 
              <Route path='/proess' element={<LegislativeProcess />}/>
              <Route path='/reform' element={<JudicialProcessReform />}/>
              <Route path='/nuclearpower' element={<NuclearPowerPolicy />}/>
              <Route path='/wuclause' element={<WuClauseRemoval />}/>
              <Route path='/keyissue' element={<KeyIssuesHub />}/>
              <Route path="/safety-check" element={<SafetyCheck />} />
              <Route path="/join-us" element={<JoinUs />} />
              
              {/* Construction Area - Nested Routes */}
              <Route element={<ConstructionLayout />}>
                <Route path="/achievements" element={<UnderConstruction />} />
                <Route path="/activities" element={<UnderConstruction />} />
                <Route path="/activity-detail/:id" element={<UnderConstruction />} />
                <Route path="/policy-detail/:id" element={<UnderConstruction />} />
                <Route path="/past" element={<UnderConstruction />} />
                <Route path="/policy-issues" element={<UnderConstruction />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
