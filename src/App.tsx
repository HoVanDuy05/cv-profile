import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/cv/Hero';
import About from '@/components/cv/About';
import Experience from '@/components/cv/Experience';
import Projects from '@/components/cv/Projects';
import Skills from '@/components/cv/Skills';
import Contact from '@/components/cv/Contact';
import { fetchCVData } from '@/services/api';
import type { CVData } from '@/services/api';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from '@/components/common/LoadingScreen';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectDetails from '@/pages/ProjectDetails';

const Home = ({ cvData }: { cvData: CVData | null }) => (
  <MainLayout>
    <Hero profile={cvData?.profile} />
    <About profile={cvData?.profile} />
    <Experience experiences={cvData?.experiences} />
    <Projects projects={cvData?.projects} />
    <Skills skills={cvData?.skills} />
    <Contact profile={cvData?.profile} />
  </MainLayout>
);

function App() {
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCVData()
      .then(data => {
        setCvData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching CV data:', err);
        setLoading(false);
      });
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loading"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
      <Routes>
        <Route path="/" element={<Home cvData={cvData} />} />
        <Route path="/projects/:slug" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
