/* ==========================================================================
   Dr. Vishwas Sutar Portfolio — page renderers
   Uses data.js (ES module).  Each HTML page sets <body data-page="...">.
   ========================================================================== */

// Content globals come from data.js (loaded before this script):
//   UI, CATS, SAMAJBHAN, BOOKS, GALLERY, EXTRA

/* -------- Palette (swappable colour themes) -------- */
const PALETTES = {
  'ivory-maroon': { bg:'#FAF6EE', surface:'#FFF', ink:'#26201A', muted:'#6E6153', accent:'#7E2A33', accent2:'#A67C2E', line:'#E8DFCE', dark:'#221C15', darkInk:'#F4EDDF' },
  'indigo-gold':  { bg:'#F7F5F0', surface:'#FFF', ink:'#1F2230', muted:'#5C5F6E', accent:'#2F3B69', accent2:'#A67C2E', line:'#E2E0D6', dark:'#1B2033', darkInk:'#EDEDE6' },
  'forest-green': { bg:'#F5F6F0', surface:'#FFF', ink:'#202620', muted:'#5D6558', accent:'#2F5D46', accent2:'#94702B', line:'#E0E2D4', dark:'#1B241E', darkInk:'#ECEFE3' },
  'terracotta':   { bg:'#FBF4EC', surface:'#FFF', ink:'#2A211B', muted:'#74655A', accent:'#A3512E', accent2:'#7C6238', line:'#EBDFD0', dark:'#251C16', darkInk:'#F5EBDD' },
};

function applyPalette(key) {
  const p = PALETTES[key] || PALETTES['ivory-maroon'];
  const r = document.documentElement.style;
  r.setProperty('--bg', p.bg);
  r.setProperty('--surface', p.surface);
  r.setProperty('--ink', p.ink);
  r.setProperty('--muted', p.muted);
  r.setProperty('--accent', p.accent);
  r.setProperty('--accent2', p.accent2);
  r.setProperty('--line', p.line);
  r.setProperty('--dark', p.dark);
  r.setProperty('--dark-ink', p.darkInk);
  document.body.style.background = p.bg;
}

/* -------- Utilities -------- */
const MR_DIGITS = { '0':'०','1':'१','2':'२','3':'३','4':'४','5':'५','6':'६','7':'७','8':'८','9':'९' };
const mrDigits = (s) => String(s).replace(/[0-9]/g, (d) => MR_DIGITS[d]);
const escapeHTML = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

/* -------- Language (persisted) -------- */
function getLang() {
  try {
    const s = localStorage.getItem('vs_lang');
    if (s === 'mr' || s === 'en') return s;
  } catch (e) {}
  return 'mr';
}
function setLang(lang) {
  try { localStorage.setItem('vs_lang', lang); } catch (e) {}
}

/* -------- Navigation -------- */
function renderNav(page) {
  const lang = getLang();
  const t = UI[lang];
  const ex = EXTRA[lang];
  const items = [
    ['home',      ex.navHome,     'index.html'],
    ['about',     t.nav.about,    'index.html#about'],
    ['music',     t.nav.music,    'index.html#music'],
    ['books',     t.nav.books,    'books.html'],
    ['samajbhan', t.nav.samajbhan,'samajbhan.html'],
    ['contact',   t.nav.contact,  '#contact'],
  ];

  const nav = $('.nav');
  if (!nav) return;

  nav.innerHTML = `
    <div class="nav__inner">
      <a href="index.html" class="nav__brand">
        <span class="nav__dot"></span>${escapeHTML(t.hero.name)}
      </a>
      <div class="nav__spacer"></div>
      <div class="nav__links">
        ${items.map(([k, label, href]) => `
          <a href="${href}" class="nav__link${k === page ? ' is-active' : ''}">${escapeHTML(label)}</a>
        `).join('')}
      </div>
      <button class="nav__lang" data-action="toggle-lang">${escapeHTML(t.langBtn)}</button>
    </div>
  `;

  $('[data-action="toggle-lang"]', nav).addEventListener('click', () => {
    setLang(lang === 'mr' ? 'en' : 'mr');
    renderPage();  // full re-render of the current page
  });
}

