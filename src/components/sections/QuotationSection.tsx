'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Phone } from '@/components/ui/Icons'

interface Package {
  name: string
  price: string
  minPrice: number
  maxPrice: number
  delivery: string
  features: string[]
  badge?: string
}

const packages: Package[] = [
  {
    name: 'BASIC',
    price: '₹12,000 – ₹18,000',
    minPrice: 12000,
    maxPrice: 18000,
    delivery: '15 Days',
    features: [
      '4–5 Pages, Static Website',
      'Mobile Responsive Layout',
      'WhatsApp Button & Contact Form',
      'Basic Search Engine Setup',
      '15 Days Delivery Timeline'
    ]
  },
  {
    name: 'MEDIUM',
    price: '₹22,000 – ₹35,000',
    minPrice: 22000,
    maxPrice: 35000,
    delivery: '20–25 Days',
    features: [
      '8–10 Pages, Dynamic/CMS',
      'Custom Admin Panel Integration',
      'Interactive Blog Section',
      'Google Maps & Image Gallery',
      '3 Months Post-Launch Support',
      '20–25 Days Delivery Timeline'
    ],
    badge: 'MOST POPULAR'
  },
  {
    name: 'PREMIUM',
    price: '₹50,000 – ₹1,50,000+',
    minPrice: 50000,
    maxPrice: 150000,
    delivery: '30–40 Days',
    features: [
      'E-Commerce or Booking System',
      'Razorpay Payment Gateway',
      'Full Interactive Admin Dashboard',
      'Advanced SEO + Analytics Suite',
      'Custom Creative UX/UI Design',
      '6 Months Post-Launch Support',
      '30–40 Days Delivery Timeline'
    ],
    badge: 'ENTERPRISE CHOICE'
  }
]

const inclusions = [
  { title: 'UI/UX Design', desc: 'Development begins only after your approval of the custom mockup.' },
  { title: 'Responsive Design', desc: 'Fully optimized for Mobile, Tablet, and Desktop screens.' },
  { title: 'SEO Setup', desc: 'Includes meta tags, sitemaps, schema markup, and robots.txt.' },
  { title: 'Contact Form', desc: 'Email-integrated inquiry or booking forms.' },
  { title: 'Social Integration', desc: 'Instagram, YouTube, and Facebook feeds or embeds.' },
  { title: 'Hosting Guidance', desc: 'Complete setup assistance. Assets registered in client name.' },
  { title: 'CMS Integration', desc: 'WordPress or bespoke admin control dashboards.' },
  { title: 'Speed Optimization', desc: 'Image compression, lazy loading, and CDN setup.' },
  { title: 'SSL & Security', desc: 'HTTPS certificate installation and security hardening.' },
  { title: 'Post-Launch Support', desc: 'Bug fixes and minor edits after system delivery.' }
]

const terms = [
  { num: '01', title: 'Payment Milestones', desc: '30% advance payment is required before project launch, with the remaining balance due upon delivery.' },
  { num: '02', title: 'Revision Limits', desc: 'Revisions are provided according to the selected package. Extra adjustments will be quoted separately.' },
  { num: '03', title: 'Content Sourcing', desc: 'The client must provide logos, copywriting, images, and brand details on time to prevent delays.' },
  { num: '04', title: 'Domain & Hosting', desc: 'Domain name, hosting plan, and commercial stock assets will be purchased directly under the client\'s name.' },
  { num: '05', title: 'Copyright Transfer', desc: 'Full copyright ownership of all final designs and source code transfers to the client upon receipt of final payment.' },
  { num: '06', title: 'Rush Deliveries', desc: 'Emergency or rush projects requesting accelerated delivery will incur an additional 20–30% charge.' }
]

// Videography Data Arrays
interface VideoPackage {
  name: string
  price: string
  minPrice: number
  maxPrice: number
  reelsText: string
  delivery: string
  features: string[]
  badge?: string
}

const videoPackages: VideoPackage[] = [
  {
    name: 'SILVER SHOOT',
    price: '₹8,000 – ₹12,000',
    minPrice: 8000,
    maxPrice: 12000,
    reelsText: '8 to 10 Reels',
    delivery: '1–2 Days',
    features: [
      '1 Camera Operator Setup',
      '4–6 Hours of Shooting',
      'Basic Color Grading',
      '1 Highlight Video (3–5 min)',
      'Full Raw Coverage Edit',
      'Google Drive / Pen Drive Delivery'
    ]
  },
  {
    name: 'GOLD SHOOT',
    price: '₹18,000 – ₹28,000',
    minPrice: 18000,
    maxPrice: 28000,
    reelsText: '15 to 18 Reels',
    delivery: '1–2 Days (depends on work)',
    features: [
      '2 Camera Operators Setup',
      'Full Day Coverage (8–10 hrs)',
      'Cinematic Color Grading',
      '1 Cinematic Film (5–8 min)',
      '1 Short Teaser (60–90 sec)',
      'Background Music Sync',
      'USB Drive + Cloud Link'
    ],
    badge: 'BEST VALUE'
  },
  {
    name: 'DIAMOND SHOOT',
    price: '₹40,000 – ₹80,000+',
    minPrice: 40000,
    maxPrice: 80000,
    reelsText: 'Premium Reels & 25+ Reels',
    delivery: '2–3 Days (depends on work)',
    features: [
      '3+ Camera Setup (Multi-Angle)',
      '2 Days Coverage (if required)',
      'Drone Shoot Included',
      'Gimbal + Slider Shots',
      'Cinematic Film (10–15 min)',
      'Teaser + 3 Reels Included',
      'Professional Lighting Setup',
      'Hard Drive + Private Gallery'
    ],
    badge: 'LUXURY EXPERIENCE'
  }
]

const videoInclusions = [
  { title: '1-3+ Operator Setup', desc: 'Multi-angle cinematic capture using high-end mirrorless kits.' },
  { title: 'Color Grading & LUTS', desc: 'Cinematic grading to bring emotional depth to every single frame.' },
  { title: 'Social Integration', desc: 'Pre-formatted vertical videos for Reels, Shorts, and TikTok.' },
  { title: 'Drone Cinematic Shots', desc: 'Aerial 4K coverage (subject to weather and location guidelines).' },
  { title: 'Sound Design & Sync', desc: 'Ambient sound effects, clear dialogue record, and background music sync.' },
  { title: 'Raw Clip Archives', desc: 'Raw footage collection available upon request on separate drive.' }
]

