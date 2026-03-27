"use client"

import Image from "next/image"
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence, Variants } from "framer-motion"
import { ArrowRight, Phone, MapPin, Mail, Instagram, Linkedin, Menu, Search, ThumbsUp, Sparkles, Megaphone, Calendar, MessageCircle, X } from "lucide-react"
import Link from "next/link"
import { VideoScrubSection } from "@/components/video-scrub-section"
import { ServicesSection } from "@/components/services-section"
import { ClientLogos } from "@/components/client-logos"
import SocialMediaVideoScrub from "@/components/SocialMediaVideoScrub"
import { useState, useRef, useEffect } from "react"

// Animation Variants
const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }
  }
}

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
}

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }
  }
}

// Letter by letter animation
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const
    }
  })
}

// Counter Component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const increment = target / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

// Content Is King Images - for scrolling strip
const contentImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
]

// Morphing Blob Component for Influencers Section
function MorphingBlob({ color, className }: { color: string; className: string }) {
  const path1 = "M91.8156745,39.3181785C222.620584,-32.3048215,363.24878999999993,70.61511,517.3255285,14.504526499999997C648.6853065,-32.735451999999995,811.8936745000001,55.5051785,785.2186745,207.91217849999998C760.2336745,350.666088,567.2976424999999,405.268923,432.69147250000003,436.57454199999995C272.5885025,473.868817,215.462584,661.301088,75.5586745,554.539088C-35.052416000000015,470.130088,-2.6012120000000065,354.89796499999994,55.103787999999994,219.64096499999994C81.72278800000001,157.246965,32.649584000000004,71.716088,91.8156745,39.3181785C91.8156745,39.3181785,91.8156745,39.3181785,91.8156745,39.3181785";
  const path2 = "M85.107,33.083c130.805-71.623,268.804,45.621,423.386-17.376c130.466-53.168,296.692,33.563,270.017,185.97c-24.985,142.754-223.519,192.011-360.013,219.009C256.289,452.772,208.754,655.066,68.85,548.304c-110.611-84.409-68.039-196.35-10.334-331.607C85.135,154.303,25.941,65.481,85.107,33.083z";

  return (
    <div className={`absolute select-none pointer-events-none z-0 ${className}`}>
      <svg viewBox="0 0 856 682" className="w-full h-full">
        <motion.path
          fill={color}
          animate={{
            d: [path1, path2, path1],
            scale: [1, 1.08, 0.96, 1],
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
    </div>
  );
}

// Content Is King Section Component - with scrolling image strip inside text
function ContentIsKingSection() {
  const images = [
    "/cup-dessert-with-whipped-cream-strawberries-cherries-orange.jpg",
    "/basket-with-bread-sliced-eggplant.jpg",
    "/images/_يبيله قهوة-13_page-0001.jpg",
    "/images/_يبيله قهوة-13_page-0002.jpg",
    "/images/_يبيله قهوة-13_page-0003.jpg",
    "/images/_يبيله قهوة-13_page-0004.jpg",
    "/images/_يبيله قهوة-13_page-0005.jpg",
  ]

  return (
    <section className="relative min-h-[50vh] md:min-h-screen py-16 md:py-0 bg-white flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-full flex-1 flex flex-col items-center justify-center pointer-events-none select-none px-4 md:px-8">
        <svg width="100%" height="100%" viewBox="0 0 1000 440" className="w-full h-auto max-h-[72vh]">
          <defs>
            <mask id="contentMask">
              <rect width="1000" height="440" fill="black" />
              {/* textLength makes both lines IDENTICAL width — fixes alignment */}

              <text
                x="40" y="195"
                fill="white" fontSize="170" fontWeight="900"
                textLength="920" lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: 'var(--font-barlow), system-ui, sans-serif' }}
              >CONTENT.</text>
              <text
                x="40" y="400"
                fill="white" fontSize="170" fontWeight="900"
                textLength="920" lengthAdjust="spacingAndGlyphs"
                style={{ fontFamily: 'var(--font-barlow), system-ui, sans-serif' }}
              >DATA. GROWTH.</text>
            </mask>
          </defs>

          <g mask="url(#contentMask)">
            <motion.g
              animate={{ x: [0, -(images.length * 300)] }}
              transition={{
                duration: 25,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ willChange: "transform" }}
            >
              {[...images, ...images].map((src, i) => (
                <image
                  key={i}
                  href={src}
                  x={i * 300}
                  y="0"
                  width="300"
                  height="440"
                  preserveAspectRatio="xMidYMid slice"
                />
              ))}
            </motion.g>
          </g>
        </svg>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-20 pb-8 md:pb-20 mt-6 md:mt-0 flex justify-center w-full"
      >
        <MagneticButton>
          <Link
            href="#services"
            className="inline-block px-12 py-5 text-sm font-black tracking-widest transition-all duration-300 rounded-full shadow-2xl hover:scale-110 active:scale-95"
            style={{ backgroundColor: '#150089', color: 'white' }}
          >
            EXPLORE SERVICES
          </Link>
        </MagneticButton>
      </motion.div>
    </section>
  )
}

// Testimonials Data
const testimonials = [
  {
    quote: "Vertex is a one stop shop for all creative solutions. Their speed to market is phenomenal and have contributed immensely in growing our TikTok user base.",
    name: "Ahmed Al-Thani",
    company: "Power Horse"
  },
  {
    quote: "Working with Vertex Media has transformed our digital presence. Their team understands the Gulf market like no other agency we've worked with.",
    name: "Sara Mohammed",
    company: "Gulf Retail Group"
  },
  {
    quote: "The creativity and professionalism of Vertex Media exceeded our expectations. They delivered our campaign on time and within budget.",
    name: "Khaled Hassan",
    company: "Doha Events"
  },
  {
    quote: "From influencer partnerships to event coordination, Vertex handles everything seamlessly. A true full-service agency.",
    name: "Fatima Al-Kuwari",
    company: "QNB"
  }
]

