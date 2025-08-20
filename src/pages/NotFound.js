import React from 'react';

const NotFound = () => {
  return (
    <div className="pt-24 pb-16 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Page non trouvée</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          La page que vous recherchez semble avoir pris le large. Veuillez retourner à la page d'accueil.
        </p>
        <a 
          href="/" 
          className="bg-teal-500 text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default NotFound;
