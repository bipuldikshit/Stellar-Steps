const progress = document.getElementById("progress");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const circles = document.querySelectorAll(".circle");
const progressText = document.getElementById("progress-text");
const sound = document.getElementById("completion-sound");

let currentActive = 1;
let confettiRunning = false;

next.addEventListener("click", () => {
  currentActive++;
  if (currentActive > circles.length) currentActive = circles.length;
  update();
});

prev.addEventListener("click", () => {
  currentActive--;
  if (currentActive < 1) currentActive = 1;
  update();
});

function update() {
  circles.forEach((circle, idx) => {
    circle.classList.toggle("active", idx < currentActive);
  });

  const actives = document.querySelectorAll(".active");
  const percent = ((actives.length - 1) / (circles.length - 1)) * 100;

  progress.style.width = percent + "%";
  progressText.innerText = `Progress: ${Math.round(percent)}%`;

  prev.disabled = currentActive === 1;
  next.disabled = currentActive === circles.length;

  if (currentActive === circles.length && !confettiRunning) {
    confettiRunning = true;
    triggerCelebration();
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

function triggerCelebration() {
  const canvas = document.getElementById('confetti-canvas');
  const myConfetti = confetti.create(canvas, { resize: true, useWorker: true });

  const duration = 3 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    myConfetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
    });
    myConfetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  sound.play();  
}

circles.forEach((circle, index) => {
  circle.addEventListener("click", () => {
    currentActive = index + 1;
    update();
  });
});


