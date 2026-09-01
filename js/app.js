

const BUILTIN = window.SCENARIO;
const CUSTOM_KEY = "cic_academy_custom_scenario_v23";
const PROJECTS_KEY = "cic_academy_projects_v23";
const UI_KEY = "cic_academy_ui_v23";

let SCENARIO = JSON.parse(localStorage.getItem(CUSTOM_KEY) || "null") || JSON.parse(JSON.stringify(BUILTIN));
let projects = JSON.parse(localStorage.getItem(PROJECTS_KEY) || "[]");
let ui = JSON.parse(localStorage.getItem(UI_KEY) || "null") || {
  screen:"projects",
  activeProjectId:null,
  adminPhase:0,
  adminObs:0
};
let state = null;

function freshProjectState(center,typeId){
  return {
    started:true, center:center, type:typeId, phase:0, obs:0, admin:false,
    adminPhase:0, adminObs:0, health:null, check:{}, notes:{}, reveal:{}, done:{}
  };
}
function activeRecord(){ return projects.find(p=>p.id===ui.activeProjectId) || null; }
function loadActive(){
  const r=activeRecord();
  state = r ? r.data : freshProjectState(SCENARIO.defaultCancerCenter || "CIC Cancer Center","mosaiq-conversion");
}
loadActive();

function persistProjects(){ localStorage.setItem(PROJECTS_KEY,JSON.stringify(projects)); }
function persistUI(){ localStorage.setItem(UI_KEY,JSON.stringify(ui)); }
function save(){
  const r=activeRecord();
  if(r && state){
    r.data=state;
    r.updatedAt=new Date().toISOString();
    persistProjects();
  }
  persistUI();
}
function saveScenario(){ localStorage.setItem(CUSTOM_KEY,JSON.stringify(SCENARIO)); }
function uid(){ return "p_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8); }
function projectPercent(rec){
  let total=0,done=0;
  SCENARIO.phases.forEach(ph=>{
    (ph.checklist||[]).forEach((_,i)=>{
      total++;
      if(rec.data.check && rec.data.check[ph.id+":"+i]) done++;
    });
  });
  return total ? Math.round(done/total*100) : 0;
}
function formatDate(iso){
  try{return new Date(iso).toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});}
  catch{return "";}
}
function createProject(){
  const center=(document.getElementById("projectCenter")?.value||"").trim();
  const typeId=document.getElementById("projectType")?.value || SCENARIO.scenarioTypes[0].id;
  if(!center){alert("Enter a cancer center name.");return;}
  const rec={id:uid(),name:center,typeId,status:"In Progress",createdAt:new Date().toISOString(),updatedAt:new Date().toISOString(),data:freshProjectState(center,typeId)};
  projects.unshift(rec); persistProjects();
  ui.activeProjectId=rec.id; ui.screen="academy"; persistUI(); loadActive(); render();
}
function openProject(id){
  ui.activeProjectId=id; ui.screen="academy"; persistUI(); loadActive(); render();
}
function backToProjects(){
  save(); ui.screen="projects"; ui.activeProjectId=null; persistUI(); state=null; render();
}
function duplicateProject(id){
  const src=projects.find(p=>p.id===id); if(!src)return;
  const copy=JSON.parse(JSON.stringify(src));
  copy.id=uid(); copy.name=src.name+" – Copy"; copy.data.center=copy.name;
  copy.status="In Progress"; copy.createdAt=new Date().toISOString(); copy.updatedAt=copy.createdAt;
  projects.unshift(copy); persistProjects(); render();
}
function archiveProject(id){
  const p=projects.find(x=>x.id===id); if(!p)return;
  p.status=p.status==="Archived"?"In Progress":"Archived"; p.updatedAt=new Date().toISOString(); persistProjects(); render();
}
function deleteProject(id){
  if(!confirm("Delete this project and all saved progress?"))return;
  projects=projects.filter(x=>x.id!==id); persistProjects(); render();
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
function arrText(a){return (a||[]).join("\n")}
function textArr(t){return String(t||"").split("\n").map(x=>x.trim()).filter(Boolean)}
function type(){return SCENARIO.scenarioTypes.find(x=>x.id===state.type)||SCENARIO.scenarioTypes[0]}
function phase(){return SCENARIO.phases[state.phase]||SCENARIO.phases[0]}
function observation(){let p=phase();return (p.observations||[])[state.obs]||(p.observations||[])[0]}
function resetProgress(){
      if(!confirm("Reset progress for this project?")) return;
      const r=activeRecord(); if(!r)return;
      r.data=freshProjectState(r.name,r.typeId); state=r.data; persistProjects(); render();
    }
function resetContent(){if(confirm("Reset all custom content?")){localStorage.removeItem(CUSTOM_KEY);location.reload()}}
function setType(id){state.type=id;state.health={...(SCENARIO.scenarioTypes.find(x=>x.id===id)||type()).health};save();render()}
function start(){createProject()};save();render()}
function setPhase(i){state.phase=i;state.obs=0;save();render()}
function nextObs(){let p=phase();if(state.obs<(p.observations||[]).length-1)state.obs++;else if(state.phase<SCENARIO.phases.length-1){state.done[p.id]=true;state.phase++;state.obs=0}save();render()}
function prevObs(){if(state.obs>0)state.obs--;save();render()}
function toggleCheck(i){let k=phase().id+":"+i;state.check[k]=!state.check[k];save();render()}
function pct(p){let list=p.checklist||[],done=list.filter((_,i)=>state.check[p.id+":"+i]).length;return list.length?Math.round(done/list.length*100):0}
function note(f,v){state.notes[phase().id+":"+state.obs+":"+f]=v;save()}
function getNote(f){return state.notes[phase().id+":"+state.obs+":"+f]||""}
function reveal(){state.reveal[phase().id+":"+state.obs]=true;save();render()}
function isRevealed(){return state.reveal[phase().id+":"+state.obs]}
function health(){let vals=Object.values(state.health||type().health),avg=Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);return avg>=75?"Green":avg>=45?"Yellow":"Red"}


