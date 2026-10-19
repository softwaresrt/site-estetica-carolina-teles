'use client';
import {useMemo,useState} from 'react';
import {results} from '@/content/site';
import {ArrowLeft,ArrowRight} from 'lucide-react';
function makeLiquidPolygon(value:number){
 const points=['0% 0%',`${value}% 0%`];
 for(let y=0;y<=100;y+=4){const x=Math.max(0,Math.min(100,value+Math.sin(y*.14)*1.22+Math.sin(y*.32)*.5));points.push(`${x}% ${y}%`)}
 points.push('0% 100%');return `polygon(${points.join(',')})`;
}
export function BeforeAfter(){
 const [active,setActive]=useState(0),[position,setPosition]=useState(50);const entry=results[active];
 const clip=useMemo(()=>makeLiquidPolygon(position),[position]);
 const style=entry.layout==='vertical'?{backgroundImage:`url(${entry.image})`,backgroundSize:'100% 200%'}:{backgroundImage:`url(${entry.image})`,backgroundSize:'200% 100%'};
 const beforePos=entry.layout==='vertical'?'center top':'left center',afterPos=entry.layout==='vertical'?'center bottom':'right center';
 return <section className="results-section" id="resultados"><div className="container"><div className="results-top"><div><span className="eyebrow">IMAGENS REAIS COMPARTILHADAS</span><h2>O detalhe também<br/>conta <em>histórias.</em></h2></div><p>Observe registros de atendimentos compartilhados como referências visuais. Arraste para comparar as fotografias.</p></div><div className="result-tabs" role="tablist" aria-label="Selecionar fotografias">{results.map((r,i)=><button role="tab" aria-selected={active===i} key={r.id} className={active===i?'active':''} onClick={()=>{setActive(i);setPosition(50)}}><span>0{i+1}</span>{r.title}</button>)}</div><div className="comparison-grid"><div className="comparison" style={{touchAction:'pan-y'}} onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId)}} onPointerMove={e=>{if(e.buttons!==1)return;const box=e.currentTarget.getBoundingClientRect();setPosition(Math.max(4,Math.min(96,100*(e.clientX-box.left)/box.width)))}}>
    <div className="compare-picture" style={{...style,backgroundPosition:afterPos}} aria-label="Registro fotográfico da segunda imagem"/>
    <div className="compare-picture before" style={{...style,backgroundPosition:beforePos,clipPath:clip}} aria-label="Registro fotográfico da primeira imagem"/>
    <div className="compare-ribbon" style={{left:`${position}%`}}><div className="compare-handle"><ArrowLeft size={16}/><ArrowRight size={16}/></div></div>
    <span className="compare-tag compare-tag-left">IMAGEM 01</span><span className="compare-tag compare-tag-right">IMAGEM 02</span>
    <label htmlFor="compareRange" className="visually-hidden">Arraste para comparar as imagens</label><input id="compareRange" className="compare-range" type="range" min="4" max="96" value={position} onChange={e=>setPosition(Number(e.target.value))} aria-label="Posição da comparação"/>
   </div><div className="compare-side"><span className="eyebrow">REGISTRO VISUAL / {String(active+1).padStart(2,'0')}</span><h3>{entry.title}</h3><p>{entry.subtitle}. Fotografias e enquadramentos podem apresentar diferenças de iluminação, distância e momento do registro.</p><div className="compare-note"><span>i</span><p>Resultados variam de pessoa para pessoa. A publicação destes registros depende da confirmação da autorização dos pacientes e da conformidade com as regras profissionais aplicáveis. As fotografias não representam promessa de resultado.</p></div><a href="#agendar" className="link-underlined">Converse sobre seu caso <ArrowRight size={19}/></a></div></div></div></section>
}
