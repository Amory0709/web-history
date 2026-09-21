import React,{useEffect,useRef,useState} from 'react';
import './terrain-scene.css';

const clamp=v=>Math.max(0,Math.min(1,v));
const ease=v=>{const p=clamp(v);return p*p*(3-2*p)};
// An illustrative height field: two ridges, a valley, and small undulations.
const height=(x,z)=>.10+.58*Math.exp(-((x+.36)**2/.26+(z-.1)**2/.8))
 +.38*Math.exp(-((x-.48)**2/.22+(z+.35)**2/.4))
 -.18*Math.exp(-((z-.28*Math.sin(x*3))**2)/.055)+.055*Math.sin(x*5+z*3);

export function TerrainScene(){
 const canvas=useRef(null),[ready,setReady]=useState(false);
 useEffect(()=>{
  const element=canvas.current,context=element.getContext('2d');
  if(!context)return;
  const scene=element.closest('.era-scene'),passage=element.closest('.chapter-prologue');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let frame=0,visible=false,disposed=false,progress=null,tiltX=0,tiltY=0;
  let pointerX=0,pointerY=0,lastTime=0;
  const n=24;
  function schedule(){if(!frame&&visible&&!disposed)frame=requestAnimationFrame(draw)}
  function draw(now){
   frame=0;if(disposed||!visible)return;
   const target=clamp(parseFloat(getComputedStyle(scene).getPropertyValue('--scene-progress'))||0);
   const blend=reduced.matches?1:1-Math.exp(-Math.min(64,now-lastTime||16)/65);lastTime=now;
   progress=progress===null||reduced.matches?target:progress+(target-progress)*blend;
   tiltX+=(pointerX-tiltX)*blend;tiltY+=(pointerY-tiltY)*blend;
   const bounds=element.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
   const w=Math.max(1,Math.round(bounds.width*dpr)),h=Math.max(1,Math.round(bounds.height*dpr));
   if(element.width!==w||element.height!==h){element.width=w;element.height=h}
   context.setTransform(w/320,0,0,h/220,0,0);context.clearRect(0,0,320,220);
   const relief=ease((progress-.08)/.7),separate=ease((progress-.36)/.64);
   const yaw=-.62+progress*.23+tiltX*.1,pitch=.58+progress*.08+tiltY*.05;
   const cy=Math.cos(yaw),sy=Math.sin(yaw),cp=Math.cos(pitch),sp=Math.sin(pitch);
   function project(x,y,z){
    const across=x*cy-z*sy,back=x*sy+z*cy,up=y*cp-back*sp;
    const depth=y*sp+back*cp,perspective=4.8/(4.8-depth*.38);
    return [160+across*92*perspective,97-up*92*perspective,depth];
   }
   function point(x,z,layer){
    const y=height(x,z)*relief*(1-layer*.16)-layer*(.07+.22*separate);
    return project(x,y,z);
   }
   function path(points,close=false){context.beginPath();points.forEach((p,i)=>i?context.lineTo(p[0],p[1]):context.moveTo(p[0],p[1]));if(close)context.closePath()}
   function line(points,color,width=1){path(points);context.strokeStyle=color;context.lineWidth=width;context.stroke()}
   // Soft ground shadow, then back-to-front surfaces in a shared 3D projection.
   const shadow=context.createRadialGradient(160,171,5,160,171,108);
   shadow.addColorStop(0,'rgba(40,65,145,.10)');shadow.addColorStop(1,'rgba(40,65,145,0)');
   context.save();context.translate(0,82);context.scale(1,.52);context.fillStyle=shadow;context.fillRect(35,55,250,250);context.restore();
   for(let layer=2;layer>=0;layer--){
    const alpha=layer===0?1:separate*.75;if(alpha<.005)continue;
    context.globalAlpha=alpha;
    const cells=[];
    for(let j=0;j<n;j++)for(let i=0;i<n;i++){
     const x=-1+2*i/n,z=-1+2*j/n;
     const points=[point(x,z,layer),point(x+2/n,z,layer),point(x+2/n,z+2/n,layer),point(x,z+2/n,layer)];
     cells.push({points,depth:points.reduce((s,p)=>s+p[2],0)/4,shade:height(x,z)});
    }
    cells.sort((a,b)=>a.depth-b.depth);
    for(const cell of cells){
     path(cell.points,true);
     const light=clamp(.55+cell.shade*.55);
     context.fillStyle=layer===0?`rgba(${Math.round(234-light*15)},${Math.round(242-light*10)},255,.91)`:'rgba(231,239,255,.64)';
     context.fill();
    }
    // The wireframe follows the actual height field, rather than drawn curves.
    for(let i=0;i<=n;i++){
     const row=[],column=[],u=-1+2*i/n;
     for(let j=0;j<=n;j++){const v=-1+2*j/n;row.push(point(u,v,layer));column.push(point(v,u,layer))}
     line(row,layer?'rgba(100,134,211,.34)':'rgba(24,64,209,.46)',layer?.4:.55);
     line(column,layer?'rgba(100,134,211,.28)':'rgba(35,74,212,.36)',layer?.4:.5);
    }
    const rim=[];
    for(let i=0;i<=n;i++)rim.push(point(-1+2*i/n,-1,layer));
    for(let i=1;i<=n;i++)rim.push(point(1,-1+2*i/n,layer));
    for(let i=n-1;i>=0;i--)rim.push(point(-1+2*i/n,1,layer));
    for(let i=n-1;i>=0;i--)rim.push(point(-1,-1+2*i/n,layer));
    rim.push(rim[0]);line(rim,layer?'rgba(74,111,202,.48)':'rgba(0,40,197,.74)',.85);
   }
   context.globalAlpha=1;
   // A scan crosses the surface as height and depth are revealed.
   const scan=-1+2*progress,scanLine=[];
   for(let i=0;i<=48;i++)scanLine.push(point(scan,-1+2*i/48,0));
   context.save();context.shadowColor='rgba(0,56,255,.35)';context.shadowBlur=7;
   line(scanLine,'rgba(0,40,235,.90)',1.4);context.restore();
   for(const [x,z] of [[-.42,.05],[.43,-.32],[.1,.65]]){
    const p=point(x,z,0);context.beginPath();context.arc(p[0],p[1],1.8,0,Math.PI*2);
    context.fillStyle='#173ce2';context.fill();
   }
   if(separate>.02){
    context.save();context.setLineDash([2,3]);
    for(const [x,z] of [[-1,-1],[1,1]])line([point(x,z,0),point(x,z,2)],`rgba(95,124,193,${separate*.5})`,.6);
    context.restore();
   }
   setReady(true);
   if(Math.abs(progress-target)>.001||Math.abs(tiltX-pointerX)>.001||Math.abs(tiltY-pointerY)>.001)schedule();
  }
  function move(event){if(event.pointerType!=='mouse'||reduced.matches)return;const r=element.getBoundingClientRect();pointerX=(event.clientX-r.left)/r.width-.5;pointerY=(event.clientY-r.top)/r.height-.5;schedule()}
  function leave(){pointerX=pointerY=0;schedule()}
  const intersection=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0}},{rootMargin:'120px'});intersection.observe(element);
  const mutation=new MutationObserver(schedule);mutation.observe(passage,{attributes:true,attributeFilter:['style']});mutation.observe(scene,{attributes:true,attributeFilter:['style']});
  const resize=new ResizeObserver(schedule);resize.observe(element);
  element.addEventListener('pointermove',move);element.addEventListener('pointerleave',leave);
  window.addEventListener('resize',schedule);reduced.addEventListener('change',schedule);
  return()=>{disposed=true;cancelAnimationFrame(frame);intersection.disconnect();mutation.disconnect();resize.disconnect();element.removeEventListener('pointermove',move);element.removeEventListener('pointerleave',leave);window.removeEventListener('resize',schedule);reduced.removeEventListener('change',schedule)};
 },[]);
 return <div className={'platform-scene terrain-scene '+(ready?'terrain-ready':'')}>
  <svg className="terrain-fallback" viewBox="0 0 320 220" aria-hidden="true">{Array.from({length:13},(_,i)=><path key={i} d={`M${35+i*11} ${122+i*3} Q${125+i*7} ${28+i*6} ${170+i*9} ${87+i*4}`}/>)}</svg>
  <canvas ref={canvas} aria-hidden="true"/>
  <code>Canvas · WebGL · a spatial web</code>
 </div>;
}
