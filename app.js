
const {project, phases, patients, warRoomIssues, configExercise} = window.SCENARIO;
let current = 0;
let completed = JSON.parse(localStorage.getItem("cicV5Completed") || "{}");
let decisions = JSON.parse(localStorage.getItem("cicV5Decisions") || "{}");
let revealed = JSON.parse(localStorage.getItem("cicV5Revealed") || "{}");
let deliverables = JSON.parse(localStorage.getItem("cicV5Deliverables") || "{}");
let risks = JSON.parse(localStorage.getItem("cicV5Risks") || JSON.stringify(project.starterRisks));
let health = JSON.parse(localStorage.getItem("cicV5Health") || JSON.stringify(project.initialHealth));
let patientAnswers = JSON.parse(localStorage.getItem("cicV5PatientAnswers") || "{}");
let configAnswers = JSON.parse(localStorage.getItem("cicV5ConfigAnswers") || "{}");
let issueAnswers = JSON.parse(localStorage.getItem("cicV5IssueAnswers") || "{}");

function save(){localStorage.setItem("cicV5Completed",JSON.stringify(completed));localStorage.setItem("cicV5Decisions",JSON.stringify(decisions));localStorage.setItem("cicV5Revealed",JSON.stringify(revealed));localStorage.setItem("cicV5Deliverables",JSON.stringify(deliverables));localStorage.setItem("cicV5Risks",JSON.stringify(risks));localStorage.setItem("cicV5Health",JSON.stringify(health));localStorage.setItem("cicV5PatientAnswers",JSON.stringify(patientAnswers));localStorage.setItem("cicV5ConfigAnswers",JSON.stringify(configAnswers));localStorage.setItem("cicV5IssueAnswers",JSON.stringify(issueAnswers));}
function resetLab(){completed={};decisions={};revealed={};deliverables={};risks=JSON.parse(JSON.stringify(project.starterRisks));health=JSON.parse(JSON.stringify(project.initialHealth));patientAnswers={};configAnswers={};issueAnswers={};save();render();}
function label(k){return k.replace(/([A-Z])/g," $1").replace(/^./,c=>c.toUpperCase());}
function toggleTask(phaseId,taskId){let key=phaseId+":"+taskId;completed[key]=!completed[key];save();render();}
function addRisk(risk){if(!risks.find(r=>r.id===risk.id)) risks.push(risk);}
function adjustHealth(impact){Object.entries(impact||{}).forEach(([k,v])=>{health[k]=Math.max(0,Math.min(100,(health[k]||0)+v));});}
function answerDecision(phaseId,idx,opt){if(decisions[phaseId]!==undefined)return;decisions[phaseId]=idx;adjustHealth(opt.impact);save();render();}
function revealAnswer(phaseId,interview,q){let key=phaseId+":"+interview.id+":"+q.q;revealed[key]=true;if(interview.hiddenFinding&&interview.hiddenFinding.trigger===q.q){addRisk(interview.hiddenFinding.risk)}save();render();}
function updateDeliverable(phaseId,prompt,val){deliverables[phaseId+":"+prompt]=val;save();}
function phaseProgress(phase){let total=phase.tasks.length;let done=phase.tasks.filter(t=>completed[phase.id+":"+t.id]).length;return total?Math.round(done/total*100):0;}
function overallProgress(){let tasks=phases.flatMap(p=>p.tasks.map(t=>p.id+":"+t.id));let done=tasks.filter(k=>completed[k]).length;return Math.round(done/tasks.length*100);}
function overallHealth(){let vals=Object.values(health);let avg=Math.round(vals.reduce((a,b)=>a+b,0)/vals.length);return avg>=75?"Green":avg>=45?"Yellow":"Red";}
function status(v){return `<span class="pill ${v?'yes':'no'}">${v?'Yes':'No'}</span>`;}

