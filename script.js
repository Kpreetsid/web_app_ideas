const scenes = [
  {
    index: "01",
    eyebrow: "A web experience",
    titleA: "Ideas should",
    titleB: "feel alive.",
    copy: "Forget the usual top-to-bottom landing page. Move through the story like a space — one idea, one interaction, one clear point of view.",
    action: "Move to the next idea",
    accent: "#f16d93",
    soft: "#ffd6e2",
    ambientA: "#31b9dd",
    ambientB: "#f8c84b",
    ambientC: "#82d1ae",
    signal: "POINTER / X-Y",
    tempo: "CALM",
    intensity: 42,
    labelA: "NON-LINEAR",
    labelB: "TACTILE"
  },
  {
    index: "02",
    eyebrow: "Motion with purpose",
    titleA: "The interface",
    titleB: "responds.",
    copy: "Movement is not decoration here. The layout reacts to your cursor, the geometry shifts, and the visual hierarchy changes without making you hunt through sections.",
    action: "Follow the signal",
    accent: "#31b9dd",
    soft: "#cdeff7",
    ambientA: "#f16d93",
    ambientB: "#82d1ae",
    ambientC: "#f8c84b",
    signal: "MOTION / DELTA",
    tempo: "FLUID",
    intensity: 68,
    labelA: "RESPONSIVE",
    labelB: "KINETIC"
  },
  {
    index: "03",
    eyebrow: "One strong signal",
    titleA: "Less content.",
    titleB: "More memory.",
    copy: "A homepage does not need twelve feature blocks to feel complete. A memorable interaction, a sharp message and a deliberate visual system can do more with less.",
    action: "Return to the start",
    accent: "#82d1ae",
    soft: "#d8f0e5",
    ambientA: "#f8c84b",
    ambientB: "#f16d93",
    ambientC: "#31b9dd",
    signal: "FOCUS / MEMORY",
    tempo: "SHARP",
    intensity: 86,
    labelA: "DISTILLED",
    labelB: "MEMORABLE"
  }
];

const root = document.documentElement;
const body = document.body;
const core = document.querySelector(".core");
const title = document.querySelector("#sceneTitle");
const copy = document.querySelector("#sceneCopy");
const eyebrowIndex = document.querySelector("#eyebrowIndex");
const eyebrowText = document.querySelector("#eyebrowText");
const action = document.querySelector("#primaryAction");
const actionLabel = action.querySelector("span");
const nodes = [...document.querySelectorAll(".scene-node")];
const trackItems = [...document.querySelectorAll(".track-item")];
const ambientA = document.querySelector(".ambient-a");
const ambientB = document.querySelector(".ambient-b");
const ambientC = document.querySelector(".ambient-c");
const signalName = document.querySelector("#signalName");
const signalValue = document.querySelector("#signalValue");
const signalTempo = document.querySelector("#signalTempo");
const signalBars = [...document.querySelectorAll(".signal-bars i")];
const kineticA = document.querySelector("#kineticA");
const kineticB = document.querySelector("#kineticB");

let currentScene = 0;
let pointerIntensity = 42;

function setScene(index) {
  currentScene = (index + scenes.length) % scenes.length;
  const scene = scenes[currentScene];

  core.classList.add("is-changing");

  window.setTimeout(() => {
    eyebrowIndex.textContent = scene.index;
    eyebrowText.textContent = scene.eyebrow;
    title.innerHTML = `<span>${scene.titleA}</span><strong>${scene.titleB}</strong>`;
    copy.textContent = scene.copy;
    actionLabel.textContent = scene.action;

    root.style.setProperty("--accent", scene.accent);
    root.style.setProperty("--accent-soft", scene.soft);

    ambientA.style.background = scene.ambientA;
    ambientB.style.background = scene.ambientB;
    ambientC.style.background = scene.ambientC;
    signalName.textContent = scene.signal;
    signalTempo.textContent = scene.tempo;
    pointerIntensity = scene.intensity;
    signalValue.textContent = `${scene.intensity}%`;
    kineticA.textContent = scene.labelA;
    kineticB.textContent = scene.labelB;

    signalBars.forEach((bar, barIndex) => {
      const wave = 22 + ((scene.intensity + barIndex * 17) % 68);
      bar.style.height = `${wave}%`;
    });

    nodes.forEach((node) => {
      node.classList.toggle("is-active", Number(node.dataset.scene) === currentScene);
    });

    trackItems.forEach((item) => {
      item.classList.toggle("is-active", Number(item.dataset.scene) === currentScene);
    });

    core.classList.remove("is-changing");
  }, 150);
}

