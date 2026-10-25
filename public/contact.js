'use strict';
const english=document.documentElement.lang==='en';
const submitLabel=document.querySelector('.submit-label').textContent;
// WhatsApp links open a draft; the visitor chooses whether to send it.
const amazon=document.body.dataset.channel==='amazon';
const whatsappMessage=english?(amazon?'Hello, I would like to discuss support for our Amazon account.':'Hello, I would like to discuss how Storm X could help our business find new customers.'):(amazon?'Ciao, vorrei capire come Storm X può aiutarci con il nostro account Amazon.':'Ciao, vorrei capire come Storm X può aiutare la mia azienda a trovare nuovi clienti.');
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
  image.hidden=true;audio.hidden=true;audio.pause();captchaStatus.textContent=english?'Loading the code…':'Caricamento del codice…';
  try{
   const response=await fetch('/api/captcha?purpose=contact'+(english?'&lang=en':''),{credentials:'same-origin'});
   const data=await response.json();
   if(!response.ok||!data.ok||!data.token||!data.image||!data.audio)throw new Error();
   // Challenge media must remain on the same origin.
   const imageURL=new URL(data.image,location.origin),audioURL=new URL(data.audio,location.origin);
   if(imageURL.origin!==location.origin||audioURL.origin!==location.origin)throw new Error();
   contactForm.elements.captcha_token.value=data.token;image.src=imageURL.href;image.hidden=false;audio.src=audioURL.href;
   captchaStatus.textContent=english?'Code ready. Expires in 5 minutes.':'Codice pronto. Scade dopo 5 minuti.';
  }catch{captchaStatus.textContent=english?'Code unavailable. Select “Change code” or message us on WhatsApp.':'Codice non disponibile. Premi “Cambia codice” oppure scrivici su WhatsApp.';}
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
  try{await audio.play();}catch{captchaStatus.textContent=english?'Use the audio player to listen to the code.':'Usa il lettore audio per ascoltare il codice.';}
 });
 document.querySelector('.preview-note').hidden=true;
 document.querySelector('#contact-success>.micro').textContent=english?'Request received':'Richiesta registrata';
 document.querySelector('#contact-success>p:not(.micro)').textContent=english?'Thank you. Your request has been received.':'Grazie, la tua richiesta è stata registrata correttamente.';
 document.querySelector('.success-next').textContent=english?'Marcello will read your message and contact you to arrange a first conversation.':'Marcello leggerà il tuo messaggio e ti ricontatterà per conoscerti e concordare il primo confronto.';
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
 if(!data.get('name')||!data.get('company')){contactForm.querySelector('input').focus();return;}
 if(!data.get('message'))data.set('message',english?'Request for a first conversation. The visitor did not add a message.':'Richiesta di primo confronto gratuito. Il visitatore non ha aggiunto un messaggio.');
 const signature=JSON.stringify(['name','email','company','message'].map(key=>data.get(key)));
 if(attemptSignature&&attemptSignature!==signature)submissionId=crypto.randomUUID();
 attemptSignature=signature;data.set('submission_id',submissionId);
 const button=contactForm.querySelector('[type="submit"]');
 const label=button.querySelector('.submit-label');
 const error=document.querySelector('#form-error');
 contactForm.dataset.pending='true';contactForm.setAttribute('aria-busy','true');button.disabled=true;label.textContent=english?'Sending…':'Invio in corso…';error.hidden=true;
 const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
 try{
  const response=await fetch(contactForm.action,{method:'POST',body:data,headers:{Accept:'application/json','X-StormX-Language':english?'en':'it'},signal:controller.signal,credentials:'same-origin'});
  const result=await response.json();
  if(!response.ok||!result.ok||!result.id||(localPreview&&result.mode!=='local-preview')){
   if(result.captcha){await refreshCaptcha();const problem=new Error('captcha');throw problem;}
   throw new Error('submission');
  }
  const reference=document.querySelector('#request-reference');reference.textContent=(english?'Reference: ':'Riferimento: ')+String(result.id).slice(0,8).toUpperCase();reference.hidden=false;
  contactForm.hidden=true;successPanel.hidden=false;successPanel.focus({preventScroll:true});
  successPanel.scrollIntoView({behavior:'smooth',block:'center'});
  track(localPreview?'preview_form_received':'form_received');
 }catch(problem){
  const text=error.querySelector('.error-text');
  text.textContent=problem.message==='captcha'?'Il codice è scaduto o non è corretto. Inserisci il nuovo codice, oppure ':'Non è stato possibile completare la richiesta. I tuoi dati sono ancora nel modulo. Riprova oppure ';
  if(english)text.textContent=problem.message==='captcha'?'The code has expired or is incorrect. Enter the new code, or ':'Your request could not be completed. Your details are still in the form. Try again or ';
  error.hidden=false;
  if(problem.message==='captcha')captchaAnswer.focus();else error.focus({preventScroll:true});
  track('form_error');
 }finally{clearTimeout(timeout);button.disabled=false;contactForm.dataset.pending='false';contactForm.removeAttribute('aria-busy');label.textContent=submitLabel;}
});
document.querySelector('#form-reset').addEventListener('click',()=>{
 successPanel.hidden=true;contactForm.hidden=false;contactForm.reset();formStarted=false;submissionId=crypto.randomUUID();attemptSignature='';contactForm.elements.submission_id.value=submissionId;
 if(!localPreview)refreshCaptcha();contactForm.querySelector('input:not([type=hidden]):not([name=_gotcha])').focus();
});
