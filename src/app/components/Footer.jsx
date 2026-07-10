import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const socials = [
  {
    href: "https://instagram.com/editwi.zard",
    icon: Instagram,
    label: "@editwi.zard",
  },
  {
    href: "https://instagram.com/harshv.de",
    icon: Instagram,
    label: "@harshv.de",
  },
  {
    href: "https://www.linkedin.com/in/harshvarlani-2b1a53221",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "mailto:harshvarlani72@gmail.com",
    icon: Mail,
    label: "Email",
  },
];

export default function Footer({ whatsappLink }) {
  return (
    <footer className="border-t border-red-500/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main footer row */}
        <div className="py-14 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:text-left space-y-2"
          >
            <h3
              className="text-3xl font-black text-white leading-none"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Edit <span className="italic text-red-400">Wizard</span>
            </h3>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Helping you build a personal brand that exceeds excellence.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col items-center md:items-end gap-3"
          >
            <p className="text-[11px] tracking-[0.16em] uppercase text-red-400/60 font-medium">
              Find me online
            </p>
            <div className="flex items-center gap-2">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 rounded-xl border border-red-500/20 flex items-center justify-center text-gray-500 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl border border-red-500/20 flex items-center justify-center text-gray-500 hover:text-red-400 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-200"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-red-500/10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            © 2025 Harsh Varlani — Edit Wizard. All rights reserved.
          </p>
          <p className="text-xs text-gray-700">
            Made with passion and lots of pixels
          </p>
        </div>
      </div>
    </footer>
  );
}