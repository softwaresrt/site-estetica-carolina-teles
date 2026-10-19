import type {Metadata,Viewport} from 'next';
import './globals.css';
import {site} from '@/content/site';
import {Header} from '@/components/Header';
import {Footer} from '@/components/Footer';
import {WhatsAppFloatingButton} from '@/components/WhatsAppFloatingButton';
import {MotionProvider} from '@/components/MotionProvider';
import {Preloader} from '@/components/Preloader';
export const metadata:Metadata={
 title:{default:`${site.fullName} | Jaboatão dos Guararapes`,template:`%s | ${site.name}`},
 description:'Cuidado estético individualizado e uma experiência de acolhimento em Jaboatão dos Guararapes, Pernambuco. Solicite sua avaliação com Carolina Teles.',
 openGraph:{title:site.fullName,description:'Cuidado que respeita a sua individualidade.',locale:'pt_BR',type:'website',images:[{url:'/media/carolina-retrato.jpg',width:1440,height:1920}]},
 robots:{index:true,follow:true}
};
export const viewport:Viewport={width:'device-width',initialScale:1,themeColor:'#211c1b'};
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="pt-BR"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500;600;700&display=swap" rel="stylesheet"/></head><body><a className="skip-link" href="#conteudo">Ir para o conteúdo</a><MotionProvider><Preloader/><Header/><main id="conteudo">{children}</main><Footer/><WhatsAppFloatingButton/></MotionProvider></body></html>
}
