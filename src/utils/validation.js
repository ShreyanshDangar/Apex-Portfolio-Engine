export function validateEmail(email) {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
  return regex.test(email);
}
export function validateURL(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
export function validatePhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10 && cleaned.length <= 15;
}
export function validateRequired(value) {
  return value && value.toString().trim().length > 0;
}
export function validateMinLength(value, min) {
  return value && value.toString().trim().length >= min;
}
export function validateDate(dateString) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
export function validateDateRange(startDate, endDate) {
  if (!startDate || !endDate) return true;
  if (endDate === 'Present' || endDate === 'Current') return true;
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
}
export function suggestEmailCorrection(email) {
  const parts = email.split('@');
  if (parts.length !== 2) return null;
  const [username, domain] = parts;
  const lowerDomain = domain.toLowerCase();
  const typoMap = {
    'gmial.com': 'gmail.com',
    'gmai.com': 'gmail.com',
    'yahooo.com': 'yahoo.com',
    'outlok.com': 'outlook.com',
    'hotmial.com': 'hotmail.com'
  };
  if (typoMap[lowerDomain]) {
    return `${username}@${typoMap[lowerDomain]}`;
  }
  return null;
}
export const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳', format: 'XXXXX XXXXX' },
  { code: '+1', country: 'USA', flag: '🇺🇸', format: '(XXX) XXX-XXXX' },
  { code: '+1', country: 'Canada', flag: '🇨🇦', format: '(XXX) XXX-XXXX' },
  { code: '+44', country: 'UK', flag: '🇬🇧', format: 'XXXX XXXXXX' },
  { code: '+61', country: 'Australia', flag: '🇦🇺', format: 'XXX XXX XXX' },
  { code: '+49', country: 'Germany', flag: '🇩🇪', format: 'XXX XXXXXXXX' },
  { code: '+33', country: 'France', flag: '🇫🇷', format: 'X XX XX XX XX' },
  { code: '+31', country: 'Netherlands', flag: '🇳🇱', format: 'XX XXXXXXXX' },
  { code: '+47', country: 'Norway', flag: '🇳🇴', format: 'XXX XX XXX' },
  { code: '+46', country: 'Sweden', flag: '🇸🇪', format: 'XX XXX XX XX' },
  { code: '+41', country: 'Switzerland', flag: '🇨🇭', format: 'XX XXX XX XX' },
  { code: '+65', country: 'Singapore', flag: '🇸🇬', format: 'XXXX XXXX' },
  { code: '+81', country: 'Japan', flag: '🇯🇵', format: 'XX XXXX XXXX' },
  { code: '+82', country: 'South Korea', flag: '🇰🇷', format: 'XX XXXX XXXX' },
  { code: '+64', country: 'New Zealand', flag: '🇳🇿', format: 'XX XXX XXXX' }
];
export function formatPhoneNumber(phone, countryCode = '+91') {
  const cleaned = phone.replace(/\D/g, '');
  const country = COUNTRY_CODES.find(c => c.code === countryCode);
  if (!country) {
    if (cleaned.length === 10) {
      return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
    }
    return phone;
  }
  switch (countryCode) {
    case '+91':
      if (cleaned.length === 10) {
        return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
      }
      break;
    case '+1':
      if (cleaned.length === 10) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
      } else if (cleaned.length === 11 && cleaned[0] === '1') {
        return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
      }
      break;
    case '+44':
      if (cleaned.length === 10) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
      }
      break;
    case '+61':
      if (cleaned.length === 9) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
      }
      break;
    case '+49':
      if (cleaned.length >= 10) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      }
      break;
    case '+33':
      if (cleaned.length === 9) {
        return `${cleaned[0]} ${cleaned.slice(1, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 7)} ${cleaned.slice(7)}`;
      }
      break;
    case '+31':
      if (cleaned.length === 9) {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
      }
      break;
    case '+65':
      if (cleaned.length === 8) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
      }
      break;
    default:
      break;
  }
  return phone;
}
export function calculateDuration(startDate, endDate) {
  if (!startDate) return '';
  const start = new Date(startDate);
  const end = endDate === 'Present' || endDate === 'Current' ? new Date() : new Date(endDate);
  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  if (months < 12) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  } else {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  }
}