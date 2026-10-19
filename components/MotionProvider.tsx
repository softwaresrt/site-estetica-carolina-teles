'use client';
import {useEffect} from 'react';
import Lenis from 'lenis';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
export function MotionProvider({children}:{children:React.ReactNode}){
 useEffect(()=>{
   if(window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(pointer: coarse)').matches) return;
   gsap.registerPlugin(ScrollTrigger);
   const lenis=new Lenis({autoRaf:false, smoothWheel:true, lerp:0.085});
   const scroll=()=>ScrollTrigger.update();
   lenis.on('scroll',scroll);
   const tick=(time:number)=>lenis.raf(time*1000);
   gsap.ticker.add(tick);
   gsap.ticker.lagSmoothing(0);
   requestAnimationFrame(()=>ScrollTrigger.refresh());
   return ()=>{gsap.ticker.remove(tick);lenis.off('scroll',scroll);lenis.destroy();};
 },[]);
 return <>{children}</>;
}