// Testimonials Section Component
function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 60000) // Change every 60 seconds (1 minute)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center relative">
          {/* Single Massive Watermark Quote */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-12 select-none pointer-events-none opacity-[0.05] lg:opacity-[0.1] z-0">
            <span className="text-[18rem] lg:text-[25rem] font-serif leading-none text-[#3df1f6]">“</span>
          </div>

          {/* Quote Icon - Main */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 mb-12"
          >
            <svg className="w-16 h-12 mx-auto" viewBox="0 0 64 48" fill="#150089">
              <path d="M0 48V32C0 14.327 14.327 0 32 0h4v12h-4c-11.046 0-20 8.954-20 20v4h20v12H0zm32 0V32c0-17.673 14.327-32 32-32h4v12h-4c-11.046 0-20 8.954-20 20v4h20v12H32z" transform="rotate(180 32 24)" />
            </svg>
          </motion.div>

          {/* Testimonial Content */}
          <div className="relative min-h-[200px] flex items-center justify-center z-10">
            {/* Left Arrow */}
            <button
              onClick={prevTestimonial}
              className="absolute left-[-2rem] lg:left-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors group z-20"
              aria-label="Previous testimonial"
            >
              <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.9 }}>
                <svg className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M20 12H4M4 12L10 6M4 12L10 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </button>

            {/* Testimonial */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="px-8 lg:px-16"
              >
                <div className="relative inline-block">
                  <p className="text-xl md:text-2xl lg:text-3xl text-gray-800 leading-relaxed mb-8 font-medium">
                    {testimonials[currentIndex].quote}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-lg md:text-xl" style={{ color: '#150089' }}>{testimonials[currentIndex].name}</p>
                  <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold mt-2">{testimonials[currentIndex].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Arrow */}
            <button
              onClick={nextTestimonial}
              className="absolute right-[-2rem] lg:right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors group z-20"
              aria-label="Next testimonial"
            >
              <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.9 }}>
                <svg className="w-8 h-8 text-gray-400 group-hover:text-black transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M4 12H20M20 12L14 6M20 12L14 18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="w-2 h-2 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentIndex ? '#150089' : '#d1d5db',
                  width: index === currentIndex ? '24px' : '8px'
                }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Magnetic Button Component
