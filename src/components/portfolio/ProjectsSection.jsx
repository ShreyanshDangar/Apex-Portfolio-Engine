import React from 'react';
const ProjectsSection = ({ data }) => {
  const projects = data?.projects || [
    {
      title: 'E-commerce Platform Redesign',
      type: 'Web Application',
      description: 'Led complete redesign of multi-million dollar e-commerce platform serving 500K+ monthly users. Implemented modern design system, optimized checkout flow, and introduced personalization features. The project involved extensive user research, A/B testing, and collaboration with engineering teams across three countries.',
      role: 'Lead Product Designer',
      technologies: ['React', 'TypeScript', 'Figma', 'AWS', 'PostgreSQL'],
      duration: '8 months',
      images: null,
      liveUrl: 'https://example.com',
      githubUrl: null,
      achievements: [
        'Increased conversion rate by 43%',
        'Reduced cart abandonment by 31%',
        'Improved mobile engagement by 67%',
        'Generated $2.4M additional annual revenue'
      ],
      metrics: '500K+ users, 43% conversion increase, $2.4M revenue'
    },
    {
      title: 'Real-time Collaboration Tool',
      type: 'SaaS Product',
      description: 'Built real-time collaboration platform enabling distributed teams to work together seamlessly. Features included live document editing, video conferencing integration, task management, and AI-powered meeting summaries. Architected for scale to support 10K+ concurrent users with sub-100ms latency.',
      role: 'Full-Stack Engineer & Product Designer',
      technologies: ['Node.js', 'WebSockets', 'React', 'MongoDB', 'Docker'],
      duration: '12 months',
      images: null,
      liveUrl: 'https://example.com',
      githubUrl: 'https://github.com/example',
      achievements: [
        'Achieved 99.9% uptime over 12 months',
        'Supported 10K+ concurrent users',
        'Sub-100ms message delivery latency',
        'Adopted by 200+ enterprise teams'
      ],
      metrics: '10K+ concurrent users, 99.9% uptime, 200+ teams'
    },
    {
      title: 'AI-Powered Analytics Dashboard',
      type: 'Data Visualization',
      description: 'Designed and developed comprehensive analytics dashboard with AI-powered insights and predictive analytics. Transformed complex data sets into actionable visualizations using custom charting components. Implemented machine learning models for trend prediction and anomaly detection.',
      role: 'Senior Frontend Engineer',
      technologies: ['React', 'D3.js', 'Python', 'TensorFlow', 'Kubernetes'],
      duration: '6 months',
      images: null,
      liveUrl: null,
      githubUrl: 'https://github.com/example',
      achievements: [
        'Processed 10TB+ data daily',
        'Reduced analysis time by 85%',
        'Improved prediction accuracy to 94%',
        'Saved teams 15 hours/week on average'
      ],
      metrics: '10TB+ daily data, 94% accuracy, 15hrs/week saved'
    }
  ];
  return (
    <section className="portfolio-projects" data-animate="fade-in">
      <div className="portfolio-section-container">
        <header className="portfolio-section-header">
          <h2 className="portfolio-section-title" data-animate="fade-up" data-delay="100">
            Featured Work
          </h2>
          <div className="portfolio-section-decoration" aria-hidden="true"></div>
        </header>
        <div className="portfolio-projects-grid">
          {projects.map((project, index) => (
            <article
              key={index}
              className="portfolio-project-card"
              data-animate="fade-up"
              data-delay={200 + (index * 100)}
              data-hover-lift="true"
            >
              <div className="portfolio-project-visual">
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt={`${project.title} preview`}
                    className="portfolio-project-image"
                  />
                ) : (
                  <div className="portfolio-project-placeholder" aria-hidden="true">
                    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="8" width="48" height="48" rx="4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M20 28H44M20 36H36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="16" cy="16" r="4" fill="currentColor"/>
                    </svg>
                  </div>
                )}
                <div className="portfolio-project-overlay" aria-hidden="true"></div>
              </div>
              <div className="portfolio-project-content">
                <div className="portfolio-project-header">
                  <span className="portfolio-project-type-badge">
                    {project.type}
                  </span>
                  <h3 className="portfolio-project-title">
                    {project.title}
                  </h3>
                </div>
                {project.role && (
                  <p className="portfolio-project-role">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                      <circle cx="8" cy="6" r="3" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M2 14C2 11.7909 3.79086 10 6 10H10C12.2091 10 14 11.7909 14 14" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {project.role}
                  </p>
                )}
                <p className="portfolio-project-description">
                  {project.description}
                </p>
                {project.achievements && project.achievements.length > 0 && (
                  <div className="portfolio-project-achievements">
                    <h4 className="portfolio-project-achievements-title">Key Results:</h4>
                    <ul className="portfolio-project-achievements-list" role="list">
                      {project.achievements.map((achievement, achievementIndex) => (
                        <li key={achievementIndex} className="portfolio-project-achievement-item" role="listitem">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                            <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="portfolio-project-technologies">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="portfolio-project-tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="portfolio-project-actions">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      className="portfolio-project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hover-lift="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M12 4L14 2M14 2H11M14 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M6 10L2 14M2 14H5M2 14V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Live Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      className="portfolio-project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-hover-lift="true"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path d="M8 2C4.58 2 2 4.58 2 8c0 2.66 1.72 4.91 4.11 5.71.3.05.41-.13.41-.29 0-.14 0-.61 0-1.12-1.51.33-1.90-.73-1.90-.73-.27-.7-.66-.88-.66-.88-.54-.37.04-.36.04-.36.6.04.92.62.92.62.54.93 1.41.66 1.75.5.05-.39.21-.66.38-.81-1.34-.15-2.75-.67-2.75-2.98 0-.66.23-1.2.62-1.62-.06-.15-.27-.77.06-1.6 0 0 .51-.16 1.66.62a5.63 5.63 0 013.03 0c1.15-.78 1.66-.62 1.66-.62.33.83.12 1.45.06 1.6.39.42.62.96.62 1.62 0 2.32-1.41 2.83-2.76 2.98.22.19.41.55.41 1.11 0 .8 0 1.45 0 1.65 0 .16.11.34.42.28A6.013 6.013 0 0014 8c0-3.42-2.58-6-6-6z"/>
                      </svg>
                      <span>View Code</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ProjectsSection;