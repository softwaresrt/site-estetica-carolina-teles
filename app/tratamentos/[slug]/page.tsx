import {notFound} from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft,ArrowUpRight} from 'lucide-react';
import {treatments} from '@/content/site';
import {whatsappLink} from '@/lib/whatsapp';
import type {Metadata} from 'next';
export function generateStaticParams(){return treatments.map(t=>({slug:t.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const t=treatments.find(t=>t.slug===slug);return {title:t?.title??'Tratamento',description:t?.description};}
export default async function TreatmentPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const t=treatments.find(x=>x.slug===slug);if(!t)notFound();return <div className="inner-page treatment-detail-page"><div className="container"><Link href="/tratamentos" className="back-link"><ArrowLeft size={17}/> Todos os cuidados</Link><div className="detail-grid"><div><span className="eyebrow eyebrow-light">{t.category} / CAROLINA TELES</span><h1>{t.title}<span>.</span></h1><p className="detail-intro">{t.description}</p><h2>Uma conversa<br/><em>individualizada.</em></h2><p>{t.detail}</p><h3>Informações importantes</h3><ul>{t.considerations.map(x=><li key={x}>{x}</li>)}</ul><a href={whatsappLink(`Olá! Gostaria de saber mais sobre ${t.title} e solicitar uma avaliação.`)} className="primary-button light-button" target="_blank" rel="noopener noreferrer">Solicitar avaliação <ArrowUpRight size={20}/></a></div><div className="detail-image"><Image src={t.image} alt={`Fotografia relacionada ao tema ${t.title}, fornecida pela clínica`} fill sizes="(max-width: 800px) 100vw, 50vw" style={{objectFit:'cover'}}/></div></div><p className="detail-disclaimer">Informação educativa. Não configura prescrição ou diagnóstico. Disponibilidade, indicação e habilitação do procedimento sujeitas à confirmação profissional. Resultados individuais variam.</p></div></div>}
