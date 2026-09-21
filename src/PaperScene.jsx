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
   const travel=Math.max(350,rect.height*.95);
   const progress=motion?Math.max(0,Math.min(1,(departureLine-rect.top)/travel)):0;
   // Follow the scroll briefly so the descending sheets do not appear to fly up
   // with the document. The host stays in normal flow and determines progress.
   canvas.current.style.transform=`translateY(${(progress*travel*1.1).toFixed(2)}px)`;
   scene.render(progress);host.current.dataset.paperProgress=progress.toFixed(3);
  }
  function schedule(){if(!frame&&!disposed)frame=requestAnimationFrame(draw)}
  const resize=new ResizeObserver(schedule);resize.observe(host.current);
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule()},{rootMargin:'200px'});intersection.observe(host.current);
  window.addEventListener('scroll',schedule,{passive:true});window.addEventListener('resize',schedule);schedule();
  return()=>{disposed=true;cancelAnimationFrame(frame);resize.disconnect();intersection.disconnect();window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);scene.dispose()};
 },[motion]);
 return <div ref={host} className={'hero-art paper-scene '+(ready?'paper-scene-ready':'')} role="img" aria-label="Three complete paper documents, gently curved in space. As you scroll, their links fade and the sheets flutter downward and out to the sides.">
  {!ready&&<img className="paper-scene-fallback" src="/assets/connected-documents.png" alt=""/>}
  <canvas ref={canvas} aria-hidden="true"/>
 </div>;
}
