const pages=[...document.querySelectorAll(".page")];
const progress=document.getElementById("progress"), toc=document.getElementById("toc");
const tocBtn=document.getElementById("tocBtn"), closeToc=document.getElementById("closeToc");
const tocLinks=document.getElementById("tocLinks");
pages.forEach((p,i)=>{p.id=`page-${i+1}`;const title=(p.querySelector("h1,h2")?.textContent||"Page").replace(/\s+/g," ").trim();const a=document.createElement("a");a.href=`#page-${i+1}`;a.textContent=`${String(i+1).padStart(2,"0")}  ${title}`;a.onclick=()=>toc.classList.remove("open");tocLinks.appendChild(a);});
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+"%";}
addEventListener("scroll",updateProgress,{passive:true});
tocBtn.onclick=()=>{toc.classList.add("open");toc.setAttribute("aria-hidden","false")};
closeToc.onclick=()=>{toc.classList.remove("open");toc.setAttribute("aria-hidden","true")};
document.addEventListener("keydown",e=>{if(e.key==="Escape"){toc.classList.remove("open");toc.setAttribute("aria-hidden","true")}});

document.querySelectorAll('[data-light-demo]').forEach(panel=>{
  const slider=panel.querySelector('#lightSlider'), value=panel.querySelector('#lightValue'), caption=panel.querySelector('#lightCaption');
  const soft=panel.closest('.page').querySelector('.light-photo');
  const apply=v=>{slider.value=v; value.textContent=`${v}%`; if(soft){soft.style.filter=`brightness(${0.88+v/100*0.22}) contrast(${1.18-v/100*0.32}) saturate(${0.94+v/100*0.08})`;} caption.textContent=v<35?'Soft light: gentler contrast and smoother transitions.':v>70?'Harder light: stronger highlights and shadows.':'Balanced light: a useful middle ground.';panel.querySelectorAll('button').forEach(b=>b.classList.toggle('active',Number(b.dataset.light)===Number(v)));};
  slider.addEventListener('input',e=>apply(e.target.value)); panel.querySelectorAll('button[data-light]').forEach(b=>b.addEventListener('click',()=>apply(b.dataset.light))); apply(50);
});

document.querySelectorAll('[data-zoom-demo]').forEach(lab=>{
  const stage=lab.querySelector('.zoom-stage'), img=lab.querySelector('#zoomImage'), label=lab.querySelector('#zoomLabel'), caption=lab.querySelector('#zoomCaption');
  lab.querySelectorAll('button[data-zoom]').forEach(btn=>btn.addEventListener('click',()=>{
    const closer=btn.dataset.stepCloser==='true'; const mode=closer?'closer':Number(btn.dataset.zoom)>1?'digital':'wide';
    stage.dataset.mode=mode; lab.querySelectorAll('button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
    if(mode==='wide'){img.style.transform='scale(1)'; label.textContent='1× — wider view'; caption.textContent='The sign is part of the scene. Now try changing your position.';}
    if(mode==='digital'){img.style.transform='scale(1.7)'; label.textContent='1.7× — digital crop'; caption.textContent='The phone enlarged the same pixels. Detail can become softer.';}
    if(mode==='closer'){img.style.transform='scale(1.7)'; label.textContent='STEP CLOSER — same framing, better starting detail'; caption.textContent='Moving closer changes the perspective and gives the phone more original detail to work with.';}
  }));
});
updateProgress();
