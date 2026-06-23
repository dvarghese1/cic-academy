window.SCENARIO = {
  "appName": "CIC Academy",
  "defaultCancerCenter": "CIC Cancer Center",
  "scenarioTypes": [
    {
      "id": "new-aria",
      "name": "Brand New ARIA Build",
      "difficulty": "Foundational / Intermediate",
      "description": "A new RO site implementing ARIA as a new OIS build.",
      "currentOIS": "No existing RO OIS",
      "futureOIS": "ARIA",
      "health": {
        "confidence": 62,
        "timeline": 68,
        "workflow": 28,
        "interface": 35,
        "training": 10,
        "treatment": 5
      },
      "facts": [
        "New ARIA build",
        "Future-state workflow design",
        "Training",
        "Go-live readiness"
      ]
    },
    {
      "id": "mosaiq-conversion",
      "name": "MOSAIQ to ARIA Conversion",
      "difficulty": "Intermediate",
      "description": "A site moving from MOSAIQ to ARIA.",
      "currentOIS": "MOSAIQ",
      "futureOIS": "ARIA",
      "health": {
        "confidence": 58,
        "timeline": 62,
        "workflow": 30,
        "interface": 25,
        "training": 10,
        "treatment": 5
      },
      "facts": [
        "Current-state assessment",
        "Interfaces",
        "Cutover",
        "Treatment go-live"
      ]
    },
    {
      "id": "aria-upgrade",
      "name": "ARIA Upgrade / Optimization",
      "difficulty": "Intermediate / Advanced",
      "description": "An existing ARIA customer upgrading or optimizing workflows.",
      "currentOIS": "ARIA",
      "futureOIS": "Upgraded / Optimized ARIA",
      "health": {
        "confidence": 55,
        "timeline": 58,
        "workflow": 38,
        "interface": 35,
        "training": 15,
        "treatment": 15
      },
      "facts": [
        "Existing ARIA",
        "Optimization",
        "Adoption",
        "Focused training"
      ]
    },
    {
      "id": "consolidation",
      "name": "Consolidation to Target ARIA Site",
      "difficulty": "Advanced / Expert",
      "description": "Multiple sites adopting a target ARIA environment.",
      "currentOIS": "Multiple environments",
      "futureOIS": "Target ARIA",
      "health": {
        "confidence": 45,
        "timeline": 45,
        "workflow": 20,
        "interface": 30,
        "training": 5,
        "treatment": 10
      },
      "facts": [
        "Multiple sites",
        "Target workflow",
        "Patient transfer",
        "Change management"
      ]
    }
  ],
  "phases": [
    {
      "id": "discovery",
      "number": 1,
      "title": "Project Discovery & Initiation",
      "purpose": "Understand the project type, sold scope, customer expectations, stakeholders, and early risks.",
      "checklist": [
        "Review quote/sales order",
        "Review Unity/work orders",
        "Review installed base / current-state environment",
        "Review software / environment planning",
        "Review interoperability scope if applicable",
        "Meet with PM/OSM",
        "Identify key stakeholders"
      ],
      "tip": "Discovery is the first chance to prevent rework.",
      "observations": [
        {
          "title": "Scope does not match expectations",
          "notice": [
            "The quote includes interoperability consulting, but kickoff notes suggest the customer expects full workflow redesign and additional onsite training.",
            "The PM summary does not mention the mismatch.",
            "The customer wants to go live quickly."
          ],
          "attention": "This catches your attention because scope gaps become customer-confidence problems if they are not addressed early.",
          "questions": [
            "What exactly was sold?",
            "What does the customer believe was sold?",
            "Is there a consulting-hours limitation?",
            "Who should clarify scope before kickoff?"
          ],
          "senior": "The customer is not necessarily wrong; expectations may simply be misaligned. A CIC should surface the gap early with the PM/OSM before it becomes a customer escalation.",
          "good": [
            "Document the possible scope gap.",
            "Ask PM/OSM for clarification.",
            "Confirm interop ownership and testing expectations.",
            "Prepare expectation-setting language for the kickoff."
          ],
          "context": [
            "Quote and kickoff notes do not align.",
            "Interop testing dates are blank."
          ]
        },
        {
          "title": "Project path is unclear",
          "notice": [
            "Installed base indicates existing ARIA, but Sales notes reference a new build.",
            "An OSM note mentions a recently acquired site.",
            "The handoff does not clearly say whether this is new build, upgrade, conversion, or consolidation."
          ],
          "attention": "This matters because the project path changes the discovery questions, configuration strategy, training plan, and go-live risk.",
          "questions": [
            "Is this new ARIA, conversion, upgrade, or consolidation?",
            "Is there a target workflow?",
            "Are patients being migrated?",
            "Are we preserving, redesigning, or standardizing workflows?"
          ],
          "senior": "Experienced CICs classify the project before they start planning. If you assume the wrong project type, every downstream decision can be off.",
          "good": [
            "Clarify project path.",
            "Document current and future OIS state.",
            "Ask whether a target-site workflow exists.",
            "Adjust the phase plan based on project type."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 1"
    },
    {
      "id": "pre-osa",
      "number": 2,
      "title": "Pre-On Site Assessment",
      "purpose": "Prepare the customer, agenda, stakeholders, and artifacts so OSA produces usable workflow information.",
      "checklist": [
        "Schedule intro call",
        "Confirm customer goals",
        "Confirm project type",
        "Identify interview groups",
        "Request documents",
        "Prepare AOS document"
      ],
      "tip": "Good OSA planning protects the quality of the onsite visit.",
      "observations": [
        {
          "title": "Customer wants one-day OSA",
          "notice": [
            "The director asks if the OSA can be compressed into one day.",
            "The proposed attendee list excludes nursing/navigation and billing.",
            "The interface analyst is not invited."
          ],
          "attention": "This matters because a shorter OSA may still be workable, but only if required outcomes are protected.",
          "questions": [
            "What outcomes must OSA produce?",
            "Which workflows are at risk if time is reduced?",
            "Who must be present for decisions?",
            "Can some interviews happen virtually before or after onsite?"
          ],
          "senior": "Do not make this a fight about days. Make it about outputs: workflows, stakeholders, interface needs, configuration decisions, and training readiness.",
          "good": [
            "Explain OSA outputs clearly.",
            "Recommend stakeholder coverage.",
            "Offer hybrid options if needed.",
            "Document risk if the customer compresses the assessment."
          ],
          "context": []
        },
        {
          "title": "Hidden stakeholder appears",
          "notice": [
            "A nurse navigator asks whether she should attend the OSA.",
            "She mentions tracking referrals and follow-ups in a spreadsheet.",
            "She was not on the original stakeholder list."
          ],
          "attention": "This catches your attention because hidden stakeholders often own important upstream or downstream workflows.",
          "questions": [
            "What does the navigator track?",
            "Who uses that information?",
            "Where should it live in the future state?",
            "What breaks if this workflow is missed?"
          ],
          "senior": "New consultants often interview only the obvious roles. Experienced CICs look for the people who hold the department together operationally.",
          "good": [
            "Add navigator to OSA interviews.",
            "Request example spreadsheet/statuses.",
            "Capture referral/follow-up workflow.",
            "Assess training and configuration impact."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 2"
    },
    {
      "id": "osa",
      "number": 3,
      "title": "On Site Assessment",
      "purpose": "Observe real operations, interview stakeholders, collect evidence, and uncover hidden workflows.",
      "checklist": [
        "Tour department",
        "Interview stakeholders",
        "Collect documents/screenshots",
        "Observe workflows",
        "Identify workarounds or undocumented workflows",
        "Hold wrap-up"
      ],
      "tip": "Observe first. Diagnose second. Recommend third.",
      "observations": [
        {
          "title": "Whiteboard beside treatment console",
          "notice": [
            "You walk into the treatment area and see a dry erase board beside the console.",
            "The board includes imaging reminders, setup shifts, physician-specific notes, and special treatment considerations.",
            "Therapists appear to update it throughout the day."
          ],
          "attention": "This process was not mentioned during discovery and does not appear in the documents you reviewed.",
          "questions": [
            "Why does this board exist?",
            "Who updates it?",
            "What happens if it is erased?",
            "Is the information captured elsewhere?",
            "Could this affect patient safety?"
          ],
          "senior": "The board is not the issue. The issue is the workflow need that created it.",
          "good": [
            "Document the observation.",
            "Ask therapists why it exists.",
            "Validate with physics/therapy.",
            "Determine whether ARIA already supports the need.",
            "Capture configuration or training follow-up."
          ],
          "context": [
            "No SOP mentions this board.",
            "No future-state owner is identified."
          ]
        },
        {
          "title": "Navigator spreadsheet",
          "notice": [
            "The navigator maintains an Excel tracker for referral status, authorization status, consult readiness, and follow-up reminders.",
            "The tracker is updated daily.",
            "Other staff rely on the navigator for status updates."
          ],
          "attention": "This may be a shadow workflow that supports patient movement before consult or after treatment.",
          "questions": [
            "Why is the spreadsheet needed?",
            "What statuses are tracked?",
            "Is this duplicated in Epic or ARIA?",
            "What happens when the navigator is out?"
          ],
          "senior": "Shadow trackers often exist because the formal workflow does not meet an operational need.",
          "good": [
            "Identify required statuses/tasks.",
            "Determine future-state system of record.",
            "Add to guide/training considerations.",
            "Clarify ownership."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 3"
    },
    {
      "id": "guide",
      "number": 4,
      "title": "Implementation Guide",
      "purpose": "Turn findings into future-state workflows, configuration direction, and customer-approved decisions.",
      "checklist": [
        "Review assessment findings",
        "Design future workflows",
        "Document assumptions",
        "Capture open decisions",
        "Review with customer"
      ],
      "tip": "The guide is the bridge from observation to build.",
      "observations": [
        {
          "title": "Physicians disagree on standardization",
          "notice": [
            "One physician wants fewer documentation steps.",
            "Another wants standardized templates for every consult.",
            "The director wants consistency for reporting and training."
          ],
          "attention": "This matters because uncontrolled physician variation can make configuration, training, and support harder.",
          "questions": [
            "What must be standardized?",
            "Where are exceptions clinically justified?",
            "Who approves exceptions?",
            "How will this affect training and support?"
          ],
          "senior": "Standardization is not rigidity. The goal is governed variation that the customer can sustain.",
          "good": [
            "Facilitate governance discussion.",
            "Document standard workflow and exceptions.",
            "Tie decisions to configuration and training.",
            "Track open decisions."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 4"
    },
    {
      "id": "config-prep",
      "number": 5,
      "title": "Configuration Preparation",
      "purpose": "Confirm environment, access, tools, and dependencies before configuration work begins.",
      "checklist": [
        "Prepare agenda",
        "Confirm TBox / test / production environments as applicable",
        "Validate Citrix/remote access",
        "Confirm Word/Adobe",
        "Meet interface analyst"
      ],
      "tip": "Configuration success is often decided before onsite work begins.",
      "observations": [
        {
          "title": "Citrix not ready",
          "notice": [
            "Two days before configuration, IT says ARIA and Data Admin are not published in Citrix.",
            "The agenda assumes working access.",
            "The PM was not aware access was still open."
          ],
          "attention": "This matters because onsite time can be wasted if environment readiness is assumed instead of validated.",
          "questions": [
            "Who owns Citrix publishing?",
            "Can access be validated before travel?",
            "What can still be done if access is delayed?",
            "Does this affect interface testing?"
          ],
          "senior": "Do not confuse scheduled travel with readiness. Escalate blockers with options.",
          "good": [
            "Document blocker.",
            "Assign owner/date.",
            "Ask PM to align customer.",
            "Adjust agenda if needed.",
            "Validate before arrival."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 5"
    },
    {
      "id": "tbox",
      "number": 6,
      "title": "TBox Configuration",
      "purpose": "Build interface-dependent configuration needed for testing.",
      "checklist": [
        "Configure departments",
        "Configure providers/resources",
        "Configure activities, codes, and workflow-supporting build items",
        "Configure documents",
        "Coordinate with interface analyst"
      ],
      "tip": "TBox teaches whether design supports testing.",
      "observations": [
        {
          "title": "Activity codes changed after mapping",
          "notice": [
            "The Epic analyst reports that activity codes changed after initial mapping.",
            "The customer says the new names are easier for scheduling.",
            "Test scripts still show the old values."
          ],
          "attention": "This matters because build changes can affect mapping, test scripts, training, and retesting.",
          "questions": [
            "What changed?",
            "What messages are impacted?",
            "Do test scripts need updates?",
            "Is retesting required?"
          ],
          "senior": "Configuration changes after mapping are not just build changes. They are testing changes.",
          "good": [
            "Document the change.",
            "Assess interface impact.",
            "Update test scripts.",
            "Communicate with PM/interface analyst.",
            "Retest affected workflows."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 6"
    },
    {
      "id": "production-config",
      "number": 7,
      "title": "Production Configuration",
      "purpose": "Configure production based on approved workflow decisions and build standards.",
      "checklist": [
        "Configure security",
        "Configure resources/activities",
        "Configure care paths",
        "Configure documents",
        "Configure clinical content"
      ],
      "tip": "Production configuration becomes training, support, reporting, and adoption.",
      "observations": [
        {
          "title": "Naming convention disagreement",
          "notice": [
            "Therapy wants short activity names.",
            "Scheduling wants patient-friendly names.",
            "Billing wants names aligned to charges.",
            "Physicians only care if the name changes their workflow."
          ],
          "attention": "This matters because naming affects training, support, reporting, and sometimes interfaces.",
          "questions": [
            "Who consumes the name?",
            "Does it affect charges or interfaces?",
            "Does it appear to patients?",
            "What standard can be supported long-term?"
          ],
          "senior": "Naming is not cosmetic. It is a governance and support decision.",
          "good": [
            "Propose naming standard.",
            "Document rationale.",
            "Identify approved exceptions.",
            "Update tracker/training impacts."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 7"
    },
    {
      "id": "interface-testing",
      "number": 8,
      "title": "Interface Testing",
      "purpose": "Validate that interface behavior supports real workflows.",
      "checklist": [
        "Prepare scripts",
        "Run functional testing",
        "Run integrated testing",
        "Validate mapped records / integrated workflow testing as applicable",
        "Document defects"
      ],
      "tip": "Test the workflow, not just the message.",
      "observations": [
        {
          "title": "ADT works but appointment missing",
          "notice": [
            "Epic creates the patient in ARIA successfully.",
            "The expected appointment does not appear correctly.",
            "The customer immediately says the interface is broken."
          ],
          "attention": "This matters because many interface issues are actually mapping, configuration, or test-case issues.",
          "questions": [
            "Was the message sent?",
            "Were fields mapped correctly?",
            "Does ARIA configuration support the appointment?",
            "Was the test case written correctly?"
          ],
          "senior": "Do not escalate until you understand whether the defect is message, mapping, configuration, or workflow.",
          "good": [
            "Validate message.",
            "Validate mapping.",
            "Validate ARIA activity/resource configuration.",
            "Update defect log.",
            "Assign owner and retest."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 8"
    },
    {
      "id": "training-prep",
      "number": 9,
      "title": "EMR Training Preparation",
      "purpose": "Prepare logistics, access, agendas, super users, and readiness before training begins.",
      "checklist": [
        "Update guide",
        "Develop agendas",
        "Transfer knowledge to Apps Specialists",
        "Confirm room/access",
        "Identify super users"
      ],
      "tip": "Training readiness is go-live readiness.",
      "observations": [
        {
          "title": "Only half the staff can attend",
          "notice": [
            "The director says clinic volume is too high to send all staff to training.",
            "Super users are not finalized.",
            "Physicians have not confirmed attendance."
          ],
          "attention": "This matters because training gaps usually become go-live issues.",
          "questions": [
            "Which roles are missing?",
            "Can super users cover gaps?",
            "Can training be split by role?",
            "Who owns attendance?"
          ],
          "senior": "Training attendance is not a courtesy. It is a go-live dependency.",
          "good": [
            "Identify critical roles.",
            "Name super users.",
            "Adjust agenda if needed.",
            "Escalate unresolved risk.",
            "Document customer responsibility."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 9"
    },
    {
      "id": "emr-training",
      "number": 10,
      "title": "EMR Training",
      "purpose": "Train users on role-specific workflows and reveal remaining adoption or configuration issues.",
      "checklist": [
        "Conduct ARIA 101",
        "Train scheduling",
        "Train clinical workflows",
        "Train treatment management",
        "Debrief customer"
      ],
      "tip": "Training is also workflow validation.",
      "observations": [
        {
          "title": "Physician skips training",
          "notice": [
            "A senior physician says he will learn during go-live.",
            "Staff are uncomfortable correcting physician workflow in production.",
            "The director asks if this is a problem."
          ],
          "attention": "This matters because physician workflow gaps can block documentation, orders, prescriptions, and approvals.",
          "questions": [
            "Which workflows require physician action?",
            "Can a focused session be offered?",
            "What breaks if the physician is not trained?",
            "Who should be informed?"
          ],
          "senior": "Offer a focused mitigation, then document unresolved readiness risk.",
          "good": [
            "Offer focused session.",
            "Document risk if declined.",
            "Notify PM/director.",
            "Prepare go-live support plan."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 10"
    },
    {
      "id": "emr-go-live",
      "number": 11,
      "title": "EMR Go-Live",
      "purpose": "Support first production workflows, triage issues, assign owners, and protect patient operations.",
      "checklist": [
        "Confirm production interfaces",
        "Confirm access",
        "Support first workflows",
        "Manage issue log",
        "Debrief customer"
      ],
      "tip": "Structure calms the room.",
      "observations": [
        {
          "title": "Login failures and document routing",
          "notice": [
            "Two users cannot log in.",
            "Documents are not routing outbound to Epic.",
            "A consult patient arrives in 20 minutes.",
            "Staff ask whether they should go back to paper."
          ],
          "attention": "This matters because unstructured go-live issues can quickly damage confidence and patient flow.",
          "questions": [
            "What affects patient care first?",
            "Who owns each issue?",
            "What is the update cadence?",
            "Is a downtime process needed?"
          ],
          "senior": "The CIC should not become the only problem solver. The CIC helps structure triage and ownership.",
          "good": [
            "Prioritize patient-impacting issues.",
            "Assign owners.",
            "Communicate next update time.",
            "Use approved workaround if needed.",
            "Document issue and resolution."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 11"
    },
    {
      "id": "cutover",
      "number": 12,
      "title": "Plan Preparation & Cutover",
      "purpose": "Validate active patient readiness before treatment go-live.",
      "checklist": [
        "Prepare spreadsheet",
        "Validate registration",
        "Confirm plans/prescriptions",
        "Move documentation",
        "Coordinate appropriate first treatment day schedule"
      ],
      "tip": "Cutover is patient-safety work.",
      "observations": [
        {
          "title": "Missing prescription and setup photos",
          "notice": [
            "A patient scheduled after cutover has a treatment-approved plan but prescription approval is missing.",
            "Setup photos are not in ARIA.",
            "Therapists assume this will be handled before treatment."
          ],
          "attention": "This matters because readiness must be verified patient by patient before treatment delivery.",
          "questions": [
            "Can this patient be treated safely?",
            "Who owns the missing prescription?",
            "Who owns setup photos?",
            "Should the schedule be adjusted?"
          ],
          "senior": "Readiness is not a feeling. It is verified.",
          "good": [
            "Mark patient not ready.",
            "Assign owners.",
            "Verify completion before treatment.",
            "Communicate schedule impact.",
            "Update transfer spreadsheet."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 12"
    },
    {
      "id": "treatment-go-live",
      "number": 13,
      "title": "Treatment Go-Live",
      "purpose": "Support safe treatment delivery and final transition to production treatment workflows.",
      "checklist": [
        "Confirm machine cutover / treatment delivery readiness as applicable",
        "Review patient readiness",
        "Support treatment delivery",
        "Notify PM",
        "Debrief customer"
      ],
      "tip": "Never dismiss a clinical safety concern at the machine.",
      "observations": [
        {
          "title": "Prescription and plan naming mismatch",
          "notice": [
            "The physicist notices a mismatch between prescription naming and plan naming.",
            "Therapists are ready to proceed.",
            "The team is waiting at the machine."
          ],
          "attention": "This matters because a clinical safety concern at the machine should pause the workflow until validated.",
          "questions": [
            "Is this cosmetic or clinically meaningful?",
            "Does prescription-plan relationship validate?",
            "Who must approve proceeding?",
            "How is this documented?"
          ],
          "senior": "At the machine, the safest decision is to pause and validate.",
          "good": [
            "Pause treatment.",
            "Validate prescription-plan relationship.",
            "Involve physics/therapy/physician as needed.",
            "Document resolution.",
            "Proceed only when confirmed safe."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 13"
    },
    {
      "id": "post-go-live",
      "number": 14,
      "title": "Post-Go-Live Optimization",
      "purpose": "Review adoption, utilization, closeout, and optimization opportunities.",
      "checklist": [
        "Schedule follow-up",
        "Review utilization",
        "Check open work orders",
        "Review feedback",
        "Recommend follow-up"
      ],
      "tip": "Post-go-live is where implementation becomes adoption.",
      "observations": [
        {
          "title": "Low Care Path usage",
          "notice": [
            "Care Path usage is low.",
            "Physician documentation remains inconsistent.",
            "Staff say they understand ARIA but reverted to familiar habits during busy clinics."
          ],
          "attention": "This matters because technical go-live is not the same as operational adoption.",
          "questions": [
            "Why is usage low?",
            "Is it training, configuration, workflow design, or leadership reinforcement?",
            "Who owns adoption after go-live?"
          ],
          "senior": "Utilization findings should lead to a recommendation, not just a report.",
          "good": [
            "Identify adoption barriers.",
            "Review workflow fit.",
            "Recommend focused training/optimization.",
            "Involve OSM/Sales if additional support is beneficial."
          ],
          "context": []
        }
      ],
      "phaseLabel": "Phase 14"
    }
  ]
};