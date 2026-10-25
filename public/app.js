'use strict';
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function setMenu(open){menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Chiudi il menu':'Apri il menu');nav.classList.toggle('is-open',open);}
menuButton.addEventListener('click',()=>setMenu(menuButton.getAttribute('aria-expanded')!=='true'));
nav.addEventListener('click',event=>{if(event.target.closest('a'))setMenu(false);});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){setMenu(false);menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.header-inner'))setMenu(false);});
window.matchMedia('(min-width:1181px)').addEventListener('change',event=>{if(event.matches)setMenu(false);});

const steps=[{"key": "ricerca", "kicker": "01 / Ricerca e strategia", "heading": "Selezioniamo le aziende\na cui ha senso parlare.", "copy": "Definiamo clienti e mercati. Selezioniamo aziende e decisori in linea con la tua offerta.", "output": "Lista aziende e decisori, con priorità.", "nodes": ["", "", ""], "caption": "Ogni fase ha un prossimo passo chiaro."}, {"key": "contatto", "kicker": "02 / Contatto e conversazione", "heading": "Apriamo conversazioni\ncon le persone giuste.", "copy": "Contattiamo le persone giuste e gestiamo le risposte sui canali concordati.", "output": "Conversazioni aperte, con il loro contesto.", "nodes": ["", "", ""], "caption": "Ogni fase ha un prossimo passo chiaro."}, {"key": "qualifica", "kicker": "03 / Ascolto e qualifica", "heading": "Capiamo se c’è\nun’opportunità concreta.", "copy": "Verifichiamo interesse, esigenze e interlocutori. Prepariamo il prossimo confronto.", "output": "Opportunità qualificate e prossime azioni.", "nodes": ["", "", ""], "caption": "Ogni fase ha un prossimo passo chiaro."}, {"key": "trattativa", "kicker": "04 / Proposta e follow-up", "heading": "Prepariamo la proposta.\nSeguiamo il confronto.", "copy": "Prepariamo la proposta con te. Seguiamo domande, trattativa e follow-up.", "output": "Proposte seguite e risposte condivise.", "nodes": ["", "", ""], "caption": "Ogni fase ha un prossimo passo chiaro."}, {"key": "chiusura", "kicker": "05 / Decisione e accordo", "heading": "Accompagniamo\nla decisione commerciale.", "copy": "Coordiniamo i passaggi verso l’accordo. Prezzi e condizioni finali restano alla tua azienda.", "output": "Decisione e prossimi passi condivisi.", "nodes": ["", "", ""], "caption": "Ogni fase ha un prossimo passo chiaro."}];
const tabs=[...document.querySelectorAll('[role="tab"]')];
function selectStep(index,focus=false){
 const step=steps[index];
 document.querySelectorAll('[data-method-scene]').forEach((scene,i)=>{scene.hidden=i!==index;});
 tabs.forEach((t,i)=>{t.setAttribute('aria-selected',String(i===index));t.tabIndex=i===index?0:-1;});
 document.querySelector('#method-kicker').textContent=step.kicker;
 const heading=document.querySelector('#method-heading');heading.replaceChildren();
 step.heading.split('\n').forEach((part,i)=>{if(i)heading.append(document.createElement('br'));heading.append(document.createTextNode(part));});
 document.querySelector('#method-copy').textContent=step.copy;
 document.querySelector('#method-output').textContent=step.output;
 ['#node-one','#node-two','#node-three'].forEach((id,i)=>{document.querySelector(id).textContent=step.nodes[i];});
 document.querySelector('#graphic-caption').textContent=step.caption;
 document.querySelector('#graphic-index').textContent=String(index+1).padStart(2,'0')+' / 05';
 document.querySelector('#method-panel').setAttribute('aria-labelledby','tab-'+step.key);
 if(focus)tabs[index].focus();
}
tabs.forEach((tab,index)=>{
 tab.addEventListener('click',()=>selectStep(index));
 tab.addEventListener('keydown',event=>{
  let next=index;
  if(event.key==='ArrowRight')next=(index+1)%tabs.length;
  else if(event.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;
  else if(event.key==='Home')next=0;
  else if(event.key==='End')next=tabs.length-1;
  else return;
  event.preventDefault();selectStep(next,true);
 });
});

const dialogs=[...document.querySelectorAll('dialog')];
const videos=[...document.querySelectorAll('video[data-video-name]')];
const videoDialogIds={isolcore:'video-dialog',intro:'intro-dialog',founder:'founder-dialog'};
function openDialog(dialog){
 dialogs.forEach(other=>{if(other.open&&other!==dialog)other.close();});
 const video=dialog.querySelector('video');const source=video.querySelector('source');
 if(!source.getAttribute('src')){source.src=source.dataset.src;video.poster=video.dataset.poster;video.load();}
 dialog.showModal();document.body.classList.add('dialog-open');video.play().catch(()=>{});
}
function closeDialog(dialog){dialog.close();}
document.querySelectorAll('.video-trigger').forEach(button=>button.addEventListener('click',()=>{
 const dialog=document.getElementById(videoDialogIds[button.dataset.video]);
 if(dialog)openDialog(dialog);
}));
dialogs.forEach(dialog=>{
 dialog.querySelector('.dialog-close').addEventListener('click',()=>closeDialog(dialog));
 dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog(dialog);});
 dialog.addEventListener('close',()=>{dialog.querySelector('video')?.pause();document.body.classList.toggle('dialog-open',dialogs.some(other=>other.open));});
});
document.querySelectorAll('[data-contact-from-video]').forEach(link=>link.addEventListener('click',()=>link.closest('dialog').close()));
videos.forEach(video=>video.addEventListener('play',()=>videos.forEach(other=>{if(other!==video)other.pause();})));

