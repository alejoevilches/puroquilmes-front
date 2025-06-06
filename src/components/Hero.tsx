export default function Hero() {
  return (
    <section 
      style={{ backgroundImage: "url('/herobg.jpg')" }}
      className="w-full h-[600px] bg-cover bg-center relative before:content-[''] before:absolute before:inset-0 before:bg-black/50"
    >
      <div className="absolute inset-0 flex items-center">
        <h1 className="text-white text-6xl font-bold pl-10 w-2xl">Veni a conocer Quilmes</h1>
      </div>
    </section>
  )
}