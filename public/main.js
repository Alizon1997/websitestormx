'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { toggle.setAttribute('aria-expanded', 'false'); navigation.classList.remove('is-open'); }
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open); });
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { closeMenu(); toggle.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.nav-wrap')) closeMenu(); });
window.matchMedia('(min-width: 1041px)').addEventListener('change', event => { if (event.matches) closeMenu(); });
document.querySelector('#year').textContent = new Date().getFullYear();
const form = document.querySelector('#contact-form');
let submissionId = crypto.randomUUID();
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (form.elements._gotcha.value) return;
  const button = form.querySelector('button[type="submit"]');
  if (button.disabled) return;
  const label = button.querySelector('.submit-label');
  const error = document.querySelector('#form-error');
  error.hidden = true;
  button.disabled = true;
  form.setAttribute('aria-busy', 'true');
  label.textContent = 'Invio in corso…';
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const data = new FormData(form);
    data.set('submission_id', submissionId);
    for (const name of ['name', 'email', 'company', 'message']) data.set(name, String(data.get(name) || '').trim());
    const response = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' }, signal: controller.signal });
    const result = await response.json();
    if (!response.ok || result.ok !== true || !result.id) {if(result.captcha){await window.stormxRefreshCaptcha?.(form);throw new Error('Captcha failed');}throw new Error('Submission failed');}
    const reference = document.querySelector('#request-reference');
    reference.textContent = `Riferimento: ${result.id.slice(0, 8).toUpperCase()}`;
    reference.hidden = false;
    submissionId = crypto.randomUUID();
    window.stormxTrack?.('form_success','contact');
    form.hidden = true;
    const success = document.querySelector('#form-success');
    success.hidden = false;
    success.focus();
    form.reset();
  } catch (problem) {
    if(problem.message==='Captcha failed'){error.textContent='Il codice di verifica non è corretto o è scaduto. Inserisci il nuovo codice per inviare la richiesta.';form.elements.captcha_answer.focus();}else{error.innerHTML='Non è stato possibile inviare la richiesta. Riprova oppure <a href="mailto:marcellodipierro@stormxdigital.com">scrivici via email</a>.';}
    error.hidden = false;
  } finally {
    clearTimeout(timeout);
    button.disabled = false;
    form.removeAttribute('aria-busy');
    label.textContent = new URLSearchParams(location.search).get('servizio')==='amazon'?'Richiedi l’analisi gratuita':'Richiedi la call gratuita';
  }
});

