import {useCallback,useEffect,useRef,useState} from 'react';
import {chapters} from './history';

// The tour uses the same local demo controls as a visitor. It never follows an
// external link, requests audio permission, or opens a modal over the player.
function button(section,label){return [...document.querySelectorAll(`#${section} button`)].find(el=>(el.getAttribute('aria-label')||el.innerText).replace(/\s+/g,' ').trim()===label)}
function click(section,label){const el=button(section,label);if(el&&!el.disabled)el.click()}
function range(section,label,value){const el=document.querySelector(`#${section} input[aria-label="${label}"]`);if(!el)return;Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,String(value));el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}))}
const stop=(section,anchor,caption,wait,run)=>({section,anchor,caption,wait,run});
const demos={
 web:[stop('web','#connected-ideas .cern-lab','Separate systems. The same documents.',4000,()=>click('web','Before the Web')),stop('web','#connected-ideas .cern-lab','Add links. Watch a web of ideas appear.',5500,()=>click('web','Add the Web')),stop('web','#connected-ideas .network-inspector','A link can cross from one computer to another.',4500,()=>click('web','Follow a cross-system link'))],
 html:[stop('html','#html .journey-window','HTML gives an idea structure—and somewhere to go.',4000),stop('html','#html .journey-window','Follow the link to another document.',4000,()=>click('html','Follow an idea')),stop('html','#html .journey-window','One connected page becomes a starting point.',2500,()=>click('html','Return to your page'))],
 server:[stop('server','#server .journey-window','Save an idea on the simulated server.',4000,()=>click('server','Save this idea')),stop('server','#server .journey-controls','Return with a session identifier. Your list is still here.',4500,()=>click('server','Return to this page'))],
 css:[stop('css','#css .demo-tabs','The same document, without presentation rules.',3500,()=>click('css','No CSS')),stop('css','#css .demo-tabs','CSS changes the appearance, while the words stay.',4500,()=>click('css','Editorial')),stop('css','#css .demo-tabs','One set of rules. A different atmosphere.',4500,()=>click('css','After dark')),stop('css','#css .demo-tabs','Keep the design. Add behavior next.',2000,()=>click('css','Editorial'))],
 javascript:[stop('javascript','#javascript .page-behavior','The page now has a click handler.',1000,()=>{const checkbox=document.querySelector('#javascript input[type=checkbox]');if(checkbox&&!checkbox.checked)checkbox.click()}),stop('javascript','#javascript .page-behavior','A click runs code. The value changes immediately.',3500,()=>click('javascript','Like this idea')),stop('javascript','#javascript .page-behavior','Click again. No journey back to the server.',3500,()=>click('javascript','Like this idea'))],
 dom:[stop('dom','#dom .journey-window','A document is a tree that code can edit.',3500),stop('dom','#dom .journey-window','Add a paragraph. A new node appears in the same page.',5000,()=>click('dom','Add a paragraph'))],
 ajax:[stop('ajax','#ajax .demo-tabs','Update a small part of the page.',1200,()=>click('ajax','AJAX update')),stop('ajax','#ajax .page-draft','New data arrives. Your draft and likes stay in place.',5000,()=>click('ajax','Fetch an update'))],
 v8:[stop('v8','#v8 .runtime-stage','First, wait for the file before answering the next request.',4300,()=>{click('v8','Wait, then work')}),stop('v8','#v8 .runtime-stage','Watch the second request wait.',4300,()=>click('v8','Run the sequence')),stop('v8','#v8 .runtime-stage','Now let other work continue while I/O is pending.',2200,()=>click('v8','Asynchronous I/O')),stop('v8','#v8 .runtime-stage','The second visitor gets an answer while the file is loading.',4300,()=>click('v8','Run the sequence'))],
 responsive:[stop('responsive','#responsive .range-label','A wide window gives the content room.',3500,()=>range('responsive','Demo viewport width',640)),stop('responsive','#responsive .range-label','Make the window smaller. The layout listens.',4500,()=>range('responsive','Demo viewport width',320)),stop('responsive','#responsive .range-label','The same content, at a different width.',3000,()=>range('responsive','Demo viewport width',640))],
 platform:[stop('platform','#platform .demo-window','The browser becomes a canvas for moving surfaces.',2200,()=>click('platform','Graphics')),stop('platform','#platform .demo-window','5,184 points move together to form a surface.',6500,()=>click('platform','Animate the surface')),stop('platform','#platform .demo-window','It can also become a shared space.',1800,()=>{click('platform','Pause the surface');click('platform','Real time')}),stop('platform','#platform .demo-window','Send a message across the simulated connection.',4500,()=>click('platform','Send a demo message'))],
 offline:[stop('offline','#offline .demo-window','Start with a connection.',1000,()=>click('offline','Go online')),stop('offline','#offline .demo-window','Save an article before leaving the network.',3500,()=>click('offline','Save for offline')),stop('offline','#offline .demo-window','The connection disappears. The saved copy remains.',3500,()=>click('offline','Go offline')),stop('offline','#offline .demo-window','Ask for it again. The cache answers.',4000,()=>click('offline','Request article')),stop('offline','#offline .pwa-install-preview','PWA adds a home-screen presence to the web experience.',4500,()=>click('offline','Preview installation')),stop('offline','#offline .demo-window','Launch the saved app. Installation and caching work together.',4500,()=>click('offline','Launch saved app'))],
 wasm:[stop('wasm','#wasm .signal-chart','Break the signal into overlapping windows.',4000,()=>range('wasm','Explore signal output',13)),stop('wasm','#wasm .signal-chart','Wasm calculates each sum. JavaScript draws the result.',5000,()=>click('wasm','Smooth with WebAssembly')),stop('wasm','#wasm .window-recipe','Five inputs become one output: sum, then divide.',4500),stop('wasm','#wasm .signal-chart','Move the window. Each output has its own small job.',4000,()=>range('wasm','Explore signal output',22))],
 webgpu:[stop('webgpu','#webgpu .parallel-lab','The job: square 64 values, one at a time.',2200,()=>click('webgpu','One at a time Illustration')),stop('webgpu','#webgpu .parallel-lab','Watch the grid and its deliberately slowed timer.',6600,()=>click('webgpu','Run the illustration')),stop('webgpu','#webgpu .parallel-lab','The same work, grouped eight at a time.',1800,()=>click('webgpu','Eight together Illustration')),stop('webgpu','#webgpu .parallel-lab','More independent tasks can advance together.',3000,()=>click('webgpu','Run the illustration')),stop('webgpu','#webgpu .parallel-lab','Now try a real compute shader on this device.',1800,()=>click('webgpu','On your GPU Real compute')),stop('webgpu','#webgpu .parallel-lab','The browser reports verified results—or explains unavailable support.',7000,()=>click('webgpu','Run on your GPU')),stop('webgpu','#webgpu .compute-records','Different timers measure different things. This is not a speed benchmark.',5000)]
};
export const storyStops=chapters.flatMap(c=>[
 ...(c.id==='web'?[]:[stop(c.id,`.transition-${c.id}`,`Watch the idea behind ${c.nav}.`,3800,()=>document.querySelector(`.transition-${c.id} .scene-action`)?.click())]),
 stop(c.id,`#${c.id} .chapter-copy`,`${c.year} · ${c.nav}`,8500),
 stop(c.id,`#${c.id} .chapter-body`,c.subtitle,Math.max(7000,Math.min(17000,c.body.split(/\s+/).length*260))),
 ...(demos[c.id]||[])
]).concat(stop('end','.epilogue','The next chapter starts with what we choose to build.',8000));

