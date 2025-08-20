import React, { useState } from 'react';
import { shipExterior } from '../assets/images/index';

const SearchResults = ({ searchParams, onReset, onBook }) => {
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [selectedCabinType, setSelectedCabinType] = useState('standard');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isBookingStep, setIsBookingStep] = useState(false);

  // Simuler des traversées en fonction des paramètres de recherche
  const generateTrips = () => {
    const { departure, destination, date, returnDate, passengers, tripType } = searchParams;
    
    // Générer des heures de départ et durées aléatoires
    const departureTrips = Array.from({ length: 3 }, (_, index) => {
      const hour = 7 + index * 5; // 7h, 12h, 17h
      const duration = destination === 'Alger' ? '20 heures' : '10 heures';
      const price = destination === 'Alger' 
        ? 90 + (index * 20) 
        : 60 + (index * 15);
      
      return {
        id: `dep-${index}`,
        departure,
        destination,
        date,
        departureTime: `${hour}:00`,
        arrivalDate: date, // À calculer réellement
        arrivalTime: `${(hour + (destination === 'Alger' ? 20 : 10)) % 24}:00`,
        duration,
        availableSeats: 100 - (index * 10),
        price,
        ship: index === 0 ? 'MMC Méditerranée' : index === 1 ? 'MMC Harmonie' : 'MMC Azur',
        type: 'departure'
      };
    });
    
    // Si c'est un aller-retour, générer aussi des voyages retour
    const returnTrips = tripType === 'roundTrip'
      ? Array.from({ length: 3 }, (_, index) => {
          const hour = 8 + index * 5; // 8h, 13h, 18h
          const duration = destination === 'Alger' ? '20 heures' : '10 heures';
          const price = destination === 'Alger' 
            ? 90 + (index * 20) 
            : 60 + (index * 15);
          
          return {
            id: `ret-${index}`,
            departure: destination,
            destination: departure,
            date: returnDate,
            departureTime: `${hour}:00`,
            arrivalDate: returnDate, // À calculer réellement
            arrivalTime: `${(hour + (destination === 'Alger' ? 20 : 10)) % 24}:00`,
            duration,
            availableSeats: 120 - (index * 15),
            price,
            ship: index === 0 ? 'MMC Zéphyr' : index === 1 ? 'MMC Harmonie' : 'MMC Méditerranée',
            type: 'return'
          };
        })
      : [];
    
    return { departureTrips, returnTrips };
  };

  const { departureTrips, returnTrips } = generateTrips();
  const cabinTypes = [
    { id: 'standard', name: 'Cabine Standard', priceMultiplier: 1 },
    { id: 'comfort', name: 'Cabine Confort', priceMultiplier: 1.5, features: ['Hublot', 'Lits confortables', 'TV'] },
    { id: 'premium', name: 'Cabine Premium', priceMultiplier: 2, features: ['Vue sur mer', 'Lit king-size', 'Minibar', 'TV', 'Salle de bain privative'] }
  ];
  
  const options = [
    { id: 'meal', name: 'Forfait repas', price: 25, description: 'Petit-déjeuner, déjeuner et dîner inclus' },
    { id: 'wifi', name: 'WiFi Premium', price: 10, description: 'Connexion haut débit illimitée' },
    { id: 'spa', name: 'Accès spa', price: 35, description: 'Accès au spa et espace bien-être' },
    { id: 'parking', name: 'Parking au port', price: 15, description: 'Place de parking réservée' },
  ];
  
  const handleSelectTrip = (trip) => {
    setSelectedTrip(trip);
    setIsBookingStep(true);
  };
  
  const handleOptionToggle = (optionId) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter(id => id !== optionId));
    } else {
      setSelectedOptions([...selectedOptions, optionId]);
    }
  };
  
  const calculateTotalPrice = () => {
    if (!selectedTrip) return 0;
    
    // Prix de base (aller simple ou aller-retour)
    let basePrice = selectedTrip.price;
    if (searchParams.tripType === 'roundTrip') {
      // Pour un aller-retour, on ajoute le prix du voyage sélectionné + le premier voyage de retour disponible
      basePrice = basePrice + (returnTrips[0]?.price || 0);
    }
    
    // Multiplie par le nombre de passagers
    basePrice = basePrice * searchParams.passengers;
    
    // Applique le multiplicateur de la cabine
    const cabinMultiplier = cabinTypes.find(c => c.id === selectedCabinType)?.priceMultiplier || 1;
    basePrice = basePrice * cabinMultiplier;
    
    // Ajoute les options sélectionnées
    const optionsPrice = selectedOptions.reduce((total, optionId) => {
      const option = options.find(o => o.id === optionId);
      return total + (option ? option.price : 0);
    }, 0);
    
    // Multiplie les options par le nombre de passagers
    return basePrice + (optionsPrice * searchParams.passengers);
  };
  
  const handleBook = () => {
    // Simuler une réservation
    const bookingDetails = {
      ...searchParams,
      selectedTrip,
      cabinType: selectedCabinType,
      options: selectedOptions,
      totalPrice: calculateTotalPrice()
    };
    
    onBook(bookingDetails);
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
      {!isBookingStep ? (
        <div className="space-y-8 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Résultats de votre recherche</h2>
            <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium">{searchParams.departure} → {searchParams.destination}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">{new Date(searchParams.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="font-medium">{searchParams.passengers} passager(s)</span>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
                <span className="font-medium">{searchParams.tripType === 'roundTrip' ? 'Aller-retour' : 'Aller simple'}</span>
              </div>
            </div>
            
            <button 
              onClick={onReset}
              className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Modifier la recherche
            </button>
          </div>

          {/* Traversées aller */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-3">
              <h3 className="text-lg font-bold">Traversées aller • {searchParams.departure} → {searchParams.destination}</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {departureTrips.map(trip => (
                <div key={trip.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center">
                        <img 
                          src={shipExterior} 
                          alt={trip.ship}
                          className="w-12 h-12 object-cover rounded-lg mr-4" 
                        />
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{trip.ship}</div>
                          <div className="text-sm text-gray-600">Classe économique • {trip.availableSeats} places disponibles</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-6 md:gap-10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{trip.departureTime}</div>
                        <div className="text-sm text-gray-500">{trip.departure}</div>
                      </div>
                      <div className="text-center flex flex-col items-center justify-center">
                        <div className="text-xs text-gray-500 mb-1">{trip.duration}</div>
                        <div className="w-full h-0.5 bg-gray-300 relative">
                          <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{trip.arrivalTime}</div>
                        <div className="text-sm text-gray-500">{trip.destination}</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 md:mt-0 text-right">
                      <div className="text-2xl font-bold text-gray-900">{trip.price} €<span className="text-sm font-normal">/pers.</span></div>
                      <button 
                        onClick={() => handleSelectTrip(trip)}
                        className="mt-2 bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Sélectionner
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Traversées retour (si aller-retour) */}
          {searchParams.tripType === 'roundTrip' && returnTrips.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-teal-600 text-white px-6 py-3">
                <h3 className="text-lg font-bold">Traversées retour • {searchParams.destination} → {searchParams.departure}</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {returnTrips.map(trip => (
                  <div key={trip.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center">
                          <img 
                            src={shipExterior} 
                            alt={trip.ship}
                            className="w-12 h-12 object-cover rounded-lg mr-4" 
                          />
                          <div>
                            <div className="text-lg font-semibold text-gray-900">{trip.ship}</div>
                            <div className="text-sm text-gray-600">Classe économique • {trip.availableSeats} places disponibles</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-6 md:gap-10">
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{trip.departureTime}</div>
                          <div className="text-sm text-gray-500">{trip.departure}</div>
                        </div>
                        <div className="text-center flex flex-col items-center justify-center">
                          <div className="text-xs text-gray-500 mb-1">{trip.duration}</div>
                          <div className="w-full h-0.5 bg-gray-300 relative">
                            <div className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-gray-500 rounded-full"></div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-900">{trip.arrivalTime}</div>
                          <div className="text-sm text-gray-500">{trip.destination}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 md:mt-0 text-right">
                        <div className="text-2xl font-bold text-gray-900">{trip.price} €<span className="text-sm font-normal">/pers.</span></div>
                        <button 
                          onClick={() => handleSelectTrip(trip)}
                          className="mt-2 bg-teal-600 text-white font-medium py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
                        >
                          Sélectionner
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8 animate-fadeIn">
          {/* Étape de sélection de cabine et options */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
              <h3 className="text-lg font-bold">Personnaliser votre voyage</h3>
              <button 
                onClick={() => setIsBookingStep(false)}
                className="text-white hover:text-blue-200 transition-colors flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour
              </button>
            </div>
            
            <div className="p-6">
              {/* Résumé du voyage sélectionné */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-2 md:mb-0">
                    <h4 className="font-semibold text-gray-900">{selectedTrip?.ship}</h4>
                    <div className="text-sm text-gray-600">
                      {selectedTrip?.departure} → {selectedTrip?.destination} • {new Date(selectedTrip?.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} • {selectedTrip?.departureTime}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{selectedTrip?.price} €<span className="text-sm font-normal">/pers.</span></div>
                  </div>
                </div>
              </div>
              
              {/* Sélection du type de cabine */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Choisissez votre type de cabine</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  {cabinTypes.map(cabin => (
                    <div 
                      key={cabin.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedCabinType === cabin.id ? 'border-blue-600 bg-blue-50 ring-2 ring-blue-600 ring-opacity-50' : 'border-gray-200 hover:border-blue-300'}`}
                      onClick={() => setSelectedCabinType(cabin.id)}
                    >
                      <div className="flex items-start mb-2">
                        <input 
                          type="radio"
                          checked={selectedCabinType === cabin.id}
                          onChange={() => setSelectedCabinType(cabin.id)}
                          className="mt-1 mr-2" 
                        />
                        <div>
                          <h5 className="font-medium text-gray-900">{cabin.name}</h5>
                          <div className="text-sm text-gray-500">
                            Coefficient prix: x{cabin.priceMultiplier}
                          </div>
                        </div>
                      </div>
                      
                      {cabin.features && (
                        <ul className="text-xs text-gray-600 mt-2 pl-5">
                          {cabin.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center mb-1">
                              <svg className="w-3 h-3 text-blue-600 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Options supplémentaires */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Options supplémentaires</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {options.map(option => (
                    <div 
                      key={option.id}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${selectedOptions.includes(option.id) ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                      onClick={() => handleOptionToggle(option.id)}
                    >
                      <div className="flex items-start">
                        <input 
                          type="checkbox"
                          checked={selectedOptions.includes(option.id)}
                          onChange={() => handleOptionToggle(option.id)}
                          className="mt-1 mr-3" 
                        />
                        <div>
                          <div className="flex items-center">
                            <h5 className="font-medium text-gray-900">{option.name}</h5>
                            <span className="ml-2 text-blue-600 font-semibold">+{option.price}€</span>
                          </div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Récapitulatif et prix total */}
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900">Récapitulatif</h4>
                    <div className="text-sm text-gray-600">
                      {searchParams.passengers} passager(s) • {cabinTypes.find(c => c.id === selectedCabinType)?.name} • {selectedOptions.length} option(s)
                    </div>
                  </div>
                  <div className="mt-2 md:mt-0 text-right">
                    <div className="text-sm text-gray-600">Prix total</div>
                    <div className="text-2xl font-bold text-blue-600">{calculateTotalPrice()} €</div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={handleBook}
                  className="bg-orange-500 text-white font-bold py-3 px-8 rounded-md hover:bg-orange-600 transition-colors"
                >
                  Réserver maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
