const page = document.documentElement.dataset.page;
const root = document.documentElement;
const body = document.body;

const accents = {
  pink: "#ff668f",
  cyan: "#45c7e8",
  yellow: "#f4ca58",
  mint: "#8ad7b2",
  violet: "#b59aee"
};

function setAccent(name) {
  root.style.setProperty("--accent", accents[name] || accents.pink);
}

function initDeck() {
  const track = document.querySelector("#deckTrack");
  const panels = [...document.querySelectorAll(".deck-panel")];
  const dots = [...document.querySelectorAll(".deck-dots button")];
  const progress = document.querySelector("#railProgress");
  let current = 0;
  let locked = false;

  function go(index) {
    current = Math.max(0, Math.min(panels.length - 1, index));
    track.style.transform = `translateX(-${current * 100}%)`;
    setAccent(panels[current].dataset.accent);
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === current));
    if (progress) progress.style.height = `${((current + 1) / panels.length) * 100}%`;
  }

  document.querySelectorAll("[data-jump]").forEach((control) => {
    control.addEventListener("click", () => go(Number(control.dataset.jump)));
  });

  window.addEventListener("keydown", (event) => {
    if (window.innerWidth <= 820) return;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") go(current + 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") go(current - 1);
  });

  window.addEventListener("wheel", (event) => {
    if (window.innerWidth <= 820 || locked || Math.abs(event.deltaY) < 16) return;
    locked = true;
    go(current + (event.deltaY > 0 ? 1 : -1));
    window.setTimeout(() => { locked = false; }, 850);
  }, { passive: true });

  let touchStart = 0;
  window.addEventListener("touchstart", (event) => {
    touchStart = event.touches[0].clientX;
  }, { passive: true });
  window.addEventListener("touchend", (event) => {
    if (window.innerWidth <= 820) return;
    const diff = touchStart - event.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) go(current + (diff > 0 ? 1 : -1));
  }, { passive: true });

  go(0);
}

const systemData = [
  {
    state: "OBSERVE",
    title: "Build a trustworthy picture of machine condition.",
    copy: "Presage can ingest its own sensor data and plant-provided signals so reliability starts with the asset, not with a hardware boundary.",
    metrics: [["INPUT","Condition"],["INPUT","Electrical"],["INPUT","Process"]],
    accent: "cyan"
  },
  {
    state: "UNDERSTAND",
    title: "Turn signals into machine context.",
    copy: "Correlate fault patterns, baselines, operating modes and asset history so a changing signal is interpreted in the conditions that produced it.",
    metrics: [["LOGIC","Fault patterns"],["CONTEXT","Operating mode"],["HISTORY","Baselines"]],
    accent: "pink"
  },
  {
    state: "DECIDE",
    title: "Separate what is interesting from what is actionable.",
    copy: "Use evidence, severity, persistence and asset criticality to direct engineering attention toward the problems that deserve it.",
    metrics: [["RANK","Severity"],["RANK","Criticality"],["RANK","Evidence"]],
    accent: "yellow"
  },
  {
    state: "ACT",
    title: "Carry diagnosis into maintenance execution.",
    copy: "Keep recommended action, supporting evidence and asset history connected to the work instead of losing context between systems and teams.",
    metrics: [["OUTPUT","Recommendation"],["OUTPUT","Work"],["OUTPUT","CMMS"]],
    accent: "mint"
  },
  {
    state: "LEARN",
    title: "Make every intervention improve the next decision.",
    copy: "Use completed work and post-maintenance behavior to identify recurring faults, bad actors and opportunities to improve the reliability strategy.",
    metrics: [["LOOP","Validation"],["LOOP","History"],["LOOP","Fleet learning"]],
    accent: "violet"
  }
];

function initSystem() {
  const bands = [...document.querySelectorAll(".system-band")];
  const step = document.querySelector("#systemStep");
  const state = document.querySelector("#systemState");
  const title = document.querySelector("#systemTitle");
  const copy = document.querySelector("#systemCopy");
  const metrics = document.querySelector("#systemMetrics");

  function select(i) {
    const item = systemData[i];
    bands.forEach((band, n) => band.classList.toggle("is-active", n === i));
    step.textContent = `STEP / ${String(i + 1).padStart(2,"0")}`;
    state.textContent = item.state;
    title.textContent = item.title;
    copy.textContent = item.copy;
    metrics.innerHTML = item.metrics.map(([a,b]) => `<span><small>${a}</small><strong>${b}</strong></span>`).join("");
    setAccent(item.accent);
  }

  bands.forEach((band, i) => band.addEventListener("click", () => select(i)));
  select(0);
}

const outcomeData = [
  {
    code: "01 / SIGNAL OVERLOAD",
    title: "Stop asking engineers to assemble the story manually.",
    copy: "Bring vibration, electrical behavior, operating state and maintenance history into one diagnostic context.",
    question: "What is actually wrong with this asset?",
    accent: "cyan"
  },
  {
    code: "02 / FALSE URGENCY",
    title: "Not every threshold crossing deserves the same response.",
    copy: "Persistence, machine state and asset importance should shape the priority — not alarm magnitude alone.",
    question: "Does this need action now?",
    accent: "yellow"
  },
  {
    code: "03 / BROKEN HANDOFF",
    title: "Keep engineering context attached to the work.",
    copy: "The diagnosis, evidence and recommendation should remain visible when maintenance takes ownership.",
    question: "What exactly should the technician do?",
    accent: "mint"
  },
  {
    code: "04 / REPEATED FAILURE",
    title: "A repair should become reliability knowledge.",
    copy: "Connect completed work and post-maintenance behavior so recurring bad actors become visible over time.",
    question: "Why are we solving this again?",
    accent: "violet"
  },
  {
    code: "05 / MACHINE + PROCESS",
    title: "Machine condition and operations are part of the same story.",
    copy: "Use load, speed, pressure, state and other process context to explain when asset behavior is operationally driven.",
    question: "Is this a machine problem, a process problem, or both?",
    accent: "pink"
  }
];

function initOutcomes() {
  const rows = [...document.querySelectorAll(".matrix-row")];
  const code = document.querySelector("#outcomeCode");
  const title = document.querySelector("#outcomeTitle");
  const copy = document.querySelector("#outcomeCopy");
  const question = document.querySelector("#outcomeQuestion");

  function select(i) {
    const item = outcomeData[i];
    rows.forEach((row, n) => row.classList.toggle("is-active", n === i));
    code.textContent = item.code;
    title.textContent = item.title;
    copy.textContent = item.copy;
    question.textContent = item.question;
    setAccent(item.accent);
  }

  rows.forEach((row, i) => row.addEventListener("click", () => select(i)));
  select(0);
}

function initPointer() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  window.addEventListener("pointermove", (event) => {
    const nx = event.clientX / window.innerWidth - .5;
    const ny = event.clientY / window.innerHeight - .5;
    root.style.setProperty("--mx", nx.toFixed(3));
    root.style.setProperty("--my", ny.toFixed(3));
  });
}

initPointer();
if (page === "home") initDeck();
if (page === "platform") initSystem();
if (page === "solutions") initOutcomes();