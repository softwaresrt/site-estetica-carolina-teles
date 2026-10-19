'use client';
import {useState} from 'react';
import {faqs} from '@/content/site';
import {Plus,Minus} from 'lucide-react';
export function Faq(){const [current,setCurrent]=useState<number|null>(0);return <div className="faqs">{faqs.map((f,i)=><div className="faq-item" key={f.question}><h3><button type="button" aria-expanded={current===i} aria-controls={`faq-${i}`} onClick={()=>setCurrent(current===i?null:i)}><span><small>{String(i+1).padStart(2,'0')}</small>{f.question}</span>{current===i?<Minus size={19}/>:<Plus size={19}/>}</button></h3><div id={`faq-${i}`} className={'faq-answer '+(current===i?'is-open':'')} hidden={current!==i}><p>{f.answer}</p></div></div>)}</div>}
