// A small native 3D paper renderer: three real curved meshes, typographic document
// textures and soft, separate shadows. No perspective or background is baked in.
const clamp=x=>Math.max(0,Math.min(1,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
function texturePage(kind){
 const c=document.createElement('canvas');c.width=768;c.height=1056;const x=c.getContext('2d');
 // Fine, deterministic paper grain belongs to each material, never the background.
 const grain=x.createImageData(c.width,c.height);let seed=29;for(let i=0;i<grain.data.length;i+=4){seed=(seed*1664525+1013904223)>>>0;const value=250+(seed%7)-3;grain.data.set([value,value,Math.max(0,value-1),255],i)}x.putImageData(grain,0,0);
 const wash=x.createLinearGradient(0,0,768,1056);wash.addColorStop(0,'#ffffff15');wash.addColorStop(1,'#72727808');x.fillStyle=wash;x.fillRect(0,0,768,1056);
 const text=(t,y,size=30)=>{x.fillStyle='#27282c';x.font=`${size}px Georgia, serif`;x.fillText(t,76,y)};
 const rules=(y,widths,blue=[])=>{widths.forEach((w,i)=>{x.fillStyle='#bfc1c3';x.fillRect(76,y+i*25,w,11);const accent=blue.find(b=>b[0]===i);if(accent){x.fillStyle='#3159f5';x.fillRect(76+accent[1],y+i*25,accent[2],11)}})};
 if(kind==='main'){
  text('Information Management:',159,47);text('A Proposal',219,53);text('Tim Berners-Lee',294,27);text('March 1989',333,25);
  rules(398,[584,540,496,580,300],[[2,0,119]]);
  rules(563,[580,551,416,546],[[3,261,280]]);
  rules(701,[593,526,575,483]);
  rules(865,[539,568,541,491],[[2,181,199]]);
 }else if(kind==='left'){
  text('Hypertext',157,64);
  rules(244,[555,572,430,548]);rules(362,[569,535,493,550],[[0,0,135]]);
  rules(481,[548,471,580,493],[[3,274,214]]);rules(610,[581,538,469,506]);rules(739,[549,580,485,450]);
 }else{
  text('A connected world',161,46);
  rules(245,[571,548,396,524],[[3,0,117]]);rules(365,[563,531,566,460,268]);
  rules(519,[553,483,421,523],[[3,307,212]]);rules(649,[537,568,498,433]);rules(780,[551,489,526,456]);
 }
 return c;
}
function rotate(p,r){let[x,y,z]=p;let c=Math.cos(r[0]),s=Math.sin(r[0]);[y,z]=[y*c-z*s,y*s+z*c];c=Math.cos(r[1]);s=Math.sin(r[1]);[x,z]=[x*c+z*s,-x*s+z*c];c=Math.cos(r[2]);s=Math.sin(r[2]);return[x*c-y*s,x*s+y*c,z]}
function point(pose,u,v){
 const {w,h,bend,twist,rotation,center}=pose;
 const x=(u-.5)*w+(pose.sway||0)*(v*v-.25),y=(.5-v)*h;
 // Broad, smooth deformation keeps the complete page intact, including its ink.
 const z=bend*(.5*(u-.5)*(u-.5)+v*v*.65)+twist*(u-.5)*(v-.35);
 const p=rotate([x,y,z],rotation);return p.map((a,i)=>a+center[i]);
}
const sheets=[
 {kind:'left',w:1.19,h:1.88,center:[-1.65,.96,-.52],rotation:[-.07,.35,-.13],bend:.3,twist:.08,sway:.19,delay:0,drift:[-.53,1.65,.65],turn:[-.3,-.37,-.2]},
 {kind:'main',w:2.36,h:3.34,center:[.02,-.15,.3],rotation:[-.09,-.34,.08],bend:.48,twist:-.08,sway:-.48,delay:.09,drift:[.24,2.05,.8],turn:[-.32,.46,.18]},
 {kind:'right',w:1.23,h:1.96,center:[1.65,-.91,-.3],rotation:[-.04,-.3,.025],bend:.38,twist:.07,sway:-.29,delay:.18,drift:[.58,1.67,.3],turn:[-.4,-.36,.22]}
];
function poseFor(sheet,progress){
 const p=ease((progress-sheet.delay)/(1-sheet.delay));const flex=Math.sin(p*Math.PI);
 return {...sheet,progress:p,center:sheet.center.map((a,i)=>a+sheet.drift[i]*p),rotation:sheet.rotation.map((a,i)=>a+sheet.turn[i]*p),bend:sheet.bend+flex*.38,twist:sheet.twist+flex*.18};
}
// Project the same curved geometry with Canvas 2D. This also works when a browser
// disables WebGL. Rendering happens only on scroll/resize, not on an idle loop.
export function createPaperScene(canvas){
 const ctx=canvas.getContext('2d',{alpha:true});if(!ctx)throw Error('Canvas unavailable');
 const textures=sheets.map(s=>texturePage(s.kind));
 let lastFrame='';
 const shadow=document.createElement('canvas');shadow.width=256;shadow.height=320;const shadowInk=shadow.getContext('2d');shadowInk.translate(128,160);shadowInk.scale(1,1.25);const haze=shadowInk.createRadialGradient(0,0,15,0,0,116);haze.addColorStop(0,'#34435e');haze.addColorStop(.45,'#34435ea0');haze.addColorStop(1,'#34435e00');shadowInk.fillStyle=haze;shadowInk.fillRect(-128,-128,256,256);
 function render(progress){
  const rect=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2),w=rect.width,h=rect.height;
  const key=`${w}:${h}:${dpr}:${progress.toFixed(4)}`;if(key===lastFrame)return;lastFrame=key;
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr)}
  ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
  const focal=h/(2*Math.tan(38*Math.PI/360)),project=([x,y,z])=>[w/2+x*focal/(9.7-z),h/2-y*focal/(9.7-z)];
  const poses=sheets.map(s=>poseFor(s,progress));
  function outline(p){const points=[];for(let i=0;i<=20;i++)points.push(project(point(p,i/20,0)));for(let i=1;i<=20;i++)points.push(project(point(p,1,i/20)));for(let i=19;i>=0;i--)points.push(project(point(p,i/20,1)));for(let i=19;i>0;i--)points.push(project(point(p,0,i/20)));ctx.beginPath();points.forEach((v,i)=>i?ctx.lineTo(...v):ctx.moveTo(...v));ctx.closePath()}
  for(const p of poses){ctx.save();ctx.globalAlpha=.075*(1-p.progress*.9);const pos=project([p.center[0]+.1,p.center[1]-.2,-.7]),width=p.w*focal/10.4*1.5,height=p.h*focal/10.4*1.4;ctx.translate(...pos);ctx.rotate(-p.rotation[2]);ctx.drawImage(shadow,-width/2,-height/2,width,height);ctx.restore()}
  function triangle(image,src,dst){
   const [a,b,c]=src,[p,q,r]=dst,det=a[0]*(b[1]-c[1])+b[0]*(c[1]-a[1])+c[0]*(a[1]-b[1]);
   const coeff=i=>[(p[i]*(b[1]-c[1])+q[i]*(c[1]-a[1])+r[i]*(a[1]-b[1]))/det,(p[i]*(c[0]-b[0])+q[i]*(a[0]-c[0])+r[i]*(b[0]-a[0]))/det,(p[i]*(b[0]*c[1]-c[0]*b[1])+q[i]*(c[0]*a[1]-a[0]*c[1])+r[i]*(a[0]*b[1]-b[0]*a[1]))/det];
   const [aa,cc,ee]=coeff(0),[bb,dd,ff]=coeff(1),cx=(p[0]+q[0]+r[0])/3,cy=(p[1]+q[1]+r[1])/3;
   ctx.save();ctx.beginPath();dst.forEach(([x,y],i)=>{const l=Math.hypot(x-cx,y-cy),px=x+(x-cx)/l*.45,py=y+(y-cy)/l*.45;i?ctx.lineTo(px,py):ctx.moveTo(px,py)});ctx.closePath();ctx.clip();ctx.setTransform(dpr*aa,dpr*bb,dpr*cc,dpr*dd,dpr*ee,dpr*ff);ctx.drawImage(image,0,0);ctx.restore();
  }
  for(const index of [0,2,1]){
   const p=poses[index],image=textures[index],nx=8,ny=18,grid=[];
   ctx.save();ctx.globalAlpha=1-ease((p.progress-.82)/.18);outline(p);ctx.clip();
   for(let y=0;y<=ny;y++)for(let x=0;x<=nx;x++)grid.push({src:[x/nx*image.width,y/ny*image.height],dst:project(point(p,x/nx,y/ny))});
   for(let y=0;y<ny;y++)for(let x=0;x<nx;x++){const a=y*(nx+1)+x,b=a+1,c=a+nx+1,d=c+1;for(const ids of [[a,b,c],[b,d,c]])triangle(image,ids.map(i=>grid[i].src),ids.map(i=>grid[i].dst))}
   const top=project(point(p,0,0)),bottom=project(point(p,1,1)),shade=ctx.createLinearGradient(...top,...bottom);shade.addColorStop(0,'#ffffff00');shade.addColorStop(.6,'#aaa79c05');shade.addColorStop(1,`rgba(81,84,99,${.06+Math.sin(p.progress*Math.PI)*.08})`);outline(p);ctx.fillStyle=shade;ctx.fill();ctx.restore();
   ctx.save();ctx.globalAlpha=(1-ease((p.progress-.82)/.18))*.36;outline(p);ctx.strokeStyle='#babfc9';ctx.lineWidth=.6;ctx.stroke();ctx.restore();
  }
  const alpha=1-ease(progress/.24);
  if(alpha>0){ctx.save();ctx.globalAlpha=alpha;ctx.strokeStyle='#5479f2';ctx.lineWidth=1.1;
   for(const [a,b]of [[point(poses[0],.2,.005),point(poses[1],.055,.008)],[point(poses[1],.995,.39),point(poses[2],.56,.006)]]){
    const dx=b[0]-a[0],start=project(a),end=project(b),c1=project([a[0]+dx*.3,a[1]+.36,a[2]]),c2=project([b[0]-dx*.3,b[1]+.36,b[2]]);ctx.beginPath();ctx.moveTo(...start);ctx.bezierCurveTo(...c1,...c2,...end);ctx.stroke();
    for(const p of [start,end]){const g=ctx.createRadialGradient(...p,1,...p,9);g.addColorStop(0,'#1b4aff');g.addColorStop(.28,'#3c67ff');g.addColorStop(.48,'#7097ff70');g.addColorStop(1,'#7097ff00');ctx.fillStyle=g;ctx.fillRect(p[0]-9,p[1]-9,18,18)}
   }ctx.restore();
  }
 }
 return {render,dispose(){}};
}