function projectCard(rec){
  const ph=SCENARIO.phases[rec.data.phase]||SCENARIO.phases[0];
  const pc=projectPercent(rec);
  const archived=rec.status==="Archived";
  return `<div class="project-card ${archived?'archived':''}">
    <div class="project-card-top">
      <div><h3>${esc(rec.name)}</h3><div class="meta">${esc((SCENARIO.scenarioTypes.find(x=>x.id===rec.typeId)||{}).name||rec.typeId)}</div></div>
      <span class="pill ${archived?'purple':'yellow'}">${esc(rec.status)}</span>
    </div>
    <div class="project-progress-label"><strong>Phase ${ph.number}: ${esc(ph.title)}</strong><span>${pc}%</span></div>
    <div class="bar"><div class="fill" style="width:${pc}%"></div></div>
    <div class="meta">Last updated ${formatDate(rec.updatedAt)}</div>
    <div class="project-actions">
      <button class="primary" onclick="openProject('${rec.id}')">${archived?'Open':'Continue Project'}</button>
      <button class="ghost" onclick="duplicateProject('${rec.id}')">Duplicate</button>
      <button class="ghost" onclick="archiveProject('${rec.id}')">${archived?'Unarchive':'Archive'}</button>
      <button class="danger" onclick="deleteProject('${rec.id}')">Delete</button>
    </div>
  </div>`;
}
function landing(){
  const active=projects.filter(p=>p.status!=="Archived");
  const archived=projects.filter(p=>p.status==="Archived");
  return `<header><h1>${esc(SCENARIO.appName||"Clinical Implementation Consulting Academy")}</h1><p>My Projects</p></header>
  <div class="projects-shell">
    <div class="projects-heading"><div><h2>My Projects</h2><p class="meta">Create, save, reopen, duplicate, and archive simulated implementation projects.</p></div></div>
    <div class="card project-create">
      <h2>Start New Project</h2>
      <div class="project-form-grid">
        <div class="field"><label>Cancer Center Name</label><input id="projectCenter" placeholder="Example: Lakeside Cancer Center"></div>
        <div class="field"><label>Project Pathway</label><select id="projectType">${SCENARIO.scenarioTypes.map(x=>`<option value="${x.id}">${esc(x.name)}</option>`).join("")}</select></div>
      </div>
      <button class="primary" onclick="createProject()">+ Create Project</button>
    </div>
    <div class="project-section"><h2>Active Projects</h2><div class="project-grid">${active.length?active.map(projectCard).join(""):`<div class="empty-state">No active projects yet. Create your first simulated project above.</div>`}</div></div>
    ${archived.length?`<div class="project-section"><h2>Archived Projects</h2><div class="project-grid">${archived.map(projectCard).join("")}</div></div>`:""}
  </div>`;
}

