const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.site-nav');
function closeMenu(){navigation?.classList.remove('is-open');menuButton?.setAttribute('aria-expanded','false');if(menuButton)menuButton.textContent='Menu +';}
menuButton?.addEventListener('click',()=>{const opened=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(opened));navigation.classList.toggle('is-open',opened);menuButton.textContent=opened?'Close -':'Menu +';});
navigation?.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton?.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
const desktop=matchMedia('(min-width:761px)');desktop.addEventListener('change',event=>{if(event.matches)closeMenu();});
const progress=document.querySelector('.reading-progress');let scrollPending=false;
function updateProgress(){if(progress){const range=document.documentElement.scrollHeight-innerHeight;progress.style.width=(range>0?Math.min(100,scrollY/range*100):0)+'%';}scrollPending=false;}
addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(updateProgress);}},{passive:true});addEventListener('resize',updateProgress);updateProgress();
const filters=document.querySelectorAll('[data-filter]');
filters.forEach(button=>button.addEventListener('click',()=>{filters.forEach(item=>item.setAttribute('aria-pressed',String(item===button)));let count=0;document.querySelectorAll('[data-project-type]').forEach(project=>{project.hidden=button.dataset.filter!=='all'&&project.dataset.projectType!==button.dataset.filter;if(!project.hidden)count++;});const label=document.querySelector('.project-count');if(label)label.textContent=String(count).padStart(2,'0')+' SELECTED '+(count===1?'PROJECT':'PROJECTS');}));
let toastTimer;
function notify(message){const toast=document.querySelector('.toast');if(!toast)return;clearTimeout(toastTimer);toast.textContent=message;toast.hidden=false;toastTimer=setTimeout(()=>{toast.hidden=true;},4000);}
document.querySelectorAll('[data-copy-email]').forEach(button=>button.addEventListener('click',async()=>{try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText('john.bibibi@gmail.com');notify('Email address copied.');button.textContent='Copied ✓';setTimeout(()=>{button.textContent='Copy email';},2500);}catch{notify('Copy this address: john.bibibi@gmail.com');const address=document.querySelector('.email-address');if(address){const range=document.createRange();range.selectNodeContents(address);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);}}}));
const chart=document.querySelector('[data-brand-chart]');
if(chart){const rawRows=Array.from(document.querySelectorAll('#brand-table tbody tr')).map(row=>({label:row.cells[0].textContent,count:Number(row.cells[1].textContent)}));const normalise=document.querySelector('#normalise');const limit=document.querySelector('#chart-limit');const tableBody=document.querySelector('#brand-table tbody');
function renderChart(){const records=new Map();rawRows.forEach(({label,count})=>{const key=normalise.checked?label.trim().toUpperCase():label;records.set(key,(records.get(key)||0)+count);});const rows=Array.from(records,([label,count])=>({label,count})).sort((a,b)=>b.count-a.count||a.label.localeCompare(b.label));const selected=rows.slice(0,Number(limit.value));const scale=800;chart.replaceChildren(...selected.map(({label,count})=>{const row=document.createElement('div');row.className='chart-row';const labelElement=document.createElement('span');labelElement.className='chart-label';labelElement.textContent=label;const track=document.createElement('div');track.className='chart-track';track.setAttribute('aria-hidden','true');const bar=document.createElement('div');bar.className='chart-bar';bar.style.setProperty('--bar',count/scale*100+'%');track.append(bar);const value=document.createElement('span');value.className='chart-value';value.textContent=count;row.append(labelElement,track,value);return row;}));tableBody.replaceChildren(...rows.map(({label,count})=>{const row=document.createElement('tr');const name=document.createElement('td');name.textContent=label;const value=document.createElement('td');value.textContent=count;row.append(name,value);return row;}));document.querySelector('#chart-status').textContent=`Top ${selected.length} of ${rows.length} ${normalise.checked?'case-normalised':'original'} labels. Record counts, not sales.`;document.querySelector('#table-caption').textContent=`All ${rows.length} ${normalise.checked?'case-normalised':'original'} labels, ordered by record count`;}
normalise.addEventListener('change',renderChart);limit.addEventListener('change',renderChart);renderChart();}

// Native project carousel; card links and touch/trackpad scrolling remain native.
const projectRail=document.querySelector('#project-carousel');
if(projectRail){
 const previous=document.querySelector('[data-project-prev]');
 const next=document.querySelector('[data-project-next]');
 const position=document.querySelector('.carousel-position');
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
 const visibleProjects=()=>Array.from(projectRail.children).filter(card=>!card.hidden);
 function updateProjectRail(){
  const cards=visibleProjects();const bounds=projectRail.getBoundingClientRect();
  const shown=cards.map((card,index)=>({rect:card.getBoundingClientRect(),index:index+1})).filter(({rect})=>Math.min(rect.right,bounds.right)-Math.max(rect.left,bounds.left)>rect.width*.5);
  previous.disabled=projectRail.scrollLeft<=2;
  next.disabled=projectRail.scrollLeft>=projectRail.scrollWidth-projectRail.clientWidth-2;
  const first=shown[0]?.index||0;const last=shown.at(-1)?.index||0;
  position.textContent=(first===last?String(first):`${first}-${last}`)+` / ${cards.length}`;
 }
 function moveProjectRail(direction){
  const card=visibleProjects()[0];if(!card)return;
  const gap=parseFloat(getComputedStyle(projectRail).columnGap)||0;
  projectRail.scrollBy({left:direction*(card.getBoundingClientRect().width+gap),behavior:reducedMotion.matches?'instant':'smooth'});
 }
 previous.addEventListener('click',()=>moveProjectRail(-1));next.addEventListener('click',()=>moveProjectRail(1));
 projectRail.addEventListener('keydown',event=>{if(event.target!==projectRail)return;if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();moveProjectRail(event.key==='ArrowLeft'?-1:1);}});
 projectRail.addEventListener('scroll',updateProjectRail,{passive:true});
 document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{projectRail.scrollTo({left:0,behavior:'instant'});requestAnimationFrame(updateProjectRail);}));
 new ResizeObserver(updateProjectRail).observe(projectRail);
 document.fonts?.ready.then(updateProjectRail);updateProjectRail();
}
