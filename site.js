/* Learn for Infinity: builds the home, explore, news and academy pages from data.js.
   Each page sets <body data-page="home|explore|news|academy">. */
(function () {
  'use strict';
  var D = window.SITE || { articles: [], news: [], courses: [], videos: [], tools: [], paid: [] };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function fmt(d) { if (!d) return ''; var p = d.split('-'); return p.length < 3 ? d : MONTHS[+p[1] - 1] + ' ' + (+p[2]); }
  function img(src, cls, lazy) {
    return src ? '<img' + (cls ? ' class="' + cls + '"' : '') + ' src="' + esc(src) + '" alt="" draggable="false"' + (lazy ? ' loading="lazy"' : '') + ' onerror="this.remove()">' : '';
  }

  /* newest first: items with no date count as "just added" and go first (in the order listed),
     then dated items from the newest date to the oldest */
  function newest(list) {
    return list.map(function (x, i) { return { x: x, i: i }; }).sort(function (a, b) {
      var da = a.x.date || '', db = b.x.date || '';
      if (!da && !db) return a.i - b.i;
      if (!da) return -1;
      if (!db) return 1;
      if (da !== db) return da < db ? 1 : -1;
      return a.i - b.i;
    }).map(function (o) { return o.x; });
  }
  /* carousel picks: featured (trending) first, then newest */
  function pick(list, max) {
    var n = newest(list);
    return n.filter(function (x) { return x.featured; }).concat(n.filter(function (x) { return !x.featured; })).slice(0, max || 6);
  }

  var ART = {
    book: '<svg viewBox="0 0 120 90" aria-hidden="true"><path d="M60 22Q36 12 12 20V72Q36 64 60 74Z" fill="#F6EFDC" stroke="#1A1610" stroke-width="3" stroke-linejoin="round"/><path d="M60 22Q84 12 108 20V72Q84 64 60 74Z" fill="#EDE0BE" stroke="#1A1610" stroke-width="3" stroke-linejoin="round"/><g stroke="#127A4F" stroke-width="3" stroke-linecap="round" fill="none"><path d="M22 34Q38 30 50 36"/><path d="M22 46Q38 42 50 48"/><path d="M22 58Q38 54 50 60"/></g><g stroke="#D6420F" stroke-width="3" stroke-linecap="round" fill="none"><path d="M70 36Q82 30 98 34"/><path d="M70 48Q82 42 98 46"/><path d="M70 60Q82 54 98 58"/></g></svg>',
    bars: '<svg viewBox="0 0 120 90" aria-hidden="true"><rect x="14" y="46" width="18" height="30" fill="#127A4F" stroke="#1A1610" stroke-width="2"/><rect x="40" y="34" width="18" height="42" fill="#F0A202" stroke="#1A1610" stroke-width="2"/><rect x="66" y="40" width="18" height="36" fill="#1F6FB2" stroke="#1A1610" stroke-width="2"/><rect x="92" y="18" width="18" height="58" fill="#D6420F" stroke="#1A1610" stroke-width="2"/><path d="M8 78H114" stroke="#1A1610" stroke-width="3" stroke-linecap="round"/><path d="M12 40L44 24L68 30L104 8" fill="none" stroke="#1A1610" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    coin: '<svg viewBox="0 0 120 90" aria-hidden="true"><circle cx="60" cy="42" r="26" fill="#F0A202" stroke="#1A1610" stroke-width="3"/><circle cx="60" cy="42" r="19" fill="none" stroke="#1A1610" stroke-width="1.5" stroke-dasharray="3 3"/><text x="60" y="49" text-anchor="middle" font-family="Space Mono,monospace" font-weight="700" font-size="20" fill="#1A1610">Rs</text><circle cx="100" cy="20" r="4" fill="#E85D4C"/><circle cx="18" cy="30" r="3" fill="#1F6FB2"/></svg>'
  };

  /* ---------- slides and cards ---------- */
  function slideOf(kind, x) {
    if (kind === 'course') return { href: x.href, topic: x.topic, title: x.title, meta: x.lessons, image: x.image };
    if (kind === 'news') return { href: x.href, topic: x.topic, title: x.title, meta: fmt(x.date), image: x.image };
    return { href: x.href, topic: x.topic, title: x.title, meta: fmt(x.date), image: x.image };
  }
  function cardArticle(a) {
    return '<a class="card t-' + esc(a.topic) + '" href="' + esc(a.href) + '"><div class="cimg">' + img(a.image, '', true) + '</div><div class="crow2"><span class="badge">' + esc(a.topic) + '</span>' + (a.date ? '<span class="date">' + fmt(a.date) + '</span>' : '') + '</div><h4>' + esc(a.title) + '</h4><p>' + esc(a.excerpt) + '</p><span class="readmore">' + esc(a.label || 'read') + ' →</span></a>';
  }
  function cardNews(n) {
    return '<a class="card t-' + esc(n.topic) + '" href="' + esc(n.href) + '"><div class="cimg">' + img(n.image, '', true) + '</div><div class="crow2"><span class="badge">' + esc(n.topic) + '</span><span class="date">' + fmt(n.date) + '</span></div><h4>' + esc(n.title) + '</h4><p>' + esc(n.summary) + '</p></a>';
  }
  function cardCourse(c) {
    return '<a class="card t-' + esc(c.topic) + '" href="' + esc(c.href) + '"><div class="cimg">' + img(c.image, '', true) + '</div><div class="crow2"><span class="badge">' + esc(c.topic) + '</span><span class="date">' + esc(c.lessons) + '</span></div><h4>' + esc(c.title) + '</h4><p>' + esc(c.desc) + '</p><span class="readmore">view course →</span></a>';
  }
  function cardVideo(v) {
    var linked = v.href && v.href !== '#';
    var inner = '<div class="vthumb">' + (ART[v.art] || ART.bars) + '<span class="play"></span></div><h4>' + esc(v.title) + '</h4><div class="vtag">' + esc(v.tag) + '</div>';
    return linked ? '<a class="card" href="' + esc(v.href) + '" target="_blank" rel="noopener">' + inner + '</a>' : '<div class="card">' + inner + '</div>';
  }
  function cardAd(p) {
    return '<div class="ad"><div class="ad-tag">paid ' + esc(p.kind) + '</div><div class="cimg">' + img(p.image, '', true) + '</div><div><h4>' + esc(p.title) + '</h4><p>' + esc(p.desc) + '</p></div><div class="price">' + esc(p.price) + '</div><div class="ad-note">paid via gumroad — instant ' + (p.kind === 'tool' ? 'download' : 'access') + '</div><a class="btn" href="' + esc(p.href) + '">buy on gumroad →</a></div>';
  }
  var EMPTY = '<div class="card"><h4>Nothing here yet</h4><p>No posts match this filter. Try another topic, or check back soon.</p></div>';

  /* ---------- hero carousel ---------- */
  function Carousel(root, emptyMsg) {
    var track = root.querySelector('.track'), dots = root.querySelector('.dots'), bar = root.querySelector('.bar'), ctrl = root.querySelector('.ctrl');
    var DUR = 5500, self = { cur: 0, n: 0, timer: null, paused: false };
    emptyMsg = emptyMsg || ['Nothing here yet', 'No posts match this filter. Try another topic.'];
    self.set = function (slides) {
      self.n = slides.length;
      if (!self.n) { track.innerHTML = '<div class="empty"><div>' + emptyMsg[0] + '<span>' + emptyMsg[1] + '</span></div></div>'; ctrl.hidden = true; clearTimeout(self.timer); bar.classList.remove('run'); return; }
      ctrl.hidden = false;
      track.innerHTML = slides.map(function (s, i) {
        return '<a class="slide t-' + esc(s.topic) + '" href="' + esc(s.href) + '" aria-label="' + (i + 1) + ' of ' + slides.length + ': ' + esc(s.title) + '">' + img(s.image, 'bg', i > 0) + img(s.image, 'fg', i > 0) + '<div class="txt"><div class="crow"><span class="kind">' + esc(s.topic) + '</span>' + (s.meta ? '<span class="smeta">' + esc(s.meta) + '</span>' : '') + '</div><h3>' + esc(s.title) + '</h3></div></a>';
      }).join('');
      dots.innerHTML = slides.map(function (s, i) { return '<button class="dot" role="tab" aria-label="Show item ' + (i + 1) + '" data-i="' + i + '"></button>'; }).join('');
      self.go(0);
    };
    self.go = function (i) {
      if (!self.n) return;
      self.cur = (i + self.n) % self.n;
      track.style.transform = 'translateX(-' + self.cur * 100 + '%)';
      [].forEach.call(dots.children, function (d, j) { d.setAttribute('aria-current', j === self.cur ? 'true' : 'false'); });
      self.restart();
    };
    self.restart = function () {
      clearTimeout(self.timer); bar.classList.remove('run'); void bar.offsetWidth;
      if (reduce || self.paused || self.n < 2) return;
      bar.style.setProperty('--dur', DUR + 'ms'); bar.classList.add('run');
      self.timer = setTimeout(function () { self.go(self.cur + 1); }, DUR);
    };
    function hold() { self.paused = true; root.classList.add('paused'); clearTimeout(self.timer); }
    function free() { self.paused = false; root.classList.remove('paused'); self.restart(); }
    root.addEventListener('mouseenter', hold); root.addEventListener('mouseleave', free);
    root.addEventListener('focusin', hold); root.addEventListener('focusout', free);
    root.querySelector('.prev').onclick = function () { self.go(self.cur - 1); };
    root.querySelector('.next').onclick = function () { self.go(self.cur + 1); };
    dots.addEventListener('click', function (e) { var b = e.target.closest('.dot'); if (b) self.go(+b.getAttribute('data-i')); });
    var sx = null, moved = false;
    root.addEventListener('pointerdown', function (e) { if (e.target.closest('.ctrl')) return; sx = e.clientX; moved = false; });
    root.addEventListener('pointerup', function (e) { if (sx === null) return; var dx = e.clientX - sx; sx = null; if (Math.abs(dx) > 45) { moved = true; self.go(dx < 0 ? self.cur + 1 : self.cur - 1); } });
    root.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } }, true);
    document.addEventListener('visibilitychange', function () { if (document.hidden) clearTimeout(self.timer); else self.restart(); });
    return self;
  }

  /* ---------- sideways card rail ---------- */
  function Rail(root, auto) {
    var tr = root.querySelector('.rail-track'), timer = null, paused = false;
    function step(dir) { var w = tr.firstElementChild ? tr.firstElementChild.getBoundingClientRect().width + 20 : 300; tr.scrollBy({ left: dir * w, behavior: reduce ? 'auto' : 'smooth' }); }
    function tick() {
      clearTimeout(timer);
      if (!auto || reduce || paused) return;
      timer = setTimeout(function () {
        if (tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 6) tr.scrollTo({ left: 0, behavior: 'smooth' }); else step(1);
        tick();
      }, 4200);
    }
    root.querySelector('.rail-btn.l').onclick = function () { step(-1); };
    root.querySelector('.rail-btn.r').onclick = function () { step(1); };
    root.addEventListener('mouseenter', function () { paused = true; clearTimeout(timer); });
    root.addEventListener('mouseleave', function () { paused = false; tick(); });
    root.addEventListener('focusin', function () { paused = true; clearTimeout(timer); });
    root.addEventListener('focusout', function () { paused = false; tick(); });
    return { set: function (html) { tr.innerHTML = html; tr.scrollLeft = 0; tick(); } };
  }

  /* ---------- filter pills ---------- */
  function pills(root, items, current, onPick) {
    root.innerHTML = items.map(function (p) {
      if (p.href) return '<a class="pill" href="' + esc(p.href) + '">' + esc(p.name) + '</a>';
      return '<button class="pill' + (p.name === current ? ' active' : '') + '" data-f="' + esc(p.name) + '">' + esc(p.name) + '</button>';
    }).join('');
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button.pill'); if (!b) return;
      [].forEach.call(root.querySelectorAll('button.pill'), function (c) { c.classList.toggle('active', c === b); });
      onPick(b.getAttribute('data-f'));
    });
  }

  /* ---------- pages ---------- */
  var pages = {
    home: function () {
      var car = Carousel($('hero-car'));
      car.set(pick(D.articles, 6).map(function (a) { return slideOf('article', a); }));

      var items = newest(D.news);
      var scroller = $('scroller'), vp = scroller.parentNode;
      function row(n, hidden) {
        var h = hidden ? ' tabindex="-1" aria-hidden="true"' : '';
        return '<div class="item"><a class="thumb" href="' + esc(n.href) + '"' + h + '>' + img(n.image, '', true) + '</a><div><div class="meta"><span class="badge t-' + esc(n.topic) + '">' + esc(n.topic) + '</span><span class="date">' + fmt(n.date) + '</span></div><a class="ttl" href="' + esc(n.href) + '"' + h + '>' + esc(n.title) + '</a></div></div>';
      }
      if (items.length) {
        var r = 1;
        do {
          var a = '', b = '';
          for (var k = 0; k < r; k++) { a += items.map(function (n) { return row(n, false); }).join(''); b += items.map(function (n) { return row(n, true); }).join(''); }
          scroller.innerHTML = a + b; r++;
        } while (scroller.scrollHeight / 2 < vp.clientHeight + 20 && r < 7);
        scroller.style.setProperty('--up', Math.max(24, Math.round(scroller.scrollHeight / 2 / 24)) + 's');
      }

      $('learn-grid').innerHTML = newest(D.courses).map(cardCourse).join('');
      $('tools-grid').innerHTML = newest(D.articles.filter(function (a) { return (a.tags || []).indexOf('tools') > -1; })).slice(0, 3).map(cardArticle).join('');
      Rail($('video-rail'), true).set(newest(D.videos).map(cardVideo).join(''));

      var rc = '';
      if (D.tools.length) rc += '<div class="receipt"><div class="receipt-head">explore · paid tools</div>' + D.tools.map(function (t) { return '<div class="receipt-row"><div>' + esc(t.title) + '<span class="desc">' + esc(t.desc) + '</span></div><div class="rp">' + esc(t.price) + '</div></div>'; }).join('') + '<div class="receipt-foot">paid via gumroad — instant download</div></div>';
      if (D.paid.length) rc += '<div class="receipt"><div class="receipt-head">academy · paid courses</div>' + D.paid.map(function (t) { return '<div class="receipt-row"><div>' + esc(t.title) + '<span class="desc">' + esc(t.desc) + '</span></div><div class="rp">' + esc(t.price) + '</div></div>'; }).join('') + '<div class="receipt-foot">paid via gumroad — instant access</div></div>';
      $('receipts').innerHTML = rc;
    },

    explore: function () {
      var params = new URLSearchParams(location.search);
      var q = (params.get('q') || '').trim().toLowerCase();
      var t = params.get('t') || 'all';
      if (['all', 'business', 'finance', 'technology', 'tools'].indexOf(t) < 0) t = 'all';
      var car = Carousel($('ex-car'));
      var CATS = ['business', 'finance', 'technology'];
      function draw(f) {
        var list = newest(D.articles).filter(function (a) {
          var okTopic = f === 'all' || (a.tags || []).indexOf(f) > -1 || a.topic === f;
          var okText = !q || (a.title + ' ' + a.excerpt).toLowerCase().indexOf(q) > -1;
          return okTopic && okText;
        });
        car.set(pick(list, 6).map(function (a) { return slideOf('article', a); }));
        var html = CATS.map(function (c) {
          var g = list.filter(function (a) { return a.topic === c; });
          return g.length ? '<div class="label">' + c + '</div><div class="grid">' + g.map(cardArticle).join('') + '</div>' : '';
        }).join('');
        $('ex-groups').innerHTML = html || '<div class="grid">' + EMPTY + '</div>';
      }
      pills($('ex-pills'), [{ name: 'all' }, { name: 'psx', href: 'psx.html' }, { name: 'business' }, { name: 'finance' }, { name: 'technology' }, { name: 'tools' }], t, draw);
      if (q) { $('found').hidden = false; $('found').innerHTML = 'Showing results for “' + esc(params.get('q')) + '”. <a href="explore.html">clear</a>'; }
      draw(t);
      if (D.tools.length) $('paid').innerHTML = newest(D.tools).map(cardAd).join('');
      else { $('paid').remove(); $('stage').classList.remove('with-ad'); }
    },

    news: function () {
      var car = Carousel($('nw-car'), ['No posts in this topic yet', 'News and updates will show up here as soon as they are posted.']);
      function draw(f) {
        var list = newest(D.news).filter(function (n) { return f === 'all' || n.topic === f; });
        car.set(pick(list, 5).map(function (n) { return slideOf('news', n); }));
        $('nw-grid').innerHTML = list.length ? list.map(cardNews).join('') : EMPTY;
      }
      pills($('nw-pills'), ['all', 'psx', 'business', 'finance', 'technology'].map(function (n) { return { name: n }; }), 'all', draw);
      draw('all');
    },

    academy: function () {
      var car = Carousel($('ac-car'));
      car.set(pick(D.courses, 6).map(function (c) { return slideOf('course', c); }));
      Rail($('ac-rail'), true).set(newest(D.videos).map(cardVideo).join(''));
      if (D.paid.length) $('paid').innerHTML = newest(D.paid).map(cardAd).join('');
      else { $('paid').remove(); $('stage').classList.remove('with-ad'); }
    }
  };

  var page = document.body.getAttribute('data-page');
  if (pages[page]) pages[page]();
})();
