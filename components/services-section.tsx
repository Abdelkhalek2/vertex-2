"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    id: "01",
    label: "Influencer Marketing",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&q=80",
  },
  {
    id: "02",
    label: "Social Media",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
  },
  {
    id: "03",
    label: "Event Coordination",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
  },
  {
    id: "04",
    label: "Branding and Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
  },
  {
    id: "05",
    label: "Ad Campaigns",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    id: "06",
    label: "SMS & WhatsApp",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800&q=80",
  },
];

// ─── Share / Swirl shape that rotates with scroll ─────────────────────────────
// ─── Share / Swirl shape that rotates with scroll ─────────────────────────────
function ScrollRotatingShape({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useMotionValue<number>>;
}) {
  // Starts at ~171° (matching the reference) and makes a full rotation as user scrolls
  const rotate = useTransform(scrollProgress, [0, 1], [171, 531]);

  return (
    <motion.div
      style={{
        rotate,
        // 1. طلبك: خلينا لون الشكل الكحلي الداكن
        backgroundColor: "#3df1f6", 
        // 2. استخدمنا الصورة بتاعتك اللي شلت خلفيتها كقناع (Mask) عشان نشيل المربع نهائي
        WebkitMaskImage: "url('/rotate-removebg-preview.png')",
        WebkitMaskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        // 3. ملحوظة: عشان خلفية السكشن كحلي والشكل كحلي، ضفتلك توهج (Glow) سماوي عشان الشكل ينطق وميختفيش
        filter: "drop-shadow(0 0 25px rgba(61,241,246,0.6))"
      }}
      // شلنا كل تعقيدات الـ blend mode
      className="w-52 h-52 md:w-72 md:h-72 select-none pointer-events-none"
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springCfg = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);
  const rotateX = useTransform(smoothY, [-300, 300], [15, -15]);
  const rotateY = useTransform(smoothX, [-300, 300], [-15, 15]);
  const translateX = useTransform(smoothX, [-300, 300], [-30, 30]);
  const translateY = useTransform(smoothY, [-300, 300], [-30, 30]);

  // Scroll progress for the rotating shape
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winH = window.innerHeight;
      const progress = 1 - rect.bottom / (winH + rect.height);
      scrollProgress.set(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollProgress]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const activeService = SERVICES.find((s) => s.id === activeId);

  return (
    <section
      id="services"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 lg:px-20"
      style={{ backgroundColor: "#150089", perspective: 1200 }}
    >


      <div
        ref={containerRef}
        className="relative w-full max-w-7xl grid lg:grid-cols-[1fr_auto_1fr] items-center gap-12 lg:gap-24 z-10"
      >
        {/* ── Left column 01-03 ── */}
        <div className="flex flex-col gap-12 lg:gap-20">
          {SERVICES.slice(0, 3).map((service) => (
            <motion.div
              key={service.id}
              className="cursor-pointer select-none"
              onMouseEnter={() => setActiveId(service.id)}
              onMouseLeave={() => setActiveId(null)}
              whileHover={{ x: 15 }}
            >
              <span
                className={`block text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-300 ${activeId === service.id ? "text-[#3df1f6]" : "text-white/40"
                  }`}
              >
                {service.id}
              </span>
              <h3
                className={`text-3xl lg:text-5xl font-black mt-2 transition-colors duration-500 ${activeId === service.id ? "text-[#3df1f6]" : "text-white"
                  }`}
              >
                {service.label}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* ── Central Circle ── */}
        <div className="relative flex items-center justify-center">
          <motion.div
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
              border: "1px solid rgba(61,241,246,0.2)",
              backgroundColor: "#150089",
              boxShadow: "0 0 60px rgba(61,241,246,0.08)",
            }}
            className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] rounded-full overflow-hidden flex items-center justify-center"
          >
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
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center w-full h-full"
                >
                  <ScrollRotatingShape scrollProgress={scrollProgress} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Right column 04-06 ── */}
        <div className="flex flex-col gap-12 lg:gap-20 text-right items-end">
          {SERVICES.slice(3, 6).map((service) => (
            <motion.div
              key={service.id}
              className="cursor-pointer select-none"
              onMouseEnter={() => setActiveId(service.id)}
              onMouseLeave={() => setActiveId(null)}
              whileHover={{ x: -15 }}
            >
              <span
                className={`block text-xs font-bold tracking-[0.3em] uppercase transition-colors duration-300 ${activeId === service.id ? "text-[#3df1f6]" : "text-white/40"
                  }`}
              >
                {service.id}
              </span>
              <h3
                className={`text-3xl lg:text-5xl font-black mt-2 transition-colors duration-500 ${activeId === service.id ? "text-[#3df1f6]" : "text-white"
                  }`}
              >
                {service.label}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
