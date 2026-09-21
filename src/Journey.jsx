import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {UrlAnatomy} from './UrlAnatomy';
import {ArrowRight, ArrowClockwise, Plus, Code} from '@phosphor-icons/react';

const Context = createContext(null);
const freshPage = () => ({title:'A connected world', paragraph:'Ideas belong together.', theme:'editorial', styled:false, saved:0, likes:0, draft:'Keep my place, please.', note:false, edition:0});
export function JourneyProvider({children}) {
  const [page, setPage] = useState(freshPage);
  const update = patch => setPage(current => ({...current, ...patch}));
  return <Context.Provider value={{page, update, setPage, reset:()=>setPage(freshPage())}}>{children}</Context.Provider>;
}
const stages = ['html','server','css','javascript','dom','ajax'];
const labels = ['Structure','Memory','Style','Behavior','Live editing','Live data'];
const chapters = ['HTML','CGI + cookies','CSS','JavaScript','DOM','AJAX'];
const hints = [
  'Name your page. It will travel with you through the next five chapters.',
  'The same page, now with a reading list that can recognize a returning visitor.',
  'Your words are still here. Give the very same document a new appearance.',
  'Your page keeps its appearance. Now a click can change a value immediately.',
  'The same page becomes an editable tree. Change a node without leaving it.',
  'Your page keeps its state while new information arrives in one small area.'
];
const questions = [
  ['A document can travel. How does a site recognize you when you return?', 'Add a memory', 'server'],
  ['It can remember a visitor. How can the same content take on a different appearance?', 'Give it a style', 'css'],
  ['It can look different. What if a click could do something immediately?', 'Make it respond', 'javascript'],
  ['A click can run code. How can that code find and change any part of the page?', 'Look inside the page', 'dom'],
  ['The page can change locally. How can new data arrive without replacing it?', 'Bring in live data', 'ajax'],
  ['The page behaves like an app. What happens when those apps grow?', 'Meet the runtime', 'v8']
];
const editions = ['A new idea arrived.', 'The map just moved. Only this part changed.', 'Another message. The same page.'];
const escapeHTML = value => value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
function Options({label, items, value, onChange}) {
  return <div className="demo-tabs" role="group" aria-label={label}>{items.map(([id,text])=><button key={id} className={value===id?'selected':''} aria-pressed={value===id} onClick={()=>onChange(id)}>{text}</button>)}</div>;
}
export function JourneyDemo({stage,onNext}) {
  const {page,update,setPage,reset} = useContext(Context);
  const step = stages.indexOf(stage);
  const [selected,setSelected] = useState('h1');
  const [remember,setRemember] = useState(true);
  const [enabled,setEnabled] = useState(true);
  const [status,setStatus] = useState('');
  const [mode,setMode] = useState('ajax');
  const [loading,setLoading] = useState(false);
  const [followed,setFollowed] = useState(false);
  const timer = useRef();
  useEffect(()=>()=>clearTimeout(timer.current),[]);
  const theme = step<2 || !page.styled ? 'plain' : page.theme;
  function refresh() {
    if(loading) return;
    setLoading(true);
    if(mode==='reload') update({draft:'',likes:0});
    timer.current=setTimeout(()=>{setPage(p=>({...p,edition:(p.edition+1)%editions.length}));setLoading(false)},850);
  }
  function revisit() {
    if(!remember) {update({saved:0});setStatus('No session identifier: this visit starts with an empty reading list.');}
    else setStatus(`Welcome back. Your session points to ${page.saved} saved ${page.saved===1?'idea':'ideas'}.`);
  }
  const code = stage==='html' ? `<h1>${escapeHTML(page.title||'A connected world')}</h1>\n<p>${escapeHTML(page.paragraph)}</p>\n<a href="/another-idea">Follow an idea</a>`
    : stage==='css' ? !page.styled || page.theme==='plain' ? '/* The same HTML, without the presentation rules. */' : page.theme==='night' ? 'article { background: #13214b; color: white; }' : 'h1 { font-size: 2rem; }\narticle { padding: 1.5rem; color: #0014dc; }'
    : stage==='javascript' ? 'button.addEventListener("click", () => {\n  counter.textContent = ++likes;\n});'
    : stage==='dom' ? selected==='h1' ? `document.querySelector("h1").textContent\n  = ${JSON.stringify(page.title)};` : selected==='p' ? `document.querySelector("p").textContent\n  = ${JSON.stringify(page.paragraph)};` : page.note ? 'document.querySelector("article").append(newNote);' : 'newNote.remove();'
    : null;
  return <div className="demo journey-demo" data-journey={stage}>
    <div className="journey-heading"><span>ONE PAGE, SIX BREAKTHROUGHS</span></div>
    <ol className="journey-steps" aria-label="Capabilities in this chapter">{labels.map((label,i)=><li key={label} className={i===step?'current':i<step?'acquired':''} aria-current={i===step?'step':undefined}>{label}</li>)}</ol>
    <p className="journey-hint">{hints[step]}</p>
    {stage==='css'&&<Options label="CSS styles" items={[["plain","No CSS"],["editorial","Editorial"],["night","After dark"]]} value={page.styled?page.theme:'plain'} onChange={theme=>update({theme,styled:true})}/>}
    {stage==='ajax'&&<Options label="Page update mode" items={[["reload","Full-page navigation"],["ajax","AJAX update"]]} value={mode} onChange={value=>{if(!loading)setMode(value)}}/>}
    <div className="demo-window journey-window">
      <div className="window-bar"><span>ideas.example / our-page</span><span>{chapters[step]} <Code size={15}/></span></div>
      <div className={stage==='dom'?'journey-dom':''}>
        {stage==='dom'&&<div className="journey-tree"><span className="small-label">DOCUMENT</span><span>article</span>{['h1','p',...(page.note?['p.note']:[])].map(node=><button key={node} aria-pressed={selected===node} onClick={()=>setSelected(node)}>{'<'+node+'>'}</button>)}</div>}
        <article className={'evolving-page '+theme} aria-label={`${chapters[step]} version of your page`}>
          <span className="page-edition">THE DAILY WEB / YOUR FIRST PAGE</span>
          <h3 className={stage==='dom'&&selected==='h1'?'highlight-element':''}>{followed?'Another connected idea':page.title||'A connected world'}</h3>
          <p className={stage==='dom'&&selected==='p'?'highlight-element':''}>{followed?'A link gave this document somewhere else to go.':page.paragraph}</p>
          {step>=4&&page.note&&<p className={'page-note '+(stage==='dom'&&selected==='p.note'?'highlight-element':'')}>A new thought, added without a new page.</p>}
          {stage==='html'?<button className="page-link" onClick={()=>setFollowed(v=>!v)}>{followed?'Return to your page':'Follow an idea'} <ArrowRight size={15}/></button>:<span className="page-link-label">An idea worth sharing.</span>}
          {step>=1&&<div className="page-memory"><span>READING LIST</span><strong>{page.saved} saved</strong>{stage==='server'&&<button className="small-button" onClick={()=>{setPage(p=>({...p,saved:p.saved+1}));setStatus('Your reading list was updated on the simulated server.')}}><Plus size={15}/>Save this idea</button>}</div>}
          {step>=3&&<div className="page-behavior"><button className="small-button" disabled={stage==='javascript'&&!enabled} onClick={()=>setPage(p=>({...p,likes:p.likes+1}))}><Plus size={16}/>Like this idea</button><output aria-live="polite">{page.likes} {page.likes===1?'like':'likes'}</output></div>}
          {step>=3&&<label className="page-draft">An unfinished thought<input aria-label={`${chapters[step]} unfinished thought`} value={page.draft} maxLength={100} onChange={e=>update({draft:e.target.value})} placeholder="Leave yourself a thought…"/></label>}
          {stage==='ajax'&&<div className={'page-feed '+(loading?'is-updating':'')}><span className="small-label">LATEST FROM THE WORLD</span><p role="status">{loading?'Fetching the next idea…':editions[page.edition]}</p><button className="text-link" disabled={loading} onClick={refresh}><ArrowClockwise size={16}/>Fetch an update</button></div>}
          {loading&&mode==='reload'&&<div className="reload-overlay"><ArrowClockwise className="spinning" size={24}/><span>Replacing the whole page…</span></div>}
        </article>
      </div>
      {code&&<pre className="code-block"><code>{code}</code></pre>}
    </div>
    {stage==='html'&&<div className="journey-controls"><label className="input-row"><span>Name your page</span><input value={page.title} maxLength={40} onChange={e=>{update({title:e.target.value});setFollowed(false)}}/></label><button className="story-link" onClick={()=>{reset();setFollowed(false)}}>Reset your page <ArrowClockwise size={14}/></button></div>}
    {stage==='html'&&<UrlAnatomy/>}
    {stage==='server'&&<div className="journey-controls"><div className="demo-actions"><label className="check-control"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/>Keep a session cookie</label><button className="small-button" onClick={revisit}>Return to this page</button></div><p className="journey-status" role="status">{status||'Save an idea, then return with or without a session identifier.'}</p></div>}
    {stage==='javascript'&&<label className="check-control bottom-control"><input type="checkbox" checked={enabled} onChange={e=>setEnabled(e.target.checked)}/>Enable the click behavior</label>}
    {stage==='dom'&&<div className="journey-controls"><label className="input-row"><span>Edit {selected==='h1'?'heading':'paragraph'}</span><input aria-label="Selected node text" disabled={selected==='p.note'} value={selected==='p.note'?'A new thought, added without a new page.':selected==='h1'?page.title:page.paragraph} maxLength={selected==='h1'?40:90} onChange={e=>update({[selected==='h1'?'title':'paragraph']:e.target.value})}/></label><button className="story-link" onClick={()=>{update({note:!page.note});setSelected(page.note?'h1':'p.note')}}>{page.note?'Remove the new paragraph':'Add a paragraph'} <Plus size={15}/></button></div>}
    <p className="journey-caption">{stage==='server'?'Local simulation: the cookie identifies a server-held reading list; it is not the list itself.':stage==='ajax'?'Local request simulation. AJAX preserves your draft and likes; whole-page replacement resets them in this example. Browser restoration can vary.':stage==='html'?'A modern teaching example. Your title carries forward during this visit; it is not saved after reloading the website.':stage==='javascript'?'This switch controls the example’s click handler. Your draft and likes carry into the following chapters.':'This is the same teaching page, shown with the capabilities of this chapter. Examples use modern syntax.'}</p>
    <div className="journey-next"><p>{questions[step][0]}</p><button onClick={()=>onNext(questions[step][2])}>{questions[step][1]}<ArrowRight size={18}/></button></div>
  </div>;
}
