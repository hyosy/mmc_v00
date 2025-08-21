import React, { useState, useEffect, useRef } from 'react';
import { handleImageError } from '../assets/images/index';

const ImageCarousel = ({ images, interval = 5000, overlay = true, children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef(null);

  // Effet pour le défilement automatique du carrousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, interval);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, interval]);

  const nextSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      setIsTransitioning(false);
    }, 2500); // Transition très longue pour un effet plus doux et "chill"
  };
  
  const prevSlide = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
      setIsTransitioning(false);
    }, 2500);
  };
  
  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 2500);
  };

  return (
    <div ref={carouselRef} className="relative w-full h-full overflow-hidden">
      {/* Images du carrousel avec transition ultra-douce */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[4000ms] ${
            index === currentIndex 
              ? 'opacity-100 z-10 transform scale-100' 
              : 'opacity-0 z-0 transform scale-105'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
          }}
        >
          <img
            src={image.src}
            alt={image.alt || "Vue de la Méditerranée"}
            className="object-cover w-full h-full transform transition-transform duration-[8000ms]"
            onError={handleImageError}
            loading={index === 0 ? "eager" : "lazy"}
            style={{ transitionTimingFunction: 'ease-in-out' }}
          />
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-600/50 z-20"></div>
          )}
        </div>
      ))}

      {/* Conteneur pour le contenu enfant (texte, etc.) qui sera affiché par dessus les images */}
      {children && (
        <div className="absolute top-0 left-0 w-full h-full z-30 pt-12 px-4 sm:px-6 md:px-8 lg:px-12">
          {children}
        </div>
      )}

      {/* Les flèches de navigation ont été supprimées pour laisser place à la transition automatique */}

      {/* Indicateurs (points de navigation) */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-40">
        <div className="flex space-x-3">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/40'
              }`}
              aria-label={`Image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