/* -------- Footer -------- */
function renderFooter() {
  const lang = getLang();
  const t = UI[lang];
  const year = lang === 'mr' ? mrDigits(new Date().getFullYear()) : new Date().getFullYear();

  const footer = $('.footer');
  if (!footer) return;

  footer.innerHTML = `
    <div class="footer__inner">
      <div class="footer__grid">
        <div>
          <h2>${escapeHTML(t.contact.title)}</h2>
          <p class="footer__lead">${escapeHTML(t.contact.lead)}</p>
        </div>
        <div class="footer__contacts">
          <a href="tel:+919420353452" class="footer__contact">
            <span class="footer__icon">✆</span>
            <span>
              <span class="footer__k">${escapeHTML(t.contact.phone)}</span>
              <span class="footer__v">${escapeHTML(t.hero.phone)}</span>
            </span>
          </a>
          <div class="footer__contact">
            <span class="footer__icon">⌖</span>
            <span>
              <span class="footer__k">${escapeHTML(t.contact.location)}</span>
              <span class="footer__v">${escapeHTML(t.contact.locationV)}</span>
            </span>
          </div>
          <a href="https://www.youtube.com/@vishwassutar9868" target="_blank" rel="noopener" class="footer__contact">
            <span class="footer__icon">▶</span>
            <span>
              <span class="footer__k">${escapeHTML(t.contact.youtube)}</span>
              <span class="footer__v">@vishwassutar9868</span>
            </span>
          </a>
        </div>
      </div>
      <div class="footer__bar">
        <span>© ${year} ${escapeHTML(t.hero.name)}</span>
        <span>${escapeHTML(t.contact.rights)}</span>
      </div>
    </div>
  `;
}

/* -------- Scroll reveal -------- */
function setupReveal() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    $$('.reveal').forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
      el.classList.add('is-visible');
      return;
    }
    io.observe(el);
  });
}

/* -------- Book builder -------- */
function makeBook(b, lang, freeLabel) {
  return {
    id: b.id,
    cover: b.cover,
    title: b.title[lang],
    sub: b.sub[lang],
    brief: b.brief[lang],
    synopsis: b.synopsis[lang],
    pages: lang === 'mr' ? mrDigits(b.pages) : String(b.pages),
    price: b.price ? (lang === 'mr' ? mrDigits(b.price) : b.price) : freeLabel,
    publisher: b.publisher[lang],
    release: b.release[lang],
    featured: !!b.featured,
  };
}

/* ==========================================================================
   HOME
   ========================================================================== */
