'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function Reveal({ children, className='', delay=0 }: {children:React.ReactNode; className?:string; delay?:number}) {
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    if(!ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx=gsap.context(()=>{
      gsap.fromTo(ref.current,{autoAlpha:0,y:44},{autoAlpha:1,y:0,duration:1,delay,ease:'power3.out',scrollTrigger:{trigger:ref.current,start:'top 91%',once:true}});
    },ref);
    return ()=>ctx.revert();
  },[delay]);
  return <div ref={ref} className={className}>{children}</div>;
}