document.querySelectorAll("[data-scene]").forEach((control) => {
  control.addEventListener("click", () => setScene(Number(control.dataset.scene)));
});

action.addEventListener("click", () => setScene(currentScene + 1));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") setScene(currentScene + 1);
  if (event.key === "ArrowLeft") setScene(currentScene - 1);
});

const clock = document.querySelector("#localClock");
const motionToggle = document.querySelector("#motionToggle");
const motionToggleLabel = motionToggle.querySelector("span:last-child");
const manifestoTrigger = document.querySelector("#manifestoTrigger");
const manifestoNote = document.querySelector("#manifestoNote");

function updateClock() {
  clock.textContent = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  }).format(new Date());
}

updateClock();
window.setInterval(updateClock, 1000);

motionToggle.addEventListener("click", () => {
  const enabled = body.classList.toggle("pulse-mode");
  motionToggle.setAttribute("aria-pressed", String(enabled));
  motionToggleLabel.textContent = enabled ? "MOTION / PULSE" : "MOTION / CALM";
  signalTempo.textContent = enabled ? "PULSE" : scenes[currentScene].tempo;
});

manifestoTrigger.addEventListener("click", () => {
  const open = manifestoNote.classList.toggle("is-open");
  manifestoTrigger.setAttribute("aria-expanded", String(open));
  manifestoNote.setAttribute("aria-hidden", String(!open));
});

const menuButton = document.querySelector(".menu-button");
const panel = document.querySelector(".index-panel");
const panelClose = document.querySelector(".panel-close");

function setPanel(open) {
  panel.classList.toggle("is-open", open);
  panel.setAttribute("aria-hidden", String(!open));
  body.style.overflow = open ? "hidden" : "";
}

menuButton.addEventListener("click", () => setPanel(true));
panelClose.addEventListener("click", () => setPanel(false));

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setPanel(false);
});

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

if (window.matchMedia("(pointer: fine)").matches) {
  body.classList.add("has-pointer");

  window.addEventListener("pointermove", (event) => {
    const nx = event.clientX / window.innerWidth - 0.5;
    const ny = event.clientY / window.innerHeight - 0.5;

    root.style.setProperty("--mx", nx.toFixed(3));
    root.style.setProperty("--my", ny.toFixed(3));

    const movement = Math.min(99, Math.round((Math.abs(nx) + Math.abs(ny)) * 85 + scenes[currentScene].intensity * .42));
    pointerIntensity += (movement - pointerIntensity) * .24;
    signalValue.textContent = `${Math.round(pointerIntensity)}%`;

    signalBars.forEach((bar, barIndex) => {
      const phase = Math.abs(Math.sin((nx * 4.5) + (ny * 3.2) + barIndex * .72));
      bar.style.height = `${18 + phase * 76}%`;
    });

    cursor.animate(
      { transform: `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)` },
      { duration: 360, fill: "forwards", easing: "cubic-bezier(.22,1,.36,1)" }
    );

    cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll("button, a").forEach((element) => {
    element.addEventListener("pointerenter", () => body.classList.add("is-hovering"));
    element.addEventListener("pointerleave", () => body.classList.remove("is-hovering"));
  });
}
