import {TreatmentGrid} from '@/components/TreatmentGrid';
import {whatsappLink} from '@/lib/whatsapp';
import type {Metadata} from 'next';
export const metadata:Metadata={title:'Tratamentos e cuidados',description:'Explore cuidados estéticos e solicite uma avaliação individual.'};
export default function TreatmentsPage(){return <div className="inner-page treatment-list-page"><div className="container"><span className="eyebrow eyebrow-light">CONHEÇA AS POSSIBILIDADES</span><h1>Cuidados para<br/><em>cada história.</em></h1><p>Escolha um tema para conhecer melhor e converse sobre a indicação na sua avaliação presencial.</p><TreatmentGrid full/><a href={whatsappLink()} className="primary-button light-button" target="_blank" rel="noopener noreferrer">Agendar avaliação ↗</a></div></div>}