// WhatsApp links open a draft; the visitor chooses whether to send it.
const whatsappMessage='Ciao, vorrei capire come Storm X può aiutare la mia azienda a trovare nuovi clienti.';
const whatsappNumber=String(window.STORMX_CONTACT?.whatsappNumber||'').replace(/\D/g,'');
const whatsappLinks=[...document.querySelectorAll('.whatsapp-link')];
whatsappLinks.forEach(link=>{
 if(whatsappNumber)link.href='https://wa.me/'+whatsappNumber+'?text='+encodeURIComponent(whatsappMessage);
 else {link.removeAttribute('target');link.addEventListener('click',event=>{event.preventDefault();document.querySelector('#parliamone').scrollIntoView({behavior:'smooth'});});}
});

const localPreview=window.STORMX_CONTACT?.mode==='local-preview';
// Production statistics use the same opt-in and API contract as the existing site.
function track(name,details={}){
 const payload={name,...details,path:location.pathname};
 window.dispatchEvent(new CustomEvent('stormx:conversion',{detail:payload}));
 if(localPreview){fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),keepalive:true}).catch(()=>{});return;}
 const map={
  'contact:header':['cta_click','nav-call'],'contact:hero':['cta_click','home-call'],
  'contact:method':['cta_click','page-call'],'contact:video':['cta_click','page-call'],'contact:founder':['cta_click','founder-call'],'contact:need':['cta_click','page-form'],
  'case:hero':['case_open','reliance-medical'],'form_start':['form_start','contact'],
  'form_error':['form_error','contact'],'form_received':['form_success','contact']
 };
 const entry=name==='whatsapp_click'?['cta_click','whatsapp-'+details.placement]:map[name];
 if(entry)window.stormxTrack?.(...entry);
}
document.querySelectorAll('[data-track]').forEach(link=>link.addEventListener('click',()=>track(link.dataset.track)));
whatsappLinks.forEach(link=>link.addEventListener('click',()=>{if(whatsappNumber)track('whatsapp_click',{placement:link.dataset.placement});}));