function MagneticButton({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Text Reveal Animation
function TextReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <span ref={ref} className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={letterVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

const services = [
  { number: "01", title: "Influencer Marketing", description: "Connect with top influencers" },
  { number: "02", title: "Social Media", description: "Strategic social presence" },
  { number: "03", title: "Event Coordination", description: "Seamless event execution" },
  { number: "04", title: "Branding and Design", description: "Visual identity creation" },
  { number: "05", title: "Ad Campaigns", description: "Data-driven advertising" },
  { number: "06", title: "SMS & WhatsApp", description: "Direct communication" },
]

const values = [
  { title: "Creativity", description: "Creativity is inventing, experimenting, growing, taking risks, breaking rules, making mistakes." },
  { title: "Unique", description: "In order to be irreplaceable, one must always be different." },
  { title: "Innovation", description: "Innovation is seeing what everybody has seen and thinking what nobody has thought." },
  { title: "Youth", description: "Vertex is a powerful collective of innovative minds in the Middle East." },
]

const marqueeServicesList = [
  "Strategy", "Design", "UI Design", "Advertising", "Packaging Design", 
  "Content Generation", "Digital", "Outdoor", "Product Naming", "Branding", 
  "Corporate Identity", "Product Development", "Product Sourcing", "Collateral", 
  "Sales Support", "Brochures", "Catalogues", "Flyers", "Mechanical Artwork", 
  "Print Services", "Photography", "Creative Direction"
]

const parallaxImages = [
  "/CREATIVE DIRECTION.jpg",
  "/catering-restaurant-service.jpg",
  "/banquet-table-restaurant.jpg",
  "/images/_يبيله قهوة-13_page-0006.jpg",
  "/images/_يبيله قهوة-13_page-0007.jpg",
  "/images/_يبيله قهوة-13_page-0008.jpg",
  "/images/_يبيله قهوة-13_page-0009.jpg",
  "/images/_يبيله قهوة-14_page-0001.jpg",
  "/images/_يبيله قهوة-14_page-0002.jpg",
]

const phoneImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=800&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=800&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=800&fit=crop",
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPhoneImage, setCurrentPhoneImage] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })

  const heroVideoY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"])
  const heroTextY = useTransform(heroScrollProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0])

  // Phone image carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhoneImage((prev) => (prev + 1) % phoneImages.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="min-h-screen bg-white text-foreground overflow-x-clip relative">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-28">
            
            <a href="#hero_section" className="flex items-center cursor-pointer">
              <Image src="/logo.svg" alt="Vertex Media" width={180} height={96} priority className="h-20 md:h-24 w-auto" />
            </a>
            
            {/* لينكات الديسكتوب (دي اللي بتختفي في الموبايل) */}
            <div className="hidden lg:flex items-center gap-10">
              {["Services", "About", "Influencers"].map((item) => (
                <a
                  key={item}
                  href={item === "About" ? "#about-section" : `#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors underline-grow cursor-pointer"
                >
                  {item}
                </a>
              ))}
            </div>
            
            {/* الجزء اللي على اليمين (بيظهر في كل الشاشات: موبايل وديسكتوب) */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* زرار Contact Us طلعناه بره عشان يفضل ظاهر */}
              <a
                href="#contact" 
                className="px-4 py-2 md:px-6 md:py-2.5 bg-[#150089] text-white text-xs md:text-sm font-black rounded-full hover:bg-[#3df1f6] hover:text-[#150089] transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(61,241,246,0.5)] whitespace-nowrap"
              >
                Contact Us
              </a>

              {/* زرار القائمة للموبايل */}
              <button
                className="lg:hidden p-2 hover:bg-gray-100 transition-colors rounded-full"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#150089]" /> : <Menu className="w-6 h-6 text-[#150089]" />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="flex flex-col gap-4 py-6 px-6">
                {["Services", "About", "Influencers", "Contact"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <a
                      href={item === "About" ? "#about-section" : `#${item.toLowerCase()}`}
                      className="text-lg font-medium cursor-pointer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section id="hero_section" ref={heroRef} className="min-h-screen pt-20 relative overflow-hidden">
        <motion.div
          style={{ y: heroVideoY }}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop"
          >
            <source src="https://cdn.coverr.co/videos/coverr-team-brainstorming-session-2837/1080p.mp4" type="video/mp4" />
          </video>
          {/* سبتلك الـ Cover القديم بتاعك زي ما هو بدون أي تعديل */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32 relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            
            {/* الجزء اللي على الشمال: النصوص (أبيض بالكامل - تم إزالة الزرار) */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.p
                variants={fadeUpVariants}
                className="text-sm font-medium text-white tracking-widest uppercase"
              >
                2026
              </motion.p>

              <motion.h1
                variants={fadeUpVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white"
              >
                <span className="block text-white">Marketing</span>
                <span className="block text-white mt-2">Elevated</span>
              </motion.h1>

              <motion.p
                variants={fadeUpVariants}
                className="text-lg text-white max-w-md leading-relaxed font-light mt-6"
              >
                We are not just creative, we are strategic innovators, creative visionaries, and the driving force behind some of the biggest campaigns in the region.
              </motion.p>
            </motion.div>

            {/* الجزء اللي على اليمين: الدائرة التفاعلية (GIF يظهر افتراضياً واللوجو عند الـ Hover) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring" }}
              className="relative flex items-center justify-center"
            >
              {/* أضفنا الكلاسات group و cursor-pointer هنا لتفعيل الـ Hover */}
              <div className="w-72 h-72 lg:w-[420px] lg:h-[420px] relative group cursor-pointer">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full blur-3xl animate-pulse" style={{ background: 'linear-gradient(to bottom right, rgba(61, 241, 246, 0.5), transparent)' }} />
                
                {/* Glassy circle badge */}
                <div
                  className="absolute inset-6 bg-white/10 backdrop-blur-md rounded-full border transition-all duration-500 hover:bg-white/20 flex flex-col items-center justify-center gap-3 overflow-hidden"
                  style={{ borderColor: 'rgba(61, 241, 246, 0.4)', boxShadow: '0 0 60px rgba(61,241,246,0.15) inset' }}
                >
                  
{/* 1. Animation (Responsive: Simple for Mobile, Orbits for Desktop) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-100 group-hover:opacity-0 transition-opacity duration-500">

                    {/* ─── Base Animations (All Screens) ─── */}
                    {/* مدار خارجي دوار (بطيء) */}
                    <div className="absolute inset-0 rounded-full border border-dashed border-[#3df1f6]/30 animate-[spinCW_30s_linear_infinite]" />
                    <div className="absolute inset-5 md:inset-7 rounded-full border border-white/5" />
                    
                    {/* النبضات المركزية (Sonar Effect) */}
                    <div className="absolute w-20 h-20 md:w-16 md:h-16 rounded-full border border-[#3df1f6]/40 animate-ping" />
                    <div className="absolute w-20 h-20 md:w-16 md:h-16 rounded-full border border-[#3df1f6]/20 animate-ping [animation-delay:0.7s]" />


                    {/* ─── Mobile Only: Big Logo (No Orbits) ─── */}
                    <div className="md:hidden relative z-20 flex flex-col items-center justify-center pointer-events-none">
                      <svg viewBox="0 0 396 361" className="w-20 h-20 drop-shadow-[0_0_20px_rgba(61,241,246,0.8)]">
                        <defs>
                          <linearGradient id="lgOrbitMobile" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3df1f6"/>
                            <stop offset="100%" stopColor="#ffffff"/>
                          </linearGradient>
                        </defs>
                        <path transform="matrix(1,0,0,1,172.5,128)" d="M95.2 0L55.4 77.3C44.5 98.4 39.1 102.2 39.1 102.2C38.2 102.6 36.3 103.3 27.3 104.8C15 102.6 10.3 99 10.3 99C8.7 97.8 4.1 93.4 0 83.2C2.7 83 9 82 17 76.6C19.5 74 24.1 65.8 24.1 65.8L32.7 49.2C36.8 40.6 39.9 35.2 51.5 15.9C71.7 2.3 95.2 0 95.2 0Z" fill="url(#lgOrbitMobile)"/>
                        <path transform="matrix(1,0,0,1,128,130)" d="M24.6 49C39.3 41.8 42.4 34.4 43.7 31.5C44.4 28.2 44.4 24.8 44.4 11.2C32.8 0 19.2 0 19.2 0H0L24.6 49Z" fill="url(#lgOrbitMobile)"/>
                      </svg>
                      <span className="text-[#3df1f6] text-[10px] font-black tracking-[0.4em] uppercase drop-shadow-md mt-4">
                        Creative
                      </span>
                    </div>


                    {/* ─── Desktop Only: Social Media Orbits ─── */}
                    <div className="hidden md:block">
                      <div className="absolute inset-14 rounded-full border border-dashed border-white/5" />

                      {/* ORBIT 1 — بطيء 22s — IG + YT  */}
                      <div className="absolute inset-0 animate-[spinCW_22s_linear_infinite]">
                        {/* Instagram */}
                        <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%,-50%) rotate(0deg) translateX(118px)' }}>
                          <div className="animate-[spinCCW_22s_linear_infinite]">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_0_14px_rgba(220,39,67,0.5)]" style={{ background: 'linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)' }}>
                              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.2" fill="white" stroke="none"/></svg>
                            </div>
                          </div>
                        </div>
                        {/* YouTube */}
                        <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%,-50%) rotate(180deg) translateX(118px)' }}>
                          <div className="animate-[spinCCW_22s_linear_infinite]">
                            <div className="w-9 h-9 rounded-xl bg-[#FF0000] flex items-center justify-center shadow-[0_0_14px_rgba(255,0,0,0.45)]">
                              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white"><path d="M21.8 8s-.2-1.4-.8-2c-.8-.8-1.6-.8-2-.9C16.8 5 12 5 12 5s-4.8 0-7 .1c-.4.1-1.2.1-2 .9-.6.6-.8 2-.8 2S2 9.6 2 11.2v1.5c0 1.6.2 3.2.2 3.2s.2 1.4.8 2c.8.8 1.8.8 2.2.8C6.8 19 12 19 12 19s4.8 0 7-.2c.4-.1 1.2-.1 2-.9.6-.6.8-2 .8-2s.2-1.6.2-3.2v-1.5C22 9.6 21.8 8 21.8 8zM10 15V9l5.5 3-5.5 3z"/></svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ORBIT 2 — متوسط 15s — TikTok + Meta */}
                      <div className="absolute inset-0 animate-[spinCCW_15s_linear_infinite]">
                        {/* TikTok */}
                        <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%,-50%) rotate(70deg) translateX(88px)' }}>
                          <div className="animate-[spinCW_15s_linear_infinite]">
                            <div className="w-9 h-9 rounded-xl bg-black border border-white/15 flex items-center justify-center shadow-[0_0_12px_rgba(105,201,208,0.4)]">
                              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" fill="#69c9d0"/></svg>
                            </div>
                          </div>
                        </div>
                        {/* Meta */}
                        <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%,-50%) rotate(250deg) translateX(88px)' }}>
                          <div className="animate-[spinCW_15s_linear_infinite]">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(6,104,225,0.5)]" style={{ background: 'linear-gradient(135deg,#0668E1,#0080FB)' }}>
                              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ORBIT 3 — سريع 10s — Google + X */}
                      <div className="absolute inset-0 animate-[spinCW_10s_linear_infinite]">
                        {/* Google */}
                        <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%,-50%) rotate(30deg) translateX(58px)' }}>
                          <div className="animate-[spinCCW_10s_linear_infinite]">
                            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                              <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            </div>
                          </div>
                        </div>
                        {/* X / Twitter */}
                        <div className="absolute top-1/2 left-1/2" style={{ transform: 'translate(-50%,-50%) rotate(210deg) translateX(58px)' }}>
                          <div className="animate-[spinCCW_10s_linear_infinite]">
                            <div className="w-8 h-8 rounded-full bg-black border border-white/20 flex items-center justify-center shadow-[0_0_10px_rgba(255,255,255,0.15)]">
                              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* النقطة المركزية للديسكتوب */}
                      <div className="relative z-20 flex items-center justify-center pointer-events-none mt-1/2 translate-y-1/2 pt-36">
                        <svg viewBox="0 0 396 361" className="w-10 h-10 drop-shadow-[0_0_14px_rgba(61,241,246,0.7)]">
                          <defs>
                            <linearGradient id="lgOrbitDesktop" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#3df1f6"/>
                              <stop offset="100%" stopColor="#150089"/>
                            </linearGradient>
                          </defs>
                          <path transform="matrix(1,0,0,1,172.5,128)" d="M95.2 0L55.4 77.3C44.5 98.4 39.1 102.2 39.1 102.2C38.2 102.6 36.3 103.3 27.3 104.8C15 102.6 10.3 99 10.3 99C8.7 97.8 4.1 93.4 0 83.2C2.7 83 9 82 17 76.6C19.5 74 24.1 65.8 24.1 65.8L32.7 49.2C36.8 40.6 39.9 35.2 51.5 15.9C71.7 2.3 95.2 0 95.2 0Z" fill="url(#lgOrbitDesktop)"/>
                          <path transform="matrix(1,0,0,1,128,130)" d="M24.6 49C39.3 41.8 42.4 34.4 43.7 31.5C44.4 28.2 44.4 24.8 44.4 11.2C32.8 0 19.2 0 19.2 0H0L24.6 49Z" fill="url(#lgOrbitDesktop)"/>
                        </svg>
                      </div>
                      
                      {/* Creative Agency label للديسكتوب */}
                      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
                        <span className="text-[#3df1f6] text-[9px] font-black tracking-[0.4em] uppercase drop-shadow-md whitespace-nowrap">
                          Creative Agency
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* 2. شعار V (مخفي افتراضياً وبيظهر بس وقت الـ Hover) */}
                  <svg
                    viewBox="0 0 396 361"
                    aria-hidden="true"
                    className="relative z-10 w-44 h-44 md:w-56 md:h-56 drop-shadow-2xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500"
                  >
                    <defs>
                      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#3df1f6" />
                        <stop offset="100%" stopColor="#150089" />
                      </linearGradient>
                    </defs>
                    <path
                      transform="matrix(1,0,-0,1,172.5,128)"
                      d="M95.2 0L55.4 77.3C44.5 98.4 39.1 102.2 39.1 102.2C38.2 102.6 36.3 103.3 27.3 104.8C15 102.6 10.3 99 10.3 99C8.7 97.8 4.1 93.4 0 83.2C2.7 83 9 82 17 76.6C19.5 74 24.1 65.8 24.1 65.8L32.7 49.2C36.8 40.6 39.9 35.2 51.5 15.9C71.7 2.3 95.2 0 95.2 0Z"
                      fill="url(#logoGradient)"
                    />
                    <path
                      transform="matrix(1,0,-0,1,128,130)"
                      d="M24.6 49C39.3 41.8 42.4 34.4 43.7 31.5C44.4 28.2 44.4 24.8 44.4 11.2C32.8 0 19.2 0 19.2 0H0L24.6 49Z"
                      fill="url(#logoGradient)"
                    />
                  </svg>

                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-white rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 lg:px-12 text-white" style={{ backgroundColor: '#150089' }}>
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: 500, suffix: "+", label: "Projects Done" },
              { value: 50, suffix: "+", label: "Happy Clients" },
              { value: 10, suffix: "+", label: "Years Experience" },
              { value: 25, suffix: "M+", label: "Reach Generated" },
            ].map((stat, i) => (
              <motion.div key={i} variants={scaleUp} className="space-y-2">
                <p className="text-4xl md:text-5xl font-black" style={{ color: '#3df1f6' }}>
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* New Generation Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-10"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <motion.h2
                  variants={slideInLeft}
                  className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]"
                >
                  <TextReveal text="New" className="block" />
                  <span className="block" style={{ color: '#3df1f6' }}>Generation</span>
                </motion.h2>
                <motion.p
                  variants={fadeUpVariants}
                  className="text-gray-600 max-w-lg leading-relaxed"
                >
                  We create powerful, innovative, fun, and memorable content. Our company is centered on the idea that everything you could possibly need is available under one roof.
                </motion.p>
              </div>
              <motion.div
                variants={slideInRight}
                className="flex justify-center lg:justify-end"
              >
                {/* ── Animated Phone Mockup ──────────────────────── */}
                <div className="relative group animate-float-slow">
                  {/* Glow */}
                  <div
                    className="absolute -inset-4 rounded-[3.5rem] blur-xl opacity-40 group-hover:opacity-70 transition-opacity duration-500 animate-pulse"
                    style={{ background: 'linear-gradient(135deg, #150089, #3df1f6)' }}
                  />
                  {/* Phone frame */}
                  <div className="relative w-52 md:w-60 bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-gray-900 rounded-b-2xl z-10" />
                    {/* Screen */}
                    <div className="relative bg-black rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentPhoneImage}
                          src={phoneImages[currentPhoneImage]}
                          alt="Content Preview"
                          className="w-full h-full object-cover"
                          initial={{ opacity: 0, scale: 1.05 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.6 }}
                          crossOrigin="anonymous"
                        />
                      </AnimatePresence>
                      {/* Social media overlay UI */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3df1f6] to-[#150089]" />
                          <span className="text-white text-[9px] font-bold">@vertexmedia</span>
                        </div>
                        <div className="flex gap-3 justify-end">
                          {["❤️", "💬", "↗️"].map((icon, i) => (
                            <motion.span
                              key={i}
                              animate={{ scale: [1, 1.3, 1] }}
                              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
                              className="text-sm"
                            >
                              {icon}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                    {/* Home button */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 border-2 border-gray-700 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              variants={fadeUpVariants}
              className="grid md:grid-cols-2 gap-x-20 gap-y-8"
            >
              {services.map((service, i) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 10 }}
                  className="flex items-start gap-6 py-4 border-b border-gray-200 group hover:border-primary transition-all cursor-pointer"
                >
                  <span className="text-2xl font-black group-hover:scale-125 transition-transform" style={{ color: '#150089' }}>{service.number}</span>
                  <div>
                    <h3 className="text-lg font-bold mb-1 transition-colors" style={{ color: 'inherit' }}>{service.title}</h3>
                    <p className="text-sm text-gray-500">{service.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Horizontal Parallax Images */}
<section className="py-16 bg-gray-100 overflow-hidden">
        <div className="mb-6">
          <div className="flex gap-6 animate-scroll-left hover:[animation-play-state:paused]" style={{ width: "200%" }}>
            {[...parallaxImages, ...parallaxImages].map((img, i) => (
              <motion.div
                key={`row1-${i}`}
                className="flex-shrink-0 w-80 h-52 relative overflow-hidden group"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                style={{ transform: "translateZ(0)" }} // 🔥 تسريع كارت الشاشة
              >
                <Image
                  src={img}
                  alt={`Project ${i + 1}`}
                  fill
                  sizes="320px"
                  priority // 🔥 منع التهنيج
                  unoptimized // 🔥 منع التهنيج
                  className="object-cover transition-transform duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="font-bold">Project {(i % 6) + 1}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex gap-6 animate-scroll-right hover:[animation-play-state:paused]" style={{ width: "200%" }}>
            {[...parallaxImages.slice().reverse(), ...parallaxImages.slice().reverse()].map((img, i) => (
              <motion.div
                key={`row2-${i}`}
                className="flex-shrink-0 w-80 h-52 relative overflow-hidden group"
                whileHover={{ scale: 1.05, zIndex: 10 }}
                style={{ transform: "translateZ(0)" }} // 🔥 تسريع كارت الشاشة
              >
                <Image
                  src={img}
                  alt={`Project ${i + 1}`}
                  fill
                  sizes="320px"
                  priority // 🔥 منع التهنيج
                  unoptimized // 🔥 منع التهنيج
                  className="object-cover transition-transform duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Values Section with Animated Text */}
      <section id="about" className="py-16 px-6 lg:px-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                variants={scaleUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="space-y-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <h3 className="text-sm font-bold tracking-normal" style={{ color: '#150089' }}>
                  {value.title}
                </h3>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="h-0.5"
                  style={{ background: 'linear-gradient(to right, #150089, #3df1f6)' }}
                />
                <p className="text-sm text-gray-500 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* Social Media Video Scrub Section */}
      <SocialMediaVideoScrub />

      {/* CONTENT IS KING - Image Slideshow Text Masking */}
      <ContentIsKingSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Services Text Marquee Separator */}
      <section className="py-8 bg-[#150089] overflow-hidden flex items-center border-y border-[#3df1f6]/20 relative z-20">
        <div className="flex whitespace-nowrap w-[200%] animate-[scroll-left_40s_linear_infinite] hover:[animation-play-state:paused]">
          {/* بنكرر المصفوفة 3 مرات عشان الحركة تفضل مستمرة وماتقطعش */}
          {[...marqueeServicesList, ...marqueeServicesList, ...marqueeServicesList].map((service, idx) => (
            <div key={idx} className="flex items-center">
<span 
                className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-white mx-6 lg:mx-8 transition-colors duration-300 hover:text-[#3df1f6] cursor-default"
              >
                {service}
              </span>
              {/* النجمة السماوي كفاصل بين الكلمات */}
              <span className="text-[#3df1f6] text-3xl">✧</span>
            </div>
          ))}
        </div>
      </section>
{/* Influencers Section */}
      <section id="influencers" className="relative pt-6 pb-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-white overflow-hidden">
        
        {/* Background Blobs (Visible and adjusted for all screens) */}
        <MorphingBlob
          color="#150089"
          className="absolute left-[-40%] md:left-[-25%] top-[10%] md:top-[-10%] w-[120%] md:w-[70%] h-[80%] md:h-[120%] opacity-15 md:opacity-100 z-0"
        />
        <MorphingBlob
          color="#3df1f6"
          className="absolute right-[-40%] md:right-[-25%] bottom-[10%] md:top-[-10%] w-[120%] md:w-[60%] h-[80%] md:h-[120%] opacity-20 md:opacity-100 z-0"
        />

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-0 items-center relative"
          >
            
            {/* Right Side - Character Image (Moved to Top in Mobile using order-1) */}
            {/* Right Side - Character Image */}
            <motion.div
              variants={slideInRight}
              className="relative flex justify-center z-30 order-1 lg:order-2 pt-8 lg:pt-0"
            >
              <div className="relative h-[320px] sm:h-[400px] lg:h-[600px] w-full flex items-center justify-center">
                <motion.div
                  animate={{ y: [0, -15, 0], rotate: [0, 1, -1, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full flex justify-center"
                >
                  <Image
                    src="/images/influencer-graphic-new.webp"
                    alt="Vertex Influencer Network & Creator Graphic"
                    width={800}
                    height={800}
                    className="w-full max-w-[280px] sm:max-w-sm lg:max-w-lg object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
                    style={{ height: 'auto' }}
                    priority
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Left Side - Text with White Background Box (Moved to Bottom in Mobile using order-2) */}
            <div className="relative z-20 order-2 lg:order-1">
              <motion.div
                variants={fadeUpVariants}
                // Negative margin-top (-mt-16) to overlap the image slightly on mobile
                className="bg-white/95 md:bg-white p-8 sm:p-10 md:p-12 lg:p-20 shadow-[0_10px_40px_rgba(0,0,0,0.08)] md:shadow-[-20px_20px_60px_rgba(0,0,0,0.05)] relative space-y-6 md:space-y-8 rounded-2xl md:rounded-none -mt-16 md:mt-0 border border-gray-50 md:border-none mx-2 md:mx-0 backdrop-blur-sm md:backdrop-blur-none"
              >
                <motion.h2
                  variants={slideInLeft}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1]"
                >
                  <TextReveal text="Influencers and" className="block text-[#150089]" />
                  <span className="block mt-1" style={{ color: '#3df1f6' }}>Creators</span>
                </motion.h2>
                <div className="w-12 md:w-16 h-1 bg-gray-400" />
                <motion.p
                  variants={fadeUpVariants}
                  className="text-gray-600 max-w-md leading-relaxed text-base md:text-lg"
                >
                  Want to know why we represent such great talent? Ask us anything... We work with the best creators and influencers across the Middle East and beyond.
                </motion.p>
                <motion.div variants={fadeUpVariants}>
                  <MagneticButton>
                    <Link
                      href="#contact"
                      className="inline-flex items-center gap-3 text-sm font-bold group bg-black text-white px-6 md:px-8 py-3 md:py-4 hover:bg-[#3df1f6] hover:text-[#150089] transition-colors rounded-none w-fit"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Link>
                  </MagneticButton>
                </motion.div>
              </motion.div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* Talents & Models Section - Vertex Brand Colors */}
      <section className="relative min-h-[80vh] overflow-hidden" style={{ backgroundColor: '#3df1f6' }}>
        <div className="grid lg:grid-cols-2 h-full min-h-[80vh]">
          {/* Left - Model Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[50vh] lg:h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1000&fit=crop"
              alt="Fashion Model"
              fill
              className="object-cover object-top"
            />
          </motion.div>

          {/* Right - Circle with Text */}
          <div className="relative flex items-center justify-center py-16 lg:py-0">
            {/* Deep Purple Circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="absolute left-0 lg:-left-20 w-[90vw] lg:w-[50vw] h-[90vw] lg:h-[50vw] max-w-[600px] max-h-[600px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#150089' }}
            >
              <div className="text-center space-y-8 px-8">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {"TALENTS".split("").map((letter, i) => (
                    <motion.span
                      key={`t-${i}`}
                      custom={i}
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: (i: number) => ({
                          opacity: 1,
                          y: 0,
                          transition: { delay: i * 0.05, duration: 0.5 }
                        })
                      }}
                      className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.3em] text-white inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={staggerContainer}
                >
                  {"MODELS".split("").map((letter, i) => (
                    <motion.span
                      key={`m-${i}`}
                      custom={i}
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: (i: number) => ({
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.3 + i * 0.05, duration: 0.5 }
                        })
                      }}
                      className="text-4xl md:text-5xl lg:text-6xl font-black tracking-[0.3em] text-white inline-block"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <MagneticButton>
                    <Link
                      href="#contact"
                      className="inline-block px-12 py-4 border-2 text-white font-medium tracking-widest transition-all duration-300"
                      style={{ borderColor: '#3df1f6', backgroundColor: 'transparent' }}
                      onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#3df1f6'; e.currentTarget.style.color = '#150089'; }}
                      onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; }}
                    >
                      VERTEX MODELS
                    </Link>
                  </MagneticButton>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative shadow circle */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-[-5%] left-[30%] w-64 h-64 rounded-full"
          style={{ backgroundColor: '#0a0050' }}
        />
      </section>

      {/* Event Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              variants={slideInLeft}
              className="order-2 lg:order-1"
            >
              <motion.div
                className="relative card-3d"
                whileHover={{ rotateY: 5, rotateX: 5 }}
              >
                <div className="bg-gray-100 aspect-[4/3] flex items-center justify-center overflow-hidden">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Calendar className="w-32 h-32 text-gray-300" />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-6 -right-6 text-white p-6"
                  style={{ backgroundColor: '#150089' }}
                >
                  <p className="text-sm font-bold">Events</p>
                  <p className="text-2xl font-black"><AnimatedCounter target={50} suffix="+" /></p>
                </motion.div>
              </motion.div>
            </motion.div>

            <div className="space-y-8 order-1 lg:order-2">
              <motion.h2
                variants={slideInRight}
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]"
              >
                <TextReveal text="Event" className="block" />
                <span className="block" style={{ color: '#3df1f6' }}>Coordination</span>
              </motion.h2>
              <motion.p
                variants={fadeUpVariants}
                className="text-gray-600 max-w-md leading-relaxed"
              >
                From intimate gatherings to large-scale productions, we handle every detail with precision. Our events leave lasting impressions and create unforgettable experiences.
              </motion.p>
              <motion.div variants={fadeUpVariants}>
                <MagneticButton>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 text-sm font-medium hover:bg-primary transition-colors group"
                  >
                    Plan Your Event
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Client Logos Marquee */}
      <ClientLogos />

      {/* Digital Marketing - Brand Theme */}
      <section className="py-24 lg:py-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #150089 0%, #0a0050 100%)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center space-y-12"
          >
            <div className="relative inline-block">
              {/* Floating Brand Icon - Left */}
              <motion.div
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -left-12 top-10 w-10 h-10 rounded-full border border-[#3df1f6]/30 flex items-center justify-center bg-white/5 backdrop-blur-sm hidden md:flex"
              >
                <svg width="20" height="20" viewBox="0 0 396 361" fill="#3df1f6">
                  <path transform="matrix(0.05,0,0,0.05,8,7)" d="M95.2 0L55.4 77.3C44.5 98.4 39.1 102.2 39.1 102.2C38.2 102.6 36.3 103.3 27.3 104.8C15 102.6 10.3 99 10.3 99C8.7 97.8 4.1 93.4 0 83.2C2.7 83 9 82 17 76.6C19.5 74 24.1 65.8 24.1 65.8L32.7 49.2C36.8 40.6 39.9 35.2 51.5 15.9C71.7 2.3 95.2 0 95.2 0Z" />
                </svg>
              </motion.div>

              <motion.h2
                variants={scaleUp}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white glitch-text"
              >
                <TextReveal text="DIGITAL" className="block" />
                <span className="block" style={{ color: '#3df1f6' }}>MARKETING</span>
              </motion.h2>
            </div>

            <motion.p
              variants={fadeUpVariants}
              className="max-w-2xl mx-auto font-light tracking-[0.4em] uppercase text-sm md:text-base"
              style={{ color: '#3df1f6' }}
            >
              HARNESS THE POWER OF DATA
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="grid md:grid-cols-3 gap-8 pt-12"
            >
              {[
                { icon: Megaphone, title: "Ad Campaigns", desc: "Data-driven advertising across all major platforms" },
                { icon: MessageCircle, title: "SMS & WhatsApp", desc: "Direct communication strategies that convert" },
                { icon: Sparkles, title: "Social Strategy", desc: "Building authentic connections online" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-xl border border-[#3df1f6]/20 p-10 text-left group cursor-pointer hover:bg-[#3df1f6]/10 hover:border-[#3df1f6]/50 transition-all duration-500 rounded-[2rem] shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#3df1f6]/5 blur-3xl -mr-12 -mt-12 group-hover:bg-[#3df1f6]/10 transition-colors" />
                  <item.icon className="w-12 h-12 mb-8 group-hover:scale-110 transition-transform duration-500" style={{ color: '#3df1f6' }} />
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#3df1f6] transition-colors">{item.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Brand Theme Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isMounted && [...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? '#3df1f6' : '#ffffff',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.1, 0.6, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Pre-footer Section (Elevate) */}
      <section id="about-section" className="relative w-full py-32 bg-[#150089] flex flex-col items-center justify-center px-6 text-center overflow-hidden scroll-mt-28">
        {/* Abstract Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] lg:w-[1000px] h-[400px] bg-[#3df1f6] opacity-[0.15] blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight mb-8 leading-[0.9]"
          >
            We Don't Just Create.<br />
            <span style={{ color: '#3df1f6' }}>We Elevate.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-300 font-light max-w-2xl mb-14 leading-relaxed"
          >
            Vertex Media is a full-service creative powerhouse. We transform visions into digital realities, crafting strategies and content that resonate deeply with the Gulf market.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            {/* Small Vertex Icon Circle */}
            <div className="w-12 h-12 rounded-full border border-[#3df1f6]/30 flex items-center justify-center bg-[#150089]/50 backdrop-blur-sm">
              <svg width="24" height="24" viewBox="0 0 396 361" fill="#3df1f6">
                <path transform="matrix(0.06,0,0,0.06,10,8)" d="M95.2 0L55.4 77.3C44.5 98.4 39.1 102.2 39.1 102.2C38.2 102.6 36.3 103.3 27.3 104.8C15 102.6 10.3 99 10.3 99C8.7 97.8 4.1 93.4 0 83.2C2.7 83 9 82 17 76.6C19.5 74 24.1 65.8 24.1 65.8L32.7 49.2C36.8 40.6 39.9 35.2 51.5 15.9C71.7 2.3 95.2 0 95.2 0Z" />
              </svg>
            </div>

            <MagneticButton>
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-[#3df1f6] text-[#150089] font-bold text-xl uppercase tracking-widest overflow-hidden rounded-full hover:scale-105 transition-all duration-300 ease-out cursor-pointer"
              >
                <span className="relative z-10">Let's Talk</span>
                <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* Contact Section (Premium Dark Theme) */}
      <section id="contact" className="py-24 px-6 lg:px-12 bg-gradient-to-b from-[#050505] to-[#150089] relative overflow-hidden">
        {/* لمسات إضاءة نيون في الخلفية */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#3df1f6]/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#3df1f6]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Ready to Elevate?
            </h2>
            <p className="text-[#3df1f6]/80 font-medium">
              Drop your details below and our team will get back to you shortly.
            </p>
          </div>

          {/* الفورم (تصميم زجاجي - Glassmorphism) */}
{/* الفورم شغالة ومربوطة بـ Web3Forms */}
          <form 
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const formData = new FormData(form);
              
              // 🔴 حط الـ Access Key بتاعك هنا بدل الكلمة دي
              formData.append("access_key", "1a4b266f-fef8-4a0c-a290-931a13de75f6");

              // تغيير نص الزرار وقت التحميل
              const btn = form.querySelector('button[type="submit"]') as HTMLButtonElement;
              if (!btn) return;
              
              const originalText = btn.innerText;
              btn.innerText = "Sending...";
              btn.disabled = true;

              try {
                const response = await fetch("https://api.web3forms.com/submit", {
                  method: "POST",
                  body: formData
                });
                const data = await response.json();

                if (data.success) {
                  btn.innerText = "Message Sent! 🚀";
                  btn.classList.add("bg-green-400", "text-gray-900"); // لون أخضر للنجاح
                  form.reset(); // تفريغ الفورم بعد الإرسال
                  setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                    btn.classList.remove("bg-green-400", "text-gray-900");
                  }, 3000);
                }
              } catch (error) {
                console.error(error);
                btn.innerText = "Error! Try again.";
                btn.disabled = false;
              }
            }}
            className="space-y-6 bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-bold text-white/90 ml-2">Name</label>
                {/* ضفنا name="name" هنا */}
                <input 
                  type="text" 
                  name="name"
                  id="name"
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#3df1f6] focus:ring-1 focus:ring-[#3df1f6] transition-all text-white font-medium placeholder-white/30" 
                  placeholder="John Doe" 
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-bold text-white/90 ml-2">Email</label>
                {/* ضفنا name="email" هنا */}
                <input 
                  type="email" 
                  name="email"
                  id="email"
                  required
                  className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#3df1f6] focus:ring-1 focus:ring-[#3df1f6] transition-all text-white font-medium placeholder-white/30" 
                  placeholder="john@example.com" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="block text-sm font-bold text-white/90 ml-2">How can we help?</label>
              {/* ضفنا name="message" هنا */}
              <textarea 
                name="message"
                id="message"
                required
                rows={4} 
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-[#3df1f6] focus:ring-1 focus:ring-[#3df1f6] transition-all text-white font-medium placeholder-white/30 resize-none" 
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <div className="pt-4">
              {/* غيرنا النوع لـ submit */}
              <button 
                type="submit" 
                className="w-full px-10 py-4 bg-[#3df1f6] text-[#150089] font-black text-lg rounded-2xl hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(61,241,246,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:-translate-y-1"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
{/* Footer */}
      <footer className="py-16 px-6 lg:px-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="space-y-12"
          >
            <motion.div variants={fadeUpVariants} className="flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="cursor-pointer"
              >
                <img src="/logo.svg" alt="Vertex Media" className="h-32 w-auto" />
              </motion.div>
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <span className="text-sm text-gray-500">Available for projects</span>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="grid md:grid-cols-3 gap-8 py-8 border-y border-gray-200"
            >
              {/* Phone */}
              <motion.a
                href="tel:+97433343014"
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
              >
                <Phone className="w-5 h-5" style={{ color: '#150089' }} />
                <span className="transition-colors underline-grow" style={{ color: '#150089' }}>+974 3334 3014</span>
              </motion.a>

              {/* Location */}
              <motion.a
                href="https://maps.app.goo.gl/WXa3yD8trJU5Tkrv5?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group cursor-pointer"
                whileHover={{ x: 10 }}
              >
                <MapPin className="w-5 h-5" style={{ color: '#150089' }} />
                <span className="transition-colors underline-grow" style={{ color: '#150089' }}>Doha, Qatar</span>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:info@vertexmediaqa.com"
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
              >
                <Mail className="w-5 h-5" style={{ color: '#150089' }} />
                <span className="transition-colors underline-grow" style={{ color: '#150089' }}>info@vertexmediaqa.com</span>
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <p className="text-sm text-gray-500">
                {new Date().getFullYear()} Vertex Media. All rights reserved.
              </p>
              
              {/* Social Media Links */}
              <div className="flex items-center gap-6">
                {/* Instagram */}
                <MagneticButton>
                  <a href="https://www.instagram.com/vertexmedia.qa?igsh=MXBoNTZwNnltcnF6Zw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#3df1f6]" style={{ color: '#150089' }}>
                    <Instagram className="w-6 h-6" />
                  </a>
                </MagneticButton>
                
                {/* Facebook (Using custom SVG to avoid import issues) */}
                <MagneticButton>
                  <a href="https://www.facebook.com/share/1AufRvvsQa/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#3df1f6]" style={{ color: '#150089' }}>
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </MagneticButton>

                {/* TikTok (Using custom SVG) */}
                <MagneticButton>
                  <a href="https://www.tiktok.com/@vertexmedia.qa?_r=1&_t=ZS-94wJqDXgEkC" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-[#3df1f6]" style={{ color: '#150089' }}>
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
                    </svg>
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/97433343014"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </main>
  )
}
