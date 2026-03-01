import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useApp } from '../../context/AppContext';
const FeaturesSection = () => {
  const { navigateToBuilder } = useApp();
  const sectionRef = useRef(null);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };
  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 lg:py-32 bg-dark-900 overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary-500/5 blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-500/5 blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-medium text-primary-400 bg-primary-500/10 rounded-full mb-6"
          >
            Features
          </motion.span>
          <h2 className="text-h1 lg:text-hero font-bold mb-6">
            <span className="text-gradient">AI Does the Work,</span>{' '}
            <span className="text-white">You Get the Job</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From resume text to polished portfolio—automatically
          </p>
        </motion.div>
        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {/* Primary Feature - AI Generation (Large Card) */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="md:col-span-2 lg:col-span-2 group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full p-8 lg:p-10 backdrop-blur-lg bg-gradient-to-br from-primary-500/10 to-accent-500/5 border border-primary-500/20 rounded-3xl hover:border-primary-500/40 transition-all duration-300">
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-500/20 rounded-full text-primary-300 text-xs font-semibold mb-4">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
                    </span>
                    Core Feature
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                    AI-Powered Generation
                  </h3>
                  <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                    Paste your resume text or upload a PDF. Our AI analyzes your experience,
                    extracts key information, and builds a complete portfolio automatically.
                    No manual formatting required.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Text Parsing', 'PDF Support', 'Smart Extraction', 'Auto Layout'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 text-sm text-primary-300 bg-primary-500/10 rounded-lg border border-primary-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex-shrink-0 hidden lg:flex">
                  <div className="w-48 h-48 rounded-2xl bg-gradient-to-br from-primary-500/30 to-accent-500/30 flex items-center justify-center">
                    <svg className="w-24 h-24 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
          {/* ATS Optimization */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full p-6 lg:p-8 backdrop-blur-lg bg-dark-800/50 border border-white/10 rounded-3xl hover:border-green-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ATS-Optimized</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Structured for Applicant Tracking Systems. Proper keywords, semantic HTML, and formatting that gets past automated filters.
              </p>
            </div>
          </motion.article>
          {/* Premium Templates */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full p-6 lg:p-8 backdrop-blur-lg bg-dark-800/50 border border-white/10 rounded-3xl hover:border-purple-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">4 Pro Templates</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Professionally designed themes for different industries. AI selects optimal colors and typography automatically.
              </p>
            </div>
          </motion.article>
          {/* Instant PDF Export */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full p-6 lg:p-8 backdrop-blur-lg bg-dark-800/50 border border-white/10 rounded-3xl hover:border-blue-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Instant PDF Export</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                High-resolution PDF output, print-ready and optimized for digital sharing. One click to download.
              </p>
            </div>
          </motion.article>
          {/* Responsive Design */}
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -6 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-amber-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full p-6 lg:p-8 backdrop-blur-lg bg-dark-800/50 border border-white/10 rounded-3xl hover:border-orange-500/30 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white mb-5">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fully Responsive</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Looks perfect on any device—smartphones to ultrawide monitors. Adaptive layouts that scale beautifully.
              </p>
            </div>
          </motion.article>
        </motion.div>
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={navigateToBuilder}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl shadow-high hover:shadow-glow-primary transition-all duration-300"
          >
            <span>Try It Now</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
export default FeaturesSection;