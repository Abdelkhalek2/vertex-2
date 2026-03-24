"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "01",
    label: "Influencer Marketing",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&q=80"
  },
  {
    id: "02",
    label: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80"
  },
  {
    id: "03",
    label: "Event Coordination",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80"
  },
  {
    id: "04",
    label: "Branding and Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80"
  },
  {
    id: "05",
    label: "Ad Campaigns",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
  },
  {
    id: "06",
    label: "SMS & WhatsApp",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80"
  },
];

// ─── Brand mark SVG ───────────────────────────────────────────────────────────
function BrandMark() {
  return (
    <svg width="68" height="62" viewBox="0 0 395.813 360.8024" aria-hidden="true">
      <path
        transform="matrix(1,0,-0,1,172.59455,128)"
        d="M95.21843 0 55.4012 77.3118 46.06789 95.43175C44.553228 98.37308 42.154565 100.80374 39.151906 102.19574L39.09857 102.22107C38.199907 102.635738 37.278577 103.00907 36.333246 103.327739 33.506586 104.28107 30.482596 104.80239 27.334605 104.80239 20.917286 104.80239 15.001297 102.64907 10.275975 99.03041 9.487977 98.426418 8.727984 97.781078 8.007986 97.09441 4.117329 93.39709 1.27733 88.598438 0 83.19045 1.378663 83.18512 2.734661 83.07045 4.053325 82.85312 9.003979 82.055789 13.47597 79.82513 17.03996 76.60647 18.362626 75.41314 19.55729 74.08114 20.603953 72.637149L24.130606 65.7865 24.13461 65.77716 32.690587 49.16254 35.627916 43.463888C36.881246 40.59722 38.310575 37.821237 39.906568 35.16124 51.467874 15.858627 71.69716 2.346657 95.21843 0Z"
        fill="#3df1f6"
      />
      <path
        transform="matrix(1,0,-0,1,128,129.90665)"
        d="M24.673272 49.029214C32.70392 47.37855 39.314569 41.842565 42.45456 34.46125 43.70389 31.515923 44.405225 28.274598 44.418558 24.877272 44.469224 11.193306 32.89725 0 19.214619 0H0L24.673272 49.029214Z"
        fill="#3df1f6"
      />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for reaction
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transforms for Tilt & Movement
  const rotateX = useTransform(smoothY, [-300, 300], [15, -15]);
  const rotateY = useTransform(smoothX, [-300, 300], [-15, 15]);
  const translateX = useTransform(smoothX, [-300, 300], [-30, 30]);
  const translateY = useTransform(smoothY, [-300, 300], [-30, 30]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeService = SERVICES.find(s => s.id === activeId);

  return (
    <section
      id="services"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen bg-[#150089] flex items-center justify-center overflow-hidden py-24 px-6 lg:px-20"
      style={{ perspective: 1200 }}
    >

      {/* Background Text (Subtle behind everything) */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black text-white/[0.02] select-none pointer-events-none uppercase">
        Services
      </h2>

      <div className="relative w-full max-w-7xl grid lg:grid-cols-[1fr_auto_1fr] items-center gap-12 lg:gap-24 z-10">

        {/* Left column: 01 - 03 */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {SERVICES.slice(0, 3).map((service) => (
            <motion.div
              key={service.id}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveId(service.id)}
              onMouseLeave={() => setActiveId(null)}
              whileHover={{ x: 15 }}
            >
              <span className={`block text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-300 ${activeId === service.id ? 'text-[#3df1f6]' : 'text-white/40'}`}>
                {service.id}
              </span>
              <h3 className={`text-3xl lg:text-5xl font-black mt-2 transition-colors duration-500 ${activeId === service.id ? 'text-[#3df1f6]' : 'text-white'}`}>
                {service.label}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Central Dynamic Lens */}
        <div className="relative flex items-center justify-center">

          {/* Ambient Glow */}
          <motion.div
            className="absolute inset-[-40px] rounded-full bg-sky-500/10 blur-[80px]"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <motion.div
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
            }}
            className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full border border-sky-400/20 bg-sky-900/10 overflow-hidden shadow-[0_0_50px_rgba(61,241,246,0.1)]"
          >
            {/* Image Mask / Transition */}
            <AnimatePresence mode="wait">
              {activeId ? (
                <motion.img
                  key={activeId}
                  src={activeService?.image}
                  alt={activeService?.label}
                  initial={{ opacity: 0, scale: 1.2, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1.05, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)" }}
                  transition={{ duration: 0.6, ease: "circOut" }}
                  className="absolute inset-0 w-full h-full object-cover grayscale(20%) hover:grayscale-0 transition-all duration-700"
                />
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-sky-950/20"
                >
                  <div className="relative w-40 h-32 flex items-center justify-center">
                    {/* Logo Orbit/Glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#3df1f6]/15 blur-[40px]"
                      animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <div className="relative z-10 scale-[1.9]">
                      <BrandMark />
                    </div>
                  </div>
                  <div className="mt-3 flex flex-col items-center">
                    <span className="text-[28px] font-black tracking-[16px] uppercase text-white/95 ml-[16px]">
                      Vertex
                    </span>
                    <span className="text-[13px] font-bold tracking-[11px] uppercase text-[#3df1f6]/80 mt-1 ml-[11px]">
                      Media
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Subtle Inner Lens Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
          </motion.div>

        </div>

        {/* Right column: 04 - 06 */}
        <div className="flex flex-col gap-12 lg:gap-20 text-right items-end">
          {SERVICES.slice(3, 6).map((service) => (
            <motion.div
              key={service.id}
              className="group cursor-pointer"
              onMouseEnter={() => setActiveId(service.id)}
              onMouseLeave={() => setActiveId(null)}
              whileHover={{ x: -15 }}
            >
              <span className={`block text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-300 ${activeId === service.id ? 'text-[#3df1f6]' : 'text-white/40'}`}>
                {service.id}
              </span>
              <h3 className={`text-3xl lg:text-5xl font-black mt-2 transition-colors duration-500 ${activeId === service.id ? 'text-[#3df1f6]' : 'text-white'}`}>
                {service.label}
              </h3>
            </motion.div>
          ))}
        </div>

      </div >

    </section >
  );
}
