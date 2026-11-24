import { useEffect, useState } from 'react';
import { Navbar, PageId } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { LayersPage } from './pages/LayersPage';
import { TouchPage } from './pages/TouchPage';
import { LabPage } from './pages/LabPage';
import { PipelinePage } from './pages/PipelinePage';
import { AboutPage } from './pages/AboutPage';
import { soundFX } from './audio/soundFX';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isMuted, setIsMuted] = useState(false);

  // Sync with window.location.hash for multi-page URLs
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      if (['home', 'layers', 'touch', 'lab', 'pipeline', 'about'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-orange-500 selection:text-white">
      
      {/* Top Navigation Bar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Multi-Page Content Area */}
      <main className="flex-1 py-8">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {currentPage === 'layers' && (
          <LayersPage />
        )}

        {currentPage === 'touch' && (
          <TouchPage />
        )}

        {currentPage === 'lab' && (
          <LabPage />
        )}

        {currentPage === 'pipeline' && (
          <PipelinePage />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

    </div>
  );
}

export default App;
