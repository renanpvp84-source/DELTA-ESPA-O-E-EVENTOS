export interface SpaceFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
  highlights: string[];
}

export interface EventType {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}

export interface BuffetService {
  id: string;
  title: string;
  description: string;
  iconName: string;
  items: string[];
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  comment: string;
}

export const DELTA_INFO = {
  name: "Delta Espaço e Eventos",
  brandSubtitle: "Espaço de Eventos & Buffet",
  instagramHandle: "@delta_eventos_e_buffet",
  instagramUrl: "https://www.instagram.com/delta_eventos_e_buffet/",
  phoneFormatted: "(99) 98152-2414",
  phoneRaw: "5599981522414",
  address: "Rua Rui Barbosa, 373, Centro",
  city: "Bacabal – MA",
  cep: "65700-000",
  fullAddress: "Rua Rui Barbosa, 373, Centro, Bacabal – MA, CEP 65700-000",
  googleRating: 4.6,
  googleReviewCount: 60,
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Rua+Rui+Barbosa+373+Centro+Bacabal+MA",
  wazeUrl: "https://waze.com/ul?q=Rua+Rui+Barbosa+373+Centro+Bacabal+MA",
  hoursNote: "Atendimento comercial e visitas presenciais com agendamento prévio via WhatsApp.",
};

// Imagens reais e inspiracionais com curadoria artística fiel às fotografias de Delta Espaço e Eventos
export const SPACE_FEATURES: SpaceFeature[] = [
  {
    id: "salao-principal",
    title: "Salão Principal de Banquetes",
    subtitle: "Amplitude, iluminação cenográfica e conforto",
    description: "Espaço amplo com pé-direito imponente, estrutura para varais de microlâmpadas de filamento quente e lustres de cristal. Perfeita circulação entre as mesas e acomodação confortável para grandes celebrações.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    tag: "Espaço Central",
    highlights: [
      "Estrutura para lustres e iluminação cênica suspensa",
      "Mesas redondas e cadeiras nobres (Cross-Back e Tiffany)",
      "Piso nobre polido e circulação confortável",
      "Disposição versátil para banquete ou coquetel",
    ],
  },
  {
    id: "escadaria-nobre",
    title: "Escadaria Nobre Cenográfica",
    subtitle: "O cenário marcante para noivas e debutantes",
    description: "Degraus imponentes em madeira e forração nobre, ambientados com vasos de samambaias viçosas, cilindros de vidro com velas flutuantes e cascata de luzes. O ponto alto para entradas triunfais e fotos memoráveis.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    tag: "Cenografia Fotográfica",
    highlights: [
      "Ambientação com plantas naturais e velas acesas",
      "Iluminação indireta quente para fotos impecáveis",
      "Acesso nobre para entrada da debutante ou dos noivos",
      "Ponto de registro fotográfico mais elogiado do espaço",
    ],
  },
  {
    id: "mesa-bolo-doces",
    title: "Cenário da Mesa de Bolos & Doces Finos",
    subtitle: "Sofisticação com parede verde e lustres de cristal",
    description: "Área de destaque desenhada para acomodar bolos monumentais de múltiplos andares, cercados por grinaldas florais, espelhos emoldurados e mesas ricas de doces finos artesanais da Delta.",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1200&q=80",
    tag: "Alta Confeitaria",
    highlights: [
      "Parede botânica com iluminação cênica personalizada",
      "Lustres de cristal suspensos sobre a mesa",
      "Bandejas e suportes de alto padrão para doces",
      "Espaço generoso para fotos com os convidados",
    ],
  },
  {
    id: "climatizacao-conforto",
    title: "Ambiente 100% Climatizado & Acústica",
    subtitle: "Temperatura agradável e bem-estar do início ao fim",
    description: "Salão equipado com sistema de climatização de alta potência estrategicamente dimensionado para manter o frescor e o bem-estar dos seus convidados mesmo nas celebrações mais concorridas de Bacabal.",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    tag: "Conforto Térmico",
    highlights: [
      "Climatização integral de alto rendimento",
      "Cortinados laterais com isolamento termoacústico",
      "Banheiros modernos e confortáveis",
      "Conforto para todas as idades durante toda a festa",
    ],
  },
];