function sidebar(){return `<aside class="card sidebar"><button class="back-link" onclick="backToProjects()">← My Projects</button><h2>${esc(state.center)}</h2><div class="meta">${esc(type().name)}</div><p>Project Health: <span class="pill yellow">${health()}</span></p>${Object.entries(state.health||type().health).map(([k,v])=>`<div class="health-row"><span>${esc(k)}</span><div class="bar"><div class="fill" style="width:${v}%"></div></div><strong>${v}</strong></div>`).join("")}<h3>Roadmap</h3>${SCENARIO.phases.map((x,i)=>`<button class="navbtn roadmap ${i===state.phase?'current':state.done[x.id]?'done':''}" onclick="setPhase(${i})">${i===state.phase?'►':state.done[x.id]?'✓':'○'} Phase ${x.number}: ${esc(x.title)}</button>`).join("")}<button class="navbtn" onclick="state.admin=!state.admin;save();render()">${state.admin?'Exit Admin Mode':'⚙️ Admin Mode'}</button><button class="navbtn" onclick="resetProgress()">Reset Progress</button></aside>`}
function coach(){let p=phase(),pc=pct(p);return `<aside class="card coach"><h2>Coach</h2><span class="pill purple">Purpose</span><p>${esc(p.purpose)}</p><div class="result"><strong>Expert Tip:</strong> ${esc(p.tip)}</div><h3>Checklist <span class="pill ${pc===100?'green':'yellow'}">${pc}%</span></h3><div class="bar"><div class="fill" style="width:${pc}%"></div></div>${(p.checklist||[]).map((x,i)=>{let c=state.check[p.id+":"+i];return `<label class="check-item ${c?'checked':''}"><input type="checkbox" ${c?'checked':''} onchange="toggleCheck(${i})"><span>${esc(x)}</span></label>`}).join("")}</aside>`}
function scenarioCard(){let p=phase(),o=observation();if(!o)return `<div class="card"><h2>No observation yet</h2><p>Add one in Admin Mode.</p></div>`;return `<div class="card hero"><div class="meta">Phase ${p.number} · Observation ${state.obs+1} of ${(p.observations||[]).length}</div><h2>🔎 What You Notice</h2><h3>${esc(o.title)}</h3><div class="notice-card"><div class="soft"><h4>What you see</h4><ul>${(o.notice||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul></div><div class="soft"><h4>Why this caught your attention</h4><p>${esc(o.attention)}</p></div></div><div class="soft questions"><h4>Questions you might ask</h4>${(o.questions||[]).map(q=>`<label><input type="checkbox"> ${esc(q)}</label>`).join("")}</div>${(o.context||[]).length?`<details class="soft"><summary><strong>More context</strong></summary><ul>${o.context.map(x=>`<li>${esc(x)}</li>`).join("")}</ul></details>`:""}</div>`}
function workspace(){return `<div class="card workspace"><h3>📝 Your CIC Notes</h3><div class="field"><label>What seems important?</label><textarea oninput="note('important',this.value)">${esc(getNote('important'))}</textarea></div><div class="field"><label>What would you investigate next?</label><textarea oninput="note('investigate',this.value)">${esc(getNote('investigate'))}</textarea></div><div class="field"><label>Possible risk or downstream impact</label><textarea oninput="note('risk',this.value)">${esc(getNote('risk'))}</textarea></div><button class="primary" onclick="reveal()">Reveal Senior CIC Perspective</button></div>`}
function senior(){if(!isRevealed())return "";let o=observation();return `<div class="card senior"><h3>👨‍🏫 Senior CIC Perspective</h3><div class="result">${esc(o.senior)}</div><h3>⭐ What Good Looks Like</h3><ul>${(o.good||[]).map(x=>`<li>${esc(x)}</li>`).join("")}</ul><button class="ghost" onclick="prevObs()">← Previous Observation</button> <button class="primary" onclick="nextObs()">Next Observation →</button></div>`}
function main(){return `<main>${scenarioCard()}${workspace()}${senior()}</main>`}

