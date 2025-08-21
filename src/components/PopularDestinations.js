import React from 'react';
import { handleImageError } from '../assets/images/index';

const DestinationCard = ({ destination, onNavigate }) => {
  // Création d'un ID pour le lien d'ancrage en fonction du nom de la destination
  const destinationId = destination.name.toLowerCase().replace(/\s+/g, '-');
  
  const handleClick = () => {
    // Navigation vers la page destinations
    if (onNavigate) {
      // Stockage de l'ID de destination dans localStorage pour référence future si nécessaire
      localStorage.setItem('selectedDestination', destinationId);
      
      // Navigation simple vers la page destinations
      // La fonction handleNavigate dans App.js s'occupera de faire défiler vers le haut
      onNavigate('destinations');
    }
  };
  
  return (
    <div 
      className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
      onClick={handleClick}
    >
      {/* Image de fond */}
      <div className="h-80">
        <img 
          src={destination.image} 
          alt={`${destination.name} - Destination MMC`} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={handleImageError}
          loading="lazy"
        />
        {/* Overlay de gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
      </div>
      
      {/* Contenu texte */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transition-all duration-300 transform translate-y-0 group-hover:translate-y-1">
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <h3 className="text-xl font-bold">{destination.name}</h3>
        </div>
        
        <p className="text-sm text-gray-200 mb-3">{destination.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm">{destination.rating}</span>
          </div>
          
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H14a1 1 0 001-1v-3.07a6.964 6.964 0 01-2.292-1.93H9a1 1 0 00-.707.293L7 11.586V8a1 1 0 00-1-1H4a2 2 0 00-2 2v4a2 2 0 002 2h2a2 2 0 00-2-2V9a1 1 0 011-1h1.586l2.707-2.707A1 1 0 019 5h3.17A7 7 0 1116 5v10a1 1 0 01-1 1h-5.05a2.5 2.5 0 014.9 0H17a1 1 0 001-1V5a1 1 0 00-1-1H3z" />
            </svg>
            <span className="text-sm">{destination.travelTime}</span>
          </div>
          
          <div className="bg-orange-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
            À partir de {destination.startingPrice}€
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularDestinations = ({ destinations, onNavigate }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination, index) => (
          <DestinationCard 
            key={index} 
            destination={destination} 
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default PopularDestinations;
