import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppStage } from './types';
import IntroScene from './components/IntroScene';
import HeartScene from './components/HeartScene';
import MessageScene from './components/MessageScene';
import FinaleScene from './components/FinaleScene';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.INTRO);

  const nextStage = () => {
    if (stage === AppStage.INTRO) setStage(AppStage.HEART_INTERACTION);
    else if (stage === AppStage.HEART_INTERACTION) setStage(AppStage.MESSAGE_SEQUENCE);
    else if (stage === AppStage.MESSAGE_SEQUENCE) setStage(AppStage.FINALE);
  };

  const resetApp = () => {
    setStage(AppStage.INTRO);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-romantic-50 via-romantic-100 to-romantic-200 overflow-hidden relative">
      <AnimatePresence mode="wait">
        {stage === AppStage.INTRO && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="w-full h-full absolute inset-0"
          >
            <IntroScene onNext={nextStage} />
          </motion.div>
        )}

        {stage === AppStage.HEART_INTERACTION && (
          <motion.div
            key="heart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full absolute inset-0"
          >
            <HeartScene onComplete={nextStage} />
          </motion.div>
        )}

        {stage === AppStage.MESSAGE_SEQUENCE && (
          <motion.div
            key="messages"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full h-full absolute inset-0"
          >
            <MessageScene onComplete={nextStage} />
          </motion.div>
        )}

        {stage === AppStage.FINALE && (
          <motion.div
            key="finale"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full absolute inset-0"
          >
            <FinaleScene onReset={resetApp} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;