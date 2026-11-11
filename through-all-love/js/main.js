'use strict';

const PASSWORD = '382008'; // front-end only, not real security
const IMG = n => `assets/images/${n}.jpg`;
const ALT = {
  1: 'Jana smiling, a memory we share',
  2: 'Jana with her beautiful curly hair',
  3: 'Jana in a happy, candid moment',
  4: 'Jana looking radiant',
  5: 'Jana, my favorite part of every day'
};

/* ---------- All the original text, word for word ---------- */
const T = {
  p1: 'جنى، يمكن مش بعرف أقولك كل الكلام اللي جوايا كل مرة، بس عايزك تعرفي إن أنا فخور بيكي جداً.',
  p2: 'فخور بكل إنجاز بتعمليه، بكل خطوة بتاخديها، وبكل مرة بتثبتي فيها لنفسك قبل أي حد إنك قادرة توصلي للي بتحلمي بيه.',
  p3: 'أنا مغرم بيكي، وبجد وجودك معايا بيخليني أسعد واحد في الدنيا. يمكن ساعات بتكسف أكتبلك في الكومنتات إني فخور بيكي، بس صدقيني ده مش معناه إني مش حاسس بكل إنجاز بتعمليه. بالعكس، أنا بلاحظ تفاصيلك وبفرح بنجاحك كأنه نجاحي.',
  p4: 'بحب طموحك، وشخصيتك، وتفاصيلك الصغيرة، وحتى الحاجات اللي يمكن إنتِ مش واخدة بالك إنها مميزة فيكي.',
  p5: 'عايزك تفضلي دايماً مؤمنة بنفسك، وتعرفي إن فيه حد بيشوف قد إيه إنتِ مميزة، وبيفرح بكل خطوة بتنجحي فيها.',
  p6: 'أنا فخور بيكي يا جنى، مش بس بسبب اللي بتعمليه، لكن بسبب الشخص اللي إنتِ عليه. ❤️',
  p7: 'أنا بحبك يا جنى، وبحب تفاصيلك كلها، حتى التفاصيل الصغيرة اللي يمكن إنتِ مش واخدة بالك منها.',
  p8: 'وبحب شعرك الكيرلي أوي، ومش عارف إزاي كل الجمال ده ممكن يبقى في شخص واحد!',
  p9: 'بجد قلبي مش حمل الجمال ده، ولا حمل كل الحاجات الحلوة اللي فيكي. ❤️',
  p10: "You are one of the most beautiful parts of my days. I don't just love being around you; I love seeing you grow, achieve your dreams, and become an even stronger version of yourself.",
  p11: 'Every achievement of yours makes me proud. Every little success makes me happy. And every moment with you reminds me how lucky I am to have you in my life.',
  p12: 'Sometimes words are not enough to express how much I admire you.',
  p13: "Never stop being you, Jana. You have so many reasons to be proud of yourself, and I'll always be cheering for you.",
  p14: "I'm so in love with you, Jana.",
  p15: 'Your curly hair, your smile, your personality, and all those little things that make you YOU.',
  p16: 'Sometimes I look at you and think... how can someone be this beautiful?',
  p17: "My heart really can't handle all this beauty. ♡"
};

/* ---------- Layout: photos and notes interleaved, never grouped ---------- */
// c = desktop grid columns, r = rotation, k = card style, ar = aspect ratio
const note = (id, k, c, r = 0) => ({ type: 'note', id, k, c, r, lang: /[\u0600-\u06FF]/.test(T[id]) ? 'ar' : 'en' });
const photo = (n, c, r, ar = '4/5', cap = '', cls = '') => ({ type: 'photo', n, c, r, ar, cap, cls });

