import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import PortfolioPreview from './pages/PortfolioPreview';
import Notification from './components/shared/Notification';
function AppContent() {
  const { state } = useApp();
  const renderPage = () => {
    switch (state.uiState.currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'builder':
        return <BuilderPage />;
      case 'preview':
        return <PortfolioPreview />;
      default:
        return <LandingPage />;
    }
  };
  return (
    <div className="min-h-screen bg-dark-950" data-page={state.uiState.currentPage}>
      <Notification />
      {renderPage()}
    </div>
  );
}
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
export default App;