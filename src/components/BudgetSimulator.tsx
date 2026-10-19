import React, { useState } from 'react';
import { Send, CheckCircle2, Users, Calendar, Sparkles, MessageCircle, HeartHandshake, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DELTA_INFO } from '../data/deltaData';

const EVENT_OPTIONS = [
  { id: 'casamento', label: 'Casamento & Recepção' },
  { id: '15anos', label: 'Festa de 15 Anos (Debutante)' },
  { id: 'corporate', label: 'Delta Corporate (Empresarial)' },
  { id: 'formatura', label: 'Formatura ou Baile' },
  { id: 'aniversario', label: 'Aniversário / Bodas' },
  { id: 'outro', label: 'Outro Formato' },
];

const GUEST_OPTIONS = [
  'Até 80 convidados',
  '100 a 150 convidados',
  '150 a 200 convidados',
  '200 a 300 convidados',
  'Mais de 300 convidados',
];

const SERVICES_OPTIONS = [
  { id: 'espaco', label: 'Salão 100% Climatizado & Mobiliário', defaultChecked: true },
  { id: 'buffet', label: 'Buffet Completo (Jantar ou Coquetel)', defaultChecked: true },
  { id: 'doces', label: 'Mesa de Doces Finos & Confeitaria', defaultChecked: false },
  { id: 'cerimonial', label: 'Apoio e Cerimonial de Espaço', defaultChecked: false },
];

