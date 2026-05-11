import { useEffect, useState } from 'react';
import './App.css';
import { AppShell } from './components/layout/AppShell';
import { OverviewPage } from './pages/overview/OverviewPage';
import { startMetricsStream } from './services/metrics.stream';
import { RelayOverview } from './pages/overview/RelayOverview';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [page, setPage] = useState('overview');

  useEffect(() => {
    startMetricsStream();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={page}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        <AppShell page={page} setPage={setPage}>
          {page === 'overview' && <OverviewPage />}
          {page === 'relay' && <RelayOverview />}
        </AppShell>
      </motion.div>
    </AnimatePresence>
  );
}

export default App;
