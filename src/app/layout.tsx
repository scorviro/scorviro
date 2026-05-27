import type { Metadata, Viewport } from 'next'
import { playfair, dmSans, jetbrainsMono } from '@/lib/fonts'
import AppProvider from '@/components/layout/AppProvider'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://scorviro.vercel.app'),
  title: 'Scorviro | Website Design · Graphic Posts · Video Editing · Digital Marketing — Gujarat',
  description: "Scorviro is Gujarat's premium creative studio offering website development, graphic post design, video editing, social media marketing, branding, and digital solutions for textile, hospital, and all businesses. Get a free quote today!",
  keywords: [
    'Scorviro', 'Scorviro studio', 'Scorviro design', 'Scorviro Gujarat',
    'website development Gujarat', 'website design Ahmedabad', 'website banavo Gujarat',
    'graphic post design Gujarat', 'social media post design', 'Instagram post design',
    'video editing Gujarat', 'reels editing', 'YouTube video editing',
    'digital marketing Gujarat', 'social media marketing', 'Facebook ads Gujarat',
    'textile graphic design', 'hospital social media post', 'medical post design',
    'logo design Gujarat', 'branding Gujarat', 'brand identity',
    'cheap website development India', 'affordable graphic design India',
    'best graphic designer Gujarat', 'freelance web developer Gujarat',
    'Canva designer Gujarat', 'Photoshop designer Ahmedabad',
    'SEO Gujarat', 'Google ads Gujarat', 'online marketing Gujarat',
    'WhatsApp marketing', 'catalogue design', 'festival post design',
    'motion graphics Gujarat', 'GIF design', 'animated post design',
    'quotation website', 'portfolio website', 'business website Gujarat'
  ],
  authors: [{ name: 'Scorviro Studio' }],
  creator: 'Scorviro Studio',
  alternates: {
    canonical: 'https://scorviro.vercel.app/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://scorviro.vercel.app/',
    siteName: 'Scorviro',
    title: 'Scorviro | Creative Studio — Website · Design · Video · Marketing',
    description: "Gujarat's go-to creative studio for website development, graphic posts, video editing & digital marketing. Trusted by textile & hospital businesses.",
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Scorviro | Website Design · Graphic Posts · Video Editing · Digital Marketing',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scorviro | Creative Studio Gujarat',
    description: 'Website Development · Graphic Design · Video Editing · Digital Marketing in Gujarat. Get free quote now!',
    images: ['/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'revisit-after': '3 days',
    'rating': 'general',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <head>
        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Scorviro",
              "alternateName": "Scorviro Studio",
              "description": "Gujarat's premium creative studio offering website development, graphic post design, video editing, social media marketing and branding services.",
              "url": "https://scorviro.vercel.app",
              "logo": "https://scorviro.vercel.app/logo.png",
              "image": "https://scorviro.vercel.app/og-image.jpg",
              "telephone": "+91-8511102774",
              "email": "scorviro@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Rajkot, Gujarat",
                "addressRegion": "GJ",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "22.2587",
                "longitude": "71.1924"
              },
              "openingHours": "Mo-Sa 09:00-19:00",
              "priceRange": "₹₹",
              "currenciesAccepted": "INR",
              "paymentAccepted": "Cash, UPI, Bank Transfer",
              "areaServed": ["Gujarat", "Ahmedabad", "Surat", "Rajkot", "Vadodara", "India"],
              "serviceType": [
                "Website Development",
                "Graphic Post Design",
                "Video Editing",
                "Digital Marketing",
                "Social Media Marketing",
                "Logo Design",
                "Branding",
                "SEO Services",
                "Motion Graphics",
                "Catalogue Design"
              ],
              "sameAs": [
                "https://www.instagram.com/scorviro",
                "https://www.facebook.com/scorviro",
                "https://wa.me/918511102774"
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Scorviro",
              "url": "https://scorviro.vercel.app",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://scorviro.vercel.app/?s={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://scorviro.vercel.app/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Services",
                  "item": "https://scorviro.vercel.app/#services"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Quotation",
                  "item": "https://scorviro.vercel.app/#quotation"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Contact",
                  "item": "https://scorviro.vercel.app/#contact"
                }
              ]
            })
          }}
        />
      </head>
      <body className="bg-black text-white antialiased font-body min-h-screen">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}