export function useStoryPlayback(){
 const [playing,setPlaying]=useState(false),[caption,setCaption]=useState(''),[started,setStarted]=useState(false),[finished,setFinished]=useState(false);
 const state=useRef({playing:false,index:0,phase:'scroll',remaining:null,performed:false,frame:0,timeout:0,waitStarted:0,pausedY:0});
 const advance=useRef(null);
 const pause=useCallback(()=>{const s=state.current;if(!s.playing)return;s.playing=false;cancelAnimationFrame(s.frame);clearTimeout(s.timeout);if(s.phase==='wait')s.remaining=Math.max(0,s.remaining-(performance.now()-s.waitStarted));s.pausedY=window.scrollY;document.documentElement.dataset.storyPlayback='paused';setPlaying(false)},[]);
 advance.current=()=>{
  const s=state.current;if(!s.playing)return;const step=storyStops[s.index];
  if(!step){s.playing=false;document.documentElement.dataset.storyPlayback='idle';setPlaying(false);setFinished(true);setCaption('The story continues with you.');return}
  const el=document.querySelector(step.anchor);if(!el){s.index++;s.phase='scroll';s.performed=false;advance.current();return}
  setCaption(step.caption);
  function wait(){if(!s.playing)return;s.phase='wait';if(!s.performed){step.run?.();s.performed=true;s.remaining=step.wait}s.waitStarted=performance.now();s.timeout=setTimeout(()=>{s.index++;s.phase='scroll';s.remaining=null;s.performed=false;advance.current()},s.remaining)}
  if(s.phase==='wait'){wait();return}
  const from=window.scrollY,header=document.querySelector('.site-header').getBoundingClientRect().bottom+28;
  const to=Math.max(0,Math.min(document.documentElement.scrollHeight-innerHeight,from+el.getBoundingClientRect().top-header));
  if(Math.abs(to-from)<8||matchMedia('(prefers-reduced-motion: reduce)').matches){window.scrollTo({top:to,behavior:'instant'});wait();return}
  const duration=Math.max(1100,Math.min(10000,Math.abs(to-from)/.24));let start=null;
  function move(now){if(!s.playing)return;if(start===null)start=now;const p=Math.min(1,(now-start)/duration),eased=p*p*(3-2*p);window.scrollTo({top:from+(to-from)*eased,behavior:'instant'});if(p<1)s.frame=requestAnimationFrame(move);else wait()}
  s.frame=requestAnimationFrame(move);
 };
 function toggle(){const s=state.current;if(s.playing){pause();return}
  if(!started||finished||Math.abs(window.scrollY-s.pausedY)>140){
   const next=finished?0:storyStops.findIndex(step=>{const el=document.querySelector(step.anchor);return el&&el.getBoundingClientRect().bottom>150});
   s.index=next<0?0:next;s.phase='scroll';s.remaining=null;s.performed=false;
  }
  s.playing=true;setStarted(true);setFinished(false);setPlaying(true);document.documentElement.dataset.storyPlayback='playing';advance.current();
 }
 useEffect(()=>{
  const takeOver=e=>{if(e.isTrusted&&!e.target.closest?.('[data-story-control]'))pause()};
  const key=e=>{if(!e.isTrusted||e.target.closest?.('[data-story-control]'))return;if(['Escape',' ','ArrowDown','ArrowUp','PageDown','PageUp','Home','End','Tab'].includes(e.key)){if(e.key===' '&&state.current.playing&&!/INPUT|TEXTAREA|BUTTON/.test(e.target.tagName))e.preventDefault();pause()}};
  const hidden=()=>{if(document.hidden)pause()};
  window.addEventListener('wheel',takeOver,{passive:true});window.addEventListener('touchstart',takeOver,{passive:true});window.addEventListener('pointerdown',takeOver);window.addEventListener('keydown',key);document.addEventListener('visibilitychange',hidden);
  return()=>{cancelAnimationFrame(state.current.frame);clearTimeout(state.current.timeout);window.removeEventListener('wheel',takeOver);window.removeEventListener('touchstart',takeOver);window.removeEventListener('pointerdown',takeOver);window.removeEventListener('keydown',key);document.removeEventListener('visibilitychange',hidden);delete document.documentElement.dataset.storyPlayback};
 },[pause]);
 return {playing,caption,toggle,pause,label:playing?'Pause story':finished?'Replay story':started?'Resume story':'Play story'};
}
