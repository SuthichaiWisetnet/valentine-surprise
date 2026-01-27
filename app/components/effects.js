"use client";

export function createConfetti() {
  const colors = ["#FF6B9D", "#FFD700", "#C44569", "#FFE4EC", "#FF69B4"];
  const container = document.body;

  for (let i = 0; i < 100; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.style.cssText = `
        position: fixed;
        top: -10px;
        left: ${Math.random() * 100}vw;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        pointer-events: none;
        z-index: 9999;
        animation: confetti ${Math.random() * 3 + 2}s linear forwards;
      `;
      container.appendChild(confetti);

      setTimeout(() => confetti.remove(), 5000);
    }, i * 30);
  }
}
