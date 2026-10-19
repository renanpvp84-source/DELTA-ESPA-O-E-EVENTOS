import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Instagram,
  Star,
  Sparkles,
  Utensils,
  Heart,
  Award,
  ChevronRight,
  Menu,
  X,
  MessageCircle,
  Wind,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Compass,
  Building2,
  Users,
} from 'lucide-react';

import {
  DELTA_INFO,
  SPACE_FEATURES,
  EVENT_TYPES,
  BUFFET_SERVICES,
  GOOGLE_REVIEWS,
  GALLERY_ITEMS,
  FAQ_ITEMS,
} from './data/deltaData';
import { motion, AnimatePresence } from 'framer-motion';
import { BudgetSimulator } from './components/BudgetSimulator';
import type { HTMLMotionProps } from 'framer-motion';
import { GalleryModal } from './components/GalleryModal';

// Variantes suaves de animação
const fadeInUp: HTMLMotionProps<'div'> = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSpaceTab, setActiveSpaceTab] = useState(0);
  const [galleryFilter, setGalleryFilter] = useState('Todos');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // ScrollSpy para destacar o menu ativo durante a rolagem
  useEffect(() => {
    const sectionIds = ['espaco', 'eventos', 'buffet', 'estrutura', 'galeria', 'avaliacoes', 'localizacao', 'orcamento'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menu mobile com Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const filteredGallery =
    galleryFilter === 'Todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === galleryFilter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const getWhatsappQuickUrl = (customMsg?: string) => {
    const text =
      customMsg ||
      'Olá equipe Delta Espaço e Eventos! Gostaria de consultar disponibilidade e solicitar um orçamento para o meu evento em Bacabal.';
    return `https://wa.me/${DELTA_INFO.phoneRaw}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col selection:bg-amber-200 selection:text-amber-900 overflow-x-hidden">
      {/* ── TOPBAR INFORMATIVO RESPONSIVO ── */}
      <div className="bg-stone-900 text-stone-300 text-[11px] sm:text-xs py-2 px-3 sm:px-6 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="inline-flex items-center gap-1.5 text-amber-400 font-medium truncate">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Rua Rui Barbosa, 373 • Centro, Bacabal – MA</span>
            </span>
            <span className="hidden md:inline text-stone-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-stone-400 shrink-0">
              <Wind className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              100% Climatizado
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <a
              href={DELTA_INFO.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-amber-400 rounded-sm"
              title="Instagram Oficial"
            >
              <Instagram className="w-3.5 h-3.5 text-pink-400 shrink-0" />
              <span className="hidden sm:inline">{DELTA_INFO.instagramHandle}</span>
            </a>
            <span className="text-stone-700 hidden sm:inline">|</span>
            <a
              href={getWhatsappQuickUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300 transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-emerald-400 rounded-sm"
              title="WhatsApp Comercial"
            >
              <Phone className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">{DELTA_INFO.phoneFormatted}</span>
              <span className="xs:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ── HEADER PRINCIPAL RESPONSIVO ── */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-stone-200/70 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* LOGOTIPO */}
          <a href="#" className="flex flex-col group py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700 rounded-lg">
            <div className="text-xl sm:text-2xl md:text-3xl font-serif font-black tracking-widest text-stone-900 flex items-center gap-1.5 leading-none">
              <span>DELTA</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-700"></span>
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.25em] text-stone-600 font-semibold mt-0.5 group-hover:text-amber-900 transition-colors truncate">
              Espaço & Eventos • Bacabal
            </span>
          </a>

          {/* NAVEGAÇÃO DESKTOP COM SCROLLSPY ATIVO */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-stone-700">
            <a
              href="#espaco"
              className={`py-1 transition-colors relative ${
                activeSection === 'espaco' ? 'text-amber-900 font-semibold' : 'hover:text-amber-800'
              }`}
            >
              O Espaço
              {activeSection === 'espaco' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700 rounded-full" />
              )}
            </a>
            <a
              href="#eventos"
              className={`py-1 transition-colors relative ${
                activeSection === 'eventos' ? 'text-amber-900 font-semibold' : 'hover:text-amber-800'
              }`}
            >
              Eventos
              {activeSection === 'eventos' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700 rounded-full" />
              )}
            </a>
            <a
              href="#buffet"
              className={`py-1 transition-colors relative ${
                activeSection === 'buffet' ? 'text-amber-900 font-semibold' : 'hover:text-amber-800'
              }`}
            >
              Buffet & Serviços
              {activeSection === 'buffet' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700 rounded-full" />
              )}
            </a>
            <a
              href="#estrutura"
              className={`py-1 transition-colors relative ${
                activeSection === 'estrutura' ? 'text-amber-900 font-semibold' : 'hover:text-amber-800'
              }`}
            >
              Estrutura
              {activeSection === 'estrutura' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700 rounded-full" />
              )}
            </a>
            <a
              href="#galeria"
              className={`py-1 transition-colors relative ${
                activeSection === 'galeria' ? 'text-amber-900 font-semibold' : 'hover:text-amber-800'
              }`}
            >
              Fotos
              {activeSection === 'galeria' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700 rounded-full" />
              )}
            </a>
            <a
              href="#avaliacoes"
              className={`py-1 transition-colors relative ${
                activeSection === 'avaliacoes' ? 'text-amber-900 font-semibold' : 'hover:text-amber-800'
              }`}
            >
              Avaliações
              {activeSection === 'avaliacoes' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700 rounded-full" />
              )}
            </a>
            <a
              href="#localizacao"
              className={`py-1 transition-colors relative ${
                activeSection === 'localizacao' ? 'text-amber-900 font-semibold' : 'hover:text-amber-800'
              }`}
            >
              Localização
              {activeSection === 'localizacao' && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-700 rounded-full" />
              )}
            </a>
          </nav>

          {/* CTA HEADER DESKTOP */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="#orcamento"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 active:scale-95 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs hover:shadow-md cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700"
            >
              <span>Solicitar Orçamento</span>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </a>
          </div>

          {/* BOTÃO MOBILE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2.5 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MENU MOBILE EXPANSÍVEL COM BACKDROP OVERLAY */}
        {mobileMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 top-16 sm:top-20 bg-black/40 backdrop-blur-2xs z-30"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="lg:hidden relative z-40 bg-white border-b border-stone-200 px-5 py-5 shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col gap-2.5 text-base font-medium text-stone-800">
                <a
                  href="#espaco"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-stone-100 min-h-[44px] flex items-center"
                >
                  O Espaço & Ambientes
                </a>
                <a
                  href="#eventos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-stone-100 min-h-[44px] flex items-center"
                >
                  Tipos de Eventos
                </a>
                <a
                  href="#buffet"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-stone-100 min-h-[44px] flex items-center"
                >
                  Buffet & Confeitaria
                </a>
                <a
                  href="#estrutura"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-stone-100 min-h-[44px] flex items-center"
                >
                  Estrutura & Diferenciais
                </a>
                <a
                  href="#galeria"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-stone-100 min-h-[44px] flex items-center"
                >
                  Galeria de Fotos
                </a>
                <a
                  href="#avaliacoes"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-stone-100 min-h-[44px] flex items-center"
                >
                  Avaliações Google (4.6 ★)
                </a>
                <a
                  href="#localizacao"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 border-b border-stone-100 min-h-[44px] flex items-center"
                >
                  Como Chegar
                </a>
                <div className="pt-2">
                  <a
                    href="#orcamento"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 rounded-xl bg-amber-800 hover:bg-amber-900 active:scale-98 text-white font-semibold text-center flex items-center justify-center gap-2 min-h-[48px] shadow-md"
                  >
                    <span>Solicitar Orçamento</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </nav>
            </div>
          </>
        )}
      </header>

      {/* ── HERO CINEMATOGRÁFICO RESPONSIVO ── */}
      <section className="relative bg-stone-900 text-white overflow-hidden py-10 sm:py-14 md:py-16 lg:py-20">
        {/* Imagem de fundo com overlay elegante */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85"
            alt="Salão Delta Espaço e Eventos Bacabal"
            loading="eager"
            className="w-full h-full object-cover object-center opacity-30 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-900/80 to-stone-950/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* METADADOS EDITORIAIS (SEM PILLS GENÉRICAS) */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-amber-200/90 font-medium tracking-wider uppercase mb-3.5 sm:mb-4"
            >
              <span>Centro de Bacabal – MA</span>
              <span aria-hidden="true" className="text-stone-500 font-normal">·</span>
              <span>100% Climatizado</span>
              <span aria-hidden="true" className="text-stone-500 font-normal">·</span>
              <a
                href="#avaliacoes"
                className="inline-flex items-center gap-1.5 text-amber-300 hover:text-amber-200 transition-colors normal-case tracking-normal"
              >
                <div className="flex text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                </div>
                <span className="font-semibold tabular-nums text-white">4,6 no Google</span>
                <span className="text-stone-400">({DELTA_INFO.googleReviewCount} avaliações)</span>
              </a>
            </motion.div>

            {/* HEADLINE RESPONSIVO COM TEXT-BALANCE */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.16] sm:leading-[1.12] mb-3.5 sm:mb-4"
            >
              O cenário inesquecível para suas grandes celebrações.
            </motion.h1>

            {/* SUBTÍTULO */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base md:text-lg text-stone-300 leading-relaxed font-light mb-5 sm:mb-6 max-w-2xl"
            >
              Salão amplo e 100% climatizado, escadaria cenográfica nobre, mobiliário de alto padrão e serviço completo de buffet e doces finos no coração de Bacabal.
            </motion.p>

            {/* CTAS */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5"
            >
              <a
                href="#orcamento"
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-amber-700 hover:bg-amber-600 active:scale-98 text-white text-sm sm:text-base font-semibold tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-amber-950/40 transition-all cursor-pointer min-h-[44px] sm:min-h-[48px] focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Solicitar Orçamento</span>
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200" />
              </a>

              <a
                href={getWhatsappQuickUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 sm:py-3.5 rounded-xl bg-stone-800/80 hover:bg-stone-700/80 active:scale-98 text-stone-100 text-sm sm:text-base font-medium flex items-center justify-center gap-2 border border-stone-700/80 transition-all hover:border-stone-500 cursor-pointer min-h-[44px] sm:min-h-[48px] focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                <span>Falar no WhatsApp</span>
              </a>
            </motion.div>

            {/* RESUMO DOS ATRIBUTOS RESPONSIVO */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-stone-800/80"
            >
              <div className="border-l border-stone-800/80 pl-3 sm:pl-4 first:border-l-0 first:pl-0">
                <div className="text-amber-400 font-serif text-lg sm:text-xl font-bold tracking-tight">100%</div>
                <div className="text-[11px] sm:text-xs text-stone-400 uppercase tracking-wider mt-0.5">Climatizado</div>
              </div>
              <div className="border-l border-stone-800/80 pl-3 sm:pl-4">
                <div className="text-amber-400 font-serif text-lg sm:text-xl font-bold tracking-tight">Mobiliário</div>
                <div className="text-[11px] sm:text-xs text-stone-400 uppercase tracking-wider mt-0.5">Tiffany & Madeira</div>
              </div>
              <div className="border-l border-stone-800/80 pl-3 sm:pl-4">
                <div className="text-amber-400 font-serif text-lg sm:text-xl font-bold tracking-tight">Buffet</div>
                <div className="text-[11px] sm:text-xs text-stone-400 uppercase tracking-wider mt-0.5">Jantares & Doces</div>
              </div>
              <div className="border-l border-stone-800/80 pl-3 sm:pl-4">
                <div className="text-amber-400 font-serif text-lg sm:text-xl font-bold tracking-tight">Localização</div>
                <div className="text-[11px] sm:text-xs text-stone-400 uppercase tracking-wider mt-0.5">Centro de Bacabal</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── BARRA DE CONFIANÇA & CREDENCIAIS ── */}
      <section className="bg-stone-950 border-t border-b border-stone-800 text-stone-300 py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">4,6 Estrelas no Google</div>
              <div className="text-[11px] text-stone-400">60 avaliações de clientes reais</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center shrink-0">
              <Wind className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">100% Climatizado</div>
              <div className="text-[11px] text-stone-400">Ambiente refrigerado e confortável</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">Mobiliário de Alto Padrão</div>
              <div className="text-[11px] text-stone-400">Cadeiras Tiffany Douradas & Madeira</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-white text-xs sm:text-sm">Centro de Bacabal – MA</div>
              <div className="text-[11px] text-stone-400">Rua Rui Barbosa, 373 • Acesso nobre</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── APRESENTAÇÃO DO ESPAÇO & ESTRUTURA REAL (4 PILARES) ── */}
      <section id="espaco" className="py-10 sm:py-14 md:py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
          >
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-800">
              Conheça a Estrutura
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1.5 mb-2 sm:mb-3">
              Ambientes pensados para encantar seus convidados
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed px-2">
              Cada detalhe da Delta foi projetado para oferecer conforto térmico, estética refinada e funcionalidade para momentos solenes, recepções de gala e encontros corporativos.
            </p>
          </motion.div>

          {/* CONTROLE SEGMENTADO DE AMBIENTES */}
          <div className="flex justify-start sm:justify-center mb-6 sm:mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex items-center gap-1 p-1 bg-stone-200/70 rounded-xl max-w-full">
              {SPACE_FEATURES.map((item, index) => {
                const active = activeSpaceTab === index;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSpaceTab(index)}
                    className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all shrink-0 cursor-pointer min-h-[36px] flex items-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700 ${
                      active
                        ? 'bg-stone-900 text-white shadow-xs'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                    }`}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CARD DO AMBIENTE ATIVO RESPONSIVO */}
          {(() => {
            const current = SPACE_FEATURES[activeSpaceTab];
            return (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white rounded-2xl sm:rounded-3xl border border-stone-200/80 shadow-md sm:shadow-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all"
              >
                <div className="lg:col-span-7 relative min-h-[220px] xs:min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] overflow-hidden bg-stone-900">
                  <img
                    src={current.image}
                    alt={current.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent lg:hidden" />
                </div>

                <div className="lg:col-span-5 p-5 sm:p-7 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-amber-800 font-bold mb-1.5">
                    <span>{current.tag}</span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="text-stone-500 normal-case tracking-normal font-normal">{current.subtitle}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-stone-900 mb-2 sm:mb-3">
                    {current.title}
                  </h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-5 font-light">
                    {current.description}
                  </p>

                  <div className="space-y-2 mb-5 sm:mb-6">
                    {current.highlights.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                        <span className="text-stone-700 text-xs sm:text-sm font-medium">{point}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href="#orcamento"
                      className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center justify-center gap-1.5 min-h-[42px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700 shadow-xs"
                    >
                      <span>Ver Disponibilidade</span>
                      <ChevronRight className="w-4 h-4 text-amber-300" />
                    </a>
                    <a
                      href={getWhatsappQuickUrl(`Olá! Gostaria de saber mais detalhes sobre a estrutura do ${current.title}.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-semibold text-amber-900 hover:text-amber-800 inline-flex items-center justify-center gap-1.5 min-h-[42px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg py-1 px-2"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Tirar Dúvida no WhatsApp</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* ── TIPOS DE EVENTOS ATENDIDOS ── */}
      <section id="eventos" className="py-10 sm:py-14 md:py-16 bg-[#F3EEEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6 mb-6 sm:mb-8"
          >
            <div>
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-800">
                Celebrações Realizadas
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1.5">
                O espaço certo para o seu evento
              </h2>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base max-w-md">
              De casamentos memoráveis e aniversários marcantes até grandes encontros corporativos sob a marca Delta Corporate.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {EVENT_TYPES.map((ev, idx) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-stone-900">
                  <img
                    src={ev.image}
                    alt={ev.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                      {ev.category}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-white drop-shadow-xs truncate mt-0.5">
                      {ev.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-4 font-light">
                      {ev.description}
                    </p>

                    <div className="space-y-2 mb-5">
                      {ev.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-700/80 shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#orcamento"
                    className="w-full py-2.5 px-4 rounded-xl border border-stone-200/90 hover:border-amber-700 hover:bg-amber-50/50 text-stone-800 hover:text-amber-900 text-xs font-semibold text-center transition-all inline-flex items-center justify-center gap-1.5 min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700"
                  >
                    <span>Consultar Data para {ev.title.split(' ')[0]}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUFFET & SERVIÇOS GASTRONÔMICOS RESPONSIVO ── */}
      <section id="buffet" className="py-10 sm:py-14 md:py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            <motion.div
              {...fadeInUp}
              className="lg:col-span-5"
            >
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-800">
                Buffet & Confeitaria
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1.5 mb-3 sm:mb-4">
                Gastronomia de alta qualidade para encantar o paladar
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed mb-4 sm:mb-5 font-light">
                Além do salão climatizado, a Delta oferece produção própria de buffets para jantares festivos, estações de salgados artesanais finos e mesas de doces personalizadas.
              </p>

              <div className="bg-white/90 border border-stone-200/90 rounded-xl p-4 mb-5 shadow-2xs">
                <div className="flex items-center gap-2 text-stone-900 font-semibold text-xs sm:text-sm mb-1">
                  <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Flexibilidade de Contratação</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed font-light">
                  Você pode contratar o espaço com o serviço completo de buffet e confeitaria Delta integrado, garantindo sincronia perfeita com a equipe do evento.
                </p>
              </div>

              <a
                href={getWhatsappQuickUrl('Olá! Gostaria de receber opções e sugestões de cardápio de buffet e doces para meu evento.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-500"
              >
                <Utensils className="w-4 h-4 text-amber-200" />
                <span>Solicitar Proposta de Buffet</span>
              </a>
            </motion.div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
              {BUFFET_SERVICES.map((srv, idx) => {
                const getIcon = () => {
                  switch (srv.iconName) {
                    case 'Utensils':
                      return <Utensils className="w-5 h-5 text-amber-800" />;
                    case 'Sparkles':
                      return <Sparkles className="w-5 h-5 text-amber-800" />;
                    case 'Heart':
                      return <Heart className="w-5 h-5 text-amber-800" />;
                    default:
                      return <Award className="w-5 h-5 text-amber-800" />;
                  }
                };

                return (
                  <motion.div
                    key={srv.id}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -5, transition: { duration: 0.25 } }}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center mb-2.5 sm:mb-3 border border-amber-100">
                        {getIcon()}
                      </div>
                      <h4 className="text-sm sm:text-base font-serif font-bold text-stone-900 mb-1">
                        {srv.title}
                      </h4>
                      <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-3 font-light">
                        {srv.description}
                      </p>
                    </div>

                    <div className="space-y-1 pt-2.5 border-t border-stone-100">
                      {srv.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-stone-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── ESTRUTURA E DIFERENCIAIS CONFIRMADOS RESPONSIVO ── */}
      <section id="estrutura" className="py-10 sm:py-14 md:py-16 bg-stone-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-6 sm:mb-8"
          >
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-400">
              Infraestrutura & Comodidades
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-white mt-1.5 mb-2 sm:mb-3">
              Diferenciais que garantem o sucesso da sua festa
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm md:text-base leading-relaxed px-2">
              Tudo o que sua celebração necessita em termos de conforto térmico, estética visual e segurança no Centro de Bacabal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="p-4 sm:p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center mb-3">
                <Wind className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-base font-serif font-bold text-white mb-1">
                100% Climatizado
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                Sistema de climatização de alta performance dimensionado para garantir conforto térmico em Bacabal com o salão repleto de convidados.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="p-4 sm:p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-serif font-bold text-white mb-1">
                Mobiliário Nobre
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                Opções de cadeiras Tiffany douradas e cadeiras de madeira Cross-Back, além de mesas redondas para banquetes requintados.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.19, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="p-4 sm:p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-base font-serif font-bold text-white mb-1">
                Escadaria Cenográfica
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                Degraus largos e imponentes com ambientação botânica e velas para entradas cinematográficas e fotos de noivas e debutantes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="p-4 sm:p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center mb-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-base font-serif font-bold text-white mb-1">
                Localização Central
              </h3>
              <p className="text-stone-300 text-xs sm:text-sm leading-relaxed font-light">
                Rua Rui Barbosa, 373, Centro. Acesso fácil para convidados de Bacabal e de toda a região do Mearim.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── GALERIA DE FOTOS INTERATIVA COM LIGHTBOX RESPONSIVO ── */}
      <section id="galeria" className="py-10 sm:py-14 md:py-16 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center max-w-3xl mx-auto mb-5 sm:mb-7"
          >
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-800">
              Registro Visual
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1.5 mb-2 sm:mb-3">
              Galeria de Ambientes & Celebrações
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed px-2">
              Veja como o espaço se transforma em cada celebração. Clique em qualquer foto para visualizar em alta resolução.
            </p>
          </motion.div>

          {/* FILTROS SEGMENTADOS DA GALERIA */}
          <div className="flex justify-start sm:justify-center mb-6 sm:mb-8 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex items-center gap-1 p-1 bg-stone-200/70 rounded-xl max-w-full">
              {['Todos', 'Salão Principal', 'Escadaria', 'Mesa de Doces', 'Buffet & Gastronomia', 'Detalhes & Decoração'].map(
                (cat) => {
                  const isActive = galleryFilter === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setGalleryFilter(cat)}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer min-h-[34px] flex items-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700 ${
                        isActive
                          ? 'bg-amber-900 text-white shadow-xs'
                          : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/60'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                }
              )}
            </div>
          </div>

          {/* GRID DA GALERIA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4.5">
            <AnimatePresence mode="popLayout">
              {filteredGallery.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  onClick={() => openLightbox(index)}
                  className="group relative h-56 sm:h-64 lg:h-72 rounded-2xl overflow-hidden cursor-pointer bg-stone-900 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                      {item.category}
                    </span>
                    <h4 className="text-sm sm:text-base font-serif font-bold text-white group-hover:text-amber-200 transition-colors truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-300 line-clamp-1 mt-0.5 font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="absolute top-3 right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-stone-900/60 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <GalleryModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={filteredGallery}
        currentIndex={lightboxIndex}
        onSelectIndex={setLightboxIndex}
      />

      {/* ── AVALIAÇÕES E PROVA SOCIAL DO GOOGLE RESPONSIVO ── */}
      <section id="avaliacoes" className="py-10 sm:py-14 md:py-16 bg-[#F3EEEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-10"
          >
            <div>
              <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-800">
                Reputação Comprovada
              </span>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1.5 mb-2">
                O que dizem sobre a Delta no Google
              </h2>
              <p className="text-stone-600 text-xs sm:text-sm md:text-base max-w-xl font-light">
                Opiniões reais de clientes, noivos e famílias que realizaram suas celebrações mais marcantes conosco em Bacabal.
              </p>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-stone-200/80 shadow-xs shrink-0">
              <div className="text-3xl sm:text-4xl font-serif font-bold text-amber-900 tabular-nums">
                {DELTA_INFO.googleRating}
              </div>
              <div className="border-l border-stone-200 pl-3.5">
                <div className="flex text-amber-500 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-bold text-stone-800">
                  Nota média no Google
                </div>
                <div className="text-[11px] text-stone-500 font-normal">
                  {DELTA_INFO.googleReviewCount} avaliações verificadas
                </div>
              </div>
            </div>
          </motion.div>

          {/* CARDS DE DEPOIMENTOS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {GOOGLE_REVIEWS.map((rev, idx) => (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-xs text-stone-400 font-light tabular-nums">{rev.date}</span>
                  </div>
                  <p className="text-stone-700 text-sm leading-relaxed italic mb-4 font-light">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="pt-3.5 border-t border-stone-100 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-serif font-bold text-stone-900">{rev.author}</div>
                    <div className="text-xs text-amber-900/80 font-medium">{rev.role}</div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Verificado no Google</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <a
              href={DELTA_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-stone-700 hover:text-stone-900 transition-colors py-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700 rounded-lg"
            >
              <span>Conferir perfil completo no Google Maps</span>
              <ArrowUpRight className="w-4 h-4 text-amber-700" />
            </a>
          </div>
        </div>
      </section>

      {/* ── SIMULADOR / SOLICITAÇÃO DE ORÇAMENTO RESPONSIVO ── */}
      <section id="orcamento" className="py-10 sm:py-14 md:py-16 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-5 sm:mb-6"
          >
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-800">
              Atendimento Comercial
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1.5 mb-1.5">
              Solicite seu Orçamento Personalizado
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto px-2">
              Preencha os dados do seu evento abaixo. Enviamos as informações estruturadas diretamente para o nosso WhatsApp em Bacabal.
            </p>
          </motion.div>

          <BudgetSimulator />
        </div>
      </section>

      {/* ── LOCALIZAÇÃO E MAPA RESPONSIVO ── */}
      <section id="localizacao" className="py-10 sm:py-14 md:py-16 bg-[#F3EEEA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            <motion.div
              {...fadeInUp}
              className="lg:col-span-5 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-800">
                  Endereço Central
                </span>
                <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1.5 mb-3 sm:mb-4">
                  Fácil acesso no Centro de Bacabal
                </h2>

                <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-5">
                  <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200">
                    <MapPin className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                        Endereço
                      </div>
                      <div className="text-stone-900 font-bold text-sm sm:text-base mt-0.5">
                        {DELTA_INFO.address}
                      </div>
                      <div className="text-xs text-stone-600">
                        Centro, Bacabal – MA • CEP {DELTA_INFO.cep}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200">
                    <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                        WhatsApp Comercial
                      </div>
                      <div className="text-stone-900 font-bold text-sm sm:text-base mt-0.5">
                        {DELTA_INFO.phoneFormatted}
                      </div>
                      <div className="text-xs text-stone-600">
                        Atendimento rápido e agendamento de visitas presenciais
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200">
                    <Clock className="w-5 h-5 text-amber-800 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-stone-500">
                        Visitas ao Espaço
                      </div>
                      <div className="text-stone-900 font-medium text-xs sm:text-sm mt-0.5">
                        {DELTA_INFO.hoursNote}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <a
                  href={DELTA_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700"
                >
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>Traçar Rota no Google Maps</span>
                </a>
                <a
                  href={DELTA_INFO.wazeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs sm:text-sm font-semibold inline-flex items-center justify-center gap-2 min-h-[40px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-cyan-600"
                >
                  <MapPin className="w-4 h-4 text-cyan-600" />
                  <span>Abrir no Waze</span>
                </a>
              </div>
            </motion.div>

            {/* MAPA ESTILIZADO INTERATIVO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-stone-300 h-full min-h-[280px] sm:min-h-[320px] md:min-h-[360px] bg-stone-200 flex-1">
                <iframe
                  title="Mapa de Localização Delta Espaço e Eventos"
                  src="https://maps.google.com/maps?q=Rua+Rui+Barbosa+373+Bacabal+MA&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-105"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs py-1.5 px-3 rounded-xl shadow-xs border border-stone-200/90 text-xs font-semibold text-stone-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Delta Espaço e Eventos • Centro</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FAQ - PERGUNTAS FREQUENTES RESPONSIVO ── */}
      <section className="py-10 sm:py-14 md:py-16 bg-[#FAF8F5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            {...fadeInUp}
            className="text-center mb-5 sm:mb-6"
          >
            <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-800">
              Dúvidas Comuns
            </span>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-stone-900 mt-1.5 mb-1.5">
              Perguntas Frequentes
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Tudo o que você precisa saber antes de agendar sua visita ao espaço.
            </p>
          </motion.div>

          <div className="space-y-2.5">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl bg-white border border-stone-200/80 overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-4 sm:px-5 py-3 sm:py-3.5 text-left flex items-center justify-between gap-3 font-serif font-bold text-stone-900 text-sm sm:text-base cursor-pointer min-h-[44px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-700"
                  >
                    <span className="pr-2">{item.q}</span>
                    <span
                      className={`text-amber-800 transition-transform duration-200 text-xl font-mono shrink-0 ${
                        isOpen ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-3.5 sm:pb-4 text-stone-600 text-xs sm:text-sm leading-relaxed font-light border-t border-stone-100 pt-2.5">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL RESPONSIVO ── */}
      <section className="py-12 sm:py-16 md:py-20 bg-stone-950 text-white text-center relative overflow-hidden">
        <motion.div
          {...fadeInUp}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        >
          <span className="text-[11px] sm:text-xs uppercase font-bold tracking-[0.25em] text-amber-400 block mb-3">
            Atendimento Exclusivo
          </span>

          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-3 sm:mb-4 leading-tight">
            Seu grande momento merece um cenário à altura.
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mb-6 sm:mb-8 font-light px-2 leading-relaxed">
            Entre em contato hoje mesmo com a equipe da Delta Espaço e Eventos. Teremos o prazer de apresentar nosso salão climatizado e montar uma proposta sob medida para Bacabal e região.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#orcamento"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-amber-950/50 transition-all cursor-pointer min-h-[46px] flex items-center justify-center gap-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
            >
              <span>Simular Meu Orçamento</span>
              <ChevronRight className="w-4 h-4 text-amber-200" />
            </a>
            <a
              href={getWhatsappQuickUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 text-white font-semibold text-sm sm:text-base inline-flex items-center justify-center gap-2 border border-stone-700 transition-all cursor-pointer min-h-[46px] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400 fill-emerald-400/20 shrink-0" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── FOOTER ELEGANTE RESPONSIVO ── */}
      <footer className="bg-stone-950 text-stone-400 text-xs py-8 sm:py-10 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-10 border-b border-stone-800">
            {/* MARCA */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="text-xl sm:text-2xl font-serif font-bold text-white tracking-widest flex items-center gap-1 mb-2">
                <span>DELTA</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              </div>
              <p className="text-stone-400 text-xs leading-relaxed mb-4">
                Espaço climatizado premium para celebrações memoráveis, casamentos, formaturas, aniversários e eventos corporativos em Bacabal – MA.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={DELTA_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors min-w-[40px] min-h-[40px] focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label="Instagram da Delta"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                </a>
                <a
                  href={getWhatsappQuickUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors min-w-[40px] min-h-[40px] focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="WhatsApp da Delta"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                </a>
                <a
                  href={DELTA_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white flex items-center justify-center transition-colors min-w-[40px] min-h-[40px] focus-visible:ring-2 focus-visible:ring-amber-500"
                  aria-label="Google Maps da Delta"
                >
                  <MapPin className="w-4 h-4 text-amber-400" />
                </a>
              </div>
            </div>

            {/* LINKS RÁPIDOS */}
            <div>
              <div className="text-white font-serif font-bold text-sm uppercase tracking-wider mb-3 sm:mb-4">
                Navegação
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#espaco" className="hover:text-amber-400 transition-colors py-0.5 inline-block focus-visible:ring-1 focus-visible:ring-amber-400">
                    O Salão & Ambientes
                  </a>
                </li>
                <li>
                  <a href="#eventos" className="hover:text-amber-400 transition-colors py-0.5 inline-block focus-visible:ring-1 focus-visible:ring-amber-400">
                    Casamentos & 15 Anos
                  </a>
                </li>
                <li>
                  <a href="#eventos" className="hover:text-amber-400 transition-colors py-0.5 inline-block focus-visible:ring-1 focus-visible:ring-amber-400">
                    Delta Corporate
                  </a>
                </li>
                <li>
                  <a href="#buffet" className="hover:text-amber-400 transition-colors py-0.5 inline-block focus-visible:ring-1 focus-visible:ring-amber-400">
                    Buffet & Confeitaria Fina
                  </a>
                </li>
                <li>
                  <a href="#galeria" className="hover:text-amber-400 transition-colors py-0.5 inline-block focus-visible:ring-1 focus-visible:ring-amber-400">
                    Galeria de Fotos
                  </a>
                </li>
              </ul>
            </div>

            {/* SERVIÇOS */}
            <div>
              <div className="text-white font-serif font-bold text-sm uppercase tracking-wider mb-3 sm:mb-4">
                Serviços & Estrutura
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-1.5">
                  <Wind className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>Ambiente 100% Climatizado</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Cadeiras Tiffany e Cross-Back</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Escadaria Nobre para Fotos</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Buffet para Jantares e Coquetéis</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Doces Finos e Confeitaria</span>
                </li>
              </ul>
            </div>

            {/* CONTATO & ENDEREÇO */}
            <div>
              <div className="text-white font-serif font-bold text-sm uppercase tracking-wider mb-3 sm:mb-4">
                Localização & Contato
              </div>
              <div className="space-y-2">
                <p className="text-stone-300">
                  {DELTA_INFO.address}
                  <br />
                  Centro, Bacabal – MA • CEP {DELTA_INFO.cep}
                </p>
                <p className="text-stone-300">
                  WhatsApp:{' '}
                  <a
                    href={getWhatsappQuickUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:underline font-semibold"
                  >
                    {DELTA_INFO.phoneFormatted}
                  </a>
                </p>
                <p className="text-stone-400 text-[11px]">
                  Instagram: {DELTA_INFO.instagramHandle}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500 text-center sm:text-left">
            <div>
              © {new Date().getFullYear()} Delta Espaço e Eventos. Todos os direitos reservados.
            </div>
            <div>
              Rua Rui Barbosa, 373, Centro • Bacabal – Maranhão
            </div>
          </div>
        </div>
      </footer>

      {/* ── BOTÃO FLUTUANTE DO WHATSAPP (OTIMIZADO TOUCH COM SAFE AREA) ── */}
      <motion.a
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        href={getWhatsappQuickUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Delta no WhatsApp"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl shadow-emerald-950/40 flex items-center gap-2 sm:gap-3 transition-colors group min-w-[48px] min-h-[48px] justify-center focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white text-emerald-600 shrink-0" />
        <span className="hidden sm:inline font-bold text-xs sm:text-sm tracking-wide pr-1">
          Orçamento no WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
