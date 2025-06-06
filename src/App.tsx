import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import "./index.css"
import CarouselSection from "./components/CarouselSection"
import BusSection from "./components/BusSection"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import LocalInfo from "./pages/LocalInfo"
import BusReservation from "./pages/BusReservation"
import SearchResults from "./pages/SearchResults"

const mockedItems = [
  {
    id: 1,
    image: "https://www.cerveceriaymalteriaquilmes.com/wp-content/uploads/2018/11/Jardin_de_la_Cerveceria_Quilmes_3.jpg",
    title: "Parque de la Cerveceria"
  },
  {
    id: 2,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/d2/d9/e9/ta-img-20160903-221542.jpg?w=900&h=500&s=1",
    title: "La Casa de Manu"
  },
  {
    id: 3,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/21/67/e9/9e/deck.jpg?w=500&h=-1&s=1",
    title: "Los Blancos"
  },
  {
    id: 4,
    image: "https://buenosairesushi.com/assets/img/salon4.jpg",
    title: "Buenos Aires Sushi"
  },
  {
    id: 5,
    image: "https://www.periodiconuevaepoca.com.ar/wp/wp-content/uploads/2023/09/1687448013455.jpg",
    title: "Burger Taster"
  }
];

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CarouselSection 
        title="Lugares Destacados" 
        items={mockedItems}
        onItemClick={() => window.location.href = '/local-info'}
      />
      <BusSection />
    </>
  );
}

export default function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/local-info" element={<LocalInfo />} />
        <Route path="/bus-reservation" element={<BusReservation />} />
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </Router>
  )
}