const videoTerms = [
  { num: '01', title: 'Confirm Booking', desc: 'A 50% advance deposit is required to block scheduled shooting dates.' },
  { num: '02', title: 'Cancellation Policy', desc: 'Cancellations made less than 7 days before the shoot are non-refundable.' },
  { num: '03', title: 'Travel & Lodging', desc: 'Outstation food, accommodation, and travel costs are billed separately.' },
  { num: '04', title: 'Drone Flights', desc: 'Aerial operations are subject to DGCA rules and local clearance permits.' },
  { num: '05', title: 'Final Delivery', desc: 'Edited films and clips take 7–21 working days depending on package.' },
  { num: '06', title: 'Archive Storage', desc: 'Raw files are retained for 30 days. Please request files early.' }
]

const droneOptions = [
  { id: 'none', label: 'No Drone Required', price: 0, desc: 'Not needed' },
  { id: 'basic', label: 'Basic Aerial (30 mins)', price: 3500, desc: '30-min flight, 2–3 locations' },
  { id: 'standard', label: 'Standard Aerial (1 hour)', price: 6000, desc: '1-hour flight, multiple locations, movement shots' },
  { id: 'fullday', label: 'Full Day Aerial (Unlimited)', price: 10000, desc: 'Full-day, 4K footage' }
]

const reelsPricing = [
  { id: 'basic', label: 'Basic Reel (15-30s)', price: 2000, desc: 'Instagram / WhatsApp Status' },
  { id: 'cinematic', label: 'Cinematic Reel (30-60s)', price: 4000, desc: 'Instagram / YouTube Shorts' },
  { id: 'teaser', label: 'Wedding Teaser (60-90s)', price: 6500, desc: 'All Social Platforms' },
  { id: 'music', label: 'Music Reel (60s)', price: 5500, desc: 'Instagram / YouTube sync' },
  { id: 'product', label: 'Product Promo (30-45s)', price: 4750, desc: 'Instagram / Ad Campaigns' },
  { id: 'pack', label: 'Reel Pack (3 x 30s)', price: 8000, desc: 'All Platforms' }
]

const extraAddOns = [
  { id: 'photography', label: 'Photography (Full Day)', price: 3000 },
  { id: 'led', label: 'LED Lighting Setup', price: 2000 },
  { id: 'audio', label: 'Audio Recording', price: 1500 },
  { id: 'sameDay', label: 'Same-Day Edit Reel', price: 2500 },
  { id: 'hardCopy', label: 'Extra Hard Copy', price: 1000 },
  { id: 'night', label: 'Night Shoot Extra', price: 2000 },
  { id: 'travel', label: 'Outstation Travel', price: 3500 },
  { id: 'lut', label: 'Color + LUT Grading', price: 1800 }
]

// Graphic Post Data Arrays
const graphicPackages: Package[] = [
  {
    name: 'SINGLE POST',
    price: '₹400 – ₹500',
    minPrice: 400,
    maxPrice: 500,
    delivery: '1–2 Days',
    features: [
      'Product / Banner Post design',
      '2 Revision Rounds Included',
      'Brand Logo + Watermark inclusion',
      'Instagram / WhatsApp Ready',
      '1080×1080 & Story sizes provided'
    ]
  },
  {
    name: 'FESTIVAL SPECIAL',
    price: '₹700 – ₹1,000',
    minPrice: 700,
    maxPrice: 1000,
    delivery: '1–2 Days',
    features: [
      'Sale / Event Festive Post',
      'Diwali · Navratri · Eid themes',
      'Festive theme custom layout',
      'Offer/Promo Banner highlights',
      'Rush delivery options available'
    ],
    badge: 'FESTIVE BOOST'
  },
  {
    name: 'MONTHLY PACKAGE',
    price: '₹8,000 – ₹10,000',
    minPrice: 8000,
    maxPrice: 10000,
    delivery: 'Monthly Delivery',
    features: [
      '20+ Designed Social Posts',
      'Balanced Story + Feed mixes',
      'WhatsApp Banners Included',
      'Unlimited revisions rounds',
      'Social media grid layout alignment'
    ],
    badge: 'BEST VALUE'
  },
  {
    name: 'CATALOGUE',
    price: '₹300 – ₹600',
    minPrice: 300,
    maxPrice: 600,
    delivery: '2–4 Days',
    features: [
      'Collection Launch Catalogues',
      'Per page custom layout design',
      'Print + Digital ready formats',
      'High-Resolution PDF export',
      'Clear typography & grid'
    ]
  }
]

const graphicInclusions = [
  { title: 'Custom Branding', desc: 'Integration of your brand logo, color palette, and corporate style guidelines.' },
  { title: 'Multi-Format Sizing', desc: 'Every design delivered in standard feed square and story vertical formats.' },
  { title: 'High-Res Exports', desc: 'Crisp output ready for digital displays, printing, and sharing.' },
  { title: 'Stock Assets Included', desc: 'Premium royalty-free graphic assets, icons, and textures used in layouts.' },
  { title: 'Typography Layouts', desc: 'Premium typeface pairings matching your brand identity and voice.' },
  { title: 'Source Files Available', desc: 'Fully layered source files (AI/PSD/Figma) for future internal changes.' }
]

const graphicTerms = [
  { num: '01', title: 'Content Delivery', desc: 'The client must provide exact copy texts, high-quality product images, and vector logos.' },
  { num: '02', title: 'Revision Limits', desc: 'Revisions cover layout edits. Completely new design ideas will require extra fees.' },
  { num: '03', title: 'Stock Licensing', desc: 'Commercial license for included stock assets is provided. Custom fonts require client purchase.' },
  { num: '04', title: 'Project Timelines', desc: 'Turnaround starts from final content delivery, not from booking date.' },
  { num: '05', title: 'Source File License', desc: 'Layered source files are delivered as add-ons, or included in select packages.' },
  { num: '06', title: 'Rush Fees', desc: 'Rush delivery request (within 24 hours) incurs a 20–30% charge on the invoice.' }
]

