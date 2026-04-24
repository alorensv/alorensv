import React, { useState, useEffect } from 'react';
import ModalCustom from './ModalCustom';

interface Project {
  featured?: boolean;
  principal?: boolean;
  type?: string;
  image?: string;
  imageM?: string;
  title?: string;
  description?: string;
  front?: string;
  front2?: string;
  back?: string;
  link?: string;
}

interface HeroSliderProps {
  projects: Project[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (projects.length <= 1) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [currentIndex, projects.length]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      setIsTransitioning(false);
    }, 500);
  };

  if (!projects.length) return null;

  const currentProject = projects[currentIndex];

  return (
    <div className="relative min-h-[100vh] flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Fondos y Gradientes Decorativos */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]"></div>
      </div>

      <div className={`relative z-10 container mx-auto px-6 md:px-12 py-20 flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {/* Lado Izquierdo: Información --> */}
        <div className="w-full md:w-1/2 space-y-8">
          <div className="space-y-4">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-widest text-red-500 uppercase bg-red-500/10 border border-red-500/20 rounded-full">
              Proyecto Destacado
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              {currentProject.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
              {currentProject.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <ModalCustom project={currentProject}>
              <button 
                className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(220,38,38,0.4)] overflow-hidden"
                type="button"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Ver Detalles</span>
              </button>
            </ModalCustom>
            
            {currentProject.link && (
              <a href={currentProject.link} target="_blank" rel="noopener noreferrer" className="group">
                <button 
                  className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Visitar Sitio
                </button>
              </a>
            )}
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[1px] bg-gray-700"></div>
              <span className="text-sm font-medium text-gray-500 uppercase tracking-widest">Tecnologías</span>
            </div>
            <div className="flex gap-3">
              {currentProject.front && (
                <span className="px-3 py-1 text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 rounded-md uppercase tracking-wider">{currentProject.front}</span>
              )}
              {currentProject.back && (
                <span className="px-3 py-1 text-xs font-semibold text-gray-400 bg-gray-400/10 border border-gray-400/20 rounded-md uppercase tracking-wider">{currentProject.back}</span>
              )}
            </div>
          </div>
        </div>

        {/* Lado Derecho: Imagen Mockup */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute inset-0 bg-red-600/20 blur-[100px] rounded-full group-hover:bg-red-600/30 transition-colors duration-700"></div>
          <div className="relative animate-float">
            <img 
              src={currentProject.image}
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl border border-white/5 transition-transform duration-500 group-hover:scale-[1.02]"
              alt={currentProject.title}
              loading="eager"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Navigation arrows (only if more than 1 project) */}
      {projects.length > 1 && (
        <div className="absolute bottom-10 right-12 z-30 flex gap-4">
          <button 
            onClick={handlePrev}
            className="p-4 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={handleNext}
            className="p-4 border border-white/10 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Slide indicators (dots) */}
      {projects.length > 1 && (
        <div className="absolute bottom-10 left-12 z-30 flex gap-2">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIndex(idx);
                  setIsTransitioning(false);
                }, 500);
              }}
              className={`h-1 transition-all duration-300 rounded-full ${idx === currentIndex ? 'w-12 bg-red-600' : 'w-4 bg-white/20'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(1deg); }
        }
        .animate-float {
          animation: float 6s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default HeroSlider;