/* ADMIN */
function blankObs(){return {title:"New observation",notice:["What the consultant sees or hears."],attention:"Why this should catch attention.",questions:["What question should the CIC ask?"],senior:"Senior CIC perspective.",good:["Document the finding.","Identify ownership.","Determine downstream impact."],context:[]}}
function adminPhase(){return SCENARIO.phases[state.adminPhase]||SCENARIO.phases[0]}
function adminObs(){let p=adminPhase();p.observations=p.observations||[];if(!p.observations[state.adminObs])p.observations[state.adminObs]=blankObs();return p.observations[state.adminObs]}
function setPhaseField(f,v){adminPhase()[f]=v;saveScenario()}
function setChecklist(v){adminPhase().checklist=textArr(v);saveScenario()}
function setObsField(f,v){adminObs()[f]=v;saveScenario()}
function setObsArray(f,v){adminObs()[f]=textArr(v);saveScenario()}
function addObs(){let p=adminPhase();p.observations=p.observations||[];p.observations.push(blankObs());state.adminObs=p.observations.length-1;saveScenario();save();render()}
function dupObs(){let p=adminPhase();let c=JSON.parse(JSON.stringify(adminObs()));c.title+=" copy";p.observations.push(c);state.adminObs=p.observations.length-1;saveScenario();save();render()}
function delObs(){let p=adminPhase();if((p.observations||[]).length<=1){alert("Each phase needs at least one observation.");return}if(confirm("Delete this observation?")){p.observations.splice(state.adminObs,1);state.adminObs=Math.max(0,state.adminObs-1);saveScenario();save();render()}}
function exportJSON(){let blob=new Blob([JSON.stringify(SCENARIO,null,2)],{type:"application/json"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="scenario.json";a.click();URL.revokeObjectURL(url)}
function importJSON(e){let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=ev=>{try{let j=JSON.parse(ev.target.result);if(!j.phases||!j.scenarioTypes)throw new Error("Invalid file");SCENARIO=j;saveScenario();state.adminPhase=0;state.adminObs=0;save();render()}catch(err){alert("Import failed: "+err.message)}};r.readAsText(f)}
function admin(){let p=adminPhase(),o=adminObs();return `<main><div class="card admin-hero"><h2>⚙️ Admin Mode</h2><p class="meta">Changes save in this browser. Export scenario.json when you want to keep/share them.</p><button class="ghost" onclick="state.admin=false;save();render()">Exit Admin Mode</button> <button class="primary" onclick="exportJSON()">Export scenario.json</button> <button class="ghost" onclick="document.getElementById('importFile').click()">Import scenario.json</button> <input id="importFile" type="file" accept=".json" style="display:none" onchange="importJSON(event)"> <button class="ghost" onclick="resetContent()">Reset Built-In Content</button></div><div class="card"><h3>Edit Phase</h3><div class="field"><label>Select Phase</label><select onchange="state.adminPhase=parseInt(this.value);state.adminObs=0;save();render()">${SCENARIO.phases.map((ph,i)=>`<option value="${i}" ${i===state.adminPhase?'selected':''}>Phase ${ph.number}: ${esc(ph.title)}</option>`).join("")}</select></div><div class="field"><label>Phase Title</label><input value="${esc(p.title)}" oninput="setPhaseField('title',this.value)"></div><div class="field"><label>Purpose</label><textarea oninput="setPhaseField('purpose',this.value)">${esc(p.purpose)}</textarea></div><div class="field"><label>Expert Tip</label><textarea oninput="setPhaseField('tip',this.value)">${esc(p.tip)}</textarea></div><div class="field"><label>Checklist Items — one per line</label><textarea oninput="setChecklist(this.value)">${esc(arrText(p.checklist))}</textarea></div></div><div class="card"><h3>Edit Observations</h3><div class="field"><label>Select Observation</label><select onchange="state.adminObs=parseInt(this.value);save();render()">${(p.observations||[]).map((ob,i)=>`<option value="${i}" ${i===state.adminObs?'selected':''}>${i+1}. ${esc(ob.title)}</option>`).join("")}</select></div><button class="primary" onclick="addObs()">Add</button> <button class="ghost" onclick="dupObs()">Duplicate</button> <button class="ghost" onclick="delObs()">Delete</button><div class="field"><label>Title</label><input value="${esc(o.title)}" oninput="setObsField('title',this.value)"></div><div class="field"><label>What You See — one per line</label><textarea oninput="setObsArray('notice',this.value)">${esc(arrText(o.notice))}</textarea></div><div class="field"><label>Why This Caught Attention</label><textarea oninput="setObsField('attention',this.value)">${esc(o.attention)}</textarea></div><div class="field"><label>Questions — one per line</label><textarea oninput="setObsArray('questions',this.value)">${esc(arrText(o.questions))}</textarea></div><div class="field"><label>Senior CIC Perspective</label><textarea oninput="setObsField('senior',this.value)">${esc(o.senior)}</textarea></div><div class="field"><label>What Good Looks Like — one per line</label><textarea oninput="setObsArray('good',this.value)">${esc(arrText(o.good))}</textarea></div><div class="field"><label>More Context — optional, one per line</label><textarea oninput="setObsArray('context',this.value)">${esc(arrText(o.context))}</textarea></div></div></main>`}
function render(){
  let el=document.getElementById("app");
  if(ui.screen==="projects" || !ui.activeProjectId){
    el.innerHTML=landing();
    return;
  }
  loadActive();
  el.innerHTML=`<header><div class="header-row"><div><h1>${esc(SCENARIO.appName||"Clinical Implementation Consulting Academy")}</h1><p>${esc(state.center)} · ${state.admin?'Admin Mode':'Phase-Based CIC Apprenticeship'}</p></div><button class="header-projects" onclick="backToProjects()">My Projects</button></div></header><div class="shell">${sidebar()}${state.admin?admin():main()}${state.admin?'':coach()}</div><div class="footer">This project saves automatically in your browser.</div>`;
}
render();
