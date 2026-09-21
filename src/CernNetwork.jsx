import React,{useState} from 'react';
import {Desktop,FileText,ArrowRight,LinkSimple} from '@phosphor-icons/react';
// A conceptual network, not a reconstruction of CERN's infrastructure.
const systems=['VAX / VMS','UNIX','Macintosh','NeXT'];
const files=['Experiment notes','Detector manual','Team directory','Research report'];
const nodes=[];const tree=[];
systems.forEach((name,g)=>{
 const angle=-Math.PI*.75+g*Math.PI*.5;
 const point=(radius,offset=0)=>({x:320+Math.cos(angle+offset)*radius*1.26,y:220+Math.sin(angle+offset)*radius*.85});
 const root=nodes.length;nodes.push({id:root,group:g,name,...point(76),root:true});
 [-.32,.32].forEach((offset,b)=>{
  const branch=nodes.length;nodes.push({id:branch,group:g,name:b?'Shared files':'Project files',...point(144,offset)});tree.push([root,branch]);
  [-.13,.13].forEach((spread,k)=>{const id=nodes.length;nodes.push({id,group:g,name:files[b*2+k],...point(218,offset+spread)});tree.push([branch,id]);});
 });
});
const links=[[2,9],[3,23],[5,16],[6,12],[9,19],[10,24],[12,26],[13,17],[16,23],[19,26]];
export function CernNetwork({onNext}){
 const [connected,setConnected]=useState(false),[selected,setSelected]=useState(2),[followed,setFollowed]=useState(false);
 const current=nodes[selected]; const destinations=links.filter(l=>l.includes(selected)).map(l=>l.find(n=>n!==selected));const target=destinations[0];
 function switchMode(value){setConnected(value);setFollowed(false)}
 return <div className="cern-story" id="connected-ideas"><div className="cern-intro"><p className="kicker"><span>The problem at CERN</span></p><h2>Separate systems.<br/>Connected ideas.</h2><p>The computers were already networked. Finding a related document could still mean learning another system. What if you could simply follow a link?</p></div><div className="cern-lab glass-panel"><div className="network-controls" role="group" aria-label="CERN information model"><button aria-pressed={!connected} onClick={()=>switchMode(false)}>Before the Web</button><button aria-pressed={connected} onClick={()=>switchMode(true)}><LinkSimple size={16}/> Add the Web</button></div><svg viewBox="0 0 640 440" className="cern-network" aria-label={connected?'The same four file trees, connected by cross-system hyperlinks':'Four separate file trees, each rooted at a computer'}><g className="tree-edges">{tree.map(([a,b])=><line key={a+'-'+b} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}/>)}</g><g className={'web-edges '+(connected?'connected':'')} aria-hidden="true">{links.map(([a,b])=><line key={a+'-'+b} className={a===selected||b===selected?'selected-edge':''} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}/>)}</g>{nodes.map(n=><g key={n.id} transform={`translate(${n.x},${n.y})`} className={'network-node '+(n.id===selected?'selected':'')}><circle r={n.root?25:14}/>{n.root?<><Desktop x={-13} y={-13} size={26} aria-hidden="true"/><text y={40} textAnchor="middle">{n.name}</text></>:<FileText x={-7} y={-7} size={14} aria-hidden="true"/>}<circle r={n.root?26:17} fill="transparent" className="node-hit" role="button" tabIndex={0} aria-label={`Inspect ${n.name} on ${systems[n.group]}`} onClick={()=>{setSelected(n.id);setFollowed(false)}} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setSelected(n.id);setFollowed(false)}}}/></g>)}</svg><div className="network-inspector"><div><span className="small-label">{systems[current.group]}</span><strong>{current.name}</strong><p aria-live="polite">{followed?'A link took you to a document on another computer. No central hub required.':connected?(destinations.length?'Same documents. Same locations. New paths between them.':'Select a document with a blue link to follow it.'):'A folder tells you where a file lives. It does not tell you every idea it relates to.'}</p></div><button className="small-button" disabled={!connected||!destinations.length} onClick={()=>{setSelected(target);setFollowed(true)}}>Follow a cross-system link <ArrowRight size={16}/></button></div><p className="demo-note">Conceptual illustration, not an exact map of CERN. Select a node, add hyperlinks, then follow one. The underlying folders and computers stay in place.</p><button className="story-link cern-next" onClick={onNext}>How does a link find its page?<ArrowRight size={16}/></button></div></div>
}
