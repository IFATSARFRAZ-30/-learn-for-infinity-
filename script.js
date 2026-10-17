const fl=document.getElementById('filters');
function applyF(f,q){let n=0;document.querySelectorAll('#cards [data-t]').forEach(c=>{const tags=(c.dataset.t||'').split(' ');const ok=(f==='all'||tags.includes(f))&&(!q||c.textContent.toLowerCase().includes(q));c.style.display=ok?'':'none';if(ok)n++});const no=document.getElementById('none');if(no)no.style.display=n?'none':'block'}
if(fl){const u=new URLSearchParams(location.search);let cur=u.get('t')||'all',q=(u.get('q')||'').toLowerCase().trim();
if(!fl.querySelector('[data-f="'+cur+'"]'))cur='all';
fl.querySelectorAll('.feed-pill').forEach(x=>x.classList.toggle('active',x.dataset.f===cur));applyF(cur,q);
fl.addEventListener('click',e=>{const f=e.target.dataset.f;if(!f)return;cur=f;fl.querySelectorAll('.feed-pill').forEach(x=>x.classList.toggle('active',x===e.target));applyF(cur,q)})}
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
document.addEventListener('click',e=>{const c=e.target.closest('[data-href]');if(c&&!e.target.closest('a'))location.href=c.dataset.href});
(function(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>io.observe(x));
const pg=document.getElementById('prog');if(pg)addEventListener('scroll',()=>{const h=document.documentElement;pg.style.width=h.scrollTop/(h.scrollHeight-h.clientHeight)*100+'%'});
document.querySelectorAll('.quiz').forEach(q=>q.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{q.querySelectorAll('.opt').forEach(x=>x.className='opt'+(x.dataset.r==='1'?' right':''));if(b.dataset.r!=='1')b.className='opt wrong';const w=q.querySelector('.why');if(w)w.style.display='block'}));
document.querySelectorAll('.flip').forEach(f=>f.onclick=()=>f.classList.toggle('on'))})();
