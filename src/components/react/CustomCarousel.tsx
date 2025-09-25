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

  return (
    <Carousel
      responsive={responsive}
      infinite
      autoPlay
      autoPlaySpeed={5000}
      keyBoardControl
      customTransition="transform 500ms ease-in-out"
      transitionDuration={500}
      removeArrowOnDeviceType={["tablet", "mobile"]}
      containerClass="carousel-container py-4"
      itemClass="px-2"
    >
      {items.filter(item => item.principal === false).map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
        >
          <img
            src={item.image}
            alt={item.title}
            className="h-65 w-full object-cover"
            loading="lazy"
          />
          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-gray-600 font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-gray-600 text-sm flex-grow">{item.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {item.front && <span className="px-2 py-1 text-xs bg-accent/80 text-black rounded">{item.front}</span>}
              {item.front2 && <span className="px-2 py-1 text-xs bg-red-950 rounded">{item.front2}</span>}
              {item.back && <span className="px-2 py-1 text-xs bg-red-950 rounded">{item.back}</span>}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default CustomCarousel;