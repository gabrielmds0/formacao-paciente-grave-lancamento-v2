import React from 'react';
import Button from '../components/Button';
import { ArrowRight } from 'lucide-react';
import Logo from '/images/logo-pg.png';
import BannerDesktop from '/images/BANNER LP.png';
import BannerMobile from '/images/BANNER LP (MOBILE).png';

const Hero = ({ handleCTAClick }) => {
  return (
    <section id="hero" className="bg-black relative overflow-hidden">

      <style>{`
        @keyframes heartbeat {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes offerPulse {
          0%, 100% { box-shadow: 0 0 0 rgba(248, 113, 113, 0.25); }
          50% { box-shadow: 0 0 24px rgba(248, 113, 113, 0.45); }
        }
        .heartbeat {
          animation: heartbeat 2s ease-in-out infinite;
        }
        .heartbeat:hover {
          animation: heartbeat 0.8s ease-in-out infinite;
        }
        .offer-pulse {
          animation: offerPulse 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* ===== DESKTOP: imagem absolutamente posicionada na metade direita ===== */}
      {/* top-0 / bottom-0 garantem que a imagem sempre preenche toda a altura da section */}
      <div
        className="hidden md:block absolute top-0 bottom-0 right-0"
        style={{ width: '50%' }}
        aria-hidden="true"
      >
        <img
          src={BannerDesktop}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: '85% center' }}
          loading="eager"
        />
      </div>

      {/* ===== MOBILE: imagem acima do conteúdo, altura limitada ===== */}
      <div className="md:hidden w-full overflow-hidden" style={{ maxHeight: '300px' }}>
        <img
          src={BannerMobile}
          alt="Formação Paciente Grave"
          className="w-full h-full object-cover object-top block"
          loading="eager"
        />
      </div>

      {/* ===== CONTEÚDO ===== */}
      <div className="relative z-10 max-w-screen-xl mx-auto">
        {/* No desktop, o conteúdo ocupa apenas a metade esquerda (md:w-1/2)
            A direita é preenchida pela imagem absoluta acima */}
        <div className="md:w-1/2 flex flex-col justify-center px-6 md:px-10 lg:px-16 py-10 md:py-16 lg:py-20 text-left">

          {/* Logo */}
          <div className="mb-6 md:mb-8">
            <img
              src={Logo}
              alt="Formação Paciente Grave"
              className="h-16 md:h-20 lg:h-24 w-auto"
              loading="eager"
            />
          </div>

          {/* H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-5 md:mb-6 leading-tight tracking-tight">
            Domine o paciente grave{' '}
            <span className="text-red-600">investindo o valor de dois plantões</span>
          </h1>

          {/* H2 */}
          <p className="text-base sm:text-lg md:text-lg lg:text-xl text-gray-300 mb-6 md:mb-8 max-w-xl leading-relaxed font-light">
            Tenha confiança para fazer{' '}
            <strong className="text-white font-semibold">Raciocínio Clínico</strong>,{' '}
            <strong className="text-white font-semibold">Prescrição Médica</strong> e{' '}
            <strong className="text-white font-semibold">Procedimentos Salvadores de Vida</strong>
          </p>

          {/* Oferta especial */}
          <div className="mb-5">
            <p className="offer-pulse inline-flex items-center gap-3 rounded-2xl border-2 border-red-300/70 bg-gradient-to-r from-red-600/35 via-red-500/25 to-orange-400/20 px-5 py-3 text-red-100 font-black text-sm sm:text-base uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(239,68,68,0.4)] ring-1 ring-red-200/30 backdrop-blur-sm">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-300 opacity-80"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-400"></span>
              </span>
              Oferta especial dia 12/03
            </p>
          </div>

          {/* Texto CTA */}
          <p className="text-gray-400 text-base mb-5">
            Clique no botão e entre para o Grupo VIP
          </p>

          {/* CTA Button */}
          <div className="w-full max-w-sm mb-6">
            <Button
              onClick={(e) => handleCTAClick(e, 'Hero CTA')}
              variant="primary"
              size="xl"
              className="cursor-pointer heartbeat bg-red-600 hover:bg-red-700 text-white font-black text-lg px-10 py-5 rounded-2xl transition-all duration-300 w-full border-0 shadow-2xl hover:shadow-red-600/25 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center justify-center">
                Entrar para o Grupo VIP
                <ArrowRight size={22} className="ml-3" />
              </span>
            </Button>
          </div>

          {/* Social proof */}
          <p className="text-gray-500 text-sm">
            +5.000 médicos já se formaram
          </p>

        </div>
      </div>

    </section>
  );
};

export default Hero;
