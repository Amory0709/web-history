import React,{useEffect} from 'react';
import {EraScene} from './EraScenes';
export const transitions={
 html:['A link needs a language.','The idea takes shape.','<a href="…">'],
 server:['A document becomes a service.','The Web starts answering.','request → response'],
 css:['Content finds its expression.','One document. New possibilities.','color: #0014dc;'],
 javascript:['Appearance becomes behavior.','A click can change something.','addEventListener()'],
 dom:['A page opens from the inside.','Every element becomes reachable.','document → element'],
 ajax:['The page stays. Life moves on.','New data, without starting over.','await fetch()'],
 v8:['Small scripts find a bigger stage.','From the page to the server.','JavaScript → native code'],
 responsive:['The screen changes shape.','The idea still belongs everywhere.','@media (…)'],
 platform:['The browser opens its doors.','A canvas. A conversation. A sound.','<canvas>'],
 frameworks:['A growing app needs a way to belong together.','Small components. One shared state.','UI = f(state)'],
 offline:['A connection is no longer a condition.','Save the moment. Return to it.','network → cache'],
 wasm:['Another language joins the conversation.','Bring an algorithm. Keep the Web.','00 61 73 6d'],
 webgpu:['One operation becomes many.','A wider canvas for computation.','@compute']
};
export function ChapterTransition({to}){
 const [title,subtitle]=transitions[to.id];
 return <div id={'bridge-'+to.id} className={'epoch-transition era-transition chapter-prologue transition-'+to.id} data-transition={to.id} aria-label={'Introducing '+to.nav}><div className="era-intro"><p className="era-opening">{title}</p><p>{subtitle}</p></div><EraScene id={to.id}/></div>
}
const clamp=value=>Math.max(0,Math.min(1,value));
const smooth=value=>value*value*(3-2*value);
export function useScrollStory(motion,onActive){
 useEffect(()=>{
  let frame=0;const root=document.documentElement;
  const chapters=[...document.querySelectorAll('.chapter')];
  const passages=[...document.querySelectorAll('.epoch-transition')];
  const sceneArtwork=new Map(passages.map(p=>[p,p.querySelector('.era-scene-art')]));
  const visible=new Set();
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting)visible.add(entry.target);else visible.delete(entry.target)}schedule()},{rootMargin:'160px 0px'});
  passages.forEach(p=>observer.observe(p));
  function render(){
   frame=0;const vh=window.innerHeight;let current=0;
   const headerBottom=document.querySelector('.site-header').getBoundingClientRect().bottom;
   const readingHeight=Math.max(1,vh-headerBottom);
   chapters.forEach((section,i)=>{
    const bounds=section.getBoundingClientRect();
    if(bounds.top<=vh*.42)current=i;
    if(bounds.top>vh+180||bounds.bottom< -180)return;
    const content=section.querySelector('.chapter-sticky').getBoundingClientRect();
    const enter=motion?smooth(clamp((vh*.9-content.top)/(vh*.62))):1;
    section.style.setProperty('--entry',enter.toFixed(4));
    section.style.setProperty('--entry-shift',`${((1-enter)*62).toFixed(2)}px`);
    section.style.setProperty('--demo-shift',`${((1-enter)*94).toFixed(2)}px`);
    section.style.setProperty('--entry-scale',(0.955+enter*.045).toFixed(4));
    section.style.setProperty('--handoff',i===0?'0':enter.toFixed(4));
    section.style.setProperty('--intro-exit',i===0?'0':smooth(clamp((enter-.42)/.58)).toFixed(4));
    section.style.setProperty('--hero-drift',`${(motion?clamp(-bounds.top/(vh*1.1))*-60:0).toFixed(2)}px`);
   });
   onActive(current);
   for(const passage of visible){
    const rect=passage.getBoundingClientRect();
    const p=clamp((vh*.92-rect.top)/(vh*.92+rect.height*.52));
    const bloom=Math.sin(p*Math.PI);
    // Wait for the illustration itself to enter the reading area. The passage
    // includes its heading and spacing, so its top was starting scenes too early.
    const art=sceneArtwork.get(passage).getBoundingClientRect();
    const start=Math.min(headerBottom+readingHeight*.73,vh-Math.min(art.height/2,readingHeight*.45)-24);
    const distance=Math.max(180,Math.min(340,readingHeight*.38));
    const sceneProgress=smooth(clamp((start-(art.top+art.height/2))/distance));
    passage.style.setProperty('--scene-progress',motion?sceneProgress.toFixed(4):'1');
    passage.style.setProperty('--passage',p.toFixed(4));
    passage.style.setProperty('--bloom',bloom.toFixed(4));
    passage.style.setProperty('--token-x',`${(motion?(p-.5)*-170:0).toFixed(2)}px`);
    passage.style.setProperty('--word-x',`${(motion?(p-.5)*130:0).toFixed(2)}px`);
    passage.style.setProperty('--word-scale',(motion?1.12-p*.18:1).toFixed(4));
    passage.style.setProperty('--from-y',`${(motion?-p*65:0).toFixed(2)}px`);
    passage.style.setProperty('--to-y',`${(motion?(1-p)*75:0).toFixed(2)}px`);
    passage.style.setProperty('--message-y',`${(motion?(1-p)*30:0).toFixed(2)}px`);
    passage.style.setProperty('--reveal',`${(motion?(1-smooth(clamp(p*1.85)))*100:0).toFixed(2)}%`);
   }
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(render)}
  root.dataset.scrollStory='ready';
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);
  const resize=new ResizeObserver(schedule);resize.observe(document.querySelector('main'));
  render();
  return()=>{observer.disconnect();resize.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);delete root.dataset.scrollStory};
 },[motion,onActive]);
}
