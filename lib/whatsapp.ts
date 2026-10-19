import { site } from '@/content/site';
export function whatsappLink(message = 'Olá! Gostaria de agendar uma avaliação na Carolina Teles Estética Avançada & Saúde.') {
  const number = site.whatsapp.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
