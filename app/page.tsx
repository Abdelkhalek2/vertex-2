"use client"

import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion"
import { ArrowRight, Phone, MapPin, Mail, Instagram, Linkedin, Menu, Search, ThumbsUp, Sparkles, Megaphone, Calendar, MessageCircle, X } from "lucide-react"
import Link from "next/link"
import { VideoScrubSection } from "@/components/video-scrub-section"
import { useState, useRef, useEffect } from "react"

// Animation Variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const scaleUp = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
}

const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

// Letter by letter animation
const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
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

// Content Is King Section Component - with scrolling image strip inside text
function ContentIsKingSection() {
  return (
    <section className="relative h-[70vh] md:h-[90vh] overflow-hidden bg-gray-100">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Text with Scrolling Image Strip Inside */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center relative">
          {/* SVG with clip path for text masking */}
          <svg
            className="w-[95vw] md:w-[85vw] max-w-[1400px]"
            viewBox="0 0 1000 350"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <clipPath id="contentTextClip">
                <text
                  x="500"
                  y="140"
                  textAnchor="middle"
                  style={{
                    fontSize: '180px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.05em'
                  }}
                >
                  CONTENT
                </text>
                <text
                  x="500"
                  y="310"
                  textAnchor="middle"
                  style={{
                    fontSize: '180px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 900,
                    letterSpacing: '-0.05em'
                  }}
                >
                  IS KING
                </text>
              </clipPath>
            </defs>

            {/* Scrolling images container clipped by text */}
            <g clipPath="url(#contentTextClip)">
              <foreignObject x="-500" y="0" width="2000" height="350">
                <div
                  className="flex h-full animate-scroll-left"
                  style={{ width: '200%' }}
                >
                  {[...contentImages, ...contentImages, ...contentImages, ...contentImages].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt=""
                      className="h-full w-auto object-cover flex-shrink-0"
                      crossOrigin="anonymous"
                      style={{ minWidth: '250px' }}
                    />
                  ))}
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20"
      >
        <MagneticButton>
          <Link
            href="#services"
            className="inline-block bg-white text-black px-10 py-4 text-sm font-medium border border-gray-200 hover:bg-black hover:text-white transition-all duration-300 rounded-full shadow-sm"
          >
            Our Services
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
    }, 5000) // Change every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center">
          {/* Quote Icon */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <svg className="w-16 h-12 mx-auto text-black" viewBox="0 0 64 48" fill="currentColor">
              <path d="M0 48V32C0 14.327 14.327 0 32 0h4v12h-4c-11.046 0-20 8.954-20 20v4h20v12H0zm32 0V32c0-17.673 14.327-32 32-32h4v12h-4c-11.046 0-20 8.954-20 20v4h20v12H32z" transform="rotate(180 32 24)" />
            </svg>
          </motion.div>

          {/* Testimonial Content */}
          <div className="relative min-h-[200px] flex items-center justify-center">
            {/* Left Arrow */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors group"
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="px-16"
              >
                <p className="text-lg md:text-xl lg:text-2xl text-gray-800 leading-relaxed mb-8">
                  {testimonials[currentIndex].quote}
                </p>
                <div>
                  <p className="font-bold text-lg text-black">{testimonials[currentIndex].name}</p>
                  <p className="text-gray-500">{testimonials[currentIndex].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Right Arrow */}
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors group"
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
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-black w-6' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
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
  { title: "CREATIVITY", description: "CREATIVITY IS INVENTING, EXPERIMENTING, GROWING, TAKING RISKS, BREAKING RULES, MAKING MISTAKES." },
  { title: "UNIQUE", description: "IN ORDER TO BE IRREPLACEABLE ONE MUST ALWAYS BE DIFFERENT." },
  { title: "INNOVATION", description: "INNOVATION IS SEEING WHAT EVERYBODY HAS SEEN AND THINKING WHAT NOBODY HAS THOUGHT." },
  { title: "YOUTH", description: "VERTEX IS A POWERFUL COLLECTIVE OF INNOVATIVE MINDS IN THE MIDDLE EAST." },
]

const parallaxImages = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=400&fit=crop",
]

const phoneImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=800&fit=crop",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=800&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=800&fit=crop",
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentPhoneImage, setCurrentPhoneImage] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)

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
    <main className="min-h-screen bg-white text-foreground overflow-x-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-28">
            <Link href="/" className="flex items-center">
              <img src="/logo.svg" alt="Vertex Media" className="h-24 w-auto" />
            </Link>
            <div className="hidden lg:flex items-center gap-10">
              {["Services", "About", "Influencers", "Career", "Contact"].map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 hover:text-black transition-colors underline-grow"
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <MagneticButton>
                <button className="p-2 hover:bg-gray-100 transition-colors rounded-full">
                  <Search className="w-5 h-5" />
                </button>
              </MagneticButton>
              <button
                className="lg:hidden p-2 hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
                {["Services", "About", "Influencers", "Career", "Contact"].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link
                      href={`#${item.toLowerCase()}`}
                      className="text-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen pt-20 relative overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </motion.div>

        <motion.div
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32 relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.p
                variants={fadeUpVariants}
                className="text-sm font-medium text-white/80 tracking-wide"
              >
                2026
              </motion.p>

              <motion.h1
                variants={fadeUpVariants}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] text-white"
              >
                <TextReveal text="Marketing" className="block" />
                <span className="text-primary text-shimmer">Elevated</span>
              </motion.h1>

              <motion.p
                variants={fadeUpVariants}
                className="text-base text-white/80 max-w-md leading-relaxed"
              >
                We are not just creative, we are strategic innovators, creative visionaries, and the driving force behind some of the biggest campaigns in the region.
              </motion.p>

              <motion.div variants={fadeUpVariants}>
                <MagneticButton>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 text-sm font-bold hover:bg-primary/90 transition-colors group animate-pulse-glow"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </MagneticButton>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.3, type: "spring" }}
              className="relative flex items-center justify-center"
            >
              <div className="w-64 h-64 lg:w-96 lg:h-96 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/50 to-transparent rounded-full blur-3xl animate-pulse" />
                <div className="absolute inset-8 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 animate-float">
                  <Sparkles className="w-24 h-24 lg:w-32 lg:h-32 text-white animate-spin-slow" />
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
      <section className="py-16 px-6 lg:px-12 bg-black text-white">
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
                <p className="text-4xl md:text-5xl font-black text-primary">
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
            className="space-y-20"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-6">
                <motion.h2
                  variants={slideInLeft}
                  className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[0.95]"
                >
                  <TextReveal text="New" className="block" />
                  <TextReveal text="Generation" className="block text-primary" />
                </motion.h2>
                <motion.p
                  variants={fadeUpVariants}
                  className="text-gray-600 max-w-lg leading-relaxed"
                >
                  WE CREATE POWERFUL, INNOVATIVE, FUN, AND MEMORABLE CONTENT. OUR COMPANY IS CENTERED ON THE IDEA THAT EVERYTHING THAT YOU COULD POSSIBLY NEED IS AVAILABLE UNDER ONE ROOF.
                </motion.p>
              </div>
              <motion.div
                variants={slideInRight}
                className="flex justify-center lg:justify-end"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="w-40 h-40 lg:w-52 lg:h-52 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl flex items-center justify-center animate-float-slow"
                >
                  <ThumbsUp className="w-20 h-20 lg:w-28 lg:h-28 text-primary" />
                </motion.div>
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
                  <span className="text-2xl font-black text-primary group-hover:scale-125 transition-transform">{service.number}</span>
                  <div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">{service.title}</h3>
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
              >
                <img
                  src={img}
                  alt={`Project ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                  crossOrigin="anonymous"
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
              >
                <img
                  src={img}
                  alt={`Project ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                  crossOrigin="anonymous"
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
                <h3 className="text-sm font-black tracking-wider text-primary group-hover:text-shimmer">
                  {value.title}
                </h3>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.2, duration: 0.8 }}
                  className="h-0.5 bg-gradient-to-r from-primary to-primary/30"
                />
                <p className="text-xs text-gray-500 leading-relaxed uppercase tracking-wide">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Video Scrubbing Section */}
      <VideoScrubSection />

      {/* CONTENT IS KING - Image Slideshow Text Masking */}
      <ContentIsKingSection />

      {/* Services with Phone Mockup */}
      <section id="services" className="py-24 lg:py-32 px-6 lg:px-12" style={{ backgroundColor: '#1a237e' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-center">
            <div className="space-y-12">
              {services.slice(0, 3).map((service, i) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ x: 20, scale: 1.02 }}
                  className="space-y-2 cursor-pointer group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl md:text-5xl font-black text-white group-hover:text-primary transition-colors">{service.number}</span>
                  </div>
                  <motion.div
                    initial={{ width: "30%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="h-px bg-white/30 group-hover:bg-primary transition-colors"
                  />
                  <h3 className="text-lg md:text-xl font-medium text-white pt-2">{service.title}</h3>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 60, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="flex justify-center order-first lg:order-none"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-500 rounded-[3.5rem] blur-xl opacity-30 group-hover:opacity-60 transition-opacity animate-pulse" />
                <div className="relative w-64 md:w-72 bg-gray-800 rounded-[3rem] p-2 shadow-2xl">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-800 rounded-b-2xl z-10" />
                  <div className="relative bg-black rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentPhoneImage}
                        src={phoneImages[currentPhoneImage]}
                        alt="Content Preview"
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                      />
                    </AnimatePresence>
                  </div>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 border-2 border-gray-600 rounded-full" />
                </div>
              </div>
            </motion.div>

            <div className="space-y-12">
              {services.slice(3, 6).map((service, i) => (
                <motion.div
                  key={service.number}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  whileHover={{ x: -20, scale: 1.02 }}
                  className="space-y-2 cursor-pointer group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-4xl md:text-5xl font-black text-white group-hover:text-primary transition-colors">{service.number}</span>
                  </div>
                  <motion.div
                    initial={{ width: "30%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2, duration: 0.8 }}
                    className="h-px bg-white/30 group-hover:bg-primary transition-colors"
                  />
                  <h3 className="text-lg md:text-xl font-medium text-white pt-2">{service.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Influencers Section */}
      <section id="influencers" className="py-24 lg:py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-8">
              <motion.h2
                variants={slideInLeft}
                className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[0.95]"
              >
                <TextReveal text="Influencers and" className="block" />
                <TextReveal text="Creators" className="block text-primary" />
              </motion.h2>
              <motion.p
                variants={fadeUpVariants}
                className="text-gray-600 max-w-md leading-relaxed"
              >
                Want to know why we represent such great talent? Ask us anything... We work with the best creators and influencers across the Middle East and beyond.
              </motion.p>
              <motion.div variants={fadeUpVariants}>
                <MagneticButton>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-3 text-sm font-medium group bg-black text-white px-6 py-3 hover:bg-primary transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </Link>
                </MagneticButton>
              </motion.div>
            </div>

            <motion.div
              variants={slideInRight}
              className="relative"
            >
              <div className="relative h-80 lg:h-96">
                <motion.div
                  animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-0 left-0 w-32 h-32 lg:w-40 lg:h-40 bg-blue-500 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-0 right-0 w-40 h-40 lg:w-52 lg:h-52 bg-primary rounded-full"
                />
                <motion.div
                  animate={{ rotate: [12, 24, 12], scale: [1, 1.05, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 lg:w-32 lg:h-32 bg-yellow-400 rounded-2xl"
                />
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute bottom-10 left-10 flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-white shadow-xl rounded-2xl flex items-center justify-center">
                    <MessageCircle className="w-10 h-10 text-primary" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Talents & Models Section - Yellow with Teal Circle */}
      <section className="relative min-h-[80vh] overflow-hidden" style={{ backgroundColor: '#f5a623' }}>
        <div className="grid lg:grid-cols-2 h-full min-h-[80vh]">
          {/* Left - Model Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[50vh] lg:h-full"
          >
            <img
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1000&fit=crop"
              alt="Fashion Model"
              className="w-full h-full object-cover object-top"
              crossOrigin="anonymous"
            />
          </motion.div>

          {/* Right - Teal Circle with Text */}
          <div className="relative flex items-center justify-center py-16 lg:py-0">
            {/* Teal Circle */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
              className="absolute left-0 lg:-left-20 w-[90vw] lg:w-[50vw] h-[90vw] lg:h-[50vw] max-w-[600px] max-h-[600px] rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#2d7d7d' }}
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
                      className="inline-block px-12 py-4 border-2 border-white text-white font-medium tracking-widest hover:bg-white hover:text-teal-700 transition-all duration-300"
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
          whileInView={{ opacity: 0.3 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-[-5%] left-[30%] w-64 h-64 rounded-full"
          style={{ backgroundColor: '#c4854a' }}
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
                  className="absolute -bottom-6 -right-6 bg-primary text-white p-6"
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
                <TextReveal text="Coordination" className="block text-primary" />
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
      <section className="py-16 bg-white overflow-hidden border-t border-gray-100">
        <div className="relative">
          <div className="flex animate-scroll-left" style={{ width: "200%" }}>
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="flex items-center justify-around min-w-[100%] gap-16 px-8">
                {/* McDonald's */}
                <div className="flex-shrink-0 h-16 w-32 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 100 80" className="h-full w-auto">
                    <path d="M10 80V20C10 10 20 0 30 0C40 0 45 10 50 20C55 10 60 0 70 0C80 0 90 10 90 20V80H75V25C75 20 70 15 70 20V80H55V25C55 20 50 15 50 20V80H45V25C45 20 40 15 40 20V80H25V25C25 20 30 15 30 20V80H10Z" fill="#FFC72C" />
                  </svg>
                </div>
                {/* Volkswagen */}
                <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 100 100" className="h-full w-auto">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="#1E3A8A" strokeWidth="4" />
                    <path d="M25 35L50 70L75 35M35 35L50 60L65 35" fill="none" stroke="#1E3A8A" strokeWidth="4" />
                  </svg>
                </div>
                {/* Red Bull */}
                <div className="flex-shrink-0 h-12 w-28 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-black tracking-tight" style={{ color: '#CC0000' }}>Red Bull</span>
                </div>
                {/* KFC */}
                <div className="flex-shrink-0 h-16 w-16 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <div className="bg-red-600 rounded-full w-14 h-14 flex items-center justify-center">
                    <span className="text-white font-black text-xs">KFC</span>
                  </div>
                </div>
                {/* Amazon */}
                <div className="flex-shrink-0 h-10 w-28 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <span className="text-3xl font-bold tracking-tight text-black">amazon</span>
                </div>
                {/* Dubai Mall */}
                <div className="flex-shrink-0 h-12 w-32 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <div className="text-center">
                    <span className="text-[8px] tracking-[0.3em] text-gray-600 block">THE</span>
                    <span className="text-lg font-bold tracking-wider text-black">DUBAI MALL</span>
                  </div>
                </div>
                {/* Pepsi */}
                <div className="flex-shrink-0 h-14 w-14 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative">
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-red-500"></div>
                    <div className="absolute top-1/3 left-0 right-0 h-1/3 bg-white"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-blue-500"></div>
                  </div>
                </div>
                {/* Nike */}
                <div className="flex-shrink-0 h-10 w-20 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <svg viewBox="0 0 100 40" className="h-8 w-auto">
                    <path d="M10 30C20 30 80 10 95 5C80 15 30 35 10 30Z" fill="#000" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Marketing - Space Theme */}
      <section className="py-24 lg:py-32 gradient-space relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center space-y-12"
          >
            <motion.h2
              variants={scaleUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white glitch-text"
            >
              <TextReveal text="DIGITAL" className="block" />
              <TextReveal text="MARKETING" className="block text-primary" />
            </motion.h2>

            <motion.p
              variants={fadeUpVariants}
              className="text-white/60 max-w-2xl mx-auto text-shimmer"
            >
              HARNESS THE POWER OF DATA
            </motion.p>

            <motion.div
              variants={fadeUpVariants}
              className="grid md:grid-cols-3 gap-6 pt-8"
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
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-left group cursor-pointer hover:bg-white/10 transition-all card-3d"
                >
                  <item.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-125 transition-transform" />
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/50">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(80)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </section>

      {/* Career Section */}
      <section id="career" className="py-24 lg:py-32 px-6 lg:px-12 bg-gray-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center space-y-12"
          >
            <motion.h2
              variants={scaleUp}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight glitch-text"
            >
              <TextReveal text="CREATING" className="block" />
              <TextReveal text="VIRTUAL WORLDS" className="block text-primary" />
            </motion.h2>
            <motion.p
              variants={fadeUpVariants}
              className="text-white/50 max-w-xl mx-auto"
            >
              THE EXCITING WORLD AWAITS THE DRIVEN
            </motion.p>
            <motion.div variants={fadeUpVariants}>
              <MagneticButton>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-3 bg-primary text-black px-10 py-5 text-lg font-bold hover:bg-white transition-colors group animate-pulse-glow"
                >
                  Join Our Team
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-10%",
            }}
            animate={{
              y: [0, "-120vh"],
              x: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          />
        ))}
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-6 lg:px-12 bg-white border-t border-gray-200">
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
              <motion.a
                href="tel:+97433343025"
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
              >
                <Phone className="w-5 h-5 text-primary" />
                <span className="group-hover:text-primary transition-colors underline-grow">+974 3334 3025</span>
              </motion.a>
              <motion.div
                className="flex items-center gap-4"
                whileHover={{ x: 10 }}
              >
                <MapPin className="w-5 h-5 text-primary" />
                <span>Doha, Qatar</span>
              </motion.div>
              <motion.a
                href="mailto:hello@vertexmedia.qa"
                className="flex items-center gap-4 group"
                whileHover={{ x: 10 }}
              >
                <Mail className="w-5 h-5 text-primary" />
                <span className="group-hover:text-primary transition-colors underline-grow">hello@vertexmedia.qa</span>
              </motion.a>
            </motion.div>

            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <p className="text-sm text-gray-500">
                {new Date().getFullYear()} Vertex Media. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <MagneticButton>
                  <a href="https://www.instagram.com/vertexmedia.qa/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                    <Instagram className="w-6 h-6" />
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </MagneticButton>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/97433343025"
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
