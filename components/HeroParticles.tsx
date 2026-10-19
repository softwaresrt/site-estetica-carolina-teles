'use client';
import {useEffect,useRef} from 'react';
/** Pixel-informed, pointer-reactive portrait point field; all processing is local. */
type Particle={x:number;y:number;ox:number;oy:number;tx:number;ty:number;r:number;a:number;rgb:string};
export function HeroParticles(){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{
  const canvas=canvasRef.current,container=canvas?.parentElement;
  if(!canvas||!container||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)return;
  let width=0,height=0,dpr=1,raf=0,particles:Particle[]=[],visible=true,morph=0;
  let pointer={x:-999,y:-999};
  const photograph=new Image();photograph.src='/media/carolina-retrato.jpg';
  function makeParticles(){
    if(!ctx||!container||!photograph.complete||!photograph.naturalWidth)return;
    const buffer=document.createElement('canvas');buffer.width=Math.max(1,Math.floor(width));buffer.height=Math.max(1,Math.floor(height));
    const g=buffer.getContext('2d',{willReadFrequently:true});if(!g)return;
    const factor=Math.max(width/photograph.naturalWidth,height/photograph.naturalHeight),dw=photograph.naturalWidth*factor,dh=photograph.naturalHeight*factor;
    g.drawImage(photograph,(width-dw)*.5,(height-dh)*.16,dw,dh);
    const data=g.getImageData(0,0,buffer.width,buffer.height).data;
    const points:Particle[]=[];
    const step=width<500?18:13;
    for(let y=3;y<height;y+=step){for(let x=3;x<width;x+=step){
      const px=Math.min(buffer.width-1,Math.floor(x)),py=Math.min(buffer.height-1,Math.floor(y)),i=(py*buffer.width+px)*4;
      const r=data[i],gr=data[i+1],b=data[i+2],lum=(r*.21+gr*.72+b*.07)/255;
      if(lum<.16||Math.random()>.78)continue;
      const alpha=Math.min(.72,Math.max(.1,lum*.75));
      points.push({x,y,ox:x,oy:y,tx:x,ty:y,r:.42+lum*1.15,a:alpha,rgb:`${r},${gr},${b}`});
    }}
    // Reassemble as a CT monogram as the user leaves the first section.
    const txt=document.createElement('canvas');txt.width=buffer.width;txt.height=buffer.height;
    const t=txt.getContext('2d',{willReadFrequently:true});if(t){
      t.font=`600 ${Math.min(width*.55,380)}px Georgia`;t.textAlign='center';t.textBaseline='middle';t.fillStyle='#fff';t.fillText('CT.',width*.5,height*.49);
      const pixels=t.getImageData(0,0,txt.width,txt.height).data;
      const targets:{x:number;y:number}[]=[];
      for(let y=0;y<height;y+=7)for(let x=0;x<width;x+=7)if(pixels[(Math.floor(y)*txt.width+Math.floor(x))*4+3]>128)targets.push({x,y});
      for(let j=0;j<points.length&&targets.length;j++){const item=targets[(j*17)%targets.length];points[j].tx=item.x;points[j].ty=item.y;}
    }
    particles=points;
  }
  function resize(){if(!canvas||!container||!ctx)return;width=container.clientWidth;height=container.clientHeight;dpr=Math.min(window.devicePixelRatio||1,1.4);canvas.width=width*dpr;canvas.height=height*dpr;canvas.style.width=width+'px';canvas.style.height=height+'px';ctx.setTransform(dpr,0,0,dpr,0,0);makeParticles()}
  const pointerMove=(e:PointerEvent)=>{if(!canvas)return;const r=canvas.getBoundingClientRect();pointer.x=e.clientX-r.left;pointer.y=e.clientY-r.top};
  const pointerOut=()=>pointer={x:-999,y:-999};
  const scroll=()=>{if(!container)return;const box=container.getBoundingClientRect();morph=Math.max(0,Math.min(1,(-box.top/window.innerHeight-.32)*1.7))};
  const observer=new IntersectionObserver(([e])=>{visible=e.isIntersecting;if(!visible&&ctx)ctx.clearRect(0,0,width,height)},{threshold:0});
  const loop=()=>{if(ctx&&visible){ctx.clearRect(0,0,width,height);for(const p of particles){
    const targetX=p.ox+(p.tx-p.ox)*morph,targetY=p.oy+(p.ty-p.oy)*morph;
    const dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy);
    if(d<95&&d>.1){const repulsion=(95-d)/95;p.x+=dx/d*repulsion*4;p.y+=dy/d*repulsion*4;}
    p.x+=(targetX-p.x)*.065;p.y+=(targetY-p.y)*.065;
    ctx.fillStyle=`rgba(${p.rgb},${p.a})`;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fill();
   }}raf=requestAnimationFrame(loop)};
  photograph.onload=makeParticles;
  resize();scroll();observer.observe(container);loop();window.addEventListener('resize',resize);window.addEventListener('scroll',scroll,{passive:true});container.addEventListener('pointermove',pointerMove);container.addEventListener('pointerleave',pointerOut);
  return()=>{cancelAnimationFrame(raf);observer.disconnect();window.removeEventListener('resize',resize);window.removeEventListener('scroll',scroll);container.removeEventListener('pointermove',pointerMove);container.removeEventListener('pointerleave',pointerOut);photograph.onload=null};
 },[]);
 return <canvas className="hero-particles" ref={canvasRef} aria-hidden="true"/>;
}