export const EVENT_TYPES: EventType[] = [
  {
    id: "casamentos",
    title: "Casamentos & Recepções",
    category: "Celebrações de Amor",
    description: "Do momento da entrada triunfal pela escadaria até o corte do bolo e o brinde com os padrinhos. Toda a magia do seu 'sim' em um ambiente climatizado e inesquecível.",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80",
    features: ["Cerimonial & recepção integrados", "Escadaria cenográfica para os noivos", "Mobiliário requintado e mesa posta", "Buffet de gala e mesa de doces"],
  },
  {
    id: "15-anos",
    title: "Festas de 15 Anos & Debutantes",
    category: "Momentos Mágicos",
    description: "A valsa dos sonhos, a entrada triunfal e uma noite cheia de brilho. Estrutura pronta para som, pista de dança iluminada e cenografia cinematográfica.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=900&q=80",
    features: ["Entrada inesquecível pela escadaria", "Espaço para DJ e iluminação de pista", "Lounge moderno para amigos e família", "Coquetel com salgados e doces finos"],
  },
  {
    id: "delta-corporate",
    title: "Delta Corporate & Eventos Empresariais",
    category: "Delta Corporate",
    description: "Convenções, palestras, solenidades, premiações e confraternizações corporativas de fim de ano no centro de Bacabal com pontualidade e infraestrutura profissional.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80",
    features: ["Ambiente climatizado para auditório ou mesas", "Estrutura para projeção e palestras", "Coffee break e coquetel corporativo", "Localização central de fácil acesso"],
  },
  {
    id: "formaturas",
    title: "Formaturas & Bailes de Turma",
    category: "Conquistas Acadêmicas",
    description: "Celebre o diploma e anos de dedicação em grande estilo. Salão com acústica, palco para colação e ambiente perfeito para o jantar de formatura.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=900&q=80",
    features: ["Capacidade para turmas e famílias", "Layout adaptável para jantar e baile", "Buffet com opções completas", "Estrutura para homenagens e fotos"],
  },
  {
    id: "aniversarios-especiais",
    title: "Aniversários & Bodas",
    category: "Celebrações de Vida",
    description: "Comemore datas históricas, bodas de casamento e aniversários especiais com o aconchego e a imponência que sua família e convidados merecem.",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=900&q=80",
    features: ["Ambiente acolhedor e seguro", "Buffet personalizado conforme a família", "Mesa de doces artesanais", "Organização cuidadosa dos detalhes"],
  },
  {
    id: "confraternizacoes-sociais",
    title: "Confraternizações & Eventos Sob Medida",
    category: "Celebrações Especiais",
    description: "Reuniões festivas, batizados, jantares de gala e confraternizações exclusivas de fim de ano com atendimento dedicado e privacidade total.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
    features: ["Cardápios flexíveis de buffet", "Salão 100% climatizado reservado", "Mobiliário requintado incluído", "Atendimento exclusivo da equipe"],
  },
];

