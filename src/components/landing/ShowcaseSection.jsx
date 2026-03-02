import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
const ShowcaseSection = () => {
  const { navigateToBuilder } = useApp();
  const [activeTemplate, setActiveTemplate] = useState(0);
  const containerRef = useRef(null);
  const templates = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean lines, focused content',
      primaryColor: '#2563EB',
      secondaryColor: '#06B6D4',
      preview: {
        header: 'Alex Rivera',
        title: 'UX Designer',
        email: 'alex.rivera@email.com',
        phone: '+1 (555) 234-5678',
        skills: ['User Research', 'Wireframing', 'Prototyping', 'Figma'],
        experience: [
          { company: 'Design Studio Co.', role: 'Senior UX Designer', period: '2021 - Present', desc: 'Led design systems initiative' },
          { company: 'StartupXYZ', role: 'UX Designer', period: '2019 - 2021', desc: 'Created mobile app experience' }
        ],
        education: 'BA Design - Stanford University, 2019'
      }
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Corporate polish, executive presence',
      primaryColor: '#1e40af',
      secondaryColor: '#3b82f6',
      preview: {
        header: 'Marcus Johnson',
        title: 'Engineering Manager',
        email: 'marcus.j@email.com',
        phone: '+1 (555) 345-6789',
        skills: ['System Design', 'Team Leadership', 'Agile', 'Cloud Architecture'],
        experience: [
          { company: 'TechCorp Inc.', role: 'Engineering Manager', period: '2020 - Present', desc: 'Managing 15-person engineering team' },
          { company: 'GlobalTech', role: 'Senior Engineer', period: '2017 - 2020', desc: 'Built scalable microservices' }
        ],
        education: 'MS Computer Science - MIT, 2017'
      }
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Bold expression, artistic flair',
      primaryColor: '#7c3aed',
      secondaryColor: '#06B6D4',
      preview: {
        header: 'Sofia Chen',
        title: 'Brand Designer',
        email: 'sofia.chen@email.com',
        phone: '+1 (555) 456-7890',
        skills: ['Branding', 'Motion Design', 'Illustration', 'Typography'],
        experience: [
          { company: 'Creative Agency', role: 'Lead Brand Designer', period: '2020 - Present', desc: 'Rebranded Fortune 500 clients' },
          { company: 'Design Co.', role: 'Visual Designer', period: '2018 - 2020', desc: 'Created visual identities' }
        ],
        education: 'BFA Graphic Design - Parsons, 2018'
      }
    },
    {
      id: 'tech',
      name: 'Tech',
      description: 'Developer-focused, code-inspired',
      primaryColor: '#059669',
      secondaryColor: '#06B6D4',
      preview: {
        header: 'David Kim',
        title: 'Full-Stack Developer',
        email: 'david.kim@email.com',
        phone: '+1 (555) 567-8901',
        skills: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Docker', 'GraphQL'],
        experience: [
          { company: 'Stripe', role: 'Senior Developer', period: '2021 - Present', desc: 'Payment infrastructure development' },
          { company: 'GitHub', role: 'Software Engineer', period: '2019 - 2021', desc: 'Core platform features' }
        ],
        education: 'BS Computer Science - UC Berkeley, 2019'
      }
    }
  ];
  const active = templates[activeTemplate];
  return (
    <section id="showcase" className="relative py-24 lg:py-32 bg-dark-950 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] bg-accent-500/5 rounded-full blur-[120px]" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <motion.span initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-block px-4 py-1.5 text-sm font-medium text-accent-400 bg-accent-500/10 rounded-full mb-6 font-mono">
            Portfolio Templates
          </motion.span>
          <h2 className="text-h2 lg:text-h1 font-bold mb-6 font-heading">
            <span className="text-skyWhite">Choose Your</span>{' '}
            <span className="text-gradient">Style</span>
          </h2>
          <p className="text-base text-lightSky max-w-2xl mx-auto">
            Four professionally designed templates, each crafted for different industries
          </p>
        </motion.div>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left side - Template buttons (simple, no dropdown) */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
            <div className="space-y-4">
              {templates.map((template, index) => (
                <motion.button
                  key={template.id}
                  onClick={() => setActiveTemplate(index)}
                  whileHover={{ x: 8 }}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${activeTemplate === index ? 'bg-primary-500/10 border-primary-500/30' : 'bg-dark-900/50 border-primary-500/10 hover:bg-dark-800/50 hover:border-primary-500/20'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-skyWhite font-bold text-lg" style={{ background: `linear-gradient(135deg, ${template.primaryColor}, ${template.secondaryColor})` }}>
                      {template.name[0]}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-skyWhite mb-1">{template.name}</h3>
                      <p className="text-sm text-lightSky">{template.description}</p>
                    </div>
                    {activeTemplate === index && (
                      <div className="w-6 h-6 rounded-full bg-primary-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={navigateToBuilder}
              className="w-full mt-8 py-4 px-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl text-base font-semibold text-skyWhite flex items-center justify-center gap-3 shadow-high hover:shadow-glow-primary transition-all duration-300"
            >
              <span>Start with {active.name} Template</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </motion.div>
          {/* Right side - Full portfolio preview with all content */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2"
          >
            <div className="relative perspective-1000">
              <div className="absolute -inset-4 rounded-3xl blur-2xl opacity-30 transition-colors duration-500" style={{ background: `linear-gradient(135deg, ${active.primaryColor}40, ${active.secondaryColor}40)` }} />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTemplate}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative tilt-3d-right"
                >
                  <motion.div
                    animate={{ y: [-8, 8, -8] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-dark-800 rounded-3xl overflow-hidden border border-primary-500/20 shadow-glow-primary"
                  >
                    {/* Top gradient bar */}
                    <div className="h-2" style={{ background: `linear-gradient(90deg, ${active.primaryColor}, ${active.secondaryColor})` }} />
                    <div className="p-6 sm:p-8">
                      {/* Header with avatar and info */}
                      <div className="flex items-start gap-5 mb-6">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-skyWhite text-xl sm:text-2xl font-bold flex-shrink-0" style={{ background: `linear-gradient(135deg, ${active.primaryColor}, ${active.secondaryColor})` }}>
                          {active.preview.header.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg sm:text-xl font-bold text-skyWhite mb-1">{active.preview.header}</h3>
                          <p className="text-primary-400 text-sm sm:text-base">{active.preview.title}</p>
                          <p className="text-gray-500 text-xs sm:text-sm mt-1 font-mono truncate">{active.preview.email}</p>
                        </div>
                      </div>
                      {/* Skills */}
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-mono">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {active.preview.skills.map((skill) => (
                            <span key={skill} className="px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-skyWhite font-mono" style={{ background: `${active.primaryColor}30` }}>
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Experience */}
                      <div className="mb-6">
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 font-mono">Experience</h4>
                        <div className="space-y-3">
                          {active.preview.experience.map((exp, i) => (
                            <div key={i} className="flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ background: active.primaryColor }} />
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-wrap items-baseline gap-x-2">
                                  <span className="text-skyWhite text-sm font-medium">{exp.role}</span>
                                  <span className="text-gray-500 text-xs">at {exp.company}</span>
                                </div>
                                <div className="flex items-center justify-between mt-0.5">
                                  <span className="text-gray-400 text-xs">{exp.desc}</span>
                                  <span className="text-gray-500 text-xs font-mono flex-shrink-0 ml-2">{exp.period}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Education */}
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 font-mono">Education</h4>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 flex-shrink-0" style={{ color: active.primaryColor }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          </svg>
                          <span className="text-gray-400 text-xs sm:text-sm font-mono">{active.preview.education}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default ShowcaseSection;