import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { InputPage } from '@/pages/InputPage';
import { TechMatchPage } from '@/pages/TechMatchPage';
import { ResumeEditPage } from '@/pages/ResumeEditPage';
import { InterviewPrepPage } from '@/pages/InterviewPrepPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Navigate to="/input" replace />} />
            <Route path="/input" element={<InputPage />} />
            <Route path="/match" element={<TechMatchPage />} />
            <Route path="/edit" element={<ResumeEditPage />} />
            <Route path="/interview" element={<InterviewPrepPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
