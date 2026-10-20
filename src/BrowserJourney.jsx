import React, {useRef, useState} from 'react';
import {ArrowLeft, ArrowRight, ArrowUpRight, X} from '@phosphor-icons/react';
import './browser-journey.css';

// A local teaching model: no DNS lookup or network request is performed.
const SAMPLE = 'https://docs.example/guide?topic=angular#intro';

const STEPS = [
  {
    name: 'URL', title: 'Read the address',
    question: 'What did you ask the browser to open?',
    explain: 'The browser separates the scheme, hostname, port, path, query and fragment. For HTTP(S), the fragment stays in the browser: it is not part of the document request.',
    takeaway: 'A URL names a resource; it is not an IP address.',
    devtools: 'Change only a fragment (#section). Does it necessarily trigger a new document request?'
  },
  {
    name: 'DNS', title: 'Find the destination',
    question: 'How does a hostname become an IP address?',
    explain: 'If the destination is not known from a cache or reusable connection, DNS resolves a domain name through records such as A and AAAA, sometimes following aliases. The answer can vary by network and location.',
    takeaway: 'DNS answers where to connect; it does not retrieve the webpage.',
    devtools: 'Inspect Network > Timing. A DNS lookup may be absent if the browser can reuse a cached answer or connection.'
  },
  {
    name: 'Connect', title: 'Connect securely',
    question: 'How does HTTPS protect a connection?',
    explain: 'TLS helps authenticate the server and protect traffic. HTTP/1.1 and HTTP/2 generally use TLS over TCP; HTTP/3 uses QUIC with integrated TLS. Browsers may reuse established connections.',
    takeaway: 'DNS, transport, TLS and HTTP solve different problems.',
    devtools: 'Check Security for certificate information and Network for connection timing and protocol.'
  },
  {
    name: 'Request', title: 'Send the HTTP request',
    question: 'What is sent to the server?',
    explain: 'The browser requests a path, optionally with query parameters, using an HTTP method such as GET. Headers and cookies may accompany it. A fragment (#...) is not sent in the HTTP request target.',
    takeaway: 'The entire address bar string is not simply copied into the request target.',
    devtools: 'Select the document request in Network; inspect the request URL, method and headers.'
  },
  {
    name: 'Response', title: 'Read the server response',
    question: 'What comes back?',
    explain: 'An HTTP response has a status, headers and potentially a body. A page often causes more requests for CSS, scripts and images; redirects can cause additional navigation requests.',
    takeaway: 'A 404 is an HTTP response. A browser can still render its error page.',
    devtools: 'Inspect status code, response headers, body and the request waterfall in Network.'
  },
  {
    name: 'Render', title: 'Turn code into pixels',
    question: 'How does the browser display the page?',
    explain: 'HTML is parsed into the DOM; CSS builds style information (CSSOM). The browser determines visible render structures, computes layout, paints pixels and composites layers. Parsing, loading and rendering can overlap.',
    takeaway: 'The DOM describes structure. CSS and the rendering pipeline produce the visual result.',
    devtools: 'Inspect the Elements, Computed and Performance panels. Look for layout and paint work.'
  },
  {
    name: 'Interact', title: 'The page comes alive',
    question: 'What happens after the first render?',
    explain: 'JavaScript handles user events, edits the DOM and can fetch data without a full navigation. Some cross-origin fetch requests require CORS permission; top-level navigation is a different situation.',
    takeaway: 'The first render is not the end of the page lifecycle.',
    devtools: 'Inspect Event Listeners, Console and Network > Fetch/XHR while interacting with a real page.'
  }
];
const CASES = [
  {
    id: 'dns', label: 'DNS failure', step: 1, blocking: true,
    symptom: 'The browser cannot resolve the requested hostname.',
    cause: 'No usable DNS address was found. Possible causes: a typo, missing record, failed resolver, or network configuration.',
    check: 'Confirm the hostname and DNS records; compare resolvers and VPN/proxy settings.'
  },
  {
    id: 'tls', label: 'Certificate error', step: 2, blocking: true,
    symptom: 'The browser shows a connection privacy warning.',
    cause: 'The certificate cannot establish trust, for example because it expired or does not match the hostname.',
    check: 'Inspect certificate details in the Security panel. Do not bypass certificate errors in production.'
  },
  {
    id: '404', label: 'HTTP 404', step: 4, blocking: false,
    symptom: 'The server responds with 404 Not Found.',
    cause: 'The HTTP request reached a server, but it has no matching resource or route. A 404 document can still be rendered.',
    check: 'Inspect the document request, exact path, status and response body in Network.'
  }
];
function parseAddress(value) {
  try {
    const parsed = new URL(value);
    return ['https:', 'http:'].includes(parsed.protocol) && !parsed.username && !parsed.password ? parsed : null;
  } catch { return null; }
}
function StageSnapshot({index, url, scenario}) {
  const requestTarget = url.pathname + url.search;
  const samples = [
    ['PARSED ADDRESS', url.origin + requestTarget + url.hash],
    ['DNS QUESTION (SIMULATED)', 'A / AAAA  ' + url.hostname + '  →  IP address'],
    ['CONNECTION (CONCEPTUAL)', url.host + (url.protocol === 'https:' ? '  ·  HTTPS / TLS' : '  ·  HTTP, no TLS')],
    ['HTTP REQUEST (SIMULATED)', 'GET ' + requestTarget + '\nHost: ' + url.host],
    ['HTTP RESPONSE (SIMULATED)', (scenario === '404' ? '404 Not Found' : '200 OK') + '\nContent-Type: text/html'],
    ['CRITICAL RENDERING PATH', 'HTML → DOM  +  CSS → CSSOM\n→ styles → layout → paint → composite'],
    ['EVENTS & ASYNC DATA', 'User event → JavaScript → DOM updates / fetch']
  ];
  return <div className="browser-flow-snapshot">
    <span>{samples[index][0]}</span><code>{samples[index][1]}</code>
  </div>;
}

