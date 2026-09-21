import React from 'react';
import {ArrowUpRight,UserCircle} from '@phosphor-icons/react';
import {portraits} from './portraits';

// Biography links are separate from the primary historical sources.
export const people = [
 ['Tim Berners-Lee','https://www.w3.org/People/Berners-Lee/','The Web’s original proposal and first implementation.'],
 ['Robert Cailliau','https://en.wikipedia.org/wiki/Robert_Cailliau','An early collaborator and advocate for the Web at CERN.'],
 ['Nicola Pellow','https://en.wikipedia.org/wiki/Nicola_Pellow','Built the line-mode browser, helping the Web reach more computers.'],
 ['Marc Andreessen','https://en.wikipedia.org/wiki/Marc_Andreessen','Co-developed NCSA Mosaic with Eric Bina and the NCSA team.'],
 ['Eric Bina','https://en.wikipedia.org/wiki/Eric_Bina','Co-developed the Mosaic browser at NCSA.'],
 ['Lou Montulli','https://en.wikipedia.org/wiki/Lou_Montulli','Introduced browser cookies at Netscape.'],
 ['Håkon Wium Lie','https://www.w3.org/People/howcome/','Proposed cascading style sheets in 1994.'],
 ['Bert Bos','https://www.w3.org/People/Bos/','Co-designed CSS and helped develop its standards.'],
 ['Brendan Eich','https://en.wikipedia.org/wiki/Brendan_Eich','Created JavaScript’s first prototype at Netscape.'],
 ['Jesse James Garrett','https://en.wikipedia.org/wiki/Jesse_James_Garrett','Named and described the AJAX approach in 2005.'],
 ['Lars Bak','https://en.wikipedia.org/wiki/Lars_Bak_(computer_programmer)','Led the team that created the V8 JavaScript engine.'],
 ['Ryan Dahl','https://en.wikipedia.org/wiki/Ryan_Dahl','Created Node.js, introduced in 2009.'],
 ['Ethan Marcotte','https://abookapart.com/blogs/press/get-to-know-ethan-marcotte-again.html','Articulated responsive web design in his 2010 essay.'],
 ['Miško Hevery','https://github.com/mhevery','Co-created AngularJS and helped establish the Angular project.'],
 ['Adam Abrons','https://github.com/abrons','Co-created the original AngularJS with Miško Hevery.'],
 ['Jordan Walke','https://github.com/jordwalke','Created React at Facebook; it was open-sourced in 2013.'],
 ['Evan You','https://evanyou.me/','Created Vue, first released publicly in 2014.'],
 ['Ian Fette','https://datatracker.ietf.org/person/ifette%2Bietf@google.com','Co-authored the WebSocket protocol RFC.'],
 ['Alexey Melnikov','https://datatracker.ietf.org/person/alexey.melnikov@isode.com','Co-authored the WebSocket protocol RFC.'],
 ['Ian Hickson','https://en.wikipedia.org/wiki/Ian_Hickson','An editor of the HTML5 specification.'],
 ['Dave Raggett','https://www.w3.org/People/Raggett/','An early HTML contributor and coauthor of its history.'],
 ['Allen Wirfs-Brock','https://www.wirfs-brock.com/allen/about','ECMAScript editor and coauthor of JavaScript’s history.'],
 ['Frances Berriman','https://fberriman.com/about/','Helped name Progressive Web Apps and advocate for the open Web.'],
 ['Alex Russell','https://infrequently.org/','Articulated the Progressive Web App model in 2015.'],
 ['David Kristol','https://datatracker.ietf.org/person/dmk@bell-labs.com','Co-authored the HTTP State Management Mechanism RFC.'],
];
const names = new Map(people.map(p=>[p[0],p]));
const pattern = new RegExp('('+people.map(p=>p[0]).join('|')+')','g');
export function PeopleText({children}) {
 if(typeof children!=='string') return children;
 return children.split(pattern).map((part,i)=>names.has(part)?<a className="person-link" key={i} href={names.get(part)[1]} target="_blank" rel="noopener noreferrer" title={`About ${part}`}>{part}</a>:part);
}
export function PeopleDirectory(){return <><p className="panel-intro">The people behind the ideas, in photographs from their journeys. Earlier portraits are preferred where available. Open a portrait for its original source, or a name to explore their work.</p><div className="people-directory">{people.map(([name,url,role])=>{const photo=portraits[name];return <article key={name} className="person-card">{photo?<figure className="person-portrait"><a href={photo.source} target="_blank" rel="noopener noreferrer" aria-label={`Original photograph of ${name}`}><img src={photo.src} alt={name} loading="lazy" decoding="async" style={{objectPosition:photo.position||'50% 25%'}}/></a><figcaption>{photo.date}</figcaption></figure>:<div className="portrait-unavailable"><UserCircle size={54} weight="thin" aria-hidden="true"/><span>Portrait not yet verified</span></div>}<h3><a href={url} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={15}/></a></h3><p>{role}</p><div className="person-links"><a href={url} target="_blank" rel="noopener noreferrer">Profile & work ↗</a>{photo&&<a href={photo.source} target="_blank" rel="noopener noreferrer">Photo source ↗</a>}</div>{photo&&<details className="portrait-credit"><summary>Photo credit</summary><p>{photo.credit} · {photo.license}. <a href={photo.source} target="_blank" rel="noopener noreferrer">Original & attribution ↗</a></p></details>}</article>})}</div><p className="demo-note">Photographs show different moments in these careers; dates refer to the photograph when known, not to the invention. No portraits have been generated or made younger. Standards and collective work are credited to their communities.</p></>}