const SECTIONS = {
  scatterA: [
    note('p1', 'glass display', '1 / 8', -1.5),
    photo(1, '9 / 13', 4, '4/5', 'my proud heart'),
    note('p10', 'paper', '2 / 8', 1.2),
    photo(2, '8 / 12', -5, '1/1', 'curls & all', 'round'),
    note('p2', 'peach', '1 / 9', -1),
    note('p14', 'big', '3 / 13', 0),
    photo(3, '2 / 6', -3, '3/4', 'little details'),
    note('p3', 'paper display', '6 / 13', 1.5)
  ],
  scatterB: [
    note('p4', 'glass display', '2 / 9', 1),
    photo(4, '9 / 13', 5, '4/5', 'always cheering'),
    note('p12', 'pill', '1 / 8', -2),
    photo(5, '1 / 5', -4, '1/1', 'you, being you'),
    note('p5', 'peach display', '5 / 12', -1.2),
    note('p11', 'paper', '3 / 11', 1),
    photo(1, '8 / 12', 3, '3/4', 'one of my favorites', 'round')
  ],
  scatterC: [
    note('p7', 'glass display', '1 / 9', -1),
    note('p15', 'peach', '7 / 13', 1.5),
    photo(2, '2 / 7', -3, '4/5', 'oh, that smile'),
    note('p8', 'paper display', '6 / 13', 1.2),
    note('p16', 'big', '1 / 12', 0),
    photo(4, '8 / 12', 4, '1/1', 'too much beauty'),
    note('p9', 'glass display', '2 / 9', -1.4),
    note('p17', 'hand-note', '5 / 13', 1)
  ]
};

const FINAL_NOTES = ['p6', 'p13'];

/* ---------- Reusable builders ---------- */
function createImage(n, alt, eager) {
  const img = new Image();
  img.src = IMG(n);
  img.alt = alt || ALT[n];
  img.decoding = 'async';
  if (!eager) img.loading = 'lazy';
  img.addEventListener('error', () => img.remove()); // graceful fallback: gradient + heart behind it
  return img;
}

function createPhoto({ n, c, r, ar, cap, cls }, eager) {
  const fig = document.createElement('figure');
  fig.className = `item polaroid reveal ${cls || ''}`;
  fig.style.setProperty('--c', c || 'auto');
  fig.style.setProperty('--r', (r || 0) + 'deg');
  const ph = document.createElement('div');
  ph.className = 'ph';
  ph.style.setProperty('--ar', ar || '4/5');
  ph.appendChild(createImage(n, null, eager));
  const fc = document.createElement('figcaption');
  fc.textContent = cap || '';
  fig.append(ph, fc);
  return fig;
}

function createNote({ id, k, c, r, lang }) {
  const el = document.createElement('p');
  el.className = `item note reveal ${k}`;
  el.dir = lang === 'ar' ? 'rtl' : 'ltr';
  el.lang = lang;
  el.style.setProperty('--c', c);
  el.style.setProperty('--r', r + 'deg');
  el.textContent = T[id];
  if (k.includes('glass') || k.includes('pill')) addSparkles(el, 2);
  return el;
}

function addSparkles(el, count) {
  const marks = ['✦', '✧', '♡'];
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'spark';
    s.textContent = marks[(i + el.textContent.length) % marks.length];
    s.setAttribute('aria-hidden', 'true');
    s.style.cssText = `top:${i ? '85%' : '-12px'};inset-inline-${i ? 'start' : 'end'}:${10 + i * 12}px;font-size:${1 + i * .4}rem;animation-delay:${i * 1.1}s`;
    el.appendChild(s);
  }
}

function renderSection(id) {
  const root = document.getElementById(id);
  SECTIONS[id].forEach(item => root.appendChild(item.type === 'photo' ? createPhoto(item) : createNote(item)));
}

/* floating hearts: transform-only animation, fixed count */
function createHearts(container, count) {
  const frag = document.createDocumentFragment();
  const marks = ['♥', '♡', '❤', '✦'];
  for (let i = 0; i < count; i++) {
    const h = document.createElement('span');
    h.className = 'heart';
    h.textContent = marks[i % marks.length];
    h.style.setProperty('--x', Math.random() * 100 + '%');
    h.style.setProperty('--s', 12 + Math.random() * 26 + 'px');
    h.style.setProperty('--o', (0.18 + Math.random() * 0.4).toFixed(2));
    h.style.setProperty('--d', 14 + Math.random() * 14 + 's');
    h.style.setProperty('--delay', -Math.random() * 20 + 's');
    frag.appendChild(h);
  }
  container.appendChild(frag);
}

/* infinite sliders: one set + an identical clone, track moves exactly -50% = seamless */
function initSlider(el, order, sizes) {
  const track = document.createElement('div');
  track.className = 'track';
  const buildSet = clone => order.forEach((n, i) => {
    const [w, ar, r] = sizes[i % sizes.length];
    const s = document.createElement('div');
    s.className = 'slide';
    s.style.cssText = `--w:${w};--ar:${ar};--r:${r}deg`;
    s.appendChild(createImage(n, clone ? '' : ALT[n], true));
    track.appendChild(s);
  });
  buildSet(false);
  buildSet(true); // clone
  el.appendChild(track);
}

