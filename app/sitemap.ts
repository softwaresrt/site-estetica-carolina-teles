import type {MetadataRoute} from 'next';
import {treatments} from '@/content/site';
const base=process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export default function sitemap():MetadataRoute.Sitemap{
 return ['','tratamentos','profissionais','clinica','agendamento','contato','politica-de-privacidade',...treatments.map(t=>'tratamentos/'+t.slug)].map(p=>({url:`${base}/${p}`,changeFrequency:'monthly' as const,priority:p===''?1:.65}));
}