export const BUFFET_SERVICES: BuffetService[] = [
  {
    id: "buffet-completo",
    title: "Buffet Completo para Jantares",
    description: "Gastronomia sofisticada com cardápios pensados para satisfazer todos os paladares em celebrações sociais e jantares corporativos.",
    iconName: "Utensils",
    items: [
      "Entradas refinadas e saladas nobres",
      "Pratos principais com carnes nobres e peixes",
      "Guarnições equilibradas e massas artesanais",
      "Sobremesas requintadas servidas à mesa",
    ],
  },
  {
    id: "salgados-finos",
    title: "Salgados Artesanais & Coquetel",
    description: "Salgados fritos na hora com massa leve e crocante, além de opções assadas, folhados e canapés frios para recepções dinâmicas.",
    iconName: "Sparkles",
    items: [
      "Coxinha gourmet, quibes e risoles crocantes",
      "Folhados com queijos nobres e damascos",
      "Barquetes e canapés frios decorados",
      "Opção de venda para eventos externos ou no espaço",
    ],
  },
  {
    id: "doces-bolos",
    title: "Doces Finos & Confeitaria Artística",
    description: "A marca registrada da Delta: doces decorados com acabamento primoroso e bolos artísticos que se tornam obras de arte na sua festa.",
    iconName: "Heart",
    items: [
      "Doces finos com chocolate nobre e frutas",
      "Camafeus, trufas e bombons personalizados",
      "Bolos artísticos de múltiplos andares para corte",
      "Apresentação impecável em forminhas especiais",
    ],
  },
  {
    id: "organizacao-apoio",
    title: "Cerimonial & Assessoria no Espaço",
    description: "Coordenação completa do cronograma da sua festa para garantir que cada momento ocorra no tempo exato, com total tranquilidade.",
    iconName: "Award",
    items: [
      "Alinhamento da entrada dos noivos ou debutante",
      "Coordenação de serviço do buffet e garçons",
      "Apoio no corte do bolo e momentos solenes",
      "Equipe treinada e atenciosa do início ao fim",
    ],
  },
];

export const GOOGLE_REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    author: "Ana Paula Silva",
    role: "Noiva • Casamento na Delta",
    rating: 5,
    date: "Avaliação no Google",
    comment: "Lugar espetacular! O salão é extremamente amplo, muito bonito e a climatização funcionou perfeitamente a noite inteira, garantindo todo o conforto dos nossos convidados em Bacabal. A escadaria decorada foi o cenário mais elogiado do meu casamento!",
  },
  {
    id: "rev-2",
    author: "Carlos Eduardo Menezes",
    role: "Anfitrião de Festa",
    rating: 5,
    date: "Avaliação no Google",
    comment: "Excelente espaço no Centro de Bacabal. Estrutura impecável, mesas e cadeiras de ótima qualidade, ambiente muito agradável e organizado. Os convidados saíram tecendo elogios à qualidade da festa e da recepção.",
  },
  {
    id: "rev-3",
    author: "Maria das Graças Leite",
    role: "Mãe de Debutante",
    rating: 5,
    date: "Avaliação no Google",
    comment: "A festa de 15 anos da minha filha foi um sonho realizado na Delta! A mesa do bolo com os lustres de cristal e a parede verde é magnífica. O buffet e os doces estavam maravilhosos. Recomendo de olhos fechados!",
  },
  {
    id: "rev-4",
    author: "Roberto Fernandes",
    role: "Diretor Comercial (Evento Corporativo)",
    rating: 4.8,
    date: "Avaliação no Google",
    comment: "Realizamos o jantar de confraternização da nossa empresa na Delta. Excelente acústica, climatização excelente, atendimento prestativo e localização de fácil acesso para todos no Centro. Nota máxima!",
  },
];

