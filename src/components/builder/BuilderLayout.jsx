import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeftIcon,
  ComputerDesktopIcon,
  DeviceTabletIcon,
  DevicePhoneMobileIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  XCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useApp } from '../../context/AppContext';
import { generatePortfolio } from '../../utils/portfolioGenerator';
import { parseResumePDF } from '../../utils/resumeParser';
import StepComponents from './StepComponents';
function BuilderHeader({ onGenerate }) {
  const { state, dispatch } = useApp();
  const progressPercentage = (state.uiState.currentStep / 6) * 100;
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/10">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Back button and title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => dispatch({ type: 'NAVIGATE_TO', payload: 'landing' })}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Back to home"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              <span className="hidden sm:inline text-sm">Back</span>
            </button>

            <div className="h-6 w-px bg-white/10 hidden sm:block" />

            <h1 className="text-base sm:text-lg font-semibold text-gradient">APEX Builder</h1>
          </div>
          {/* Center - Progress indicator (desktop only) */}
          {state.uiState.builderTab === 'manual' && (
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-400">
                  Step {state.uiState.currentStep} of 6
                </span>
                {/* Enhanced Progress Bar */}
                <div className="relative w-48 h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-400 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                  />
                  {/* Animated shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ['-100%', '100%']
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'linear'
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          {/* Right side - Generate button with animated hover effect */}
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onGenerate}
              disabled={state.uiState.isGenerating}
              className="group relative flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-white text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* Animated gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-[length:200%_100%] group-hover:animate-rainbow-glow transition-all" />
              {/* Glow effect on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary-400/20 via-white/20 to-accent-400/20 blur-lg" />
              {/* Border glow */}
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 20px rgba(37, 99, 235, 0.6), 0 0 40px rgba(6, 182, 212, 0.4), 0 0 60px rgba(37, 99, 235, 0.2)' }} />
              {/* Content */}
              <span className="relative flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 group-hover:animate-pulse" />
                <span className="hidden sm:inline">
                  {state.uiState.isGenerating ? 'Generating...' : 'Generate Portfolio'}
                </span>
                <span className="sm:hidden">
                  {state.uiState.isGenerating ? '...' : 'Generate'}
                </span>
              </span>
            </motion.button>
          </div>
        </div>
        {/* Mobile Progress Bar with Step Numbers */}
        {state.uiState.builderTab === 'manual' && (
          <div className="lg:hidden mt-3">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4, 5, 6].map((step) => (
                <div
                  key={step}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all ${
                    step === state.uiState.currentStep
                      ? 'bg-primary-500 text-white'
                      : step < state.uiState.currentStep
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white/10 text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
            <div className="relative w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
function ResumeUploadTab() {
  const { dispatch } = useApp();
  const [uploadState, setUploadState] = useState('idle');
  const [dragActive, setDragActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const fileInputRef = useRef(null);
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      await handleFile(files[0]);
    }
  };
  const handleChange = async (e) => {
    e.preventDefault();
    const files = e.target.files;
    if (files && files[0]) {
      await handleFile(files[0]);
    }
  };
  const handleFile = async (file) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }
    setError(null);
    setUploadState('uploading');
    setProgress(0);
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 100);
    try {
      const result = await parseResumePDF(file);
      clearInterval(progressInterval);
      setProgress(100);
      setUploadState('parsed');
      setParsedData(result);
      dispatch({ type: 'PARSING_COMPLETE', payload: result });
      setTimeout(() => {
        dispatch({ type: 'ACCEPT_PARSED_DATA' });
        dispatch({ type: 'JUMP_TO_STEP', payload: 6 });
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { message: 'Resume imported! Add your profile photo and generate.', type: 'success' }
        });
      }, 1000);
    } catch (err) {
      clearInterval(progressInterval);
      setUploadState('error');
      setError(err.message);
    }
  };
  const handleAccept = () => {
    if (parsedData) {
      dispatch({ type: 'ACCEPT_PARSED_DATA' });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Resume data imported successfully!', type: 'success' }
      });
    }
  };
  const handleRetry = () => {
    setUploadState('idle');
    setProgress(0);
    setError(null);
    setParsedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  return (
    <div className="p-4 sm:p-6 space-y-6">
      <AnimatePresence mode="wait">
        {uploadState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-colors ${
              dragActive
                ? 'border-primary-500 bg-primary-500/5'
                : 'border-white/10 bg-white/5'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleChange}
              className="hidden"
            />
            <CloudArrowUpIcon className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
              Upload Your Resume
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto text-sm sm:text-base">
              Drag and drop your PDF resume here, or click to browse. We'll automatically extract your information.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:shadow-glow-primary transition-shadow"
            >
              Choose File
            </button>
            <p className="text-xs text-gray-500 mt-4">PDF only, max 10MB</p>
          </motion.div>
        )}
        {uploadState === 'uploading' && (
          <motion.div
            key="uploading"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <DocumentTextIcon className="w-10 h-10 text-primary-500" />
              <div className="flex-1">
                <p className="text-white font-medium">Processing your resume...</p>
                <p className="text-sm text-gray-400">Extracting information</p>
              </div>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
        {uploadState === 'complete' && parsedData && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="space-y-4"
          >
            <div className="glass rounded-2xl p-4 sm:p-6 border border-emerald-500/20">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircleIcon className="w-8 h-8 text-emerald-500" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Resume Parsed Successfully!</h3>
                  <p className="text-sm text-gray-400">
                    Confidence: {Math.round(parsedData.confidence * 100)}%
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                {parsedData.personalInfo?.name && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 min-w-20 sm:min-w-24">Name:</span>
                    <span className="text-white">{parsedData.personalInfo.name}</span>
                  </div>
                )}
                {parsedData.personalInfo?.email && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 min-w-20 sm:min-w-24">Email:</span>
                    <span className="text-white break-all">{parsedData.personalInfo.email}</span>
                  </div>
                )}
                {parsedData.experience?.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 min-w-20 sm:min-w-24">Experience:</span>
                    <span className="text-white">{parsedData.experience.length} positions found</span>
                  </div>
                )}
                {parsedData.education?.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 min-w-20 sm:min-w-24">Education:</span>
                    <span className="text-white">{parsedData.education.length} degrees found</span>
                  </div>
                )}
                {parsedData.skills?.length > 0 && (
                  <div className="flex items-start gap-2">
                    <span className="text-gray-400 min-w-20 sm:min-w-24">Skills:</span>
                    <span className="text-white">{parsedData.skills.length} skills detected</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleAccept}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg hover:shadow-glow-primary transition-shadow"
                >
                  Accept & Continue
                </button>
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 glass border border-white/10 text-white rounded-lg hover:border-white/20 transition-colors"
                >
                  Try Another
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {uploadState === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass rounded-2xl p-6 sm:p-8 border border-red-500/20"
          >
            <div className="flex items-center gap-3 mb-4">
              <XCircleIcon className="w-8 h-8 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-white">Upload Failed</h3>
                <p className="text-sm text-gray-400">{error || 'An error occurred'}</p>
              </div>
            </div>
            <button
              onClick={handleRetry}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg hover:shadow-glow-primary transition-shadow"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="text-center">
        <button
          onClick={() => dispatch({ type: 'SET_BUILDER_TAB', payload: 'manual' })}
          className="text-primary-400 hover:text-primary-300 text-sm transition-colors"
        >
          Or enter information manually
        </button>
      </div>
    </div>
  );
}
function ManualInputTab({ onGenerate }) {
  const { state, dispatch } = useApp();
  const steps = [
    { number: 1, label: 'Personal' },
    { number: 2, label: 'Experience' },
    { number: 3, label: 'Education' },
    { number: 4, label: 'Skills' },
    { number: 5, label: 'Projects' },
    { number: 6, label: 'Style' }
  ];
  const handleNext = () => {
    if (state.uiState.currentStep < 6) {
      dispatch({ type: 'NEXT_STEP' });
    }
  };
  const handlePrevious = () => {
    if (state.uiState.currentStep > 1) {
      dispatch({ type: 'PREVIOUS_STEP' });
    }
  };
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Step Navigator - Hidden on mobile (lg:flex) since header has mobile step indicator */}
      <div className="hidden lg:flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto pb-2 pt-3 scrollbar-hide">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-shrink-0">
            <button
              onClick={() => dispatch({ type: 'JUMP_TO_STEP', payload: step.number })}
              className={`flex flex-col items-center gap-1 min-w-12 sm:min-w-16 transition-all ${
                step.number === state.uiState.currentStep
                  ? 'text-primary-500 scale-105'
                  : step.number < state.uiState.currentStep
                  ? 'text-emerald-500'
                  : 'text-gray-500'
              }`}
            >
              <motion.div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold transition-all ${
                  step.number === state.uiState.currentStep
                    ? 'bg-primary-500 text-white ring-4 ring-primary-500/20'
                    : step.number < state.uiState.currentStep
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {step.number < state.uiState.currentStep ? (
                  <CheckCircleIcon className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </motion.div>
              <span className="text-[10px] sm:text-xs whitespace-nowrap">{step.label}</span>
            </button>
            {index < steps.length - 1 && (
              <div
                className={`w-4 sm:w-8 h-0.5 mx-0.5 sm:mx-1 transition-colors ${
                  step.number < state.uiState.currentStep ? 'bg-emerald-500' : 'bg-white/10'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      {/* Current Step Content */}
      <div className="min-h-[350px] sm:min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.uiState.currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <StepComponents step={state.uiState.currentStep} />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Navigation Buttons - Previous button now styled like Next */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <button
          onClick={handlePrevious}
          disabled={state.uiState.currentStep === 1}
          className={`px-4 sm:px-6 py-2 rounded-lg transition-all text-sm sm:text-base ${
            state.uiState.currentStep === 1
              ? 'bg-white/5 text-gray-500 cursor-not-allowed opacity-50'
              : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
          }`}
        >
          <span className="hidden sm:inline">← Previous</span>
          <span className="sm:hidden">← Prev</span>
        </button>
        <span className="text-xs sm:text-sm text-gray-500">
          Step {state.uiState.currentStep} of 6
        </span>
        <button
          onClick={state.uiState.currentStep === 6 ? onGenerate : handleNext}
          disabled={state.uiState.currentStep === 6 && state.uiState.isGenerating}
          className={`group relative flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-white text-sm sm:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${state.uiState.currentStep !== 6 ? 'bg-gradient-to-r from-primary-500 to-accent-500' : ''}`}
        >
          {state.uiState.currentStep === 6 ? (
            <>
              {/* Animated gradient background for Generate button */}
              <span className="absolute inset-0 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 bg-[length:200%_100%] group-hover:animate-rainbow-glow transition-all" />
              {/* Glow effect on hover */}
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-primary-400/20 via-white/20 to-accent-400/20 blur-lg" />
              {/* Border glow */}
              <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 20px rgba(37, 99, 235, 0.6), 0 0 40px rgba(6, 182, 212, 0.4), 0 0 60px rgba(37, 99, 235, 0.2)' }} />
              <span className="relative flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 group-hover:animate-pulse" />
                <span>{state.uiState.isGenerating ? 'Generating...' : 'Generate'}</span>
              </span>
            </>
          ) : (
            <span>Next →</span>
          )}
        </button>
      </div>
    </div>
  );
}
function InputPanel({ onGenerate }) {
  const { state, dispatch } = useApp();
  return (
    <div className="w-full lg:w-1/2 border-r border-white/10 bg-dark-900/50 overflow-y-auto max-h-[calc(100vh-80px)] lg:max-h-[calc(100vh-80px)]">
      {/* Tab Toggle */}
      <div className="sticky top-0 z-40 glass border-b border-white/10">
        <div className="flex">
          <button
            onClick={() => dispatch({ type: 'SET_BUILDER_TAB', payload: 'upload' })}
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors ${
              state.uiState.builderTab === 'upload'
                ? 'text-white border-b-2 border-primary-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Upload Resume
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_BUILDER_TAB', payload: 'manual' })}
            className={`flex-1 px-4 sm:px-6 py-3 sm:py-4 text-xs sm:text-sm font-medium transition-colors ${
              state.uiState.builderTab === 'manual'
                ? 'text-white border-b-2 border-primary-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Manual Input
          </button>
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-4 sm:p-6">
        {state.uiState.builderTab === 'upload' ? (
          <ResumeUploadTab />
        ) : (
          <ManualInputTab onGenerate={onGenerate} />
        )}
      </div>
    </div>
  );
}
function PreviewPanel() {
  const { state, dispatch } = useApp();
  const previewRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  const devices = [
    { name: 'desktop', icon: ComputerDesktopIcon, width: '100%', maxWidth: 'none' },
    { name: 'tablet', icon: DeviceTabletIcon, width: '768px', maxWidth: '768px' },
    { name: 'mobile', icon: DevicePhoneMobileIcon, width: '375px', maxWidth: '375px' }
  ];
  const getVisibleDevices = useCallback(() => {
    if (windowWidth >= 1024) {
      return devices; 
    } else if (windowWidth >= 768) {
      return devices.slice(1);
    }
    return []; 
  }, [windowWidth]);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.scrollTop = previewRef.current.scrollHeight;
    }
  }, [state.userData, state.uiState.currentStep]);
  const visibleDevices = getVisibleDevices();
  return (
    <div className="w-full lg:w-1/2 bg-dark-950 overflow-hidden flex flex-col">
      {/* Header with device toggles */}
      <div className="sticky top-0 z-40 glass border-b border-white/10 px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium text-sm sm:text-base">Live Preview</h3>
          {/* Device Toggle Buttons - Only show based on screen size */}
          {visibleDevices.length > 0 && (
            <div className="flex items-center gap-1 sm:gap-2">
              {visibleDevices.map((device) => {
                const Icon = device.icon;
                return (
                  <button
                    key={device.name}
                    onClick={() => dispatch({ type: 'SET_PREVIEW_DEVICE', payload: device.name })}
                    className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                      state.uiState.previewDevice === device.name
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                    title={device.name.charAt(0).toUpperCase() + device.name.slice(1)}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {/* Preview Content - Auto-scroll enabled */}
      <div
        ref={previewRef}
        className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 bg-gradient-to-b from-dark-900 to-dark-950 scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        <div
          className="mx-auto transition-all duration-300"
          style={{
            width: devices.find(d => d.name === state.uiState.previewDevice)?.width || '100%',
            maxWidth: devices.find(d => d.name === state.uiState.previewDevice)?.maxWidth || '100%'
          }}
        >
          <div className="glass rounded-xl p-4 sm:p-6 lg:p-8 min-h-[500px] sm:min-h-[600px]">
            <div className="space-y-6 sm:space-y-8">
              {/* Personal Info Section */}
              {state.userData.personalInfo.name && (
                <div className="break-words">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-2 break-words">
                    {state.userData.personalInfo.name}
                  </h1>
                  {state.userData.personalInfo.title && (
                    <p className="text-lg sm:text-xl text-gray-300 break-words">
                      {state.userData.personalInfo.title}
                    </p>
                  )}
                  {state.userData.personalInfo.location && (
                    <p className="text-gray-400 mt-2 text-sm sm:text-base break-words">
                      {state.userData.personalInfo.location}
                    </p>
                  )}
                  {state.userData.personalInfo.email && (
                    <p className="text-gray-400 text-sm break-all">
                      {state.userData.personalInfo.email}
                    </p>
                  )}
                </div>
              )}
              {/* Skills Section */}
              {state.userData.skills.technical.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {state.userData.skills.technical.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-2 sm:px-3 py-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 border border-primary-500/30 rounded-full text-xs sm:text-sm text-white whitespace-nowrap"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Experience Section */}
              {state.userData.workExperience.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Experience</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {state.userData.workExperience.map((exp) => (
                      <div key={exp.id} className="border-l-2 border-primary-500 pl-3 sm:pl-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white break-words">{exp.title}</h3>
                        {exp.company && (
                          <p className="text-gray-300 text-sm sm:text-base break-words">{exp.company}</p>
                        )}
                        {exp.description && (
                          <p className="text-gray-400 text-xs sm:text-sm mt-2 break-words whitespace-pre-wrap" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                            {exp.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Education Section */}
              {state.userData.education.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Education</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {state.userData.education.map((edu) => (
                      <div key={edu.id} className="border-l-2 border-accent-500 pl-3 sm:pl-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white break-words">{edu.degree}</h3>
                        {edu.institution && (
                          <p className="text-gray-300 text-sm sm:text-base break-words">{edu.institution}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Projects Section */}
              {state.userData.projects.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Projects</h2>
                  <div className="space-y-3 sm:space-y-4">
                    {state.userData.projects.map((project) => (
                      <div key={project.id} className="glass rounded-lg p-3 sm:p-4">
                        <h3 className="text-base sm:text-lg font-semibold text-white break-words">{project.title}</h3>
                        {project.description && (
                          <p className="text-gray-400 text-xs sm:text-sm mt-2 break-words whitespace-pre-wrap" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                            {project.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Empty State */}
              {!state.userData.personalInfo.name && (
                <div className="text-center py-12 sm:py-20">
                  <p className="text-gray-400 text-sm sm:text-base">
                    Your portfolio preview will appear here as you fill in the form.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function BuilderLayout() {
  const { state, dispatch } = useApp();
  const handleGenerate = async () => {
    try {
      await generatePortfolio(state.userData, dispatch);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'Portfolio generated successfully!', type: 'success' }
      });
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: error.message, type: 'error' }
      });
    }
  };
  return (
    <>
      <BuilderHeader onGenerate={handleGenerate} />
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">
        <InputPanel onGenerate={handleGenerate} />
        <PreviewPanel />
      </div>
    </>
  );
}
export { BuilderHeader, InputPanel, PreviewPanel, ManualInputTab, ResumeUploadTab };