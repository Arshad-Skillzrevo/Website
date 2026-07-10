import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Youtube, Linkedin, Video, Film, Mic, TrendingUp, ArrowRight, ExternalLink } from 'lucide-react';

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const whatsappNumber = "919068737471";
  const whatsappMessage = encodeURIComponent(
    "Hi! I'm interested in your services. Let's discuss my project."
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const services = [
    {
      icon: Instagram,
      title: 'Social Media Design',
      description: 'Scroll-stopping, brand-aligned content that reflects your identity — no templates, no shortcuts, no trend-copying.',
      features: ['Instagram posts & carousels', 'Brand feed planning', 'Campaign creatives', 'Informative & graphical posts'],
    },
    {
      icon: Youtube,
      title: 'YouTube Thumbnail Design',
      description: 'Thumbnails engineered for clicks — bold, strategic, and aligned with your content tone.',
      features: ['High CTR optimized designs', 'Personal brand thumbnails', 'Educational & business niche', 'Consistent visual identity'],
      link : "/#thumbnails",
     
    },
    {
      icon: Linkedin,
      title: 'LinkedIn Profile Revamp',
      description: 'Transform your presence into a professional, cohesive brand that positions you as an authority.',
      features: ['Custom LinkedIn banners', 'Profile aesthetic alignment', 'Visual branding consistency', 'Personal brand positioning'],
      badge: '50+ Revamps',
      link : "/#banner",
    },
    {
      icon: Video,
      title: 'Short-Form Video Editing',
      description: 'Reels, Shorts, TikToks — create attention-grabbing edits that hook viewers in the first second.',
      features: ['Subtitles & motion graphics', 'Dynamic transitions', 'Informative & storytelling edits', 'Trend-aware execution'],
    },
    {
      icon: Film,
      title: 'Long-Form Video Editing',
      description: 'YouTube videos, webinars, training modules — videos that maintain retention, clarity, and brand professionalism.',
      features: ['Clean pacing', 'B-roll integration', 'Visual storytelling', 'Structured editing for engagement'],
    },
    {
      icon: Mic,
      title: 'Podcast & Interview Editing',
      description: 'Raw conversations become polished experiences with audio cleanup, visuals, motion graphics, and structured cuts.',
      features: ['Audio enhancement', 'Multi-cam edits', 'Graphics & lower thirds', 'YouTube-ready formatting'],
      link : "/#long-form-video-editing",
    },

    // {
    //   icon: TrendingUp,
    //   title: 'VSLs & Ad Creatives',
    //   description: 'High-converting VSLs and ad creatives that build trust and guide action without feeling pushy.',
    //   features: ['Story-driven ad structure', 'Visual persuasion', 'Strong hooks & retention flow', 'Conversion-focused edits'],
    // },
  ];

  return (
    <section id="services" ref={ref} className="py-32 relative overflow-hidden bg-black">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 ">
            What I <span className="text-red-500 great-vibes ">do?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            I specialize in turning your ideas into visual stories that build brand presence and connect with your audience
          </p>
        </motion.div>

        {/* ── Services Grid ── */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const serviceId = service.title.toLowerCase().replace(/\s+/g, '-');

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <a
                  href={service.link || `#${serviceId}`}
                  className="block h-full glass border border-white/10 hover:border-red-500/50 rounded-3xl p-8 transition-all duration-500 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

                  {service.badge && (
                    <div className="absolute top-6 right-6 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-[10px] uppercase tracking-widest font-bold text-red-300">
                      {service.badge}
                    </div>
                  )}

                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-8 group-hover:from-red-500 group-hover:to-blue-600 transition-all duration-500 shadow-xl">
                      <service.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-red-400 transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-white/60 mb-8 leading-relaxed text-sm">
                      {service.description}
                    </p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-white/50">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center gap-2 text-red-400 font-semibold text-sm group-hover:gap-4 transition-all duration-300">
                      View Details <ArrowRight size={16} />
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* ── Get in Touch CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20 mb-32"
        >
          <p className="text-white/50 mb-8 text-lg">
            Don't see what you're looking for? Let's talk about your unique needs.
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=919068737471&text=Hi%21+I%27m+interested+in+your+services.+Let%27s+discuss+my+project"
            className="px-10 py-4 bg-white text-black hover:bg-red-500 hover:text-white rounded-full font-bold transition-all duration-300 transform hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* ── Divider ── */}
        <div className="border-t border-white/10 mb-32" />

        {/* ── Portfolio / Work Section ── */}
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white">
              My Work <span className="text-red-500 great-vibes font-light"> Speaks</span>
            </h2>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From LinkedIn revamps to cinematic videos, here's a glimpse of what I create
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 sm:gap-12 pt-8">
              <div className="glass-pro p-6 sm:p-8 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-lg">
                <div className="text-4xl sm:text-5xl font-black text-red-500 mb-2">50+</div>
                <div className="text-sm sm:text-base text-gray-400">LinkedIn Revamps</div>
              </div>

              <div className="glass-pro p-6 sm:p-8 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-lg">
                <div className="text-4xl sm:text-5xl font-black text-red-500 mb-2">50+</div>
                <div className="text-sm sm:text-base text-gray-400">NGO Videos</div>
              </div>

              <div className="glass-pro p-6 sm:p-8 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-lg">
                <div className="text-4xl sm:text-5xl font-black text-red-500 mb-2">24K</div>
                <div className="text-sm sm:text-base text-gray-400">Subscribers</div>
              </div>
            </div>

            <div 
            className="pt-8 space-y-4">
              <a
                href="/#services"
                // target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-red-500/30 hover:border-red-500/50 text-gray-300 hover:text-white font-bold rounded-xl transition-all duration-300 glass-pro backdrop-blur-sm"
              >
                View Full Portfolio
                <ExternalLink className="w-5 h-5" />
              </a>

              <p 
          id='work'
              className="text-gray-400">
                or{" "}
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-400 hover:text-red-300 underline font-semibold"
                >
                  chat with me on WhatsApp
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}