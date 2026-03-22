"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const textBlocks = [
  { text: "WE IDEATE", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1920&h=1080&fit=crop" },
  { text: "WE CREATE", image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop" },
  { text: "WE ELEVATE", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop" },
]

export function VideoScrubSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const section = sectionRef.current
    const container = containerRef.current
    if (!section || !container) return

    // Create the pinning ScrollTrigger
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=300%", // Pin for 3x the viewport height
      pin: container,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const prog = self.progress
        setProgress(prog)
        
        // Determine active text based on scroll progress
        if (prog < 0.33) {
          setActiveIndex(0)
        } else if (prog < 0.66) {
          setActiveIndex(1)
        } else {
          setActiveIndex(2)
        }
      },
    })

    return () => {
      trigger.kill()
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative">
      <div 
        ref={containerRef}
        className="h-screen w-full overflow-hidden bg-black relative"
      >
        {/* Background Images */}
        {textBlocks.map((block, index) => (
          <div
            key={block.text}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: activeIndex === index ? 1 : 0 }}
          >
            <img 
              src={block.image} 
              alt={block.text}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Text Blocks */}
        <div className="absolute inset-0 flex items-center justify-center">
          {textBlocks.map((block, index) => (
            <div
              key={block.text}
              className="absolute text-center transition-all duration-500 ease-out"
              style={{
                opacity: activeIndex === index ? 1 : 0,
                transform: activeIndex === index ? "translateY(0)" : "translateY(60px)",
              }}
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] font-black text-white tracking-tight leading-none">
                {block.text}
              </h2>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60">
          <span className="text-xs uppercase tracking-[0.3em]">Scroll to explore</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
          <div 
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        {/* Progress dots */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {textBlocks.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index ? "bg-white scale-125" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
