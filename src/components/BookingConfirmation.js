import React, { useState } from 'react';

const BookingConfirmation = ({ bookingDetails, onBackToHome }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'France',
    paymentMethod: 'card',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Simuler la finalisation de la réservation
      setIsBookingComplete(true);
      // Générer un numéro de réservation aléatoire
      setBookingNumber(`MMC-${Math.random().toString(36).substr(2, 5).toUpperCase()}-${Math.floor(Math.random() * 10000)}`);
    }
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {!isBookingComplete ? (
        <>
          {/* Étapes de la réservation */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>1</div>
              <div className={`h-1 w-16 sm:w-32 ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <div className={`rounded-full w-8 h-8 flex items-center justify-center ${currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>2</div>
              <div className="h-1 w-16 sm:w-32 bg-gray-300"></div>
              <div className="rounded-full w-8 h-8 flex items-center justify-center bg-gray-300 text-gray-600">3</div>
            </div>
            <div className="flex justify-between mt-2 text-sm">
              <span className={currentStep === 1 ? 'text-blue-600 font-medium' : 'text-gray-600'}>Informations personnelles</span>
              <span className={currentStep === 2 ? 'text-blue-600 font-medium' : 'text-gray-600'}>Paiement</span>
              <span className="text-gray-600">Confirmation</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-6 py-4">
              <h2 className="text-xl font-bold">Finaliser votre réservation</h2>
            </div>
            
            {/* Récapitulatif de la réservation */}
            <div className="p-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Récapitulatif de votre voyage</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Détails du trajet</h4>
                  <div className="space-y-1 text-gray-600">
                    <p>
                      <span className="font-medium">Départ:</span> {bookingDetails.departure}, le {formatDate(bookingDetails.date)} à {bookingDetails.selectedTrip.departureTime}
                    </p>
                    <p>
                      <span className="font-medium">Destination:</span> {bookingDetails.destination}
                    </p>
                    <p>
                      <span className="font-medium">Navire:</span> {bookingDetails.selectedTrip.ship}
                    </p>
                    <p>
                      <span className="font-medium">Type de voyage:</span> {bookingDetails.tripType === 'roundTrip' ? 'Aller-retour' : 'Aller simple'}
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Détails de la réservation</h4>
                  <div className="space-y-1 text-gray-600">
                    <p>
                      <span className="font-medium">Passagers:</span> {bookingDetails.passengers}
                    </p>
                    <p>
                      <span className="font-medium">Type de cabine:</span> {
                        bookingDetails.cabinType === 'standard' ? 'Standard' :
                        bookingDetails.cabinType === 'comfort' ? 'Confort' : 'Premium'
                      }
                    </p>
                    <p>
                      <span className="font-medium">Options:</span> {bookingDetails.options.length > 0 ? 
                        bookingDetails.options.join(', ') : 'Aucune option sélectionnée'}
                    </p>
                    <p className="text-xl font-bold text-blue-600 mt-2">
                      Total: {bookingDetails.totalPrice} €
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              {currentStep === 1 ? (
                /* Formulaire d'informations personnelles */
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Prénom</label>
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Nom</label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Téléphone</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 mb-1">Adresse</label>
                    <input 
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Ville</label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Code postal</label>
                      <input 
                        type="text" 
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Pays</label>
                      <select 
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                        required
                      >
                        <option value="France">France</option>
                        <option value="Algérie">Algérie</option>
                        <option value="Espagne">Espagne</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>
                  </div>
                </div>
              ) : (
                /* Formulaire de paiement */
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations de paiement</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === 'card'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Carte bancaire</span>
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio" 
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>PayPal</span>
                      </label>
                    </div>
                    
                    {formData.paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-700 mb-1">Numéro de carte</label>
                          <input 
                            type="text" 
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="0000 0000 0000 0000"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-700 mb-1">Date d'expiration</label>
                            <input 
                              type="text" 
                              name="cardExpiry"
                              value={formData.cardExpiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 mb-1">CVV</label>
                            <input 
                              type="text" 
                              name="cardCVV"
                              value={formData.cardCVV}
                              onChange={handleChange}
                              placeholder="123"
                              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formData.paymentMethod === 'paypal' && (
                      <div className="bg-gray-50 p-4 rounded-md text-center">
                        <p className="text-gray-700 mb-2">Vous serez redirigé vers PayPal pour finaliser votre paiement.</p>
                        <img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/44_Grey_PayPal_Pill_Button.png" alt="PayPal" className="h-10 mx-auto" />
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              <div className="mt-6 flex justify-between">
                {currentStep === 2 && (
                  <button 
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-blue-600 font-medium"
                  >
                    Retour
                  </button>
                )}
                <button 
                  type="submit"
                  className="ml-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
                >
                  {currentStep === 1 ? 'Continuer vers le paiement' : 'Confirmer la réservation'}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        /* Page de confirmation de réservation */
        <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fadeIn">
          <div className="bg-green-600 text-white px-6 py-4">
            <h2 className="text-xl font-bold">Réservation confirmée</h2>
          </div>
          
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Merci pour votre réservation!</h3>
            <p className="text-gray-600 mb-6">
              Votre réservation a bien été enregistrée et confirmée. Vous recevrez un email de confirmation à l'adresse {formData.email}.
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg max-w-md mx-auto mb-8">
              <p className="text-gray-700">Numéro de réservation</p>
              <p className="text-2xl font-bold text-blue-600">{bookingNumber}</p>
            </div>
            
            <div className="mb-8">
              <h4 className="font-semibold text-gray-900 mb-2">Récapitulatif du voyage</h4>
              <ul className="text-gray-600 space-y-1">
                <li><span className="font-medium">De:</span> {bookingDetails.departure}</li>
                <li><span className="font-medium">À:</span> {bookingDetails.destination}</li>
                <li><span className="font-medium">Date:</span> {formatDate(bookingDetails.date)}</li>
                <li><span className="font-medium">Navire:</span> {bookingDetails.selectedTrip.ship}</li>
                <li><span className="font-medium">Passagers:</span> {bookingDetails.passengers}</li>
              </ul>
            </div>
            
            <button 
              onClick={onBackToHome}
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors"
            >
              Retour à l'accueil
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingConfirmation;
