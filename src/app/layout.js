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
  title: 'AT Media Productions | Captivating Content Creation',
  description:
    'AT Media Productions is a dynamic media production company specializing in captivating content creation, including photography, videography, and social media management. With a passion for storytelling and a commitment to excellence, we bring your vision to life through stunning visuals and engaging narratives. Whether you need promotional videos, event coverage, or social media content, AT Media Productions delivers high-quality results that resonate with your audience and elevate your brand presence.',
  image: '/atlogo.png',

}



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
