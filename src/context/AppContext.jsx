import { createContext, useContext, useReducer, useEffect, useCallback, useRef } from 'react';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
const AppContext = createContext();
const initialState = {
  userData: {
    personalInfo: {
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      photo: null
    },
    workExperience: [],
    education: [],
    certifications: [],
    skills: {
      technical: [],
      soft: [],
      languages: []
    },
    projects: [],
    preferences: {
      professionalIntensity: 50,
      colorTheme: 'auto',
      typography: 'auto',
      layoutDensity: 'balanced',
      showProfilePhoto: true,
      showSocialLinks: true
    }
  },
  uiState: {
    currentPage: 'landing',
    builderTab: 'upload',
    currentStep: 1,
    isGenerating: false,
    generationProgress: 0,
    generationStage: '',
    previewZoom: 100,
    previewDevice: 'desktop',
    isExporting: false,
    exportProgress: 0,
    errors: [],
    notifications: [],
    isDirty: false,
    lastSaved: null,
    scrollPositions: {},
    showSessionPopup: false,
    hasExistingSession: false
  },
  generatedPortfolio: null,
  parsedResumeData: null
};
const appReducer = produce((draft, action) => {
  switch (action.type) {
    case 'UPDATE_PERSONAL_INFO':
      Object.assign(draft.userData.personalInfo, action.payload);
      draft.uiState.isDirty = true;
      break;
    case 'ADD_EXPERIENCE':
      draft.userData.workExperience.push({ id: nanoid(), ...action.payload });
      draft.uiState.isDirty = true;
      break;
    case 'UPDATE_EXPERIENCE':
      const expIndex = draft.userData.workExperience.findIndex(e => e.id === action.payload.id);
      if (expIndex !== -1) {
        Object.assign(draft.userData.workExperience[expIndex], action.payload);
        draft.uiState.isDirty = true;
      }
      break;
    case 'DELETE_EXPERIENCE':
      draft.userData.workExperience = draft.userData.workExperience.filter(e => e.id !== action.payload);
      draft.uiState.isDirty = true;
      break;
    case 'REORDER_EXPERIENCES':
      draft.userData.workExperience = action.payload;
      draft.uiState.isDirty = true;
      break;
    case 'ADD_EDUCATION':
      draft.userData.education.push({ id: nanoid(), ...action.payload });
      draft.uiState.isDirty = true;
      break;
    case 'UPDATE_EDUCATION':
      const eduIndex = draft.userData.education.findIndex(e => e.id === action.payload.id);
      if (eduIndex !== -1) {
        Object.assign(draft.userData.education[eduIndex], action.payload);
        draft.uiState.isDirty = true;
      }
      break;
    case 'DELETE_EDUCATION':
      draft.userData.education = draft.userData.education.filter(e => e.id !== action.payload);
      draft.uiState.isDirty = true;
      break;
    case 'ADD_CERTIFICATION':
      draft.userData.certifications.push({ id: nanoid(), ...action.payload });
      draft.uiState.isDirty = true;
      break;
    case 'UPDATE_CERTIFICATION':
      const certIndex = draft.userData.certifications.findIndex(c => c.id === action.payload.id);
      if (certIndex !== -1) {
        Object.assign(draft.userData.certifications[certIndex], action.payload);
        draft.uiState.isDirty = true;
      }
      break;
    case 'DELETE_CERTIFICATION':
      draft.userData.certifications = draft.userData.certifications.filter(c => c.id !== action.payload);
      draft.uiState.isDirty = true;
      break;
    case 'ADD_SKILL':
      const category = action.payload.category || 'technical';
      draft.userData.skills[category].push(action.payload);
      draft.uiState.isDirty = true;
      break;
    case 'UPDATE_SKILL':
      const skillCategory = action.payload.category || 'technical';
      const skillIndex = draft.userData.skills[skillCategory].findIndex(s => s.name === action.payload.name);
      if (skillIndex !== -1) {
        Object.assign(draft.userData.skills[skillCategory][skillIndex], action.payload);
        draft.uiState.isDirty = true;
      }
      break;
    case 'DELETE_SKILL':
      const delCategory = action.payload.category || 'technical';
      draft.userData.skills[delCategory] = draft.userData.skills[delCategory].filter(s => s.name !== action.payload.name);
      draft.uiState.isDirty = true;
      break;
    case 'ADD_PROJECT':
      draft.userData.projects.push({ id: nanoid(), ...action.payload });
      draft.uiState.isDirty = true;
      break;
    case 'UPDATE_PROJECT':
      const projIndex = draft.userData.projects.findIndex(p => p.id === action.payload.id);
      if (projIndex !== -1) {
        Object.assign(draft.userData.projects[projIndex], action.payload);
        draft.uiState.isDirty = true;
      }
      break;
    case 'DELETE_PROJECT':
      draft.userData.projects = draft.userData.projects.filter(p => p.id !== action.payload);
      draft.uiState.isDirty = true;
      break;
    case 'REORDER_PROJECTS':
      draft.userData.projects = action.payload;
      draft.uiState.isDirty = true;
      break;
    case 'UPDATE_PREFERENCES':
      Object.assign(draft.userData.preferences, action.payload);
      draft.uiState.isDirty = true;
      break;
    case 'SAVE_SCROLL_POSITION':
      draft.uiState.scrollPositions[action.payload.page] = action.payload.position;
      break;
    case 'NAVIGATE_TO':
      draft.uiState.currentPage = action.payload;
      break;
    case 'NAVIGATE_BACK_TO_LANDING':
      draft.uiState.currentPage = 'landing';
      break;
    case 'SET_BUILDER_TAB':
      draft.uiState.builderTab = action.payload;
      break;
    case 'SHOW_SESSION_POPUP':
      draft.uiState.showSessionPopup = true;
      break;
    case 'HIDE_SESSION_POPUP':
      draft.uiState.showSessionPopup = false;
      break;
    case 'TERMINATE_SESSION':
      draft.userData = initialState.userData;
      draft.uiState.currentStep = 1;
      draft.uiState.builderTab = 'upload';
      draft.uiState.showSessionPopup = false;
      draft.generatedPortfolio = null;
      draft.parsedResumeData = null;
      break;
    case 'CONTINUE_SESSION':
      draft.uiState.showSessionPopup = false;
      break;
    case 'CHECK_EXISTING_SESSION':
      const hasData = draft.userData.personalInfo.name ||
                      draft.userData.workExperience.length > 0 ||
                      draft.userData.education.length > 0 ||
                      draft.userData.projects.length > 0;
      draft.uiState.hasExistingSession = hasData;
      break;
    case 'NEXT_STEP':
      if (draft.uiState.currentStep < 6) {
        draft.uiState.currentStep += 1;
      }
      break;
    case 'PREVIOUS_STEP':
      if (draft.uiState.currentStep > 1) {
        draft.uiState.currentStep -= 1;
      }
      break;
    case 'JUMP_TO_STEP':
      draft.uiState.currentStep = action.payload;
      break;
    case 'START_GENERATION':
      draft.uiState.isGenerating = true;
      draft.uiState.generationProgress = 0;
      draft.uiState.generationStage = 'Analyzing your data...';
      break;
    case 'UPDATE_GENERATION_PROGRESS':
      draft.uiState.generationProgress = action.payload.progress;
      draft.uiState.generationStage = action.payload.stage;
      break;
    case 'GENERATION_COMPLETE':
      draft.uiState.isGenerating = false;
      draft.uiState.generationProgress = 100;
      draft.generatedPortfolio = action.payload;
      draft.uiState.currentPage = 'preview';
      break;
    case 'SET_PREVIEW_ZOOM':
      draft.uiState.previewZoom = action.payload;
      break;
    case 'SET_PREVIEW_DEVICE':
      draft.uiState.previewDevice = action.payload;
      break;
    case 'START_EXPORT':
      draft.uiState.isExporting = true;
      draft.uiState.exportProgress = 0;
      break;
    case 'UPDATE_EXPORT_PROGRESS':
      draft.uiState.exportProgress = action.payload;
      break;
    case 'EXPORT_COMPLETE':
      draft.uiState.isExporting = false;
      draft.uiState.exportProgress = 100;
      break;
    case 'ADD_ERROR':
      draft.uiState.errors.push({ id: nanoid(), ...action.payload });
      break;
    case 'CLEAR_ERROR':
      draft.uiState.errors = draft.uiState.errors.filter(e => e.id !== action.payload);
      break;
    case 'ADD_NOTIFICATION':
      draft.uiState.notifications.push({ id: nanoid(), ...action.payload, timestamp: Date.now() });
      break;
    case 'CLEAR_NOTIFICATION':
      draft.uiState.notifications = draft.uiState.notifications.filter(n => n.id !== action.payload);
      break;
    case 'MARK_DIRTY':
      draft.uiState.isDirty = true;
      break;
    case 'MARK_CLEAN':
      draft.uiState.isDirty = false;
      draft.uiState.lastSaved = Date.now();
      break;
    case 'PARSING_COMPLETE':
      draft.parsedResumeData = action.payload;
      break;
    case 'ACCEPT_PARSED_DATA':
      if (draft.parsedResumeData) {
        Object.assign(draft.userData.personalInfo, draft.parsedResumeData.personalInfo || {});
        draft.userData.workExperience = draft.parsedResumeData.experience || [];
        draft.userData.education = draft.parsedResumeData.education || [];
        draft.userData.skills.technical = draft.parsedResumeData.skills || [];
        draft.userData.projects = draft.parsedResumeData.projects || [];
        draft.parsedResumeData = null;
        draft.uiState.builderTab = 'manual';
        draft.uiState.currentStep = 1;
      }
      break;
    case 'LOAD_STATE':
      return action.payload;
    case 'RESET_STATE':
      return initialState;
    default:
      break;
  }
});
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (initial) => {
    const saved = localStorage.getItem('apex_app_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...initial,
          ...parsed,
          uiState: {
            ...initial.uiState,
            ...parsed.uiState,
            currentPage: 'landing',
            showSessionPopup: false
          }
        };
      } catch (e) {
        console.error('Failed to load saved state:', e);
      }
    }
    return initial;
  });
  const scrollPositionRef = useRef({});
  useEffect(() => {
    const saveTimeout = setTimeout(() => {
      if (state.uiState.isDirty) {
        localStorage.setItem('apex_app_state', JSON.stringify(state));
        dispatch({ type: 'MARK_CLEAN' });
      }
    }, 2000);
    return () => clearTimeout(saveTimeout);
  }, [state]);
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (state.uiState.isDirty) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state.uiState.isDirty]);
  useEffect(() => {
    if (state.uiState.currentPage === 'landing') {
      const savedPos = scrollPositionRef.current['landing'];
      if (savedPos) {
        setTimeout(() => window.scrollTo(0, savedPos), 100);
      }
    }
  }, [state.uiState.currentPage]);
  const saveScrollPosition = useCallback(() => {
    scrollPositionRef.current['landing'] = window.scrollY;
  }, []);
  const navigateToBuilder = useCallback(() => {
    saveScrollPosition();
    dispatch({ type: 'CHECK_EXISTING_SESSION' });
    const hasData = state.userData.personalInfo.name ||
                    state.userData.workExperience.length > 0 ||
                    state.userData.education.length > 0 ||
                    state.userData.projects.length > 0;
    if (hasData) {
      dispatch({ type: 'SHOW_SESSION_POPUP' });
    } else {
      dispatch({ type: 'NAVIGATE_TO', payload: 'builder' });
    }
  }, [state.userData, saveScrollPosition]);
  const notify = useCallback((message, type = 'info') => {
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message, type }
    });
    setTimeout(() => {
      const id = state.uiState.notifications[state.uiState.notifications.length - 1]?.id;
      if (id) {
        dispatch({ type: 'CLEAR_NOTIFICATION', payload: id });
      }
    }, 5000);
  }, [state.uiState.notifications]);
  const contextValue = {
    state,
    dispatch,
    notify,
    saveScrollPosition,
    navigateToBuilder
  };
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
export default AppContext;