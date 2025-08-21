import React, { useState, useEffect } from 'react';

const ReservationCard = ({ horizontal = false, onNavigate }) => {
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [tripType, setTripType] = useState('oneWay'); // 'oneWay' ou 'roundTrip'
  const [hoveredReturnDate, setHoveredReturnDate] = useState(false);
  const [formErrors, setFormErrors] = useState({}); // Pour gérer les erreurs de validation
  const [debug, setDebug] = useState(false); // Pour le débogage visuel
  
  const ports = ['Marseille', 'Alger', 'Barcelone', 'Oran', 'Valence', 'Alicante'];
  
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Validation du formulaire
  const validateForm = () => {
    const errors = {};
    
    if (!departure) {
      errors.departure = "Veuillez sélectionner un port de départ";
    }
    
    if (!destination) {
      errors.destination = "Veuillez sélectionner une destination";
    }
    
    if (!date) {
      errors.date = "Veuillez sélectionner une date de départ";
    }
    
    if (tripType === 'roundTrip' && !returnDate) {
      errors.returnDate = "Veuillez sélectionner une date de retour";
    }
    
    if (passengers < 1) {
      errors.passengers = "Le nombre de passagers doit être au moins 1";
    }
    
    return errors;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Valider le formulaire
    const errors = validateForm();
    setFormErrors(errors);
    
    // Si des erreurs existent, ne pas continuer
    if (Object.keys(errors).length > 0) {
      return;
    }
    
    // Formatage des dates pour l'affichage
    const formattedDepartureDate = new Date(date)
      .toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    
    let formattedReturnDate = null;
    if (tripType === 'roundTrip' && returnDate) {
      formattedReturnDate = new Date(returnDate)
        .toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    // Préparer les données de recherche
    const searchParams = {
      departure,
      destination,
      departureDate: date,
      returnDate: tripType === 'roundTrip' ? returnDate : null,
      passengers,
      isRoundTrip: tripType === 'roundTrip',
      formattedDepartureDate,
      formattedReturnDate,
      vehicleType: 'none'
    };
    
    // Appeler la fonction de navigation fournie par le parent
    if (onNavigate) {
      console.log("ReservationCard - Envoi des paramètres:", searchParams);
      onNavigate(searchParams);
    }
  };
  
  // Classe commune pour tous les champs du formulaire avec gestion des erreurs
  const getInputClass = (fieldName) => {
    const baseClass = "w-full px-3 sm:px-4 py-2 sm:py-2.5 border rounded-lg transition-all duration-200 hover:border-blue-400 focus:outline-none focus:ring-2";
    const errorClass = formErrors[fieldName] ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-600";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-xl overflow-hidden backdrop-blur-sm ${horizontal ? 'md:max-w-4xl mx-auto' : 'max-w-md mx-auto'} transition-all duration-500 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="p-3 sm:p-4 md:p-5 border-t-4 border-blue-600">
        <div className="flex justify-center space-x-2 sm:space-x-4 mb-3 sm:mb-4">
          <div className="inline-flex rounded-full shadow-md p-0.5 bg-gray-100" role="group">
            <button
              type="button"
              className={`px-3 sm:px-5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                tripType === 'oneWay' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-transparent text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTripType('oneWay')}
            >
              Aller simple
            </button>
            <button
              type="button"
              className={`px-3 sm:px-5 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-300 ${
                tripType === 'roundTrip' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-transparent text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setTripType('roundTrip')}
            >
              Aller-retour
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* Premier groupe de champs (grille responsive) */}
          <div className={`grid ${horizontal ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-2 sm:gap-3 md:gap-4' : 'grid-cols-1 gap-3'}`}>
            <div className={`${horizontal ? 'md:col-span-3' : ''} mb-1 sm:mb-2`}>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">Départ</label>
              <select 
                value={departure}
                onChange={(e) => {
                  setDeparture(e.target.value);
                  if (formErrors.departure) {
                    const newErrors = {...formErrors};
                    delete newErrors.departure;
                    setFormErrors(newErrors);
                  }
                }}
                className={`${getInputClass('departure')} h-9 sm:h-10 text-xs sm:text-sm`}
                required
              >
                <option value="">Sélectionnez</option>
                {ports.map(port => (
                  <option key={port} value={port}>{port}</option>
                ))}
              </select>
              {formErrors.departure && (
                <p className="text-red-500 text-xs mt-1">{formErrors.departure}</p>
              )}
            </div>
            
            <div className={`${horizontal ? 'md:col-span-3' : ''} mb-1 sm:mb-2`}>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">Destination</label>
              <select 
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  if (formErrors.destination) {
                    const newErrors = {...formErrors};
                    delete newErrors.destination;
                    setFormErrors(newErrors);
                  }
                }}
                className={`${getInputClass('destination')} h-9 sm:h-10 text-xs sm:text-sm`}
                required
              >
                <option value="">Sélectionnez</option>
                {ports.filter(port => port !== departure).map(port => (
                  <option key={port} value={port}>{port}</option>
                ))}
              </select>
              {formErrors.destination && (
                <p className="text-red-500 text-xs mt-1">{formErrors.destination}</p>
              )}
            </div>
            
            <div className={`${horizontal ? 'md:col-span-2' : ''} mb-1 sm:mb-2`}>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">Date départ</label>
              <input 
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  if (formErrors.date) {
                    const newErrors = {...formErrors};
                    delete newErrors.date;
                    setFormErrors(newErrors);
                  }
                }}
                min={new Date().toISOString().split('T')[0]}
                className={`${getInputClass('date')} h-9 sm:h-10 text-xs sm:text-sm`}
                required
              />
              {formErrors.date && (
                <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>
              )}
            </div>
            
            <div className={`${horizontal ? 'md:col-span-2' : ''} mb-1 sm:mb-2`}>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">Date retour</label>
              <div className="relative">
                <input 
                  type="date"
                  value={returnDate}
                  onChange={(e) => {
                    setReturnDate(e.target.value);
                    if (formErrors.returnDate) {
                      const newErrors = {...formErrors};
                      delete newErrors.returnDate;
                      setFormErrors(newErrors);
                    }
                  }}
                  min={date || new Date().toISOString().split('T')[0]}
                  className={`${getInputClass('returnDate')} ${tripType !== 'roundTrip' ? 'bg-gray-100 cursor-not-allowed' : ''} h-9 sm:h-10 text-xs sm:text-sm`}
                  required={tripType === 'roundTrip'}
                  disabled={tripType !== 'roundTrip' || !date}
                  onMouseEnter={() => tripType !== 'roundTrip' && setHoveredReturnDate(true)}
                  onMouseLeave={() => setHoveredReturnDate(false)}
                />
                {tripType !== 'roundTrip' && hoveredReturnDate && (
                  <div className="absolute top-full left-0 mt-1 w-full bg-white p-2 rounded-md shadow-md text-xs text-blue-600 z-10 border border-gray-200">
                    Cliquez sur "Aller-retour" pour activer ce champ
                  </div>
                )}
                {formErrors.returnDate && tripType === 'roundTrip' && (
                  <p className="text-red-500 text-xs mt-1 absolute">{formErrors.returnDate}</p>
                )}
              </div>
            </div>
            
            <div className={`${horizontal ? 'md:col-span-2' : ''} mb-1 sm:mb-2`}>
              <label className="block text-gray-700 text-xs sm:text-sm font-medium mb-1 sm:mb-1.5">Passagers</label>
              <input 
                type="number" 
                min="1" 
                max="10"
                value={passengers}
                onChange={(e) => {
                  const value = e.target.value ? parseInt(e.target.value) : '';
                  setPassengers(value);
                  if (formErrors.passengers) {
                    const newErrors = {...formErrors};
                    delete newErrors.passengers;
                    setFormErrors(newErrors);
                  }
                }}
                className={`${getInputClass('passengers')} h-9 sm:h-10 text-xs sm:text-sm`}
                required
              />
              {formErrors.passengers && (
                <p className="text-red-500 text-xs mt-1">{formErrors.passengers}</p>
              )}
            </div>
          </div>
          
          {/* Bouton rechercher en dessous - style amélioré et taille réduite */}
          <div className={`${horizontal ? 'mt-3 sm:mt-5 flex justify-center' : 'mt-3 sm:mt-5'}`}>
            <button
              type="submit"
              className={`bg-gradient-to-r from-orange-500 to-orange-400 text-white font-medium py-2 sm:py-2.5 px-4 sm:px-6 rounded-lg hover:from-orange-600 hover:to-orange-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 relative group overflow-hidden border border-orange-300 ${horizontal ? 'w-full sm:w-2/3 md:w-2/5 lg:w-1/4' : 'w-full'}`}
              onClick={(e) => {
                if (debug) {
                  e.preventDefault();
                  setDebug(false);
                }
              }}
            >
              <span className="relative z-10 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Rechercher
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </button>
            {debug && (
              <div className="fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-lg">
                  <pre className="text-xs">
                    {JSON.stringify({ horizontal, tripType, formErrors }, null, 2)}
                  </pre>
                  <button onClick={() => setDebug(false)} className="mt-2 bg-gray-200 px-2 py-1 rounded text-sm">
                    Fermer
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationCard;
