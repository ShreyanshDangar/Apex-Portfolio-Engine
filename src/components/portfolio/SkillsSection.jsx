import React from 'react';
const SkillsSection = ({ data, displayMode = 'tags' }) => {
  const skills = data?.skills || [
    { name: 'JavaScript', category: 'Programming', proficiency: 'Expert', years: 8 },
    { name: 'React', category: 'Framework', proficiency: 'Expert', years: 6 },
    { name: 'TypeScript', category: 'Programming', proficiency: 'Advanced', years: 5 },
    { name: 'Node.js', category: 'Backend', proficiency: 'Advanced', years: 6 },
    { name: 'Python', category: 'Programming', proficiency: 'Intermediate', years: 4 },
    { name: 'UI/UX Design', category: 'Design', proficiency: 'Expert', years: 8 },
    { name: 'Figma', category: 'Tools', proficiency: 'Expert', years: 5 },
    { name: 'AWS', category: 'Cloud', proficiency: 'Advanced', years: 4 },
    { name: 'Docker', category: 'DevOps', proficiency: 'Advanced', years: 3 },
    { name: 'PostgreSQL', category: 'Database', proficiency: 'Advanced', years: 5 },
    { name: 'Leadership', category: 'Soft Skills', proficiency: 'Expert', years: 6 },
    { name: 'Agile', category: 'Methodology', proficiency: 'Expert', years: 7 }
  ];
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
  return (
    <section className="portfolio-skills" data-animate="fade-in">
      <div className="portfolio-section-container">
        <header className="portfolio-section-header">
          <h2 className="portfolio-section-title" data-animate="fade-up" data-delay="100">
            Core Competencies
          </h2>
          <div className="portfolio-section-decoration" aria-hidden="true"></div>
        </header>
        {displayMode === 'tags' && (
          <div className="portfolio-skills-tags" data-animate="fade-up" data-delay="200">
            {skills.map((skill, index) => (
              <span
                key={index}
                className={`portfolio-skill-tag portfolio-skill-${skill.proficiency.toLowerCase()}`}
                data-proficiency={skill.proficiency}
                data-hover-lift="true"
              >
                {skill.name}
                {data?.showYears && skill.years && (
                  <span className="portfolio-skill-years">{skill.years}y</span>
                )}
              </span>
            ))}
          </div>
        )}
        {displayMode === 'bars' && (
          <div className="portfolio-skills-bars" data-animate="fade-up" data-delay="200">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="portfolio-skill-bar-item"
                data-animate="slide-left"
                data-delay={300 + (index * 50)}
              >
                <div className="portfolio-skill-bar-header">
                  <span className="portfolio-skill-bar-name">{skill.name}</span>
                  <span className="portfolio-skill-bar-level">{skill.proficiency}</span>
                </div>
                <div className="portfolio-skill-bar-track">
                  <div
                    className={`portfolio-skill-bar-fill portfolio-skill-bar-${skill.proficiency.toLowerCase()}`}
                    data-proficiency={skill.proficiency}
                    style={{width: skill.proficiency === 'Expert' ? '95%' : skill.proficiency === 'Advanced' ? '80%' : skill.proficiency === 'Intermediate' ? '60%' : '40%'}}
                    aria-label={`${skill.name} proficiency: ${skill.proficiency}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        )}
        {displayMode === 'categories' && (
          <div className="portfolio-skills-categories" data-animate="fade-up" data-delay="200">
            {Object.entries(groupedSkills).map(([category, categorySkills], index) => (
              <div
                key={category}
                className="portfolio-skill-category"
                data-animate="fade-up"
                data-delay={300 + (index * 100)}
                data-hover-lift="true"
              >
                <h3 className="portfolio-skill-category-title">
                  <span className="portfolio-skill-category-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
                      <circle cx="10" cy="10" r="3" fill="currentColor"/>
                    </svg>
                  </span>
                  {category}
                </h3>
                <div className="portfolio-skill-category-items">
                  {categorySkills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="portfolio-skill-category-item">
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
export default SkillsSection;