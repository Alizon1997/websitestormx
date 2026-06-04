/* Storm X Digital — Cookie Consent + Google Consent Mode v2 + Meta Pixel
   GDPR + ePrivacy compliant. Categorie: Necessari (sempre on), Analytics, Marketing.
   I tracking pixel (Meta + Google) si caricano SOLO dopo consenso esplicito.

   Configurazione: sostituisci i 3 ID con i tuoi prima del deploy:
   - GA4_ID, GADS_ID, META_PIXEL_ID
*/

(() => {
  // ============ CONFIG ============
  const CONFIG = {
    GA4_ID:        'G-XXXXXXXXXX',           // ← Sostituire con il tuo Google Analytics 4 ID
    GADS_ID:       'AW-XXXXXXXXX',           // ← Sostituire con il tuo Google Ads Conversion ID
    META_PIXEL_ID: '1445471526062406',       // ← ID Meta Pixel (estratto da www.stormxdigital.com)
    LEMLIST_URL:   'https://app.lemlist.com/api/visitors/tracking?k=BDhq9RkiazDZTAsrf78TQIpGU4Y1T59qj2H54KEzAXQ=&t=tea_WDB3Rjyj2RrCtS2Lm',  // ← Lemlist visitor tracking (estratto da produzione)
    COOKIE_NAME:   'sxd-consent',
    COOKIE_DAYS:   180,
  };

  // ============ Google Consent Mode v2 — DEFAULT DENIED (obbligatorio EU) ============
  // Va inizializzato PRIMA di qualsiasi gtag config
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('consent', 'default', {
    'ad_storage':            'denied',
    'ad_user_data':          'denied',
    'ad_personalization':    'denied',
    'analytics_storage':     'denied',
    'functionality_storage': 'granted',
    'security_storage':      'granted',
    'wait_for_update':       500,
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('set', 'url_passthrough', true);

  // ============ Storage helpers ============
  function getCookie(name) {
    const m = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return m ? decodeURIComponent(m[2]) : null;
  }
  function setCookie(name, val, days) {
    const exp = new Date(); exp.setTime(exp.getTime() + days * 86400000);
    document.cookie = name + '=' + encodeURIComponent(val) + ';expires=' + exp.toUTCString() + ';path=/;SameSite=Lax';
  }

  function loadConsent() {
    const raw = getCookie(CONFIG.COOKIE_NAME);
    if (!raw) return null;
    try { return JSON.parse(raw); } catch { return null; }
  }
  function saveConsent(c) {
    setCookie(CONFIG.COOKIE_NAME, JSON.stringify({ ...c, timestamp: Date.now(), v: 1 }), CONFIG.COOKIE_DAYS);
  }

  // ============ Pixel loaders (run only when consent given) ============
  let analyticsLoaded = false;
  let marketingLoaded = false;
  let lemlistLoaded  = false;

  function loadLemlist() {
    if (lemlistLoaded) return;
    lemlistLoaded = true;
    if (!CONFIG.LEMLIST_URL) return;
    // Lemlist visitor tracking: attribuisce visite a campagne outbound
    const s = document.createElement('script');
    s.async = true;
    s.type = 'text/javascript';
    s.src = CONFIG.LEMLIST_URL;
    document.head.appendChild(s);
  }

  function loadGoogleTag() {
    if (analyticsLoaded) return;
    analyticsLoaded = true;
    // Google tag (gtag.js) library — single script for GA4 + Google Ads
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA4_ID;
    document.head.appendChild(s);
    gtag('js', new Date());
    gtag('config', CONFIG.GA4_ID, { 'anonymize_ip': true });
    if (CONFIG.GADS_ID && CONFIG.GADS_ID !== 'AW-XXXXXXXXX') {
      gtag('config', CONFIG.GADS_ID);
    }
  }

  function loadMetaPixel() {
    if (marketingLoaded) return;
    marketingLoaded = true;
    if (!CONFIG.META_PIXEL_ID) return;
    // Standard Meta Pixel snippet (versione 2.0)
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', CONFIG.META_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  // ============ Apply consent (update Consent Mode + load pixels) ============
  function applyConsent(c) {
    const analytics = !!c.analytics;
    const marketing = !!c.marketing;

    gtag('consent', 'update', {
      'ad_storage':            marketing ? 'granted' : 'denied',
      'ad_user_data':          marketing ? 'granted' : 'denied',
      'ad_personalization':    marketing ? 'granted' : 'denied',
      'analytics_storage':     analytics ? 'granted' : 'denied',
    });

    if (analytics) { loadGoogleTag(); loadLemlist(); }
    if (marketing) loadMetaPixel();
  }

  // ============ Banner / Modal management ============
  function buildBanner() {
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.id = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Avviso cookie');
    banner.innerHTML = `
      <div class="cookie-banner-inner">
        <div class="copy">
          <span class="label">Cookie & Privacy</span>
          <p>Usiamo cookie tecnici sempre attivi. Se ce lo permetti usiamo anche cookie analitici (Google Analytics) e cookie di marketing (Meta Pixel, Google Ads) per migliorare il sito e mostrarti annunci pertinenti. <a href="/cookies/">Leggi la cookie policy</a> · <a href="/privacy/">Privacy</a></p>
        </div>
        <div class="actions">
          <button class="cookie-btn btn-customize" data-action="customize">Personalizza</button>
          <button class="cookie-btn btn-reject" data-action="reject">Rifiuta tutto</button>
          <button class="cookie-btn btn-accept" data-action="accept-all">Accetta tutto</button>
        </div>
      </div>
    `;
    return banner;
  }

  function buildModal() {
    const modal = document.createElement('div');
    modal.className = 'cookie-modal';
    modal.id = 'cookie-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-label', 'Preferenze cookie');
    modal.innerHTML = `
      <div class="cookie-modal-box">
        <div class="cookie-modal-head">
          <h2>Preferenze cookie</h2>
          <p>Scegli quali categorie di cookie vuoi accettare. Puoi cambiare la tua scelta in qualsiasi momento dal link in fondo alla pagina.</p>
        </div>
        <div class="cookie-cat">
          <div class="info">
            <h4>Cookie necessari</h4>
            <p>Strettamente necessari al funzionamento del sito. Non raccolgono dati personali.</p>
            <span class="always">SEMPRE ATTIVI</span>
          </div>
          <label class="cookie-toggle">
            <input type="checkbox" checked disabled>
            <span class="slider"></span>
          </label>
        </div>
        <div class="cookie-cat">
          <div class="info">
            <h4>Cookie analitici</h4>
            <p>Google Analytics 4 + Lemlist visitor tracking. Ci aiutano a capire come navighi il sito e se arrivi da una nostra campagna outbound. Dati anonimizzati.</p>
          </div>
          <label class="cookie-toggle">
            <input type="checkbox" id="cc-analytics">
            <span class="slider"></span>
          </label>
        </div>
        <div class="cookie-cat">
          <div class="info">
            <h4>Cookie di marketing</h4>
            <p>Meta Pixel (Facebook/Instagram), Google Ads. Usati per mostrare annunci pertinenti su altre piattaforme e misurare le campagne.</p>
          </div>
          <label class="cookie-toggle">
            <input type="checkbox" id="cc-marketing">
            <span class="slider"></span>
          </label>
        </div>
        <div class="cookie-modal-foot">
          <button class="cookie-btn btn-reject" data-action="modal-reject">Rifiuta tutto</button>
          <button class="cookie-btn btn-customize" data-action="modal-save">Salva preferenze</button>
          <button class="cookie-btn btn-accept" data-action="modal-accept-all">Accetta tutto</button>
        </div>
      </div>
    `;
    return modal;
  }

  function showBanner() {
    const b = document.getElementById('cookie-banner');
    if (b) requestAnimationFrame(() => b.classList.add('show'));
  }
  function hideBanner() {
    const b = document.getElementById('cookie-banner');
    if (b) b.classList.remove('show');
  }
  function showModal() {
    const m = document.getElementById('cookie-modal');
    if (m) {
      // Pre-popola con consenso corrente (se esiste)
      const c = loadConsent();
      if (c) {
        document.getElementById('cc-analytics').checked = !!c.analytics;
        document.getElementById('cc-marketing').checked = !!c.marketing;
      }
      m.classList.add('show');
    }
  }
  function hideModal() {
    const m = document.getElementById('cookie-modal');
    if (m) m.classList.remove('show');
  }

  function commit(consent) {
    saveConsent(consent);
    applyConsent(consent);
    hideBanner();
    hideModal();
  }

  // ============ INIT ============
  function init() {
    // Crea sempre banner + modal nel DOM
    document.body.appendChild(buildBanner());
    document.body.appendChild(buildModal());

    // Event delegation
    document.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (!action) return;
      switch (action) {
        case 'accept-all':
          commit({ analytics: true, marketing: true });
          break;
        case 'reject':
          commit({ analytics: false, marketing: false });
          break;
        case 'customize':
          showModal();
          break;
        case 'modal-save':
          commit({
            analytics: document.getElementById('cc-analytics').checked,
            marketing: document.getElementById('cc-marketing').checked,
          });
          break;
        case 'modal-accept-all':
          document.getElementById('cc-analytics').checked = true;
          document.getElementById('cc-marketing').checked = true;
          commit({ analytics: true, marketing: true });
          break;
        case 'modal-reject':
          commit({ analytics: false, marketing: false });
          break;
        case 'open-cookie-prefs':
          // Esposto al footer link "Gestisci preferenze cookie"
          showModal();
          break;
      }
    });

    // Carica consenso esistente o mostra banner
    const existing = loadConsent();
    if (existing) {
      applyConsent(existing);
    } else {
      showBanner();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
