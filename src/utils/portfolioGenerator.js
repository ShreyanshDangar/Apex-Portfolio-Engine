import { nanoid } from 'nanoid';
const COLOR_PALETTES = {
  minimal: {
    name: 'Minimal Monochrome',
    primary: { from: '#1e293b', to: '#334155' },
    secondary: { from: '#475569', to: '#64748b' },
    accent: { from: '#06b6d4', to: '#0891b2' },
    background: '#ffffff',
    text: '#0f172a'
  },
  professional: {
    name: 'Professional Blue',
    primary: { from: '#3b82f6', to: '#6366f1' },
    secondary: { from: '#8b5cf6', to: '#a855f7' },
    accent: { from: '#06b6d4', to: '#14b8a6' },
    background: '#f8fafc',
    text: '#1e293b'
  },
  bold: {
    name: 'Bold Gradient',
    primary: { from: '#ec4899', to: '#f97316' },
    secondary: { from: '#8b5cf6', to: '#06b6d4' },
    accent: { from: '#f59e0b', to: '#ef4444' },
    background: '#0f172a',
    text: '#f1f5f9'
  },
  creative: {
    name: 'Creative Warm',
    primary: { from: '#f59e0b', to: '#ef4444' },
    secondary: { from: '#ec4899', to: '#d946ef' },
    accent: { from: '#06b6d4', to: '#8b5cf6' },
    background: '#fffbeb',
    text: '#78350f'
  },
  tech: {
    name: 'Tech Cool',
    primary: { from: '#06b6d4', to: '#3b82f6' },
    secondary: { from: '#6366f1', to: '#8b5cf6' },
    accent: { from: '#14b8a6', to: '#06b6d4' },
    background: '#0c1222',
    text: '#e0f2fe'
  }
};
const TYPOGRAPHY_PAIRS = {
  classic: {
    heading: 'Playfair Display',
    body: 'Inter',
    code: 'JetBrains Mono'
  },
  modern: {
    heading: 'Inter',
    body: 'Inter',
    code: 'JetBrains Mono'
  },
  experimental: {
    heading: 'Space Grotesk',
    body: 'DM Sans',
    code: 'JetBrains Mono'
  }
};
export async function generatePortfolio(userData, dispatch) {
  dispatch({ type: 'START_GENERATION' });

  await delay(500);
  dispatch({
    type: 'UPDATE_GENERATION_PROGRESS',
    payload: { progress: 20, stage: 'Analyzing your data...' }
  });
  const industry = detectIndustry(userData);
  await delay(500);
  dispatch({
    type: 'UPDATE_GENERATION_PROGRESS',
    payload: { progress: 40, stage: 'Selecting theme...' }
  });
  const theme = generateTheme(userData.preferences, industry);
  await delay(500);
  dispatch({
    type: 'UPDATE_GENERATION_PROGRESS',
    payload: { progress: 60, stage: 'Optimizing layout...' }
  });
  const sections = generateSections(userData);
  await delay(500);
  dispatch({
    type: 'UPDATE_GENERATION_PROGRESS',
    payload: { progress: 80, stage: 'Generating content...' }
  });
  const optimizedContent = optimizeContent(userData);
  await delay(500);
  dispatch({
    type: 'UPDATE_GENERATION_PROGRESS',
    payload: { progress: 100, stage: 'Finalizing portfolio...' }
  });
  const portfolio = {
    id: nanoid(),
    metadata: {
      generatedAt: Date.now(),
      version: '1.0.0',
      industry
    },
    theme,
    sections,
    content: optimizedContent,
    pdfReady: true
  };
  await delay(300);
  dispatch({ type: 'GENERATION_COMPLETE', payload: portfolio });
  return portfolio;
}
function detectIndustry(userData) {
  const titles = userData.workExperience.map(e => e.title?.toLowerCase() || '').join(' ');
  const skills = userData.skills.technical.map(s => s.name?.toLowerCase() || '').join(' ');
  const combined = titles + ' ' + skills;
  if (/engineer|developer|programmer|software/.test(combined)) {
    return 'software-engineering';
  } else if (/design|ux|ui|creative/.test(combined)) {
    return 'design';
  } else if (/data|analyst|science/.test(combined)) {
    return 'data-analytics';
  } else if (/manager|director|business|sales/.test(combined)) {
    return 'business';
  } else if (/marketing|content|writer/.test(combined)) {
    return 'creative';
  }
  return 'general';
}
function generateTheme(preferences, industry) {
  const intensity = preferences.professionalIntensity || 50;
  let selectedPalette;
  if (intensity < 30) {
    selectedPalette = COLOR_PALETTES.minimal;
  } else if (intensity < 70) {
    if (industry === 'software-engineering' || industry === 'data-analytics') {
      selectedPalette = COLOR_PALETTES.tech;
    } else {
      selectedPalette = COLOR_PALETTES.professional;
    }
  } else {
    if (industry === 'design' || industry === 'creative') {
      selectedPalette = COLOR_PALETTES.creative;
    } else {
      selectedPalette = COLOR_PALETTES.bold;
    }
  }
  let typographyPair;
  if (intensity < 30) {
    typographyPair = TYPOGRAPHY_PAIRS.classic;
  } else if (intensity < 70) {
    typographyPair = TYPOGRAPHY_PAIRS.modern;
  } else {
    typographyPair = TYPOGRAPHY_PAIRS.experimental;
  }
  return {
    colors: selectedPalette,
    typography: typographyPair,
    spacing: preferences.layoutDensity === 'compact' ? 0.8 : preferences.layoutDensity === 'spacious' ? 1.2 : 1,
    animations: {
      enabled: true,
      intensity: intensity / 100
    }
  };
}
function generateSections(userData) {
  const sections = {
    hero: { visible: true, order: 1, data: userData.personalInfo },
    about: { visible: hasAboutData(userData), order: 2, data: generateAbout(userData) },
    skills: {
      visible: hasSkills(userData),
      order: 3,
      data: userData.skills,
      displayStyle: userData.skills.technical.length > 10 ? 'cloud' : 'bars'
    },
    experience: {
      visible: userData.workExperience.length > 0,
      order: shouldProjectsComeBefore(userData) ? 5 : 4,
      data: userData.workExperience
    },
    projects: {
      visible: userData.projects.length > 0,
      order: shouldProjectsComeBefore(userData) ? 4 : 6,
      data: userData.projects
    },
    education: {
      visible: userData.education.length > 0,
      order: isRecentGraduate(userData) ? 3 : 7,
      data: userData.education
    },
    certifications: {
      visible: userData.certifications.length > 0,
      order: 8,
      data: userData.certifications
    },
    contact: { visible: true, order: 9, data: userData.personalInfo }
  };
  const visibleSections = Object.entries(sections)
    .filter(([_, section]) => section.visible)
    .sort((a, b) => a[1].order - b[1].order);

  return Object.fromEntries(visibleSections);
}
function hasAboutData(userData) {
  return userData.workExperience.length > 0 || userData.projects.length > 0;
}
function hasSkills(userData) {
  return userData.skills.technical.length > 0 ||
         userData.skills.soft.length > 0 ||
         userData.skills.languages.length > 0;
}
function shouldProjectsComeBefore(userData) {
  return userData.projects.length >= 3 && userData.workExperience.length <= 2;
}
function isRecentGraduate(userData) {
  if (userData.education.length === 0) return false;
  const latestGradYear = Math.max(...userData.education.map(e => parseInt(e.graduationYear) || 0));
  const currentYear = new Date().getFullYear();
  return currentYear - latestGradYear <= 2;
}
function generateAbout(userData) {
  const experience = userData.workExperience[0];
  const projectCount = userData.projects.length;
  const topSkills = userData.skills.technical.slice(0, 5).map(s => s.name);
  const summary = `${experience?.title || 'Professional'} with expertise in ${topSkills.join(', ')}. ` +
    `${projectCount > 0 ? `Developed ${projectCount}+ projects ` : ''}` +
    `focused on delivering high-quality solutions.`;
  return {
    summary,
    highlights: [
      `${userData.workExperience.length}+ years of experience`,
      `${userData.skills.technical.length}+ technical skills`,
      `${projectCount} projects completed`
    ].filter(h => !h.includes('0'))
  };
}
function optimizeContent(userData) {
  return {
    ...userData,
    workExperience: userData.workExperience.map(exp => ({
      ...exp,
      description: enhanceDescription(exp.description)
    })),
    projects: userData.projects.map(proj => ({
      ...proj,
      description: enhanceDescription(proj.description)
    }))
  };
}
function enhanceDescription(text) {
  if (!text) return text;

  let enhanced = text.trim();

  if (!enhanced.endsWith('.')) {
    enhanced += '.';
  }
  const actionVerbs = ['Led', 'Developed', 'Implemented', 'Designed', 'Created', 'Built', 'Managed'];
  const startsWithAction = actionVerbs.some(verb => enhanced.startsWith(verb));
  if (!startsWithAction && enhanced.length > 10) {
    enhanced = 'Developed ' + enhanced.charAt(0).toLowerCase() + enhanced.slice(1);
  }
  return enhanced;
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function validateUserData(userData) {
  const errors = [];
  if (!userData.personalInfo.name) {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  if (!userData.personalInfo.title) {
    errors.push({ field: 'title', message: 'Professional title is required' });
  }
  if (userData.workExperience.length === 0 && userData.projects.length === 0) {
    errors.push({ field: 'experience', message: 'At least one work experience or project is required' });
  }
  if (userData.skills.technical.length < 3) {
    errors.push({ field: 'skills', message: 'At least 3 skills are required' });
  }
  return errors;
}