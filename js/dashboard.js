let db;
initDashboard();
async function initDashboard(){requireAuth();db=await api('getDB');renderProjects()}
function calcProgress(p){let items=p.items||[];if(!items.length)return 0;return Math.round(items.filter(x=>x.actual).length/items.length*100)}
function renderProjects(){const projects=Object.values(db.projects||{});const el=document.getElementById('projectsGrid');if(!projects.length){el.innerHTML='<div class="empty-state">No hay proyectos todavía.<br>Crea tu primer proyecto para empezar.</div>';return}el.innerHTML=projects.map(p=>{let progress=calcProgress(p);let total=(p.budget||[]).reduce((a,b)=>a+(Number(b)||0),0);return `<article class="project-card"><div class="picon">${p.icon||'🗺️'}</div><div><h3>${p.name}</h3><p>${p.owner||'Sin responsable'}</p><p>Fecha compromiso: ${p.deadline||'—'}</p><p>⏱ ${p.weeks||0} semanas · ${money(total)}</p><div class="progress"><span style="width:${progress}%"></span></div><p><b>${progress}%</b> de avance</p></div><div class="open-row"><button class="btn" onclick="openProject('${p.id}')">Abrir</button></div></article>`}).join('')}
function openProject(id){let local=localDB();local.active=id;saveLocal(local);location.href='mapa.html'}
async function createNewProject(){db=await api('createProject');saveLocal(db);location.href='plan.html'}
