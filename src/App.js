import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Reservations from './pages/Reservations';
import Destinations from './pages/Destinations';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [pageTransition, setPageTransition] = useState({
    isExiting: false,
    newPage: null
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  // Effet pour l'animation de chargement initial
  useEffect(() => {
    // Durée plus courte pour une expérience plus fluide
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Fonction pour gérer la navigation avec transition
  const handleNavigate = (page) => {
    if (page === currentPage) {
      // Si on est déjà sur la page, faire défiler vers le haut
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setPageTransition({
      isExiting: true,
      newPage: page
    });
    
    // Attendre la fin de l'animation de sortie avant de changer de page
    setTimeout(() => {
      setCurrentPage(page);
      setPageTransition({
        isExiting: false,
        newPage: null
      });
      
      // Faire défiler vers le haut de la page après la navigation
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };
  
  // Fonction pour rendre la page appropriée
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'reservations':
        return <Reservations onNavigate={handleNavigate} />;
      case 'destinations':
        return <Destinations onNavigate={handleNavigate} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      default:
        return <NotFound onNavigate={handleNavigate} />;
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navbar en dehors des animations pour garantir le bon fonctionnement */}
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      
      {/* Contenu principal de l'application avec animation d'apparition progressive */}
      <div className={`flex-grow transition-all duration-700 ease-out ${isInitialLoad ? 'opacity-0' : 'opacity-100'}`} style={{marginTop: "0px", position: "relative", zIndex: "10"}}>
        {/* Main content avec animation légère */}
        <main className={`transition-all duration-700 transform ${isInitialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} ${pageTransition.isExiting ? 'opacity-0' : 'opacity-100'}`}>
          {renderPage()}
        </main>
      </div>
      
      {/* Footer avec animation légèrement retardée */}
      <div className={`transition-all duration-700 delay-200 transform ${isInitialLoad ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}

export default App;
