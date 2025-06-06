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
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
    title: "Bar Central"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000",
    title: "La Esquina"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
    title: "El Rincón"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1000",
    title: "Pub Local"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000",
    title: "Cervecería"
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