const express = require('express');
const cors = require('cors');
const { HfInference } = require('@huggingface/inference');
const app = express();
const PORT = process.env.SERVER_PORT || 5001;
app.use(cors());
app.use(express.json({ limit: '50mb' }));
const hf = new HfInference(process.env.HF_ACCESS_TOKEN);
function cleanText(text) {
  if (!text) return text;
  let cleaned = text;
  cleaned = cleaned.replace(/\b([A-Za-z])\s+(?=[A-Za-z]\s+[A-Za-z])/g, '$1');
  cleaned = cleaned.replace(/\bE\s*[-]?\s*n\s*[-]?\s*commerce\b/gi, 'E-commerce');
  cleaned = cleaned.replace(/\bE\s+commerce\b/gi, 'E-commerce');
  cleaned = cleaned.replace(/\bReal\s*[-]?\s*time\b/gi, 'Realtime');
  cleaned = cleaned.replace(/\s{2,}/g, ' ');
  cleaned = cleaned.replace(/\s+([,.:;!?])/g, '$1');
  return cleaned.trim();
}
const SYSTEM_PROMPT = `You are an expert resume parser AI. Extract ALL information from the resume text and return structured JSON.
CRITICAL RULES - READ CAREFULLY:
1. NAME: The person's FULL NAME from the first line/header. Usually 2-4 capitalized words like "Arjun Mehta", "John Smith". NEVER leave empty.
2. TITLE: Professional title like "Backend Software Engineer", "Android Developer", "Full Stack Developer". Usually appears right after name.
3. CONTACT INFO:
   - EMAIL: Any email with @ symbol
   - PHONE: Any phone number including +91, +1 formats with spaces/dashes
   - LOCATION: City, Country (e.g., "Bengaluru, India")
   - LINKEDIN: linkedin.com/in/username URL
   - GITHUB: github.com/username URL
4. EXPERIENCE - Extract EACH job separately with:
   - title: Exact job title (e.g., "Mobile Engineer – Android Developer")
   - company: Company name only (e.g., "TechCorp Solutions")
   - location: City if mentioned
   - startDate: Year or "YYYY" format
   - endDate: Year or "Present"
   - description: ALL bullet points combined into one description
   - technologies: Any tech mentioned for this role
5. EDUCATION - CRITICAL: Separate degree from institution!
   - degree: ONLY the degree type (e.g., "Bachelor of Technology in Computer Science")
   - institution: ONLY the school name (e.g., "XYZ Institute of Technology")
   - field: Field of study if separate from degree
   - graduationYear: Year of graduation
6. SKILLS - CRITICAL TABLE/LIST PARSING:
   Skills are often in TABLES or LABELED LISTS like:
   | Languages | Java, JavaScript, Python |
   | Frontend  | HTML, CSS, React        |
   OR:
   Languages: Java, JavaScript, Python
   Frontend: HTML, CSS, React
   Extract ONLY the actual skill names (Java, JavaScript, Python, HTML, CSS, React, etc.)
   DO NOT include category labels (Languages, Frontend, Backend, etc.) as skills.
   DO NOT make up skills not explicitly listed.
   Look for these skill categories: Languages, Frontend, Backend, Databases, DevOps, Tools, Frameworks
7. PROJECTS - Extract ALL projects from the resume:
   Projects may appear on any page (often page 2). Look for section header "PROJECTS"
   Common formats:
   - "Personal Project – Project Name" followed by bullet points
   - "Open-source Project – Project Name" followed by description
   - Project title followed by bullet points describing it
   For each project extract:
   - title: The project name (e.g., "Portfolio Generator", "API Starter Kit")
   - description: Combined bullet points describing the project
   - type: "personal", "open-source", or "professional"
   - technologies: Any tech mentioned (look for "Tech:" bullet points)
   - github: Any GitHub URLs mentioned
   DO NOT miss projects on page 2 or later pages!
IMPORTANT NOTES:
- For TABLE data: Extract cell contents, not row/column headers
- For skills in tables: If you see "Languages | Java, JavaScript, Python", extract ["Java", "JavaScript", "Python"]
- Keep degree and institution SEPARATE - never combine them
- Experience descriptions should include bullet points as sentences
- Only extract what's explicitly written - no assumptions
Return ONLY valid JSON:
{
  "personalInfo": {
    "name": "Full Name",
    "title": "Professional Title",
    "email": "email@example.com",
    "phone": "+91 90000 12345",
    "location": "City, Country",
    "linkedin": "https://linkedin.com/in/username",
    "github": "https://github.com/username"
  },
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "location": "City",
      "startDate": "2022",
      "endDate": "Present",
      "current": true,
      "description": "Combined bullet points as sentences.",
      "technologies": ["Tech1", "Tech2"]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Technology in Computer Science",
      "institution": "XYZ Institute of Technology",
      "field": "Computer Science",
      "graduationYear": "2023",
      "gpa": ""
    }
  ],
  "skills": ["Java", "JavaScript", "Python", "HTML", "CSS", "React", "Node.js", "Express", "MongoDB", "Docker", "Git"],
  "projects": [
    {
      "title": "Project Name",
      "description": "Description here",
      "type": "personal",
      "technologies": ["React", "Node.js"],
      "url": "",
      "github": ""
    }
  ]
}`;
function extractNameFromText(rawText) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  for (const line of lines.slice(0, 15)) {
    const nameMatch = line.match(/(?:Full\s+Name|Name)\s*[:\-]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)+)/i);
    if (nameMatch && nameMatch[1]) {
      return nameMatch[1].trim();
    }
  }
  for (let i = 0; i < Math.min(10, lines.length); i++) {
    const line = lines[i];
    if (line.includes('@') || line.includes('http') || line.includes('linkedin') ||
        line.includes('github') || line.match(/^\+?\d{10,}/) ||
        line.match(/^(resume|cv|curriculum|portfolio|step|personal|experience|education|skills|projects)/i) ||
        line.match(/^(phone|email|address|location|professional\s+title):/i) ||
        line.match(/^APEX|^Builder|Generated/i)) {
      continue;
    }
    const words = line.split(/\s+/).filter(w => w.length > 0);
    if (words.length >= 2 && words.length <= 4) {
      const isLikelyName = words.every(w =>
        /^[A-Z][a-z]+$/.test(w) ||
        /^[A-Z]+$/.test(w) ||
        /^[A-Z][a-z]+'[a-z]+$/.test(w) ||
        /^[A-Z][a-z]*\.?$/.test(w)
      );
      if (isLikelyName) {
        const filtered = words.filter(w =>
          !['Mr.', 'Mrs.', 'Ms.', 'Dr.', 'Prof.', 'Resume', 'CV', 'Portfolio'].includes(w) &&
          !/^(Senior|Junior|Lead|Staff|Software|Frontend|Backend|Full|Stack|Developer|Engineer|Manager|Analyst|Designer|Architect|Mobile|Web|Android|iOS|Data|Product|Project)$/i.test(w)
        );
        if (filtered.length >= 2 && filtered.length <= 4) {
          return filtered.join(' ');
        }
      }
    }
  }
  for (let i = 0; i < Math.min(5, lines.length); i++) {
    const line = lines[i];
    const namePattern = line.match(/^([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*$/);
    if (namePattern) {
      return namePattern[1];
    }
  }
  return '';
}
function extractTitleFromText(rawText) {
  const titlePatterns = [
    /(?:^|\n)([A-Z][a-z]+ (?:Software|Android|iOS|Web|Full[- ]?Stack|Frontend|Backend|Mobile|Data|ML|AI|Cloud|DevOps|QA|UI\/UX|Product|Project|Technical) (?:Engineer|Developer|Designer|Manager|Lead|Architect|Analyst|Specialist))/m,
    /(?:^|\n)((?:Senior|Junior|Lead|Principal|Staff) [A-Z][a-z]+ (?:Engineer|Developer|Designer|Manager))/m,
    /(?:Professional Title|Title|Role|Position)[:\s]+([A-Za-z\s]+(?:Engineer|Developer|Designer|Manager|Analyst|Architect))/i
  ];
  for (const pattern of titlePatterns) {
    const match = rawText.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  return '';
}
function sanitizePersonalInfo(info, rawText) {
  const sanitized = { ...info };
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const emailMatch = rawText.match(emailRegex);
  if (!sanitized.email || sanitized.email.length > 100) {
    sanitized.email = emailMatch ? emailMatch[0] : '';
  }
  const phonePatterns = [
    /\+91[\s.-]?\d{5}[\s.-]?\d{5}/,
    /\+\d{1,3}[\s.-]?\d{3,5}[\s.-]?\d{3,5}[\s.-]?\d{0,5}/,
    /\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}/,
    /\d{10,12}/
  ];
  if (!sanitized.phone || sanitized.phone.length > 25) {
    for (const phoneRegex of phonePatterns) {
      const phoneMatch = rawText.match(phoneRegex);
      if (phoneMatch) {
        sanitized.phone = phoneMatch[0].replace(/\s+/g, ' ').trim();
        break;
      }
    }
  }
  const githubPatterns = [
    /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i,
    /GitHub\s*(?:URL)?[:\s]+(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_-]+)/i,
    /github\.com\/([a-zA-Z0-9_-]+)(?:\/[a-zA-Z0-9_-]+)?/i
  ];
  if (!sanitized.github || !sanitized.github.includes('github')) {
    for (const pattern of githubPatterns) {
      const match = rawText.match(pattern);
      if (match && match[1]) {
        sanitized.github = `https://github.com/${match[1]}`;
        break;
      }
    }
  }
  if (sanitized.github && !sanitized.github.startsWith('http')) {
    if (sanitized.github.includes('github.com')) {
      sanitized.github = `https://${sanitized.github}`;
    } else {
      sanitized.github = `https://github.com/${sanitized.github}`;
    }
  }
  const linkedinPatterns = [
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i,
    /LinkedIn\s*(?:URL)?[:\s]+(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i,
    /linkedin\.com\/in\/([a-zA-Z0-9_-]+)/i
  ];
  if (!sanitized.linkedin || !sanitized.linkedin.includes('linkedin')) {
    for (const pattern of linkedinPatterns) {
      const match = rawText.match(pattern);
      if (match && match[1]) {
        sanitized.linkedin = `https://linkedin.com/in/${match[1]}`;
        break;
      }
    }
  }
  if (sanitized.linkedin && !sanitized.linkedin.startsWith('http')) {
    if (sanitized.linkedin.includes('linkedin.com')) {
      sanitized.linkedin = `https://${sanitized.linkedin}`;
    } else {
      sanitized.linkedin = `https://linkedin.com/in/${sanitized.linkedin}`;
    }
  }
  if (!sanitized.name || sanitized.name.length < 2 || sanitized.name.length > 50) {
    const extractedName = extractNameFromText(rawText);
    if (extractedName) {
      sanitized.name = extractedName;
    }
  }
  if (sanitized.name && sanitized.name.length > 50) {
    const words = sanitized.name.split(/[\s|,]+/).slice(0, 3);
    const cleanName = words.filter(w =>
      w.length > 1 &&
      !w.includes('@') &&
      !w.includes('.com') &&
      !w.match(/^\d+$/) &&
      !w.match(/^(Frontend|Backend|Software|Developer|Engineer|Manager|PROFESSIONAL|SUMMARY|TECHNICAL|SKILLS|EXPERIENCE|EDUCATION|PROJECTS)$/i)
    ).slice(0, 3).join(' ');
    sanitized.name = cleanName || '';
  }
  if (!sanitized.title || sanitized.title.length < 2) {
    const extractedTitle = extractTitleFromText(rawText);
    if (extractedTitle) {
      sanitized.title = extractedTitle;
    }
  }
  if (sanitized.title && sanitized.title.length > 60) {
    const titleWords = sanitized.title.split(/[\s|,]+/).slice(0, 6);
    sanitized.title = titleWords.filter(w =>
      !w.includes('@') &&
      !w.includes('.com') &&
      !w.match(/^\d{5,}$/)
    ).slice(0, 6).join(' ');
  }
  const techKeywords = ['react', 'javascript', 'python', 'node', 'vite', 'css', 'html', 'java', 'typescript'];
  if (sanitized.location) {
    const locLower = sanitized.location.toLowerCase();
    if (techKeywords.some(tech => locLower.includes(tech))) {
      sanitized.location = '';
    }
  }
  if (!sanitized.location || sanitized.location.length < 2) {
    const locationPatterns = [
      /(?:Location|Address|Based in|Located in)[:\s]+([A-Za-z\s,]+(?:India|USA|UK|Canada|Australia|Germany|France|Singapore|Dubai|Remote))/i,
      /([A-Z][a-z]+(?:,\s*)?(?:[A-Z]{2}|[A-Z][a-z]+))/
    ];
    for (const pattern of locationPatterns) {
      const match = rawText.match(pattern);
      if (match && match[1] && !techKeywords.some(t => match[1].toLowerCase().includes(t))) {
        sanitized.location = match[1].trim();
        break;
      }
    }
  }
  return sanitized;
}
function extractExperienceFromText(text) {
  const experiences = [];
  const expSection = text.match(/EXPERIENCE[\s\S]*?(?=EDUCATION|PROJECTS|SKILLS|$)/i);
  if (!expSection) return experiences;
  const expText = expSection[0];
  const patterns = [
    /([A-Za-z\s]+(?:Developer|Engineer|Designer|Manager|Analyst|Architect|Lead|Director|Specialist|Consultant)[A-Za-z\s–-]*)\n([A-Za-z\s&.,]+)\n(\d{4})\s*[-–—]\s*(\d{4}|Present)/gi,
    /([A-Za-z\s]+(?:Developer|Engineer|Designer|Manager|Analyst|Architect|Lead|Director|Specialist|Consultant))\s*[—–-]\s*([A-Za-z\s&.]+)\s*[,\(]?\s*(\d{4})\s*[-–—]\s*(\d{4}|Present)/gi,
    /([A-Za-z\s]+(?:Developer|Engineer|Designer|Manager|Analyst|Lead|Director))\n([A-Za-z\s&.,]+?)[\n,]\s*(\d{4})\s*[-–—]\s*(\d{4}|Present)/gi,
    /\*\*([A-Za-z\s–-]+(?:Developer|Engineer|Designer|Manager))\*\*\n([A-Za-z\s&.,]+)\n(\d{4})\s*[-–—]\s*(\d{4}|Present)/gi
  ];
  const foundPositions = new Set();
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(expText)) !== null) {
      const title = match[1].trim().replace(/\s+/g, ' ');
      const company = match[2].trim().replace(/,\s*$/, '').replace(/\s+/g, ' ');
      const key = `${title.toLowerCase()}-${company.toLowerCase()}`;
      if (foundPositions.has(key)) continue;
      foundPositions.add(key);
      const afterMatch = expText.substring(match.index + match[0].length);
      let description = '';
      const bulletMatches = afterMatch.match(/^[\s]*[•\-\*]\s*([^\n]+)/gm);
      if (bulletMatches) {
        description = bulletMatches
          .slice(0, 5)
          .map(b => b.replace(/^[\s]*[•\-\*]\s*/, '').trim())
          .join('. ');
      }
      let location = '';
      const locationMatch = match[2].match(/,\s*([A-Za-z\s]+)$/);
      if (locationMatch) {
        location = locationMatch[1].trim();
      }
      experiences.push({
        title: title,
        company: company.replace(/,\s*[A-Za-z\s]+$/, '').trim(),
        location: location,
        startDate: match[3],
        endDate: match[4],
        current: match[4].toLowerCase() === 'present',
        description: description.substring(0, 500),
        technologies: []
      });
    }
  }
  if (experiences.length === 0) {
    const simplePattern = /((?:Senior\s+|Junior\s+|Lead\s+)?[A-Za-z]+\s+(?:Developer|Engineer|Designer|Manager))/gi;
    let simpleMatch;
    while ((simpleMatch = simplePattern.exec(expText)) !== null) {
      const title = simpleMatch[1].trim();
      if (!experiences.some(e => e.title.toLowerCase() === title.toLowerCase())) {
        experiences.push({
          title: title,
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: '',
          technologies: []
        });
      }
    }
  }

  return experiences;
}
function extractEducationFromText(text) {
  const education = [];
  const eduSection = text.match(/(?:EDUCATION|ACADEMIC|QUALIFICATIONS)[\s\S]*?(?=EXPERIENCE|PROJECTS|SKILLS|CERTIFICATIONS|$)/i);
  const eduText = eduSection ? eduSection[0] : text;
  const degreePatterns = [
    /(Bachelor\s+of\s+(?:Technology|Science|Arts|Engineering|Business)(?:\s+in\s+[A-Za-z\s]+)?)/gi,
    /(Master(?:'s)?\s+(?:of\s+)?(?:Technology|Science|Arts|Engineering|Business)(?:\s+in\s+[A-Za-z\s]+)?)/gi,
    /(B\.?(?:Tech|S\.?|A\.?|E\.?)(?:\s+in)?\s+[A-Za-z\s]+)/gi,
    /(M\.?(?:Tech|S\.?|A\.?|B\.?A\.?)(?:\s+in)?\s+[A-Za-z\s]+|MBA|PhD|Doctorate)/gi
  ];
  const institutionPattern = /([A-Z][A-Za-z\s&.]+(?:University|Institute|College|School|Academy))/g;
  const yearPattern = /\b(19|20)\d{2}\b/g;
  let degrees = [];
  let institutions = [];
  let years = [];
  degreePatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(eduText)) !== null) {
      const degree = match[1].trim();
      if (degree.length > 3 && !degrees.some(d => d.toLowerCase() === degree.toLowerCase())) {
        degrees.push(degree);
      }
    }
  });
  let instMatch;
  while ((instMatch = institutionPattern.exec(eduText)) !== null) {
    const inst = instMatch[1].trim();
    if (!institutions.some(i => i.toLowerCase() === inst.toLowerCase())) {
      institutions.push(inst);
    }
  }
  let yearMatch;
  while ((yearMatch = yearPattern.exec(eduText)) !== null) {
    years.push(yearMatch[0]);
  }
  if (degrees.length > 0 && institutions.length > 0) {
    const count = Math.max(degrees.length, institutions.length);
    for (let i = 0; i < count; i++) {
      const degree = degrees[i] || degrees[degrees.length - 1];
      const institution = institutions[i] || institutions[institutions.length - 1];
      let field = '';
      const fieldMatch = degree.match(/(?:in|of)\s+([A-Za-z\s]+)$/i);
      if (fieldMatch) {
        field = fieldMatch[1].trim();
      }
      education.push({
        degree: degree,
        institution: institution,
        field: field,
        graduationYear: years[years.length - 1] || '',
        gpa: ''
      });
    }
  } else if (degrees.length > 0) {
    degrees.forEach(degree => {
      let field = '';
      const fieldMatch = degree.match(/(?:in|of)\s+([A-Za-z\s]+)$/i);
      if (fieldMatch) {
        field = fieldMatch[1].trim();
      }
      education.push({
        degree: degree,
        institution: '',
        field: field,
        graduationYear: years[years.length - 1] || '',
        gpa: ''
      });
    });
  } else if (institutions.length > 0) {
    institutions.forEach(institution => {
      education.push({
        degree: '',
        institution: institution,
        field: '',
        graduationYear: years[years.length - 1] || '',
        gpa: ''
      });
    });
  }
  const gpaMatch = eduText.match(/GPA[:\s]*(\d+\.?\d*)/i);
  if (gpaMatch && education.length > 0) {
    education[0].gpa = gpaMatch[1];
  }
  return education;
}
function extractProjectsFromText(text) {
  const projects = [];
  const projSection = text.match(/PROJECTS[\s\S]*?(?=EDUCATION|EXPERIENCE|SKILLS|CERTIFICATIONS|REFERENCES|$)/i);
  if (!projSection) return projects;

  const projText = projSection[0];
  const projectPatterns = [
    /(?:Personal|Open[- ]?source|Professional|Academic|Side)\s+Project\s*[—–-]\s*([^\n]+)/gi,
    /(?:^|\n)([A-Z][A-Za-z\s]+(?:Generator|Platform|App|Application|System|Tool|Website|Portal|Dashboard|Manager|Tracker|Kit|API|Service|Bot|Engine|Framework|Library|Plugin|Extension|Client|Server|Interface|Builder))\s*[—–-]?\s*(?:\n|$)/gi,
    /(?:^|\n)\*?\*?([A-Z][A-Za-z0-9\s-]+(?:Project|App|System|Platform|Tool|Generator|Kit|API))\*?\*?\s*(?:\n|$)/gi,
    /(?:^|\n)([A-Z][A-Za-z0-9\s-]{5,40})(?:\n\s*[•\-\*])/gm
  ];
  const foundProjects = new Set();
  for (const pattern of projectPatterns) {
    let match;
    while ((match = pattern.exec(projText)) !== null) {
      const title = match[1].trim()
        .replace(/^[•\-\*]\s*/, '')
        .replace(/\s*[—–-]\s*$/, '');
      if (title.length < 3 || title.length > 60) continue;
      if (foundProjects.has(title.toLowerCase())) continue;
      if (/^(PROJECTS?|EXPERIENCE|EDUCATION|SKILLS|This|The|A|An|I|We|My)\b/i.test(title)) continue;
      foundProjects.add(title.toLowerCase());
      const titleIndex = projText.indexOf(title);
      const afterTitle = projText.substring(titleIndex + title.length);
      let description = '';
      let technologies = [];
      let github = '';
      const bulletLines = afterTitle.match(/^[\s]*[•\-\*]\s*([^\n]+)/gm);
      if (bulletLines) {
        const descLines = [];
        bulletLines.slice(0, 5).forEach(line => {
          const content = line.replace(/^[\s]*[•\-\*]\s*/, '').trim();
          if (/^Tech(?:nolog(?:y|ies))?:/i.test(content)) {
            const techMatch = content.match(/Tech(?:nolog(?:y|ies))?:\s*(.+)/i);
            if (techMatch) {
              technologies = techMatch[1].split(/[,;]/).map(t => t.trim()).filter(Boolean);
            }
          }
          else if (/github/i.test(content)) {
            const ghMatch = content.match(/github\.com\/([a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)?)/i);
            if (ghMatch) {
              github = `https://github.com/${ghMatch[1]}`;
            }
          }
          else if (content.length > 10) {
            descLines.push(content);
          }
        });
        description = descLines.join(' ').substring(0, 300);
      }
      let type = 'personal';
      if (/open[- ]?source/i.test(projText.substring(Math.max(0, titleIndex - 30), titleIndex + title.length))) {
        type = 'open-source';
      } else if (/professional|work|client/i.test(projText.substring(Math.max(0, titleIndex - 30), titleIndex + title.length))) {
        type = 'professional';
      }
      projects.push({
        title: title,
        description: description,
        type: type,
        technologies: technologies,
        url: '',
        github: github
      });
    }
  }

  return projects;
}
function extractSkillsFromText(text) {
  const skills = [];
  const labeledPatterns = [
    /(?:Languages?|Programming(?:\s+Languages?)?)[:\s|]+([A-Za-z,\s\+\#\.]+?)(?:\n|$)/gi,
    /(?:Frontend|Front[- ]?end)[:\s|]+([A-Za-z,\s\+\#\.]+?)(?:\n|$)/gi,
    /(?:Backend|Back[- ]?end)[:\s|]+([A-Za-z,\s\+\#\.]+?)(?:\n|$)/gi,
    /(?:Databases?|Data\s*Stores?)[:\s|]+([A-Za-z,\s\+\#\.]+?)(?:\n|$)/gi,
    /(?:DevOps|Cloud|Infrastructure)[:\s|]+([A-Za-z,\s\+\#\.]+?)(?:\n|$)/gi,
    /(?:Tools?|Utilities)[:\s|]+([A-Za-z,\s\+\#\.]+?)(?:\n|$)/gi,
    /(?:Frameworks?)[:\s|]+([A-Za-z,\s\+\#\.]+?)(?:\n|$)/gi
  ];
  const extractedFromLabels = new Set();
  labeledPatterns.forEach(pattern => {
    let match;
    while ((match = pattern.exec(text)) !== null) {
      const skillList = match[1];
      skillList.split(/[,;]/).forEach(s => {
        const cleaned = s.trim();
        if (cleaned && cleaned.length <= 30 && /^[A-Za-z]/.test(cleaned)) {
          extractedFromLabels.add(cleaned);
        }
      });
    }
  });
  extractedFromLabels.forEach(skill => skills.push(skill));
  if (skills.length > 0) {
    return [...new Set(skills)];
  }
  const commonSkills = [
    'JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'Rust', 'PHP', 'Swift', 'Kotlin',
    'React', 'Angular', 'Vue', 'Next.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'Laravel',
    'HTML', 'HTML5', 'CSS', 'CSS3', 'Sass', 'SCSS', 'Tailwind', 'Tailwind CSS', 'Bootstrap', 'Material UI',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase', 'Supabase', 'GraphQL', 'REST', 'REST APIs',
    'AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'CI/CD', 'Git', 'GitHub', 'GitLab',
    'GitHub Actions', 'Vite', 'Webpack', 'Babel', 'ESLint', 'Jest', 'Mocha', 'Cypress',
    'Figma', 'Photoshop', 'Illustrator', 'XD',
    'Agile', 'Scrum', 'Jira', 'Linux', 'Unix',
    'Machine Learning', 'TensorFlow', 'PyTorch', 'Data Science',
    'Responsive Design', 'UI Optimization', 'UI/UX', 'Accessibility',
    'Postman', 'VS Code', 'IntelliJ', 'Android', 'iOS'
  ];
  const strictSkills = ['AI', 'Go', 'R'];
  commonSkills.forEach(skill => {
    const skillLower = skill.toLowerCase();
    const wordBoundaryRegex = new RegExp(`\\b${skillLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (wordBoundaryRegex.test(text)) {
      skills.push(skill);
    }
  });
  const skillsSectionMatch = text.match(/SKILLS[\s\S]*?(?=EXPERIENCE|EDUCATION|PROJECTS|$)/i);
  if (skillsSectionMatch) {
    const skillsSection = skillsSectionMatch[0];
    strictSkills.forEach(skill => {
      const strictRegex = new RegExp(`(?:^|[,\\s;|•·–-])${skill}(?:[,\\s;|•·–-]|$)`, 'g');
      if (strictRegex.test(skillsSection)) {
        skills.push(skill);
      }
    });
  }
  return [...new Set(skills)];
}
app.post('/api/parse-resume', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 50) {
      return res.status(400).json({ error: 'Invalid or too short resume text' });
    }
    const rawText = text.substring(0, 30000);
    let parsedData = null;
    let aiSucceeded = false;
    console.log(`Resume text length: ${text.length} characters, using: ${rawText.length}`);
    try {
      const prompt = `${SYSTEM_PROMPT}
RESUME TEXT TO PARSE:
---
${rawText}
---

IMPORTANT REMINDERS:
1. Extract the person's ACTUAL NAME from the resume (look at the first few lines)
2. Find their professional TITLE (e.g., "Software Engineer", "Android Developer")
3. Extract ALL contact information including email, phone, location
4. Include ALL work experiences with detailed descriptions
5. Include ALL education entries
6. List ALL skills mentioned (from tables or lists)
7. CRITICAL: Extract ALL projects - they may be on page 2! Look for "PROJECTS" section header
8. For projects: extract title, description (from bullet points), technologies, and GitHub links
Now parse the resume and return ONLY valid JSON:`;
      const response = await hf.textGeneration({
        model: 'deepseek-ai/DeepSeek-V3-0324',
        inputs: prompt,
        parameters: {
          max_new_tokens: 3000,
          temperature: 0.05,
          return_full_text: false,
          do_sample: false,
          top_p: 0.95
        }
      });
      let generatedText = response.generated_text || '';
      let jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          parsedData = JSON.parse(jsonMatch[0]);
          aiSucceeded = true;
        } catch (parseError) {
          let fixedJson = jsonMatch[0]
            .replace(/,\s*}/g, '}')
            .replace(/,\s*]/g, ']')
            .replace(/'/g, '"')
            .replace(/\n/g, ' ')
            .replace(/\t/g, ' ');
          try {
            parsedData = JSON.parse(fixedJson);
            aiSucceeded = true;
          } catch (e) {
            console.log('JSON fix failed, using fallback extraction');
          }
        }
      }
    } catch (aiError) {
      console.log('AI parsing failed, using fallback extraction:', aiError.message);
    }
    let personalInfo = {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: ''
    };
    if (aiSucceeded && parsedData?.personalInfo) {
      personalInfo = {
        name: parsedData.personalInfo.name || '',
        title: parsedData.personalInfo.title || '',
        email: parsedData.personalInfo.email || '',
        phone: parsedData.personalInfo.phone || '',
        location: parsedData.personalInfo.location || '',
        linkedin: parsedData.personalInfo.linkedin || '',
        github: parsedData.personalInfo.github || ''
      };
    }
    personalInfo = sanitizePersonalInfo(personalInfo, rawText);
    let experience = [];
    if (aiSucceeded && parsedData?.experience && Array.isArray(parsedData.experience) && parsedData.experience.length > 0) {
      experience = parsedData.experience.map(exp => ({
        title: exp.title || '',
        company: exp.company || '',
        location: exp.location || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        current: exp.current || (exp.endDate && exp.endDate.toLowerCase().includes('present')) || false,
        description: exp.description || '',
        technologies: exp.technologies || []
      }));
    }
    if (experience.length === 0) {
      experience = extractExperienceFromText(rawText);
    }
    let education = [];
    if (aiSucceeded && parsedData?.education && Array.isArray(parsedData.education) && parsedData.education.length > 0) {
      education = parsedData.education.map(edu => ({
        degree: edu.degree || '',
        institution: edu.institution || '',
        field: edu.field || '',
        graduationYear: edu.graduationYear || '',
        gpa: edu.gpa || ''
      }));
    }
    if (education.length === 0) {
      education = extractEducationFromText(rawText);
    }
    let skills = [];
    if (aiSucceeded && parsedData?.skills && Array.isArray(parsedData.skills)) {
      skills = parsedData.skills.map(skill =>
        typeof skill === 'string' ? skill : skill.name || ''
      ).filter(Boolean)
        .filter(s => !['Languages', 'Frontend', 'Backend', 'Databases', 'DevOps', 'Tools', 'Frameworks', 'Cloud', 'Infrastructure'].includes(s));
    }
    if (skills.length === 0) {
      skills = extractSkillsFromText(rawText);
    } else {
      const extractedSkills = extractSkillsFromText(rawText);
      extractedSkills.forEach(skill => {
        const normalized = skill.toLowerCase().trim();
        if (!skills.some(s => s.toLowerCase().trim() === normalized)) {
          const isStandardSkill = ['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Express', 'HTML', 'CSS',
            'MongoDB', 'PostgreSQL', 'Docker', 'Git', 'GitHub', 'AWS', 'TypeScript', 'REST APIs',
            'Postman', 'VS Code', 'GitHub Actions'].some(s => s.toLowerCase() === normalized);
          if (isStandardSkill) {
            skills.push(skill);
          }
        }
      });
    }
    skills = [...new Set(skills)].filter(s => s && s.length > 1 && s.length < 50);
    let projects = [];
    const fallbackProjects = extractProjectsFromText(rawText);
    console.log('Fallback projects extracted:', JSON.stringify(fallbackProjects, null, 2));
    if (aiSucceeded && parsedData?.projects && Array.isArray(parsedData.projects) && parsedData.projects.length > 0) {
      projects = parsedData.projects.map(proj => {
        const title = cleanText(proj.title) || '';
        const fallbackMatch = fallbackProjects.find(fp =>
          fp.title && title && (
            fp.title.toLowerCase().includes(title.toLowerCase()) ||
            title.toLowerCase().includes(fp.title.toLowerCase()) ||
            fp.title.toLowerCase() === title.toLowerCase()
          )
        );
        return {
          title: title,
          description: cleanText(proj.description) || (fallbackMatch ? fallbackMatch.description : ''),
          type: proj.type || (fallbackMatch ? fallbackMatch.type : 'personal'),
          technologies: (proj.technologies && proj.technologies.length > 0) ? proj.technologies : (fallbackMatch ? fallbackMatch.technologies : []),
          url: proj.url || '',
          github: proj.github || (fallbackMatch ? fallbackMatch.github : '')
        };
      });
    } else {
      projects = fallbackProjects.map(proj => ({
        ...proj,
        title: cleanText(proj.title),
        description: cleanText(proj.description)
      }));
    }
    console.log('Final projects:', JSON.stringify(projects, null, 2));
    const structuredData = {
      personalInfo,
      experience,
      education,
      skills,
      projects
    };
    console.log('Parsed resume data:', JSON.stringify(structuredData, null, 2));
    res.json({ success: true, data: structuredData });
  } catch (error) {
    console.error('Parse error:', error);
    res.status(500).json({ error: error.message || 'Failed to parse resume' });
  }
});
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});