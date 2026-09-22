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
    ambientC: "#82d1ae"
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
    ambientC: "#f8c84b"
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
    ambientC: "#31b9dd"
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

let currentScene = 0;

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