export function BrowserJourney() {
  const ref = useRef(null);
  const [address, setAddress] = useState(SAMPLE);
  const [mode, setMode] = useState('journey');
  const [step, setStep] = useState(0);
  const [caseId, setCaseId] = useState('dns');
  const [reveal, setReveal] = useState(false);
  const parsed = parseAddress(address);
  const url = parsed || parseAddress(SAMPLE);
  const scenario = mode === 'debug' ? CASES.find(item => item.id === caseId) : null;
  const lastStep = scenario?.blocking ? scenario.step : STEPS.length - 1;
  const item = STEPS[step];
  const atFailure = scenario && scenario.step === step;
  function switchMode(next) {
    setMode(next); setStep(next === 'debug' ? 1 : 0); setReveal(false);
  }
  function chooseCase(id) {
    const selected = CASES.find(item => item.id === id);
    setCaseId(id); setStep(selected.step); setReveal(false);
  }

  return <>
    <button type="button" className="url-invitation" onClick={() => ref.current?.showModal()}>
      Follow a request: DNS to pixels <ArrowUpRight size={15} aria-hidden="true"/>
    </button>
    <dialog ref={ref} className="browser-flow-dialog story-dialog" aria-labelledby="browser-flow-heading" onClick={e => {if(e.target === e.currentTarget) ref.current.close();}}>
      <button type="button" className="dialog-close circle-button" aria-label="Close request explorer" onClick={() => ref.current?.close()}><X size={22}/></button>
      <div className="dialog-scroll" tabIndex={0} role="region" aria-label="Request explorer content">
        <p className="kicker"><span>A CLOSER LOOK / WEB FUNDAMENTALS</span></p>
        <h2 id="browser-flow-heading">From a URL<br/>to pixels.</h2>
        <p className="browser-flow-intro">Follow one page request through the browser, then create a failure and find the layer responsible.</p>

        <label className="browser-flow-label" htmlFor="browser-flow-address">Try an HTTP or HTTPS address</label>
        <input id="browser-flow-address" className="browser-flow-address" type="url" value={address} spellCheck="false" aria-invalid={!parsed} aria-describedby="browser-flow-help" onChange={e => {setAddress(e.target.value); setStep(0); setMode('journey');}}/>
        <p id="browser-flow-help" className={'browser-flow-help' + (parsed ? '' : ' invalid')}>{parsed ? 'Parsed locally. This demo does not resolve DNS or make network requests.' : 'Use a valid http:// or https:// URL without embedded credentials.'}</p>

        <div className="browser-flow-modes" aria-label="Learning mode">
          <button type="button" className={mode === 'journey' ? 'selected' : ''} aria-pressed={mode === 'journey'} onClick={() => switchMode('journey')}>Walk the journey</button>
          <button type="button" className={mode === 'debug' ? 'selected' : ''} aria-pressed={mode === 'debug'} onClick={() => switchMode('debug')}>What went wrong?</button>
        </div>
        {mode === 'debug' && <div className="browser-flow-cases" aria-label="Choose simulated failure">
          {CASES.map(s => <button type="button" key={s.id} className={caseId === s.id ? 'selected' : ''} aria-pressed={caseId === s.id} onClick={() => chooseCase(s.id)}>{s.label}</button>)}
        </div>}

        <nav className="browser-flow-nav" aria-label="Journey stages"><ol>
          {STEPS.map((s, index) => <li key={s.name}>
            <button type="button" disabled={!parsed || index > lastStep} className={index === step ? 'current' : index < step ? 'passed' : ''} aria-current={index === step ? 'step' : undefined} onClick={() => {setStep(index); setReveal(false);}}>
              <span className="browser-flow-number">{index + 1}</span><span>{s.name}</span>
            </button>
          </li>)}
        </ol></nav>

        <section className="browser-flow-stage" aria-live="polite" aria-atomic="true">
          <p className="browser-flow-overline">STEP {step + 1} / {STEPS.length}</p>
          <h3>{item.title}</h3>
          <p className="browser-flow-question">{item.question}</p>
          <StageSnapshot index={step} url={url} scenario={scenario?.id}/>
          <p className="browser-flow-explain">{item.explain}</p>
          {step === 0 && <dl className="browser-flow-parts">
            <div><dt>Host</dt><dd>{url.host}</dd></div>
            <div><dt>Path + query</dt><dd>{url.pathname + url.search}</dd></div>
            <div><dt>Fragment</dt><dd>{url.hash || '(none)'}</dd></div>
          </dl>}
          <p className="browser-flow-key"><strong>KEY TAKEAWAY</strong> {item.takeaway}</p>
        </section>

        {atFailure && <section className="browser-flow-failure" aria-label="Simulated failure">
          <span>SYMPTOM / SIMULATED</span>
          <p>{scenario.symptom}</p>
          <button type="button" aria-expanded={reveal} onClick={() => setReveal(value => !value)}>
            {reveal ? 'Hide diagnosis' : 'Reveal cause & investigation'} <ArrowRight size={15}/>
          </button>
          {reveal && <div className="browser-flow-diagnosis"><p><strong>Why:</strong> {scenario.cause}</p><p><strong>Investigate:</strong> {scenario.check}</p>{scenario.id === '404' && <p>Unlike DNS or TLS failure, HTTP 404 can be followed by normal rendering. Try the next step.</p>}</div>}
        </section>}
        {mode === 'debug' && !atFailure && <p className="browser-flow-scenario">Scenario: {scenario.label}. The symptom appears at step {scenario.step + 1}.</p>}

        <div className="browser-flow-devtools"><span>CHECK IN REAL DEVTOOLS</span><p>{item.devtools}</p></div>
        <div className="browser-flow-actions">
          <button type="button" disabled={step === 0 || !parsed} onClick={() => {setStep(n => n - 1); setReveal(false);}}><ArrowLeft size={16}/> Previous</button>
          <span>{scenario?.blocking && step === lastStep ? 'This failure stops the request.' : ''}</span>
          <button type="button" disabled={step >= lastStep || !parsed} onClick={() => {setStep(n => n + 1); setReveal(false);}}>Next step <ArrowRight size={16}/></button>
        </div>

        <p className="browser-flow-disclaimer">Conceptual illustration, not a live DNS lookup, TLS handshake or HTTP trace. Real browsers may use caches, reuse connections, redirect and overlap work.</p>
        <div className="browser-flow-sources">
          <a href="https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works" target="_blank" rel="noopener noreferrer">How the Web works <ArrowUpRight size={13}/></a>
          <a href="https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path" target="_blank" rel="noopener noreferrer">Rendering path <ArrowUpRight size={13}/></a>
          <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Transport_Layer_Security" target="_blank" rel="noopener noreferrer">TLS & HTTPS <ArrowUpRight size={13}/></a>
        </div>
      </div>
    </dialog>
  </>;
}
