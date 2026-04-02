/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Dashboard from './components/Dashboard';
import AttendanceDetail from './components/AttendanceDetail';
import RegisterDetail from './components/RegisterDetail';
import GenericDetail from './components/GenericDetail';
import LoginDetail from './components/LoginDetail';
import ElectronicRecordDetail from './components/ElectronicRecordDetail';
import DigitalMaterialDetail from './components/DigitalMaterialDetail';
import GradebookDetail from './components/GradebookDetail';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const [selectedCard, setSelectedCard] = useState<any>(null);

  const navigateTo = (screen: string, data?: any) => {
    setSelectedCard(data);
    setCurrentScreen(screen);
  };

  const goBack = () => {
    setCurrentScreen('dashboard');
    setSelectedCard(null);
  };

  return (
    <div className="h-screen bg-gray-950 flex justify-center overflow-hidden text-gray-100">
      <div className="w-full max-w-md bg-[#0a0a0a] h-full shadow-2xl relative overflow-hidden border-x border-gray-800/50">
        <AnimatePresence mode="wait">
          {currentScreen === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto no-scrollbar"
            >
              <Dashboard onNavigate={navigateTo} />
            </motion.div>
          )}
          {currentScreen === 'attendance' && (
            <motion.div
              key="attendance"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto bg-[#0a0a0a] no-scrollbar"
            >
              <AttendanceDetail onBack={goBack} />
            </motion.div>
          )}
          {currentScreen === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto bg-[#0a0a0a] no-scrollbar"
            >
              <RegisterDetail onBack={goBack} />
            </motion.div>
          )}
          {currentScreen === 'generic' && (
            <motion.div
              key="generic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto bg-[#0a0a0a] no-scrollbar"
            >
              <GenericDetail onBack={goBack} data={selectedCard} />
            </motion.div>
          )}
          {currentScreen === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto bg-[#0a0a0a] no-scrollbar"
            >
              <LoginDetail onBack={goBack} />
            </motion.div>
          )}
          {currentScreen === 'electronic-records' && (
            <motion.div
              key="electronic-records"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto bg-[#0a0a0a] no-scrollbar"
            >
              <ElectronicRecordDetail onBack={goBack} />
            </motion.div>
          )}
          {currentScreen === 'digital-materials' && (
            <motion.div
              key="digital-materials"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto bg-[#0a0a0a] no-scrollbar"
            >
              <DigitalMaterialDetail onBack={goBack} />
            </motion.div>
          )}
          {currentScreen === 'gradebook' && (
            <motion.div
              key="gradebook"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto bg-[#0a0a0a] no-scrollbar"
            >
              <GradebookDetail onBack={goBack} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
