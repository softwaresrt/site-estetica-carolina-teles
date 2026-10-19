export type TreatmentCategory = 'Facial' | 'Corporal' | 'Pele' | 'Bem-estar';
export type Treatment = {
  slug: string; title: string; category: TreatmentCategory; tagline: string;
  description: string; detail: string; image: string; objectPosition?: string;
  considerations: string[];
};

export const site = {
  name: 'Carolina Teles',
  fullName: 'Carolina Teles Estética Avançada & Saúde',
  city: 'Jaboatão dos Guararapes',
  state: 'PE',
  address: 'Av. Gen. Manoel Rabelo, 5117 - Sucupira, Jaboatão dos Guararapes - PE, 54280-000',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5581988590930',
  phoneDisplay: '(81) 98859-0930',
  instagram: 'https://www.instagram.com/carolteles_estetica/',
  instagramUser: '@carolteles_estetica',
  portrait: '/media/carolina-retrato.jpg',
  headline: 'A ciência da beleza, com o seu ritmo.',
  registration: 'Fisioterapeuta — CREFITO 315195-F (conforme material fornecido; validar antes da publicação)',
  hours: 'Consulte os horários disponíveis pelo WhatsApp.',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Av.+Gen.+Manoel+Rabelo%2C+5117%2C+Sucupira%2C+Jaboat%C3%A3o+dos+Guararapes%2C+PE',
  legal: { cnpj: '', responsibleProfessional: 'Carolina Teles', privacyContact: '(81) 98859-0930' },
} as const;

export const treatments: Treatment[] = [
  { slug:'limpeza-de-pele', title:'Limpeza de pele', category:'Pele', tagline:'Um cuidado que começa no detalhe.', image:'/media/resultado-pele.jpg', description:'Avaliação individual e abordagem voltada à rotina de cuidados da pele.', detail:'A indicação, as etapas, o número de sessões e os cuidados posteriores são definidos em avaliação presencial.', considerations:['Procedimento e técnica variam conforme a necessidade da pele.','Converse sobre sensibilidades, medicamentos e contraindicações durante a avaliação.'] },
  { slug:'microagulhamento', title:'Microagulhamento', category:'Facial', tagline:'Atenção à textura e às particularidades da pele.', image:'/media/resultado-facial.jpg', description:'Possibilidade de cuidado estético que exige avaliação individual de indicação e contraindicações.', detail:'A decisão de realizar o procedimento, a técnica e o período de recuperação dependem de avaliação profissional.', considerations:['Não é indicado para todas as pessoas ou condições de pele.','Duração, frequência e recuperação devem ser informadas pela profissional.'] },
  { slug:'avaliacao-de-sinais', title:'Avaliação de sinais na pele', category:'Pele', tagline:'Primeiro, compreender. Depois, cuidar.', image:'/media/resultado-sinal.jpg', description:'Orientação inicial sobre alterações visíveis na pele e encaminhamento adequado quando necessário.', detail:'Lesões pigmentadas ou suspeitas precisam de avaliação médica, preferencialmente dermatológica, antes de qualquer intervenção estética. A clínica deverá confirmar os serviços autorizados em sua atuação.', considerations:['Não é possível identificar um sinal pela aparência de uma foto.','Sinais novos, crescentes, irregulares, dolorosos ou que sangram precisam de avaliação médica.'] },
  { slug:'drenagem-linfatica', title:'Drenagem linfática', category:'Corporal', tagline:'Um tempo dedicado ao seu bem-estar.', image:'/media/resultado-colo.jpg', description:'Cuidado corporal com avaliação de necessidades e histórico individual.', detail:'A profissional orienta sobre a técnica, a adequação e os cuidados relevantes para cada pessoa.', considerations:['Existem condições em que a drenagem não deve ser realizada.','O plano e a frequência são individualizados em consulta.'] },
  { slug:'massagem', title:'Massagens', category:'Bem-estar', tagline:'Pausa, presença e acolhimento.', image:'/media/carolina-retrato.jpg', description:'Um momento de cuidado com escolha de abordagem conforme sua preferência e avaliação.', detail:'Tipos de massagem, duração e intensidade devem ser confirmados diretamente com a clínica.', considerations:['Informe desconfortos e condições relevantes no atendimento.','A experiência pode ser adaptada ao conforto individual.'] },
  { slug:'ventosaterapia', title:'Ventosaterapia', category:'Corporal', tagline:'Técnica e acompanhamento individual.', image:'/media/resultado-regiao.jpg', description:'Procedimento corporal citado entre os serviços da clínica, sujeito à avaliação prévia.', detail:'Os potenciais benefícios, os efeitos temporários na pele e as contraindicações devem ser discutidos antes de decidir.', considerations:['Pode deixar marcas transitórias na pele.','A indicação depende de avaliação individual.'] },
];