export const BudgetSimulator: React.FC = () => {
  const [eventType, setEventType] = useState('Casamento & Recepção');
  const [guestCount, setGuestCount] = useState('100 a 150 convidados');
  const [datePeriod, setDatePeriod] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'Salão 100% Climatizado & Mobiliário',
    'Buffet Completo (Jantar ou Coquetel)',
  ]);
  const [clientName, setClientName] = useState('');
  const [customNotes, setCustomNotes] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const toggleService = (label: string) => {
    if (selectedServices.includes(label)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== label));
      }
    } else {
      setSelectedServices([...selectedServices, label]);
    }
  };

  // Input sanitization: strip control characters and enforce safe character boundaries
  const sanitizeInput = (val: string, maxLength: number) => {
    return val
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // remove invisible control chars
      .slice(0, maxLength);
  };

  const handleSendToWhatsapp = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = sanitizeInput(clientName.trim(), 80);
    const cleanDate = sanitizeInput(datePeriod.trim(), 100);
    const cleanNotes = sanitizeInput(customNotes.trim(), 400);

    const greeting = cleanName
      ? `Olá equipe Delta Espaço e Eventos! Meu nome é *${cleanName}*.`
      : 'Olá equipe Delta Espaço e Eventos!';

    const message = `${greeting}
Gostaria de verificar disponibilidade de data e solicitar um orçamento:

🏛️ *Espaço:* Delta Espaço e Eventos (Bacabal – MA)
🎉 *Tipo de Evento:* ${eventType}
👥 *Estimativa de Convidados:* ${guestCount}
📅 *Previsão de Data:* ${cleanDate || 'A definir'}
✨ *Serviços de Interesse:*
${selectedServices.map((s) => `  • ${s}`).join('\n')}${cleanNotes ? `\n📝 *Observações:* ${cleanNotes}` : ''}

Poderiam me orientar sobre disponibilidade e valores para esse perfil de celebração? Obrigado(a)!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${DELTA_INFO.phoneRaw}?text=${encodedMessage}`;
    setSubmittedUrl(whatsappUrl);

    // Safe dispatch that respects browser iframe security policies
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyMessage = async () => {
    try {
      const cleanName = sanitizeInput(clientName.trim(), 80);
      const cleanDate = sanitizeInput(datePeriod.trim(), 100);

      const greeting = cleanName
        ? `Olá equipe Delta Espaço e Eventos! Meu nome é ${cleanName}.`
        : 'Olá equipe Delta Espaço e Eventos!';

      const text = `${greeting}\n\nTipo de Evento: ${eventType}\nConvidados: ${guestCount}\nPrevisão: ${cleanDate || 'A definir'}\nServiços: ${selectedServices.join(', ')}`;
      
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Graceful fallback if browser clipboard permissions are restricted
      setCopied(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden w-full"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 p-4 sm:p-6 md:p-7 text-white">
        <div className="flex items-center gap-1.5 text-amber-300 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Atendimento Direto & Personalizado</span>
        </div>
        <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white tracking-tight">
          Planeje seu Evento na Delta
        </h3>
        <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-2xl font-light leading-relaxed">
          Selecione os detalhes da sua celebração abaixo. Geramos uma solicitação personalizada e direta para o WhatsApp oficial da nossa equipe em Bacabal.
        </p>
      </div>

      <form onSubmit={handleSendToWhatsapp} className="p-4 sm:p-6 md:p-7 space-y-4 sm:space-y-5">
        {/* Banner de Confirmação quando submetido */}
        <AnimatePresence>
          {submittedUrl && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-3 sm:p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 overflow-hidden"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <div className="text-xs sm:text-sm font-medium">
                  Sua mensagem foi gerada para o WhatsApp <strong>{DELTA_INFO.phoneFormatted}</strong>.
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="px-2.5 py-1 rounded-lg border border-emerald-300 bg-white hover:bg-emerald-100 text-xs text-emerald-800 font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
                </button>
                <a
                  href={submittedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors"
                >
                  Reabrir Conversa
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1. Tipo de Evento */}
        <div>
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wider mb-2">
            <HeartHandshake className="w-4 h-4 text-amber-700 shrink-0" />
            1. Qual o tipo de celebração?
          </label>
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
            {EVENT_OPTIONS.map((opt) => {
              const isSelected = eventType === opt.label;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setEventType(opt.label)}
                  aria-pressed={isSelected}
                  className={`text-left p-2.5 sm:p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all min-h-[40px] flex items-center justify-between cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:outline-hidden ${
                    isSelected
                      ? 'border-amber-700 bg-amber-50/90 text-amber-950 font-semibold shadow-xs ring-1 ring-amber-600/30'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span className="truncate pr-1">{opt.label}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Número de Convidados */}
        <div>
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wider mb-2">
            <Users className="w-4 h-4 text-amber-700 shrink-0" />
            2. Número estimado de convidados
          </label>
          <div className="flex flex-wrap gap-2">
            {GUEST_OPTIONS.map((opt) => {
              const isSelected = guestCount === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setGuestCount(opt)}
                  aria-pressed={isSelected}
                  className={`flex-1 min-w-[125px] sm:min-w-[140px] p-2.5 rounded-xl border text-xs sm:text-sm font-medium text-center transition-all min-h-[40px] flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:outline-hidden ${
                    isSelected
                      ? 'border-amber-700 bg-amber-50/90 text-amber-950 font-bold ring-1 ring-amber-600/30'
                      : 'border-stone-200 bg-stone-50/50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span className="leading-tight">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Serviços de Interesse */}
        <div>
          <label className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-stone-800 uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            3. Quais serviços você gostaria de incluir?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SERVICES_OPTIONS.map((srv) => {
              const checked = selectedServices.includes(srv.label);
              return (
                <div
                  key={srv.id}
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={checked}
                  onKeyDown={(e) => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      e.preventDefault();
                      toggleService(srv.label);
                    }
                  }}
                  onClick={() => toggleService(srv.label)}
                  className={`p-2.5 sm:p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all min-h-[40px] select-none focus-visible:ring-2 focus-visible:ring-amber-700 focus-visible:outline-hidden ${
                    checked
                      ? 'border-amber-700 bg-amber-50/80 text-stone-900 font-semibold'
                      : 'border-stone-200 bg-stone-50/40 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  <span className="text-xs sm:text-sm pr-2 leading-snug">{srv.label}</span>
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                      checked
                        ? 'bg-amber-700 border-amber-700 text-white'
                        : 'border-stone-300 bg-white'
                    }`}
                  >
                    {checked && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. Previsão de Data & Nome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="budget-date" className="flex items-center gap-1 text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              <Calendar className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              Previsão de Data ou Mês
            </label>
            <input
              id="budget-date"
              type="text"
              maxLength={100}
              value={datePeriod}
              onChange={(e) => setDatePeriod(e.target.value)}
              placeholder="Ex: Dezembro / Sábado em Outubro"
              className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-600/40 focus:border-amber-700 text-sm bg-white text-stone-900"
            />
          </div>
          <div>
            <label htmlFor="budget-name" className="flex items-center gap-1 text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
              <Users className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              Seu Nome ou Anfitrião
            </label>
            <input
              id="budget-name"
              type="text"
              maxLength={80}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Como podemos te chamar?"
              className="w-full px-3 py-2 sm:py-2.5 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-600/40 focus:border-amber-700 text-sm bg-white text-stone-900"
            />
          </div>
        </div>

        {/* Observações opcionais */}
        <div>
          <label htmlFor="budget-notes" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
            Observações ou preferências específicas (opcional)
          </label>
          <textarea
            id="budget-notes"
            rows={2}
            maxLength={400}
            value={customNotes}
            onChange={(e) => setCustomNotes(e.target.value)}
            placeholder="Ex: Gostaria de agendar visita presencial nesta semana..."
            className="w-full px-3 py-2 rounded-xl border border-stone-300 focus:outline-hidden focus:ring-2 focus:ring-amber-600/40 focus:border-amber-700 text-sm bg-white text-stone-900"
          />
        </div>

        {/* Resumo e Botão CTA */}
        <div className="pt-1">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 sm:p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
            <div className="min-w-0">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-900">
                Resumo da Sua Solicitação
              </div>
              <p className="text-xs sm:text-sm font-serif font-bold text-stone-900 mt-0.5 truncate">
                {eventType} • {guestCount}
              </p>
              <p className="text-[11px] sm:text-xs text-stone-600 mt-0.5">
                {selectedServices.length} serviços selecionados
                {datePeriod.trim() ? ` • Previsão: ${datePeriod.trim()}` : ''}
              </p>
            </div>
            <div className="text-xs text-stone-600 sm:text-right shrink-0 pt-1.5 sm:pt-0 border-t sm:border-t-0 border-amber-200/60">
              Atendimento via WhatsApp:
              <div className="font-bold text-stone-900 text-xs sm:text-sm">{DELTA_INFO.phoneFormatted}</div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-900/20 transition-all cursor-pointer min-h-[44px] sm:min-h-[48px] focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-hidden"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-emerald-600 shrink-0" />
            <span className="text-center">Enviar Solicitação no WhatsApp</span>
            <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 hidden xs:inline" />
          </button>
          <p className="text-center text-[10px] sm:text-[11px] text-stone-500 mt-2">
            Sem compromisso. Nossa equipe em Bacabal responderá com a disponibilidade e informações detalhadas.
          </p>
        </div>
      </form>
    </motion.div>
  );
};
