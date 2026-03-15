import MainLayout from '@/components/layout/MainLayout';
import Hero from '@/components/cv/Hero';
import About from '@/components/cv/About';
import Experience from '@/components/cv/Experience';
import Projects from '@/components/cv/Projects';
import Skills from '@/components/cv/Skills';
import Contact from '@/components/cv/Contact';

function App() {
  return (
    <MainLayout>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </MainLayout>
  );
}

export default App;
