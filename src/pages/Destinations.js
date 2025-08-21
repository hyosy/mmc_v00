import React, { useState, useEffect } from 'react';
import { handleImageError } from '../assets/images/index';

const Destinations = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Utilisation d'images de villes portuaires plus représentatives
  const destinations = [
    {
      city: 'Marseille',
      id: 'marseille',
      image: 'https://images.unsplash.com/photo-1589708532758-ddd0753b3b9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      description: 'Découvrez le charme du Vieux Port, la Basilique Notre-Dame de la Garde et profitez de la gastronomie méditerranéenne.'
    },
    {
      city: 'Alger',
      id: 'alger',
      image: 'https://images.unsplash.com/photo-1601288496920-b6154fe3626a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      description: 'Explorez la Casbah, la Grande Mosquée et promenez-vous sur le front de mer de la capitale algérienne.'
    },
    {
      city: 'Alicante',
      id: 'alicante',
      image: 'https://images.unsplash.com/photo-1533658280853-e4a10c25a30d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80',
      description: 'Profitez des plages ensoleillées, du Château de Santa Barbara et de la délicieuse cuisine espagnole.'
    }
  ];

  return (
    <div className="py-20 bg-gray-100 min-h-screen" id="destinations-page">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fadeInUp">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeInUp">Nos Destinations</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fadeInUp">
            Découvrez toutes les destinations desservies par MMC, reliant les plus beaux ports de la Méditerranée avec des traversées confortables et fiables.
          </p>
        </div>
        
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              id={destination.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden h-full group transition-all duration-300 hover:shadow-xl"
              style={{ transform: 'translateZ(0)' }} // Force GPU acceleration
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={`Port de ${destination.city}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={handleImageError}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
                  <div className="w-full p-4 transform transition-transform duration-300 translate-y-0 group-hover:translate-y-[-10px]">
                    <span className="text-2xl font-bold text-white block">{destination.city}</span>
                    <span className="w-10 h-1 bg-teal-500 block mt-2 transition-all duration-300 group-hover:w-20"></span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">{destination.description}</p>
                <button 
                  onClick={() => onNavigate('reservations')}
                  className="inline-block bg-blue-600 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-700 transition-colors transform transition-transform group-hover:translate-x-1"
                >
                  Réserver
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8 animate-fadeInUp animation-delay-400">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-500 mr-2 animate-pulse-grow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Informations sur nos traversées
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Horaires des départs</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="font-medium w-40">Marseille - Alger:</span>
                  <span>Lundi, Mercredi, Vendredi à 8h</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-40">Alger - Marseille:</span>
                  <span>Mardi, Jeudi, Dimanche à 9h</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-40">Marseille - Alicante:</span>
                  <span>Mardi, Jeudi, Samedi à 10h</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-40">Alicante - Marseille:</span>
                  <span>Mercredi, Vendredi, Dimanche à 11h</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-3">Durée des traversées</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="font-medium w-40">Marseille - Alger:</span>
                  <span>Environ 20 heures</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-40">Marseille - Alicante:</span>
                  <span>Environ 10 heures</span>
                </li>
                <li className="flex items-start">
                  <span className="font-medium w-40">Alger - Alicante:</span>
                  <span>Environ 15 heures (via Marseille)</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-blue-600 mb-3">Services à bord</h3>
            <p className="text-gray-600 mb-4">
              Tous nos navires sont équipés pour vous offrir le meilleur confort durant votre traversée :
            </p>
            <ul className="grid md:grid-cols-2 gap-x-4 gap-y-2">
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Restaurants et cafétérias
              </li>
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Boutiques duty-free
              </li>
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                WiFi gratuit
              </li>
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Espaces de divertissement
              </li>
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Cabines confortables
              </li>
              <li className="flex items-center text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Espaces panoramiques
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
