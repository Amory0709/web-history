import React from 'react';
import {chapters} from './history';
export const firstYear=1989;
export const lastYear=2023;
export const yearOf=chapter=>Number.parseInt(chapter.year,10);
export const yearPosition=year=>(year-firstYear)/(lastYear-firstYear);
export function Chronology({active,onNavigate}){
 const current=chapters[active];
 return <aside className="chronology" aria-label="Explore the history"><div className="chronology-heading">A living history</div><nav className="chronology-track" aria-label="History chapters" style={{'--current-year':yearPosition(yearOf(current))}}><span className="chronology-line" aria-hidden="true"/><span className="chronology-fill" aria-hidden="true"/>{Array.from({length:lastYear-firstYear+1},(_,i)=><span key={i} className={'year-tick '+((firstYear+i)%5===0?'major':'')} style={{top:`${yearPosition(firstYear+i)*100}%`}} aria-hidden="true"/>)}<span className="chronology-cursor" aria-hidden="true"/>{chapters.map((chapter,i)=><a key={chapter.id} className={'chronology-point '+(active===i?'active':'')} href={'#'+chapter.id} style={{top:`${yearPosition(yearOf(chapter))*100}%`}} data-year={yearOf(chapter)} aria-label={chapter.year+' · '+chapter.nav} aria-current={active===i?'location':undefined} title={`${chapter.year} · ${chapter.nav}`} onClick={e=>{e.preventDefault();onNavigate(chapter.id)}}><i aria-hidden="true"/><b>{yearOf(chapter)}</b><span>{chapter.nav}</span></a>)}</nav><div className="chronology-caption"><span>{current.year}</span><strong>{current.nav}</strong><small>Years to scale</small></div></aside>
}
