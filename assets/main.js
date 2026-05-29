/* Storm X Digital — interactions v3
   Counter animations · reveal-on-scroll · footer timestamp · trust-strip counters · video lazy autoplay
   (custom cursor removed — UX feedback)
*/

(() => {
  // ---- Counter animation ----
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.counter);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1600;
    const start = performance.now();
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const v = target * easeOut(t);
      el.textContent = prefix + (decimals ? v.toFixed(decimals).replace('.', ',') : Math.round(v).toLocaleString('it-IT')) + suffix;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  // ---- Reveal-on-scroll + auto-trigger counters ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        entry.target.querySelectorAll('[data-counter]').forEach((c) => {
          if (!c.dataset.done) { c.dataset.done = '1'; animateCounter(c); }
        });
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  document.querySelectorAll('.reveal, .reveal-stagger, .trust-strip, .kpi-row, .hero-stats-bar').forEach((el) => io.observe(el));

  // ---- Hero counters (above the fold — fire immediately on load) ----
  document.querySelectorAll('.trust-strip [data-counter], .hero-stats-bar [data-counter]').forEach((c) => {
    if (!c.dataset.done) { c.dataset.done = '1'; animateCounter(c); }
  });

  // ---- Footer live timestamp (UTC) ----
  const ts = document.getElementById('ts');
  if (ts) {
    const fmt = () => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      ts.textContent = `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}T${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}Z`;
    };
    fmt();
    setInterval(fmt, 1000);
  }

  // ---- Formspree contact form: AJAX submit + success/error state + conversion event ----
  const prenotaForm = document.getElementById('prenota-form');
  if (prenotaForm) {
    const successEl = document.getElementById('prenota-success');
    const errorEl   = document.getElementById('prenota-error');
    const ticketEl  = document.getElementById('prenota-ticket');
    const submitBtn = prenotaForm.querySelector('.btn-submit');
    const lang      = prenotaForm.dataset.lang || 'it';

    // Free-email domains to nudge against (not block — just warn)
    const FREE_DOMAINS = ['gmail.com','googlemail.com','yahoo.com','yahoo.it','hotmail.com','outlook.com','libero.it','tiscali.it','icloud.com','live.com','aol.com','protonmail.com'];

    // Simple client-side validation
    const validate = () => {
      const email = prenotaForm.email.value.trim().toLowerCase();
      const domain = email.split('@')[1] || '';
      const isFree = FREE_DOMAINS.includes(domain);
      const emailInput = prenotaForm.email;
      if (isFree) {
        const msg = lang === 'en'
          ? 'Please use a business email (not @gmail/@yahoo). We evaluate the fit based on the company domain.'
          : "Usa un'email aziendale (non @gmail/@yahoo). Valutiamo il match partendo dal dominio aziendale.";
        emailInput.setCustomValidity(msg);
        emailInput.reportValidity();
        emailInput.addEventListener('input', () => emailInput.setCustomValidity(''), { once: true });
        return false;
      }
      return prenotaForm.checkValidity() || (prenotaForm.reportValidity(), false);
    };

    // Fire a 'generate_lead' conversion event into dataLayer + Meta Pixel (only if consent given)
    const fireConversion = (payload) => {
      try {
        if (window.dataLayer) {
          window.dataLayer.push({
            event: 'generate_lead',
            lead_source: 'prenota_form',
            form_lang: lang,
            ...payload,
          });
        }
        // Meta Pixel Lead event (fbq loads only after marketing consent — so this is gated automatically)
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Lead', { content_name: 'Pipeline Audit Request', content_category: lang });
        }
        // Google Ads conversion (placeholder — replace AW-XXXX/yyyy with real conversion ID/label)
        if (typeof window.gtag === 'function') {
          window.gtag('event', 'generate_lead', { lead_source: 'prenota_form' });
        }
      } catch (e) { /* no-op: analytics must never break UX */ }
    };

    prenotaForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Honeypot trip → pretend success, skip submit (bot will think it worked)
      if (prenotaForm._gotcha.value.trim() !== '') {
        prenotaForm.hidden = true;
        successEl.hidden = false;
        return;
      }

      if (!validate()) return;

      submitBtn.setAttribute('aria-busy', 'true');
      submitBtn.disabled = true;
      errorEl.hidden = true;

      const ticket = 'SX' + Date.now().toString(36).toUpperCase();

      try {
        const formData = new FormData(prenotaForm);
        formData.append('ticket', ticket);
        formData.append('page', window.location.pathname);
        formData.append('referrer', document.referrer || 'direct');

        const res = await fetch(prenotaForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' },
        });

        if (!res.ok) throw new Error('HTTP ' + res.status);

        // Success → swap form for success state + fire conversion
        prenotaForm.hidden = true;
        if (ticketEl) ticketEl.textContent = ticket;
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        fireConversion({ ticket_id: ticket });
      } catch (err) {
        errorEl.hidden = false;
        errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } finally {
        submitBtn.removeAttribute('aria-busy');
        submitBtn.disabled = false;
      }
    });
  }

  // ---- Mobile menu: clone CTA + lang into nav overlay on first open ----
  const nav = document.getElementById('site-nav');
  const headerRight = document.querySelector('.header-right');
  if (nav && headerRight) {
    let injected = false;
    const injectMobileActions = () => {
      if (injected) return;
      const cta  = headerRight.querySelector('.header-cta');
      const lang = headerRight.querySelector('.header-lang');
      if (!cta && !lang) return;
      const wrap = document.createElement('div');
      wrap.className = 'nav-mobile-actions';
      if (lang) wrap.appendChild(lang.cloneNode(true));
      if (cta)  wrap.appendChild(cta.cloneNode(true));
      nav.appendChild(wrap);
      injected = true;
    };
    // Inject on first interaction, regardless of viewport (hidden via CSS at >980px).
    const btn = document.querySelector('.mobile-menu-btn');
    if (btn) btn.addEventListener('click', injectMobileActions, { once: false });
    // Also pre-inject if menu is already open via direct class (defensive)
    if (nav.classList.contains('open')) injectMobileActions();
  }

  // ---- Hero video lazy autoplay (mobile-safe) ----
  const heroVideo = document.querySelector('.hero-visual video');
  if (heroVideo) {
    // Already has autoplay+muted+playsinline attributes in HTML, but iOS Safari sometimes needs an explicit play() call after metadata is ready.
    heroVideo.addEventListener('loadedmetadata', () => {
      heroVideo.play().catch(() => {
        // Autoplay blocked: poster image stays visible. No further action needed.
      });
    });
    // Pause when not in viewport (battery + perf)
    if ('IntersectionObserver' in window) {
      const vio = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) heroVideo.play().catch(() => {});
          else heroVideo.pause();
        });
      }, { threshold: 0.25 });
      vio.observe(heroVideo);
    }
  }
})();
