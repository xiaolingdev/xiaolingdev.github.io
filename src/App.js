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
            <Route path="/contact" element={<Contact />} />
            <Route path="/video-gallery" element={<VideoGallery />} />
            <Route path="/proposals" element={<Proposals />} /> 
            <Route path='/proess' element={<LegislativeProcess />}/>
            <Route path='/reform' element={<JudicialProcessReform />}/>
            <Route path='/nuclearpower' element={<NuclearPowerPolicy />}/>
            <Route path='/wuclause' element={<WuClauseRemoval />}/>
            <Route path='/keyissue' element={<KeyIssuesHub />}/>
            <Route path="/safety-check" element={<SafetyCheck />} />




            
            
            {/* Construction Area - Nested Routes */}
            <Route element={<ConstructionLayout />}>
            <Route path="/achievements" element={<UnderConstruction />} />
              {/* 活動相關路由 */}
              <Route path="/activities" element={<UnderConstruction />} />
              <Route path="/activity-detail/:id" element={<UnderConstruction />} />
              {/* 政策相關路由 */}
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
  );
}

export default App;