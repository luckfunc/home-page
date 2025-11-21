const ORIGINS = {
  left: { x: -27.2, y: -23.7 },
  right: { x: 17.0, y: 15.8 },
};

const DEFAULT_COLOR = "#0062AD";
const eyes = Array.from(document.querySelectorAll("[data-eye]"));
const colorInput = document.querySelector("#colorPicker");
const colorCodeEl = document.querySelector("[data-color-code]");
const root = document.documentElement;

function setDefaultPositions() {
  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");
    if (!pupil) return;
    const origin = ORIGINS[eye.dataset.origin] ?? { x: 0, y: 0 };
    pupil.style.transform = `translate(-50%, -50%) translate(${origin.x}px, ${origin.y}px)`;
  });
}

function moveEyes(pointerX, pointerY) {
  eyes.forEach((eye) => {
    const pupil = eye.querySelector(".pupil");
    if (!pupil) return;

    const rect = eye.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = pointerX - centerX;
    const deltaY = pointerY - centerY;
    const distance = Math.hypot(deltaX, deltaY) || 1;
    const maxTravel = Math.max((rect.width - pupil.offsetWidth) / 2 - 5, 0);
    const clamped = Math.min(distance, maxTravel);
    const ratio = clamped / distance;
    const origin = ORIGINS[eye.dataset.origin] ?? { x: 0, y: 0 };
    const translateX = deltaX * ratio + origin.x;
    const translateY = deltaY * ratio + origin.y;

    pupil.style.transform = `translate(-50%, -50%) translate(${translateX}px, ${translateY}px)`;
  });
}

function handlePointer(event) {
  const point = event.touches ? event.touches[0] : event;
  if (!point) return;
  moveEyes(point.clientX, point.clientY);
}

function applyColor(hex) {
  const normalized = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(hex) ? hex : DEFAULT_COLOR;
  root.style.setProperty("--cookie-monster-blue", normalized);
  if (colorCodeEl) {
    colorCodeEl.textContent = normalized.toUpperCase();
  }
}

setDefaultPositions();
applyColor(colorInput?.value ?? DEFAULT_COLOR);

window.addEventListener("mousemove", handlePointer);
window.addEventListener("touchmove", handlePointer, { passive: true });
document.addEventListener("mouseleave", setDefaultPositions);

colorInput?.addEventListener("input", (event) => {
  applyColor(event.target.value);
});

