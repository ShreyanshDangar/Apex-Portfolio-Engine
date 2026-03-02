import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const testimonials = [
    {
      id: 'testimonial-1',
      quote: 'I applied to 50 jobs with my old resume. Got 2 responses. Built my portfolio with APEX and applied to 10 more companies. Got 7 interviews and 3 offers. This is a game-changer.',
      name: 'Sarah Chen',
      role: 'Product Designer',
      company: 'Google',
      rating: 5,
      initial: 'SC',
      gradient: 'from-blue-500 to-purple-500',
      result: '3 job offers'
    },
    {
      id: 'testimonial-2',
      quote: 'The ATS optimization is real. My resume never got past the filters before. APEX helped me structure everything properly. Now recruiters actually call me back.',
      name: 'Marcus Rodriguez',
      role: 'Software Engineer',
      company: 'Microsoft',
      rating: 5,
      initial: 'MR',
      gradient: 'from-purple-500 to-pink-500',
      result: '85% response rate'
    },
    {
      id: 'testimonial-3',
      quote: 'As someone with zero design skills, I was amazed. The portfolio it generated looked better than ones I\'ve seen from professional designers. Worth every minute.',
      name: 'Priya Sharma',
      role: 'Data Analyst',
      company: 'Amazon',
      rating: 5,
      initial: 'PS',
      gradient: 'from-pink-500 to-orange-500',
      result: 'Senior role landed'
    },
    {
      id: 'testimonial-4',
      quote: 'Within a week of using my APEX portfolio, I had recruiters from top tech companies reaching out. The professional presentation made all the difference.',
      name: 'James Wilson',
      role: 'UX Researcher',
      company: 'Meta',
      rating: 5,
      initial: 'JW',
      gradient: 'from-orange-500 to-yellow-500',
      result: 'FAANG interviews'
    },
    {
      id: 'testimonial-5',
      quote: 'Best investment in my career. Landed a senior position with 40% salary increase. The portfolio showcased my work in a way I never could have done myself.',
      name: 'David Kim',
      role: 'DevOps Engineer',
      company: 'Stripe',
      rating: 5,
      initial: 'DK',
      gradient: 'from-green-500 to-cyan-500',
      result: '40% salary increase'
    }
  ];
  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);
  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextTestimonial]);
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.9
    })
  };
  return (
    <section id="testimonials" className="relative py-32 lg:py-40 bg-gradient-to-b from-dark-900 to-dark-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent-500/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-primary-500/5 blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            className="inline-block px-4 py-1.5 text-sm font-medium text-pink-400 bg-pink-500/10 rounded-full mb-6"
          >
            Success Stories
          </motion.span>
          <h2 className="text-h1 lg:text-hero font-bold mb-6 text-gradient">
            Real Results, Real People
          </h2>
          <p className="text-xl text-gray-400">
            Join thousands who landed their dream roles with APEX
          </p>
        </motion.div>
        <div
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[400px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute w-full"
              >
                <div className="relative p-8 md:p-12 backdrop-blur-lg bg-dark-800/50 border border-white/10 rounded-3xl">
                  <div className="absolute top-6 left-8 text-8xl text-primary-500/10 font-serif leading-none">"</div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">★</span>
                      ))}
                    </div>
                    <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8 font-light">
                      {testimonials[activeIndex].quote}
                    </blockquote>
                    <div className="flex items-center justify-between flex-wrap gap-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${testimonials[activeIndex].gradient} flex items-center justify-center text-white font-bold text-lg`}>
                          {testimonials[activeIndex].initial}
                        </div>
                        <div>
                          <div className="font-semibold text-white text-lg">{testimonials[activeIndex].name}</div>
                          <div className="text-gray-400">{testimonials[activeIndex].role} at {testimonials[activeIndex].company}</div>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${testimonials[activeIndex].gradient} text-white font-semibold text-sm`}>
                        {testimonials[activeIndex].result}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex items-center justify-center gap-8 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className="relative p-1"
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 scale-150'
                      : 'bg-white/30 hover:bg-white/50'
                  }`} />
                </button>
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '10,000+', label: 'Portfolios Created' },
            { value: '95%', label: 'Interview Success' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '50+', label: 'Countries' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="text-center p-6 bg-white/5 rounded-2xl border border-white/5"
            >
              <div className="text-3xl font-bold text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
export default TestimonialsSection;