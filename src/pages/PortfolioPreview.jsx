import { useApp } from '../context/AppContext';
import { ArrowLeftIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { exportToPDF, generatePDFFilename } from '../utils/pdfExporter';
import { motion } from 'framer-motion';
export default function PortfolioPreview() {
  const { state, dispatch } = useApp();
  const portfolio = state.generatedPortfolio;
  const userData = state.userData;
  const preferences = userData.preferences;
  const getDensityClasses = () => {
    switch (preferences.layoutDensity) {
      case 'spacious':
        return {
          container: 'p-16',
          section: 'space-y-16',
          sectionGap: 'mb-8',
          itemGap: 'space-y-8'
        };
      case 'compact':
        return {
          container: 'p-8',
          section: 'space-y-8',
          sectionGap: 'mb-4',
          itemGap: 'space-y-4'
        };
      default:
        return {
          container: 'p-12',
          section: 'space-y-12',
          sectionGap: 'mb-6',
          itemGap: 'space-y-6'
        };
    }
  };
  const getIntensityStyles = () => {
    const intensity = preferences.professionalIntensity;
    if (intensity <= 25) {
      return {
        headingColor: '#374151',
        accentColor: '#6b7280',
        borderWidth: '2px',
        cardStyle: 'border border-gray-200',
        skillStyle: 'px-3 py-1 bg-gray-50 text-gray-700 rounded-md text-sm'
      };
    } else if (intensity >= 75) {
      return {
        headingColor: portfolio?.theme?.colors?.primary?.from || '#2563eb',
        accentColor: '#0ea5e9',
        borderWidth: '4px',
        cardStyle: 'border-2 border-blue-200 shadow-lg bg-gradient-to-br from-blue-50 to-white',
        skillStyle: 'px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg font-medium shadow-sm'
      };
    } else {
      return {
        headingColor: portfolio?.theme?.colors?.primary?.from || '#3b82f6',
        accentColor: '#3b82f6',
        borderWidth: '3px',
        cardStyle: 'border border-gray-200 shadow-md',
        skillStyle: 'px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium'
      };
    }
  };
  const density = getDensityClasses();
  const styles = getIntensityStyles();
  const handleExport = async () => {
    const filename = generatePDFFilename(userData.personalInfo.name || 'Portfolio');
    try {
      await exportToPDF('portfolio-content', filename, dispatch);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Portfolio exported successfully!', type: 'success' }
      });
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Export failed. Please try again.', type: 'error' }
      });
    }
  };
  return (
    <div className="min-h-screen bg-dark-950">
      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => dispatch({ type: 'NAVIGATE_TO', payload: 'builder' })}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span>Back to Builder</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleExport}
              disabled={state.uiState.isExporting}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-glow-primary transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
              {state.uiState.isExporting ? `Exporting... ${state.uiState.exportProgress}%` : 'Export PDF'}
            </motion.button>
          </div>
        </div>
      </header>
      <main className="max-w-4xl mx-auto p-8">
        <div id="portfolio-content" className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className={`${density.container} ${density.section}`}>
            {/* Header Section with optional profile photo */}
            <div className="text-center">
              {/* Profile Photo */}
              {preferences.showProfilePhoto && userData.personalInfo.photo && (
                <div className="mb-6 flex justify-center">
                  <img
                    src={userData.personalInfo.photo}
                    alt={userData.personalInfo.name || 'Profile'}
                    className="w-32 h-32 rounded-full object-cover border-4 shadow-lg"
                    style={{ borderColor: styles.accentColor }}
                  />
                </div>
              )}
              <h1
                className="text-5xl font-bold mb-4"
                style={{ color: styles.headingColor }}
              >
                {userData.personalInfo.name || 'Your Name'}
              </h1>
              {userData.personalInfo.title && (
                <p className="text-2xl text-gray-700 mb-2">{userData.personalInfo.title}</p>
              )}
              {userData.personalInfo.location && (
                <p className="text-gray-600">{userData.personalInfo.location}</p>
              )}
              {/* Contact info */}
              <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
                {userData.personalInfo.email && (
                  <a href={`mailto:${userData.personalInfo.email}`} className="text-gray-600 hover:text-gray-900">
                    {userData.personalInfo.email}
                  </a>
                )}
                {userData.personalInfo.phone && (
                  <span className="text-gray-600">{userData.personalInfo.phone}</span>
                )}
              </div>
              {/* Social Links - conditionally shown */}
              {preferences.showSocialLinks && (userData.personalInfo.linkedin || userData.personalInfo.github) && (
                <div className="flex items-center justify-center gap-4 mt-4">
                  {userData.personalInfo.linkedin && (
                    <a
                      href={userData.personalInfo.linkedin.startsWith('http') ? userData.personalInfo.linkedin : `https://${userData.personalInfo.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      LinkedIn
                    </a>
                  )}
                  {userData.personalInfo.github && (
                    <a
                      href={userData.personalInfo.github.startsWith('http') ? userData.personalInfo.github : `https://${userData.personalInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 font-medium"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
            {/* Skills Section */}
            {userData.skills.technical.length > 0 && (
              <div>
                <h2
                  className={`text-3xl font-bold ${density.sectionGap} border-b-2 border-gray-300 pb-2`}
                  style={{ color: styles.headingColor }}
                >
                  Skills
                </h2>
                <div className="flex flex-wrap gap-3 mt-4">
                  {userData.skills.technical.map((skill) => (
                    <span
                      key={skill.name}
                      className={styles.skillStyle}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Experience Section */}
            {userData.workExperience.length > 0 && (
              <div>
                <h2
                  className={`text-3xl font-bold ${density.sectionGap} border-b-2 border-gray-300 pb-2`}
                  style={{ color: styles.headingColor }}
                >
                  Experience
                </h2>
                <div className={density.itemGap}>
                  {userData.workExperience.map((exp) => (
                    <div
                      key={exp.id}
                      className="pl-6"
                      style={{ borderLeft: `${styles.borderWidth} solid ${styles.accentColor}` }}
                    >
                      <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                      {exp.company && (
                        <p className="text-lg text-gray-700 font-medium">{exp.company}</p>
                      )}
                      {(exp.startDate || exp.endDate) && (
                        <p className="text-sm text-gray-500">
                          {exp.startDate} {exp.startDate && exp.endDate && '–'} {exp.current ? 'Present' : exp.endDate}
                        </p>
                      )}
                      {exp.description && (
                        <p className="text-gray-600 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Projects Section */}
            {userData.projects.length > 0 && (
              <div>
                <h2
                  className={`text-3xl font-bold ${density.sectionGap} border-b-2 border-gray-300 pb-2`}
                  style={{ color: styles.headingColor }}
                >
                  Projects
                </h2>
                <div className={density.itemGap}>
                  {userData.projects.map((project) => (
                    <div key={project.id} className={`rounded-lg p-6 ${styles.cardStyle}`}>
                      <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                      {project.type && (
                        <span className="text-sm text-gray-500 capitalize">{project.type}</span>
                      )}
                      {project.description && (
                        <p className="text-gray-600 mt-2">{project.description}</p>
                      )}
                      {(project.url || project.github) && (
                        <div className="flex gap-4 mt-3">
                          {project.url && (
                            <a
                              href={project.url.startsWith('http') ? project.url : `https://${project.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              View Project
                            </a>
                          )}
                          {project.github && (
                            <a
                              href={project.github.startsWith('http') ? project.github : `https://${project.github}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Education Section */}
            {userData.education.length > 0 && (
              <div>
                <h2
                  className={`text-3xl font-bold ${density.sectionGap} border-b-2 border-gray-300 pb-2`}
                  style={{ color: styles.headingColor }}
                >
                  Education
                </h2>
                <div className={density.itemGap}>
                  {userData.education.map((edu) => (
                    <div key={edu.id}>
                      <h3 className="text-lg font-bold text-gray-900">{edu.degree}</h3>
                      {edu.institution && (
                        <p className="text-gray-700">{edu.institution}</p>
                      )}
                      {edu.graduationYear && (
                        <p className="text-sm text-gray-500">{edu.graduationYear}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="text-center pt-8 border-t border-gray-300">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} {userData.personalInfo.name || 'Portfolio'}. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Built with APEX Portfolio Engine
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}