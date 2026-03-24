export function ClientLogos() {
  const brands = [
    {
      type: 'svg', name: 'McDonalds Style', content: (
        <svg viewBox="0 0 100 80" className="h-full w-auto">
          <path d="M10 80V20C10 10 20 0 30 0C40 0 45 10 50 20C55 10 60 0 70 0C80 0 90 10 90 20V80H75V25C75 20 70 15 70 20V80H55V25C55 20 50 15 50 20V80H45V25C45 20 40 15 40 20V80H25V25C25 20 30 15 30 20V80H10Z" fill="#FFC72C"></path>
        </svg>
      ), className: "h-16 w-32"
    },
    {
      type: 'svg', name: 'Blue Logo', content: (
        <svg viewBox="0 0 100 100" className="h-full w-auto">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#1E3A8A" strokeWidth="4"></circle>
          <path d="M25 35L50 70L75 35M35 35L50 60L65 35" fill="none" stroke="#1E3A8A" strokeWidth="4"></path>
        </svg>
      ), className: "h-16 w-16"
    },
    { type: 'text', name: 'Red Bull', content: 'Red Bull', style: { color: "#CC0000" }, className: "text-2xl font-black h-12 w-28" },
    { type: 'kfc', name: 'KFC', className: "h-16 w-16" },
    { type: 'text', name: 'amazon', content: 'amazon', className: "text-3xl font-bold h-10 w-28 text-black" },
    { type: 'mall', name: 'Dubai Mall', className: "h-12 w-32" },
    { type: 'flag', name: 'Flag Logo', className: "h-14 w-14" },
    {
      type: 'svg', name: 'Path Logo', content: (
        <svg viewBox="0 0 100 40" className="h-8 w-auto">
          <path d="M10 30C20 30 80 10 95 5C80 15 30 35 10 30Z" fill="#000"></path>
        </svg>
      ), className: "h-10 w-20"
    },
    { type: 'image', name: 'DHL', src: '/logos/dhl-seeklogo.png', className: "h-8 w-24" },
    { type: 'image', name: 'Jetour', src: '/logos/jetour-seeklogo.svg', className: "h-10 w-28" },
    { type: 'image', name: 'Soueast', src: '/logos/soueast-seeklogo.png', className: "h-10 w-28" },
    { type: 'image', name: 'Zara', src: '/logos/zara-seeklogo.svg', className: "h-10 w-20" },
    { type: 'image', name: 'Royal Catering', src: '/logos/img52-removebg-preview.png', className: "h-14 w-32" },
  ]

  const LogoItem = ({ brand }: { brand: any }) => (
    <div className={`flex-shrink-0 flex items-center justify-center hover:scale-110 transition-transform duration-300 ${brand.className}`}>
      {brand.type === 'svg' && brand.content}
      {brand.type === 'text' && <span className={brand.className} style={brand.style}>{brand.content}</span>}
      {brand.type === 'kfc' && (
        <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center">
          <span className="text-white font-black text-xs">KFC</span>
        </div>
      )}
      {brand.type === 'mall' && (
        <div className="text-center">
          <span className="text-[8px] tracking-[0.3em] text-gray-600 block">THE</span>
          <span className="text-lg font-bold tracking-wider text-black">DUBAI MALL</span>
        </div>
      )}
      {brand.type === 'flag' && (
        <div className="w-12 h-12 rounded-full overflow-hidden relative">
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-red-500"></div>
          <div className="absolute top-1/3 left-0 right-0 h-1/3 bg-white"></div>
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-blue-500"></div>
        </div>
      )}
      {brand.type === 'image' && (
        <img src={brand.src} alt={brand.name} className="h-full w-auto object-contain" />
      )}
    </div>
  )

  return (
    <section className="py-20 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-center text-sm font-black tracking-[0.3em] text-gray-400 uppercase">Trusted By Global Brands</h2>
      </div>

      <div className="relative">
        <div className="flex animate-scroll-left" style={{ width: "200%" }}>
          <div className="flex items-center justify-around min-w-[100%] gap-16 px-8">
            {brands.map((brand, i) => <LogoItem key={i} brand={brand} />)}
          </div>

          <div className="flex items-center justify-around min-w-[100%] gap-16 px-8" aria-hidden="true">
            {brands.map((brand, i) => <LogoItem key={`dup-${i}`} brand={brand} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
