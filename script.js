document.documentElement.classList.add('js');

// scroll progress bar
const bar = document.createElement('div');
bar.id = 'progress';
document.body.appendChild(bar);
addEventListener('scroll', () => {
  const h = document.documentElement;
  bar.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
}, { passive: true });

// reveal on scroll (staggered inside grids)
const targets = document.querySelectorAll('section > p, section > h2, .card, .tl-item, .skill, .step, .langs div, .two-col p, .contact');
targets.forEach(el => {
  el.classList.add('reveal');
  const sibs = el.parentElement ? [...el.parentElement.children] : [];
  el.style.setProperty('--d', Math.min(sibs.indexOf(el), 6) * 90 + 'ms');
});
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
targets.forEach(el => io.observe(el));

// typing effect in hero
const typed = document.querySelector('.typed');
if (typed && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const words = JSON.parse(typed.dataset.words);
  let w = 0, c = words[0].length, del = true;
  (function tick() {
    const word = words[w];
    typed.textContent = word.slice(0, c);
    if (del) { c--; if (c < 0) { del = false; w = (w + 1) % words.length; c = 0; } }
    else { c++; if (c > words[w].length) { del = true; c = words[w].length; return setTimeout(tick, 1400); } }
    setTimeout(tick, del ? 40 : 80);
  })();
}

// subtle 3D tilt on cards
if (matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}
