import React,{useEffect,useRef,useState} from 'react';
import {createPaperScene} from './paper-renderer';
import './paper-scene.css';

// Complete, independently bent sheets. The old illustration is only a static
// fallback, never sliced or animated. No continuous loop runs while idle.
export function PaperScene({motion}){
 const host=useRef(null),canvas=useRef(null),[ready,setReady]=useState(false);
 useEffect(()=>{
  let scene,frame=0,visible=true,disposed=false,lastPaint=0;
  try{scene=createPaperScene(canvas.current);setReady(true)}catch(error){console.warn("Paper scene fallback:",error.message);setReady(false);return}
  function draw(now){frame=0;if(!visible||disposed)return;if(now-lastPaint<32){schedule();return}lastPaint=now;const rect=host.current.getBoundingClientRect();
   const departureLine=Math.min(innerHeight*.55,rect.top+scrollY-80);
   const progress=motion?Math.max(0,Math.min(1,(departureLine-rect.top)/Math.max(350,rect.height*.95))):0;
   scene.render(progress);host.current.dataset.paperProgress=progress.toFixed(3);
  }
  function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(draw)}
  const resize=new ResizeObserver(schedule);resize.observe(host.current);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule()},{rootMargin:'200px'});intersection.observe(host.current);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);schedule();
  return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();intersection.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);scene.dispose()};
 },[motion]);
 return <div ref={host} className={'hero-art paper-scene '+(ready?'paper-scene-ready':'')} role="img" aria-label="Three complete paper documents, gently curved in space. As you scroll, their links fade and the sheets lift and drift apart.">
  {!ready&&<img className="paper-scene-fallback" src="/assets/connected-documents.png" alt=""/>}
  <canvas ref={canvas} aria-hidden="true"/>
 </div>;
}
