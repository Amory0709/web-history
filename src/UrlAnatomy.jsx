import React, {useRef,useState} from 'react';
import {ArrowUpRight, X} from '@phosphor-icons/react';

const example='https://ideas.example:8443/our-page?view=all#notes';
const explain={
  scheme:['Scheme','How should this address be handled?','https identifies HTTP over a secured connection. The scheme is the part before the colon; URL.protocol includes that colon. Other schemes, such as mailto, have different rules. This explorer focuses on HTTP and HTTPS.'],
  hostname:['Hostname','Which network destination?','A hostname can be a domain name or an IP address. For example, ideas.example is a hostname. In the browser URL API, host includes a non-default port as well; hostname does not.'],
  port:['Port','Which service at that destination?','The port is a numeric endpoint. HTTPS defaults to 443 and HTTP to 80, so those ports can be omitted. A non-default port such as 8443 remains explicit. The URL API removes an explicitly written default port when it normalizes the address.'],
  path:['Path','Which resource?','The path identifies a resource within this address space. It need not correspond to a real file or folder on a server. A server or application decides how to handle it.'],
  query:['Query','What extra information?','The query starts after ?. For example, view=all supplies a parameter. Multiple parameters commonly use & between them. For an HTTP request, the path and query are sent to the server.'],
  fragment:['Fragment','Which part inside the resource?','The fragment follows #. A browser can use it to jump to an element such as notes, and an application can interpret it too. It is not sent in the HTTP request for the resource.']
};
export function UrlAnatomy(){
  const dialog=useRef();
  const [input,setInput]=useState(example),[selected,setSelected]=useState('scheme');
  let url=null;
  try{const candidate=new URL(input);if(['http:','https:'].includes(candidate.protocol)&&!candidate.username&&!candidate.password)url=candidate;}catch{}
  const parts=url?[['scheme',url.protocol+'//'],['hostname',url.hostname],['port',url.port?':'+url.port:'(default port)'],['path',url.pathname],['query',url.search||'(no query)'],['fragment',url.hash||'(no fragment)']]:[];
  const [label,question,description]=explain[selected];
  return <><button className="url-invitation" onClick={()=>dialog.current.showModal()}>Read the address: scheme, host & more <ArrowUpRight size={15}/></button>
    <dialog ref={dialog} className="url-dialog" aria-labelledby="url-heading" onClick={e=>{if(e.target===e.currentTarget)dialog.current.close()}}>
      <button className="dialog-close circle-button" aria-label="Close address explorer" onClick={()=>dialog.current.close()}><X size={22}/></button>
      <p className="kicker"><span>A CLOSER LOOK / URL</span></p><h2 id="url-heading">Every part has a job.</h2>
      <p className="url-intro">A page needs more than a name. Its address tells the browser where to go and what to ask for. Select a part to see what it does.</p>
      <div className="url-parts" role="group" aria-label="Parts of the URL">{parts.map(([id,value])=><button key={id} className={selected===id?'selected':''} aria-pressed={selected===id} onClick={()=>setSelected(id)}><code>{value}</code><span>{explain[id][0]}</span></button>)}</div>
      <section className="url-explanation" aria-live="polite"><span>{label}</span><h3>{question}</h3><p>{description}</p></section>
      <label className="url-input">Try an HTTP or HTTPS address<input type="text" inputMode="url" spellCheck="false" autoCapitalize="none" maxLength={500} value={input} aria-invalid={!url} aria-describedby="url-input-help" onChange={e=>setInput(e.target.value)}/></label>
      <p id="url-input-help" className={'url-help '+(!url?'invalid':'')}>{url?'Parsed locally. No request is sent to this address.':'Enter a complete http:// or https:// address without a username or password.'}</p>
      <div className="url-examples"><button onClick={()=>setInput(example)}>Full example</button><button onClick={()=>setInput('https://ideas.example:443/our-page#notes')}>Try the default port</button><button onClick={()=>setInput('https://ideas.example/another-page?view=brief')}>Change only the resource</button></div>
      {url&&<dl className="url-identity"><div><dt>hostname</dt><dd>{url.hostname}</dd></div><div><dt>host <span>in the URL API</span></dt><dd>{url.host}</dd></div><div><dt>origin <span>scheme + hostname + effective port</span></dt><dd>{url.origin}</dd></div></dl>}
      <p className="url-origin-note">For HTTP(S), changing the scheme, hostname or effective port changes the origin. Changing only the path, query or fragment does not. Browsers use origins as an important security boundary.</p>
      <p className="url-era">This uses modern HTTPS and the URL API to explain address structure; it is not a reconstruction of a 1990 browser. The term is <strong>scheme</strong>, rather than schema.</p>
      <div className="url-references"><a className="text-link" href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/What_is_a_URL" target="_blank" rel="noopener noreferrer">MDN: What is a URL?<ArrowUpRight size={15}/></a><a className="text-link" href="https://url.spec.whatwg.org/" target="_blank" rel="noopener noreferrer">WHATWG URL Standard<ArrowUpRight size={15}/></a></div>
    </dialog></>;
}
