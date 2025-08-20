import React from 'react';

const DestinationCard = ({ city, image, description, onNavigate }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-full hover:-translate-y-2 transition-transform">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={city} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{city}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <button 
          onClick={() => onNavigate && onNavigate('reservations')}
          className="inline-block bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-800 transition-colors"
        >
          Réserver
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;
