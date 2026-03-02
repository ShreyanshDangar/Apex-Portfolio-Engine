import { motion } from 'framer-motion';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';
const PricingSection = () => {
  const { dispatch } = useApp();
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for trying out APEX',
      price: 'Free',
      priceDetail: 'No credit card required',
      features: [
        { text: '1 Portfolio', included: true },
        { text: 'All 4 Templates', included: true },
        { text: 'PDF Export', included: true },
        { text: 'Basic Customization', included: true },
        { text: 'Resume Parsing', included: false },
        { text: 'Priority Support', included: false }
      ],
      cta: 'Start Free',
      popular: false,
      gradient: 'from-gray-500 to-gray-600'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Most popular for job seekers',
      price: '$19',
      priceDetail: 'one-time payment',
      features: [
        { text: 'Unlimited Portfolios', included: true },
        { text: 'All 4 Templates', included: true },
        { text: 'PDF Export (High-Res)', included: true },
        { text: 'Full Customization', included: true },
        { text: 'Resume Parsing', included: true },
        { text: 'Email Support', included: true }
      ],
      cta: 'Get Pro',
      popular: true,
      gradient: 'from-primary-500 to-accent-500'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: 'Custom',
      priceDetail: 'Contact for pricing',
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Team Management', included: true },
        { text: 'Custom Branding', included: true },
        { text: 'API Access', included: true },
        { text: 'Analytics Dashboard', included: true },
        { text: 'Dedicated Support', included: true }
      ],
      cta: 'Contact Sales',
      popular: false,
      gradient: 'from-accent-500 to-green-500'
    }
  ];
  const handlePlanClick = (planId) => {
    if (planId === 'enterprise') {
      return;
    }
    dispatch({ type: 'NAVIGATE_TO', payload: 'builder' });
  };
  return (
    <section id="pricing" className="relative py-32 lg:py-40 bg-dark-950 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-500/5 rounded-full blur-[150px]" />
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
            className="inline-block px-4 py-1.5 text-sm font-medium text-yellow-400 bg-yellow-500/10 rounded-full mb-6"
          >
            Simple Pricing
          </motion.span>
          <h2 className="text-h1 lg:text-hero font-bold mb-6">
            <span className="text-white">Invest in Your</span>{' '}
            <span className="text-gradient">Career</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Start free, upgrade when you're ready. No subscriptions, no hidden fees.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              className={`relative ${plan.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1.5 text-sm font-semibold bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-white shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`relative h-full p-8 rounded-3xl border transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-dark-800 to-dark-900 border-primary-500/30'
                    : 'bg-dark-800/50 border-white/10 hover:border-white/20'
                }`}
              >
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${plan.gradient} opacity-0 blur-xl transition-opacity duration-500 ${
                    hoveredPlan === plan.id ? 'opacity-20' : ''
                  }`}
                />
                <div className="relative">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className={`text-5xl font-bold ${plan.popular ? 'text-gradient' : 'text-white'}`}>
                        {plan.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{plan.priceDetail}</p>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature) => (
                      <li key={feature.text} className="flex items-center gap-3">
                        {feature.included ? (
                          <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                            <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        )}
                        <span className={feature.included ? 'text-gray-300' : 'text-gray-500'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handlePlanClick(plan.id)}
                    className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-high hover:shadow-glow-primary'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {plan.cta}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-dark-800/50 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-gray-300 text-sm">30-day money back guarantee</span>
            </div>
            <div className="w-px h-6 bg-white/10" />
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-gray-300 text-sm">Secure payment</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
export default PricingSection;