/* scroll reveal */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) return els.forEach(e => e.classList.add('in'));
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
  }), { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
  els.forEach(e => io.observe(e));
}

/* a gentle burst of hearts when the ending appears */
function initFinalBurst() {
  const final = document.getElementById('final');
  const io = new IntersectionObserver(([en]) => {
    if (!en.isIntersecting) return;
    io.disconnect();
    const title = final.querySelector('.final__title');
    for (let i = 0; i < 14; i++) {
      const b = document.createElement('span');
      b.className = 'burst';
      b.textContent = i % 2 ? '♥' : '♡';
      b.style.left = title.offsetLeft + title.offsetWidth / 2 + 'px';
      b.style.top = title.offsetTop + title.offsetHeight / 2 + 'px';
      b.style.setProperty('--dx', (Math.random() - .5) * 460 + 'px');
      b.style.setProperty('--dy', -60 - Math.random() * 260 + 'px');
      b.style.animationDelay = i * 90 + 'ms';
      final.appendChild(b);
      setTimeout(() => b.remove(), 4500);
    }
  }, { threshold: 0.6 });
  io.observe(final);
}

/* ---------- Build the site (runs once, after unlock) ---------- */
let built = false;
function buildSite() {
  if (built) return; built = true;
  const heroPhotos = document.getElementById('heroPhotos');
  heroPhotos.append(
    createPhoto({ n: 3, r: -6, ar: '4/5', cap: 'Jana' }, true),
    createPhoto({ n: 5, r: 5, ar: '3/4', cap: '11 / 11' }, true)
  );
  Object.keys(SECTIONS).forEach(renderSection);
  const fp = document.getElementById('finalPhotos');
  fp.appendChild(createPhoto({ n: 2, r: -3, ar: '4/5', cap: 'my favorite', cls: 'round' }));
  const fn = document.getElementById('finalNotes');
  fn.appendChild(createNote({ id: 'p6', k: 'glass display', c: 'auto', r: 0, lang: 'ar' }));
  fn.appendChild(createNote({ id: 'p13', k: 'paper', c: 'auto', r: 0, lang: 'en' }));

  const sizes = [['230px', '3/4', -2], ['300px', '1/1', 2], ['260px', '4/5', -1], ['340px', '4/3', 1.5], ['220px', '2/3', -2.5]];
  initSlider(document.getElementById('sliderA'), [1, 2, 3, 4, 5, 3, 1, 5, 2, 4], sizes);
  initSlider(document.getElementById('sliderB'), [4, 5, 2, 1, 3, 1, 4, 3, 5, 2], sizes.slice().reverse());
  initReveal();
  initFinalBurst();
}

/* ---------- Password ---------- */
function validatePassword(value) { return value.trim() === PASSWORD; }

function initLock() {
  const form = document.getElementById('lockForm');
  const input = document.getElementById('pw');
  const err = document.getElementById('lockErr');
  const lock = document.getElementById('lock');
  const site = document.getElementById('site');
  const msgs = [
    ['Hmm, not quite, my love. Try once more? 💗', 'ltr'],
    ['مش الرقم ده يا قمر.. جربي تاني 💗', 'rtl']
  ];
  let tries = 0;

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validatePassword(input.value)) {
      err.textContent = '';
      buildSite();
      site.hidden = false;
      lock.classList.add('open');
      document.body.classList.remove('locked');
      requestAnimationFrame(() => requestAnimationFrame(() => site.classList.add('show')));
      window.scrollTo(0, 0);
      setTimeout(() => { lock.hidden = true; }, 1000);
    } else {
      const [text, dir] = msgs[tries++ % msgs.length];
      err.dir = dir; err.textContent = text;
      form.classList.remove('shake'); void form.offsetWidth; form.classList.add('shake');
      input.value = ''; input.focus();
    }
  });
  input.focus();
}

document.addEventListener('DOMContentLoaded', () => {
  createHearts(document.getElementById('hearts'), window.innerWidth < 760 ? 12 : 20);
  initLock();
});
