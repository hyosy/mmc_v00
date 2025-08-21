import React, { useState, useEffect, useRef } from 'react';

const Testimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  
  // Effet pour assurer que les témoignages sont visibles
  useEffect(() => {
    if (containerRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            containerRef.current.style.height = `${containerRef.current.scrollHeight}px`;
          }
        },
        { threshold: 0.1 }
      );
      
      observer.observe(containerRef.current);
      
      return () => {
        if (containerRef.current) observer.unobserve(containerRef.current);
      };
    }
  }, [testimonials]);

  // Changement automatique des témoignages
  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 8000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const goToTestimonial = (index) => {
    if (isAnimating || index === currentIndex) return;
    
    setIsAnimating(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Assurer une hauteur minimale pour éviter les sauts de contenu
  useEffect(() => {
    if (containerRef.current) {
      let maxHeight = 0;
      const testimonialElements = containerRef.current.querySelectorAll('.testimonial-item');
      
      testimonialElements.forEach((element) => {
        const height = element.scrollHeight;
        if (height > maxHeight) maxHeight = height;
      });
      
      if (maxHeight > 0) {
        containerRef.current.style.minHeight = `${maxHeight + 40}px`;
      }
    }
  }, [testimonials]);

  return (
    <div className="relative" style={{ minHeight: "400px" }}>
      {/* Testimonials */}
      <div ref={containerRef} className="relative w-full max-w-4xl mx-auto overflow-hidden" style={{ minHeight: "350px" }}>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`testimonial-item px-8 text-center transition-all duration-500 ease-in-out absolute w-full ${
              index === currentIndex
                ? 'opacity-100 translate-x-0 z-10'
                : index < currentIndex
                ? 'opacity-0 -translate-x-full z-0'
                : 'opacity-0 translate-x-full z-0'
            }`}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              visibility: Math.abs(index - currentIndex) <= 1 ? 'visible' : 'hidden'
            }}
          >
            <div className="mb-8">
              <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-md">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name} - Client MMC`}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80";
                  }}
                />
              </div>
              <div className="flex justify-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.stars ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className="relative">
              <svg className="absolute -top-6 -left-6 h-16 w-16 text-blue-300 opacity-30" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
              <p className="relative text-lg md:text-xl text-gray-700 mb-8">
                {testimonial.text}
              </p>
              <svg className="absolute -bottom-6 -right-6 h-16 w-16 text-blue-300 opacity-30 transform rotate-180" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
              <p className="text-sm text-gray-600">{testimonial.role}</p>
              {testimonial.trip && (
                <p className="text-xs text-blue-700 mt-1">
                  Traversée {testimonial.trip}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-12 px-4">
        <button
          onClick={prevTestimonial}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 z-20"
          aria-label="Témoignage précédent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="flex space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none ${
                index === currentIndex ? 'bg-blue-600 scale-125 ring-2 ring-blue-300 ring-offset-2' : 'bg-blue-200 hover:bg-blue-400'
              }`}
              aria-label={`Témoignage ${index + 1}`}
              aria-current={index === currentIndex ? "true" : "false"}
            />
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 z-20"
          aria-label="Témoignage suivant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
