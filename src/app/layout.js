import './globals.css'

import localFont from 'next/font/local'
import { Playfair_Display } from 'next/font/google'
import Navbar from './components/Navbar.jsx'
import WhatsAppFloat from './components/Whatsappfloat'
import { i } from 'framer-motion/client'

/* Local Fonts */

const greatVibes = localFont({
  src: '../fonts/GreatVibes-Regular.ttf',
  display: 'swap',
  variable: '--font-great-vibes',
})

const helvetica = localFont({
  src: [
    {
      path: '../fonts/Helvetica.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Helvetica-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-helvetica',
})

/* Google Font */

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata = {
  metadataBase: new URL("https://www.atmediaproduction.com"), // Replace with your actual domain

  title: {
    default: "AT Media Productions | Captivating Content Creation",
    template: "%s | AT Media Productions",
  },

  description:
    "AT Media Productions is a creative media production company specializing in premium video production, photography, podcast production, branding, social media management, and content creation that helps businesses and personal brands grow.",

  keywords: [
    "AT Media Productions",
    "Video Production",
    "Media Production Company",
    "Content Creation",
    "Podcast Production",
    "Video Editing",
    "Photography",
    "Graphic Design",
    "Branding",
    "Social Media Management",
    "YouTube Editing",
    "Instagram Reels",
    "Creative Agency",
    "Agra Media Company",
  ],

  authors: [
    {
      name: "AT Media Productions",
      url: "https://www.atmediaproduction.com",
    },
  ],

  creator: "AT Media Productions",
  publisher: "AT Media Productions",

  category: "Media Production",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.atmediaproduction.com",
  },

  openGraph: {
    title: "AT Media Productions | Captivating Content Creation",
    description:
      "Premium video production, photography, podcast production, branding, and social media content that helps businesses stand out.",
    url: "https://www.atmediaproduction.com",
    siteName: "AT Media Productions",
    images: [
      {
        url: "/og-image.png", // Recommended: 1200x630 image
        width: 1200,
        height: 630,
        alt: "AT Media Productions",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // twitter: {
  //   card: "summary_large_image",
  //   title: "AT Media Productions | Captivating Content Creation",
  //   description:
  //     "Premium video production, photography, podcast production, branding, and content creation.",
  //   images: ["/og-image.png"],
  //   creator: "@yourtwitterhandle", // Optional
  // },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    // apple: "/apple-touch-icon.png",
  },

  // manifest: "/site.webmanifest",

  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_CODE",
  // },

  other: {
    "theme-color": "#000000",
  },
};



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${helvetica.variable} ${greatVibes.variable} ${playfair.variable}`}
    >

      <body className="antialiased font-sans">
        <WhatsAppFloat whatsappLink="https://api.whatsapp.com/send/?phone=919068737471&text=Hi%21+I%27m+interested+in+your+services.+Let%27s+discuss+my+project" />
        {/* <Navbar/> */}
        {children}
      </body>
    </html>
  )
}
