const fl=document.getElementById('filters');
if(fl)fl.addEventListener('click',e=>{const f=e.target.dataset.f;if(!f)return;
document.querySelectorAll('#filters .feed-pill').forEach(x=>x.classList.toggle('active',x===e.target));
document.querySelectorAll('#cards .clip-card').forEach(c=>c.style.display=(f==='all'||c.dataset.t===f)?'':'none');});
const cv=document.getElementById('trail'),cx=cv.getContext('2d'),cols=['#D6420F','#127A4F','#1F6FB2','#F0A202','#E85D4C'],LIFE=3000;
let W,H,pts=[],down=false,col=cols[0],raf=0;
function rs(){const d=devicePixelRatio||1;W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0)}
rs();addEventListener('resize',rs);
function add(x,y,br){pts.push({x,y,br,c:col,t:performance.now()})}
function go(){if(!raf)raf=requestAnimationFrame(draw)}
document.addEventListener('pointerdown',e=>{down=true;col=cols[Math.random()*cols.length|0];add(e.clientX,e.clientY,1);add(e.clientX+.1,e.clientY+.1,0);go()});
document.addEventListener('pointermove',e=>{if(down){add(e.clientX+(Math.random()-.5)*1.4,e.clientY+(Math.random()-.5)*1.4,0);go()}});
['pointerup','pointercancel'].forEach(n=>document.addEventListener(n,()=>down=false));
function draw(){raf=0;const n=performance.now();pts=pts.filter(p=>n-p.t<LIFE);cx.clearRect(0,0,W,H);cx.lineCap='round';cx.lineJoin='round';
for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];if(b.br)continue;const al=Math.max(0,1-(n-b.t)/LIFE);cx.globalAlpha=al;cx.strokeStyle=b.c;cx.lineWidth=3+3*al;cx.beginPath();cx.moveTo(a.x,a.y);cx.lineTo(b.x,b.y);cx.stroke()}
if(pts.length)raf=requestAnimationFrame(draw)}
