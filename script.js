const numbers = document.querySelectorAll(".number");
const diceCircle = document.getElementById("diceCircle");
const rollButton = document.getElementById("rollButton");

let selectedNumber = 1;
let rolling = false;

const colors = [
  "#ff0000", // RED
  "#ff6600", // ORANGE
  "#ffff00", // YELLOW
  "#00ff00", // GREEN
  "#008cff", // BLUE
  "#a000ff"  // PURPLE
];

function createDots(count) {
  diceCircle.innerHTML = "";
  diceCircle.className = `dice-circle count-${count}`;

  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");

    dot.className = "die-dot";

    // Başlangıçta kırmızı neon
    dot.style.color = "#ff1515";
    dot.style.background = "#000";

    diceCircle.appendChild(dot);
  }
}

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

/* GERÇEK TIK SESİ */
function playClick() {
  const AudioContext =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audio = new AudioContext();

  const oscillator = audio.createOscillator();
  const gain = audio.createGain();

  oscillator.type = "square";
  oscillator.frequency.setValueAtTime(
    850,
    audio.currentTime
  );

  gain.gain.setValueAtTime(
    0.18,
    audio.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audio.currentTime + 0.06
  );

  oscillator.connect(gain);
  gain.connect(audio.destination);

  oscillator.start();
  oscillator.stop(audio.currentTime + 0.06);
}

/* 1 - 6 SEÇİMİ */

numbers.forEach(button => {

  button.addEventListener("click", () => {

    if (rolling) return;

    numbers.forEach(btn => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    selectedNumber =
      Number(button.dataset.number);

    createDots(selectedNumber);
  });

});

/* ROLL */

rollButton.addEventListener("click", () => {

  if (rolling) return;

  rolling = true;

  playClick();

  const dots =
    document.querySelectorAll(".die-dot");

  diceCircle.classList.add("rolling");

  dots.forEach(dot => {
    dot.classList.add("rolling");
  });

  /*
    Dönüş sırasında sürekli
    rastgele renk değiştirir.
  */

  const randomizer = setInterval(() => {

    dots.forEach(dot => {

      const color = randomColor();

      dot.style.color = color;
      dot.style.background = color;

    });

  }, 70);

  /*
    Sonuç
  */

  setTimeout(() => {

    clearInterval(randomizer);

    dots.forEach(dot => {

      const finalColor = randomColor();

      dot.style.color = finalColor;
      dot.style.background = finalColor;

      dot.classList.remove("rolling");

    });

    diceCircle.classList.remove("rolling");

    rolling = false;

  }, 850);

});


/* SAYFA AÇILINCA 1 TANE YUVARLAK */

createDots(1);
