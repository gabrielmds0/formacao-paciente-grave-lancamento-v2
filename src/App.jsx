import { lazy, Suspense, useEffect, useState } from 'react';
import Hero from './sections/Hero';
import { captureUtmParams } from './hooks/useTracking';

const Methodology = lazy(() => import('./sections/Methodology'));
const OnlineLearning = lazy(() => import('./sections/OnlineLearning'));
const Modules = lazy(() => import('./sections/Modules'));
const Testimonials = lazy(() => import('./sections/Testimonials'));
const Instructors = lazy(() => import('./sections/Instructors'));

function App() {
  const [renderSecondarySections, setRenderSecondarySections] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    let idleId = null;

    const bootstrapTracking = () => {
      const loadTracking = () => {
        import('./utils/deferredTracking')
          .then(({ initializeDeferredTracking }) => {
            initializeDeferredTracking();
          })
          .catch(() => {});
      };

      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(loadTracking, { timeout: 4000 });
      } else {
        timeoutId = window.setTimeout(loadTracking, 1500);
      }
    };

    if (document.readyState === 'complete') {
      bootstrapTracking();
    } else {
      window.addEventListener('load', bootstrapTracking, { once: true });
    }

    return () => {
      window.removeEventListener('load', bootstrapTracking);

      if (idleId !== null && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    captureUtmParams();
  }, []);

  useEffect(() => {
    let frameId = null;
    let timeoutId = null;

    const enableSecondarySections = () => {
      setRenderSecondarySections(true);
    };

    if ('requestAnimationFrame' in window) {
      frameId = window.requestAnimationFrame(enableSecondarySections);
    } else {
      timeoutId = window.setTimeout(enableSecondarySections, 0);
    }

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="font-sans antialiased text-secondary">
      <main>
        <Hero />

        {renderSecondarySections && (
          <Suspense fallback={null}>
            <Methodology />
            <OnlineLearning />
            <Modules />
            <Testimonials />
            <Instructors />
          </Suspense>
        )}
      </main>
    </div>
  );
}

export default App;
