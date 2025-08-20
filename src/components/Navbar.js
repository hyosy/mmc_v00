import React, { useState } from 'react';
import mmcLogo from '../assets/images/mmc-logo-dark.png';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center cursor-pointer group animate-slideIn"
        >
          <img 
            src={mmcLogo} 
            alt="MMC Maritime" 
            className="group-hover:scale-105 transition-transform h-14 object-contain" 
            style={{ maxWidth: '180px' }}
          />
        </div>
        
        {/* Navigation principale - Desktop */}
        <nav className="hidden md:flex items-center space-x-6 animate-fadeIn">
          {['home', 'reservations', 'destinations', 'about'].map((page, index) => (
            <button 
              key={page}
              onClick={() => onNavigate(page)}
              className={`${currentPage === page ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-800 hover:text-blue-500'} 
              transition-all duration-300 font-medium py-1 px-2 relative overflow-hidden group`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="relative z-10">
                {page === 'home' ? 'Accueil' : 
                 page === 'reservations' ? 'Réservations' :
                 page === 'destinations' ? 'Destinations' : 'À propos'}
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>
        
        {/* Boutons d'authentification - Desktop */}
        <div className="hidden md:flex items-center space-x-4 animate-fadeIn animation-delay-400">
          <button
            className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-md transition-colors font-medium"
          >
            Connexion
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors font-medium"
          >
            Inscription
          </button>
        </div>
        
        {/* Menu mobile - Bouton */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-gray-800 p-2 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Menu mobile - Contenu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fadeInUp">
          <nav className="flex flex-col py-3">
            {['home', 'reservations', 'destinations', 'about'].map((page) => (
              <button 
                key={page}
                onClick={() => {
                  onNavigate(page);
                  setIsMenuOpen(false);
                }}
                className={`${currentPage === page ? 'bg-blue-50 text-blue-600' : 'text-gray-800'} px-4 py-3 text-left hover:bg-blue-50 transition-colors`}
              >
                {page === 'home' ? 'Accueil' : 
                 page === 'reservations' ? 'Réservations' :
                 page === 'destinations' ? 'Destinations' : 'À propos'}
              </button>
            ))}
            <div className="border-t border-gray-200 mt-2 pt-2 px-4 pb-3 space-y-2">
              <button className="w-full py-2 text-center text-blue-600 hover:bg-blue-50 rounded-md">
                Connexion
              </button>
              <button className="w-full py-2 text-center bg-blue-600 text-white hover:bg-blue-700 rounded-md">
                Inscription
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
