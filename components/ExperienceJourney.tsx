'use client';
import {useEffect,useRef,useState} from 'react';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ArrowRight} from 'lucide-react';
const scenes=[{number:'01',title:'Você chega.',label:'ACOLHIMENTO',body:'O primeiro passo é se sentir à vontade para conversar sobre o que procura.'},{number:'02',title:'A gente escuta.',label:'AVALIAÇÃO',body:'História, expectativas e necessidades são consideradas com atenção individual.'},{number:'03',title:'O cuidado ganha forma.',label:'PLANEJAMENTO',body:'Possibilidades e cuidados são explicados com transparência, respeitando a avaliação profissional.'},{number:'04',title:'Seguimos junto.',label:'ACOMPANHAMENTO',body:'Orientações e próximos passos são alinhados de acordo com cada atendimento.'}];
export function ExperienceJourney(){
 const root=useRef<HTMLElement>(null),track=useRef<HTMLDivElement>(null);const [active,setActive]=useState(0);
 useEffect(()=>{
  if(!root.current||!track.current||window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth<900)return;
  gsap.registerPlugin(ScrollTrigger);
  const ctx=gsap.context(()=>{
   gsap.to(track.current,{xPercent:-75,ease:'none',scrollTrigger:{trigger:root.current,start:'top top',end:'+=2050',pin:true,scrub:1.3,anticipatePin:1,onUpdate:self=>setActive(Math.min(3,Math.floor(self.progress*4)))}})
  },root);
  return()=>ctx.revert();
 },[]);
 return <section ref={root} className="journey-section" id="experiencia"><div className="journey-head container"><div><p className="eyebrow eyebrow-light">CADA ETAPA TEM SEU VALOR</p><h2>Uma experiência de<br/><em>ponta a ponta.</em></h2></div><div className="journey-counter"><span>0{active+1}</span><span>/ 04</span></div></div><div className="journey-window"><div className="journey-track" ref={track}>{scenes.map((s,i)=><article className={'journey-card journey-card-'+i} key={s.number}><div className="journey-visual"><span className="journey-frame frame-one"/><span className="journey-frame frame-two"/><span className="journey-glow"/><span className="journey-big-digit">{s.number}</span></div><div className="journey-content"><p className="eyebrow eyebrow-light">{s.label}</p><h3>{s.title}</h3><p>{s.body}</p><ArrowRight size={26}/></div></article>)}</div></div><div className="container journey-foot"><p>REPRESENTAÇÃO CONCEITUAL DAS ETAPAS DO ATENDIMENTO — NÃO É UMA VISUALIZAÇÃO DA ESTRUTURA FÍSICA DA CLÍNICA.</p><span>DESLIZE PARA EXPLORAR <ArrowRight size={19}/></span></div></section>;
}
