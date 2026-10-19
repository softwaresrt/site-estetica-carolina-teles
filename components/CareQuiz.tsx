'use client';
import {useMemo,useState} from 'react';
import {ArrowLeft,ArrowRight,Check,RotateCcw} from 'lucide-react';
import {whatsappLink} from '@/lib/whatsapp';
const questions=[
 {title:'O que gostaria de cuidar?',prompt:'Escolha a intenção que mais combina com este momento.',items:['Pele do rosto','Cuidados corporais','Relaxamento e bem-estar','Quero entender minhas opções']},
 {title:'Onde está seu interesse?',prompt:'Você pode escolher uma região para iniciar a conversa.',items:['Rosto','Pescoço e colo','Corpo','Ainda não sei']},
 {title:'Como é sua rotina?',prompt:'Isso ajuda a preparar uma conversa, não substitui uma avaliação.',items:['Gosto de manter uma rotina','Estou recomeçando meus cuidados','Tenho pouco tempo','Prefiro conversar pessoalmente']},
 {title:'Qual estilo de cuidado prefere?',prompt:'A escolha do procedimento depende sempre de avaliação profissional.',items:['Começar de forma simples','Conhecer tecnologias e opções','Uma experiência relaxante','Quero orientação']},
 {title:'Quando gostaria de conversar?',prompt:'Escolha o momento ideal para solicitar uma avaliação.',items:['Ainda nesta semana','Nas próximas semanas','No próximo mês','Sem data definida']},
];
const recommendations:Record<string,string[]>={
 'Pele do rosto':['Avaliação facial individual','Limpeza de pele, se indicada','Conversar sobre microagulhamento'],
 'Cuidados corporais':['Avaliação corporal individual','Conversar sobre drenagem linfática','Conhecer as técnicas disponíveis'],
 'Relaxamento e bem-estar':['Conhecer as massagens oferecidas','Avaliação de preferências e conforto','Planejamento do cuidado'],
 'Quero entender minhas opções':['Avaliação inicial personalizada','Explorar o catálogo de cuidados','Orientações sobre a rotina'],
};
export function CareQuiz(){
 const [step,setStep]=useState(0),[answers,setAnswers]=useState<string[]>([]),[done,setDone]=useState(false);
 const current=questions[step]; const chosen=answers[step];
 const suggested=useMemo(()=>recommendations[answers[0]]??recommendations['Quero entender minhas opções'],[answers]);
 const choose=(value:string)=>setAnswers(prev=>{const next=[...prev];next[step]=value;return next});
 const reset=()=>{setStep(0);setAnswers([]);setDone(false)};
 const summary=`Olá! Fiz a experiência de cuidados no site Carolina Teles e gostaria de solicitar uma avaliação.\n\n${questions.map((q,i)=>`${q.title}: ${answers[i]||'Não informado'}`).join('\n')}\n\nGostaria de conversar sobre possibilidades adequadas ao meu caso.`;
 return <section className="quiz-section" id="plano"><div className="container quiz-layout"><div className="quiz-intro"><span className="eyebrow">EXPERIÊNCIA INTERATIVA / 02</span><h2>O cuidado<br/>começa em<br/><em>você.</em></h2><p>Um percurso em cinco escolhas para transformar sua curiosidade em uma conversa mais direcionada com a clínica.</p><div className="pearl-scene" aria-hidden="true"><span className={'pearl pearl-'+step}/><span className="pearl-ring"/><span className="pearl-caption">CADA ESCOLHA É ÚNICA</span></div></div><div className="quiz-card"><div className="quiz-meta"><span>SEU CAMINHO DE CUIDADO</span><span>{done?'CONCLUÍDO':`${String(step+1).padStart(2,'0')} / 05`}</span></div><div className="progress-steps" aria-hidden="true">{questions.map((q,i)=><span key={q.title} className={i<=step||done?'active':''}/>)}</div>{!done?<><span className="quiz-number">0{step+1}</span><h3>{current.title}</h3><p>{current.prompt}</p><div className="quiz-options">{current.items.map(option=><button type="button" key={option} className={chosen===option?'picked':''} onClick={()=>choose(option)} aria-pressed={chosen===option}>{option}<span>{chosen===option?<Check size={18}/>:<ArrowRight size={18}/>}</span></button>)}</div><div className="quiz-controls"><button type="button" onClick={()=>setStep(s=>Math.max(0,s-1))} disabled={step===0}><ArrowLeft size={18}/> Voltar</button><button type="button" className="quiz-next" disabled={!chosen} onClick={()=>{if(step===4)setDone(true);else setStep(s=>s+1)}}>{step===4?'Ver meu resumo':'Continuar'}<ArrowRight size={18}/></button></div></>:<div className="quiz-complete"><span className="quiz-check"><Check size={27}/></span><h3>Sua conversa começa aqui.</h3><p>Com base nas suas escolhas, estes são assuntos que você pode explorar em uma avaliação profissional:</p><div className="suggested-list">{suggested.map((s,i)=><div key={s}><span>0{i+1}</span>{s}</div>)}</div><small>Orientações iniciais, sem diagnóstico ou indicação automática. A definição de procedimentos, contraindicações e conduta pertence exclusivamente à profissional habilitada.</small><a href={whatsappLink(summary)} target="_blank" rel="noopener noreferrer" className="primary-button dark-button">Enviar resumo pelo WhatsApp <ArrowRight size={18}/></a><button type="button" className="restart" onClick={reset}><RotateCcw size={15}/> Refazer percurso</button></div>}</div></div></section>;
}