export default function QuotationSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const inclusionsRef = useRef<HTMLDivElement>(null)
  const packagesRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<HTMLDivElement>(null)
  const termsRef = useRef<HTMLDivElement>(null)

  // Tab State
  const [activeTab, setActiveTab] = useState<'web' | 'video' | 'graphic'>('web')

  // Website Calculator State
  const [selectedPackIndex, setSelectedPackIndex] = useState<number>(1) // Medium default
  const [pagesCount, setPagesCount] = useState<number>(8)
  const [hasCMS, setHasCMS] = useState<boolean>(true)
  const [hasPaymentGateway, setHasPaymentGateway] = useState<boolean>(false)
  const [hasAdvancedSEO, setHasAdvancedSEO] = useState<boolean>(false)
  const [isRushDelivery, setIsRushDelivery] = useState<boolean>(false)
  const [calculatedPrice, setCalculatedPrice] = useState<number>(25000)

  // Videography Calculator State
  const [selectedVideoPackIndex, setSelectedVideoPackIndex] = useState<number>(1) // Gold default
  const [selectedDroneOption, setSelectedDroneOption] = useState<string>('none')
  const [selectedReels, setSelectedReels] = useState<Record<string, number>>({
    basic: 0,
    cinematic: 0,
    teaser: 0,
    music: 0,
    product: 0,
    pack: 0
  })
  const [selectedExtras, setSelectedExtras] = useState<Record<string, boolean>>({
    photography: false,
    led: false,
    audio: false,
    sameDay: false,
    hardCopy: false,
    night: false,
    travel: false,
    lut: false
  })
  const [calculatedVideoPrice, setCalculatedVideoPrice] = useState<number>(18000)

  // Graphic Post Calculator State
  const [selectedGraphicPackIndex, setSelectedGraphicPackIndex] = useState<number>(0)
  const [graphicQuantity, setGraphicQuantity] = useState<number>(1)
  const [graphicExtras, setGraphicExtras] = useState<Record<string, boolean>>({
    sourceFile: false,
    rushDelivery: false,
    animated: false,
    copywriting: false,
    abTesting: false
  })
  const [calculatedGraphicPrice, setCalculatedGraphicPrice] = useState<number>(400)

  // Price Display Animator State
  const [priceDisplay, setPriceDisplay] = useState<number>(25000)

  // Refresh ScrollTrigger when tab shifts to avoid layout offset bugs
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [activeTab])

  // Website Math
  useEffect(() => {
    let basePrice = packages[selectedPackIndex].minPrice
    const defaultPages = selectedPackIndex === 0 ? 5 : selectedPackIndex === 1 ? 10 : 15
    if (pagesCount > defaultPages) {
      basePrice += (pagesCount - defaultPages) * 1800
    }
    if (hasCMS && selectedPackIndex === 0) basePrice += 8000
    if (hasPaymentGateway && selectedPackIndex !== 2) basePrice += 10000
    if (hasAdvancedSEO && selectedPackIndex !== 2) basePrice += 5000
    if (isRushDelivery) {
      basePrice = Math.round(basePrice * 1.25)
    }
    setCalculatedPrice(basePrice)
  }, [selectedPackIndex, pagesCount, hasCMS, hasPaymentGateway, hasAdvancedSEO, isRushDelivery])

  // Videography Math
  useEffect(() => {
    let basePrice = videoPackages[selectedVideoPackIndex].minPrice

    const drone = droneOptions.find(o => o.id === selectedDroneOption)
    if (drone) {
      basePrice += drone.price
    }

    Object.keys(selectedReels).forEach(key => {
      const qty = selectedReels[key] || 0
      const reelInfo = reelsPricing.find(r => r.id === key)
      if (reelInfo && qty > 0) {
        basePrice += reelInfo.price * qty
      }
    })

    Object.keys(selectedExtras).forEach(key => {
      const isChecked = selectedExtras[key] || false
      const extraInfo = extraAddOns.find(e => e.id === key)
      if (extraInfo && isChecked) {
        basePrice += extraInfo.price
      }
    })

    setCalculatedVideoPrice(basePrice)
  }, [selectedVideoPackIndex, selectedDroneOption, selectedReels, selectedExtras])

  // Graphic Math
  useEffect(() => {
    const pack = graphicPackages[selectedGraphicPackIndex]
    let basePrice = pack.minPrice * graphicQuantity

    const isMonthly = selectedGraphicPackIndex === 2

    if (graphicExtras.sourceFile) {
      basePrice += isMonthly ? 2000 * graphicQuantity : 500 * graphicQuantity
    }
    if (graphicExtras.animated) {
      basePrice += isMonthly ? 4500 * graphicQuantity : 600 * graphicQuantity
    }
    if (graphicExtras.copywriting) {
      basePrice += isMonthly ? 1200 * graphicQuantity : 150 * graphicQuantity
    }
    if (graphicExtras.abTesting) {
      basePrice += isMonthly ? 3000 * graphicQuantity : 400 * graphicQuantity
    }
    if (graphicExtras.rushDelivery) {
      basePrice = Math.round(basePrice * 1.30) // +30% rush charges
    }

    setCalculatedGraphicPrice(basePrice)
  }, [selectedGraphicPackIndex, graphicQuantity, graphicExtras])

  // Ticking number counter effect (animates to targeted calculated cost)
  useEffect(() => {
    let start = priceDisplay
    const end = activeTab === 'web' 
      ? calculatedPrice 
      : activeTab === 'video' 
        ? calculatedVideoPrice 
        : calculatedGraphicPrice
    if (start === end) return

    const duration = 0.8
    const obj = { val: start }

    const tween = gsap.to(obj, {
      val: end,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        setPriceDisplay(Math.round(obj.val))
      }
    })
    return () => {
      tween.kill()
    }
  }, [calculatedPrice, calculatedVideoPrice, calculatedGraphicPrice, activeTab])

  // Tab-change card animation effect (forces render visibility when swapping tabs)
  useEffect(() => {
    const incGrid = inclusionsRef.current
    const packGrid = packagesRef.current
    const termsGrid = termsRef.current

    if (incGrid) {
      const items = incGrid.querySelectorAll('.inclusion-card')
      gsap.killTweensOf(items)
      gsap.fromTo(items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out'
        }
      )
    }

    if (packGrid) {
      const cards = packGrid.querySelectorAll('.package-card')
      gsap.killTweensOf(cards)
      gsap.fromTo(cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          stagger: 0.08,
          ease: 'power3.out'
        }
      )
    }

    if (termsGrid) {
      const cards = termsGrid.querySelectorAll('.term-card')
      gsap.killTweensOf(cards)
      gsap.fromTo(cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: 'power3.out'
        }
      )
    }
  }, [activeTab])

  // Reset calculator defaults on baseline select
  const handlePackSelect = (idx: number) => {
    setSelectedPackIndex(idx)
    if (idx === 0) {
      setPagesCount(5)
      setHasCMS(false)
    } else if (idx === 1) {
      setPagesCount(10)
      setHasCMS(true)
    } else {
      setPagesCount(15)
      setHasCMS(true)
      setHasPaymentGateway(true)
      setHasAdvancedSEO(true)
    }
  }

  const handleGraphicPackSelect = (idx: number) => {
    setSelectedGraphicPackIndex(idx)
    if (idx === 0) setGraphicQuantity(1)
    else if (idx === 1) setGraphicQuantity(1)
    else if (idx === 2) setGraphicQuantity(1)
    else if (idx === 3) setGraphicQuantity(5)
  }

  // Scroll animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const container = containerRef.current
    const wrapper = wrapperRef.current
    const header = headerRef.current
    const packGrid = packagesRef.current
    const calcBlock = calculatorRef.current

    if (container && wrapper && header) {
      // 1. Entrance reveals (Triggered once)
      gsap.fromTo(header,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 90%',
            toggleActions: 'play none none reverse'
          }
        }
      )

      if (calcBlock) {
        gsap.fromTo(calcBlock,
          { opacity: 0, scale: 0.98, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.5,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: calcBlock,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      }

      // 2. Parallax Motion Scrub
      gsap.to(header, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      })

      if (packGrid) {
        gsap.to(packGrid, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2
          }
        })
      }

      // 3. Unified Cinematic Entrance & Exit Scroll Scrub Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        }
      })

      tl.fromTo(wrapper,
        { opacity: 0, scale: 0.98, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'none' }
      )
      .to(wrapper, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 3,
        ease: 'none'
      })
      .to(wrapper, {
        opacity: 0,
        scale: 0.98,
        y: -50,
        duration: 1,
        ease: 'none'
      })
    }
  }, [])

  return (
    <section
      ref={containerRef}
      id="quotation"
      className="relative min-h-screen py-[150px] px-6 md:px-[80px] bg-transparent overflow-hidden animate-[fadeIn_1.5s_ease-out]"
    >
      <div className="quotation-bg absolute inset-0 bg-transparent pointer-events-none z-0" />

      {/* Asymmetric layouts wrapped for scroll-scrub exit */}
      <div
        ref={wrapperRef}
        className="relative z-10 max-w-[1280px] mx-auto w-full flex flex-col gap-24"
      >
        
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex flex-col md:flex-row md:items-end justify-between text-left border-b border-white/20 pb-12 opacity-0"
        >
          <div className="flex flex-col items-start max-w-xl">
            <span className="font-body text-[9px] tracking-[0.45em] text-white uppercase mb-6 font-semibold">
              QUOTATION SYSTEM /
            </span>
            <h2
              className="font-display text-white font-light leading-[1.08] tracking-tight mb-4 text-left"
              style={{
                fontSize: 'clamp(36px, 5.2vw, 68px)',
              }}
            >
              {activeTab === 'web' ? 'Website Development' : activeTab === 'video' ? 'Videography Production' : 'Graphic Post Design'} <br />
              Quotation.
            </h2>
            <p className="font-body font-normal text-[14px] text-white tracking-wider uppercase mt-4">
              By Balaji Enterprise
            </p>
          </div>
          
          <div className="mt-8 md:mt-0 flex flex-col items-start md:items-end text-left md:text-right font-body text-[13px] text-white">
            <span className="text-[9px] tracking-[0.25em] text-white/90 uppercase mb-1 font-semibold">REPRESENTATIVE</span>
            <span className="font-display text-white text-[17px] tracking-wide mb-3 font-semibold">Jhon Chavda</span>
            <a 
              href="tel:+918511102774" 
              className="group/phone flex items-center gap-2 hover:text-white transition-colors duration-250 font-mono text-[12px] bg-black/80 px-4 py-2.5 border border-white/30 rounded-[30px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
            >
              <Phone size={10} className="text-white group-hover/phone:text-white group-hover/phone:scale-105 transition-all duration-250" />
              <span>+91 85111 02774</span>
            </a>
          </div>
        </div>

        {/* Dynamic Tab Switcher */}
        <div className="flex justify-center w-full -mt-8">
          <div className="relative flex p-1.5 rounded-[30px] border border-white/20 bg-black/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] max-w-[640px] w-full">
            {/* Slide pill highlight */}
            <div 
              className="absolute top-1.5 bottom-1.5 rounded-[24px] bg-white transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                left: activeTab === 'web' ? '6px' : activeTab === 'video' ? 'calc(33.33% + 2px)' : 'calc(66.66% + 2px)',
                width: 'calc(33.33% - 8px)',
                boxShadow: '0 4px 15px rgba(255, 255, 255, 0.25)'
              }}
            />
            <button
              onClick={() => {
                setActiveTab('web')
                setPriceDisplay(calculatedPrice)
              }}
              className={`relative z-10 flex-1 py-3 text-[9px] md:text-[10px] tracking-[0.18em] md:tracking-[0.25em] uppercase font-bold text-center transition-colors duration-400 cursor-pointer ${
                activeTab === 'web' ? 'text-black' : 'text-white hover:text-white/80'
              }`}
            >
              WEBSITE DEVELOPMENT
            </button>
            <button
              onClick={() => {
                setActiveTab('video')
                setPriceDisplay(calculatedVideoPrice)
              }}
              className={`relative z-10 flex-1 py-3 text-[9px] md:text-[10px] tracking-[0.18em] md:tracking-[0.25em] uppercase font-bold text-center transition-colors duration-400 cursor-pointer ${
                activeTab === 'video' ? 'text-black' : 'text-white hover:text-white/80'
              }`}
            >
              VIDEOGRAPHY SHOOT
            </button>
            <button
              onClick={() => {
                setActiveTab('graphic')
                setPriceDisplay(calculatedGraphicPrice)
              }}
              className={`relative z-10 flex-1 py-3 text-[9px] md:text-[10px] tracking-[0.18em] md:tracking-[0.25em] uppercase font-bold text-center transition-colors duration-400 cursor-pointer ${
                activeTab === 'graphic' ? 'text-black' : 'text-white hover:text-white/80'
              }`}
            >
              GRAPHIC POST
            </button>
          </div>
        </div>

        {/* 1. What's Included Grid */}
        <div className="flex flex-col items-start text-left gap-10">
          <h3 className="font-display text-[22px] tracking-[0.1em] text-white uppercase font-semibold">
            01 / Standard Features &amp; Inclusions
          </h3>
          
          <div
            ref={inclusionsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {activeTab === 'web' ? (
              inclusions.map((inc, i) => (
                <div
                  key={inc.title}
                  className="inclusion-card group flex flex-col p-6 rounded-[4px] border border-white/20 bg-[#0d0d14]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:border-white/40 transition-all duration-400 hover:bg-[#12121c]/95 text-left opacity-0"
                >
                  <div className="flex items-center gap-4 mb-3.5">
                    <span className="font-mono text-[10px] text-white font-bold">
                      {(i+1).toString().padStart(2, '0')}
                    </span>
                    <h4 className="font-display text-[15px] text-white font-semibold group-hover:translate-x-1.5 transition-all duration-300">
                      {inc.title}
                    </h4>
                  </div>
                  <p className="font-body font-light text-[13px] text-white/90 leading-[1.6] group-hover:text-white transition-colors duration-300">
                    {inc.desc}
                  </p>
                </div>
              ))
            ) : activeTab === 'video' ? (
              videoInclusions.map((inc, i) => (
                <div
                  key={inc.title}
                  className="inclusion-card group flex flex-col p-6 rounded-[4px] border border-white/20 bg-[#0d0d14]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:border-white/40 transition-all duration-400 hover:bg-[#12121c]/95 text-left opacity-0"
                >
                  <div className="flex items-center gap-4 mb-3.5">
                    <span className="font-mono text-[10px] text-white font-bold">
                      {(i+1).toString().padStart(2, '0')}
                    </span>
                    <h4 className="font-display text-[15px] text-white font-semibold group-hover:translate-x-1.5 transition-all duration-300">
                      {inc.title}
                    </h4>
                  </div>
                  <p className="font-body font-light text-[13px] text-white/90 leading-[1.6] group-hover:text-white transition-colors duration-300">
                    {inc.desc}
                  </p>
                </div>
              ))
            ) : (
              graphicInclusions.map((inc, i) => (
                <div
                  key={inc.title}
                  className="inclusion-card group flex flex-col p-6 rounded-[4px] border border-white/20 bg-[#0d0d14]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)] hover:border-white/40 transition-all duration-400 hover:bg-[#12121c]/95 text-left opacity-0"
                >
                  <div className="flex items-center gap-4 mb-3.5">
                    <span className="font-mono text-[10px] text-white font-bold">
                      {(i+1).toString().padStart(2, '0')}
                    </span>
                    <h4 className="font-display text-[15px] text-white font-semibold group-hover:translate-x-1.5 transition-all duration-300">
                      {inc.title}
                    </h4>
                  </div>
                  <p className="font-body font-light text-[13px] text-white/90 leading-[1.6] group-hover:text-white transition-colors duration-300">
                    {inc.desc}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 2. Flat Packages */}
        <div className="flex flex-col items-start text-left gap-10">
          <h3 className="font-display text-[22px] tracking-[0.1em] text-white uppercase font-semibold">
            02 / Packages &amp; Structure
          </h3>

          <div
            ref={packagesRef}
            className="grid lg:grid-cols-3 gap-8 w-full items-stretch"
          >
            {activeTab === 'web' ? (
              packages.map((pkg, idx) => (
                <div
                  key={pkg.name}
                  className={`package-card flex flex-col justify-between p-8 rounded-[4px] border transition-all duration-500 hover:scale-[1.01] relative opacity-0 ${
                    pkg.badge 
                      ? 'border-white/45 bg-[#0f0f18]/98 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.05)]' 
                      : 'border-white/20 bg-[#0d0d14]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]'
                  }`}
                >
                  {pkg.badge && (
                    <span className="absolute -top-3.5 left-8 font-body text-[8px] tracking-[0.3em] bg-white text-black px-4 py-1.5 rounded-[30px] font-bold uppercase">
                      {pkg.badge}
                    </span>
                  )}
                  
                  <div className="flex flex-col items-start">
                    <span className="font-body text-[10px] tracking-[0.35em] text-white uppercase mb-2 font-semibold">
                      {pkg.name}
                    </span>
                    <div className="font-display text-[26px] md:text-[32px] text-white font-normal mb-1 leading-none tracking-tight">
                      {pkg.price}
                    </div>
                    <span className="font-body text-[11px] text-white/90 tracking-wide mb-8">
                      Timeline: {pkg.delivery}
                    </span>
                    
                    <div className="w-full h-[1px] bg-white/30 mb-8" />
                    
                    <ul className="flex flex-col gap-4 text-left w-full">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-start text-[13px] font-body font-light text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 mr-3 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-12 w-full">
                    <button 
                      onClick={() => handlePackSelect(idx)}
                      className="w-full py-3.5 bg-transparent border border-white/40 hover:border-white text-white font-body text-[10px] tracking-[0.25em] rounded-[4px] cursor-pointer uppercase transition-all duration-300 hover:bg-white hover:text-black font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    >
                      Select in Estimator
                    </button>
                  </div>
                </div>
              ))
            ) : activeTab === 'video' ? (
              videoPackages.map((pkg, idx) => (
                <div
                  key={pkg.name}
                  className={`package-card flex flex-col justify-between p-8 rounded-[4px] border transition-all duration-500 hover:scale-[1.01] relative opacity-0 ${
                    pkg.badge 
                      ? 'border-white/45 bg-[#0f0f18]/98 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.05)]' 
                      : 'border-white/20 bg-[#0d0d14]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]'
                  }`}
                >
                  {pkg.badge && (
                    <span className="absolute -top-3.5 left-8 font-body text-[8px] tracking-[0.3em] bg-white text-black px-4 py-1.5 rounded-[30px] font-bold uppercase">
                      {pkg.badge}
                    </span>
                  )}
                  
                  <div className="flex flex-col items-start">
                    <span className="font-body text-[10px] tracking-[0.35em] text-white uppercase mb-2 font-semibold">
                      {pkg.name}
                    </span>
                    <div className="font-display text-[26px] md:text-[32px] text-white font-normal mb-1 leading-none tracking-tight">
                      {pkg.price}
                    </div>
                    <div className="flex flex-col gap-1 text-left font-body text-[11px] text-white/90 mb-8">
                      <span>Timeline: {pkg.delivery}</span>
                      <span>Included: {pkg.reelsText}</span>
                    </div>
                    
                    <div className="w-full h-[1px] bg-white/30 mb-8" />
                    
                    <ul className="flex flex-col gap-4 text-left w-full">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-start text-[13px] font-body font-light text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 mr-3 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-12 w-full">
                    <button 
                      onClick={() => setSelectedVideoPackIndex(idx)}
                      className="w-full py-3.5 bg-transparent border border-white/40 hover:border-white text-white font-body text-[10px] tracking-[0.25em] rounded-[4px] cursor-pointer uppercase transition-all duration-300 hover:bg-white hover:text-black font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    >
                      Select in Estimator
                    </button>
                  </div>
                </div>
              ))
            ) : (
              graphicPackages.map((pkg, idx) => (
                <div
                  key={pkg.name}
                  className={`package-card flex flex-col justify-between p-8 rounded-[4px] border transition-all duration-500 hover:scale-[1.01] relative opacity-0 ${
                    pkg.badge 
                      ? 'border-white/45 bg-[#0f0f18]/98 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_0_30px_rgba(255,255,255,0.05)]' 
                      : 'border-white/20 bg-[#0d0d14]/95 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]'
                  }`}
                >
                  {pkg.badge && (
                    <span className="absolute -top-3.5 left-8 font-body text-[8px] tracking-[0.3em] bg-white text-black px-4 py-1.5 rounded-[30px] font-bold uppercase">
                      {pkg.badge}
                    </span>
                  )}
                  
                  <div className="flex flex-col items-start">
                    <span className="font-body text-[10px] tracking-[0.35em] text-white uppercase mb-2 font-semibold">
                      {pkg.name}
                    </span>
                    <div className="font-display text-[26px] md:text-[32px] text-white font-normal mb-1 leading-none tracking-tight">
                      {pkg.price}
                    </div>
                    <span className="font-body text-[11px] text-white/90 tracking-wide mb-8">
                      Timeline: {pkg.delivery}
                    </span>
                    
                    <div className="w-full h-[1px] bg-white/30 mb-8" />
                    
                    <ul className="flex flex-col gap-4 text-left w-full">
                      {pkg.features.map((feat) => (
                        <li key={feat} className="flex items-start text-[13px] font-body font-light text-white">
                          <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 mr-3 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-12 w-full">
                    <button 
                      onClick={() => handleGraphicPackSelect(idx)}
                      className="w-full py-3.5 bg-transparent border border-white/40 hover:border-white text-white font-body text-[10px] tracking-[0.25em] rounded-[4px] cursor-pointer uppercase transition-all duration-300 hover:bg-white hover:text-black font-semibold shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    >
                      Select in Estimator
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 3. Dynamic Calculator (Magical Element) */}
        <div className="flex flex-col items-start text-left gap-10">
          <div className="flex flex-col items-start">
            <h3 className="font-display text-[22px] tracking-[0.1em] text-white uppercase mb-2 font-semibold">
              03 / Interactive Quotation Builder
            </h3>
            <p className="font-body text-[12px] text-white/90 font-medium">
              Customize variables below to generate an instantaneous architectural fee estimate.
            </p>
          </div>

          <div
            ref={calculatorRef}
            className="w-full border border-white/25 rounded-[6px] bg-[#08080c]/98 p-6 md:p-12 grid lg:grid-cols-12 gap-10 items-start opacity-0 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_15px_50px_rgba(0,0,0,0.9)] animate-[fadeIn_1.2s_ease-out]"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
          >
            {/* Controls */}
            {activeTab === 'web' ? (
              <div className="lg:col-span-7 flex flex-col gap-8 text-left w-full">
                
                {/* Package Select buttons */}
                <div className="flex flex-col gap-3">
                  <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase font-bold">
                    Select Package Baseline
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {packages.map((pkg, idx) => (
                      <button
                        key={pkg.name}
                        onClick={() => handlePackSelect(idx)}
                        className={`py-3.5 border text-center font-body text-[10px] tracking-wider rounded-[4px] cursor-pointer uppercase transition-all duration-300 ${
                          selectedPackIndex === idx
                            ? 'border-white bg-white text-black font-extrabold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                            : 'border-white/35 text-white bg-transparent hover:border-white/60 hover:bg-white/10'
                        }`}
                      >
                        {pkg.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pages count slider */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-baseline">
                    <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase font-bold">
                      Target Pages Count
                    </label>
                    <span className="font-mono text-white text-[16px] font-bold">
                      {pagesCount} Pages
                    </span>
                  </div>
                  
                  <input
                    type="range"
                    min="2"
                    max="30"
                    value={pagesCount}
                    onChange={(e) => setPagesCount(parseInt(e.target.value))}
                    className="w-full accent-white h-[2px] bg-white/30 rounded-lg appearance-none cursor-pointer"
                  />
                  
                  <div className="flex justify-between text-[10px] font-body text-white font-medium">
                    <span>2 PAGES</span>
                    <span>30 PAGES</span>
                  </div>
                </div>

                {/* Add-on features */}
                <div className="flex flex-col gap-3">
                  <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase mb-1 font-bold">
                    Architectural Add-ons
                  </label>
                  
                  <div className="flex flex-col gap-3.5">
                    {/* CMS Toggle */}
                    <label className="flex items-center justify-between border border-white/20 rounded-[4px] p-4 cursor-pointer bg-black/60 hover:bg-[#12121c]/90 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-display text-[13px] text-white font-bold">Custom Admin Panel / CMS</span>
                        <span className="font-body text-[10px] text-white/90 text-left font-light">Dynamic content controls, blogs, galleries</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={hasCMS}
                        disabled={selectedPackIndex > 0}
                        onChange={(e) => setHasCMS(e.target.checked)}
                        className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                      />
                    </label>

                    {/* Payment Gateway Toggle */}
                    <label className="flex items-center justify-between border border-white/20 rounded-[4px] p-4 cursor-pointer bg-black/60 hover:bg-[#12121c]/90 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-display text-[13px] text-white font-bold">Razorpay Payment Gateway</span>
                        <span className="font-body text-[10px] text-white/90 text-left font-light">Collect digital payments, subscriptions, invoices</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={hasPaymentGateway}
                        disabled={selectedPackIndex === 2}
                        onChange={(e) => setHasPaymentGateway(e.target.checked)}
                        className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                      />
                    </label>

                    {/* Advanced SEO Toggle */}
                    <label className="flex items-center justify-between border border-white/20 rounded-[4px] p-4 cursor-pointer bg-black/60 hover:bg-[#12121c]/90 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-display text-[13px] text-white font-bold">Advanced SEO &amp; Analytics</span>
                        <span className="font-body text-[10px] text-white/90 text-left font-light">Schema schemas, key terms, custom Google analytics</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={hasAdvancedSEO}
                        disabled={selectedPackIndex === 2}
                        onChange={(e) => setHasAdvancedSEO(e.target.checked)}
                        className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                      />
                    </label>

                    {/* Emergency Rush Delivery Toggle */}
                    <label className="flex items-center justify-between border border-white/35 rounded-[4px] p-4 cursor-pointer bg-black/80 hover:bg-[#12121c]/90 transition-all duration-300 border-dashed shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-display text-[13px] text-white font-extrabold">Priority Rush Delivery (+25%)</span>
                        <span className="font-body text-[10px] text-white/90 text-left font-light">Deliver in approx. half the standard timelines</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isRushDelivery}
                        onChange={(e) => setIsRushDelivery(e.target.checked)}
                        className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                      />
                    </label>
                  </div>

                </div>

              </div>
            ) : activeTab === 'video' ? (
              <div className="lg:col-span-7 flex flex-col gap-8 text-left w-full">
                
                {/* Package Select buttons */}
                <div className="flex flex-col gap-3">
                  <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase font-bold">
                    Select Shoot Baseline
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {videoPackages.map((pkg, idx) => (
                      <button
                        key={pkg.name}
                        onClick={() => setSelectedVideoPackIndex(idx)}
                        className={`py-3.5 border text-center font-body text-[10px] tracking-wider rounded-[4px] cursor-pointer uppercase transition-all duration-300 ${
                          selectedVideoPackIndex === idx
                            ? 'border-white bg-white text-black font-extrabold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                            : 'border-white/35 text-white bg-transparent hover:border-white/60 hover:bg-white/10'
                        }`}
                      >
                        {pkg.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Drone Add-On Option */}
                <div className="flex flex-col gap-3">
                  <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase font-bold">
                    Drone Aerial Shoot Option
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDroneOption}
                      onChange={(e) => setSelectedDroneOption(e.target.value)}
                      className="w-full px-4 py-3.5 border border-white/20 rounded-[4px] bg-[#0c0c12]/95 text-white font-body text-[13px] appearance-none cursor-pointer focus:border-white outline-none shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                    >
                      {droneOptions.map((opt) => (
                        <option key={opt.id} value={opt.id} className="bg-[#0c0c12] text-white">
                          {opt.label} {opt.price > 0 ? `(+₹${opt.price.toLocaleString()})` : ''}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-white/50 text-[10px]">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Reels counters */}
                <div className="flex flex-col gap-4">
                  <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase font-bold">
                    Instagram Reels &amp; Shorts Add-ons
                  </label>
                  <div className="grid md:grid-cols-2 gap-4">
                    {reelsPricing.map((reel) => {
                      const qty = selectedReels[reel.id] || 0
                      return (
                        <div 
                          key={reel.id}
                          className="flex items-center justify-between border border-white/20 rounded-[4px] p-4 bg-black/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                        >
                          <div className="flex flex-col items-start gap-1">
                            <span className="font-display text-[13px] text-white font-bold">{reel.label}</span>
                            <span className="font-body text-[10px] text-white/90">₹{reel.price.toLocaleString()} each</span>
                          </div>
                          
                          {/* Counter controls */}
                          <div className="flex items-center gap-3 border border-white/35 rounded-[30px] px-3 py-1.5 bg-black/40">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedReels(prev => ({
                                  ...prev,
                                  [reel.id]: Math.max(0, qty - 1)
                                }))
                              }}
                              className="text-white hover:text-white/70 cursor-pointer font-bold w-4 h-4 flex items-center justify-center text-[14px] select-none"
                            >
                              -
                            </button>
                            <span className="font-mono text-white text-[12px] font-bold w-4 text-center">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedReels(prev => ({
                                  ...prev,
                                  [reel.id]: qty + 1
                                }))
                              }}
                              className="text-white hover:text-white/70 cursor-pointer font-bold w-4 h-4 flex items-center justify-center text-[14px] select-none"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Extra Add-ons Checkboxes */}
                <div className="flex flex-col gap-3">
                  <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase mb-1 font-bold">
                    Videography Extra Customizations
                  </label>
                  
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    {extraAddOns.map((extra) => (
                      <label 
                        key={extra.id}
                        className="flex items-center justify-between border border-white/20 rounded-[4px] p-4 cursor-pointer bg-black/60 hover:bg-[#12121c]/90 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                      >
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-display text-[13px] text-white font-bold">{extra.label}</span>
                          <span className="font-body text-[10px] text-white/90">+{extra.price > 0 ? `₹${extra.price.toLocaleString()}` : 'Free'}</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={selectedExtras[extra.id] || false}
                          onChange={(e) => {
                            setSelectedExtras(prev => ({
                              ...prev,
                              [extra.id]: e.target.checked
                            }))
                          }}
                          className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                        />
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="lg:col-span-7 flex flex-col gap-8 text-left w-full">
                
                {/* Package Select buttons */}
                <div className="flex flex-col gap-3">
                  <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase font-bold">
                    Select Graphic Package Baseline
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {graphicPackages.map((pkg, idx) => (
                      <button
                        key={pkg.name}
                        onClick={() => handleGraphicPackSelect(idx)}
                        className={`py-3.5 border text-center font-body text-[9px] tracking-wide rounded-[4px] cursor-pointer uppercase transition-all duration-300 ${
                          selectedGraphicPackIndex === idx
                            ? 'border-white bg-white text-black font-extrabold shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                            : 'border-white/35 text-white bg-transparent hover:border-white/60 hover:bg-white/10'
                        }`}
                      >
                        {pkg.name.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dynamic Quantity Selector */}
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-baseline">
                    <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase font-bold">
                      {selectedGraphicPackIndex === 0
                        ? 'Number of Product Posts'
                        : selectedGraphicPackIndex === 1
                        ? 'Number of Festive Posts'
                        : selectedGraphicPackIndex === 2
                        ? 'Number of Months'
                        : 'Number of Catalogue Pages'}
                    </label>
                    <span className="font-mono text-white text-[16px] font-bold">
                      {graphicQuantity} {selectedGraphicPackIndex === 2 ? (graphicQuantity === 1 ? 'Month' : 'Months') : selectedGraphicPackIndex === 3 ? (graphicQuantity === 1 ? 'Page' : 'Pages') : (graphicQuantity === 1 ? 'Post' : 'Posts')}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setGraphicQuantity(prev => Math.max(1, prev - 1))}
                      className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 font-bold text-[18px] select-none cursor-pointer"
                    >
                      -
                    </button>
                    <input
                      type="range"
                      min="1"
                      max={selectedGraphicPackIndex === 2 ? 12 : 50}
                      value={graphicQuantity}
                      onChange={(e) => setGraphicQuantity(parseInt(e.target.value))}
                      className="flex-1 accent-white h-[2px] bg-white/30 rounded-lg appearance-none cursor-pointer"
                    />
                    <button
                      type="button"
                      onClick={() => setGraphicQuantity(prev => Math.min(selectedGraphicPackIndex === 2 ? 12 : 50, prev + 1))}
                      className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 font-bold text-[18px] select-none cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Graphic Design Extras checkboxes */}
                <div className="flex flex-col gap-3">
                  <label className="font-body text-[10px] tracking-[0.3em] text-white uppercase mb-1 font-bold">
                    Graphic Design Extra Customizations
                  </label>
                  
                  <div className="grid sm:grid-cols-2 gap-3.5">
                    {/* Source File */}
                    <label className="flex items-center justify-between border border-white/20 rounded-[4px] p-4 cursor-pointer bg-black/60 hover:bg-[#12121c]/90 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-display text-[13px] text-white font-bold">Source File Delivery</span>
                        <span className="font-body text-[10px] text-white/90">
                          +{selectedGraphicPackIndex === 2 ? '₹2,000 /mo' : '₹500 /unit'}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={graphicExtras.sourceFile}
                        onChange={(e) => setGraphicExtras(prev => ({ ...prev, sourceFile: e.target.checked }))}
                        className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                      />
                    </label>

                    {/* Motion/Animated Post */}
                    <label className="flex items-center justify-between border border-white/20 rounded-[4px] p-4 cursor-pointer bg-black/60 hover:bg-[#12121c]/90 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-display text-[13px] text-white font-bold">Motion Graphics / GIF</span>
                        <span className="font-body text-[10px] text-white/90">
                          +{selectedGraphicPackIndex === 2 ? '₹4,500 /mo' : '₹600 /unit'}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={graphicExtras.animated}
                        onChange={(e) => setGraphicExtras(prev => ({ ...prev, animated: e.target.checked }))}
                        className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                      />
                    </label>

                    {/* Copywriting */}
                    <label className="flex items-center justify-between border border-white/20 rounded-[4px] p-4 cursor-pointer bg-black/60 hover:bg-[#12121c]/90 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-display text-[13px] text-white font-bold">Engaging Copywriting</span>
                        <span className="font-body text-[10px] text-white/90">
                          +{selectedGraphicPackIndex === 2 ? '₹1,200 /mo' : '₹150 /unit'}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={graphicExtras.copywriting}
                        onChange={(e) => setGraphicExtras(prev => ({ ...prev, copywriting: e.target.checked }))}
                        className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                      />
                    </label>

                    {/* A/B Testing Variant */}
                    <label className="flex items-center justify-between border border-white/20 rounded-[4px] p-4 cursor-pointer bg-black/60 hover:bg-[#12121c]/90 transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-display text-[13px] text-white font-bold">Ad Creative Variant</span>
                        <span className="font-body text-[10px] text-white/90">
                          +{selectedGraphicPackIndex === 2 ? '₹3,000 /mo' : '₹400 /unit'}
                        </span>
                      </div>
                      <input
                        type="checkbox"
                        checked={graphicExtras.abTesting}
                        onChange={(e) => setGraphicExtras(prev => ({ ...prev, abTesting: e.target.checked }))}
                        className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                      />
                    </label>

                    {/* Rush Delivery Toggle */}
                    <label className="flex items-center justify-between border border-white/35 rounded-[4px] p-4 cursor-pointer bg-black/80 hover:bg-[#12121c]/90 transition-all duration-300 border-dashed shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] col-span-2">
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-display text-[13px] text-white font-extrabold">24-Hour Urgent Delivery (+30%)</span>
                        <span className="font-body text-[10px] text-white/90 font-light">Accelerated turnaround charges apply</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={graphicExtras.rushDelivery}
                        onChange={(e) => setGraphicExtras(prev => ({ ...prev, rushDelivery: e.target.checked }))}
                        className="w-4.5 h-4.5 accent-white rounded border-white/40 bg-transparent cursor-pointer scale-110"
                      />
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Price Output Display Panel */}
            <div className="lg:col-span-5 h-full flex flex-col justify-center items-center lg:border-l border-white/20 lg:pl-10 w-full mt-10 lg:mt-0">
              <div className="w-full max-w-[340px] flex flex-col items-center p-8 rounded-[4px] border border-white/30 bg-black/80 relative overflow-hidden text-center backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                
                {/* Visual scanline details */}
                <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[pulseBorder_2.5s_infinite]" />
                
                <span className="font-body text-[10px] tracking-[0.45em] text-white uppercase mb-8 font-bold">
                  ESTIMATED INVESTMENT
                </span>
                
                <div className="font-display text-white text-[42px] md:text-[54px] font-normal tracking-tight leading-none mb-3">
                  ₹{priceDisplay.toLocaleString()}
                </div>
                
                <p className="font-body text-[10px] text-white/85 tracking-wider uppercase mb-8 font-medium">
                  {activeTab === 'web' ? 'Based on custom architecture' : activeTab === 'video' ? 'Based on custom shoot specs' : 'Based on custom design specs'}
                </p>

                <div className="w-full flex flex-col gap-2 font-body text-[11px] text-white items-start text-left bg-white/[0.06] p-4 border border-white/20 rounded">
                  <div className="flex justify-between w-full">
                    <span>Base Package:</span>
                    <span className="font-mono text-white font-bold">
                      {activeTab === 'web' ? packages[selectedPackIndex].name : activeTab === 'video' ? videoPackages[selectedVideoPackIndex].name : graphicPackages[selectedGraphicPackIndex].name}
                    </span>
                  </div>
                  <div className="flex justify-between w-full mt-1.5">
                    <span>Target Timeline:</span>
                    <span className="font-mono text-white font-bold">
                      {activeTab === 'web' 
                        ? (isRushDelivery ? 'Accelerated' : packages[selectedPackIndex].delivery)
                        : activeTab === 'video'
                          ? videoPackages[selectedVideoPackIndex].delivery
                          : (graphicExtras.rushDelivery ? 'Urgent 24h' : graphicPackages[selectedGraphicPackIndex].delivery)
                      }
                    </span>
                  </div>
                </div>

                <a
                  href="#contact"
                  className="group w-full mt-8 py-4 bg-white border border-white text-black font-body text-[10px] tracking-[0.3em] rounded-[4px] cursor-pointer uppercase transition-all duration-350 ease-out hover:bg-transparent hover:text-white flex items-center justify-center gap-2 font-bold shadow-[0_4px_15px_rgba(255,255,255,0.1)]"
                >
                  <span>REQUEST QUOTE</span>
                  <ArrowRight size={10} className="text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-350" />
                </a>

              </div>
            </div>

          </div>
        </div>

        {/* 4. Terms & Conditions */}
        <div className="flex flex-col items-start text-left gap-10">
          <h3 className="font-display text-[22px] tracking-[0.1em] text-white uppercase font-semibold">
            04 / Terms &amp; Conditions
          </h3>
          
          <div
            ref={termsRef}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
          >
            {activeTab === 'web' ? (
              terms.map((term) => (
                <div
                  key={term.num}
                  className="term-card group flex flex-col p-6 rounded-[4px] border border-white/20 bg-[#0d0d14]/95 hover:border-white/35 transition-all duration-300 text-left opacity-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <span className="font-display italic text-[13px] text-white/90 font-bold">
                      {term.num}
                    </span>
                    <h4 className="font-display text-[15px] text-white font-bold">
                      {term.title}
                    </h4>
                  </div>
                  <p className="font-body font-light text-[13px] text-white/90 leading-[1.6]">
                    {term.desc}
                  </p>
                </div>
              ))
            ) : activeTab === 'video' ? (
              videoTerms.map((term) => (
                <div
                  key={term.num}
                  className="term-card group flex flex-col p-6 rounded-[4px] border border-white/20 bg-[#0d0d14]/95 hover:border-white/35 transition-all duration-300 text-left opacity-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <span className="font-display italic text-[13px] text-white/90 font-bold">
                      {term.num}
                    </span>
                    <h4 className="font-display text-[15px] text-white font-bold">
                      {term.title}
                    </h4>
                  </div>
                  <p className="font-body font-light text-[13px] text-white/90 leading-[1.6]">
                    {term.desc}
                  </p>
                </div>
              ))
            ) : (
              graphicTerms.map((term) => (
                <div
                  key={term.num}
                  className="term-card group flex flex-col p-6 rounded-[4px] border border-white/20 bg-[#0d0d14]/95 hover:border-white/35 transition-all duration-300 text-left opacity-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]"
                >
                  <div className="flex items-center gap-3.5 mb-3">
                    <span className="font-display italic text-[13px] text-white/90 font-bold">
                      {term.num}
                    </span>
                    <h4 className="font-display text-[15px] text-white font-bold">
                      {term.title}
                    </h4>
                  </div>
                  <p className="font-body font-light text-[13px] text-white/90 leading-[1.6]">
                    {term.desc}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes pulseBorder {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
