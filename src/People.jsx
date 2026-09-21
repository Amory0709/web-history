import React from 'react';
import {ArrowUpRight,UserCircle} from '@phosphor-icons/react';

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
 ['Ian Fette','https://datatracker.ietf.org/person/ifette%2Bietf@google.com','Co-authored the WebSocket protocol RFC.'],
 ['Alexey Melnikov','https://datatracker.ietf.org/person/alexey.melnikov@isode.com','Co-authored the WebSocket protocol RFC.'],
 ['Ian Hickson','https://en.wikipedia.org/wiki/Ian_Hickson','An editor of the HTML5 specification.'],
 ['Dave Raggett','https://www.w3.org/People/Raggett/','An early HTML contributor and coauthor of its history.'],
 ['Allen Wirfs-Brock','https://en.wikipedia.org/wiki/Allen_Wirfs-Brock','ECMAScript editor and coauthor of JavaScript’s history.'],
 ['David Kristol','https://datatracker.ietf.org/person/dmk@bell-labs.com','Co-authored the HTTP State Management Mechanism RFC.'],
];
const names = new Map(people.map(p=>[p[0],p]));
const pattern = new RegExp('('+people.map(p=>p[0]).join('|')+')','g');
export function PeopleText({children}) {
 if(typeof children!=='string') return children;
 return children.split(pattern).map((part,i)=>names.has(part)?<a className="person-link" key={i} href={names.get(part)[1]} target="_blank" rel="noopener noreferrer" title={`About ${part}`}>{part}</a>:part);
}
export function PeopleDirectory(){return <><p className="panel-intro">Meet the people behind the ideas. Open their profiles, explore photographs, and follow their work. The technology sources remain linked beside each story.</p><div className="people-directory">{people.map(([name,url,role])=><article key={name} className="person-card"><UserCircle size={27} weight="light" aria-hidden="true"/><h3><a href={url} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={15}/></a></h3><p>{role}</p><div><a href={url} target="_blank" rel="noopener noreferrer">Profile & work ↗</a><a href={'https://commons.wikimedia.org/w/index.php?title=Special:MediaSearch&type=image&search='+encodeURIComponent(name+(['Ian Fette','Alexey Melnikov','David Kristol'].includes(name)?' IETF':''))} target="_blank" rel="noopener noreferrer" aria-label={`Find photographs of ${name}`}>Photographs ↗</a></div></article>)}</div><p className="demo-note">Photograph links open Wikimedia Commons search; availability varies. Groups and standards are credited collectively, rather than assigned a single inventor.</p></>}
