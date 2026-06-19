window.SCENARIO = {
  "project": {
    "id": "cic-cancer-center",
    "name": "CIC Cancer Center",
    "status": "Full Lifecycle Simulation",
    "health": "Yellow",
    "timeline": "26 weeks",
    "currentOIS": "MOSAIQ",
    "futureOIS": "ARIA",
    "emr": "Epic",
    "tps": "Eclipse",
    "customerType": "Hospital-Owned Radiation Oncology Department",
    "services": [
      "AOS Premier RO Configuration",
      "AOS Interop Consultant Engagement",
      "EMR Training",
      "EMR Go-Live Support",
      "Treatment Go-Live Support"
    ],
    "milestones": [
      {
        "label": "Discovery",
        "due": "Week 1"
      },
      {
        "label": "Pre-OSA",
        "due": "Week 2"
      },
      {
        "label": "On Site Assessment",
        "due": "Week 4"
      },
      {
        "label": "Implementation Guide",
        "due": "Week 6"
      },
      {
        "label": "Configuration Prep",
        "due": "Week 8"
      },
      {
        "label": "TBox Configuration",
        "due": "Week 9"
      },
      {
        "label": "Production Configuration",
        "due": "Week 11"
      },
      {
        "label": "Interface Testing",
        "due": "Week 13"
      },
      {
        "label": "Training Prep",
        "due": "Week 15"
      },
      {
        "label": "EMR Training",
        "due": "Week 16"
      },
      {
        "label": "EMR Go-Live",
        "due": "Week 18"
      },
      {
        "label": "Cutover Prep",
        "due": "Week 20"
      },
      {
        "label": "Treatment Go-Live",
        "due": "Week 22"
      },
      {
        "label": "Post-Go-Live",
        "due": "Week 26"
      }
    ],
    "starterRisks": [
      {
        "id": "r-interface",
        "risk": "Interface scope and testing timeline are not fully defined.",
        "severity": "High",
        "impact": "ADT, documents, and charges may fail during testing or go-live.",
        "mitigation": "Review interoperability plan, connect with Epic analyst, confirm mapping and testing timeline."
      },
      {
        "id": "r-timeline",
        "risk": "Customer wants to accelerate the project.",
        "severity": "Medium",
        "impact": "Workflow discovery, training, and go-live readiness may be compressed.",
        "mitigation": "Communicate dependencies and review readiness before supporting timeline changes."
      }
    ],
    "initialHealth": {
      "customer": 60,
      "workflow": 40,
      "configuration": 15,
      "interface": 25,
      "training": 5,
      "treatment": 5,
      "goLive": 10
    }
  },
  "phases": [
    {
      "id": "discovery",
      "title": "Project Discovery & Initiation",
      "week": "Week 1",
      "goal": "Understand what was sold, who is involved, what systems are impacted, and where the project could fail later.",
      "tasks": [
        {
          "id": "d1",
          "label": "Review Unity project record",
          "type": "Required",
          "detail": "Confirm work orders, project ownership, and key dates."
        },
        {
          "id": "d2",
          "label": "Review Sales Order, Quote, and EPOT",
          "type": "Required",
          "detail": "Confirm purchased services, scope, consulting package, and deliverables."
        },
        {
          "id": "d3",
          "label": "Review customer account and past trip reports",
          "type": "Recommended",
          "detail": "Look for previous risks, customer preferences, and stakeholder context."
        },
        {
          "id": "d4",
          "label": "Review Installed Base",
          "type": "Required",
          "detail": "Confirm current systems, machines, MOSAIQ footprint, Eclipse, and device dependencies."
        },
        {
          "id": "d5",
          "label": "Review software planning document",
          "type": "Required",
          "detail": "Understand installation timeline and environment readiness."
        },
        {
          "id": "d6",
          "label": "Review interoperability planning document",
          "type": "Required",
          "detail": "Confirm ADT, documents, charges, analyst, and testing timeline."
        },
        {
          "id": "d7",
          "label": "Meet with OSM",
          "type": "Required",
          "detail": "Ask about customer goals, concerns, readiness, and assessment risks."
        },
        {
          "id": "d8",
          "label": "Connect with Project Manager",
          "type": "Required",
          "detail": "Confirm timeline, weekly calls, kickoff call, scope, and schedule risks."
        },
        {
          "id": "d9",
          "label": "Obtain stakeholder contact list",
          "type": "Required",
          "detail": "Identify admin, physicians, physicist, dosimetrist, therapists, nurse, IT, interface analyst, and PM."
        },
        {
          "id": "d10",
          "label": "Create initial risk register",
          "type": "Deliverable",
          "detail": "Document interface, timeline, scope, stakeholder, and training risks."
        }
      ],
      "artifacts": [
        {
          "name": "Sales Order / Quote",
          "summary": "Includes Premier RO Configuration, Interop Consulting, EMR Training, EMR Go-Live, and Treatment Go-Live."
        },
        {
          "name": "Installed Base",
          "summary": "One LINAC, one CT simulator, MOSAIQ, Epic, Eclipse."
        },
        {
          "name": "Interoperability Planning Document",
          "summary": "ADT inbound, documents outbound, charges outbound. Testing timeline not finalized."
        }
      ],
      "interviews": [
        {
          "id": "osim",
          "name": "OSM",
          "role": "Oncology Solutions Manager",
          "objective": "Understand what was learned before handoff and identify early account risks.",
          "questions": [
            {
              "q": "What was the customer's main reason for purchasing ARIA?",
              "answer": "They want to replace MOSAIQ and improve documentation consistency."
            },
            {
              "q": "What concerns do you have about this account?",
              "answer": "They are treating this like a software install, but they need workflow redesign."
            },
            {
              "q": "Who seems to be the real decision maker?",
              "answer": "Denise controls operations, but Dr. Mitchell can derail adoption if he is not engaged."
            }
          ],
          "hiddenFinding": {
            "trigger": "What concerns do you have about this account?",
            "finding": "The customer is underestimating workflow change.",
            "risk": {
              "id": "r-workflow-underestimated",
              "risk": "Customer underestimates workflow redesign effort.",
              "severity": "High",
              "impact": "Configuration and training may be built around assumptions instead of actual workflows.",
              "mitigation": "Set expectations during intro call and protect OSA time."
            }
          }
        }
      ],
      "risks": [],
      "decision": {
        "prompt": "You learn the quote includes interoperability consulting, but the customer says Epic already sends information everywhere. What do you do?",
        "options": [
          {
            "label": "Focus only on ARIA configuration.",
            "result": "Interface risk is missed and testing will likely fail later.",
            "impact": {
              "interface": -20,
              "customer": -5
            }
          },
          {
            "label": "Review the interop plan, identify interfaces, connect with the analyst, and clarify the testing timeline.",
            "result": "Correct. Interface risk is identified early and Kevin is brought into planning.",
            "impact": {
              "interface": 20,
              "workflow": 5,
              "customer": 5
            }
          },
          {
            "label": "Wait until go-live to see if interfaces work.",
            "result": "Critical risk is deferred until too late.",
            "impact": {
              "interface": -30,
              "goLive": -10
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: interface issues usually appear late, but they are created early. Discovery is where you connect scope, workflow, and testing.",
      "deliverable": {
        "title": "Initial Risk Register",
        "instructions": "Before exiting Discovery, write at least three risks with impact and mitigation.",
        "prompts": [
          "Risk",
          "Impact",
          "Mitigation"
        ],
        "expertExample": "Risk: Interface scope/testing timeline unclear. Impact: ADT/document/charge testing may fail or delay go-live. Mitigation: Review interop plan, meet with Epic analyst, confirm test scripts and timeline."
      },
      "exercise": null
    },
    {
      "id": "pre-osa",
      "title": "Pre-On Site Assessment",
      "week": "Week 2",
      "goal": "Prepare the customer, internal team, and agenda so the OSA produces usable workflow and configuration information.",
      "tasks": [
        {
          "id": "p1",
          "label": "Prepare introductory call talking points",
          "type": "Required",
          "detail": "Explain consulting services, deliverables, expectations, and why assessment matters."
        },
        {
          "id": "p2",
          "label": "Attend project kickoff call",
          "type": "Required",
          "detail": "Listen for expectations, timeline pressure, unclear scope, and missing stakeholders."
        },
        {
          "id": "p3",
          "label": "Schedule introductory call with customer",
          "type": "Required",
          "detail": "Do this before locking the OSA schedule."
        },
        {
          "id": "p4",
          "label": "Determine customer goals",
          "type": "Required",
          "detail": "Identify business goals, clinical goals, pain points, and success criteria."
        },
        {
          "id": "p5",
          "label": "Determine ROAPM or MIPS/QPP status",
          "type": "Required",
          "detail": "Capture quality reporting needs early."
        },
        {
          "id": "p6",
          "label": "Establish communication preferences and points of contact",
          "type": "Required",
          "detail": "Clarify who owns decisions and how updates will be sent."
        },
        {
          "id": "p7",
          "label": "Establish OSA date and agenda",
          "type": "Required",
          "detail": "Make sure the right people are available long enough to complete assessment."
        },
        {
          "id": "p8",
          "label": "Request pre-OSA documents",
          "type": "Required",
          "detail": "Charge master, appointment list, task list, clinical documents, reports, staffing, screenshots."
        },
        {
          "id": "p9",
          "label": "Prepare Acknowledgement of Services",
          "type": "Required",
          "detail": "Have the document ready for onsite signature."
        },
        {
          "id": "p10",
          "label": "Start Consulting Implementation Guide template",
          "type": "Deliverable",
          "detail": "Begin structure before the OSA so findings can be captured efficiently."
        }
      ],
      "artifacts": [],
      "interviews": [
        {
          "id": "denise",
          "name": "Denise",
          "role": "Director of Oncology Services",
          "objective": "Set expectations around OSA time, attendance, documents, and outcomes.",
          "questions": [
            {
              "q": "What does success look like for this project?",
              "answer": "Going live on time with minimal disruption to clinic."
            },
            {
              "q": "Who needs to participate in OSA interviews?",
              "answer": "Physicians, therapists, physics, dosimetry, front desk, and maybe nursing."
            },
            {
              "q": "Are you attesting for MIPS/QPP?",
              "answer": "Yes, we are planning for MIPS next year."
            }
          ],
          "hiddenFinding": {
            "trigger": "Are you attesting for MIPS/QPP?",
            "finding": "MIPS/QPP reporting is in scope for workflow awareness.",
            "risk": {
              "id": "r-mips",
              "risk": "MIPS/QPP needs may be missed during workflow design.",
              "severity": "Medium",
              "impact": "Quality measure workflows may require rework during configuration or training.",
              "mitigation": "Capture reporting needs and ensure workflow/configuration design supports them."
            }
          }
        },
        {
          "id": "rachel",
          "name": "Rachel",
          "role": "Nurse Navigator",
          "objective": "Identify referral, navigation, authorization, and follow-up workflows.",
          "questions": [
            {
              "q": "How do referrals reach your department today?",
              "answer": "Some come through Epic, some by fax, and some by direct physician office calls."
            },
            {
              "q": "What do you track outside the system?",
              "answer": "I keep a spreadsheet for referral status and follow-up tasks."
            },
            {
              "q": "What would be risky if we missed your workflow?",
              "answer": "Patients could fall through the cracks before consult or after treatment."
            }
          ],
          "hiddenFinding": {
            "trigger": "What do you track outside the system?",
            "finding": "Nurse navigation relies on a spreadsheet outside MOSAIQ/Epic.",
            "risk": {
              "id": "r-navigation-spreadsheet",
              "risk": "Referral/navigation tracking exists outside the system.",
              "severity": "High",
              "impact": "Future-state workflow may miss referral status, follow-up, and care coordination.",
              "mitigation": "Include navigator workflow in OSA and implementation guide."
            }
          }
        }
      ],
      "risks": [
        "Customer offers only one day for OSA.",
        "Physician availability is limited.",
        "Nurse navigation was not on the original stakeholder list."
      ],
      "decision": {
        "prompt": "Customer offers only one day for the OSA and says they already know their workflows. What is the best response?",
        "options": [
          {
            "label": "Accept one day and keep the customer happy.",
            "result": "You may miss key workflows, documents, and hidden stakeholders.",
            "impact": {
              "workflow": -15,
              "customer": 5
            }
          },
          {
            "label": "Explain what must be accomplished during OSA and recommend enough time with the right stakeholders.",
            "result": "Correct. You protect the quality of discovery and future configuration.",
            "impact": {
              "workflow": 20,
              "customer": 5
            }
          },
          {
            "label": "Skip interviews and use questionnaires only.",
            "result": "You lose the ability to uncover hidden workflow and adoption risks.",
            "impact": {
              "workflow": -25,
              "training": -10
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: saving one day during OSA can cost weeks later. OSA is where you prevent configuration rework.",
      "deliverable": {
        "title": "OSA Agenda Draft",
        "instructions": "Draft the OSA agenda sections the customer should see before the visit.",
        "prompts": [
          "Interview Groups",
          "Documents Needed",
          "Wrap-Up Topics"
        ],
        "expertExample": "Interview Groups: Admin, physicians, physics, dosimetry, therapists, nursing/navigation, scheduling/front desk, billing, IT/interface. Documents: charge master, appointments, tasks, documents, reports, screenshots. Wrap-Up: risks, decisions, next steps, proposed configuration schedule."
      },
      "exercise": null
    },
    {
      "id": "osa",
      "title": "On Site Assessment",
      "week": "Week 4",
      "goal": "Observe real operations, interview stakeholders, collect current-state artifacts, and identify workflow risks.",
      "tasks": [
        {
          "id": "o1",
          "label": "Tour site",
          "type": "Required",
          "detail": "Observe patient flow, work areas, treatment area, CT sim, and communication patterns."
        },
        {
          "id": "o2",
          "label": "Record interviewee names, roles, and contact info",
          "type": "Required",
          "detail": "Maintain accurate interview records."
        },
        {
          "id": "o3",
          "label": "Conduct OSA interviews",
          "type": "Required",
          "detail": "Interview physicians, therapists, nursing, front desk, dosimetry, physics, billing, and IT as applicable."
        },
        {
          "id": "o4",
          "label": "Collect process screenshots and document samples",
          "type": "Required",
          "detail": "Capture current documents, reports, tasks, appointment types, communication methods, and Data Admin spaces."
        },
        {
          "id": "o5",
          "label": "Obtain Charge Master / procedure codes",
          "type": "Required",
          "detail": "Needed for charge-related workflows and downstream interface decisions."
        },
        {
          "id": "o6",
          "label": "Determine hospital and department naming conventions",
          "type": "Required",
          "detail": "Naming decisions affect configuration, reporting, training, and support."
        },
        {
          "id": "o7",
          "label": "Hold OSA wrap-up meeting",
          "type": "Required",
          "detail": "Review findings, risks, change opportunities, next steps, and proposed consulting plan."
        },
        {
          "id": "o8",
          "label": "Complete trip report and close work order",
          "type": "Deliverable",
          "detail": "Document onsite findings and share with appropriate internal stakeholders."
        }
      ],
      "artifacts": [
        {
          "name": "Therapist Paper Reminder Sheet",
          "summary": "Used for setup reminders not tracked in MOSAIQ."
        },
        {
          "name": "MOSAIQ Appointment List",
          "summary": "Current appointment names are inconsistent and include local shorthand."
        },
        {
          "name": "Clinical Document Samples",
          "summary": "Physicians use different documentation styles."
        }
      ],
      "interviews": [
        {
          "id": "jessica",
          "name": "Jessica",
          "role": "Lead Therapist",
          "objective": "Validate daily treatment workflow, setup communication, and undocumented workarounds.",
          "questions": [
            {
              "q": "Walk me through a normal treatment day.",
              "answer": "We check the schedule, review setup notes, coordinate with physics if something looks off, then treat."
            },
            {
              "q": "What do you track outside MOSAIQ?",
              "answer": "We use a whiteboard and paper notes for setup reminders and special instructions."
            },
            {
              "q": "Why do you use the whiteboard?",
              "answer": "People trust it more than the system for quick setup reminders. Missing this could affect treatment flow."
            }
          ],
          "hiddenFinding": {
            "trigger": "Why do you use the whiteboard?",
            "finding": "Therapist whiteboard carries safety-relevant setup reminders.",
            "risk": {
              "id": "r-setup-whiteboard",
              "risk": "Therapist setup reminders are tracked outside the system.",
              "severity": "High",
              "impact": "If not converted into future-state workflow, treatment setup details may be missed.",
              "mitigation": "Design ARIA treatment preparation/setup note process and validate with therapists."
            }
          }
        },
        {
          "id": "mark",
          "name": "Mark",
          "role": "Chief Physicist",
          "objective": "Understand chart QA, plan approval, treatment safety, and cutover concerns.",
          "questions": [
            {
              "q": "What is your biggest concern with treatment go-live?",
              "answer": "Active patient transfer and ensuring plans, prescriptions, imaging, and setup documentation align."
            },
            {
              "q": "How do you perform chart QA today?",
              "answer": "Weekly chart checks are structured, but some communication is informal."
            },
            {
              "q": "What would make you comfortable at treatment go-live?",
              "answer": "A validated patient transfer spreadsheet and a light first treatment day."
            }
          ],
          "hiddenFinding": {
            "trigger": "What would make you comfortable at treatment go-live?",
            "finding": "Physicist expects a validated patient transfer spreadsheet and light first treatment day.",
            "risk": {
              "id": "r-cutover-readiness",
              "risk": "Treatment cutover readiness may not be sufficiently validated.",
              "severity": "High",
              "impact": "Active patient treatment could be delayed or unsafe.",
              "mitigation": "Begin cutover planning early and validate patient transfer checklist with physics."
            }
          }
        }
      ],
      "risks": [],
      "decision": {
        "prompt": "Therapists reveal a whiteboard and paper setup reminder process not documented in MOSAIQ. What do you do?",
        "options": [
          {
            "label": "Ignore it because it is not in the current system.",
            "result": "You miss a real safety workflow.",
            "impact": {
              "treatment": -25,
              "workflow": -10
            }
          },
          {
            "label": "Document it, ask why it exists, determine if ARIA should replace or support it, and add it to the risk log.",
            "result": "Correct. You capture a hidden workflow that matters for safe go-live.",
            "impact": {
              "treatment": 20,
              "workflow": 20,
              "customer": 5
            }
          },
          {
            "label": "Tell therapists to stop using paper after go-live.",
            "result": "You remove a workaround without understanding its purpose.",
            "impact": {
              "customer": -10,
              "training": -10
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: unofficial workarounds often contain the real workflow. Never dismiss them just because they are not in the system.",
      "deliverable": {
        "title": "OSA Findings Summary",
        "instructions": "Write the top findings from the OSA and how they affect the implementation guide.",
        "prompts": [
          "Finding",
          "Workflow Impact",
          "Configuration / Training Impact"
        ],
        "expertExample": "Finding: Therapists use whiteboard setup reminders. Workflow Impact: Setup communication must move into ARIA treatment preparation/setup notes. Configuration/Training Impact: Build/document treatment preparation workflow and train therapists on where to enter and verify setup details."
      },
      "exercise": null
    },
    {
      "id": "guide",
      "title": "Implementation Guide Builder",
      "week": "Week 6",
      "goal": "Turn OSA findings into future-state workflows, configuration decisions, process maps, and customer-approved direction.",
      "tasks": [
        {
          "id": "g1",
          "label": "Schedule guide review call",
          "type": "Required",
          "detail": "Set time to review findings and proposed future-state workflows."
        },
        {
          "id": "g2",
          "label": "Design referral/registration/authorization/consult workflows",
          "type": "Required",
          "detail": "Include patient entry, front desk, nursing, and physician involvement."
        },
        {
          "id": "g3",
          "label": "Design CT sim/planning/peer review workflows",
          "type": "Required",
          "detail": "Include dosimetry, physics, and physician responsibilities."
        },
        {
          "id": "g4",
          "label": "Design treatment/OTV/weekly physics/final workflows",
          "type": "Required",
          "detail": "Tie workflows to care paths, documentation, billing, and safety checks."
        },
        {
          "id": "g5",
          "label": "Populate configuration tracking spreadsheet",
          "type": "Required",
          "detail": "Capture build decisions while writing the guide."
        },
        {
          "id": "g6",
          "label": "Review draft with manager and customer",
          "type": "Deliverable",
          "detail": "Confirm workflow decisions and open items."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "One physician wants a unique workflow while another wants standardization. What do you do?",
        "options": [
          {
            "label": "Build separate workflows for each physician.",
            "result": "This weakens readiness.",
            "impact": {
              "workflow": -20,
              "training": -10
            }
          },
          {
            "label": "Facilitate governance discussion, explain standardization benefits, identify necessary exceptions, and document decisions.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "workflow": 25,
              "customer": 10,
              "training": 10
            }
          },
          {
            "label": "Force one workflow without discussion.",
            "result": "This creates avoidable risk.",
            "impact": {
              "customer": -10,
              "workflow": 5
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: standardization is not rigidity. The goal is governed variation, not uncontrolled customization.",
      "deliverable": {
        "title": "Implementation Guide Section: Referral to Consult",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Current State",
          "Future State",
          "Configuration Needed",
          "Risks / Open Decisions"
        ],
        "expertExample": "Current State: Referrals arrive through Epic, fax, and direct calls; navigator tracks status in spreadsheet. Future State: Referral captured and tracked through defined ARIA/Epic workflow with clear ownership for scheduling, authorization, and consult readiness. Configuration Needed: Activities, resources, document types, care path steps, navigator task/status tracking. Risks/Open Decisions: Interface trigger, referral ownership, reporting needs, MIPS/QPP impact."
      },
      "exercise": null
    },
    {
      "id": "config-prep",
      "title": "Configuration Preparation",
      "week": "Week 8",
      "goal": "Confirm environments, access, remote connectivity, applications, and interface dependencies before configuration begins.",
      "tasks": [
        {
          "id": "cp1",
          "label": "Prepare configuration agenda",
          "type": "Required",
          "detail": "Confirm dates, location, participants, and outcomes."
        },
        {
          "id": "cp2",
          "label": "Confirm TBox and Production databases are installed",
          "type": "Required",
          "detail": "Know which configuration belongs in each environment."
        },
        {
          "id": "cp3",
          "label": "Confirm Citrix, ARIA, and Data Admin access",
          "type": "Required",
          "detail": "Validate customer and consultant access before travel."
        },
        {
          "id": "cp4",
          "label": "Confirm Word Developer Tab and Adobe installed",
          "type": "Required",
          "detail": "Needed for document template work."
        },
        {
          "id": "cp5",
          "label": "Meet with Interface Analyst",
          "type": "Required",
          "detail": "Discuss purchased interfaces, HIS, testing timeline, and TBox requirements."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "Two days before onsite configuration, Citrix and remote access are not ready. What do you do?",
        "options": [
          {
            "label": "Travel anyway and hope it is fixed.",
            "result": "This weakens readiness.",
            "impact": {
              "configuration": -20,
              "customer": -10
            }
          },
          {
            "label": "Escalate blockers with PM/customer, identify owners, and adjust agenda if needed.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "configuration": 25,
              "customer": 5,
              "goLive": 5
            }
          },
          {
            "label": "Cancel immediately without discussing alternatives.",
            "result": "This creates avoidable risk.",
            "impact": {
              "customer": -10
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: configuration success is often decided before you arrive. Validate access early.",
      "deliverable": {
        "title": "Configuration Readiness Plan",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Blocker",
          "Owner",
          "Mitigation"
        ],
        "expertExample": "Blocker: Citrix not ready. Owner: Customer IT / PM. Mitigation: Daily readiness check, remote validation, adjust onsite agenda to focus on non-access-dependent work if needed."
      },
      "exercise": null
    },
    {
      "id": "tbox",
      "title": "TBox Configuration",
      "week": "Week 9",
      "goal": "Build interface-dependent configuration needed for testing.",
      "tasks": [
        {
          "id": "tb1",
          "label": "Configure hospitals/departments",
          "type": "Required",
          "detail": "Support routing and department-level configuration."
        },
        {
          "id": "tb2",
          "label": "Configure providers",
          "type": "Required",
          "detail": "Support orders, documents, prescriptions, and interface messages."
        },
        {
          "id": "tb3",
          "label": "Configure resources",
          "type": "Required",
          "detail": "Venues, waiting room, CT, machines, scheduling resources."
        },
        {
          "id": "tb4",
          "label": "Configure activities and codes",
          "type": "Required",
          "detail": "Align with scheduling, workflow, and interface mapping."
        },
        {
          "id": "tb5",
          "label": "Configure document types/templates",
          "type": "Required",
          "detail": "Support document workflow and outbound documents."
        },
        {
          "id": "tb6",
          "label": "Complete trip report and close work order",
          "type": "Deliverable",
          "detail": "Document what was configured and what remains open."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "Activity codes change after interface mapping begins. What do you do?",
        "options": [
          {
            "label": "Tell the analyst to update the interface and keep going.",
            "result": "This weakens readiness.",
            "impact": {
              "interface": -15,
              "configuration": -5
            }
          },
          {
            "label": "Document the change, assess downstream impact, coordinate with PM/interface analyst, and update test scripts.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "interface": 20,
              "configuration": 10,
              "goLive": 5
            }
          },
          {
            "label": "Revert all changes without discussing workflow impact.",
            "result": "This creates avoidable risk.",
            "impact": {
              "workflow": -10
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: configuration changes after mapping require change control and retesting.",
      "deliverable": {
        "title": "TBox Build Summary",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Configuration Item",
          "Testing Dependency",
          "Open Action"
        ],
        "expertExample": "Configuration Item: CT Simulation activity. Testing Dependency: Epic scheduling message and ARIA activity mapping. Open Action: Confirm final code with Kevin and update test script."
      },
      "exercise": null
    },
    {
      "id": "production-config",
      "title": "Production Configuration",
      "week": "Week 11",
      "goal": "Configure production based on the guide, best practice, pre-design configuration, and configuration tracker.",
      "tasks": [
        {
          "id": "pc1",
          "label": "Configure security/users/groups/rights",
          "type": "Required",
          "detail": "Ensure role-based access supports workflows and training."
        },
        {
          "id": "pc2",
          "label": "Configure hospital/departments/preferences",
          "type": "Required",
          "detail": "Establish organizational structure."
        },
        {
          "id": "pc3",
          "label": "Configure staff/resources/activities/procedures/codes",
          "type": "Required",
          "detail": "Core Data Admin build."
        },
        {
          "id": "pc4",
          "label": "Configure care paths and lanes",
          "type": "Required",
          "detail": "Support workflow progression and task routing."
        },
        {
          "id": "pc5",
          "label": "Configure documents/data tags/signatures",
          "type": "Required",
          "detail": "Support documentation workflows."
        },
        {
          "id": "pc6",
          "label": "Configure RT Admin and prescription templates",
          "type": "Required",
          "detail": "Support treatment workflow and planning settings."
        },
        {
          "id": "pc7",
          "label": "Hold wrap-up and update implementation guide",
          "type": "Deliverable",
          "detail": "Review build, open items, and action owners."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "Departments request different naming conventions. What do you do?",
        "options": [
          {
            "label": "Build exactly what each department requests.",
            "result": "This weakens readiness.",
            "impact": {
              "configuration": -20,
              "workflow": -10
            }
          },
          {
            "label": "Explain standardization impact, propose naming standards, and document approved exceptions.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "configuration": 20,
              "workflow": 15,
              "customer": 5
            }
          },
          {
            "label": "Refuse all exceptions.",
            "result": "This creates avoidable risk.",
            "impact": {
              "customer": -5
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: naming standards protect reporting, training, and future support.",
      "deliverable": {
        "title": "Production Configuration Tracker Entry",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Build Area",
          "Decision",
          "Rationale"
        ],
        "expertExample": "Build Area: Activities. Decision: Standard naming for Consult, CT Simulation, OTV, Weekly Physics Check. Rationale: Reduces training variation and supports reporting/interface consistency."
      },
      "exercise": null
    },
    {
      "id": "interface-testing",
      "title": "Interface Testing",
      "week": "Week 13",
      "goal": "Validate that interface behavior supports real workflows in test and production-like scenarios.",
      "tasks": [
        {
          "id": "it1",
          "label": "Prepare interface test scripts",
          "type": "Required",
          "detail": "Cover ADT, documents, charges, and mapped record testing."
        },
        {
          "id": "it2",
          "label": "Participate in functional testing",
          "type": "Required",
          "detail": "Confirm individual interface functions."
        },
        {
          "id": "it3",
          "label": "Participate in integrated testing",
          "type": "Required",
          "detail": "Confirm workflows across systems."
        },
        {
          "id": "it4",
          "label": "Participate in mapped record testing",
          "type": "Required",
          "detail": "Validate real-world scenarios and mappings."
        },
        {
          "id": "it5",
          "label": "Document defects, owners, and retesting needs",
          "type": "Deliverable",
          "detail": "Track issue closure and readiness."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "Epic creates a patient, but the appointment does not appear correctly in ARIA. What do you do first?",
        "options": [
          {
            "label": "Declare the interface broken and escalate.",
            "result": "This weakens readiness.",
            "impact": {
              "interface": -10,
              "customer": -5
            }
          },
          {
            "label": "Validate the test case, mapped fields, activity/resource configuration, message content, and expected workflow outcome.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "interface": 25,
              "workflow": 10,
              "goLive": 10
            }
          },
          {
            "label": "Ask the customer to fix scheduling manually.",
            "result": "This creates avoidable risk.",
            "impact": {
              "goLive": -15
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: many interface defects are actually workflow or configuration mismatches.",
      "deliverable": {
        "title": "Interface Defect Log Entry",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Defect",
          "Likely Cause",
          "Next Step"
        ],
        "expertExample": "Defect: Appointment missing after Epic ADT/scheduling test. Likely Cause: activity/resource mapping mismatch or test case issue. Next Step: Validate message content, mapped fields, ARIA activity/resource config, and expected workflow."
      },
      "exercise": null
    },
    {
      "id": "training-prep",
      "title": "Preparing for EMR Training and Go Live",
      "week": "Week 15",
      "goal": "Make sure training is ready before trainers and users arrive.",
      "tasks": [
        {
          "id": "trp1",
          "label": "Update implementation guide",
          "type": "Required",
          "detail": "Reflect configuration and workflow decisions."
        },
        {
          "id": "trp2",
          "label": "Develop training plan and agendas",
          "type": "Required",
          "detail": "Match agendas to roles, workflows, dates, and rooms."
        },
        {
          "id": "trp3",
          "label": "Knowledge transfer to Applications Specialists",
          "type": "Required",
          "detail": "Ensure trainers understand workflows and known risks."
        },
        {
          "id": "trp4",
          "label": "Confirm rooms/computers/access",
          "type": "Required",
          "detail": "ARIA/Citrix access, Word, Excel, printers, scanners, shared folders, cameras."
        },
        {
          "id": "trp5",
          "label": "Identify super users",
          "type": "Required",
          "detail": "Functional leaders who can reinforce workflows."
        },
        {
          "id": "trp6",
          "label": "Verify users/groups/rights",
          "type": "Required",
          "detail": "Confirm production and test login access."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "Customer says only half the staff can attend training because clinic volume is high. What do you do?",
        "options": [
          {
            "label": "Proceed and train whoever attends.",
            "result": "This weakens readiness.",
            "impact": {
              "training": -20,
              "goLive": -10
            }
          },
          {
            "label": "Explain attendance risk, identify super users, protect training time, and document customer responsibilities.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "training": 25,
              "customer": 5,
              "goLive": 10
            }
          },
          {
            "label": "Cancel training entirely.",
            "result": "This creates avoidable risk.",
            "impact": {
              "customer": -10
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: training attendance is a go-live dependency, not a courtesy.",
      "deliverable": {
        "title": "Training Readiness Plan",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Readiness Item",
          "Status",
          "Action"
        ],
        "expertExample": "Readiness Item: Super users. Status: Not fully identified. Action: Denise to name functional leaders for front desk, therapy, nursing, physics, and physician workflows."
      },
      "exercise": null
    },
    {
      "id": "emr-training",
      "title": "ARIA OIS EMR Training",
      "week": "Week 16",
      "goal": "Train users on ARIA basics, role-specific workflows, and production expectations.",
      "tasks": [
        {
          "id": "et1",
          "label": "Conduct ARIA 101",
          "type": "Required",
          "detail": "Login, User Home, favorites, search, views, navigation."
        },
        {
          "id": "et2",
          "label": "Train scheduling/activity capture",
          "type": "Required",
          "detail": "Appointment scheduling, activity capture, ticker bar."
        },
        {
          "id": "et3",
          "label": "Train clinical workspaces",
          "type": "Required",
          "detail": "Documents, encounters, diagnosis, orders, care paths, Chart QA."
        },
        {
          "id": "et4",
          "label": "Train treatment management basics",
          "type": "Required",
          "detail": "Prescribe Treatment, treatment preparation, plan scheduling, peer review."
        },
        {
          "id": "et5",
          "label": "Debrief with customer",
          "type": "Deliverable",
          "detail": "Review training concerns, readiness, and next steps."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "Dr. Mitchell refuses training and says he will learn during go-live. What do you do?",
        "options": [
          {
            "label": "Accept it and move on.",
            "result": "This weakens readiness.",
            "impact": {
              "training": -20,
              "goLive": -10
            }
          },
          {
            "label": "Escalate readiness risk, offer focused physician workflow training, and document the risk if unresolved.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "training": 20,
              "customer": 5,
              "goLive": 10
            }
          },
          {
            "label": "Confront him directly and demand attendance.",
            "result": "This creates avoidable risk.",
            "impact": {
              "customer": -15
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: physician training gaps surface as go-live chaos. Offer focused mitigation and document the risk.",
      "deliverable": {
        "title": "Training Debrief",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Concern",
          "Readiness Impact",
          "Follow-Up"
        ],
        "expertExample": "Concern: Physician training incomplete. Readiness Impact: Documentation and prescription workflows may fail at go-live. Follow-Up: Schedule focused physician workflow session; escalate unresolved risk to Denise and PM."
      },
      "exercise": null
    },
    {
      "id": "emr-go-live",
      "title": "ARIA OIS EMR Go-Live",
      "week": "Week 18",
      "goal": "Support first production clinical workflows and triage issues without compromising patient care.",
      "tasks": [
        {
          "id": "egl1",
          "label": "Confirm interfaces live in production",
          "type": "Required",
          "detail": "ADT, documents, charges."
        },
        {
          "id": "egl2",
          "label": "Confirm CT scanner/image workflow",
          "type": "Required",
          "detail": "Validate PACS/TPS workflow as applicable."
        },
        {
          "id": "egl3",
          "label": "Support registration/scheduling/consults/CT sims/care paths",
          "type": "Required",
          "detail": "Help users through production workflows."
        },
        {
          "id": "egl4",
          "label": "Manage go-live issue log",
          "type": "Required",
          "detail": "Track severity, patient impact, owner, update, and resolution."
        },
        {
          "id": "egl5",
          "label": "Debrief customer",
          "type": "Deliverable",
          "detail": "Review issues, owners, and follow-up actions."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "Several users cannot log in and documents are not routing. What do you do first?",
        "options": [
          {
            "label": "Try to fix everything yourself while users wait.",
            "result": "This weakens readiness.",
            "impact": {
              "customer": -10,
              "goLive": -15
            }
          },
          {
            "label": "Triage by patient-care impact, assign owners, communicate status, validate rights/routing, and involve IT/interface resources.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "goLive": 25,
              "customer": 10,
              "training": 5
            }
          },
          {
            "label": "Tell users to document on paper until later.",
            "result": "This creates avoidable risk.",
            "impact": {
              "goLive": -10
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: on go-live day, structure calms the room. Triage, ownership, and communication matter as much as answers.",
      "deliverable": {
        "title": "Go-Live Issue Summary",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Issue",
          "Priority",
          "Owner / Next Update"
        ],
        "expertExample": "Issue: Users unable to log in. Priority: High if patient-care workflow blocked. Owner: Customer IT / Security admin. Next Update: Validate group/rights and Citrix access by 8:30 AM."
      },
      "exercise": null
    },
    {
      "id": "cutover",
      "title": "Plan Preparation and Cutover",
      "week": "Week 20",
      "goal": "Make sure every active treatment and planning patient is ready to transition safely.",
      "tasks": [
        {
          "id": "co1",
          "label": "Prepare go-live checklist and patient transfer spreadsheet",
          "type": "Required",
          "detail": "Track every active and planning patient."
        },
        {
          "id": "co2",
          "label": "Validate patients registered and ADT sent to ARIA",
          "type": "Required",
          "detail": "Patient identity and registration must be correct."
        },
        {
          "id": "co3",
          "label": "Confirm plans in Eclipse/imported",
          "type": "Required",
          "detail": "Plans must be available for treatment workflow."
        },
        {
          "id": "co4",
          "label": "Confirm prescriptions entered and approved",
          "type": "Required",
          "detail": "Physicians must approve prescriptions in ARIA."
        },
        {
          "id": "co5",
          "label": "Move treatment documentation into ARIA",
          "type": "Required",
          "detail": "Face photo, setup photos, notes, shifts, consent, imaging documentation."
        },
        {
          "id": "co6",
          "label": "Confirm first day is lightly scheduled",
          "type": "Required",
          "detail": "Reduce operational stress on first treatment day."
        },
        {
          "id": "co7",
          "label": "Consult Applications Specialist on treatment go-live plan",
          "type": "Required",
          "detail": "Coordinate delivery, imaging, QA, and charges."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "A patient scheduled after cutover is missing setup photos and prescription approval. What do you do?",
        "options": [
          {
            "label": "Proceed because they were treated safely in MOSAIQ.",
            "result": "This weakens readiness.",
            "impact": {
              "treatment": -35,
              "goLive": -20
            }
          },
          {
            "label": "Flag patient as not treatment-ready, assign owners, verify missing items before treatment, and communicate impact.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "treatment": 30,
              "goLive": 15,
              "customer": 5
            }
          },
          {
            "label": "Ask therapists to figure it out on the machine.",
            "result": "This creates avoidable risk.",
            "impact": {
              "treatment": -30
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: cutover is patient safety work, not clerical cleanup.",
      "deliverable": {
        "title": "Cutover Readiness Note",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Patient Issue",
          "Safety Impact",
          "Required Resolution"
        ],
        "expertExample": "Patient Issue: Missing setup photos and unapproved prescription. Safety Impact: Treatment setup and authorization incomplete. Required Resolution: Enter/verify setup photos and obtain physician prescription approval before treatment."
      },
      "exercise": null
    },
    {
      "id": "treatment-go-live",
      "title": "Treatment Go-Live Capstone",
      "week": "Week 22",
      "goal": "Support first treatment workflows and confirm safe transition into ARIA treatment delivery.",
      "tasks": [
        {
          "id": "tg1",
          "label": "Prepare final implementation guide",
          "type": "Deliverable",
          "detail": "Present final workflow and configuration documentation."
        },
        {
          "id": "tg2",
          "label": "Upload final guide to account",
          "type": "Required",
          "detail": "Ensure final documentation is stored correctly."
        },
        {
          "id": "tg3",
          "label": "Confirm machine cutover with SW Installer",
          "type": "Required",
          "detail": "Do not assume machine cutover readiness."
        },
        {
          "id": "tg4",
          "label": "Support treatment go-live",
          "type": "Required",
          "detail": "Support delivery, imaging, workflows, and triage."
        },
        {
          "id": "tg5",
          "label": "Communicate with PM after first patient treated successfully",
          "type": "Required",
          "detail": "Keep project team informed."
        },
        {
          "id": "tg6",
          "label": "Debrief customer and close work order",
          "type": "Deliverable",
          "detail": "Review next steps, issues, and follow-up."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "Before first treatment, the physicist notices a mismatch between prescription naming and plan naming. What do you do?",
        "options": [
          {
            "label": "Tell him naming is cosmetic and proceed.",
            "result": "This weakens readiness.",
            "impact": {
              "treatment": -30,
              "customer": -15
            }
          },
          {
            "label": "Pause, validate prescription-plan relationship with physics and therapy, document the finding, and proceed only when confirmed safe.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "treatment": 30,
              "customer": 10,
              "goLive": 10
            }
          },
          {
            "label": "Ask the PM to decide.",
            "result": "This creates avoidable risk.",
            "impact": {
              "treatment": -10
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: never dismiss a physicist\u2019s safety concern at the machine. Pause, validate, document.",
      "deliverable": {
        "title": "Treatment Go-Live Debrief",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Success",
          "Issue",
          "Follow-Up"
        ],
        "expertExample": "Success: First patient treated successfully after validation. Issue: Naming mismatch caused pause. Follow-Up: Review naming standards and confirm remaining active patients."
      },
      "exercise": null
    },
    {
      "id": "post-go-live",
      "title": "Post Project Go-Live and Optimization",
      "week": "Week 26",
      "goal": "Review adoption, utilization, closeout, and need for optimization or support.",
      "tasks": [
        {
          "id": "pg1",
          "label": "Schedule 4-6 week follow-up",
          "type": "Required",
          "detail": "Assess adoption after real production use."
        },
        {
          "id": "pg2",
          "label": "Schedule internal closeout call",
          "type": "Required",
          "detail": "Review performance, risks, lessons, and open items."
        },
        {
          "id": "pg3",
          "label": "Ensure all ACs/work orders accounted for",
          "type": "Required",
          "detail": "No leftover ACs or unclosed events."
        },
        {
          "id": "pg4",
          "label": "Review utilization and consulting report",
          "type": "Required",
          "detail": "Compare intended workflows to actual adoption."
        },
        {
          "id": "pg5",
          "label": "Recommend additional support if needed",
          "type": "Recommended",
          "detail": "Workflow optimization, focused training, or additional consulting."
        },
        {
          "id": "pg6",
          "label": "Complete trip report and expenses",
          "type": "Deliverable",
          "detail": "Finish project documentation and closeout."
        }
      ],
      "artifacts": [],
      "interviews": [],
      "risks": [],
      "decision": {
        "prompt": "Follow-up shows low Care Path usage and inconsistent physician documentation. What do you do?",
        "options": [
          {
            "label": "Tell customer to enforce workflows internally and close the project.",
            "result": "This weakens readiness.",
            "impact": {
              "customer": -15,
              "workflow": -10
            }
          },
          {
            "label": "Review utilization, identify adoption barriers, recommend focused follow-up training or workflow optimization, and involve OSM/Sales if appropriate.",
            "result": "Correct. This protects project readiness.",
            "impact": {
              "customer": 15,
              "workflow": 15,
              "training": 10
            }
          },
          {
            "label": "Rebuild workflows immediately without scope review.",
            "result": "This creates avoidable risk.",
            "impact": {
              "configuration": -10
            }
          }
        ],
        "best": 1
      },
      "mentor": "Senior CIC note: post-go-live is where you turn implementation into adoption. Utilization data should lead to a recommendation.",
      "deliverable": {
        "title": "Optimization Recommendation",
        "instructions": "Complete this deliverable based on what you learned in the phase.",
        "prompts": [
          "Adoption Finding",
          "Root Cause",
          "Recommendation"
        ],
        "expertExample": "Adoption Finding: Low Care Path usage. Root Cause: Staff understand documents but not workflow value. Recommendation: Focused workflow optimization and super-user reinforcement session."
      },
      "exercise": null
    }
  ],
  "patients": [
    {
      "id": "P001",
      "name": "Patient 001",
      "diagnosis": "Breast",
      "registration": true,
      "prescription": false,
      "plan": true,
      "imaging": true,
      "setupPhotos": true,
      "consent": true,
      "documentation": true,
      "expectedReady": false,
      "reason": "Prescription is not approved."
    },
    {
      "id": "P002",
      "name": "Patient 002",
      "diagnosis": "Prostate",
      "registration": true,
      "prescription": true,
      "plan": true,
      "imaging": true,
      "setupPhotos": true,
      "consent": true,
      "documentation": true,
      "expectedReady": true,
      "reason": "All readiness items complete."
    },
    {
      "id": "P003",
      "name": "Patient 003",
      "diagnosis": "Lung",
      "registration": true,
      "prescription": true,
      "plan": true,
      "imaging": false,
      "setupPhotos": true,
      "consent": true,
      "documentation": true,
      "expectedReady": false,
      "reason": "Imaging documentation is missing."
    },
    {
      "id": "P004",
      "name": "Patient 004",
      "diagnosis": "Head & Neck",
      "registration": true,
      "prescription": true,
      "plan": false,
      "imaging": true,
      "setupPhotos": true,
      "consent": true,
      "documentation": true,
      "expectedReady": false,
      "reason": "Plan is not treatment approved."
    },
    {
      "id": "P005",
      "name": "Patient 005",
      "diagnosis": "Brain",
      "registration": true,
      "prescription": true,
      "plan": true,
      "imaging": true,
      "setupPhotos": false,
      "consent": true,
      "documentation": true,
      "expectedReady": false,
      "reason": "Setup photos missing."
    },
    {
      "id": "P006",
      "name": "Patient 006",
      "diagnosis": "Rectal",
      "registration": true,
      "prescription": true,
      "plan": true,
      "imaging": true,
      "setupPhotos": true,
      "consent": false,
      "documentation": true,
      "expectedReady": false,
      "reason": "Consent missing."
    },
    {
      "id": "P007",
      "name": "Patient 007",
      "diagnosis": "Bladder",
      "registration": true,
      "prescription": true,
      "plan": true,
      "imaging": true,
      "setupPhotos": true,
      "consent": true,
      "documentation": false,
      "expectedReady": false,
      "reason": "Documentation incomplete."
    },
    {
      "id": "P008",
      "name": "Patient 008",
      "diagnosis": "Breast Boost",
      "registration": true,
      "prescription": true,
      "plan": true,
      "imaging": true,
      "setupPhotos": true,
      "consent": true,
      "documentation": true,
      "expectedReady": true,
      "reason": "All readiness items complete."
    },
    {
      "id": "P009",
      "name": "Patient 009",
      "diagnosis": "Pelvis",
      "registration": false,
      "prescription": true,
      "plan": true,
      "imaging": true,
      "setupPhotos": true,
      "consent": true,
      "documentation": true,
      "expectedReady": false,
      "reason": "Registration/ADT not complete."
    },
    {
      "id": "P010",
      "name": "Patient 010",
      "diagnosis": "Spine",
      "registration": true,
      "prescription": true,
      "plan": true,
      "imaging": true,
      "setupPhotos": true,
      "consent": true,
      "documentation": true,
      "expectedReady": true,
      "reason": "All readiness items complete."
    },
    {
      "id": "P011",
      "name": "Patient 011",
      "diagnosis": "Lung SBRT",
      "registration": true,
      "prescription": true,
      "plan": true,
      "imaging": true,
      "setupPhotos": true,
      "consent": true,
      "documentation": true,
      "expectedReady": true,
      "reason": "All readiness items complete."
    },
    {
      "id": "P012",
      "name": "Patient 012",
      "diagnosis": "Prostate",
      "registration": true,
      "prescription": false,
      "plan": false,
      "imaging": true,
      "setupPhotos": true,
      "consent": true,
      "documentation": true,
      "expectedReady": false,
      "reason": "Prescription and treatment-approved plan missing."
    }
  ],
  "warRoomIssues": [
    {
      "time": "7:05 AM",
      "issue": "Two users cannot log into ARIA through Citrix.",
      "severity": "High",
      "bestAction": "Assign Customer IT/security owner; validate Citrix, group membership, and ARIA rights; communicate update time."
    },
    {
      "time": "7:18 AM",
      "issue": "Documents are not routing outbound to Epic.",
      "severity": "High",
      "bestAction": "Confirm patient impact, validate document type/routing, involve interface analyst, and log defect with owner."
    },
    {
      "time": "8:10 AM",
      "issue": "Front desk says CT Simulation appointment name is confusing.",
      "severity": "Medium",
      "bestAction": "Support immediate scheduling workflow; capture naming concern for post-go-live review unless blocking care."
    },
    {
      "time": "8:40 AM",
      "issue": "Physician cannot find prescription template.",
      "severity": "High",
      "bestAction": "Validate rights/template configuration; support physician workflow; log configuration fix if needed."
    },
    {
      "time": "9:15 AM",
      "issue": "Printer missing from Citrix session.",
      "severity": "Medium",
      "bestAction": "Assign IT; use approved downtime/alternate workflow if needed; avoid blocking patient care."
    }
  ],
  "configExercise": {
    "activities": {
      "prompt": "Select the activities that belong in the CIC Cancer Center standard workflow.",
      "items": [
        "Consult",
        "CT Simulation",
        "Birthday Reminder",
        "Initial Physics Check",
        "Weekly OTV",
        "Lunch Break",
        "Final Treatment",
        "Chart Close Out",
        "Parking Validation"
      ],
      "correct": [
        "Consult",
        "CT Simulation",
        "Initial Physics Check",
        "Weekly OTV",
        "Final Treatment",
        "Chart Close Out"
      ]
    },
    "resources": {
      "prompt": "Select the resources that should be reviewed/configured for scheduling and workflow.",
      "items": [
        "LINAC 1",
        "CT Simulator",
        "Waiting Room",
        "Dr. Mitchell",
        "Coffee Machine",
        "Nurse Navigator",
        "Treatment Vault",
        "Random Test Resource"
      ],
      "correct": [
        "LINAC 1",
        "CT Simulator",
        "Waiting Room",
        "Dr. Mitchell",
        "Nurse Navigator",
        "Treatment Vault"
      ]
    },
    "carepath": {
      "prompt": "Arrange the care path in the best order.",
      "items": [
        "Referral Received",
        "Authorization",
        "Consult",
        "CT Simulation",
        "Treatment Planning",
        "Physics Review",
        "Treatment Start",
        "Weekly OTV",
        "Final Treatment",
        "Chart Close Out"
      ],
      "correct": [
        "Referral Received",
        "Authorization",
        "Consult",
        "CT Simulation",
        "Treatment Planning",
        "Physics Review",
        "Treatment Start",
        "Weekly OTV",
        "Final Treatment",
        "Chart Close Out"
      ]
    }
  },
  "scenarioTemplates": [
    {
      "id": "community",
      "name": "CIC Cancer Center Community",
      "level": "Level 1",
      "difficulty": "Foundational",
      "profile": "Small community radiation oncology department",
      "systems": {
        "currentOIS": "MOSAIQ",
        "futureOIS": "ARIA",
        "emr": "Basic HIS or limited EMR integration",
        "tps": "Eclipse"
      },
      "scale": {
        "physicians": 1,
        "linacs": 1,
        "ctSimulators": 1,
        "sites": 1
      },
      "primaryLearning": [
        "Project discovery",
        "Basic workflow assessment",
        "Stakeholder identification",
        "Training readiness"
      ],
      "typicalRisks": [
        "Limited staff availability",
        "Informal paper workflows",
        "Minimal IT support",
        "Underestimating training needs"
      ]
    },
    {
      "id": "regional",
      "name": "CIC Cancer Center Regional",
      "level": "Level 2",
      "difficulty": "Intermediate",
      "profile": "Hospital-owned radiation oncology department with enterprise EMR",
      "systems": {
        "currentOIS": "MOSAIQ",
        "futureOIS": "ARIA",
        "emr": "Epic",
        "tps": "Eclipse"
      },
      "scale": {
        "physicians": 2,
        "linacs": 1,
        "ctSimulators": 1,
        "sites": 1
      },
      "primaryLearning": [
        "Interop planning",
        "Interface testing",
        "Workflow standardization",
        "EMR go-live support"
      ],
      "typicalRisks": [
        "Interface timeline unclear",
        "Epic mapping dependencies",
        "Physician resistance",
        "Training attendance conflicts"
      ]
    },
    {
      "id": "academic",
      "name": "CIC Cancer Center University",
      "level": "Level 3",
      "difficulty": "Advanced",
      "profile": "Academic radiation oncology program with complex governance",
      "systems": {
        "currentOIS": "ARIA or MOSAIQ",
        "futureOIS": "ARIA",
        "emr": "Epic",
        "tps": "Eclipse"
      },
      "scale": {
        "physicians": 8,
        "linacs": 4,
        "ctSimulators": 2,
        "sites": 2
      },
      "primaryLearning": [
        "Governance",
        "Complex stakeholder management",
        "Multi-physician workflow standardization",
        "Research and resident workflow awareness"
      ],
      "typicalRisks": [
        "Physician autonomy",
        "Committee delays",
        "Research workflow exceptions",
        "Complex training schedule"
      ]
    },
    {
      "id": "network",
      "name": "CIC Cancer Center Network",
      "level": "Level 4",
      "difficulty": "Expert",
      "profile": "Enterprise consolidation or expansion project",
      "systems": {
        "currentOIS": "Multiple ARIA/MOSAIQ environments",
        "futureOIS": "Target ARIA database",
        "emr": "Epic or enterprise HIS",
        "tps": "Eclipse"
      },
      "scale": {
        "physicians": 15,
        "linacs": 8,
        "ctSimulators": 4,
        "sites": 4
      },
      "primaryLearning": [
        "Consolidation strategy",
        "Workflow adoption",
        "Patient transfer planning",
        "Change management",
        "Multi-site standardization"
      ],
      "typicalRisks": [
        "Sites resist target workflow",
        "Database consolidation complexity",
        "Active patient migration risk",
        "Inconsistent naming conventions"
      ]
    }
  ]
};