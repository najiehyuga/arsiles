/**
 * Floating Flower Petals Engine (Bunga-bunga beterbangan)
 * Delicate, subtle background motion. Lightweight Canvas 60fps.
 */
(function() {
  'use strict';

  const canvas = document.getElementById('petalsCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let isRunning = true;
  let animationId = null;

  // Gentle botanical soft petals
  const TOTAL_PETALS = 28;
  const petals = [];

  const petalColors = [
    { fill: 'rgba(235, 178, 198, 0.65)', stroke: 'rgba(215, 150, 175, 0.45)' },
    { fill: 'rgba(245, 195, 212, 0.7)', stroke: 'rgba(225, 165, 185, 0.5)' },
    { fill: 'rgba(248, 210, 222, 0.6)', stroke: 'rgba(230, 180, 198, 0.4)' },
    { fill: 'rgba(210, 228, 242, 0.65)', stroke: 'rgba(180, 205, 225, 0.45)' }
  ];

  class Petal {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : -20 - Math.random() * 40;
      this.size = 9 + Math.random() * 10;
      this.speedY = 0.7 + Math.random() * 1.1;
      this.speedX = 0.2 + Math.random() * 0.6;
      this.angle = Math.random() * Math.PI * 2;
      this.spinSpeed = (Math.random() - 0.5) * 0.025;
      this.swaySpeed = 0.012 + Math.random() * 0.018;
      this.swayWidth = 1 + Math.random() * 1.8;
      this.swayAngle = Math.random() * Math.PI * 2;
      this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
    }

    update() {
      this.y += this.speedY;
      this.swayAngle += this.swaySpeed;
      this.x += Math.sin(this.swayAngle) * this.swayWidth + this.speedX;
      this.angle += this.spinSpeed;

      if (this.y > height + 25 || this.x > width + 25 || this.x < -25) {
        this.reset(false);
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // Clean petal silhouette
      ctx.beginPath();
      ctx.moveTo(0, -this.size);
      ctx.bezierCurveTo(this.size * 0.75, -this.size * 0.45, this.size * 0.75, this.size * 0.45, 0, this.size);
      ctx.bezierCurveTo(-this.size * 0.75, this.size * 0.45, -this.size * 0.75, -this.size * 0.45, 0, -this.size);

      ctx.fillStyle = this.color.fill;
      ctx.fill();
      ctx.strokeStyle = this.color.stroke;
      ctx.lineWidth = 0.8;
      ctx.stroke();

      // Subtle vein
      ctx.beginPath();
      ctx.moveTo(0, -this.size * 0.6);
      ctx.lineTo(0, this.size * 0.5);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.stroke();

      ctx.restore();
    }
  }

  for (let i = 0; i < TOTAL_PETALS; i++) {
    petals.push(new Petal());
  }

  function loop() {
    if (!isRunning) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < petals.length; i++) {
      petals[i].update();
      petals[i].draw();
    }

    animationId = requestAnimationFrame(loop);
  }

  loop();

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const toggleBtn = document.getElementById('togglePetalsBtn');
  if (toggleBtn) {
    const updateButtonText = () => {
      toggleBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2a4 4 0 0 0-4 4c0 1.5.8 2.8 2 3.5"/>
          <path d="M12 22a4 4 0 0 0 4-4c0-1.5-.8-2.8-2-3.5"/>
          <path d="M2 12a4 4 0 0 0 4 4c1.5 0 2.8-.8 3.5-2"/>
          <path d="M22 12a4 4 0 0 0-4-4c-1.5 0-2.8.8-3.5 2"/>
        </svg>
        <span>${isRunning ? 'Efek Bunga: Aktif' : 'Efek Bunga: Dijeda'}</span>
      `;
      toggleBtn.setAttribute('aria-pressed', isRunning ? 'true' : 'false');
    };

    updateButtonText();

    toggleBtn.addEventListener('click', () => {
      isRunning = !isRunning;
      updateButtonText();
      if (isRunning) {
        loop();
      } else {
        ctx.clearRect(0, 0, width, height);
        if (animationId) cancelAnimationFrame(animationId);
      }
    });
  }
})();
