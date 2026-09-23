(function () {
  // ---------- Menu hamburger ----------
  const toggle = document.getElementById('menuToggle');
  const dropdown = document.getElementById('menuDropdown');
  if (toggle && dropdown) {
    const close = () => {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const isOpen = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.menu-wrap')) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });
  }

  const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso + 'T12:00:00');
    if (isNaN(d)) return '';
    return d.toLocaleDateString(lang === 'en' ? 'en-CA' : 'fr-CA', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const addParagraphs = (el, text) => {
    (text || '').trim().split(/\n\s*\n/).forEach((chunk) => {
      const t = chunk.trim().replace(/\s*\n\s*/g, ' ');
      if (!t) return;
      const p = document.createElement('p');
      p.textContent = t;
      el.appendChild(p);
    });
  };

  // ---------- Page Menu ----------
  const feature = document.getElementById('menuFeature');
  if (feature) {
    const data = window.MENU || {};
    const fallback = document.getElementById('menuFallback');
    const imagesEl = document.getElementById('menuImages');
    const dateEl = document.getElementById('menuDate');
    const noteEl = document.getElementById('menuNote');

    addParagraphs(noteEl, lang === 'en' ? data.note_en : data.note_fr);

    const images = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
    const version = data.date ? '?v=' + encodeURIComponent(data.date) : '';
    const niceDate = formatDate(data.date);

    if (niceDate) {
      dateEl.textContent = (lang === 'en' ? 'Updated ' : 'Mis à jour le ') + niceDate;
    }

    let remaining = images.length;
    const failOne = (link) => {
      link.remove();
      remaining -= 1;
      if (remaining <= 0) {
        feature.hidden = true;
        fallback.hidden = false;
      }
    };

    if (!images.length) {
      fallback.hidden = false;
    } else {
      images.forEach((src, i) => {
        const url = src + version;
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.setAttribute('aria-label',
          lang === 'en' ? 'Open the menu full size' : 'Ouvrir le menu en grand');
        const img = document.createElement('img');
        img.src = url;
        img.alt = (lang === 'en' ? 'Menu' : 'Menu') + (niceDate ? ' — ' + niceDate : '') +
          (images.length > 1 ? ' (' + (i + 1) + '/' + images.length + ')' : '');
        img.addEventListener('error', () => failOne(link));
        link.appendChild(img);
        imagesEl.appendChild(link);
      });
      feature.hidden = false;
    }
  }

  // ---------- Page Presse ----------
  const pressList = document.getElementById('pressList');
  if (pressList) {
    const articles = (Array.isArray(window.PRESSE) ? window.PRESSE : [])
      .filter((a) => a && a.lien && a.titre)
      .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));

    if (!articles.length) {
      document.getElementById('pressEmpty').hidden = false;
      pressList.hidden = true;
    }

    articles.forEach((a) => {
      const li = document.createElement('li');
      li.className = 'press-item';
      const link = document.createElement('a');
      link.href = a.lien;
      link.target = '_blank';
      link.rel = 'noopener';

      const meta = document.createElement('div');
      meta.className = 'press-meta';
      const outlet = document.createElement('span');
      outlet.textContent = a.media || '';
      const date = document.createElement('span');
      date.textContent = formatDate(a.date);
      meta.append(outlet, date);

      const title = document.createElement('p');
      title.className = 'press-title';
      title.textContent = a.titre;
      link.append(meta, title);

      const quote = lang === 'en' ? (a.extrait_en || a.extrait_fr) : a.extrait_fr;
      if (quote && quote.trim()) {
        const q = document.createElement('p');
        q.className = 'press-quote';
        q.textContent = '« ' + quote.trim() + ' »';
        if (lang === 'en') q.textContent = '“' + quote.trim() + '”';
        link.appendChild(q);
      }

      li.appendChild(link);
      pressList.appendChild(li);
    });
  }
})();
