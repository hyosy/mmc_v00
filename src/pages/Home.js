import React, { useState, useEffect } from 'react';
import ReservationCard from '../components/ReservationCard';
import { heroImage, handleImageError } from '../assets/images/index';

const Home = ({ onNavigate }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <div className={`pt-16 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section avec Reservation Card centrée */}
      <section className="relative h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Vue sur la Mer Méditerranée" 
            className="object-cover w-full h-full"
            onError={handleImageError}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-600/40"></div>
        </div>
        
        <div className="container mx-auto px-4 z-10">
          <div className="flex flex-col items-center">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fadeIn">
                Traversez la Méditerranée avec MMC
              </h1>
              <p className="text-xl text-white max-w-xl drop-shadow-md animate-fadeIn animation-delay-200">
                Voyagez confortablement entre la France, l'Algérie et l'Espagne
              </p>
            </div>
            
            <div className="w-full max-w-4xl animate-fadeInUp animation-delay-400 transform translate-y-8">
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
      </section>
      
      {/* Why Choose MMC Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir MMC ?</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nous nous engageons à vous offrir une expérience maritime exceptionnelle avec un service inégalé
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
      
      {/* Call to Action Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 animate-fadeInUp">Prêt à prendre la mer ?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto animate-fadeInUp animation-delay-200">
            Découvrez nos destinations et réservez votre prochain voyage pour une expérience maritime inoubliable.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fadeInUp animation-delay-400">
            <button 
              onClick={() => onNavigate('destinations')}
              className="bg-white text-blue-600 hover:bg-gray-100 hover:shadow-lg hover:-translate-y-1 font-bold py-3 px-8 rounded-md transition-all duration-300"
            >
              Voir nos destinations
            </button>
            <button 
              onClick={() => onNavigate('reservations')}
              className="bg-orange-500 hover:bg-orange-600 hover:shadow-lg hover:-translate-y-1 text-white font-bold py-3 px-8 rounded-md transition-all duration-300"
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
