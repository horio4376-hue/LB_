// ===================== NEURAL BACKGROUND =====================
const canvas = document.getElementById('neural-bg');
const ctx = canvas.getContext('2d');

let nodes = [];
const NODE_COUNT = 50;
const CONNECTION_DIST = 320;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', () => { resizeCanvas();
  initNodes(); });

function drawHeart(cx, cy, size, color, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;
  ctx.beginPath();
  const s = size;
  ctx.moveTo(cx, cy + s * 0.3);
  ctx.bezierCurveTo(cx, cy - s * 0.1, cx - s * 0.6, cy - s * 0.4, cx - s * 0.6, cy);
  ctx.bezierCurveTo(cx - s * 0.6, cy + s * 0.4, cx, cy + s * 0.7, cx, cy + s * 0.9);
  ctx.bezierCurveTo(cx, cy + s * 0.7, cx + s * 0.6, cy + s * 0.4, cx + s * 0.6, cy);
  ctx.bezierCurveTo(cx + s * 0.6, cy - s * 0.4, cx, cy - s * 0.1, cx, cy + s * 0.3);
  ctx.fill();
  ctx.restore();
}

function initNodes() {
  nodes = [];
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: 7 + Math.random() * 9,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.008 + Math.random() * 0.015,
    });
  }
}
initNodes();

let globalTime = 0;

function animateNeural() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  globalTime += 0.01;

  // Draw connections with glow
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DIST) {
        const t = 1 - dist / CONNECTION_DIST;
        const alpha = t * 0.55;
        const lineWidth = 1 + t * 2.5;

        // Внешний glow-слой
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 51, 102, ${alpha * 0.4})`;
        ctx.lineWidth = lineWidth + 4;
        ctx.lineCap = 'round';
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();

        // Основная линия
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 80, 130, ${alpha})`;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();

        // Яркая сердцевина линии
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255, 180, 200, ${alpha * 0.5})`;
        ctx.lineWidth = Math.max(0.5, lineWidth - 1.5);
        ctx.lineCap = 'round';
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }

  // Update & draw nodes
  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;
    node.pulse += node.pulseSpeed;

    if (node.x < -30) node.x = canvas.width + 30;
    if (node.x > canvas.width + 30) node.x = -30;
    if (node.y < -30) node.y = canvas.height + 30;
    if (node.y > canvas.height + 30) node.y = -30;

    const pulseFactor = 1 + Math.sin(node.pulse) * 0.25;
    const drawSize = node.size * pulseFactor;
    const alpha = 0.4 + Math.sin(node.pulse) * 0.2;

    // Большой размытый glow
    ctx.save();
    ctx.shadowColor = 'rgba(255, 51, 102, 0.7)';
    ctx.shadowBlur = 30;
    drawHeart(node.x, node.y - drawSize * 0.3, drawSize, '#ff3366', alpha);
    ctx.restore();

    // Яркое ядро сердца
    drawHeart(node.x, node.y - drawSize * 0.3, drawSize * 0.7, '#ff8aaa', alpha * 0.6);
  }

  requestAnimationFrame(animateNeural);
}
animateNeural();

// ===================== PRODUCTS DATA =====================
const products = [
  { id: 1, name: 'Худи «Нейронный импульс»', category: 'hoodie', badge: 'New', desc: 'Оверсайз худи с принтом нейронной сети. 80% хлопок, 20% полиэстер.', price: '6 990', img: 'https://picsum.photos/seed/lovebrain-hoodie1/600/800.jpg' },
  { id: 2, name: 'Футболка «Синапс»', category: 'tshirt', badge: null, desc: 'Плотная футболка с минималистичным графическим принтом.', price: '3 490', img: 'https://picsum.photos/seed/lovebrain-tshirt1/600/800.jpg' },
  { id: 3, name: 'Куртка «Кортикальная оболочка»', category: 'jacket', badge: 'Хит', desc: 'Лёгкая ветровка с водоотталкивающей пропиткой и рефлекторными элементами.', price: '12 990', img: 'https://picsum.photos/seed/lovebrain-jacket1/600/800.jpg' },
  { id: 4, name: 'Штаны «Дофаминовый поток»', category: 'pants', badge: null, desc: 'Широкие парашютные штаны с карманами на молнии.', price: '5 490', img: 'https://picsum.photos/seed/lovebrain-pants1/600/800.jpg' },
  { id: 5, name: 'Худи «Амплитуда чувств»', category: 'hoodie', badge: null, desc: 'Утеплённое худи с крупной вышивкой-сердцем.', price: '7 990', img: 'https://picsum.photos/seed/lovebrain-hoodie2/600/800.jpg' },
  { id: 6, name: 'Футболка «Лимбическая система»', category: 'tshirt', badge: 'New', desc: 'Базовая футболка с шрифтовым принтом по груди.', price: '2 990', img: 'https://picsum.photos/seed/lovebrain-tshirt2/600/800.jpg' },
  { id: 7, name: 'Куртка «Миелиновый барьер»', category: 'jacket', badge: null, desc: 'Кожаная куртка-бомбер с мягкой подкладкой.', price: '18 990', img: 'https://picsum.photos/seed/lovebrain-jacket2/600/800.jpg' },
  { id: 8, name: 'Штаны «Рефлекс»', category: 'pants', badge: 'Хит', desc: 'Брюки-карго с регулируемым низом и накладными карманами.', price: '4 990', img: 'https://picsum.photos/seed/lovebrain-pants2/600/800.jpg' },
];

const categoryLabels = { hoodie: 'Худи', tshirt: 'Футболки', jacket: 'Куртки', pants: 'Штаны' };

const heartSVG = `<svg class="icon icon-heart" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

const brainSVG = `<svg class="icon icon-brain" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 2C9.5 2 7 4 7 6.5c0 .5.1 1 .2 1.5C5.5 8.5 4 10.5 4 12.5 4 15 6 17 8.5 17c.5 0 1-.1 1.5-.2.5 1.5 2 2.7 3.5 3-1.5-.3-3-1.5-3.5-3-.5.1-1 .2-1.5.2C6 17 4 15 4 12.5c0-2 1.5-4 3.2-4.5C7.1 7.5 7 7 7 6.5 7 4 9.5 2 12 2z"/>
  <path d="M12 2c2.5 0 5 2 5 4.5 0 .5-.1 1-.2 1.5C18.5 8.5 20 10.5 20 12.5c0 2.5-2 4.5-4.5 4.5-.5 0-1-.1-1.5-.2-.5 1.5-2 2.7-3.5 3 1.5-.3 3-1.5 3.5-3 .5.1 1 .2 1.5.2C18 17 20 15 20 12.5c0-2-1.5-4-3.2-4.5.1-.5.2-1 .2-1.5C17 4 14.5 2 12 2z"/>
  <path d="M12 6v12M9 9c1.5.5 2 1.5 2 3M15 9c-1.5.5-2 1.5-2 3M9 15c1.5-.5 2-1.5 2-3M15 15c-1.5-.5-2-1.5-2-3"/>
</svg>`;

function renderProducts(filter = 'all') {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);

  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.category = p.category;
    card.style.transitionDelay = `${i * 0.08}s`;
    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
        <button class="like-btn" onclick="toggleLike(this)">
          ${heartSVG}${brainSVG}
          <span class="burst"></span><span class="burst"></span><span class="burst"></span>
          <span class="burst"></span><span class="burst"></span><span class="burst"></span>
        </button>
      </div>
      <div class="product-info">
        <div class="product-category">${categoryLabels[p.category]}</div>
        <div class="product-name">${p.name