'use client';
import {useState} from 'react';
import {ArrowRight,CheckCircle2} from 'lucide-react';
import {site,treatments} from '@/content/site';
import {whatsappLink} from '@/lib/whatsapp';
export function AppointmentForm(){
 const [name,setName]=useState(''),[service,setService]=useState('Avaliação inicial'),[period,setPeriod]=useState('A combinar'),[consent,setConsent]=useState(false),[error,setError]=useState('');
 const submit=(e:React.FormEvent)=>{
  e.preventDefault();if(name.trim().length<2){setError('Informe seu nome para continuar.');return}if(!consent){setError('Confirme a autorização para compartilhar estas informações pelo WhatsApp.');return}
  setError('');const url=whatsappLink(`Olá! Gostaria de solicitar uma avaliação na ${site.fullName}.\nNome: ${name.trim()}\nInteresse: ${service}\nPeríodo de preferência: ${period}\nAguardo a confirmação de disponibilidade. Obrigada!`);
  window.open(url,'_blank','noopener,noreferrer');
 };
 return <form onSubmit={submit} className="appointment-form" noValidate><div className="form-caption"><span className="eyebrow">SOLICITAÇÃO DE AVALIAÇÃO</span><span>01 — 03</span></div><h3>Comece com uma conversa.</h3><p>Preencha as preferências e abra a mensagem pronta no WhatsApp. O horário será confirmado pela equipe.</p><label htmlFor="contact-name">Como podemos chamar você?</label><input id="contact-name" autoComplete="name" placeholder="Seu primeiro nome" value={name} onChange={e=>setName(e.target.value)} required maxLength={80}/><div className="form-two"><div><label htmlFor="contact-service">O que gostaria de conhecer?</label><select value={service} onChange={e=>setService(e.target.value)} id="contact-service"><option>Avaliação inicial</option>{treatments.map(t=><option key={t.slug}>{t.title}</option>)}</select></div><div><label htmlFor="contact-period">Quando prefere conversar?</label><select id="contact-period" value={period} onChange={e=>setPeriod(e.target.value)}><option>A combinar</option><option>Manhã</option><option>Tarde</option><option>Próximos dias</option></select></div></div><label className="consent"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)}/><span>Autorizo a abertura de uma mensagem no WhatsApp com os dados informados para solicitar contato. <a href="/politica-de-privacidade">Política de privacidade</a>.</span></label>{error&&<p className="form-error" role="alert">{error}</p>}<button type="submit" className="primary-button dark-button">Continuar no WhatsApp <ArrowRight size={18}/></button><div className="form-assurance"><CheckCircle2 size={17}/><span>Sem agendamento fictício. A confirmação acontece por mensagem com a equipe.</span></div></form>;
}
