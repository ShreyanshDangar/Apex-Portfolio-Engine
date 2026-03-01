import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useApp } from '../../context/AppContext';
const ProcessSection = () => {
  const { navigateToBuilder } = useApp();
  const sectionRef = useRef(null);
  const steps = [
    {
      id: 'step-01',
      number: '01',
      title: 'Input Your Content',
      description: 'Paste your resume text directly or drag and drop your PDF file. Our system accepts any format.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'step-02',
      number: '02',
      title: 'AI Generates Portfolio',
      description: 'Our AI analyzes your content, extracts key details, and automatically builds your portfolio with optimal layout.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'step-03',
      number: '03',
      title: 'Customize & Export',
      description: 'Fine-tune colors and layout if needed, then export your ATS-optimized portfolio as a high-quality PDF.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-500'
    }
  ];
  return (
    <section ref={sectionRef} id="process" className="relative py-24 lg:py-32 bg-dark-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-medium text-cyan-400 bg-cyan-500/10 rounded-full mb-6"
          >
            How It Works
          </motion.span>
          <h2 className="text-h1 lg:text-hero font-bold mb-6">
            <span className="text-white">Three Steps to</span>{' '}
            <span className="text-gradient">Your Portfolio</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            From raw text to polished portfolio in under a minute
          </p>
        </motion.div>
        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-[16.67%] right-[16.67%] h-0.5">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-30" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeOut' }}
            />
          </div>
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Step icon */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  className="relative mb-8"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white shadow-xl`}>
                    {step.icon}
                  </div>
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} blur-xl opacity-40`} />
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-dark-950 border-2 border-dark-800 flex items-center justify-center text-xs font-bold text-white">
                    {step.number}
                  </div>
                </motion.div>
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed max-w-xs">{step.description}</p>
                {/* Arrow for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden my-6">
                    <svg className="w-6 h-6 text-gray-600 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={navigateToBuilder}
            className="inline-flex items-center gap-3 px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl shadow-high hover:shadow-glow-primary transition-all duration-300"
          >
            <span>Start Building</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
export default ProcessSection;