const contactForm=document.querySelector('#contact-form');
const successPanel=document.querySelector('#contact-success');
const captcha=document.querySelector('.captcha-widget');
const captchaAnswer=contactForm.elements.captcha_answer;
const captchaStatus=document.querySelector('#captcha-status');
let captchaTask=null;
async function refreshCaptcha(){
 if(localPreview)return;
 if(captchaTask)return captchaTask;
 captcha.hidden=false;
 captchaTask=(async()=>{
  const button=captcha.querySelector('.captcha-refresh');
  const image=captcha.querySelector('.captcha-image');
  const audio=captcha.querySelector('audio');
  button.disabled=true;contactForm.elements.captcha_token.value='';captchaAnswer.value='';
  image.hidden=true;audio.hidden=true;audio.pause();captchaStatus.textContent='Caricamento del codice…';
  try{
   const response=await fetch('/api/captcha?purpose=contact',{credentials:'same-origin'});
   const data=await response.json();
   if(!response.ok||!data.ok||!data.token||!data.image||!data.audio)throw new Error();
   // Challenge media must remain on the same origin.
   const imageURL=new URL(data.image,location.origin),audioURL=new URL(data.audio,location.origin);
   if(imageURL.origin!==location.origin||audioURL.origin!==location.origin)throw new Error();
   contactForm.elements.captcha_token.value=data.token;image.src=imageURL.href;image.hidden=false;audio.src=audioURL.href;
   captchaStatus.textContent='Codice pronto. Scade dopo 5 minuti.';
  }catch{captchaStatus.textContent='Codice non disponibile. Premi “Cambia codice” oppure scrivici su WhatsApp.';}
  finally{button.disabled=false;}
 })();
 try{await captchaTask;}finally{captchaTask=null;}
}
if(!localPreview){
 captcha.hidden=false;captchaAnswer.required=true;
 contactForm.addEventListener('focusin',()=>{if(!contactForm.elements.captcha_token.value)refreshCaptcha();});
 captcha.querySelector('.captcha-refresh').addEventListener('click',refreshCaptcha);
 captcha.querySelector('.captcha-listen').addEventListener('click',async()=>{
  if(captchaTask)await captchaTask;
  if(!contactForm.elements.captcha_token.value)await refreshCaptcha();
  const audio=captcha.querySelector('audio');
  if(!audio.getAttribute('src'))return;
  audio.hidden=false;
  try{await audio.play();}catch{captchaStatus.textContent='Usa il lettore audio per ascoltare il codice.';}
 });
 document.querySelector('.preview-note').hidden=true;
 document.querySelector('#contact-success>.micro').textContent='Richiesta registrata';
 document.querySelector('#contact-success>p:not(.micro)').textContent='Grazie, la tua richiesta è stata registrata correttamente.';
 document.querySelector('.success-next').textContent='Marcello leggerà il tuo messaggio e ti ricontatterà per conoscerti e concordare il primo confronto.';
}
let formStarted=false,submissionId=crypto.randomUUID(),attemptSignature='';
contactForm.elements.submission_id.value=submissionId;
contactForm.addEventListener('input',()=>{if(!formStarted){formStarted=true;track('form_start');}});
document.querySelectorAll('[data-goal]').forEach(link=>link.addEventListener('click',()=>{
 if(!contactForm.elements.message.value.trim())contactForm.elements.message.value=link.dataset.goal;
}));
contactForm.addEventListener('submit',async event=>{
 event.preventDefault();
 if(contactForm.dataset.pending==='true'||!contactForm.reportValidity()||contactForm.elements._gotcha.value)return;
 const data=new FormData(contactForm);
 for(const key of ['name','email','company','message'])data.set(key,String(data.get(key)||'').trim());
 if(!data.get('name')||!data.get('company')){
  const field=contactForm.elements[!data.get('name')?'name':'company'];
  field.setCustomValidity('Compila questo campo.');field.setAttribute('aria-invalid','true');field.focus();field.reportValidity();return;
 }
 if(!data.get('message'))data.set('message','Richiesta di primo confronto gratuito dal modulo homepage. Il visitatore non ha aggiunto un messaggio.');
 const signature=JSON.stringify(['name','email','company','message'].map(key=>data.get(key)));
 if(attemptSignature&&attemptSignature!==signature)submissionId=crypto.randomUUID();
 attemptSignature=signature;data.set('submission_id',submissionId);
 const button=contactForm.querySelector('[type="submit"]');
 const label=button.querySelector('.submit-label');
 const error=document.querySelector('#form-error');
 contactForm.dataset.pending='true';contactForm.setAttribute('aria-busy','true');button.disabled=true;label.textContent='Invio in corso…';error.hidden=true;
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch(contactForm.action,{method:'POST',body:data,headers:{Accept:'application/json'},signal:controller.signal,credentials:'same-origin'});
  const result=await response.json();
  if(!response.ok||!result.ok||!result.id||(localPreview&&result.mode!=='local-preview')){
   if(result.captcha){await refreshCaptcha();const problem=new Error('captcha');throw problem;}
   throw new Error('submission');
  }
  const reference=document.querySelector('#request-reference');reference.textContent='Riferimento: '+String(result.id).slice(0,8).toUpperCase();reference.hidden=false;
  contactForm.hidden=true;successPanel.hidden=false;successPanel.focus({preventScroll:true});
  successPanel.scrollIntoView({behavior:'smooth',block:'center'});
  track(localPreview?'preview_form_received':'form_received');
 }catch(problem){
  const text=error.querySelector('.error-text');
  text.textContent=problem.message==='captcha'?'Il codice è scaduto o non è corretto. Inserisci il nuovo codice, oppure ':'Non è stato possibile completare la richiesta. I tuoi dati sono ancora nel modulo. Riprova oppure ';
  error.hidden=false;
  if(problem.message==='captcha')captchaAnswer.focus();else error.focus({preventScroll:true});
  track('form_error');
 }finally{clearTimeout(timeout);button.disabled=false;contactForm.dataset.pending='false';contactForm.removeAttribute('aria-busy');label.textContent='Richiedi un primo confronto';}
});
document.querySelector('#form-reset').addEventListener('click',()=>{
 successPanel.hidden=true;contactForm.hidden=false;contactForm.reset();formStarted=false;submissionId=crypto.randomUUID();attemptSignature='';contactForm.elements.submission_id.value=submissionId;
 if(!localPreview)refreshCaptcha();contactForm.querySelector('input:not([type=hidden]):not([name=_gotcha])').focus();
});
const floating=document.querySelector('.whatsapp-floating');
let heroVisible=true,contactVisible=false;
const visibleVideoPreviews=new Set();
function updateFloating(){floating.classList.toggle('is-visible',!heroVisible&&!contactVisible&&!visibleVideoPreviews.size&&menuButton.getAttribute('aria-expanded')!=='true');}
if('IntersectionObserver' in window){
 const previewObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)visibleVideoPreviews.add(entry.target);else visibleVideoPreviews.delete(entry.target);});updateFloating();},{threshold:0});
 document.querySelectorAll('.founder-film,.client-voice,.method-film').forEach(node=>previewObserver.observe(node));
 new IntersectionObserver(entries=>{heroVisible=entries[0].isIntersecting;updateFloating();},{threshold:0}).observe(document.querySelector('.hero-actions'));
 new IntersectionObserver(entries=>{contactVisible=entries[0].isIntersecting;updateFloating();},{threshold:0}).observe(document.querySelector('#parliamone'));
}else floating.classList.add('is-visible');
new MutationObserver(updateFloating).observe(menuButton,{attributes:true,attributeFilter:['aria-expanded']});

// Preserve links from existing pages and search results.
const legacyAnchors={'#contatti':'#parliamone','#core':'#metodo','#protocollo':'#metodo','#workflow':'#metodo','#conversazioni':'#metodo','#about':'#team'};
if(legacyAnchors[location.hash]){const target=legacyAnchors[location.hash];history.replaceState(null,'',location.pathname+location.search+target);document.querySelector(target)?.scrollIntoView();}

(()=>{const aliases={"#contact": "#parliamone", "#sectors": "#settori", "#results": "#risultati", "#services": "#servizi", "#method": "#metodo", "#collaboration": "#collaborazione", "#founder": "#fondatore"};const id=aliases[location.hash];if(id){history.replaceState(null,'',location.pathname+location.search+id);document.querySelector(id)?.scrollIntoView();}})();
