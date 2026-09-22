const page = document.documentElement.dataset.page;
const root = document.documentElement;

const accentList = ["#3154d6","#d66c91","#eabf42","#86a83c","#3154d6"];

function initAtlas() {
  const spreads = [...document.querySelectorAll(".atlas-spread")];
  const tabs = [...document.querySelectorAll("[data-spread]")];
  const currentLabel = document.querySelector("#currentSpread");
  let current = 0;

  function show(index) {
    current = (index + spreads.length) % spreads.length;
    spreads.forEach((spread,i) => spread.classList.toggle("active", i === current));
    tabs.forEach((tab,i) => tab.classList.toggle("active", i === current));
    if (currentLabel) currentLabel.textContent = String(current + 1).padStart(2,"0");
    root.style.setProperty("--accent", accentList[current]);
  }

  tabs.forEach((tab,i) => tab.addEventListener("click", () => show(i)));
  document.querySelectorAll("[data-next]").forEach(btn => btn.addEventListener("click", () => show(Number(btn.dataset.next))));
  document.querySelector("#prevSpread")?.addEventListener("click", () => show(current - 1));
  document.querySelector("#nextSpread")?.addEventListener("click", () => show(current + 1));

  window.addEventListener("keydown", e => {
    if (e.key === "ArrowRight") show(current + 1);
    if (e.key === "ArrowLeft") show(current - 1);
  });

  show(0);
}

const systemData = [
  {
    caption:"PLATE 02.1 / OBSERVE", word:"OBSERVE",
    title:"Build a trustworthy picture of machine condition.",
    copy:"Start with the asset, not the device. Presage can combine condition, electrical and plant-provided signals into one machine view.",
    bars:[76,45,62,28,54,84], figure:"Vibration / MCSA / Temperature / PLC",
    notes:["Condition signals","Electrical signals","Process signals"], accent:"#3154d6"
  },
  {
    caption:"PLATE 02.2 / UNDERSTAND", word:"UNDERSTAND",
    title:"Turn changing signals into machine context.",
    copy:"Correlate fault patterns, baselines, operating modes and history so the platform can explain what is changing and why.",
    bars:[42,72,81,58,67,49], figure:"Fault patterns / baselines / operating state",
    notes:["Fault evidence","Operating mode","Asset history"], accent:"#d66c91"
  },
  {
    caption:"PLATE 02.3 / DECIDE", word:"DECIDE",
    title:"Separate what is interesting from what is actionable.",
    copy:"Severity, persistence, criticality and evidence should shape attention — not threshold magnitude alone.",
    bars:[64,81,38,74,52,68], figure:"Severity / persistence / criticality / evidence",
    notes:["Severity","Criticality","Confidence"], accent:"#eabf42"
  },
  {
    caption:"PLATE 02.4 / ACT", word:"ACT",
    title:"Carry diagnosis into maintenance execution.",
    copy:"Keep the recommendation and supporting evidence attached to the work so the engineering story survives the handoff.",
    bars:[35,56,68,79,72,88], figure:"Recommendation / work / CMMS / feedback",
    notes:["Recommended action","Work execution","CMMS link"], accent:"#86a83c"
  },
  {
    caption:"PLATE 02.5 / LEARN", word:"LEARN",
    title:"Make every intervention improve the next decision.",
    copy:"Use completed work and post-maintenance behavior to build better history, identify bad actors and improve future diagnosis.",
    bars:[28,44,58,68,82,94], figure:"Validation / history / recurring faults / fleet learning",
    notes:["Validation","History","Fleet learning"], accent:"#3154d6"
  }
];

function initSystem() {
  const buttons = [...document.querySelectorAll("[data-system]")];
  const caption = document.querySelector("#systemCaption");
  const word = document.querySelector("#systemWord");
  const title = document.querySelector("#systemTitle");
  const copy = document.querySelector("#systemCopy");
  const bars = [...document.querySelectorAll("#figureBars i")];
  const figure = document.querySelector("#figureCaption");
  const notes = [document.querySelector("#noteA"),document.querySelector("#noteB"),document.querySelector("#noteC")];

  function select(i) {
    const item = systemData[i];
    buttons.forEach((b,n) => b.classList.toggle("active",n===i));
    caption.textContent = item.caption;
    word.textContent = item.word;
    title.textContent = item.title;
    copy.textContent = item.copy;
    figure.textContent = item.figure;
    bars.forEach((bar,n) => bar.style.setProperty("--h", item.bars[n] + "%"));
    notes.forEach((note,n) => note.textContent = item.notes[n]);
    root.style.setProperty("--accent",item.accent);
  }
  buttons.forEach((button,i) => button.addEventListener("click",()=>select(i)));
  select(0);
}

const caseData = [
  {
    label:"SIGNAL OVERLOAD", title:"Stop asking engineers to assemble the machine story manually.",
    copy:"Bring vibration, electrical behavior, operating state and maintenance history into the same diagnostic context.",
    question:"“What is actually wrong with this asset?”",
    shift:"From isolated alarms\nto contextual diagnosis.", accent:"#3154d6"
  },
  {
    label:"FALSE URGENCY", title:"Not every threshold crossing deserves the same response.",
    copy:"Use persistence, machine state and asset importance to distinguish a developing problem from a transient event.",
    question:"“Does this need action now?”",
    shift:"From threshold magnitude\nto reliability-aware priority.", accent:"#eabf42"
  },
  {
    label:"BROKEN HANDOFF", title:"Keep the engineering context attached to the work.",
    copy:"Carry diagnosis, evidence and recommended action into maintenance execution instead of losing the reasoning at handoff.",
    question:"“What exactly should the technician do?”",
    shift:"From alert inbox\nto connected work.", accent:"#86a83c"
  },
  {
    label:"REPEATED FAILURE", title:"A repair should become reliability knowledge.",
    copy:"Use completed work and post-maintenance behavior to identify recurring bad actors and improve the reliability strategy.",
    question:"“Why are we solving this again?”",
    shift:"From one-off fix\nto learning loop.", accent:"#d66c91"
  }
];

function initCases() {
  const tiles = [...document.querySelectorAll("[data-case]")];
  const number = document.querySelector("#caseNumber");
  const label = document.querySelector("#caseLabel");
  const title = document.querySelector("#caseTitle");
  const copy = document.querySelector("#caseCopy");
  const question = document.querySelector("#caseQuestion");
  const shift = document.querySelector("#caseShift");

  function select(i) {
    const item = caseData[i];
    tiles.forEach((tile,n)=>tile.classList.toggle("active",n===i));
    number.textContent = String(i+1).padStart(2,"0");
    label.textContent = item.label;
    title.textContent = item.title;
    copy.textContent = item.copy;
    question.textContent = item.question;
    shift.innerHTML = item.shift.replace("\n","<br>");
    root.style.setProperty("--accent",item.accent);
  }
  tiles.forEach((tile,i)=>tile.addEventListener("click",()=>select(i)));
  select(0);
}

if (page === "atlas") initAtlas();
if (page === "system") initSystem();
if (page === "cases") initCases();