const page = document.documentElement.dataset.page;
const root = document.documentElement;
const body = document.body;

const homeScenes = [
  {
    index: "01",
    eyebrow: "Industrial Reliability Intelligence",
    titleA: "Know what matters.",
    titleB: "Fix what matters.",
    copy: "Presage brings machine health, operating context and maintenance execution into one reliability loop — so teams move from signals to confident action.",
    accent: "#f16d93",
    signal: "CONTEXT / UNIFIED",
    focus: "ASSET",
    mode: "DECIDE",
    bars: 58
  },
  {
    index: "02",
    eyebrow: "Machine Health",
    titleA: "See the fault.",
    titleB: "Not just the waveform.",
    copy: "Combine vibration, temperature and motor-current intelligence to detect developing mechanical and electrical problems across rotating equipment.",
    accent: "#31b9dd",
    signal: "HEALTH / MULTI-SIGNAL",
    focus: "FAULT",
    mode: "DIAGNOSE",
    bars: 74
  },
  {
    index: "03",
    eyebrow: "Operational Intelligence",
    titleA: "Machines do not",
    titleB: "fail in a vacuum.",
    copy: "Bring load, speed, pressure, operating mode and process state into the diagnosis so teams can separate machine faults from changing operating conditions.",
    accent: "#f8c84b",
    signal: "PROCESS / CORRELATED",
    focus: "CONTEXT",
    mode: "UNDERSTAND",
    bars: 66
  },
  {
    index: "04",
    eyebrow: "Maintenance Intelligence",
    titleA: "Close the gap",
    titleB: "between alert and action.",
    copy: "Turn diagnosis into clear maintenance priorities, recommendations and work execution — then retain the history needed to learn what worked.",
    accent: "#82d1ae",
    signal: "WORK / CLOSED LOOP",
    focus: "ACTION",
    mode: "IMPROVE",
    bars: 84
  }
];

const loopScenes = [
  {
    title: "Monitor",
    copy: "Capture the signals that describe how an asset is actually behaving — continuously or periodically, depending on criticality.",
    proof: ["Vibration", "Temperature", "MCSA", "Existing plant data"],
    accent: "#31b9dd"
  },
  {
    title: "Understand",
    copy: "Correlate condition signals with machine history and operating context to move from anomaly detection toward evidence-backed diagnosis.",
    proof: ["Fault patterns", "Baselines", "Operating mode", "Cross-signal context"],
    accent: "#f16d93"
  },
  {
    title: "Decide",
    copy: "Focus attention on what deserves action by combining fault evidence, severity, asset importance and the surrounding production context.",
    proof: ["Severity", "Criticality", "Priority", "Evidence"],
    accent: "#f8c84b"
  },
  {
    title: "Act",
    copy: "Carry the diagnosis into the maintenance workflow with recommended actions, work visibility and the context technicians need before intervention.",
    proof: ["Recommendations", "CMMS", "Work orders", "Maintenance history"],
    accent: "#82d1ae"
  },
  {
    title: "Improve",
    copy: "Keep the result of each intervention in the reliability record so recurring failures, bad actors and improvement opportunities become easier to see.",
    proof: ["Validation", "History", "Recurring faults", "Fleet learning"],
    accent: "#b493d5"
  }
];

const problems = [
  {
    kicker: "PROBLEM / 01",
    title: "Too many signals.<br>Not enough certainty.",
    copy: "Bring vibration, electrical behavior, operating state and maintenance history into the same diagnostic context instead of asking teams to interpret each source alone.",
    shift: "From isolated alarms → contextual machine diagnosis",
    accent: "#31b9dd"
  },
  {
    kicker: "PROBLEM / 02",
    title: "Every alarm cannot<br>be urgent.",
    copy: "Use asset behavior, persistence, operating mode and machine importance to help teams distinguish a developing problem from a transient event.",
    shift: "From static thresholds → reliability-aware prioritization",
    accent: "#f8c84b"
  },
  {
    kicker: "PROBLEM / 03",
    title: "Insight dies at<br>the handoff.",
    copy: "Connect diagnosis to maintenance execution so the reason for the work, supporting evidence and asset history remain attached to the action.",
    shift: "From alert inbox → connected maintenance workflow",
    accent: "#82d1ae"
  },
  {
    kicker: "PROBLEM / 04",
    title: "The same failure<br>keeps coming back.",
    copy: "Preserve the chain from detection through action and outcome so teams can identify recurring bad actors and improve the reliability strategy over time.",
    shift: "From one-off fixes → a learning reliability loop",
    accent: "#f16d93"
  }
];

const roleCopy = {
  reliability: "Which assets are becoming bad actors, why are they failing, and what evidence supports the diagnosis?",
  maintenance: "What needs action now, what should the technician know, and how does the work connect back to the original fault?",
  operations: "Is the issue mechanical, process-driven or both — and how is asset condition interacting with production?"
};

