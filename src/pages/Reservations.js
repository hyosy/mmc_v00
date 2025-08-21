import React, { useState, useEffect } from 'react';
import ReservationCard from '../components/ReservationCard';
import SearchResults from '../components/SearchResults';
import BookingConfirmation from '../components/BookingConfirmation';
import { shipCabin, shipExterior, shipInterior, handleImageError } from '../assets/images/index';

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
    
    // Effet d'entrée avec délai
    const timer = setTimeout(() => {
      animateElements();
      setupCardHoverEffects();
    }, 200);
    
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
    
    return () => clearTimeout(timer);
  }, []);
  
  // Fonction pour animer les éléments
  const animateElements = () => {
    const animatedElements = document.querySelectorAll('.animated-element');
    animatedElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('active');
      }, index * 150);
    });
  };
  
  // Fonction pour configurer les effets de survol des cartes
  const setupCardHoverEffects = () => {
    const cards = document.querySelectorAll('.hover-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const tiltX = (centerX - x) / 15;
        const tiltY = (y - centerY) / 15;
        card.style.transform = `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  };
  
  // Gestionnaire pour la soumission du formulaire de recherche
  const handleSearch = (params) => {
    simulateLoading(() => {
      setSearchParams(params);
      setBookingStep('results');
      console.log("Changement d'étape vers les résultats", params);
    });
  };
  
  // Gestionnaire pour revenir à la recherche
  const handleResetSearch = () => {
    simulateLoading(() => {
      setBookingStep('search');
      setSearchParams(null);
      // Animer les nouveaux éléments après changement d'étape
      setTimeout(() => {
        animateElements();
        setupCardHoverEffects();
      }, 100);
    });
  };
  
  // Gestionnaire pour finaliser la réservation
  const handleBooking = (details) => {
    simulateLoading(() => {
      setBookingDetails(details);
      setBookingStep('confirmation');
      // Animer les nouveaux éléments après changement d'étape
      setTimeout(() => {
        animateElements();
        setupCardHoverEffects();
      }, 100);
    });
  };
  
  // Gestionnaire pour revenir à l'accueil après réservation
  const handleBackToHome = () => {
    onNavigate('home');
  };
  
  // Les avantages du service de réservation
  const bookingFeatures = [
    {
      title: "Réservation Rapide",
      description: "Quelques clics suffisent pour réserver votre traversée idéale",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "blue"
    },
    {
      title: "Comparaison Facile",
      description: "Consultez tous les horaires et options pour trouver la meilleure offre",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
      color: "green"
    },
    {
      title: "Choix de Cabines",
      description: "Des options adaptées à tous les budgets et tous les besoins",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "orange"
    },
    {
      title: "Confirmation Immédiate",
      description: "Recevez votre confirmation de réservation par email instantanément",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: "purple"
    }
  ];
  
  // Informations sur les destinations populaires
  const popularRoutes = [
    {
      from: "Marseille",
      to: "Alger",
      duration: "20 heures",
      frequency: "3 départs par semaine",
      price: "À partir de 90€"
    },
    {
      from: "Marseille",
      to: "Alicante",
      duration: "10 heures",
      frequency: "4 départs par semaine",
      price: "À partir de 79€"
    },
    {
      from: "Alger",
      to: "Marseille",
      duration: "20 heures",
      frequency: "3 départs par semaine",
      price: "À partir de 90€"
    }
  ];
  
  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero section avec image de fond */}
      <section className="relative pt-28 pb-24 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 overflow-hidden">
        {/* Particules flottantes décoratives */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-24 h-24 rounded-full bg-blue-500/20 animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-16 h-16 rounded-full bg-orange-500/20 animate-float animation-delay-500"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 rounded-full bg-blue-400/20 animate-float animation-delay-700"></div>
          <div className="absolute bottom-1/3 left-1/3 w-12 h-12 rounded-full bg-orange-400/20 animate-float animation-delay-200"></div>
        </div>
        
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img 
            src={shipCabin} 
            alt="Cabine de bateau de croisière" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/90 via-blue-800/70 to-blue-700/60"></div>
        </div>
        
        {/* Vagues décoratives */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path fill="#fff" fillOpacity="1" d="M0,224L48,229.3C96,235,192,245,288,250.7C384,256,480,256,576,229.3C672,203,768,149,864,149.3C960,149,1056,203,1152,208C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-8 pb-16">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="animated-element opacity-0 transform translate-y-6 transition-all duration-700">
              <span className="inline-block bg-white/20 text-white text-sm font-bold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm tracking-wide uppercase border border-white/30">VOYAGE EN MÉDITERRANÉE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-8 animated-element opacity-0 transform translate-y-6 transition-all duration-700 delay-100 leading-tight text-shadow-lg">
              Réservez Votre <br />
              <span className="text-orange-400 relative inline-block">
                Traversée Méditerranéenne
                <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 5.5C20 1.5 50 0.5 75 4C100 7.5 125 7.5 150 5.5C175 3.5 199 1 199 1" stroke="#f97316" strokeWidth="4" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 animated-element opacity-0 transform translate-y-6 transition-all duration-700 delay-200 leading-relaxed">
              Une expérience maritime d'exception vous attend. Découvrez nos traversées, choisissez votre cabine idéale et réservez en toute simplicité pour une aventure inoubliable.
            </p>
          </div>
          
          {/* Étapes du processus de réservation */}
          <div className="max-w-4xl mx-auto mb-8 animated-element opacity-100">
            {/* Structure visuelle des étapes */}
            <div className="relative flex justify-center items-center mb-6">
              {/* Bulles des étapes */}
              <div className="flex justify-between w-full px-4 items-center relative z-10">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ${bookingStep === 'search' ? 'bg-orange-500 text-white shadow-orange-500/50 shadow-lg scale-110' : 'bg-blue-600 text-white'} transition-all duration-300`}>1</div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ${bookingStep === 'results' ? 'bg-orange-500 text-white shadow-orange-500/50 shadow-lg scale-110' : bookingStep === 'confirmation' ? 'bg-blue-600 text-white' : 'bg-white/80 text-gray-500'} transition-all duration-300`}>2</div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold ${bookingStep === 'confirmation' ? 'bg-orange-500 text-white shadow-orange-500/50 shadow-lg scale-110' : 'bg-white/80 text-gray-500'} transition-all duration-300`}>3</div>
              </div>
            </div>
            
            {/* Textes des étapes */}
            <div className="flex justify-between px-4">
              <div className="w-16 text-center">
                <span className={`text-sm md:text-base text-white font-medium ${bookingStep === 'search' ? 'text-orange-300 font-bold' : 'text-white/90'} transition-colors duration-300`}>Recherche</span>
              </div>
              <div className="w-16 text-center">
                <span className={`text-sm md:text-base text-white font-medium ${bookingStep === 'results' ? 'text-orange-300 font-bold' : 'text-white/90'} transition-colors duration-300`}>Sélection</span>
              </div>
              <div className="w-16 text-center">
                <span className={`text-sm md:text-base text-white font-medium ${bookingStep === 'confirmation' ? 'text-orange-300 font-bold' : 'text-white/90'} transition-colors duration-300`}>Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section principale du contenu */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Overlay de chargement */}
          {isLoading && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center backdrop-blur-md">
              <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-md w-full animate-fadeInUp">
                <div className="w-24 h-24 relative mb-6">
                  <div className="absolute inset-0 border-t-4 border-r-4 border-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-3 border-t-4 border-l-4 border-orange-500 rounded-full animate-spin animation-delay-500"></div>
                  <div className="absolute inset-6 border-b-4 border-r-4 border-blue-400 rounded-full animate-spin animation-delay-700 animate-reverse"></div>
                </div>
                <p className="text-gray-800 font-bold text-lg mb-2">Préparation de votre traversée</p>
                <p className="text-gray-500">Veuillez patienter quelques instants...</p>
                <div className="w-full bg-gray-100 h-2 rounded-full mt-6 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-orange-500 animate-progress"></div>
                </div>
              </div>
            </div>
          )}
          
          <div className="max-w-5xl mx-auto">
            {bookingStep === 'search' && (
              <div className="space-y-16 animated-element opacity-0 transform translate-y-6 transition-all duration-700 delay-400">
                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Votre prochain voyage commence ici</h2>
                  <ReservationCard horizontal={false} onNavigate={handleSearch} />
                </div>
                
                {/* Caractéristiques du service */}
                <div className="my-24">
                  <div className="text-center mb-12">
                    <span className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-4">SERVICES EXCLUSIFS</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 relative inline-block">
                      <span className="relative z-10">Notre Service de Réservation</span>
                      <span className="absolute -bottom-2 left-0 w-full h-3 bg-blue-100 -z-10 transform -rotate-1"></span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg">Nous nous engageons à vous offrir l'expérience de réservation la plus simple et la plus transparente possible.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Élément décoratif */}
                    <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-32 bg-blue-50/70 rounded-full blur-3xl"></div>
                    
                    {bookingFeatures.map((feature, index) => (
                      <div 
                        key={index}
                        className="bg-white rounded-xl shadow-md p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 hover-card group"
                      >
                        <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center bg-feature-${feature.color}-100 text-feature-${feature.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                        <div className="mt-6 pt-4 border-t border-gray-100">
                          <a href="#" className={`inline-flex items-center text-feature-${feature.color}-600 text-sm font-medium`}>
                            En savoir plus
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
                      <span className="inline-block bg-blue-600 text-white text-xs font-bold uppercase px-2 py-1 rounded mb-3">Nouveau</span>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Assistance de réservation personnalisée</h3>
                      <p className="text-gray-600">Besoin d'aide pour planifier votre voyage ? Notre équipe d'experts est disponible 24/7.</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center whitespace-nowrap">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Contactez-nous
                    </button>
                  </div>
                </div>
                
                {/* Section des trajets populaires */}
                <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-900 to-blue-800 relative">
                  {/* Élément décoratif */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
                  
                  <div className="p-8 text-white relative z-10">
                    <h3 className="text-2xl font-bold mb-6 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Trajets Populaires
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {popularRoutes.map((route, index) => (
                        <div 
                          key={index}
                          className="bg-white/10 rounded-lg p-5 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover-card hover:shadow-lg hover:shadow-blue-500/20 border border-white/10"
                          style={{transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease"}}
                        >
                          <div className="text-lg font-semibold mb-3 flex items-center">
                            <span className="text-orange-300">{route.from}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <span>{route.to}</span>
                          </div>
                          <div className="space-y-2 text-sm text-white/80">
                            <p className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {route.duration}
                            </p>
                            <p className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {route.frequency}
                            </p>
                            <p className="flex items-center font-medium text-orange-300 mt-3">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                              </svg>
                              {route.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Images et informations sur l'expérience à bord */}
                <div>
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block">
                      <span className="relative z-10">L'Expérience à Bord</span>
                      <span className="absolute -bottom-2 left-0 w-full h-3 bg-yellow-200 -z-10 transform -rotate-1"></span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">Découvrez le confort et le luxe de nos traversées méditerranéennes.</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group hover-card hover:-translate-y-2 border border-gray-100">
                      <div className="h-60 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1589743048249-a0d656ec1737?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                          alt="Extérieur du navire moderne" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={handleImageError}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                          <span className="bg-orange-500 text-xs font-bold uppercase tracking-wide px-2 py-1 rounded">Excellence maritime</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-3">Navires Modernes</h3>
                        <p className="text-gray-600">Notre flotte de navires modernes vous garantit une traversée confortable et sécurisée en Méditerranée. Des technologies de pointe pour une navigation douce et écologique.</p>
                        <button className="mt-4 text-blue-600 font-medium flex items-center text-sm hover:text-blue-800 transition-colors">
                          En savoir plus
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group hover-card hover:-translate-y-2 border border-gray-100">
                      <div className="h-60 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1566840632859-0b078c57892d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80"
                          alt="Intérieur raffiné du navire" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          onError={handleImageError}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                          <span className="bg-blue-600 text-xs font-bold uppercase tracking-wide px-2 py-1 rounded">Confort premium</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-3">Intérieurs Raffinés</h3>
                        <p className="text-gray-600">Des espaces communs élégants et des cabines confortables pour une traversée agréable. Notre design intérieur allie fonctionnalité et esthétique pour votre bien-être.</p>
                        <button className="mt-4 text-blue-600 font-medium flex items-center text-sm hover:text-blue-800 transition-colors">
                          Explorer les cabines
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 group hover-card hover:-translate-y-2 border border-gray-100">
                      <div className="h-60 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                        <img 
                          src="https://images.unsplash.com/photo-1606046604972-77cc76aee944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                          alt="Restaurant à bord" 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                          <span className="bg-green-600 text-xs font-bold uppercase tracking-wide px-2 py-1 rounded">Gastronomie</span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-3">Gastronomie à Bord</h3>
                        <p className="text-gray-600">Dégustez une cuisine méditerranéenne raffinée dans nos restaurants pendant votre traversée. Nos chefs préparent des menus savoureux avec des produits frais et locaux.</p>
                        <button className="mt-4 text-blue-600 font-medium flex items-center text-sm hover:text-blue-800 transition-colors">
                          Voir les menus
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {bookingStep === 'results' && searchParams && (
              <div className="opacity-100">
                <SearchResults 
                  searchParams={searchParams} 
                  onReset={handleResetSearch} 
                  onBook={handleBooking} 
                />
              </div>
            )}
            
            {bookingStep === 'confirmation' && bookingDetails && (
              <div className="opacity-100">
                <BookingConfirmation 
                  bookingDetails={bookingDetails} 
                  onBackToHome={handleBackToHome} 
                />
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* FAQ Section - Visible uniquement sur la première étape */}
      {bookingStep === 'search' && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mb-4">SUPPORT VOYAGE</span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions Fréquentes</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">Tout ce que vous devez savoir pour préparer votre voyage et profiter pleinement de votre traversée maritime</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-blue-600 hover-card">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Comment modifier ma réservation ?</h3>
                      <p className="text-gray-600">Vous pouvez modifier votre réservation jusqu'à 48h avant le départ en contactant notre service client ou en vous connectant à votre espace personnel sur notre site. Des frais peuvent s'appliquer selon les conditions tarifaires.</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <a href="#" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                      En savoir plus 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-orange-500 hover-card">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Quels documents sont nécessaires ?</h3>
                      <p className="text-gray-600">Pour les traversées internationales, une carte d'identité ou un passeport en cours de validité est requis. Des documents supplémentaires peuvent être nécessaires selon votre nationalité et destination.</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <a href="#" className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center">
                      Vérifier les documents 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-green-500 hover-card">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Puis-je annuler ma réservation ?</h3>
                      <p className="text-gray-600">Oui, vous pouvez annuler votre réservation. Les conditions de remboursement dépendent de la date d'annulation par rapport à la date de départ et du tarif choisi lors de la réservation.</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <a href="#" className="text-green-600 hover:text-green-800 text-sm font-medium flex items-center">
                      Politique d'annulation 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-t-4 border-purple-500 hover-card">
                  <div className="flex items-start mb-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Quels services sont à bord ?</h3>
                      <p className="text-gray-600">Nos navires proposent restaurants, bars, espaces de détente, boutiques, activités enfants, et sur certains trajets, piscines et spectacles. Tout pour une traversée agréable et divertissante.</p>
                    </div>
                  </div>
                  <div className="pl-16">
                    <a href="#" className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center">
                      Découvrir les services 
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 bg-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Vous avez d'autres questions ?</h3>
                  <p className="text-gray-600">Notre équipe d'assistance est disponible 24/7 pour vous aider avec vos questions.</p>
                </div>
                <div className="flex space-x-4">
                  <button 
                    onClick={() => onNavigate('about')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Nous contacter
                  </button>
                  <button 
                    onClick={() => onNavigate('faq')}
                    className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors duration-300"
                  >
                    FAQ complète
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section - Visible uniquement sur la première étape */}
      {bookingStep === 'search' && (
        <section className="py-16 relative overflow-hidden">
          {/* Background with overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
              alt="Ocean view" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/80 mix-blend-multiply"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-8 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 0)' }}></div>
          <div className="absolute bottom-0 right-0 w-full h-8 bg-white" style={{ clipPath: 'polygon(100% 100%, 0 100%, 100% 0)' }}></div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block bg-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full mb-6 uppercase tracking-wide animated-element">Offre limitée</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-white leading-tight animated-element">
                Prêt à embarquer pour votre <span className="text-orange-400">prochaine aventure</span> en Méditerranée ?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10 animated-element">
                Réservez dès maintenant et profitez de nos tarifs avantageux pour vos prochaines traversées. Économisez jusqu'à 25% sur votre réservation anticipée.
              </p>
              <div className="flex flex-wrap justify-center gap-6 animated-element">
                <button 
                  onClick={() => {
                    const searchSection = document.querySelector('.bg-white.rounded-2xl');
                    if (searchSection) {
                      searchSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-orange-500/30 relative overflow-hidden"
                >
                  <span className="relative z-10">Réserver maintenant</span>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-orange-600 to-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </button>
                <button 
                  onClick={() => onNavigate('about')}
                  className="bg-transparent text-white border-2 border-white hover:border-orange-300 hover:text-orange-300 font-bold py-4 px-10 rounded-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Voir nos itinéraires
                </button>
              </div>
              <div className="mt-12 pt-8 border-t border-white/20 flex justify-center space-x-12 animated-element">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">25+</div>
                  <div className="text-sm text-white/80">Destinations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">15+</div>
                  <div className="text-sm text-white/80">Années d'expérience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-sm text-white/80">Clients satisfaits</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Reservations;
