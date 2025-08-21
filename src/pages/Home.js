import React, { useState, useEffect } from 'react';
import ReservationCard from '../components/ReservationCard';
import ImageCarousel from '../components/ImageCarousel';
import PopularDestinations from '../components/PopularDestinations';
import Testimonials from '../components/Testimonials';
import { heroImage, handleImageError, marseilleImage, algerImage, alicanteImage, shipExterior, shipInterior, shipDeck, oceanAerial } from '../assets/images/index';

const Home = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Images du carrousel pour la section héro - en utilisant celles du dossier assets/images
  const heroImages = [
    {
      src: heroImage, // belle-plage-tropicale-avec-rochers.jpg
      alt: "Plage méditerranéenne"
    },
    {
      src: require('../assets/images/horizon-urbain-et-batiments-modernes.jpg'),
      alt: "Horizon urbain méditerranéen"
    },
    {
      src: require('../assets/images/seatran-ferry-transportant-des-passagers-de-l-embarcadere-de-donsak-surat.jpg'),
      alt: "Ferry MMC en mer"
    }
  ];

  // Destinations populaires
  const popularDestinations = [
    {
      name: "Marseille",
      description: "La plus grande ville portuaire de France offre un mélange unique de culture française et méditerranéenne.",
      image: marseilleImage,
      rating: "4.7/5",
      travelTime: "10-14h",
      startingPrice: 89
    },
    {
      name: "Alger",
      description: "La capitale algérienne vous éblouira avec son architecture coloniale, sa Casbah et sa baie spectaculaire.",
      image: algerImage,
      rating: "4.5/5",
      travelTime: "11-15h",
      startingPrice: 95
    },
    {
      name: "Alicante",
      description: "Cette ville espagnole de la Costa Blanca vous séduira par ses plages de sable fin et son climat idéal.",
      image: alicanteImage,
      rating: "4.8/5",
      travelTime: "8-12h",
      startingPrice: 79
    }
  ];

  // Témoignages clients
  const testimonials = [
    {
      name: "Sophie Martin",
      role: "Voyageuse régulière",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      stars: 5,
      trip: "Marseille - Alger",
      text: "J'ai voyagé plusieurs fois avec MMC et je suis toujours impressionnée par la qualité du service et le confort des navires. Le personnel est attentionné et professionnel. Je recommande vivement !"
    },
    {
      name: "Ahmed Benali",
      role: "Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      stars: 4,
      trip: "Alger - Marseille",
      text: "Excellente traversée avec MMC. Les espaces sont propres, les repas de qualité et l'embarquement bien organisé. J'apprécie particulièrement la ponctualité des départs et arrivées."
    },
    {
      name: "Marie Dupont",
      role: "Famille de 4 personnes",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      stars: 5,
      trip: "Marseille - Alicante",
      text: "Voyager avec des enfants peut être stressant, mais MMC a rendu notre expérience très agréable. Les animations pour enfants et les espaces familiaux sont parfaitement adaptés. Nous reviendrons !"
    }
  ];

  // Mock features for "Why Choose MMC" section
  const features = [
    {
      title: "Confort Exceptionnel",
      description: "Nos navires sont équipés des dernières commodités pour vous offrir une traversée agréable et relaxante.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
    {
      title: "Sécurité Optimale",
      description: "Votre sécurité est notre priorité absolue. Nos équipages sont formés aux meilleures pratiques de sécurité maritime.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    {
      title: "Destinations Prisées",
      description: "MMC dessert les plus belles destinations de la Méditerranée, reliant la France à l'Algérie et l'Espagne.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: "Service Clientèle Premium",
      description: "Notre équipe dévouée est disponible 24/7 pour répondre à toutes vos questions et assurer votre satisfaction.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      )
    }
  ];

  return (
    <div className={`transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {/* Hero Section avec Carousel et Reservation Card centrée */}
      <section className="relative h-screen overflow-hidden flex flex-col items-center staggered-item pt-16">
        {/* Fond avec carrousel */}
        <div className="absolute inset-0">
          <ImageCarousel images={heroImages} interval={8000}>
            {/* Titre principal fixe en haut avec texte équilibré et lisible */}
            <div className="container mx-auto px-4 pt-6 sm:pt-10 md:pt-14 lg:pt-16 xl:pt-20 2xl:pt-24 relative z-20">
              <div className="text-center">
                <div className="mb-2 md:mb-3 animate-fadeIn">
                  <span className="inline-block bg-blue-600/80 text-white text-xs sm:text-sm md:text-base px-3 py-1 rounded-full backdrop-blur-sm font-medium tracking-wider">COMPAGNIE MARITIME MÉDITERRANÉENNE</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-white mb-3 md:mb-4 drop-shadow-lg animate-fadeIn text-shadow-lg whitespace-nowrap">
                  Voyagez en <span className="text-orange-400">Méditerranée</span> avec MMC
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-white max-w-md sm:max-w-xl lg:max-w-2xl mx-auto drop-shadow-md animate-fadeIn animation-delay-200 font-light mb-2 md:mb-3">
                  <span className="bg-blue-800/50 px-3 py-1 md:px-4 md:py-2 rounded-lg backdrop-blur-sm inline-block">
                    Une expérience maritime d'exception reliant France, Algérie et Espagne
                  </span>
                </p>
                <div className="animate-fadeIn animation-delay-300 mt-2 md:mt-3">
                  <span className="bg-blue-600/30 rounded-full px-2 py-1 backdrop-blur-sm inline-flex items-center text-white/95 text-xs sm:text-sm font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Plus de 500 000 passagers satisfaits chaque année
                  </span>
                </div>
              </div>
            </div>
          </ImageCarousel>
        </div>
        
        {/* Carte de réservation repositionnée avec proportions adaptées - centrée verticalement sur très grands écrans (>1500px) */}
        <div className="absolute top-[32%] sm:top-[37%] md:top-[42%] lg:top-[47%] xl:top-[52%] left-0 right-0 container mx-auto px-4 z-30">
          <div className="flex flex-col items-center">            
            <div className="w-full max-w-3xl md:max-w-4xl glass-effect p-1.5 rounded-xl shadow-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <ReservationCard 
                horizontal={true} 
                onNavigate={(searchParams) => {
                  // Rediriger vers la page de réservations avec les paramètres de recherche
                  onNavigate('reservations');
                  // On stocke les paramètres de recherche dans localStorage pour les récupérer sur la page de réservation
                  localStorage.setItem('searchParams', JSON.stringify(searchParams));
                }} 
              />
            </div>
          </div>
        </div>
        
        {/* Script pour centrer verticalement la carte sur grands écrans (>1500px) */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              function adjustCardPosition() {
                if (window.innerWidth >= 1500) {
                  const cardContainer = document.querySelector('.container');
                  if (cardContainer) {
                    cardContainer.style.top = '50%';
                    cardContainer.style.transform = 'translateY(-50%)';
                  }
                }
              }
              
              window.addEventListener('resize', adjustCardPosition);
              adjustCardPosition();
            });
          `
        }} />
      </section>      {/* Popular Destinations Section */}
      <section className="py-20 bg-white staggered-item">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-orange-100 text-orange-600 text-sm font-medium px-3 py-1 rounded-full mb-3 fade-in-up">DESTINATIONS PRIVILÉGIÉES</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 fade-in-up animation-delay-200">Explorez Nos Destinations Phares</h2>
            <div className="h-1 w-24 bg-orange-500 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto fade-in-up animation-delay-400">
              Découvrez nos traversées emblématiques et embarquez pour une aventure méditerranéenne inoubliable
            </p>
          </div>
          
          <PopularDestinations 
            destinations={popularDestinations} 
            onNavigate={onNavigate}
          />
          
          <div className="text-center mt-12">
            <button 
              onClick={() => onNavigate('destinations')}
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center mx-auto"
            >
              <span>Voir toutes nos destinations</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100 staggered-item">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-3 fade-in-up">AVIS CLIENTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 fade-in-up animation-delay-200">L'Excellence Reconnue par Nos Passagers</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto fade-in-up animation-delay-400">
              Des milliers de voyageurs nous accordent leur confiance chaque année pour vivre une expérience maritime mémorable
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Testimonials testimonials={testimonials} />
          </div>
        </div>
      </section>
      
      {/* Why Choose MMC Section */}
      <section className="py-20 bg-gray-50 staggered-item">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full mb-3 fade-in-up">NOS ENGAGEMENTS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 fade-in-up animation-delay-200">L'Excellence Maritime à Votre Service</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto fade-in-up animation-delay-400">
              Nous nous engageons à transformer chaque traversée en une expérience exceptionnelle, alliant confort premium et service attentionné
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 animate-staggered-fade-in">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-t-4 border-blue-600"
              >
                <div className="text-blue-600 mb-5 bg-blue-100 p-3 rounded-full inline-block animate-pulse-grow">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Ship Experience Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-600 text-sm font-medium px-3 py-1 rounded-full mb-3">EXPÉRIENCE PREMIUM</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Un Voyage Au-Delà de Vos Attentes</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transformez votre traversée en une expérience inoubliable grâce à nos installations raffinées et nos services personnalisés
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-orange-500 rounded-full opacity-20 animate-pulse-grow"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-float"></div>
              
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="transform translate-y-8">
                  <img 
                    src="https://images.unsplash.com/photo-1610641818989-5b33e929a89a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                    alt="Restaurant de luxe sur un navire de croisière" 
                    className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                </div>
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1606046604972-77cc76aee944?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
                    alt="Cabine premium avec vue sur la mer" 
                    className="rounded-lg shadow-lg mb-4 hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1544473244-f6895e69ad8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80" 
                    alt="Pont panoramique avec vue sur la mer" 
                    className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
                    onError={handleImageError}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-blue-600">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Cabines luxueuses</h3>
                    <p className="text-gray-600">Des cabines spacieuses et confortables pour tous les budgets, équipées d'installations modernes pour une traversée reposante.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-orange-500">
                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Gastronomie raffinée</h3>
                    <p className="text-gray-600">Plusieurs restaurants à bord proposant des menus variés inspirés de la cuisine méditerranéenne préparés par nos chefs.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-green-500">
                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Divertissements pour tous</h3>
                    <p className="text-gray-600">Cinéma, spectacles live, piscines, espaces enfants... Des activités pour tous les âges pendant toute la traversée.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white relative overflow-hidden staggered-item">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-repeat" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <span className="inline-block bg-white/20 text-white text-sm font-medium px-3 py-1 rounded-full mb-3 backdrop-blur-sm">VOTRE AVENTURE COMMENCE ICI</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fadeInUp text-shadow-lg">Embarquez pour l'Aventure Méditerranéenne</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
            Réservez dès maintenant et laissez MMC transformer votre traversée en une expérience maritime d'exception.
          </p>
          <div className="flex flex-wrap justify-center gap-6 animate-fadeInUp animation-delay-400">
            <button 
              onClick={() => onNavigate('destinations')}
              className="bg-white text-blue-600 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1 font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Voir nos destinations
            </button>
            <button 
              onClick={() => onNavigate('reservations')}
              className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-600 hover:to-orange-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 shadow hover:shadow-lg hover:-translate-y-1 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
              Réserver maintenant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