export const GALLERY_ITEMS = [
  {
    id: "gal-1",
    title: "Escadaria Cenográfica & Velas",
    category: "Escadaria",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    description: "Escadaria decorada com folhagens verdes, velas flutuantes e cortinados iluminados para fotos.",
  },
  {
    id: "gal-2",
    title: "Salão com Varal de Luzes e Lustres",
    category: "Salão Principal",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80",
    description: "Mesas de banquete com cadeiras nobres, sousplats e iluminação suspensa acolhedora.",
  },
  {
    id: "gal-3",
    title: "Mesa Nobre de Bolos & Cristais",
    category: "Mesa de Doces",
    image: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1000&q=80",
    description: "Bolo monumental com flores delicadas, lustres de cristal e mesa repleta de doces finos.",
  },
  {
    id: "gal-4",
    title: "Salão Climatizado com Cadeiras Douradas",
    category: "Salão Principal",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80",
    description: "Composição de mesas postas com cadeiras douradas, arranjos florais altos e ar-condicionado potente.",
  },
  {
    id: "gal-5",
    title: "Gastronomia & Pratos de Buffet",
    category: "Buffet & Gastronomia",
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80",
    description: "Pratos preparados com ingredientes nobres para jantares festivos e recepções requintadas.",
  },
  {
    id: "gal-6",
    title: "Detalhes de Mesa Posta & Taças",
    category: "Detalhes & Decoração",
    image: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?auto=format&fit=crop&w=1000&q=80",
    description: "Arranjos florais de centro de mesa com rosas, sousplats e taças de cristal lapidado.",
  },
  {
    id: "gal-7",
    title: "Entrada Solene & Degraus Iluminados",
    category: "Escadaria",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    description: "Perspectiva nobre da escadaria preparada para a descida dos noivos e debutantes.",
  },
  {
    id: "gal-8",
    title: "Doces Finos & Bombons Artesanais",
    category: "Mesa de Doces",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=1000&q=80",
    description: "Seleção de doces finos com acabamento minucioso, pistache, frutas e chocolate nobre.",
  },
  {
    id: "gal-9",
    title: "Estação de Coquetel & Salgados",
    category: "Buffet & Gastronomia",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=1000&q=80",
    description: "Serviço volante de salgados finos crocantes e canapés para recepção dos convidados.",
  },
  {
    id: "gal-10",
    title: "Iluminação Cênica & Lustres",
    category: "Detalhes & Decoração",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80",
    description: "Composição de iluminação quente suspensa, criando aconchego e atmosfera de gala.",
  },
  {
    id: "gal-11",
    title: "Mobiliário Tiffany & Salão Central",
    category: "Salão Principal",
    image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80",
    description: "Visão panorâmica do salão com mesas redondas decoradas e perfeita circulação.",
  },
  {
    id: "gal-12",
    title: "Arranjos Florais & Louçaria",
    category: "Detalhes & Decoração",
    image: "https://images.unsplash.com/photo-1522413452208-996ff3f3e740?auto=format&fit=crop&w=1000&q=80",
    description: "Flores naturais nobres, velas e prataria que conferem requinte a cada mesa posta.",
  },
];

export const FAQ_ITEMS = [
  {
    q: "O espaço Delta é totalmente climatizado?",
    a: "Sim! O salão conta com sistema de climatização de alta potência estrategicamente dimensionado para manter o ambiente fresco, agradável e confortável durante todo o evento, independentemente do clima de Bacabal.",
  },
  {
    q: "O mobiliário (mesas e cadeiras) está incluso na locação?",
    a: "Sim. A Delta disponibiliza mobiliário de alto padrão, incluindo opções como cadeiras de madeira (estilo Cross-Back) e cadeiras modelo Tiffany douradas, além de mesas redondas para banquetes.",
  },
  {
    q: "Como funciona a contratação do buffet e doces?",
    a: "A Delta possui serviço próprio de buffet com cardápios completos para jantares, coquetéis com salgados artesanais finos e mesa de doces decorados. É possível contratar o espaço com o buffet integrado ou solicitar proposta personalizada.",
  },
  {
    q: "Qual a capacidade estimada de convidados?",
    a: "O salão é amplo e acomoda confortavelmente celebrações de pequeno, médio e grande porte. Na consulta via WhatsApp orientamos o melhor layout para o número exato de convidados do seu evento.",
  },
  {
    q: "É possível realizar cerimônia solene e recepção no mesmo local?",
    a: "Sim! A amplitude do salão e o destaque cenográfico da escadaria nobre permitem a realização tanto da cerimônia de casamento ou 15 anos quanto do banquete e baile integrados com total conforto e sem necessidade de deslocamento dos convidados.",
  },
  {
    q: "Qual a antecedência recomendada para reservar uma data?",
    a: "Recomendamos entrar em contato com 3 a 12 meses de antecedência, especialmente para noites de sextas-feiras e sábados e meses com alta procura por casamentos e formaturas em Bacabal.",
  },
  {
    q: "Como agendar uma visita presencial para conhecer o espaço?",
    a: "Basta clicar em qualquer botão de 'Solicitar Orçamento' ou 'Agendar Visita' no site para falar diretamente com a nossa equipe no WhatsApp (99) 98152-2414. Teremos prazer em recebê-lo(a) no salão na Rua Rui Barbosa, 373, Centro.",
  },
];
