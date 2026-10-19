'use client';
import Image from 'next/image';
import Link from 'next/link';
import {useState} from 'react';
import {treatments,type TreatmentCategory} from '@/content/site';
import {ArrowUpRight} from 'lucide-react';
const filters=['Todos','Facial','Corporal','Pele','Bem-estar'] as const;
export function TreatmentGrid({full=false}:{full?:boolean}){
 const [filter,setFilter]=useState<(typeof filters)[number]>('Todos');
 const list=treatments.filter(t=>filter==='Todos'||t.category===filter);
 return <><div className="treatment-filters" role="group" aria-label="Filtrar tratamentos">{filters.map(x=><button key={x} type="button" aria-pressed={filter===x} className={filter===x?'active':''} onClick={()=>setFilter(x)}>{x}</button>)}</div><div className={'treatment-cards '+(full?'treatment-cards-full':'')}>{list.map((t,index)=><Link key={t.slug} href={`/tratamentos/${t.slug}`} className="treatment-card"><Image src={t.image} alt={`Imagem ilustrativa do tema ${t.title}; não representa garantia de resultado`} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 35vw" style={{objectFit:'cover',objectPosition:t.objectPosition??'center 30%'}}/><div className="treatment-shadow"/><div className="treatment-card-top"><span>{String(index+1).padStart(2,'0')} / 06</span><span>{t.category}</span></div><div className="treatment-card-bottom"><span>{t.tagline}</span><h3>{t.title}</h3><div className="treatment-arrow"><ArrowUpRight size={23}/></div></div></Link>)}</div><p className="treatment-disclaimer">Serviços citados a partir dos materiais fornecidos; disponibilidade, indicação, técnicas e habilitação específica devem ser confirmadas com a clínica. Fotografias são referências fornecidas, não promessas de resultados.</p></>;
}
