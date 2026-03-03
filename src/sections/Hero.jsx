import React, { useEffect, useState } from 'react';
import Logo from '/images/logo-pg.webp';
import HeroBannerDesktopWebp from '/images/hero-banner-desktop.webp';
import HeroBannerDesktopFallback from '/images/BANNER LP.png';
import HeroBannerMobileWebp from '/images/hero-banner-mobile.webp';
import HeroBannerMobileFallback from '/images/BANNER LP (MOBILE).png';

const DESKTOP_BREAKPOINT = '(min-width: 768px)';

function getInitialDesktopState() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false;
  }

  return window.matchMedia(DESKTOP_BREAKPOINT).matches;
}

function HeroMedia({ isDesktop }) {
  const sources = isDesktop
    ? {
        webp: HeroBannerDesktopWebp,
        fallback: HeroBannerDesktopFallback,
        width: 1280,
        height: 720,
        alt: '',
        imgClassName: 'w-full h-full object-cover',
        imgStyle: { objectPosition: '85% center' },
        containerClassName: 'hidden md:block absolute top-0 bottom-0 right-0',
        containerStyle: { width: '50%' },
        ariaHidden: true,
      }
    : {
        webp: HeroBannerMobileWebp,
        fallback: HeroBannerMobileFallback,
        width: 900,
        height: 1600,
        alt: 'Formacao Paciente Grave',
        imgClassName: 'w-full h-full object-cover object-top block',
        imgStyle: undefined,
        containerClassName: 'md:hidden w-full overflow-hidden',
        containerStyle: { maxHeight: '300px' },
        ariaHidden: undefined,
      };

  return (
    <div
      className={sources.containerClassName}
      style={sources.containerStyle}
      aria-hidden={sources.ariaHidden}
    >
      <picture>
        <source srcSet={sources.webp} type="image/webp" />
        <img
          src={sources.fallback}
          alt={sources.alt}
          width={sources.width}
          height={sources.height}
          className={sources.imgClassName}
          style={sources.imgStyle}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </div>
  );
}

const Hero = () => {
  const [isDesktop, setIsDesktop] = useState(getInitialDesktopState);

  useEffect(() => {
    if (!window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia(DESKTOP_BREAKPOINT);
    const updateViewport = (event) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateViewport);

      return () => {
        mediaQuery.removeEventListener('change', updateViewport);
      };
    }

    mediaQuery.addListener(updateViewport);

    return () => {
      mediaQuery.removeListener(updateViewport);
    };
  }, []);

  return (
    <section id="hero" className="bg-black relative overflow-hidden">
      <style>{`
        @keyframes offerPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(248, 113, 113, 0.25); }
          50% { box-shadow: 0 0 24px rgba(248, 113, 113, 0.45); }
        }
        .offer-pulse {
          animation: offerPulse 1.8s ease-in-out infinite;
        }
      `}</style>

      <HeroMedia isDesktop={isDesktop} />

      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="md:w-1/2 flex flex-col justify-center px-6 md:px-10 lg:px-16 py-10 md:py-16 lg:py-20 text-left">
          <div className="mb-6 md:mb-8">
            <img
              src={Logo}
              alt="Formacao Paciente Grave"
              width="1200"
              height="527"
              className="h-16 md:h-20 lg:h-24 w-auto"
              loading="eager"
              decoding="async"
            />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-5 md:mb-6 leading-tight tracking-tight">
            Domine o paciente grave{' '}
            <span className="text-red-600">investindo o valor de dois plantoes</span>
          </h1>

          <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-xl leading-relaxed font-light">
            Tenha confianca para fazer{' '}
            <strong className="text-white font-semibold">Raciocinio Clinico</strong>,{' '}
            <strong className="text-white font-semibold">Prescricao Medica</strong> e{' '}
            <strong className="text-white font-semibold">Procedimentos Salvadores de Vida</strong>
          </p>

          <div className="mb-6">
            <p className="offer-pulse inline-flex items-center gap-3 rounded-2xl border-2 border-red-300/70 bg-gradient-to-r from-red-600/35 via-red-500/25 to-orange-400/20 px-5 py-3 text-red-100 font-black text-sm sm:text-base uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(239,68,68,0.4)] ring-1 ring-red-200/30 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-80"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-400"></span>
              </span>
              Oferta especial dia 12/03
            </p>
          </div>

          <p className="text-gray-500 text-sm">
            +5.000 medicos ja se formaram
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
