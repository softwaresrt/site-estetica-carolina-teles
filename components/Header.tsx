'use client';
import Link from 'next/link';
import {AnimatePresence,motion} from 'motion/react';
import {useEffect,useState} from 'react';
import {Menu,X,ArrowUpRight} from 'lucide-react';
import {whatsappLink} from '@/lib/whatsapp';
import {site} from '@/content/site';
const links=[['O conceito','/#conceito'],['Tratamentos','/#tratamentos'],['Experiência','/#experiencia'],['Sobre','/#profissional'],['Contato','/#contato']];
export function Header(){
 const [open,setOpen]=useState(false);const [scrolled,setScrolled]=useState(false);
 useEffect(()=>{const sync=()=>setScrolled(window.scrollY>35);sync();window.addEventListener('scroll',sync,{passive:true});return()=>window.removeEventListener('scroll',sync)},[]);
 useEffect(()=>{document.body.style.overflow=open?'hidden':'';return()=>{document.body.style.overflow='';}},[open]);
 return <header className={'site-header '+(scrolled?'header-scrolled':'')}>
  <Link href="/" className="site-logo" onClick={()=>setOpen(false)} aria-label="Página inicial Carolina Teles"><span className="logo-symbol">CT<span>.</span></span><span className="logo-copy">CAROLINA TELES<small>ESTÉTICA AVANÇADA & SAÚDE</small></span></Link>
  <nav className="desktop-nav" aria-label="Menu principal">{links.map(([name,url])=><Link href={url} key={name}>{name}</Link>)}</nav>
  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="header-appointment">Solicitar avaliação <ArrowUpRight size={16}/></a>
  <button className="menu-toggle" onClick={()=>setOpen(!open)} aria-label={open?'Fechar menu':'Abrir menu'} aria-expanded={open}>{open?<X size={25}/>:<Menu size={25}/>}</button>
  <AnimatePresence>{open&&<motion.div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu de navegação" initial={{opacity:0,y:-18}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-14}} transition={{duration:.24}}><p className="eyebrow">A EXPERIÊNCIA CAROLINA TELES</p>{links.map(([name,url],i)=><Link key={name} href={url} onClick={()=>setOpen(false)}><span>0{i+1}</span>{name}<ArrowUpRight size={22}/></Link>)}<a className="mobile-menu-cta" href={whatsappLink()} onClick={()=>setOpen(false)} target="_blank" rel="noopener noreferrer">Solicitar avaliação ↗</a><p>{site.city} · Pernambuco</p></motion.div>}</AnimatePresence>
 </header>
}
