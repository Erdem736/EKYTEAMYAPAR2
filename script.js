const numbers = document.querySelectorAll(".number");
const diceCircle = document.getElementById("diceCircle");
const rollButton = document.getElementById("rollButton");

let selectedNumber = 1;
let rolling = false;

const colors = [
  "#ff0000", // KIRMIZI
  "#ff6600", // TURUNCU
  "#ffff00", // SARI
  "#00ff00", // YEŞİL
  "#008cff", // MAVİ
  "#a000ff"  // MOR
];

function createDots(count) {
  diceCircle.innerHTML = "";
  diceCircle.className = `dice-circle count-${count}`;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.className = "die-dot";
    dot.style.background = "#111";
    dot.style.color = "#fff";
    diceCircle.appendChild(dot);
  }
}

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function playClick() {
  const audioContext =
    new (window.AudioContext || window.webkitAudioContext)();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(900, audioContext.currentTime);

  gain.gain.setValueAtTime(0.12, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 0.07
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.07);
}

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (rolling) return;

    numbers.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    selectedNumber = Number(button.dataset.number);
    createDots(selectedNumber);
  });
});

rollButton.addEventListener("click", () => {
  if (rolling) return;

  rolling = true;
  playClick();

  const dots = document.querySelectorAll(".die-dot");

  diceCircle.classList.add("rolling");

  dots.forEach((dot) => {
    dot.classList.add("rolling");
  });

  // Hızlı rastgele renk değişimleri
  const interval = setInterval(() => {
    dots.forEach((dot) => {
      dot.style.background = randomColor();
      dot.style.color = dot.style.background;
    });
  }, 80);

  // Sonucu belirle
  setTimeout(() => {
    clearInterval(interval);

    dots.forEach((dot) => {
      const color = randomColor();

      dot.style.background = color;
      dot.style.color = color;
      dot.classList.remove("rolling");
    });

    diceCircle.classList.remove("rolling");
    rolling = false;
  }, 750);
