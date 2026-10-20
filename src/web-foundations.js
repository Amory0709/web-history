// Supporting infrastructure and web protocol milestones. Dates refer to documented RFCs / standards, not first deployment.
export const foundationMilestones = [
  {
    "year": 1983,
    "title": "DNS proposed",
    "kind": "Infrastructure",
    "detail": "Paul Mockapetris publishes RFC 882 and RFC 883. Distributed domain names and resource records make names easier to manage than a single central host table. DNS predates the World Wide Web.",
    "src": "RFC 882 · November 1983",
    "url": "https://www.rfc-editor.org/info/rfc882/",
    "near": "web"
  },
  {
    "year": 1987,
    "title": "DNS standardized",
    "kind": "Infrastructure",
    "detail": "RFC 1034 and RFC 1035 supersede the original DNS specifications. They describe the concepts and implementation used by DNS resolvers and name servers.",
    "src": "RFC 1034/1035 · November 1987",
    "url": "https://www.rfc-editor.org/info/rfc1034/",
    "near": "web"
  },
  {
    "year": 1996,
    "title": "CSS1 recommended",
    "kind": "Rendering foundation",
    "detail": "The W3C publishes CSS Level 1 as a Recommendation. A common stylesheet language lets browsers derive presentation from structured documents; today's rendering engines extend these foundations dramatically.",
    "src": "W3C CSS1 · December 1996",
    "url": "https://www.w3.org/TR/REC-CSS1/",
    "near": "css"
  },
  {
    "year": 1997,
    "title": "HTTP/1.1 standardized",
    "kind": "Web protocol",
    "detail": "RFC 2068 defines HTTP/1.1, bringing standardized features including persistent connections and improved request handling. Its 1997 RFC is an early standard, not the date all browsers changed at once.",
    "src": "RFC 2068 · January 1997",
    "url": "https://www.rfc-editor.org/info/rfc2068/",
    "near": "dom"
  },
  {
    "year": 1998,
    "title": "DOM Level 1",
    "kind": "Rendering foundation",
    "detail": "The W3C publishes DOM Level 1, a standard programming interface to document structure. Together with CSS, the DOM helps explain how modern browsers represent, style and update pages; there is no single invention date for the rendering pipeline.",
    "src": "W3C DOM Level 1 · October 1998",
    "url": "https://www.w3.org/TR/1998/REC-DOM-Level-1-19981001/",
    "near": "dom"
  },
  {
    "year": 1999,
    "title": "TLS 1.0 standardized",
    "kind": "Secure connections",
    "detail": "RFC 2246 specifies Transport Layer Security 1.0, building on earlier SSL work. HTTPS can protect HTTP exchanges with authenticated encrypted transport. TLS 1.0 is historical and must not be recommended for new deployments.",
    "src": "RFC 2246 · January 1999",
    "url": "https://www.rfc-editor.org/info/rfc2246/",
    "near": "dom"
  },
  {
    "year": 2015,
    "title": "HTTP/2 standardized",
    "kind": "Web protocol",
    "detail": "RFC 7540 standardizes HTTP/2, which introduces multiplexed streams and header compression over a connection. This is a standards milestone, not the moment every server adopted HTTP/2.",
    "src": "RFC 7540 · May 2015",
    "url": "https://www.rfc-editor.org/info/rfc7540/",
    "near": "offline"
  },
  {
    "year": 2022,
    "title": "HTTP/3 standardized",
    "kind": "Web protocol",
    "detail": "RFC 9114 specifies HTTP/3, carrying HTTP semantics over QUIC. QUIC offers multiplexed streams and integrates secure transport; actual use depends on browser, server and network support.",
    "src": "RFC 9114 · June 2022",
    "url": "https://www.rfc-editor.org/rfc/rfc9114.html",
    "near": "webgpu"
  }
];