export const treatmentZones = [
  { id:'testa', name:'Testa', x:-0.06, y:0.78, z:0.59, description:'Converse sobre textura, rotina e cuidados gerais da região.', suggested:['Limpeza de pele','Avaliação facial'] },
  { id:'olhos', name:'Olhos', x:0.44, y:0.25, z:0.48, description:'A pele ao redor dos olhos merece análise criteriosa e individualizada.', suggested:['Avaliação da pele','Rotina de cuidados'] },
  { id:'macas', name:'Maçãs do rosto', x:-0.52, y:0.04, z:0.53, description:'Uma conversa sobre textura, viço e necessidades individuais.', suggested:['Limpeza de pele','Microagulhamento, se indicado'] },
  { id:'nariz', name:'Nariz', x:0.03, y:0.12, z:0.89, description:'Avaliação de oleosidade, poros e cuidados apropriados.', suggested:['Limpeza de pele','Avaliação facial'] },
  { id:'labios', name:'Lábios', x:0.05, y:-0.32, z:0.70, description:'A região perioral pede orientações específicas.', suggested:['Avaliação facial','Cuidados da pele'] },
  { id:'mandibula', name:'Mandíbula', x:0.48, y:-0.66, z:0.40, description:'Explore orientações estéticas para a região inferior do rosto.', suggested:['Avaliação facial','Plano de cuidados'] },
  { id:'pescoco', name:'Pescoço', x:-0.03, y:-1.20, z:0.33, description:'Cuidado com a pele e rotina que considera o pescoço.', suggested:['Avaliação de pele','Cuidados corporais'] },
];

export const results = [
 { id:'facial', title:'Região facial', subtitle:'Registros fotográficos fornecidos pela clínica', image:'/media/resultado-facial.jpg', layout:'vertical' as const },
 { id:'pele', title:'Pele e sinais', subtitle:'Documentação visual compartilhada', image:'/media/resultado-pele.jpg', layout:'vertical' as const },
 { id:'regiao', title:'Região corporal', subtitle:'Registros para contextualização em consulta', image:'/media/resultado-regiao.jpg', layout:'vertical' as const },
 { id:'sinal', title:'Sinal na pele', subtitle:'Imagens com enquadramento diferente', image:'/media/resultado-sinal.jpg', layout:'horizontal' as const },
];

export const faqs = [
 { question:'Como funciona a primeira avaliação?', answer:'Você entra em contato com a clínica e solicita uma avaliação. A profissional conversa sobre seus objetivos, analisa as possibilidades adequadas e orienta sobre próximos passos.' },
 { question:'Posso escolher um procedimento diretamente?', answer:'Você pode informar seu interesse, mas a indicação e as possíveis contraindicações precisam ser verificadas pela profissional antes de qualquer procedimento.' },
 { question:'Quantas sessões são necessárias?', answer:'Depende da técnica, do objetivo, da avaliação e de como cada pessoa responde. A clínica não deve prometer um número fixo ou resultado garantido sem avaliação.' },
 { question:'Os tratamentos doem ou exigem recuperação?', answer:'A sensação e o período de recuperação variam conforme a técnica e o contexto individual. Essas informações são explicadas durante a avaliação.' },
 { question:'Como saber os valores e formas de pagamento?', answer:'A equipe informa valores e formas de pagamento pelo canal oficial, depois de compreender qual serviço está sendo solicitado.' },
 { question:'Posso agendar pelo site?', answer:'O site prepara sua solicitação e a envia pelo WhatsApp da clínica. Um horário só estará confirmado após a resposta da equipe.' },
];
