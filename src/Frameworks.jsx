import React,{useState} from 'react';
import {BookmarkSimple,Check,ArrowUpRight,BracketsCurly} from '@phosphor-icons/react';
import {PeopleText} from './People';
import './frameworks.css';

const approaches=[
 {id:'angular',name:'Angular',date:'AngularJS 1.0 · 2012',title:'Give the application a structure.',body:'AngularJS connected HTML templates to application data through binding and directives. It also supplied tools such as dependency injection to organize a growing application.',person:'Miško Hevery',credit:'AngularJS co-creator, with Adam Abrons and later the Google team.',note:'Angular 2 arrived in 2016 as a major rewrite built around components. AngularJS and modern Angular are different generations.',url:'https://angular.dev/overview',link:'Explore modern Angular'},
 {id:'react',name:'React',date:'Open-sourced · 2013',title:'Describe the UI for this state.',body:'React popularized composing interfaces from reusable components. You describe what each component should display; React reconciles the result with the browser’s DOM when state changes.',person:'Jordan Walke',credit:'Original creator at Facebook, developed with the React team.',note:'React is a UI library. A full application often combines it with routing, data tools or a framework. Components and declarative programming have earlier roots.',url:'https://legacy.reactjs.org/blog/2013/06/05/why-react.html',link:'Read the original explanation'},
 {id:'vue',name:'Vue',date:'First public release · 2014',title:'Start small. Grow into an app.',body:'Vue connects reactive data to declarative templates and reusable components. It can enhance part of an existing page or work with its ecosystem to support a complete application.',person:'Evan You',credit:'Creator, with an independent open-source community.',note:'Progressive adoption is the idea: use the pieces your project needs. Vue’s reactivity and React’s rendering model are not the same implementation.',url:'https://vuejs.org/guide/introduction.html',link:'Explore the Vue approach'}
];

function Toolbar({saved}){return <div className="framework-toolbar framework-component"><span className="component-tag">Toolbar</span><span>The daily web</span><span className="framework-count"><BookmarkSimple size={15}/><output key={String(saved)}>{saved?1:0} saved</output></span></div>}
function ArticleCard({saved,onToggle}){return <article className="framework-article framework-component"><span className="component-tag">ArticleCard</span><div className="framework-art" aria-hidden="true"><i/><i/><i/></div><h3>One idea.<br/>Many places.</h3><p>Your reading list begins with a single connection.</p><button className="small-button framework-save" aria-pressed={saved} onClick={onToggle}>{saved?<Check size={16}/>:<BookmarkSimple size={16}/>} {saved?'Remove saved idea':'Save this idea'}</button></article>}
function ReadingList({saved}){return <aside className="framework-reading framework-component" aria-label="Demo reading list"><span className="component-tag">ReadingList</span><h4>Your reading list</h4><div key={String(saved)} className={'framework-list-state '+(saved?'has-idea':'')}><BookmarkSimple size={25} weight="thin"/>{saved?<p>One idea.<br/>Many places.</p>:<p>A little space<br/>for your next idea.</p>}<small>{saved?'1 idea, ready to revisit':'Nothing saved yet'}</small></div></aside>}

export function FrameworkDemo(){
 const [saved,setSaved]=useState(false),[boundaries,setBoundaries]=useState(false),[approach,setApproach]=useState('react');
 const current=approaches.find(a=>a.id===approach);
 return <div className="demo framework-demo">
  <div className="demo-topline"><span>The component idea</span><span>One state · three views</span></div>
  <p className="lesson-lead">An article, a toolbar, a reading list. Save one idea and watch all three agree.</p>
  <div className={'demo-window framework-app '+(boundaries?'show-boundaries':'')}>
   <Toolbar saved={saved}/>
   <div className="framework-app-body"><ArticleCard saved={saved} onToggle={()=>setSaved(v=>!v)}/><ReadingList saved={saved}/></div>
   <div className="framework-state"><BracketsCurly size={16}/><code>saved = <b>{String(saved)}</b></code><span>→ three connected views</span></div>
  </div>
  <div className="demo-actions"><button className="small-button" aria-pressed={boundaries} onClick={()=>setBoundaries(v=>!v)}>{boundaries?'Hide component boundaries':'Show component boundaries'}</button></div>
  <p className="framework-feedback" role="status">{saved?'One state change updated the button, the saved count and the reading list.':'Try saving the article. All three views read the same shared state.'}</p>
  <div className="framework-approaches">
   <p className="framework-approach-label">Three approaches to a growing Web</p>
   <div className="demo-tabs" role="group" aria-label="Explore framework approaches">{approaches.map(a=><button key={a.id} aria-pressed={approach===a.id} className={approach===a.id?'selected':''} onClick={()=>setApproach(a.id)}>{a.name}</button>)}</div>
   <article className="framework-profile" aria-label={current.name+' approach'}><p className="framework-release">{current.date}</p><h3>{current.title}</h3><p>{current.body}</p><p className="framework-person"><PeopleText>{current.person}</PeopleText><span><PeopleText>{current.credit}</PeopleText></span></p><p className="framework-caveat">{current.note}</p><a className="text-link" href={current.url} target="_blank" rel="noopener noreferrer">{current.link}<ArrowUpRight size={15}/></a></article>
  </div>
  <p className="demo-note">This live example uses React to show a shared idea. The tabs explain different approaches; they do not switch rendering engines. Frameworks build on HTML, CSS, JavaScript and the DOM.</p>
 </div>
}
