export const SKILLS_DATABASE = [
  { name: 'JavaScript', category: 'Programming Languages', popularity: 95 },
  { name: 'Python', category: 'Programming Languages', popularity: 90 },
  { name: 'TypeScript', category: 'Programming Languages', popularity: 85 },
  { name: 'Java', category: 'Programming Languages', popularity: 80 },
  { name: 'C++', category: 'Programming Languages', popularity: 70 },
  { name: 'C#', category: 'Programming Languages', popularity: 65 },
  { name: 'Go', category: 'Programming Languages', popularity: 60 },
  { name: 'Rust', category: 'Programming Languages', popularity: 55 },
  { name: 'PHP', category: 'Programming Languages', popularity: 60 },
  { name: 'Swift', category: 'Programming Languages', popularity: 50 },
  { name: 'Kotlin', category: 'Programming Languages', popularity: 50 },
  { name: 'React', category: 'Frontend Frameworks', popularity: 95 },
  { name: 'Vue.js', category: 'Frontend Frameworks', popularity: 75 },
  { name: 'Angular', category: 'Frontend Frameworks', popularity: 70 },
  { name: 'Next.js', category: 'Frontend Frameworks', popularity: 80 },
  { name: 'Svelte', category: 'Frontend Frameworks', popularity: 60 },
  { name: 'React Native', category: 'Frontend Frameworks', popularity: 70 },
  { name: 'Node.js', category: 'Backend Frameworks', popularity: 90 },
  { name: 'Express.js', category: 'Backend Frameworks', popularity: 85 },
  { name: 'Django', category: 'Backend Frameworks', popularity: 75 },
  { name: 'Flask', category: 'Backend Frameworks', popularity: 65 },
  { name: 'FastAPI', category: 'Backend Frameworks', popularity: 70 },
  { name: 'Spring Boot', category: 'Backend Frameworks', popularity: 70 },
  { name: 'Ruby on Rails', category: 'Backend Frameworks', popularity: 55 },
  { name: 'MongoDB', category: 'Databases', popularity: 80 },
  { name: 'PostgreSQL', category: 'Databases', popularity: 85 },
  { name: 'MySQL', category: 'Databases', popularity: 80 },
  { name: 'Redis', category: 'Databases', popularity: 70 },
  { name: 'Firebase', category: 'Databases', popularity: 65 },
  { name: 'DynamoDB', category: 'Databases', popularity: 60 },
  { name: 'AWS', category: 'Cloud & DevOps', popularity: 90 },
  { name: 'Azure', category: 'Cloud & DevOps', popularity: 75 },
  { name: 'Google Cloud', category: 'Cloud & DevOps', popularity: 70 },
  { name: 'Docker', category: 'Cloud & DevOps', popularity: 85 },
  { name: 'Kubernetes', category: 'Cloud & DevOps', popularity: 75 },
  { name: 'CI/CD', category: 'Cloud & DevOps', popularity: 80 },
  { name: 'Jenkins', category: 'Cloud & DevOps', popularity: 65 },
  { name: 'Terraform', category: 'Cloud & DevOps', popularity: 60 },
  { name: 'Git', category: 'Tools', popularity: 95 },
  { name: 'GitHub', category: 'Tools', popularity: 90 },
  { name: 'VS Code', category: 'Tools', popularity: 85 },
  { name: 'Figma', category: 'Tools', popularity: 80 },
  { name: 'Jira', category: 'Tools', popularity: 70 },
  { name: 'Postman', category: 'Tools', popularity: 75 },
  { name: 'HTML', category: 'Web Technologies', popularity: 95 },
  { name: 'CSS', category: 'Web Technologies', popularity: 95 },
  { name: 'Tailwind CSS', category: 'Web Technologies', popularity: 85 },
  { name: 'SCSS', category: 'Web Technologies', popularity: 70 },
  { name: 'GraphQL', category: 'Web Technologies', popularity: 70 },
  { name: 'REST APIs', category: 'Web Technologies', popularity: 90 },
  { name: 'WebSockets', category: 'Web Technologies', popularity: 60 },
  { name: 'Machine Learning', category: 'Data Science', popularity: 75 },
  { name: 'TensorFlow', category: 'Data Science', popularity: 70 },
  { name: 'PyTorch', category: 'Data Science', popularity: 70 },
  { name: 'Pandas', category: 'Data Science', popularity: 75 },
  { name: 'NumPy', category: 'Data Science', popularity: 75 },
  { name: 'scikit-learn', category: 'Data Science', popularity: 65 },
  { name: 'Agile', category: 'Methodologies', popularity: 85 },
  { name: 'Scrum', category: 'Methodologies', popularity: 80 },
  { name: 'Test-Driven Development', category: 'Methodologies', popularity: 70 },
  { name: 'Microservices', category: 'Methodologies', popularity: 75 }
];
export const SOFT_SKILLS = [
  'Leadership', 'Communication', 'Team Collaboration', 'Problem Solving',
  'Critical Thinking', 'Time Management', 'Adaptability', 'Creativity',
  'Project Management', 'Mentoring', 'Public Speaking', 'Negotiation'
];
export const COMPANIES_DATABASE = [
  'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Tesla',
  'SpaceX', 'IBM', 'Oracle', 'Salesforce', 'Adobe', 'Airbnb', 'Uber',
  'Lyft', 'Twitter', 'LinkedIn', 'Snapchat', 'Pinterest', 'Shopify',
  'Stripe', 'Square', 'PayPal', 'Intel', 'NVIDIA', 'AMD', 'Cisco',
  'Dell', 'HP', 'Accenture', 'Deloitte', 'McKinsey', 'BCG'
];
export function getRelatedSkills(skill) {
  const skillRelations = {
    'React': ['Redux', 'React Router', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    'JavaScript': ['TypeScript', 'Node.js', 'React', 'Vue.js', 'Express.js'],
    'Python': ['Django', 'Flask', 'FastAPI', 'Pandas', 'NumPy'],
    'Node.js': ['Express.js', 'MongoDB', 'PostgreSQL', 'TypeScript', 'REST APIs'],
    'AWS': ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux'],
    'Machine Learning': ['TensorFlow', 'PyTorch', 'Python', 'NumPy', 'Pandas']
  };
  return skillRelations[skill] || [];
}
export function suggestSkillsForRole(title) {
  const roleSuggestions = {
    'Software Engineer': ['JavaScript', 'Python', 'React', 'Node.js', 'Git', 'SQL'],
    'Frontend Developer': ['React', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS', 'Next.js'],
    'Backend Developer': ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Docker', 'AWS'],
    'Full Stack Developer': ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Docker', 'AWS'],
    'Data Scientist': ['Python', 'Machine Learning', 'TensorFlow', 'Pandas', 'NumPy', 'SQL'],
    'DevOps Engineer': ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform', 'Linux'],
    'Product Designer': ['Figma', 'Sketch', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing']
  };
  for (const [role, skills] of Object.entries(roleSuggestions)) {
    if (title.toLowerCase().includes(role.toLowerCase())) {
      return skills;
    }
  }
  return [];
}