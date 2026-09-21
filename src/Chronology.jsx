import React from 'react';
import {chapters} from './history';
export const firstYear=1989;
export const lastYear=2023;
export const yearOf=chapter=>Number.parseInt(chapter.year,10);
export const yearPosition=year=>(year-firstYear)/(lastYear-firstYear);
// Globe + pointer, drawn for legibility at timeline-marker sizes.
export function WebMark(){return <svg viewBox="0 0 26 26" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="9"/><ellipse cx="11" cy="11" rx="4" ry="9"/><path d="M2 11h18M4 5.5q7 3.5 14 0M4 16.5q5.5-2.7 10-1.2"/></g><path d="m14 13 10 4-4.1 1.5 3.5 3.6-2.8 2.5-3.3-3.8-1.8 4Z" fill="currentColor" stroke="#fafbfe" strokeWidth="1.4" strokeLinejoin="round"/></svg>}
export function Chronology({active,onNavigate}){
 const current=chapters[active];
 return <aside className="chronology" aria-label="Explore the history"><div className="chronology-heading">A living history</div><nav className="chronology-track" aria-label="History chapters" style={{'--current-year':yearPosition(yearOf(current))}}><span className="chronology-line" aria-hidden="true"/><span className="chronology-fill" aria-hidden="true"/>{Array.from({length:lastYear-firstYear+1},(_,i)=><span key={i} className={'year-tick '+((firstYear+i)%5===0?'major':'')} style={{top:`${yearPosition(firstYear+i)*100}%`}} aria-hidden="true"/>)}{chapters.map((chapter,i)=><a key={chapter.id} className={'chronology-point '+(active===i?'active':'')} href={'#'+chapter.id} style={{top:`${yearPosition(yearOf(chapter))*100}%`}} data-year={yearOf(chapter)} aria-label={chapter.year+' · '+chapter.nav} aria-current={active===i?'location':undefined} title={`${chapter.year} · ${chapter.nav}`} onClick={e=>{e.preventDefault();onNavigate(chapter.id)}}><WebMark/><b>{yearOf(chapter)}</b><span>{chapter.nav}</span></a>)}</nav><div className="chronology-caption"><span>{current.year}</span><strong>{current.nav}</strong><small>Years to scale</small></div></aside>
}
