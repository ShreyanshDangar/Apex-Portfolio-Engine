import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
const FAQSection = () => {
  const { navigateToBuilder } = useApp();
  const [openIndex, setOpenIndex] = useState(0);
  const faqs = [
    {
      question: 'How does the AI generate my portfolio?',
      answer: 'Our AI analyzes your pasted text or uploaded PDF, identifies key information like your name, title, skills, experience, and education, then automatically arranges this content into a professionally designed portfolio layout. The entire process takes just seconds.'
    },
    {
      question: 'What file formats can I upload?',
      answer: 'You can paste any plain text directly into the input area, or upload a PDF file. Our parser handles various resume formats and extracts the relevant information automatically. Even poorly formatted resumes work well.'
    },
    {
      question: 'Can I edit what the AI creates?',
      answer: 'Absolutely! After the AI generates your portfolio, you have full control to edit any section, change colors, switch templates, and fine-tune the layout. Think of the AI generation as a starting point that saves you hours of work.'
    },
    {
      question: 'How accurate is the resume parsing?',
      answer: 'Our parsing engine handles most resume formats with high accuracy. It identifies sections like contact info, work experience, education, and skills. If something is missed or needs adjustment, you can easily edit it in the builder.'
    },
    {
      question: 'Will my portfolio pass ATS systems?',
      answer: 'Yes! Our portfolios use semantic HTML structure, proper heading hierarchies, and optimized keyword placement. The output is designed to be both visually appealing to humans and easily readable by Applicant Tracking Systems.'
    },
    {
      question: 'Is my data secure?',
      answer: 'Your privacy is our priority. All processing happens locally in your browser—we never store your resume content on our servers. Your data stays on your device, and exports are generated client-side.'
    }
  ];
  return (
    <section id="faq" className="relative py-24 lg:py-32 bg-dark-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-[150px]" />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 text-sm font-medium text-purple-400 bg-purple-500/10 rounded-full mb-6"
          >
            Questions
          </motion.span>
          <h2 className="text-h1 lg:text-hero font-bold mb-6">
            <span className="text-white">Frequently Asked</span>{' '}
            <span className="text-gradient">Questions</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-dark-800 border-primary-500/30'
                    : 'bg-dark-800/50 border-white/5 hover:border-white/10 hover:bg-dark-800/80'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-semibold text-white pr-4">{faq.question}</h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                      openIndex === index
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white'
                        : 'bg-white/10 text-gray-400'
                    }`}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </motion.div>
                </div>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </motion.div>
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
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-white font-semibold shadow-high hover:shadow-glow-primary transition-all duration-300"
          >
            Try It Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};
export default FAQSection;