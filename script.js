/* ══════════════════════════════════════════
   ESTÉTICA V12 — Script
   ══════════════════════════════════════════ */

// ── Header scroll effect ──
const header = document.getElementById('siteHeader');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Intersection Observer (Reveal animations with stagger) ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay || 0);
      setTimeout(() => entry.target.classList.add('active'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Mobile menu toggle ──
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── Modal ──
const modal = document.getElementById('turnosModal');
const closeModalBtn = document.getElementById('closeModal');

function openModal() {
  modal.classList.add('active');
  if (window.__lenis) window.__lenis.stop();
}
function closeModal() {
  modal.classList.remove('active');
  if (window.__lenis) window.__lenis.start();
}

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

// ── Submit turno to WhatsApp ──
function submitTurno() {
  const nombre = document.getElementById('t_nombre').value.trim();
  const vehiculo = document.getElementById('t_vehiculo').value.trim();
  const servicio = document.getElementById('t_servicio').value;

  if (!nombre || !vehiculo) {
    alert('Por favor completá todos los campos.');
    return;
  }

  const msg = `Hola Darkestwindow! 🚗 Quiero agendar un turno.\n\n👤 Nombre: ${nombre}\n🚘 Vehículo: ${vehiculo}\n✨ Servicio: ${servicio}\n\nQuedo a la espera. ¡Gracias!`;
  window.open(`https://wa.me/5491164978368?text=${encodeURIComponent(msg)}`, '_blank');
  closeModal();
  document.getElementById('turnoForm').reset();
}

// ── Duplicate reviews for seamless marquee ──
const marquee = document.getElementById('reviewsMarquee');
if (marquee) {
  const items = marquee.innerHTML;
  marquee.innerHTML += items;
}

// ── Duplicate carousel for seamless loop ──
// Already duplicated in HTML

// ── Services Hover Split Layout ──
(function setupServices() {
  const list = document.getElementById('servicesList');
  const stage = document.getElementById('servicesStage');
  if (!list || !stage) return;
  const items = [...list.querySelectorAll('.service-item')];
  if (!items.length) return;

  const sources = new Set();
  items.forEach(i => {
    if (i.dataset.img) sources.add(i.dataset.img);
  });

  const imgMap = {};
  sources.forEach((src) => {
    const img = document.createElement('img');
    img.src = src;
    img.alt = '';
    img.loading = 'eager';
    stage.appendChild(img);
    imgMap[src] = img;
  });

  let activeItem = items[0];

  const updateVisibility = () => {
    Object.values(imgMap).forEach(img => img.classList.remove('is-visible'));
    if (activeItem) {
      const pSrc = activeItem.dataset.img;
      if (imgMap[pSrc]) imgMap[pSrc].classList.add('is-visible');
    }
  };

  const setActive = (item) => {
    if (item === activeItem) return;
    items.forEach((i) => i.classList.toggle('is-active', i === item));
    activeItem = item;
    updateVisibility();
  };

  updateVisibility();

  const isDesktop = () => window.matchMedia('(hover: hover) and (min-width: 1025px)').matches;
  items.forEach((item) => {
    item.addEventListener('mouseenter', () => { if (isDesktop()) setActive(item); });
    item.addEventListener('focusin', () => { if (isDesktop()) setActive(item); });
  });
})();



// ── Swiper gallery ──
if (window.Swiper) {
  new Swiper('#gallerySwiper', {
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 24,
    loop: true,
    grabCursor: true,
    speed: 600,
    autoplay: { delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    keyboard: { enabled: true },
    breakpoints: {
      0:   { spaceBetween: 14 },
      768: { spaceBetween: 24 },
    },
  });
}

// ── Compare Before/After Slider ──
const compareSlider = document.getElementById('compareSlider');
const afterWrap = document.getElementById('afterWrap');
const compareHandle = document.getElementById('compareHandle');

if (compareSlider && afterWrap && compareHandle) {
  let isDragging = false;

  const move = (e) => {
    if (!isDragging) return;
    const rect = compareSlider.getBoundingClientRect();
    let x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    x = Math.max(0, Math.min(x, rect.width));
    const percent = (x / rect.width) * 100;
    afterWrap.style.width = `${percent}%`;
    compareHandle.style.left = `${percent}%`;
  };

  compareSlider.addEventListener('mousedown', () => isDragging = true);
  compareSlider.addEventListener('touchstart', () => isDragging = true);
  
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('touchend', () => isDragging = false);
  
  window.addEventListener('mousemove', move);
  window.addEventListener('touchmove', move, { passive: false });
}
