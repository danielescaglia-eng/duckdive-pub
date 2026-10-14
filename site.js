/* ============================================================
   DUCK DIVE PUB — Varese
   Tutto il contenuto modificabile sta qui in cima.
   ============================================================ */

/* ---------- ORARI ---------------------------------------------------
   Orari reali del locale (confermati dal profilo attività).
   0 = domenica … 6 = sabato.  `open`/`close` in minuti dalla mezzanotte;
   `close` > 1440 significa "chiude dopo la mezzanotte".
   Se cambiano, aggiorna anche openingHoursSpecification in index.html.
-------------------------------------------------------------------- */
const HOURS = [
  { day:'Domenica',  open:17*60 + 30, close:26*60 },  // 17:30 – 02:00
  { day:'Lunedì',    open:null,       close:null  },  // chiuso
  { day:'Martedì',   open:17*60 + 30, close:26*60 },  // 17:30 – 02:00
  { day:'Mercoledì', open:17*60 + 30, close:26*60 },  // 17:30 – 02:00
  { day:'Giovedì',   open:17*60 + 30, close:26*60 },  // 17:30 – 02:00
  { day:'Venerdì',   open:17*60 + 30, close:26*60 },  // 17:30 – 02:00
  { day:'Sabato',    open:17*60 + 30, close:26*60 },  // 17:30 – 02:00
];

/* ---------- COCKTAIL SIGNATURE (dal menu stampato) ---------- */
const SIGNATURE = [
  { name:'Basil “Slash”', color:'#3FA46A', sweet:24, wild:60,
    tag:'Fresco, estivo, alcolico, cosa vuoi di più?',
    desc:'Duck Dive Nazaré Navy Strength, basilico, zucchero, succo di limone, Three Cents Aegean Tonic.' },
  { name:'Arugam Bay', color:'#E2873A', sweet:72, wild:80,
    tag:'Presente lo Sri Lanka? Questo costa meno di un volo.',
    desc:'Duck Dive London Dry, marmellata di albicocche, succo di limone, soda al curry e peperoncino.' },
  { name:'El Majico', color:'#B5402F', sweet:46, wild:92,
    tag:'A noi piace così, pochi ingredienti, che ti accarezzano in faccia… con un badile.',
    desc:'Duck Dive Black Wave, tequila al burro d’arachidi, angostura, acido citrico.' },
  { name:'Stout-a Wave', color:'#3A2C24', sweet:20, wild:56,
    tag:'Il dolce che non sapevi di volere.',
    desc:'Whisky Duck Dive, Cold Brew, zucchero, spuma di Stout Duck Dive.' },
];

/* ---------- BIRRE ALLA SPINA ---------- */
const BEERS = [
  { name:'Duck Dive Pils',  vol:'4,5%', price:'5', fill:'#F4D06A' },
  { name:'Duck Dive APA',   vol:'5%',   price:'6', fill:'#F2A40C' },
  { name:'Duck Dive Stout', vol:'4,3%', price:'6', fill:'#3A2C24' },
];

/* ---------- ETICHETTE DUCK DIVE ---------- */
const LABELS = [
  { type:'London Dry Gin', name:'Duck Dive London Dry', abv:'43', gf:false,
    note:'Lemon Myrtle australiano e botaniche selezionate. La base del Duck Tonic.' },
  { type:'Navy Strength Gin', name:'Nazaré Navy Strength', abv:'58', gf:false,
    note:'58 gradi ispirati alle onde di Nazaré. Per chi non si fa travolgere.' },
  { type:'Amaro', name:'Black Wave', abv:'37.5', gf:false,
    note:'Oltre 40 erbe e Lemon Myrtle. Digestivo o base per cocktail scuri.' },
  { type:'Whisky', name:'Barrel Whisky', abv:'40', gf:false,
    note:'Orzo, segale e mais. Quattro anni in botte, tostatura media.' },
  { type:'Distilled Gin', name:'Line Gin', abv:'37.5', gf:false,
    note:'Ginepro, cedro, pepe garofanato. Il gin tonic classico fatto bene.' },
  { type:'American Pale Ale', name:'Duck Dive APA', abv:'5', gf:true,
    note:'Agrumata, frizzante, dissetante. Alla spina.' },
  { type:'Pils', name:'Duck Dive Pils', abv:'4.5', gf:true,
    note:'Dorata e brillante, luppolo continentale, lievito Weihenstephan.' },
  { type:'Stout', name:'Duck Dive Stout', abv:'4.3', gf:true,
    note:'Malto torrefatto e avena. Scura come l’acqua sotto la tavola.' },
];

/* ---------- TICKER ---------- */
const TICKER = [
  'Via Cavallotti 9 · Varese',
  'Birre senza glutine alla spina',
  'Spirits di casa',
  'Drink like a rebel',
  'Taste the wave',
  'Bocce per otto',
  'Tapas fino a tardi',
];

/* ============================================================
   RENDER
   ============================================================ */
const $ = (sel) => document.querySelector(sel);

