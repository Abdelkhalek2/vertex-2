"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Service {
  id: string;
  label: string;
  angle: number; // 0 = top, clockwise
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const SERVICES: Service[] = [
  { id: "01", label: "Influencer Marketing", angle: 300 },
  { id: "02", label: "Social Media",          angle: 0   },
  { id: "03", label: "Event Coordination",    angle: 60  },
  { id: "04", label: "Branding and Design",   angle: 120 },
  { id: "05", label: "Ad Campaigns",          angle: 180 },
  { id: "06", label: "SMS & WhatsApp",        angle: 240 },
];

const ORBIT_RADIUS = 260; // px — center of circle to center of node

function polarToXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
}

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

// ─── Main component ───────────────────────────────────────────────────────────
export default function ServicesSection() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section className="relative w-full min-h-screen bg-[#150089] flex items-center justify-center overflow-hidden">

      {/* Subtle dot-grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(61,241,246,0.10) 1px, transparent 1px)",
          backgroundSize: "38px 38px",
        }}
      />

      {/* ── Orbit system ────────────────────────────────────────────────── */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width:  ORBIT_RADIUS * 2 + 180,
          height: ORBIT_RADIUS * 2 + 180,
        }}
      >
        {/* Orbit track ring */}
        <div
          aria-hidden="true"
          className="absolute rounded-full border border-dashed border-[#3df1f6]/15"
          style={{ width: ORBIT_RADIUS * 2, height: ORBIT_RADIUS * 2 }}
        />

        {/* ── Central circle ─────────────────────────────────────────── */}
        <div className="absolute w-[400px] h-[400px] rounded-full border border-[#3df1f6]/35 bg-[#150089] flex items-center justify-center z-10">

          {/* Secondary inner ring */}
          <div
            aria-hidden="true"
            className="absolute w-[368px] h-[368px] rounded-full border border-[#3df1f6]/10"
          />

          {/* Connector line from center to active node */}
          <AnimatePresence>
            {active && (() => {
              const { x, y } = polarToXY(active.angle, ORBIT_RADIUS);
              const angle = Math.atan2(y, x) * (180 / Math.PI);
              // Stop line at circle edge (200px = half of 400px circle)
              const lineLength = ORBIT_RADIUS - 200;
              return (
                <motion.div
                  key={`line-${active.id}`}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: lineLength,
                    height: 1,
                    background: "rgba(61,241,246,0.25)",
                    transformOrigin: "left center",
                    transform: `translateY(-0.5px) rotate(${angle}deg)`,
                  }}
                />
              );
            })()}
          </AnimatePresence>

          {/* Circle content — idle logo or active service */}
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center text-center px-8 select-none pointer-events-none"
              >
                <span className="text-[80px] font-bold leading-none text-[#3df1f6] tracking-tighter tabular-nums">
                  {active.id}
                </span>
                <span className="mt-3 text-[13px] font-medium uppercase tracking-[3px] text-white/75 leading-snug">
                  {active.label}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center gap-3 select-none pointer-events-none"
              >
                <BrandMark />
                <span className="text-[10px] font-medium tracking-[4px] uppercase text-white/25">
                  Our Services
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Service nodes ──────────────────────────────────────────── */}
        {SERVICES.map((service) => {
          const { x, y } = polarToXY(service.angle, ORBIT_RADIUS);
          const isActive = active?.id === service.id;

          return (
            <motion.button
              key={service.id}
              onHoverStart={() => setActive(service)}
              onHoverEnd={() => setActive(null)}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                x: x - 72,
                y: y - 44,
              }}
              className="w-36 flex flex-col items-center gap-1.5 focus:outline-none"
              aria-label={`Service ${service.id}: ${service.label}`}
            >
              {/* Dot */}
              <motion.span
                animate={{
                  scale: isActive ? 1.5 : 1,
                  backgroundColor: isActive
                    ? "#3df1f6"
                    : "rgba(61,241,246,0.25)",
                  boxShadow: isActive
                    ? "0 0 12px rgba(61,241,246,0.65)"
                    : "none",
                }}
                transition={{ duration: 0.18 }}
                className="block w-2 h-2 rounded-full border border-[#3df1f6]/50"
              />

              {/* Number */}
              <motion.span
                animate={{ color: isActive ? "#3df1f6" : "rgba(255,255,255,0.45)" }}
                transition={{ duration: 0.18 }}
                className="text-[11px] font-bold tracking-widest"
              >
                {service.id}
              </motion.span>

              {/* Label */}
              <motion.span
                animate={{ color: isActive ? "#ffffff" : "rgba(255,255,255,0.4)" }}
                transition={{ duration: 0.18 }}
                className="text-[12px] font-medium text-center leading-tight tracking-wide"
              >
                {service.label}
              </motion.span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
