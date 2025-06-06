import { Link } from "react-router-dom"

interface BusCard {
  id: number;
  image: string;
  title: string;
}

export default function BusSection() {
  const busCards: BusCard[] = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000",
      title: "Paseo 1"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1000",
      title: "Paseo 2"
    }
  ];

  return (
    <section className="py-12 px-4 md:px-[50px] bg-[#FFF8E7]">
      <h2 className="text-3xl font-bold mb-8 text-black !text-4xl text-center">
        Elegí tu destino turístico
      </h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {busCards.map((card) => (
          <Link 
            key={card.id} 
            to="/bus-reservation"
            className="w-full md:w-[400px] bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="aspect-video">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
} 