function renderSidebar(){return `<aside class="card sidebar"><h2>${project.name}</h2><div class="meta">${project.currentOIS} → ${project.futureOIS} | ${project.emr} | ${project.tps}</div><p>Status: <strong>${project.status}</strong><br>Overall Health: <strong>${overallHealth()}</strong></p><h3>Overall Checklist</h3><div class="progress-wrap"><div class="progress-bar" style="width:${overallProgress()}%"></div></div><p class="meta">${overallProgress()}% complete</p><h3>Project Health</h3><div class="health-grid">${Object.entries(health).map(([k,v])=>`<div class="health-row"><span>${label(k)}</span><div class="progress-wrap"><div class="progress-bar" style="width:${v}%"></div></div><strong>${v}</strong></div>`).join("")}</div><h3>Project Phases</h3>${phases.map((p,i)=>`<button class="phase-btn ${i===current?'active':''}" onclick="current=${i};render();">${i+1}. ${p.title}<div class="meta">${p.week} · ${phaseProgress(p)}% complete</div></button>`).join("")}<button class="phase-btn" onclick="resetLab()">Reset Progress</button></aside>`;}
function renderProjectHeader(){
  const templates = window.SCENARIO.scenarioTemplates || [];
  return `<div class="card">
    <h2>Project Command Center <span class="badge">${project.timeline}</span></h2>
    <p><strong>Services:</strong> ${project.services.join(", ")}</p>
    <h3>Scenario Templates</h3>
    <div class="selectgrid">
      ${templates.map(t=>`
        <div class="selectcard">
          <strong>${t.level}: ${t.name}</strong>
          <div class="meta">${t.difficulty} · ${t.profile}</div>
          <p><strong>Primary Learning:</strong> ${t.primaryLearning.join(", ")}</p>
          <details><summary>Typical risks</summary><div class="result">${t.typicalRisks.join("<br>")}</div></details>
        </div>
      `).join("")}
    </div>
    <h3>Milestones</h3>
    ${project.milestones.map(m=>`<div class="milestone"><span>${m.label}</span><strong>${m.due}</strong></div>`).join("")}
  </div>`;
}
function renderTasks(phase){return `<div class="card"><h2>Consultant Checklist</h2>${phase.tasks.map(t=>{let key=phase.id+":"+t.id;return `<div class="task"><input type="checkbox" ${completed[key]?"checked":""} onchange="toggleTask('${phase.id}','${t.id}')"/><div><div class="task-title">${t.label}</div><div class="task-detail">${t.detail}</div></div><span class="task-type ${t.type}">${t.type}</span></div>`}).join("")}</div>`;}
function renderArtifacts(phase){if(!phase.artifacts||!phase.artifacts.length)return "";return `<div class="card"><h2>Artifacts to Review</h2>${phase.artifacts.map(a=>`<div class="item"><strong>${a.name}</strong><p>${a.summary}</p></div>`).join("")}</div>`;}
function renderInterviews(phase){if(!phase.interviews||!phase.interviews.length)return "";return `<div class="card"><h2>Stakeholder Interviews</h2>${phase.interviews.map(i=>`<div class="item"><strong>${i.name}</strong><span class="meta">${i.role}</span><p><strong>Objective:</strong> ${i.objective}</p>${i.questions.map(q=>{let key=phase.id+":"+i.id+":"+q.q;return `<div class="question"><strong>${q.q}</strong><br><button onclick='revealAnswer("${phase.id}", ${JSON.stringify(i)}, ${JSON.stringify(q)})'>Ask Question</button>${revealed[key]?`<div class="answer">${q.answer}</div>`:""}${revealed[key]&&i.hiddenFinding&&i.hiddenFinding.trigger===q.q?`<div class="risk"><strong>Hidden finding:</strong> ${i.hiddenFinding.finding}</div>`:""}</div>`}).join("")}</div>`).join("")}</div>`;}
function renderRiskRegister(){return `<div class="card"><h2>Living Risk Register</h2><table class="risk-table"><thead><tr><th>Risk</th><th>Severity</th><th>Impact</th><th>Mitigation</th></tr></thead><tbody>${risks.map(r=>`<tr><td>${r.risk}</td><td><strong>${r.severity}</strong></td><td>${r.impact}</td><td>${r.mitigation}</td></tr>`).join("")}</tbody></table></div>`;}
function renderDecision(phase){let d=phase.decision;let selected=decisions[phase.id];return `<div class="card"><h2>Consultant Decision</h2><p><strong>${d.prompt}</strong></p>${d.options.map((o,i)=>{let picked=selected===i;let good=i===d.best;return `<div class="option ${picked?"selected "+(good?"good":"bad"):""}" onclick='answerDecision("${phase.id}", ${i}, ${JSON.stringify(o)})'>${o.label}${picked?`<div class="result"><strong>Result:</strong> ${o.result}<br><strong>Best answer:</strong> Option ${d.best+1}</div>`:""}</div>`}).join("")}${selected!==undefined?`<div class="result"><strong>${phase.mentor}</strong></div>`:""}</div>`;}
function renderDeliverable(phase){let d=phase.deliverable;if(!d)return "";return `<div class="card"><h2>Deliverable Builder: ${d.title}</h2><p>${d.instructions}</p><div class="deliverable-grid">${d.prompts.map(p=>`<div><label><strong>${p}</strong></label><textarea oninput="updateDeliverable('${phase.id}','${p}',this.value)">${deliverables[phase.id+":"+p]||""}</textarea></div>`).join("")}</div><details style="margin-top:12px;"><summary><strong>Show expert example</strong></summary><div class="result">${d.expertExample}</div></details></div>`;}

