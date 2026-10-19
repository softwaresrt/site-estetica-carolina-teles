'use client';
import {Suspense,useEffect,useRef,useState} from 'react';
import {useSiteStore} from '@/lib/useSiteStore';
import dynamic from 'next/dynamic';
import {treatmentZones} from '@/content/site';
import {whatsappLink} from '@/lib/whatsapp';
import {ArrowUpRight,RotateCcw} from 'lucide-react';
const FaceScene=dynamic(()=>import('./FaceScene'),{ssr:false,loading:()=> <div className="face-loading" aria-label="Carregando visualização tridimensional"><div className="face-fallback-orb"/></div>});
export function FaceExplorer(){
 const selected=useSiteStore(state=>state.selectedZone);
 const setSelected=useSiteStore(state=>state.setSelectedZone);
 const [visible,setVisible]=useState(false);
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{const node=root.current;if(!node)return;const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{rootMargin:'250px 0px'});observer.observe(node);return()=>observer.disconnect()},[]);
 const zone=treatmentZones.find(z=>z.id===selected)??treatmentZones[0];
 return <section className="face-section" id="mapa-facial" ref={root}><div className="container face-grid"><div className="face-heading"><span className="eyebrow eyebrow-light">EXPERIÊNCIA INTERATIVA / 01</span><h2>Cada rosto,<br/><em>uma história.</em></h2><p>Explore as diferentes regiões do rosto e descubra perguntas e cuidados que você pode levar para sua avaliação.</p><div className="face-zones" aria-label="Escolha uma região do rosto">{treatmentZones.map(z=><button key={z.id} type="button" aria-pressed={selected===z.id} onClick={()=>setSelected(z.id)} className={selected===z.id?'selected':''}>{z.name}</button>)}</div><div className="scene-instruction"><RotateCcw size={17}/> Arraste para girar o rosto · Selecione uma região</div></div><div className="face-viewer"><span className="viewer-orbit"/><span className="viewer-orbit second"/>{visible?<Suspense fallback={<div className="face-loading"/>}><FaceScene selected={selected} onSelect={setSelected}/></Suspense>:<div className="face-loading"><div className="face-fallback-orb"/></div>}<span className="viewer-cross cross-a">+</span><span className="viewer-cross cross-b">+</span><span className="viewer-label">MAPA FACIAL — ILUSTRAÇÃO 3D CONCEITUAL</span></div><div className="face-detail"><p className="eyebrow eyebrow-light">REGIÃO SELECIONADA</p><h3>{zone.name}</h3><p>{zone.description}</p><span className="fine-rule"/><strong>Assuntos para sua avaliação</strong>{zone.suggested.map(x=><div className="suggestion" key={x}><span className="mini-dot"/>{x}</div>)}<a className="link-underlined light" href={whatsappLink(`Olá! Gostaria de solicitar uma avaliação e conversar sobre a região: ${zone.name}.`)} target="_blank" rel="noopener noreferrer">Solicitar avaliação <ArrowUpRight size={19}/></a><small>Ferramenta educativa. Não realiza diagnóstico ou indicação automática de procedimentos.</small></div></div></section>;
}
