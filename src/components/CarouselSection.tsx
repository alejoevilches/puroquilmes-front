import { useEffect, useRef } from 'react';
import Glide from '@glidejs/glide';
import '@glidejs/glide/dist/css/glide.core.min.css';
import '@glidejs/glide/dist/css/glide.theme.min.css';

interface CarouselItem {
  id: number;
  image: string;
  title: string;
}

interface CarouselSectionProps {
  title: string;
  items: CarouselItem[];
}

export default function CarouselSection({ title, items }: CarouselSectionProps) {
  const glideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (glideRef.current) {
      new Glide(glideRef.current, {
        type: 'carousel',
        perView: 3,
        gap: 20,
        breakpoints: {
          1024: {
            perView: 2
          },
          640: {
            perView: 1
          }
        }
      }).mount();
    }
  }, []);

  return (
    <section className="py-12 px-[50px]">
      <h2 className="text-3xl font-bold mb-8 text-black text-center">{title}</h2>
      <div className="glide" ref={glideRef}>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            {items.map((item) => (
              <li key={item.id} className="glide__slide relative">
                <a href="/local-info" className="block">
                  <div className="relative aspect-video">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute bottom-0 right-0 bg-black/70 text-white px-4 py-2 rounded-tl-lg">
                      {item.title}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="glide__arrows" data-glide-el="controls">
          <button className="glide__arrow glide__arrow--left !bg-white !text-gray-500 p-3 rounded-full shadow-lg hover:bg-gray-100" data-glide-dir="<">
            ←
          </button>
          <button className="glide__arrow glide__arrow--right !bg-white !text-gray-500 p-3 rounded-full shadow-lg hover:bg-gray-100" data-glide-dir=">">
            →
          </button>
        </div>
      </div>
    </section>
  );
} 