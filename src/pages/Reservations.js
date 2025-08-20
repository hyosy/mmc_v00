import React, { useState, useEffect } from 'react';
import ReservationCard from '../components/ReservationCard';
import SearchResults from '../components/SearchResults';
import BookingConfirmation from '../components/BookingConfirmation';

const Reservations = ({ onNavigate }) => {
  const [bookingStep, setBookingStep] = useState('search');
  const [searchParams, setSearchParams] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // Fonction pour simuler un chargement lors des transitions
  const simulateLoading = (callback, duration = 800) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (callback) callback();
    }, duration);
  };
  
  useEffect(() => {
    setIsVisible(true);
    
    // Récupérer les paramètres de recherche depuis localStorage s'ils existent
    const savedSearchParams = localStorage.getItem('searchParams');
    if (savedSearchParams) {
      const params = JSON.parse(savedSearchParams);
      // Simuler un chargement pour montrer la transition
      simulateLoading(() => {
        setSearchParams(params);
        setBookingStep('results');
        // Nettoyer localStorage après utilisation
        localStorage.removeItem('searchParams');
      });
    }
  }, []);
  
  // Gestionnaire pour la soumission du formulaire de recherche
  const handleSearch = (params) => {
    simulateLoading(() => {
      setSearchParams(params);
      setBookingStep('results');
    });
  };
  
  // Gestionnaire pour revenir à la recherche
  const handleResetSearch = () => {
    setBookingStep('search');
    setSearchParams(null);
  };
  
  // Gestionnaire pour finaliser la réservation
  const handleBooking = (details) => {
    simulateLoading(() => {
      setBookingDetails(details);
      setBookingStep('confirmation');
    });
  };
  
  // Gestionnaire pour revenir à l'accueil après réservation
  const handleBackToHome = () => {
    onNavigate('home');
  };
  
  return (
    <div className={`pt-24 pb-16 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center animate-fadeInUp">
          Réservez votre traversée
        </h1>
        
        {/* Overlay de chargement */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700 font-medium">Chargement en cours...</p>
            </div>
          </div>
        )}
        
        {/* Étapes du processus de réservation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep === 'search' ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>1</div>
            <div className={`h-1 w-16 sm:w-24 ${bookingStep === 'search' || bookingStep === 'results' || bookingStep === 'confirmation' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep === 'results' ? 'bg-blue-600 text-white' : bookingStep === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>2</div>
            <div className={`h-1 w-16 sm:w-24 ${bookingStep === 'confirmation' ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bookingStep === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>3</div>
          </div>
          <div className="flex justify-between mt-2 text-sm px-6">
            <span className={bookingStep === 'search' ? 'text-blue-600 font-medium' : 'text-gray-600'}>Recherche</span>
            <span className={bookingStep === 'results' ? 'text-blue-600 font-medium' : 'text-gray-600'}>Sélection</span>
            <span className={bookingStep === 'confirmation' ? 'text-blue-600 font-medium' : 'text-gray-600'}>Confirmation</span>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {bookingStep === 'search' && (
            <div className="animate-fadeIn">
              <ReservationCard horizontal={false} onNavigate={handleSearch} />
            </div>
          )}
          
          {bookingStep === 'results' && searchParams && (
            <SearchResults 
              searchParams={searchParams} 
              onReset={handleResetSearch} 
              onBook={handleBooking} 
            />
          )}
          
          {bookingStep === 'confirmation' && bookingDetails && (
            <BookingConfirmation 
              bookingDetails={bookingDetails} 
              onBackToHome={handleBackToHome} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
