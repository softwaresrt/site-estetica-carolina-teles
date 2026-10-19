import Link from 'next/link';
export default function NotFound(){return <div className="inner-page not-found-page"><div className="container"><span className="eyebrow eyebrow-light">PÁGINA NÃO ENCONTRADA</span><h1>404<span>.</span></h1><p>O endereço que você procura não existe.</p><Link href="/" className="primary-button light-button">Voltar para o início ↗</Link></div></div>}
