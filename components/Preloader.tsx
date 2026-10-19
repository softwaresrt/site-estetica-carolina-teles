'use client';
import {useEffect,useState} from 'react';
export function Preloader(){
 const [visible,setVisible]=useState(true);
 useEffect(()=>{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setVisible(false);return}const t=window.setTimeout(()=>setVisible(false),900);return()=>clearTimeout(t)},[]);
 if(!visible)return null;
 return <div className="preloader" aria-hidden="true"><div className="preloader-drop"><span>CT.</span></div><p>CAROLINA TELES</p></div>;
}
