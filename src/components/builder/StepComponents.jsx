import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  XMarkIcon,
  ChevronDownIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';
import { formatPhoneNumber, COUNTRY_CODES } from '../../utils/validation';
import Input from '../shared/Input';
const SKILLS_DATABASE = [
  { name: 'JavaScript', category: 'Languages', popularity: 95 },
  { name: 'Python', category: 'Languages', popularity: 92 },
  { name: 'TypeScript', category: 'Languages', popularity: 88 },
  { name: 'Java', category: 'Languages', popularity: 82 },
  { name: 'C++', category: 'Languages', popularity: 75 },
  { name: 'C#', category: 'Languages', popularity: 72 },
  { name: 'Go', category: 'Languages', popularity: 68 },
  { name: 'Rust', category: 'Languages', popularity: 62 },
  { name: 'PHP', category: 'Languages', popularity: 60 },
  { name: 'Swift', category: 'Languages', popularity: 58 },
  { name: 'React', category: 'Frontend', popularity: 95 },
  { name: 'Vue.js', category: 'Frontend', popularity: 78 },
  { name: 'Angular', category: 'Frontend', popularity: 72 },
  { name: 'Next.js', category: 'Frontend', popularity: 85 },
  { name: 'Svelte', category: 'Frontend', popularity: 65 },
  { name: 'Tailwind CSS', category: 'Frontend', popularity: 88 },
  { name: 'HTML/CSS', category: 'Frontend', popularity: 95 },
  { name: 'React Native', category: 'Frontend', popularity: 72 },
  { name: 'Node.js', category: 'Backend', popularity: 90 },
  { name: 'Express.js', category: 'Backend', popularity: 82 },
  { name: 'Django', category: 'Backend', popularity: 75 },
  { name: 'Flask', category: 'Backend', popularity: 68 },
  { name: 'FastAPI', category: 'Backend', popularity: 72 },
  { name: 'Spring Boot', category: 'Backend', popularity: 70 },
  { name: 'Ruby on Rails', category: 'Backend', popularity: 55 },
  { name: 'PostgreSQL', category: 'Databases', popularity: 88 },
  { name: 'MongoDB', category: 'Databases', popularity: 82 },
  { name: 'MySQL', category: 'Databases', popularity: 80 },
  { name: 'Redis', category: 'Databases', popularity: 72 },
  { name: 'Firebase', category: 'Databases', popularity: 68 },
  { name: 'GraphQL', category: 'Databases', popularity: 75 },
  { name: 'AWS', category: 'DevOps', popularity: 92 },
  { name: 'Docker', category: 'DevOps', popularity: 88 },
  { name: 'Kubernetes', category: 'DevOps', popularity: 78 },
  { name: 'Azure', category: 'DevOps', popularity: 75 },
  { name: 'Google Cloud', category: 'DevOps', popularity: 72 },
  { name: 'CI/CD', category: 'DevOps', popularity: 82 },
  { name: 'Terraform', category: 'DevOps', popularity: 65 },
  { name: 'Linux', category: 'DevOps', popularity: 85 },
  { name: 'Git', category: 'Tools', popularity: 95 },
  { name: 'GitHub', category: 'Tools', popularity: 92 },
  { name: 'Figma', category: 'Tools', popularity: 80 },
  { name: 'Jira', category: 'Tools', popularity: 72 },
  { name: 'REST APIs', category: 'Tools', popularity: 88 },
  { name: 'Agile/Scrum', category: 'Tools', popularity: 78 }
];
const SKILL_CATEGORIES = ['Languages', 'Frontend', 'Backend', 'Databases', 'DevOps', 'Tools'];
function CollapsibleCard({ title, subtitle, isOpen, onToggle, onDelete, children }) {
  return (
    <motion.div
      layout
      className="glass rounded-xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header - Always visible */}
      <div
        className="flex items-center justify-between p-4 sm:p-5 cursor-pointer hover:bg-white/5 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDownIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
          </motion.div>
          <div className="min-w-0">
            <h4 className="text-white font-medium truncate">{title || 'New Entry'}</h4>
            {subtitle && (
              <p className="text-sm text-gray-400 truncate">{subtitle}</p>
            )}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors flex-shrink-0"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>
      {/* Collapsible Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-3 space-y-4 border-t border-white/10 mt-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
function PersonalInfoStep() {
  const { state, dispatch } = useApp();
  const personalInfo = state.userData.personalInfo;
  const [selectedCountry, setSelectedCountry] = useState('+91'); // Default to India
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const handleChange = (field, value) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { [field]: value }
    });
  };
  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value, selectedCountry);
    handleChange('phone', formatted);
  };
  const selectedCountryData = COUNTRY_CODES.find(c => c.code === selectedCountry) || COUNTRY_CODES[0];
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="pb-2">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Personal Information</h3>
        <p className="text-gray-400 text-sm">Tell us about yourself</p>
      </div>
      <div className="space-y-5">
        <Input
          label="Full Name"
          value={personalInfo.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="John Doe"
          required
        />
        <Input
          label="Professional Title"
          value={personalInfo.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Senior Software Engineer"
          required
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={personalInfo.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            required
          />
          {/* Phone with Country Selector */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-white">Phone</label>
            <div className="flex gap-2">
              {/* Country Code Selector */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                  className="flex items-center gap-1 px-3 py-2.5 glass border border-white/10 rounded-lg text-white text-sm hover:bg-white/5 transition-colors min-w-[90px]"
                >
                  <span>{selectedCountryData.flag}</span>
                  <span>{selectedCountry}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                </button>
                {/* Country Dropdown */}
                <AnimatePresence>
                  {showCountryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-1 w-56 glass border border-white/10 rounded-lg overflow-hidden z-50 max-h-60 overflow-y-auto"
                    >
                      {COUNTRY_CODES.map((country, idx) => (
                        <button
                          key={`${country.code}-${country.country}-${idx}`}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country.code);
                            setShowCountryDropdown(false);
                          }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                            selectedCountry === country.code && selectedCountryData.country === country.country
                              ? 'bg-primary-500/20 text-white'
                              : 'text-gray-300 hover:bg-white/5'
                          }`}
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="flex-1">{country.country}</span>
                          <span className="text-gray-500">{country.code}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* Phone Input */}
              <input
                type="tel"
                value={personalInfo.phone}
                onChange={(e) => handlePhoneChange(e.target.value)}
                placeholder={selectedCountryData.format}
                className="flex-1 px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
              />
            </div>
          </div>
        </div>
        <Input
          label="Location"
          value={personalInfo.location}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="San Francisco, CA"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="LinkedIn URL"
            value={personalInfo.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
          <Input
            label="GitHub URL"
            value={personalInfo.github}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="github.com/johndoe"
          />
        </div>
      </div>
    </div>
  );
}
function ExperienceStep() {
  const { state, dispatch } = useApp();
  const [expandedIds, setExpandedIds] = useState(new Set());
  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const addExperience = () => {
    dispatch({
      type: 'ADD_EXPERIENCE',
      payload: {
        title: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        technologies: []
      }
    });
    setTimeout(() => {
      const newExp = state.userData.workExperience[state.userData.workExperience.length];
      if (newExp) {
        setExpandedIds(prev => new Set([...prev, newExp.id]));
      }
    }, 100);
  };
  const updateExperience = (id, field, value) => {
    dispatch({
      type: 'UPDATE_EXPERIENCE',
      payload: { id, [field]: value }
    });
  };
  const deleteExperience = (id) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id });
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };
  const latestExpId = state.userData.workExperience[state.userData.workExperience.length - 1]?.id;
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Work Experience</h3>
          <p className="text-gray-400 text-sm">Add your professional experience</p>
        </div>
        <button
          onClick={addExperience}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm whitespace-nowrap"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Add Experience</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {state.userData.workExperience.map((exp, index) => (
            <CollapsibleCard
              key={exp.id}
              title={exp.title || `Experience ${index + 1}`}
              subtitle={exp.company}
              isOpen={expandedIds.has(exp.id) || exp.id === latestExpId}
              onToggle={() => toggleExpand(exp.id)}
              onDelete={() => deleteExperience(exp.id)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                  placeholder="Job Title"
                  value={exp.title}
                  onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
                />
                <input
                  className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                />
              </div>
              <input
                className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                placeholder="Location"
                value={exp.location || ''}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
              />
              <div className="grid grid-cols-2 gap-2 sm:gap-4">
                <input
                  className="w-full min-w-0 px-3 sm:px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-xs sm:text-sm"
                  placeholder="Start Date"
                  value={exp.startDate || ''}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                />
                <input
                  className="w-full min-w-0 px-3 sm:px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-xs sm:text-sm disabled:opacity-50"
                  placeholder="End Date"
                  value={exp.current ? 'Present' : exp.endDate || ''}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={exp.current || false}
                  onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary-500 focus:ring-primary-500"
                />
                I currently work here
              </label>
              <textarea
                className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none resize-none text-sm sm:text-base"
                placeholder="Describe your responsibilities and achievements..."
                rows={3}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
              />
            </CollapsibleCard>
          ))}
        </AnimatePresence>
        {state.userData.workExperience.length === 0 && (
          <div className="text-center py-10 sm:py-12 glass rounded-xl">
            <p className="text-gray-400 text-sm sm:text-base">No work experience added yet.</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Click "Add Experience" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
function EducationStep() {
  const { state, dispatch } = useApp();
  const [expandedIds, setExpandedIds] = useState(new Set());
  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const addEducation = () => {
    dispatch({
      type: 'ADD_EDUCATION',
      payload: {
        institution: '',
        degree: '',
        field: '',
        graduationYear: '',
        gpa: '',
        honors: ''
      }
    });
  };
  const updateEducation = (id, field, value) => {
    dispatch({
      type: 'UPDATE_EDUCATION',
      payload: { id, [field]: value }
    });
  };
  const deleteEducation = (id) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id });
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };
  const latestEduId = state.userData.education[state.userData.education.length - 1]?.id;
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Education</h3>
          <p className="text-gray-400 text-sm">Add your academic background</p>
        </div>
        <button
          onClick={addEducation}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm whitespace-nowrap"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Add Education</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {state.userData.education.map((edu, index) => (
            <CollapsibleCard
              key={edu.id}
              title={edu.degree || `Education ${index + 1}`}
              subtitle={edu.institution}
              isOpen={expandedIds.has(edu.id) || edu.id === latestEduId}
              onToggle={() => toggleExpand(edu.id)}
              onDelete={() => deleteEducation(edu.id)}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                  placeholder="Degree (e.g., B.S. Computer Science)"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                />
                <input
                  className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <input
                  className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                  placeholder="Field of Study"
                  value={edu.field || ''}
                  onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                />
                <input
                  className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                  placeholder="Graduation Year"
                  value={edu.graduationYear || ''}
                  onChange={(e) => updateEducation(edu.id, 'graduationYear', e.target.value)}
                />
                <input
                  className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                  placeholder="GPA (optional)"
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                />
              </div>
            </CollapsibleCard>
          ))}
        </AnimatePresence>
        {state.userData.education.length === 0 && (
          <div className="text-center py-10 sm:py-12 glass rounded-xl">
            <p className="text-gray-400 text-sm sm:text-base">No education added yet.</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Click "Add Education" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
function SkillsStep() {
  const { state, dispatch } = useApp();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const skillsByCategory = useMemo(() => {
    const grouped = {};
    SKILL_CATEGORIES.forEach(cat => {
      grouped[cat] = SKILLS_DATABASE.filter(s => s.category === cat)
        .sort((a, b) => b.popularity - a.popularity);
    });
    return grouped;
  }, []);
  const popularSkills = useMemo(() => {
    return SKILLS_DATABASE
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 15);
  }, []);
  const handleInputChange = (value) => {
    setInput(value);
    if (value.length > 0) {
      const filtered = SKILLS_DATABASE
        .filter(s => s.name.toLowerCase().includes(value.toLowerCase()))
        .filter(s => !state.userData.skills.technical.some(existing => existing.name === s.name))
        .slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  const addSkill = (skillName) => {
    if (state.userData.skills.technical.some(s => s.name === skillName)) return;
    dispatch({
      type: 'ADD_SKILL',
      payload: {
        name: skillName,
        proficiency: 'intermediate',
        category: 'technical'
      }
    });
    setInput('');
    setSuggestions([]);
    setShowSuggestions(false);
  };
  const removeSkill = (skillName) => {
    dispatch({
      type: 'DELETE_SKILL',
      payload: { name: skillName, category: 'technical' }
    });
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      addSkill(input.trim());
    }
  };
  const displaySkills = activeCategory === 'all'
    ? popularSkills
    : skillsByCategory[activeCategory] || [];
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="pb-2">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Skills</h3>
        <p className="text-gray-400 text-sm">Add your technical and professional skills</p>
      </div>
      {/* Search Input */}
      <div className="relative">
        <input
          className="w-full px-4 py-3 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
          placeholder="Search skills or type a custom skill and press Enter..."
          value={input}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => input.length > 0 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        {/* Autocomplete Suggestions */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 right-0 mt-2 glass border border-white/10 rounded-lg overflow-hidden z-20"
            >
              {suggestions.map((skill) => (
                <button
                  key={skill.name}
                  onClick={() => addSkill(skill.name)}
                  className="w-full px-4 py-2.5 text-left text-white hover:bg-white/5 transition-colors flex items-center justify-between text-sm"
                >
                  <span>{skill.name}</span>
                  <span className="text-xs text-gray-400 px-2 py-0.5 bg-white/5 rounded">{skill.category}</span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* Added Skills */}
      {state.userData.skills.technical.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-300">Your Skills</h4>
          <div className="flex flex-wrap gap-2">
            {state.userData.skills.technical.map((skill) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-lg text-white text-sm"
              >
                <span>{skill.name}</span>
                <button
                  onClick={() => removeSkill(skill.name)}
                  className="hover:text-red-400 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}
      {/* Category Tabs */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-300">Quick Add Skills</h4>
        <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-primary-500 text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            Popular
          </button>
          {SKILL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? 'bg-primary-500 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
          {displaySkills
            .filter(s => !state.userData.skills.technical.some(existing => existing.name === s.name))
            .slice(0, 12)
            .map((skill) => (
              <motion.button
                key={skill.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => addSkill(skill.name)}
                className="px-3 py-2 glass border border-white/10 rounded-lg text-white text-xs sm:text-sm hover:border-primary-500/50 hover:bg-primary-500/10 transition-all text-left truncate"
              >
                {skill.name}
              </motion.button>
            ))}
        </div>
      </div>
      {state.userData.skills.technical.length === 0 && (
        <div className="text-center py-6 text-gray-500 text-sm">
          Select skills from above or search for specific ones
        </div>
      )}
    </div>
  );
}
function ProjectsStep() {
  const { state, dispatch } = useApp();
  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggleExpand = (id) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };
  const addProject = () => {
    dispatch({
      type: 'ADD_PROJECT',
      payload: {
        title: '',
        type: 'personal',
        description: '',
        role: '',
        technologies: [],
        url: '',
        github: ''
      }
    });
  };
  const updateProject = (id, field, value) => {
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: { id, [field]: value }
    });
  };
  const deleteProject = (id) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id });
    setExpandedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };
  const latestProjectId = state.userData.projects[state.userData.projects.length - 1]?.id;
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex items-start sm:items-center justify-between gap-3 flex-col sm:flex-row pb-2">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Projects</h3>
          <p className="text-gray-400 text-sm">Showcase your work</p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm whitespace-nowrap"
        >
          <PlusIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Add Project</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {state.userData.projects.map((project, index) => (
            <CollapsibleCard
              key={project.id}
              title={project.title || `Project ${index + 1}`}
              subtitle={project.type ? project.type.charAt(0).toUpperCase() + project.type.slice(1) : null}
              isOpen={expandedIds.has(project.id) || project.id === latestProjectId}
              onToggle={() => toggleExpand(project.id)}
              onDelete={() => deleteProject(project.id)}
            >
              <input
                className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => updateProject(project.id, 'title', e.target.value)}
              />
              <div className="grid grid-cols-3 gap-2">
                {['personal', 'professional', 'open-source'].map((type) => (
                  <button
                    key={type}
                    onClick={() => updateProject(project.id, 'type', type)}
                    className={`px-3 py-2 rounded-lg text-xs sm:text-sm transition-all ${
                      project.type === type
                        ? 'bg-primary-500/20 border-primary-500 text-white border'
                        : 'bg-white/5 border-white/10 text-gray-400 border hover:bg-white/10'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
              <textarea
                className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none resize-none text-sm sm:text-base"
                placeholder="Describe your project..."
                rows={3}
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                  placeholder="Project URL (optional)"
                  value={project.url || ''}
                  onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                />
                <input
                  className="w-full px-4 py-2.5 glass border border-white/10 rounded-lg text-white placeholder-gray-500 focus:border-primary-500 focus:outline-none text-sm sm:text-base"
                  placeholder="GitHub Link (optional)"
                  value={project.github || ''}
                  onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                />
              </div>
            </CollapsibleCard>
          ))}
        </AnimatePresence>
        {state.userData.projects.length === 0 && (
          <div className="text-center py-10 sm:py-12 glass rounded-xl">
            <p className="text-gray-400 text-sm sm:text-base">No projects added yet.</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">Click "Add Project" to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
function StylePreferencesStep() {
  const { state, dispatch } = useApp();
  const preferences = state.userData.preferences;
  const updatePreference = (field, value) => {
    dispatch({
      type: 'UPDATE_PREFERENCES',
      payload: { [field]: value }
    });
  };
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { message: 'Photo must be less than 5MB', type: 'error' }
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch({
          type: 'UPDATE_PERSONAL_INFO',
          payload: { photo: reader.result }
        });
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { message: 'Profile photo uploaded!', type: 'success' }
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const removePhoto = () => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { photo: null }
    });
  };
  const intensityOptions = [
    { value: 25, label: 'Minimal', description: 'Clean and simple' },
    { value: 50, label: 'Balanced', description: 'Professional look' },
    { value: 75, label: 'Bold', description: 'Eye-catching design' }
  ];
  const densityOptions = [
    { value: 'spacious', label: 'Spacious' },
    { value: 'balanced', label: 'Balanced' },
    { value: 'compact', label: 'Compact' }
  ];
  const getClosestIntensity = () => {
    const current = preferences.professionalIntensity;
    return intensityOptions.reduce((prev, curr) =>
      Math.abs(curr.value - current) < Math.abs(prev.value - current) ? curr : prev
    ).value;
  };
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="pb-2">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Style Preferences</h3>
        <p className="text-gray-400 text-sm">Customize your portfolio's look and feel</p>
      </div>
      {/* Profile Photo Upload */}
      <div className="space-y-3">
        <label className="block text-white font-medium text-sm sm:text-base">Profile Photo</label>
        <div className="flex items-center gap-4">
          {state.userData.personalInfo.photo ? (
            <div className="relative">
              <img
                src={state.userData.personalInfo.photo}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary-500"
              />
              <button
                onClick={removePhoto}
                className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-dashed border-white/20 flex items-center justify-center">
              <span className="text-gray-500 text-xs text-center">No photo</span>
            </div>
          )}
          <div className="flex-1">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="inline-flex items-center gap-2 px-4 py-2 glass border border-white/10 rounded-lg text-white text-sm cursor-pointer hover:bg-white/5 transition-colors"
            >
              <PlusIcon className="w-4 h-4" />
              {state.userData.personalInfo.photo ? 'Change Photo' : 'Upload Photo'}
            </label>
            <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB</p>
          </div>
        </div>
      </div>
      {/* Professional Intensity - Now buttons instead of slider */}
      <div className="space-y-3">
        <label className="block text-white font-medium text-sm sm:text-base">
          Professional Intensity
        </label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {intensityOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updatePreference('professionalIntensity', option.value)}
              className={`relative px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-2 transition-all ${
                getClosestIntensity() === option.value
                  ? 'border-primary-500 bg-primary-500/20 text-white'
                  : 'border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              {getClosestIntensity() === option.value && (
                <div className="absolute -top-2 -right-2">
                  <CheckCircleIcon className="w-5 h-5 text-primary-500 bg-dark-900 rounded-full" />
                </div>
              )}
              <div className="text-center">
                <span className="block text-sm sm:text-base font-medium">{option.label}</span>
                <span className="block text-xs text-gray-500 mt-1 hidden sm:block">{option.description}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Layout Density */}
      <div className="space-y-3">
        <label className="block text-white font-medium text-sm sm:text-base">Layout Density</label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {densityOptions.map((option) => (
            <motion.button
              key={option.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => updatePreference('layoutDensity', option.value)}
              className={`relative px-3 sm:px-4 py-3 rounded-xl border-2 transition-all ${
                preferences.layoutDensity === option.value
                  ? 'border-primary-500 bg-primary-500/20 text-white'
                  : 'border-white/10 text-gray-400 hover:border-white/20 hover:bg-white/5'
              }`}
            >
              {preferences.layoutDensity === option.value && (
                <div className="absolute -top-2 -right-2">
                  <CheckCircleIcon className="w-5 h-5 text-primary-500 bg-dark-900 rounded-full" />
                </div>
              )}
              <span className="text-sm sm:text-base font-medium">{option.label}</span>
            </motion.button>
          ))}
        </div>
      </div>
      {/* Toggle Switches */}
      <div className="space-y-4">
        {/* Show Profile Photo Toggle */}
        <div className="flex items-center justify-between glass rounded-xl p-4">
          <div>
            <p className="text-white font-medium text-sm sm:text-base">Show Profile Photo</p>
            <p className="text-gray-400 text-xs sm:text-sm">Display your photo in the portfolio</p>
          </div>
          <button
            onClick={() => updatePreference('showProfilePhoto', !preferences.showProfilePhoto)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              preferences.showProfilePhoto ? 'bg-primary-500' : 'bg-white/10'
            }`}
          >
            <motion.div
              className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
              animate={{ x: preferences.showProfilePhoto ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
        {/* Show Social Links Toggle */}
        <div className="flex items-center justify-between glass rounded-xl p-4">
          <div>
            <p className="text-white font-medium text-sm sm:text-base">Show Social Links</p>
            <p className="text-gray-400 text-xs sm:text-sm">Display LinkedIn, GitHub links</p>
          </div>
          <button
            onClick={() => updatePreference('showSocialLinks', !preferences.showSocialLinks)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              preferences.showSocialLinks ? 'bg-primary-500' : 'bg-white/10'
            }`}
          >
            <motion.div
              className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full"
              animate={{ x: preferences.showSocialLinks ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>
      {/* Info text */}
      <p className="text-center text-gray-500 text-xs sm:text-sm">
        Click "Generate Portfolio" in the header or navigation to create your portfolio
      </p>
    </div>
  );
}
export default function StepComponents({ step }) {
  switch (step) {
    case 1:
      return <PersonalInfoStep />;
    case 2:
      return <ExperienceStep />;
    case 3:
      return <EducationStep />;
    case 4:
      return <SkillsStep />;
    case 5:
      return <ProjectsStep />;
    case 6:
      return <StylePreferencesStep />;
    default:
      return <PersonalInfoStep />;
  }
}
export {
  PersonalInfoStep,
  ExperienceStep,
  EducationStep,
  SkillsStep,
  ProjectsStep,
  StylePreferencesStep,
  CollapsibleCard
};