function esc(str){
  return String(str).replace(/[&<>"]/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
}

/* --- bicchiere disegnato, un colore per cocktail --- */
function glassSVG(color){
  return `<svg class="sig__glass" viewBox="0 0 44 64" fill="none" aria-hidden="true">
    <path d="M6 8h32L24 30v22" stroke="#14110d" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M11 13h26L24 27z" fill="${esc(color)}"/>
    <path d="M14 54h20" stroke="#14110d" stroke-width="2.4" stroke-linecap="round"/>
    <circle cx="33" cy="10" r="3.4" fill="${esc(color)}" stroke="#14110d" stroke-width="1.6"/>
  </svg>`;
}

function scaleRow(left, right, pct){
  return `<div class="scale">
    <span>${esc(left)}</span>
    <span class="scale__bar"><span class="scale__dot" style="left:${pct}%"></span></span>
    <span>${esc(right)}</span>
  </div>`;
}

function beerSVG(fill){
  return `<svg viewBox="0 0 40 56" width="40" height="56" style="margin:0 auto" fill="none" aria-hidden="true">
    <path d="M8 10h20v40a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z" fill="${esc(fill)}" stroke="#14110d" stroke-width="2.2"/>
    <path d="M28 18h5a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-5" stroke="#14110d" stroke-width="2.2"/>
    <path d="M8 16h20" stroke="#14110d" stroke-width="2.2"/>
  </svg>`;
}

function renderSignature(){
  $('#sigList').innerHTML = SIGNATURE.map((c) => `
    <article class="sig">
      ${glassSVG(c.color)}
      <div>
        <h4 class="sig__name">${esc(c.name)}</h4>
        <p class="sig__tag">${esc(c.tag)}</p>
        <p class="sig__desc">${esc(c.desc)}</p>
        <div class="scales">
          ${scaleRow('Sweet','Sour', c.sweet)}
          ${scaleRow('Chill','Wild', c.wild)}
        </div>
      </div>
    </article>`).join('');
}

function renderBeers(){
  $('#beerList').innerHTML = BEERS.map((b) => `
    <div>
      ${beerSVG(b.fill)}
      <p class="beer__name">${esc(b.name)}</p>
      <p class="beer__vol">${esc(b.vol)} vol</p>
      <p class="beer__price">${esc(b.price)}</p>
    </div>`).join('');
}

function renderLabels(){
  $('#labelRail').innerHTML = LABELS.map((l) => `
    <article class="label${l.gf ? ' label--gf' : ''}">
      <p class="label__abv">${esc(l.abv)}<small>%</small></p>
      <h3 class="label__name">${esc(l.name)}</h3>
      <p class="label__note">${esc(l.note)}</p>
      <p class="label__type">${esc(l.type)}</p>
    </article>`).join('');
}

function renderTicker(){
  const one = TICKER.map((t) => `<span>${esc(t)}<b> ·</b></span>`).join('');
  $('#ticker').innerHTML = one + one; // duplicato: il keyframe scorre di -50%
}

/* ============================================================
   ORARI — tabella + stato "aperto ora"
   ============================================================ */
function fmt(min){
  const h = Math.floor((min % 1440) / 60);
  const m = min % 60;
  return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
}

function renderHours(now){
  const today = now.getDay();
  $('#hoursList').innerHTML = HOURS.map((h, i) => {
    const closed = h.open === null;
    return `<li class="${i === today ? 'is-today' : ''}${closed ? ' is-closed' : ''}">
      <span class="hours__day">${esc(h.day)}</span>
      <span class="hours__time">${closed ? 'Chiuso' : `${fmt(h.open)} – ${fmt(h.close)}`}</span>
    </li>`;
  }).join('');
}

/* Aperto se il turno di oggi è in corso, oppure se quello di ieri
   si prolunga oltre la mezzanotte e non è ancora finito. */
function currentShift(now){
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();

  const todayShift = HOURS[day];
  if (todayShift.open !== null && mins >= todayShift.open && mins < todayShift.close) {
    return { open:true, closesAt: todayShift.close };
  }

  const yShift = HOURS[(day + 6) % 7];
  if (yShift.open !== null && yShift.close > 1440 && mins < yShift.close - 1440) {
    return { open:true, closesAt: yShift.close };
  }

  // prossima apertura
  for (let i = 0; i < 8; i++) {
    const d = (day + i) % 7;
    const s = HOURS[d];
    if (s.open === null) continue;
    if (i === 0 && mins >= s.open) continue;
    return { open:false, nextDay: s.day, nextAt: s.open, isToday: i === 0 };
  }
  return { open:false };
}

function renderStatus(now){
  const pill = $('#statusPill');
  const s = currentShift(now);

  pill.classList.remove('is-open','is-closed');
  let full, short;
  if (s.open) {
    pill.classList.add('is-open');
    full  = `Aperto ora · fino alle ${fmt(s.closesAt)}`;
    short = 'Aperto ora';
  } else {
    pill.classList.add('is-closed');
    short = 'Chiuso';
    full  = s.nextDay
      ? (s.isToday ? `Chiuso · apre alle ${fmt(s.nextAt)}` : `Chiuso · ${s.nextDay} dalle ${fmt(s.nextAt)}`)
      : 'Chiuso';
  }
  $('#statusText').textContent = full;
  $('#statusShort').textContent = short;
}

/* ============================================================
   COMPORTAMENTI
   ============================================================ */
function initReveal(){
  const items = document.querySelectorAll('.rise');
  if (!('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach((el) => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin:'0px 0px -8% 0px', threshold:0.08 });
  items.forEach((el) => io.observe(el));
}

function initStickyNav(){
  const nav = $('#nav');
  const sentinel = document.createElement('div');
  document.body.prepend(sentinel);
  new IntersectionObserver(([e]) => {
    nav.classList.toggle('is-stuck', !e.isIntersecting);
  }, { threshold:1 }).observe(sentinel);
}

/* ============================================================
   BOOT
   ============================================================ */
(function init(){
  const now = new Date();
  renderTicker();
  renderSignature();
  renderBeers();
  renderLabels();
  renderHours(now);
  renderStatus(now);
  $('#yr').textContent = now.getFullYear();
  initReveal();
  initStickyNav();
  // lo stato "aperto ora" resta vero anche se la pagina rimane aperta a lungo
  setInterval(() => renderStatus(new Date()), 60000);
})();