function initHome() {
  const core = document.querySelector(".core");
  const title = document.querySelector("#sceneTitle");
  const copy = document.querySelector("#sceneCopy");
  const eyebrowIndex = document.querySelector("#eyebrowIndex");
  const eyebrowText = document.querySelector("#eyebrowText");
  const nodes = [...document.querySelectorAll(".scene-node")];
  const trackItems = [...document.querySelectorAll(".track-item")];
  const signalName = document.querySelector("#signalName");
  const signalValue = document.querySelector("#signalValue");
  const signalTempo = document.querySelector("#signalTempo");
  const bars = [...document.querySelectorAll(".signal-bars i")];

  let current = 0;

  function setScene(index) {
    current = (index + homeScenes.length) % homeScenes.length;
    const scene = homeScenes[current];
    core.classList.add("is-changing");

    window.setTimeout(() => {
      eyebrowIndex.textContent = scene.index;
      eyebrowText.textContent = scene.eyebrow;
      title.innerHTML = `<span>${scene.titleA}</span><strong>${scene.titleB}</strong>`;
      copy.textContent = scene.copy;
      root.style.setProperty("--accent", scene.accent);
      signalName.textContent = scene.signal;
      signalValue.textContent = scene.focus;
      signalTempo.textContent = scene.mode;

      bars.forEach((bar, i) => {
        const wave = 20 + ((scene.bars + i * 19) % 72);
        bar.style.height = `${wave}%`;
      });

      nodes.forEach((node) => node.classList.toggle("is-active", Number(node.dataset.scene) === current));
      trackItems.forEach((item) => item.classList.toggle("is-active", Number(item.dataset.scene) === current));
      core.classList.remove("is-changing");
    }, 140);
  }

  document.querySelectorAll("[data-scene]").forEach((control) => {
    control.addEventListener("click", () => setScene(Number(control.dataset.scene)));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") setScene(current + 1);
    if (event.key === "ArrowLeft") setScene(current - 1);
  });
}

function initPlatform() {
  const center = document.querySelector(".loop-center");
  const index = document.querySelector("#loopIndex");
  const title = document.querySelector("#loopTitle");
  const copy = document.querySelector("#loopCopy");
  const proof = document.querySelector("#loopProof");
  const nodes = [...document.querySelectorAll(".loop-node")];
  let current = 0;

  function setLoop(i) {
    current = (i + loopScenes.length) % loopScenes.length;
    const item = loopScenes[current];
    center.classList.add("is-changing");
    window.setTimeout(() => {
      index.textContent = `${String(current + 1).padStart(2, "0")} / 05`;
      title.textContent = item.title;
      copy.textContent = item.copy;
      proof.innerHTML = item.proof.map((p) => `<span>${p}</span>`).join("");
      root.style.setProperty("--accent", item.accent);
      nodes.forEach((node) => node.classList.toggle("is-active", Number(node.dataset.loop) === current));
      center.classList.remove("is-changing");
    }, 130);
  }

  document.querySelectorAll("[data-loop]").forEach((el) => {
    el.addEventListener("click", (event) => {
      event.preventDefault();
      setLoop(Number(el.dataset.loop));
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") setLoop(current + 1);
    if (event.key === "ArrowLeft") setLoop(current - 1);
  });
}

function initSolutions() {
  const core = document.querySelector(".problem-core");
  const kicker = document.querySelector("#problemKicker");
  const title = document.querySelector("#problemTitle");
  const copy = document.querySelector("#problemCopy");
  const shift = document.querySelector("#problemShift");
  const nodes = [...document.querySelectorAll(".problem-node")];

  function setProblem(i) {
    const item = problems[i];
    core.classList.add("is-changing");
    window.setTimeout(() => {
      kicker.textContent = item.kicker;
      title.innerHTML = item.title;
      copy.textContent = item.copy;
      shift.textContent = item.shift;
      root.style.setProperty("--accent", item.accent);
      nodes.forEach((node) => node.classList.toggle("is-active", Number(node.dataset.problem) === i));
      core.classList.remove("is-changing");
    }, 130);
  }

  nodes.forEach((node) => node.addEventListener("click", () => setProblem(Number(node.dataset.problem))));

  const roleText = document.querySelector("#roleCopy");
  document.querySelectorAll(".role-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".role-chip").forEach((item) => item.classList.remove("is-active"));
      chip.classList.add("is-active");
      roleText.textContent = roleCopy[chip.dataset.role];
    });
  });
}

function initPanel() {
  const menuButton = document.querySelector(".menu-button");
  const panel = document.querySelector(".index-panel");
  const close = document.querySelector(".panel-close");
  if (!menuButton || !panel || !close) return;

  function setPanel(open) {
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
  }

  menuButton.addEventListener("click", () => setPanel(true));
  close.addEventListener("click", () => setPanel(false));
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setPanel(false);
  });
}

function initMotion() {
  const toggle = document.querySelector("#motionToggle");
  if (!toggle) return;
  const label = toggle.querySelector("span:last-child");
  toggle.addEventListener("click", () => {
    const enabled = body.classList.toggle("pulse-mode");
    toggle.setAttribute("aria-pressed", String(enabled));
    label.textContent = enabled ? "MOTION / PULSE" : "MOTION / CALM";
  });
}

function initPointer() {
  const cursor = document.querySelector(".cursor");
  const cursorDot = document.querySelector(".cursor-dot");
  if (!cursor || !cursorDot || !window.matchMedia("(pointer: fine)").matches) return;

  body.classList.add("has-pointer");

  window.addEventListener("pointermove", (event) => {
    const nx = event.clientX / window.innerWidth - 0.5;
    const ny = event.clientY / window.innerHeight - 0.5;
    root.style.setProperty("--mx", nx.toFixed(3));
    root.style.setProperty("--my", ny.toFixed(3));

    cursor.animate(
      { transform: `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)` },
      { duration: 340, fill: "forwards", easing: "cubic-bezier(.22,1,.36,1)" }
    );
    cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;

    const homeBars = [...document.querySelectorAll(".signal-bars i")];
    homeBars.forEach((bar, i) => {
      const phase = Math.abs(Math.sin(nx * 4.5 + ny * 3.2 + i * .72));
      bar.style.height = `${18 + phase * 76}%`;
    });
  });

  document.querySelectorAll("button, a").forEach((element) => {
    element.addEventListener("pointerenter", () => body.classList.add("is-hovering"));
    element.addEventListener("pointerleave", () => body.classList.remove("is-hovering"));
  });
}

initPanel();
initMotion();
initPointer();
if (page === "home") initHome();
if (page === "platform") initPlatform();
if (page === "solutions") initSolutions();