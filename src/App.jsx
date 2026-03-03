import { useState, useEffect } from 'react';
import ReactGA from 'react-ga4';
import Hero from './sections/Hero';
import Methodology from './sections/Methodology';
import OnlineLearning from './sections/OnlineLearning';
import Modules from './sections/Modules';
import Testimonials from './sections/Testimonials';
import Instructors from './sections/Instructors';
import LeadCaptureModal from './components/LeadCaptureModal';
import { useLeadModal } from './hooks/useLeadModal';
import MobileCTA from './components/MobileCTA';
import { captureUtmParams } from './hooks/useTracking';


function App() {
  const { isModalOpen, modalSource, closeModal, handleCTAClick } = useLeadModal();

  useEffect(() => {
    ReactGA.initialize('G-9KS3R2F2WG');
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t.contentsquare.net/uxa/89e8860f4d474.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    captureUtmParams();
  }, []);

  return (
    <div className="font-sans antialiased text-secondary">

      <main>
        {/* Seção 1 - Hero / Captura */}
        <Hero
          handleCTAClick={handleCTAClick}
        />

        {/* Seções 2 e 3 - Metodologia */}
        <Methodology
          handleCTAClick={handleCTAClick}
        />

        {/* Seção 4 - Como Aprender Online */}
        <OnlineLearning
          handleCTAClick={handleCTAClick}
        />

        {/* Seção 5 - Módulos */}
        <Modules
          handleCTAClick={handleCTAClick}
        />

        {/* Seção 6 - Depoimentos */}
        <Testimonials />

        {/* Seção 7 - Instrutores */}
        <Instructors
          handleCTAClick={handleCTAClick}
        />
      </main>

      {/* Modal de Captura de Leads */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        source={modalSource}
      />

      <MobileCTA
        handleCTAClick={handleCTAClick}
        variant="plus"
      />
    </div>
  );
}

export default App;
