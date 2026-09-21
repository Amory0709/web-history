import React,{useState} from 'react';
import {Desktop,FileText,ArrowRight,LinkSimple} from '@phosphor-icons/react';

// A conceptual network, not a reconstruction of CERN's infrastructure.
// Switching modes never changes these document or computer coordinates.
const systems=['VAX / VMS','UNIX','Macintosh','NeXT'];
const files=['Experiment notes','Detector manual','Team directory','Research report'];
const nodes=[];const tree=[];
systems.forEach((name,g)=>{
 const angle=-Math.PI*.75+g*Math.PI*.5;
 const point=(radius,offset=0)=>({x:320+Math.cos(angle+offset)*radius*1.26,y:220+Math.sin(angle+offset)*radius*.85});
 const root=nodes.length;nodes.push({id:root,group:g,name,...point(76),root:true});
 [-.32,.32].forEach((offset,b)=>{
  const branch=nodes.length;nodes.push({id:branch,group:g,name:b?'Shared files':'Project files',...point(144,offset),level:1});tree.push([root,branch]);
  [-.13,.13].forEach((spread,k)=>{const id=nodes.length;nodes.push({id,group:g,name:files[b*2+k],...point(218,offset+spread),level:2,parent:branch});tree.push([branch,id]);});
 });
});
const byAngle=(a,b)=>Math.atan2(a.y-220,a.x-320)-Math.atan2(b.y-220,b.x-320);
const rings=[1,2].map(level=>nodes.filter(n=>n.level===level).sort(byAngle));
const crossLinks=[[2,9],[3,23],[5,16],[6,12],[9,19],[10,24],[12,26],[13,17],[16,23],[19,26]];
const ringLinks=rings.flatMap(ring=>ring.map((n,i)=>[n.id,ring[(i+1)%ring.length].id]));
const links=[...crossLinks,...ringLinks];
// This faint intermediate silk is decorative, not another computer or document.
const silk=nodes.filter(n=>n.level===2).map(n=>({x:(n.x+nodes[n.parent].x)*.5,y:(n.y+nodes[n.parent].y)*.5})).sort(byAngle);
function strand(a,b){const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;return `M${a.x},${a.y} Q${320+(mx-320)*.9},${220+(my-220)*.9} ${b.x},${b.y}`}
function LittleSpider(){return <div className="web-companion" aria-hidden="true"><svg viewBox="0 0 90 120"><path className="spider-silk" d="M46 0V48"/><g><path className="spider-legs" d="M39 62 29 53 25 40 M37 68 21 63 14 53 M37 74 20 77 13 89 M40 79 29 90 28 102 M53 62 63 53 67 40 M55 68 71 63 78 53 M55 74 72 77 79 89 M52 79 63 90 64 102"/><ellipse className="spider-body" cx="46" cy="66" rx="13" ry="17"/><ellipse className="spider-body" cx="46" cy="77" rx="13.5" ry="12"/><ellipse className="spider-eye" cx="41" cy="75" rx="4" ry="5"/><ellipse className="spider-eye" cx="51" cy="75" rx="4" ry="5"/><circle className="spider-pupil" cx="41.5" cy="76" r="1.8"/><circle className="spider-pupil" cx="50.5" cy="76" r="1.8"/><path className="spider-smile" d="M43 83Q46 85 49 83"/></g></svg></div>}
export function CernNetwork({onNext}){
 const [connected,setConnected]=useState(false),[selected,setSelected]=useState(2),[followed,setFollowed]=useState(false);
 const current=nodes[selected];
 const destinations=[...new Set(links.filter(l=>l.includes(selected)).map(l=>l.find(n=>n!==selected)))].filter(id=>nodes[id].group!==current.group);
 const target=destinations[0];
 function switchMode(value){setConnected(value);setFollowed(false)}
 return <div className="cern-story" id="connected-ideas">
  <div className="cern-intro"><p className="kicker"><span>The problem at CERN</span></p><h2>Separate systems.<br/>Connected ideas.</h2><p>The computers were already networked. Finding a related document could still mean learning another system. What if you could simply follow a link?</p></div>
  <div className={'cern-lab glass-panel '+(connected?'has-web':'')}>
   <div className="network-controls" role="group" aria-label="CERN information model"><button aria-pressed={!connected} onClick={()=>switchMode(false)}>Before the Web</button><button aria-pressed={connected} onClick={()=>switchMode(true)}><LinkSimple size={16}/> Add the Web</button></div>
   <LittleSpider/>
   <svg viewBox="0 0 640 440" className="cern-network" aria-label={connected?'The same four file trees woven into a web of document links':'Four separate file trees, each rooted at a computer'}>
    <g className="tree-edges">{tree.map(([a,b])=><line key={a+'-'+b} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}/>)}</g>
    <g className={'silk-rings '+(connected?'connected':'')} aria-hidden="true">{silk.map((n,i)=><path key={i} d={strand(n,silk[(i+1)%silk.length])} pathLength="1" style={{'--weave-delay':`${350+i*30}ms`}}/>)}</g>
    <g className={'web-edges '+(connected?'connected':'')} aria-hidden="true">{ringLinks.map(([a,b],i)=><path key={'ring-'+a+'-'+b} className={a===selected||b===selected?'selected-edge':''} d={strand(nodes[a],nodes[b])} pathLength="1" style={{'--weave-delay':`${i*28}ms`}}/>)}{crossLinks.map(([a,b],i)=><path key={'cross-'+a+'-'+b} className={'cross-strand '+(a===selected||b===selected?'selected-edge':'')} d={`M${nodes[a].x},${nodes[a].y} L${nodes[b].x},${nodes[b].y}`} pathLength="1" style={{'--weave-delay':`${600+i*35}ms`}}/>)}</g>
    {nodes.map(n=><g key={n.id} transform={`translate(${n.x},${n.y})`} className={'network-node '+(n.id===selected?'selected':'')}><circle r={n.root?25:14}/>{n.root?<><Desktop x={-13} y={-13} size={26} aria-hidden="true"/><text y={40} textAnchor="middle">{n.name}</text></>:<FileText x={-7} y={-7} size={14} aria-hidden="true"/>}<circle r={n.root?26:17} fill="transparent" className="node-hit" role="button" tabIndex={0} aria-label={`Inspect ${n.name} on ${systems[n.group]}`} onClick={()=>{setSelected(n.id);setFollowed(false)}} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(n.id);setFollowed(false)}}}/></g>)}
   </svg>
   <div className="network-inspector"><div><span className="small-label">{systems[current.group]}</span><strong>{current.name}</strong><p aria-live="polite">{followed?'A link took you to a document on another computer. No central hub required.':connected?(destinations.length?'Same documents. Same locations. A web of new connections.':'Select a document with a blue link to follow it.'):'A folder tells you where a file lives. It does not tell you every idea it relates to.'}</p></div><button className="small-button" disabled={!connected||!destinations.length} onClick={()=>{setSelected(target);setFollowed(true)}}>Follow a cross-system link <ArrowRight size={16}/></button></div>
   <p className="demo-note">A spiderweb is our visual metaphor for linked information, not an exact map of CERN. Select a document and follow a cross-system link. The same folders and computers stay in place.</p><button className="story-link cern-next" onClick={onNext}>How does a link find its page?<ArrowRight size={16}/></button>
  </div>
 </div>
}
