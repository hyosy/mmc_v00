import React from 'react';

const About = () => {

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">À Propos de MMC Maritime</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Découvrez notre histoire, nos valeurs et notre engagement à offrir des traversées maritimes exceptionnelles en Méditerranée.
          </p>
        </div>
        
        {/* Company Overview */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold text-blue-600 mb-4">Notre Histoire</h2>
            <p className="text-gray-600 mb-4">
              Fondée en 2005, MMC Maritime est née de la vision d'offrir des liaisons maritimes fiables et confortables entre les rives de la Méditerranée. Notre entreprise a débuté avec une seule ligne reliant Marseille à Alger, et s'est progressivement développée pour inclure Alicante, créant ainsi un triangle maritime stratégique.
            </p>
            <p className="text-gray-600">
              Avec près de 20 ans d'expérience, nous avons transporté des millions de passagers en toute sécurité, faisant de MMC Maritime un nom synonyme de qualité et de fiabilité dans le secteur du transport maritime méditerranéen.
            </p>
          </div>
          <div className="bg-blue-600 h-72 rounded-lg overflow-hidden shadow-lg">
            {/* Placeholder for an image */}
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-white opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Mission & Vision */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-mmc-lightblue bg-opacity-20 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-mmc-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Notre Mission</h3>
              <p className="text-gray-600">
                La mission de MMC Maritime est de connecter les cultures et les personnes à travers la Méditerranée en offrant des services de traversée maritime sûrs, fiables et confortables. Nous nous engageons à fournir une expérience de voyage exceptionnelle tout en respectant l'environnement marin que nous traversons.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="bg-mmc-lightblue bg-opacity-20 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-mmc-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Notre Vision</h3>
              <p className="text-gray-600">
                Notre vision est de devenir le leader incontesté du transport maritime de passagers en Méditerranée occidentale, en innovant constamment pour améliorer l'expérience de voyage. Nous aspirons à créer un réseau maritime qui unit les peuples et favorise les échanges culturels et économiques entre la France, l'Algérie et l'Espagne.
              </p>
            </div>
          </div>
        </div>
        
        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-blue-600 mb-8 text-center">Nos Valeurs</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-mmc-accent bg-opacity-20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mmc-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Sécurité</h3>
              <p className="text-gray-600">
                La sécurité est notre priorité absolue. Tous nos navires respectent les normes internationales les plus strictes, et nos équipages sont formés aux meilleures pratiques de sécurité maritime.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-mmc-accent bg-opacity-20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mmc-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Fiabilité</h3>
              <p className="text-gray-600">
                Nous comprenons l'importance de la ponctualité et de la régularité pour nos passagers. Nous nous efforçons de maintenir nos horaires quelles que soient les conditions, sauf si la sécurité est compromise.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-mmc-accent bg-opacity-20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mmc-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">
                Nous visons l'excellence dans tous nos services, du confort à bord à la qualité de notre service client, en passant par l'efficacité de nos procédures d'embarquement et de débarquement.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-mmc-accent bg-opacity-20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mmc-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Respect</h3>
              <p className="text-gray-600">
                Nous respectons nos clients, nos employés et l'environnement. Notre objectif est de créer une culture d'entreprise basée sur le respect mutuel et la valorisation de la diversité.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-mmc-accent bg-opacity-20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mmc-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hospitalité</h3>
              <p className="text-gray-600">
                Nous nous engageons à offrir une hospitalité chaleureuse et attentionnée à tous nos passagers, en faisant de chaque traversée une expérience agréable et mémorable.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-mmc-accent bg-opacity-20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-mmc-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Durabilité</h3>
              <p className="text-gray-600">
                Nous sommes engagés dans la protection de l'environnement marin et la réduction de notre empreinte écologique grâce à des technologies et des pratiques durables.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-16 text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-8">Notre Équipe de Direction</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Mock team members */}
            {['Directeur Général', 'Directeur des Opérations', 'Directrice Commerciale', 'Directeur Technique'].map((title, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-gray-200 h-48"></div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900">Nom Prénom</h3>
                  <p className="text-gray-600">{title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Prêt à naviguer avec MMC Maritime ?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Découvrez nos destinations et réservez votre prochain voyage pour une expérience maritime inoubliable.
          </p>
          <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-colors">
            Réserver maintenant
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
