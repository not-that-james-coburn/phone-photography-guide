const pages=[...document.querySelectorAll(".page")];
const progress=document.getElementById("progress"), toc=document.getElementById("toc");
const tocBtn=document.getElementById("tocBtn"), closeToc=document.getElementById("closeToc");
const tocLinks=document.getElementById("tocLinks");
pages.forEach((p,i)=>{p.id=`page-${i+1}`;const title=(p.querySelector("h1,h2")?.textContent||"Page").replace(/\s+/g," ").trim();const a=document.createElement("a");a.href=`#page-${i+1}`;a.textContent=`${String(i+1).padStart(2,"0")}  ${title}`;a.onclick=()=>toc.classList.remove("open");tocLinks.appendChild(a);});
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+"%";}
addEventListener("scroll",updateProgress,{passive:true});tocBtn.onclick=()=>toc.classList.add("open");closeToc.onclick=()=>toc.classList.remove("open");document.addEventListener("keydown",e=>{if(e.key==="Escape")toc.classList.remove("open")});updateProgress();
