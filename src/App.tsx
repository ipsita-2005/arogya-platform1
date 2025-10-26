import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ConsultationInterface from './components/ConsultationInterface';
import { AuthContext } from './context/AuthContext';

type Page = 'landing' | 'login' | 'dashboard' | 'consultation';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(null);
  const [consultations, setConsultations] = useState<any[]>([]);

  // Mock authentication
  useEffect(() => {
    const storedUser = localStorage.getItem('arogyaUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      setCurrentPage('dashboard');
      
      // Load mock consultation history
      const storedConsultations = localStorage.getItem('arogyaConsultations');
      if (storedConsultations) {
        setConsultations(JSON.parse(storedConsultations));
      } else {
        // Initialize with sample data
        const sampleConsultations = [
          {
            id: '1',
            type: 'chat',
            timestamp: new Date(Date.now() - 86400000).toISOString(),
            summary: 'Consulted about persistent headaches',
            status: 'completed'
          },
          {
            id: '2',
            type: 'voice',
            timestamp: new Date(Date.now() - 172800000).toISOString(),
            summary: 'Voice consultation for general wellness',
            status: 'completed'
          },
          {
            id: '3',
            type: 'image',
            timestamp: new Date(Date.now() - 259200000).toISOString(),
            summary: 'Image diagnosis for skin condition',
            status: 'completed'
          }
        ];
        setConsultations(sampleConsultations);
        localStorage.setItem('arogyaConsultations', JSON.stringify(sampleConsultations));
      }
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Mock authentication
    const userData = {
      id: '123',
      email: email,
      name: email.split('@')[0]
    };
    setUser(userData);
    localStorage.setItem('arogyaUser', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('arogyaUser');
    setCurrentPage('landing');
  };

  const handleStartConsultation = () => {
    setCurrentPage('consultation');
  };

  const handleEndConsultation = (consultationData: any) => {
    const newConsultation = {
      id: String(consultations.length + 1),
      ...consultationData,
      timestamp: new Date().toISOString(),
      status: 'completed'
    };
    const updated = [newConsultation, ...consultations];
    setConsultations(updated);
    localStorage.setItem('arogyaConsultations', JSON.stringify(updated));
    setCurrentPage('dashboard');
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <div className="min-h-screen bg-gray-50">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentPage === 'landing' && (
            <LandingPage onGetStarted={() => setCurrentPage('login')} />
          )}
          {currentPage === 'login' && (
            <LoginPage onLogin={handleLogin} onBackToLanding={() => setCurrentPage('landing')} />
          )}
          {currentPage === 'dashboard' && user && (
            <Dashboard
              user={user}
              consultations={consultations}
              onLogout={handleLogout}
              onStartConsultation={handleStartConsultation}
            />
          )}
          {currentPage === 'consultation' && user && (
            <ConsultationInterface
              user={user}
              onEndConsultation={handleEndConsultation}
              onBack={() => setCurrentPage('dashboard')}
            />
          )}
        </motion.div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
