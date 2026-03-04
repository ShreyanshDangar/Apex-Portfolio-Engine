import React from 'react';
const ExperienceSection = ({ data }) => {
  const experiences = data?.experiences || [
    {
      title: 'Senior Product Designer',
      company: 'Google',
      location: 'Mountain View, CA',
      startDate: '2020-06',
      endDate: null,
      current: true,
      description: [
        'Led design initiatives for Google Workspace products used by 2B+ users, increasing user satisfaction scores by 32%',
        'Established design system adopted across 15+ product teams, reducing design-to-development time by 45%',
        'Mentored team of 8 designers, implementing design thinking workshops that improved team velocity by 28%',
        'Collaborated with engineering and PM to ship 12 major features, all exceeding KPI targets'
      ],
      technologies: ['Figma', 'React', 'Design Systems', 'User Research', 'A/B Testing']
    },
    {
      title: 'Product Designer',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      startDate: '2018-03',
      endDate: '2020-05',
      current: false,
      description: [
        'Redesigned host onboarding flow, increasing completion rate from 34% to 67%',
        'Led UX research initiatives with 200+ user interviews informing product roadmap',
        'Designed and shipped mobile features generating $12M additional annual revenue',
        'Created accessibility guidelines ensuring WCAG 2.1 AA compliance across all products'
      ],
      technologies: ['Sketch', 'Figma', 'HTML/CSS', 'Prototyping', 'User Testing']
    },
    {
      title: 'UX Designer',
      company: 'Facebook',
      location: 'Menlo Park, CA',
      startDate: '2016-01',
      endDate: '2018-02',
      current: false,
      description: [
        'Designed marketplace features used by 800M+ monthly active users',
        'Conducted usability testing with 150+ participants, driving data-informed design decisions',
        'Collaborated with 6 engineering teams to deliver seamless cross-platform experiences',
        'Improved mobile app performance through optimized UI patterns, reducing load time by 40%'
      ],
      technologies: ['Photoshop', 'Illustrator', 'Framer', 'User Research', 'Prototyping']
    }
  ];
  const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };
  const calculateDuration = (start, end) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
    if (remainingMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`;
    return `${years} ${years === 1 ? 'year' : 'years'} ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  };
  return (
    <section className="portfolio-experience" data-animate="fade-in">
      <div className="portfolio-section-container">
        <header className="portfolio-section-header">
          <h2 className="portfolio-section-title" data-animate="fade-up" data-delay="100">
            Professional Journey
          </h2>
          <div className="portfolio-section-decoration" aria-hidden="true"></div>
        </header>
        <div className="portfolio-experience-timeline">
          <div className="portfolio-timeline-line" aria-hidden="true"></div>
          {experiences.map((experience, index) => (
            <article
              key={index}
              className="portfolio-experience-item"
              data-animate="fade-up"
              data-delay={200 + (index * 100)}
              data-hover-lift="true"
            >
              <div className="portfolio-experience-timeline-marker" aria-hidden="true">
                <div className="portfolio-experience-dot"></div>
                {experience.current && (
                  <div className="portfolio-experience-pulse"></div>
                )}
              </div>
              <div className="portfolio-experience-content">
                <div className="portfolio-experience-header">
                  <div className="portfolio-experience-title-group">
                    <h3 className="portfolio-experience-title">
                      {experience.title}
                    </h3>
                    <div className="portfolio-experience-company">
                      <span className="portfolio-experience-company-name">
                        {experience.company}
                      </span>
                      {experience.location && (
                        <>
                          <span className="portfolio-experience-separator" aria-hidden="true">•</span>
                          <span className="portfolio-experience-location">
                            {experience.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="portfolio-experience-date-badge">
                    <time dateTime={experience.startDate}>
                      {formatDate(experience.startDate)}
                    </time>
                    {' - '}
                    <time dateTime={experience.endDate || ''}>
                      {experience.current ? 'Present' : formatDate(experience.endDate)}
                    </time>
                    <span className="portfolio-experience-duration">
                      {calculateDuration(experience.startDate, experience.endDate)}
                    </span>
                  </div>
                </div>
                <ul className="portfolio-experience-description" role="list">
                  {experience.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="portfolio-experience-description-item" role="listitem">
                      <span className="portfolio-experience-bullet" aria-hidden="true"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {experience.technologies && experience.technologies.length > 0 && (
                  <div className="portfolio-experience-technologies">
                    {experience.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="portfolio-experience-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ExperienceSection;