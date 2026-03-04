import React from 'react';
const TestimonialsSection = ({ data }) => {
  const testimonials = data?.testimonials || [
    {
      quote: 'Outstanding designer and engineer. Delivered a product redesign that exceeded all our expectations and KPIs. A true product thinker who balances user needs with business goals.',
      author: 'Sarah Martinez',
      role: 'VP of Product',
      company: 'Google',
      relationship: 'Manager'
    },
    {
      quote: 'One of the most talented individuals I\'ve worked with. Combines deep technical knowledge with exceptional design sensibility. Always goes above and beyond to deliver excellence.',
      author: 'Michael Chen',
      role: 'Engineering Director',
      company: 'Airbnb',
      relationship: 'Colleague'
    },
    {
      quote: 'Collaborative, innovative, and results-driven. Led our team through a major product pivot with grace and expertise. Would hire again in a heartbeat.',
      author: 'Emily Johnson',
      role: 'CEO',
      company: 'TechStart Inc.',
      relationship: 'Client'
    }
  ];
  if (!data?.testimonials || data.testimonials.length === 0) {
    return null;
  }
  return (
    <section className="portfolio-testimonials" data-animate="fade-in">
      <div className="portfolio-section-container">
        <header className="portfolio-section-header">
          <h2 className="portfolio-section-title" data-animate="fade-up" data-delay="100">
            Recommendations
          </h2>
          <div className="portfolio-section-decoration" aria-hidden="true"></div>
        </header>
        <div className="portfolio-testimonials-grid" data-animate="fade-up" data-delay="200">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="portfolio-testimonial-card"
              data-animate="fade-up"
              data-delay={300 + (index * 100)}
              data-hover-lift="true"
            >
              <div className="portfolio-testimonial-quote-icon" aria-hidden="true">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 14C10 10.6863 12.6863 8 16 8V10C13.7909 10 12 11.7909 12 14V16H16V24H8V16H10V14Z"/>
                  <path d="M22 14C22 10.6863 24.6863 8 28 8V10C25.7909 10 24 11.7909 24 14V16H28V24H20V16H22V14Z"/>
                </svg>
              </div>
              <blockquote className="portfolio-testimonial-quote">
                <p className="portfolio-testimonial-text">
                  {testimonial.quote}
                </p>
              </blockquote>
              <footer className="portfolio-testimonial-footer">
                <div className="portfolio-testimonial-author">
                  <div className="portfolio-testimonial-avatar">
                    <span className="portfolio-testimonial-avatar-initial">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div className="portfolio-testimonial-author-info">
                    <cite className="portfolio-testimonial-author-name">
                      {testimonial.author}
                    </cite>
                    <p className="portfolio-testimonial-author-role">
                      {testimonial.role} at {testimonial.company}
                    </p>
                    <span className="portfolio-testimonial-relationship">
                      {testimonial.relationship}
                    </span>
                  </div>
                </div>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TestimonialsSection;