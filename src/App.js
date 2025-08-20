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
  
  // Fonction pour gérer la navigation avec transition
  const handleNavigate = (page) => {
    if (page === currentPage) return;
    
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
    <div className="flex flex-col min-h-screen">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main className={`flex-grow transition-opacity duration-300 ${pageTransition.isExiting ? 'opacity-0' : 'opacity-100'}`}>
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