function toggleConfig(section,item){configAnswers[section]=configAnswers[section]||{};configAnswers[section][item]=!configAnswers[section][item];save();render();}
function configScore(section){let obj=configExercise[section];let ans=configAnswers[section]||{};let correct=0;obj.items.forEach(it=>{let selected=!!ans[it], should=obj.correct.includes(it);if(selected===should)correct++;});return Math.round(correct/obj.items.length*100);}
function renderConfigExercise(){return `<div class="card"><h2>Configuration Exercise</h2><p>This appears throughout configuration phases. Select what belongs in the build.</p>${["activities","resources"].map(sec=>{let obj=configExercise[sec];return `<h3>${label(sec)} <span class="badge">${configScore(sec)}%</span></h3><p>${obj.prompt}</p><div class="selectgrid">${obj.items.map(it=>`<label class="selectcard"><input type="checkbox" ${configAnswers[sec]?.[it]?"checked":""} onchange="toggleConfig('${sec}','${it}')"> ${it}</label>`).join("")}</div><details><summary>Show expert answer</summary><div class="result">${obj.correct.join(", ")}</div></details>`}).join("")}</div>`;}

function answerIssue(i, val){issueAnswers[i]=val;save();render();}
function renderWarRoom(){return `<div class="card"><h2>Go-Live War Room</h2><p>Prioritize issues and identify the next best action.</p>${warRoomIssues.map((w,i)=>`<div class="item war"><strong>${w.time}: ${w.issue}</strong><span class="meta">Severity: ${w.severity}</span><textarea placeholder="Your next action..." oninput="answerIssue(${i},this.value)">${issueAnswers[i]||""}</textarea><details><summary>Show senior CIC response</summary><div class="result">${w.bestAction}</div></details></div>`).join("")}</div>`;}

function answerPatient(id,val){patientAnswers[id]=val;save();render();}
function patientScore(){let answered=patients.filter(p=>patientAnswers[p.id]!==undefined);if(!answered.length)return 0;let correct=answered.filter(p=>patientAnswers[p.id]===p.expectedReady).length;return Math.round(correct/answered.length*100);}
function renderPatientBoard(){return `<div class="card"><h2>Patient Readiness Board / Certification <span class="badge">${patientScore()}%</span></h2><p>Mark each patient Ready or Not Ready for treatment go-live.</p><table class="patient-table"><thead><tr><th>Patient</th><th>Dx</th><th>Reg</th><th>Rx</th><th>Plan</th><th>Imaging</th><th>Photos</th><th>Consent</th><th>Docs</th><th>Your Call</th></tr></thead><tbody>${patients.map(p=>`<tr><td><strong>${p.name}</strong><div class="meta">${p.id}</div></td><td>${p.diagnosis}</td><td>${status(p.registration)}</td><td>${status(p.prescription)}</td><td>${status(p.plan)}</td><td>${status(p.imaging)}</td><td>${status(p.setupPhotos)}</td><td>${status(p.consent)}</td><td>${status(p.documentation)}</td><td><button class="inlinebtn" onclick="answerPatient('${p.id}',true)">Ready</button> <button class="inlinebtn" onclick="answerPatient('${p.id}',false)">Not Ready</button>${patientAnswers[p.id]!==undefined?`<div class="result"><strong>${patientAnswers[p.id]===p.expectedReady?"Correct":"Review"}</strong>: ${p.reason}</div>`:""}</td></tr>`).join("")}</tbody></table></div>`;}

function renderSpecial(phase){let html=""; if(["tbox","production-config"].includes(phase.id)) html+=renderConfigExercise(); if(phase.id==="emr-go-live") html+=renderWarRoom(); if(["cutover","treatment-go-live"].includes(phase.id)) html+=renderPatientBoard(); return html;}
function renderPhase(){let phase=phases[current];return `<main><div class="card"><h2>${phase.title} <span class="badge">${phase.week}</span></h2><p>${phase.goal}</p></div><div class="grid"><div>${renderTasks(phase)}${renderDecision(phase)}${renderDeliverable(phase)}${renderSpecial(phase)}</div><div>${renderArtifacts(phase)}${renderInterviews(phase)}${renderRiskRegister()}</div></div></main>`;}
function render(){document.getElementById("app").innerHTML=`<header><h1>CIC Project Lab v5</h1><p>Full lifecycle simulation: Discovery → OSA → Guide → Configuration → Interfaces → Training → Go-Live → Cutover → Treatment Certification.</p></header><div class="app">${renderSidebar()}<div>${renderProjectHeader()}${renderPhase()}</div></div><div class="footer">Progress, risks, deliverables, configuration exercises, war room notes, and patient readiness decisions save locally in your browser.</div>`;}
render();