function renderHome() {
  const lang = getLang();
  const t = UI[lang];
  const ex = EXTRA[lang];
  const main = $('main');
  const books = BOOKS.map((b) => makeBook(b, lang, t.books.free));

  main.innerHTML = `
    <!-- HERO -->
    <header id="top" class="hero">
      <img src="assets/art/paisley.svg" alt="" aria-hidden="true" class="hero__deco hero__deco--paisley">
      <img src="assets/art/quill.svg" alt="" aria-hidden="true" class="hero__deco hero__deco--quill">
      <div class="hero__grid">
        <div>
          <p class="kicker">${escapeHTML(t.hero.kicker)}</p>
          <h1 class="hero__name">${escapeHTML(t.hero.name)}</h1>
          <p class="hero__tagline">${escapeHTML(t.hero.tagline)}</p>
          <div class="hero__ctas">
            <a href="books.html" class="btn btn--primary">${escapeHTML(t.hero.ctaBooks)}</a>
            <a href="samajbhan.html" class="btn btn--outline">${escapeHTML(t.hero.ctaSamajbhan)}</a>
          </div>
          <div class="hero__meta">
            <span><i></i>${escapeHTML(t.hero.location)}</span>
            <a href="tel:+919420353452"><i></i>${escapeHTML(t.hero.phone)}</a>
            <a href="https://www.youtube.com/@vishwassutar9868" target="_blank" rel="noopener"><i></i>YouTube</a>
          </div>
        </div>
        <div class="hero__portrait">
          <div class="hero__portrait-inner">
            <div class="hero__portrait-bg"></div>
            <img src="assets/father-removebg.png" alt="${escapeHTML(t.hero.name)}">
          </div>
        </div>
      </div>
    </header>

    <!-- ABOUT -->
    <section id="about" class="section about reveal">
      <p class="kicker">${escapeHTML(t.about.infoTitle)}</p>
      <h2 class="section-title">${escapeHTML(t.about.title)}</h2>
      <div class="section-rule"></div>

      <div class="about__grid">
        <div>
          <p class="about__lead">${escapeHTML(t.about.lead)}</p>
          <h3>${escapeHTML(t.about.familyTitle)}</h3>
          <p>${escapeHTML(t.about.family)}</p>
          <blockquote>${escapeHTML(t.about.quote)}</blockquote>
          <h3>${escapeHTML(t.about.eduTitle)}</h3>
          <p>${escapeHTML(t.about.edu)}</p>
          <h3>${escapeHTML(t.about.writingTitle)}</h3>
          <p style="margin-bottom:0">${escapeHTML(t.about.writing)}</p>
        </div>
        <div>
          <div class="info-card">
            <h3><i></i>${escapeHTML(t.about.infoTitle)}</h3>
            ${t.about.info.map((row) => `
              <div class="info-row">
                <div class="info-row__k">${escapeHTML(row.k)}</div>
                <div class="info-row__v">${escapeHTML(row.v)}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="reveal" style="margin-top:clamp(48px,7vw,80px)">
        <h3 style="margin:0 0 22px; font-family:'Tiro Devanagari Marathi',serif; font-weight:400; font-size:clamp(26px,4vw,34px); color:var(--ink)">${escapeHTML(t.about.awardsTitle)}</h3>
        <div class="awards">
          ${t.about.awards.map((a) => `
            <div class="award"><i>✦</i><span>${escapeHTML(a)}</span></div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- MUSIC -->
    <section id="music" class="section reveal">
      <img src="assets/art/music.svg" alt="" aria-hidden="true" class="deco" style="top:40px; right:0; width:min(280px,40vw); opacity:.07;">
      <p class="kicker">${escapeHTML(t.music.kicker)}</p>
      <h2 class="section-title">${escapeHTML(t.music.title)}</h2>
      <div class="section-rule" style="margin-bottom:22px"></div>
      <p style="margin:0 0 34px; font-size:clamp(17px,2.1vw,19px); color:var(--muted); max-width:62ch">${escapeHTML(t.music.lead)}</p>

      <div class="music__grid">
        <div class="music__col">
          <div class="music__raga">
            <div class="music__raga-deco">♪</div>
            <div class="music__raga-kicker">॥ ${escapeHTML(t.music.kicker)} ॥</div>
            <h3>${escapeHTML(t.music.ragaTitle)}</h3>
            <p style="margin:0; opacity:.85; line-height:1.8; font-size:16px">${escapeHTML(t.music.raga)}</p>
          </div>
          <div class="music__pair">
            <div class="music__card">
              <h4>${escapeHTML(t.music.airTitle)}</h4>
              <p>${escapeHTML(t.music.air)}</p>
            </div>
            <div class="music__card">
              <h4>${escapeHTML(t.music.visharadTitle)}</h4>
              <p>${escapeHTML(t.music.visharad)}</p>
            </div>
          </div>
        </div>
        <div class="music__yt">
          <a href="https://www.youtube.com/@vishwassutar9868" target="_blank" rel="noopener" class="music__yt-thumb" aria-label="YouTube">
            <span style="position:absolute; top:-30px; right:-14px; font-family:'Tiro Devanagari Marathi',serif; font-size:150px; opacity:.12; color:#fff; pointer-events:none">♪</span>
            <span class="music__yt-play"><span>▶</span></span>
          </a>
          <div class="music__yt-body">
            <div style="flex:1; min-width:180px">
              <h4>${escapeHTML(t.music.ytTitle)}</h4>
              <p>${escapeHTML(t.music.ytSub)}</p>
            </div>
            <a href="https://www.youtube.com/@vishwassutar9868" target="_blank" rel="noopener" class="btn btn--primary btn--sm">${escapeHTML(t.music.ytBtn)} ↗</a>
          </div>
        </div>
      </div>
    </section>

    <!-- BOOKS TEASER -->
    <section class="section reveal">
      <img src="assets/art/book-open.svg" alt="" aria-hidden="true" class="deco" style="top:56px; right:6px; width:min(220px,34vw); opacity:.07;">
      <p class="kicker">${escapeHTML(t.books.kicker)}</p>
      <h2 class="section-title" style="margin-bottom:14px">${escapeHTML(t.books.title)}</h2>
      <p style="margin:0 0 30px; font-size:clamp(17px,2.1vw,19px); color:var(--muted); max-width:56ch">${escapeHTML(ex.teaserBooks)}</p>
      <div class="books-grid">
        ${books.slice(0, 5).map((b) => `
          <a href="books.html" class="book-card">
            <div class="book-card__cover"><img src="${b.cover}" alt="${escapeHTML(b.title)}" loading="lazy"></div>
            <div class="book-card__title">${escapeHTML(b.title)}</div>
          </a>
        `).join('')}
      </div>
      <a href="books.html" class="btn btn--primary btn--sm">${escapeHTML(ex.viewAllBooks)} →</a>
    </section>

    <!-- SAMAJBHAN TEASER -->
    <section class="samaj-teaser">
      <img src="assets/art/lotus.svg" alt="" aria-hidden="true" class="deco" style="right:-20px; bottom:-20px; width:min(360px,50vw); opacity:.10;">
      <div class="samaj-teaser__inner reveal">
        <p class="kicker">${escapeHTML(t.samajbhan.kicker)}</p>
        <h2 class="section-title" style="margin-bottom:16px">${escapeHTML(t.samajbhan.title)}</h2>
        <p style="margin:0 0 30px; font-size:clamp(17px,2.1vw,19px); line-height:1.85; opacity:.92; max-width:60ch">${escapeHTML(ex.teaserSamaj)}</p>
        <div class="samaj-teaser__stats">
          ${ex.samajStats.map((s) => `
            <div>
              <div class="samaj-stat__num">${escapeHTML(s.num)}</div>
              <div class="samaj-stat__label">${escapeHTML(s.label)}</div>
            </div>
          `).join('')}
        </div>
        <a href="samajbhan.html" class="btn btn--gold btn--sm">${escapeHTML(ex.exploreSamajbhan)} →</a>
      </div>
    </section>
  `;
}

/* ==========================================================================
   BOOKS
   ========================================================================== */
let booksState = { openBookId: null, featIdx: 0 };

function renderBooks() {
  const lang = getLang();
  const t = UI[lang];
  const ex = EXTRA[lang];
  const main = $('main');
  const all = BOOKS.map((b) => makeBook(b, lang, t.books.free));
  const total = all.length;
  const fi = ((booksState.featIdx % total) + total) % total;
  const feat = all[fi];
  const badge = feat.featured ? t.books.featured : feat.sub;
  const counter = lang === 'mr'
    ? `${mrDigits(fi + 1)} / ${mrDigits(total)}`
    : `${fi + 1} / ${total}`;

  const openBook = all.find((b) => b.id === booksState.openBookId);

  main.innerHTML = `
    <!-- BOOKS HERO -->
    <header class="page-hero">
      <img src="assets/art/book-open.svg" alt="" aria-hidden="true" class="deco" style="right:-10px; bottom:-20px; width:min(360px,50vw); opacity:.14;">
      <img src="assets/art/paisley.svg" alt="" aria-hidden="true" class="deco" style="left:-30px; top:-20px; width:200px; opacity:.10; transform:scaleX(-1);">
      <div class="page-hero__inner">
        <a href="index.html" class="page-hero__back">${escapeHTML(ex.backHome)}</a>
        <p class="kicker">${escapeHTML(t.books.kicker)}</p>
        <h1>${escapeHTML(t.books.title)}</h1>
        <p>${escapeHTML(t.books.lead)}</p>
      </div>
    </header>

    <!-- BOOKS -->
    <section id="books" class="section" style="padding-top:clamp(44px,6vw,72px)">
      <div class="spotlight reveal">
        <div class="spotlight__card">
          <div class="spotlight__wrap">
            <button class="spotlight__cover-btn" data-action="open-book" data-id="${feat.id}">
              <img src="${feat.cover}" alt="${escapeHTML(feat.title)}" loading="lazy">
            </button>
          </div>
          <div>
            <div class="spotlight__badges">
              <span class="spotlight__badge">${escapeHTML(badge)}</span>
              <span class="spotlight__counter">${counter}</span>
            </div>
            <h3>${escapeHTML(feat.title)}</h3>
            <p class="spotlight__sub">${escapeHTML(feat.sub)}</p>
            <p class="spotlight__brief">${escapeHTML(feat.brief)}</p>
            <div class="spotlight__meta">
              <span>${escapeHTML(t.books.pages)} — ${escapeHTML(feat.pages)}</span>
              <span>${escapeHTML(t.books.price)} — ${escapeHTML(feat.price)}</span>
              <span>${escapeHTML(feat.release)}</span>
            </div>
            <button class="btn btn--gold btn--sm" data-action="open-book" data-id="${feat.id}">
              ${escapeHTML(t.books.details)}
            </button>
          </div>
        </div>
        <button class="spotlight__nav spotlight__nav--prev" data-action="feat-prev" aria-label="previous">‹</button>
        <button class="spotlight__nav spotlight__nav--next" data-action="feat-next" aria-label="next">›</button>
      </div>

      <div class="books-list">
        ${all.map((b) => `
          <button class="book-card" data-action="open-book" data-id="${b.id}">
            <div class="book-card__cover"><img src="${b.cover}" alt="${escapeHTML(b.title)}" loading="lazy"></div>
            <div>
              <div class="book-card__title">${escapeHTML(b.title)}</div>
              <div class="book-card__sub">${escapeHTML(b.sub)}</div>
            </div>
          </button>
        `).join('')}
      </div>
    </section>

    <div id="modal-mount">${openBook ? renderBookModal(openBook, t) : ''}</div>
  `;
}

function renderBookModal(mb, t) {
  return `
    <div class="modal" data-action="close-book">
      <div class="modal__sheet" data-stop>
        <button class="modal__close" data-action="close-book" aria-label="close">✕</button>
        <div class="modal__grid">
          <div>
            <img src="${mb.cover}" alt="${escapeHTML(mb.title)}" class="modal__cover">
            <div class="modal__facts">
              <div class="modal__fact">
                <div class="modal__fact-k">${escapeHTML(t.books.pages)}</div>
                <div class="modal__fact-v">${escapeHTML(mb.pages)}</div>
              </div>
              <div class="modal__fact">
                <div class="modal__fact-k">${escapeHTML(t.books.price)}</div>
                <div class="modal__fact-v">${escapeHTML(mb.price)}</div>
              </div>
              <div class="modal__fact modal__fact--wide">
                <div class="modal__fact-k">${escapeHTML(t.books.publisher)}</div>
                <div class="modal__fact-v">${escapeHTML(mb.publisher)}</div>
              </div>
              <div class="modal__fact modal__fact--wide">
                <div class="modal__fact-k">${escapeHTML(t.books.release)}</div>
                <div class="modal__fact-v">${escapeHTML(mb.release)}</div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="modal__title">${escapeHTML(mb.title)}</h3>
            <p class="modal__sub">${escapeHTML(mb.sub)}</p>
            <p class="modal__brief">${escapeHTML(mb.brief)}</p>
            <h4 class="modal__synopsis-h">${escapeHTML(t.books.synopsis)}</h4>
            <p class="modal__synopsis">${escapeHTML(mb.synopsis)}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function onBooksClick(e) {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  // If click bubbled from inside the modal sheet, keep it open unless close was hit
  const action = target.dataset.action;

  if (action === 'open-book') {
    booksState.openBookId = Number(target.dataset.id);
    renderBooks();
    return;
  }
  if (action === 'close-book') {
    // Close only when the actual click landed on the backdrop or the ✕ button,
    // not when it bubbled up from inside the sheet.
    if (e.target === target || target.classList.contains('modal__close')) {
      booksState.openBookId = null;
      renderBooks();
    }
    return;
  }
  if (action === 'feat-prev') { booksState.featIdx -= 1; renderBooks(); return; }
  if (action === 'feat-next') { booksState.featIdx += 1; renderBooks(); return; }
}

/* ==========================================================================
   SAMAJBHAN
   ========================================================================== */
let samajState = { activeCat: 'all', expandedId: null, lightbox: null };

function renderSamajbhan() {
  const lang = getLang();
  const t = UI[lang];
  const ex = EXTRA[lang];
  const main = $('main');

  const cats = CATS;
  const items = SAMAJBHAN.filter((it) => samajState.activeCat === 'all' || it.cat === samajState.activeCat);
  const yearsSet = [...new Set(items.map((i) => i.year))].sort((a, b) => b - a);
  const catLabel = (id) => { const c = CATS.find((x) => x.id === id); return c ? c[lang] : ''; };

  main.innerHTML = `
    <header class="page-hero">
      <img src="assets/art/lotus.svg" alt="" aria-hidden="true" class="deco" style="right:-20px; bottom:-24px; width:min(400px,54vw); opacity:.13;">
      <img src="assets/art/paisley.svg" alt="" aria-hidden="true" class="deco" style="left:-30px; top:-10px; width:190px; opacity:.09;">
      <div class="page-hero__inner">
        <a href="index.html" class="page-hero__back">${escapeHTML(ex.backHome)}</a>
        <p class="kicker">${escapeHTML(t.samajbhan.kicker)}</p>
        <h1 style="font-size:clamp(40px,7vw,66px); line-height:1.1">${escapeHTML(t.samajbhan.title)}</h1>
        <p style="max-width:64ch; opacity:.9; margin-bottom:22px">${escapeHTML(t.samajbhan.lead)}</p>
        <p class="samaj-hero-mission">${escapeHTML(t.samajbhan.mission)}</p>
        <div class="samaj-hero-stats">
          ${ex.samajStats.map((s) => `
            <div>
              <div class="samaj-stat__num">${escapeHTML(s.num)}</div>
              <div class="samaj-stat__label">${escapeHTML(s.label)}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </header>

    <section id="samajbhan" class="timeline-section">
      <h2 style="margin:0 0 8px; font-family:'Tiro Devanagari Marathi',serif; font-weight:400; font-size:clamp(28px,4.5vw,38px)">${escapeHTML(t.samajbhan.timelineTitle)}</h2>
      <div class="section-rule" style="margin-bottom:26px"></div>

      <div class="cats">
        ${cats.map((c) => `
          <button class="cat${samajState.activeCat === c.id ? ' is-active' : ''}" data-action="pick-cat" data-id="${c.id}">
            ${escapeHTML(c[lang])}
          </button>
        `).join('')}
      </div>

      <div class="timeline">
        <div class="timeline__spine"></div>
        ${yearsSet.map((yr) => `
          <div class="year">
            <div class="year__dot"></div>
            <div class="year__label">${lang === 'mr' ? mrDigits(yr) : yr}</div>
            ${items.filter((i) => i.year === yr).map((it) => {
              const expanded = samajState.expandedId === it.id;
              return `
                <div class="event">
                  <div class="event__row">
                    <div class="event__body">
                      <div class="event__meta">
                        <span class="event__month">${escapeHTML(it.m[lang])}</span>
                        <span class="event__cat">${escapeHTML(catLabel(it.cat))}</span>
                      </div>
                      <div class="event__title">${escapeHTML(it.t[lang])}</div>
                      <p class="event__desc${expanded ? '' : ' is-clamped'}">${escapeHTML(it.d[lang])}</p>
                      <button class="event__more" data-action="toggle-event" data-id="${it.id}">
                        ${escapeHTML(expanded ? t.samajbhan.readLess : t.samajbhan.readMore)}
                      </button>
                    </div>
                    ${it.img ? `
                      <button class="event__thumb" data-action="open-lightbox" data-src="${it.img}">
                        <img src="${it.img}" alt="${escapeHTML(it.t[lang])}" loading="lazy">
                      </button>
                    ` : ''}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `).join('')}
      </div>
    </section>

    <section class="gallery-section reveal">
      <h2 style="margin:0 0 6px; font-family:'Tiro Devanagari Marathi',serif; font-weight:400; font-size:clamp(28px,4.5vw,38px)">${escapeHTML(t.samajbhan.galleryTitle)}</h2>
      <p style="margin:0 0 24px; color:var(--muted); font-size:15.5px">${escapeHTML(t.samajbhan.gallerySub)}</p>
      <div class="gallery">
        ${GALLERY.map((src) => `
          <button class="gallery__item" data-action="open-lightbox" data-src="${src}">
            <img src="${src}" alt="समाजभान" loading="lazy">
          </button>
        `).join('')}
      </div>
    </section>

    <div id="lightbox-mount">${samajState.lightbox ? renderLightbox(samajState.lightbox) : ''}</div>
  `;
}

function renderLightbox(src) {
  return `
    <div class="lightbox" data-action="close-lightbox">
      <img src="${src}" alt="समाजभान">
      <button class="lightbox__close" data-action="close-lightbox" aria-label="close">✕</button>
    </div>
  `;
}

function onSamajClick(e) {
  const target = e.target.closest('[data-action]');
  if (!target) return;
  const action = target.dataset.action;

  if (action === 'pick-cat') {
    samajState.activeCat = target.dataset.id;
    renderSamajbhan();
    return;
  }
  if (action === 'toggle-event') {
    const id = Number(target.dataset.id);
    samajState.expandedId = samajState.expandedId === id ? null : id;
    renderSamajbhan();
    return;
  }
  if (action === 'open-lightbox') {
    samajState.lightbox = target.dataset.src;
    renderSamajbhan();
    return;
  }
  if (action === 'close-lightbox') {
    // Only close when click landed on the backdrop or the ✕ button itself.
    if (e.target === target || target.classList.contains('lightbox__close')) {
      samajState.lightbox = null;
      renderSamajbhan();
    }
    return;
  }
}

/* ==========================================================================
   Page dispatcher
   ========================================================================== */
function renderPage() {
  const page = document.body.dataset.page || 'home';
  renderNav(page);
  if (page === 'home')       renderHome();
  else if (page === 'books') renderBooks();
  else if (page === 'samajbhan') renderSamajbhan();
  renderFooter();
  requestAnimationFrame(setupReveal);
}

/* -------- Boot -------- */
const DEFAULT_PALETTE = 'forest-green';
try {
  const saved = localStorage.getItem('vs_palette');
  applyPalette(saved && PALETTES[saved] ? saved : DEFAULT_PALETTE);
} catch (e) {
  applyPalette(DEFAULT_PALETTE);
}

// Single delegated click listener — dispatches to the active page's handler.
document.addEventListener('click', (e) => {
  const page = document.body.dataset.page;
  if (page === 'books')          onBooksClick(e);
  else if (page === 'samajbhan') onSamajClick(e);
});

renderPage();