// A guided, illustrative view of the complete commercial process.
const journeyStages = [{"kicker": "01 / Ricerca e strategia", "title": "Cerchiamo i clienti giusti.", "description": "Aziende in linea con la tua offerta.", "result": "Una lista di aziende e decisori."}, {"kicker": "02 / Primo contatto", "title": "Apriamo la conversazione.", "description": "Email, LinkedIn, WhatsApp e telefono. Con un messaggio pertinente.", "result": "Risposte da persone interessate."}, {"kicker": "03 / Qualifica commerciale", "title": "Capiamo chi è interessato.", "description": "Verifichiamo esigenze, priorità e tempi.", "result": "Opportunità qualificate."}, {"kicker": "04 / Proposta e trattativa", "title": "Seguiamo la trattativa.", "description": "Proposte e follow-up, insieme al tuo team.", "result": "Un prossimo passo chiaro."}, {"kicker": "05 / Chiusura e continuità", "title": "Ti affianchiamo fino alla firma.", "description": "Negoziazione, accordi e passaggio al tuo team.", "result": "Accordi e responsabilità condivisi."}];
let currentStage = 0;
const stageTabs = [...document.querySelectorAll('[data-stage]')];
const journeyPanel = document.querySelector('#journey-panel');
function setStage(index, focusTab = false) {
  currentStage = Math.max(0, Math.min(journeyStages.length - 1, index));
  const stage = journeyStages[currentStage];
  stageTabs.forEach((tab, i) => { tab.setAttribute('aria-selected', String(i === currentStage)); tab.tabIndex = i === currentStage ? 0 : -1; });
  journeyPanel.setAttribute('aria-labelledby', `stage-${currentStage}`);
  document.querySelector('#journey-kicker').textContent = stage.kicker;
  document.querySelector('#journey-title').textContent = stage.title;
  document.querySelector('#journey-description').textContent = stage.description;
  document.querySelector('#journey-result').textContent = stage.result;
  document.querySelector('#journey-counter').textContent = `${String(currentStage + 1).padStart(2, '0')} / 05`;
  document.querySelectorAll('[data-art]').forEach((art, i) => { art.hidden = i !== currentStage; });
  document.querySelector('#journey-prev').disabled = currentStage === 0;
  document.querySelector('#journey-next').disabled = currentStage === journeyStages.length - 1;
  if (focusTab) stageTabs[currentStage].focus();
}
stageTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => setStage(index));
  tab.addEventListener('keydown', event => {
    const keys = { ArrowRight:(index+1)%stageTabs.length, ArrowLeft:(index-1+stageTabs.length)%stageTabs.length, Home:0, End:stageTabs.length-1 };
    if (event.key in keys) { event.preventDefault(); setStage(keys[event.key], true); }
  });
});
document.querySelector('#journey-prev').addEventListener('click', () => setStage(currentStage - 1));
document.querySelector('#journey-next').addEventListener('click', () => setStage(currentStage + 1));
// Motion has an explicit pause control and respects the operating system setting.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = reducedMotion.matches;
const motionButton = document.querySelector('.motion-toggle');
const logoTrack = document.querySelector('.logo-track');
const logoDuplicate = logoTrack.querySelector('.logo-group').cloneNode(true);
logoDuplicate.setAttribute('aria-hidden', 'true');
logoDuplicate.querySelectorAll('img').forEach(img => { img.alt = ''; });
logoTrack.append(logoDuplicate);
function updateMotion() {
  if (reducedMotion.matches) motionPaused = true;
  motionButton.disabled = reducedMotion.matches;
  document.documentElement.classList.toggle('motion-paused', motionPaused);
  // A static grid keeps every client visible when scrolling is paused.
  logoTrack.classList.toggle('is-static', motionPaused);
  motionButton.setAttribute('aria-pressed', String(motionPaused));
  motionButton.querySelector('.motion-label').textContent = reducedMotion.matches ? 'Movimento ridotto' : motionPaused ? 'Riprendi animazioni' : 'Pausa animazioni';
  motionButton.querySelector('.motion-symbol').textContent = motionPaused ? '▷' : 'Ⅱ';
}
motionButton.addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); });
reducedMotion.addEventListener('change', event => { motionPaused = event.matches; updateMotion(); });
updateMotion();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { if (!motionPaused) entry.target.classList.add('reveal-enter'); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.section-heading, .service, .case, .person, .engagement-title, .tech-layout, .contact-copy').forEach(el => observer.observe(el));
}
let scrollFrame = false;
function updateProgress() {
  const distance = document.documentElement.scrollHeight - innerHeight;
  document.documentElement.style.setProperty('--read-progress', distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0);
  scrollFrame = false;
}
addEventListener('scroll', () => { if (!scrollFrame) { scrollFrame = true; requestAnimationFrame(updateProgress); } }, { passive:true });
addEventListener('resize', updateProgress);
updateProgress();

// Visitors start each video explicitly. Only one video plays at a time.
const siteVideos = [...document.querySelectorAll('.video-frame video')];
siteVideos.forEach(video => {
  const start = document.querySelector(`[data-video="${video.id}"]`);
  const error = video.closest('figure').querySelector('.video-error');
  start.hidden = false;
  video.controls = false;
  start.addEventListener('click', async () => {
    error.hidden = true;
    start.disabled = true;
    video.controls = true;
    try {
      await video.play();
      start.hidden = true;
      video.focus({ preventScroll:true });
    } catch {
      video.controls = false;
      error.hidden = false;
    } finally {
      start.disabled = false;
    }
  });
  video.addEventListener('play', () => {
    start.hidden = true;
    siteVideos.forEach(other => { if (other !== video) other.pause(); });
  });
  video.addEventListener('error', () => { error.hidden = false; });
});

const founderDetails = document.querySelector('.founder-personal');
founderDetails?.addEventListener('toggle', () => { if (!founderDetails.open) founderDetails.querySelector('video')?.pause(); });
