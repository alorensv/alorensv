import React, { useEffect, useState } from "react";
import "react-multi-carousel/lib/styles.css";

type Item = {
  title: string;
  description: string;
  image: string;
  front?: string;
  front2?: string;
  back?: string;
  type?: string;
  principal?: boolean;
};

interface Props {
  items: Item[];
}

const CustomCarousel: React.FC<Props> = ({ items }) => {
  const [Carousel, setCarousel] = useState<any>(null);

  // Cargamos react-multi-carousel dinámicamente solo en el cliente
  useEffect(() => {
    import("react-multi-carousel").then((mod) => setCarousel(() => mod.default));
  }, []);

  if (!Carousel) return null; // Evita render en SSR

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 1024, min: 640 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 640, min: 0 }, items: 1, slidesToSlide: 1 },
  };

  // Revertimos el orden para que los últimos sean los primeros (más recientes)
  const displayItems = [...items].reverse().filter(item => !item.principal);

  return (
    <div className="px-4 md:px-12 py-12 bg-[#0a0a0a]">
      <div className="mb-10 flex items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Otros Proyectos</h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-white/10 to-transparent"></div>
      </div>
      
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={5000}
        keyBoardControl
        customTransition="transform 600ms cubic-bezier(0.4, 0, 0.2, 1)"
        transitionDuration={600}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        containerClass="carousel-container overflow-visible"
        itemClass="px-3"
      >
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="group relative bg-[#141414] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-red-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] flex flex-col h-full"
          >
            {/* Image Container with Zoom effect */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow space-y-4">
              <div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-red-400 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {item.front && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-red-500/5 border border-red-500/20 text-red-400 rounded-md">
                    {item.front}
                  </span>
                )}
                {item.front2 && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-gray-400 rounded-md">
                    {item.front2}
                  </span>
                )}
                {item.back && (
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-blue-500/5 border border-blue-500/20 text-blue-400 rounded-md">
                    {item.back}
                  </span>
                )}
              </div>
            </div>
            
            {/* Subtle Overlay Glow on Hover */}
            <div className="absolute inset-0 pointer-events-none border-2 border-red-500/0 rounded-2xl group-hover:border-red-500/5 transition-all duration-500"></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CustomCarousel;