import React, {useState} from 'react';
import { createRoot } from 'react-dom/client';
import {Activity, Bell, ChevronRight, CircleHelp, Dumbbell, Flame, Gem, Menu, Play, Plus, ShieldCheck, Sparkles, Target, Timer, Trophy, Users, X, Zap} from 'lucide-react';
import './styles.css';

const workouts = [
  {name:'Upper body: força', detail:'Peito · Costas · Braços', time:'42 min', level:'NÍVEL 03', color:'violet', icon:Dumbbell},
  {name:'Cardio da masmorra', detail:'Resistência · HIIT', time:'18 min', level:'NÍVEL 01', color:'cyan', icon:Flame},
  {name:'Mobilidade do caçador', detail:'Corpo inteiro · Recuperação', time:'15 min', level:'NÍVEL 01', color:'amber', icon:Activity},
];
function App(){
 const [mobileMenu,setMobileMenu]=useState(false),[notification,setNotification]=useState(false),[mission,setMission]=useState(false),[active,setActive]=useState('Início');
 const startMission=()=>{setMission(true); setTimeout(()=>setMission(false),3200)};
 return <main>
  <div className="ambient a1"/><div className="ambient a2"/>
  <header className="topbar">
   <a className="brand" href="#top" aria-label="Ascend Fit início"><span className="brand-mark"><Zap size={18} fill="currentColor"/></span><span>ASCEND<span>FIT</span></span></a>
   <nav>{['Início','Treinos','Progresso','Comunidade'].map(i=><button key={i} className={active===i?'active':''} onClick={()=>setActive(i)}>{i}</button>)}</nav>
   <div className="header-actions"><button className="icon-button" onClick={()=>setNotification(!notification)} aria-label="Notificações"><Bell size={19}/><i/></button><button className="avatar" aria-label="Perfil">L</button><button className="menu-button" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button></div>
   {notification&&<div className="notification"><strong>Missão disponível</strong><br/>Complete seu treino de hoje e receba +180 XP.</div>}
  </header>
  {mobileMenu&&<div className="mobile-nav">{['Início','Treinos','Progresso','Comunidade'].map(i=><button key={i} onClick={()=>{setActive(i);setMobileMenu(false)}}>{i}</button>)}</div>}
  <section className="hero" id="top">
   <div className="hero-copy"><p className="eyebrow"><span/>SISTEMA ONLINE</p><h1>Seu próximo nível<br/>começa <em>agora.</em></h1><p className="intro">Treinos inteligentes, metas reais e uma jornada feita para você evoluir — uma repetição por vez.</p><div className="hero-actions"><button className="primary" onClick={startMission}>INICIAR MISSÃO <ChevronRight size={17}/></button><button className="text-button" onClick={()=>document.querySelector('#treinos').scrollIntoView({behavior:'smooth'})}>ver treinos <span>↓</span></button></div></div>
   <div className="hero-visual" aria-label="Painel de evolução"><div className="arc arc1"/><div className="arc arc2"/><div className="hero-orb"><span>LVL</span><b>12</b><small>CAÇADOR</small></div><div className="floating-card fc1"><Sparkles size={15}/><span>+180 XP</span><small>missão diária</small></div><div className="floating-card fc2"><Trophy size={15}/><span>RANK E</span><small>em evolução</small></div><div className="silhouette"><span className="head"/><span className="body"/><span className="arm left"/><span className="arm right"/><span className="leg left"/><span className="leg right"/></div></div>
  </section>
  <section className="stats"><div><b>12</b><span>Nível atual</span></div><div><b>2.840</b><span>XP acumulado</span></div><div><b>07</b><span>Dias de sequência</span></div><div><b>RANK E</b><span>Classificação</span></div></section>
  <section className="content" id="treinos">
   <div className="section-heading"><div><p className="eyebrow"><span/>MISSÃO DO DIA</p><h2>O sistema preparou<br/>isso para você.</h2></div><button className="link-button" onClick={()=>setActive('Treinos')}>ver todos <ChevronRight size={17}/></button></div>
   <div className="mission-card"><div className="mission-glow"/><div className="mission-icon"><Dumbbell size={25}/></div><div className="mission-info"><p className="mission-label">MISSÃO PRINCIPAL</p><h3>Força total — semana 2</h3><p>Desenvolva sua força com um plano feito para o seu nível.</p><div className="tags"><span><Timer size={14}/> 38 min</span><span><Flame size={14}/> 420 kcal</span><span><Target size={14}/> 6 exercícios</span></div></div><div className="mission-xp"><small>RECOMPENSA</small><b>+180 <em>XP</em></b><button onClick={startMission}><Play size={17} fill="currentColor"/> começar</button></div></div>
   <div className="progress-grid"><article className="level-card"><div className="card-top"><span>NÍVEL DO CAÇADOR</span><ShieldCheck size={20}/></div><div className="level-row"><b>12</b><div><strong>Você está mais forte.</strong><p>Faltam 160 XP para o nível 13</p><div className="progress"><i style={{width:'68%'}}/></div></div></div></article><article className="streak-card"><div><p>SEQUÊNCIA ATUAL</p><b>07 <small>dias</small></b><span>Seu melhor: 12 dias</span></div><div className="flame"><Flame size={40} fill="currentColor"/></div></article></div>
   <div className="section-heading compact"><div><p className="eyebrow"><span/>ESCOLHA SUA JORNADA</p><h2>Treinos disponíveis.</h2></div><button className="round-button" aria-label="Adicionar treino"><Plus size={19}/></button></div>
   <div className="workouts">{workouts.map(({name,detail,time,level,color,icon:Icon})=><article className={'workout '+color} key={name}><div className="workout-icon"><Icon size={23}/></div><span>{level}</span><h3>{name}</h3><p>{detail}</p><footer><span><Timer size={14}/>{time}</span><button onClick={startMission} aria-label={'Começar '+name}><ChevronRight size={18}/></button></footer></article>)}</div>
  </section>
  <section className="cta"><div><p className="eyebrow"><span/>SEM LIMITES</p><h2>O seu corpo é<br/>o seu <em>portal.</em></h2></div><button className="primary" onClick={startMission}>COMEÇAR AGORA <ChevronRight size={17}/></button></section>
  <footer className="footer"><a className="brand" href="#top"><span className="brand-mark"><Zap size={15} fill="currentColor"/></span>ASCEND<span>FIT</span></a><p>Treine. Evolua. Domine seu próximo nível.</p><div><button aria-label="Ajuda"><CircleHelp size={18}/></button><button aria-label="Comunidade"><Users size={18}/></button></div></footer>
  {mission&&<div className="toast"><Gem size={19}/><div><b>MISSÃO INICIADA</b><span>Seu progresso será sincronizado.</span></div></div>}
 </main>
}
createRoot(document.getElementById('root')).render(<App/>);
