'use strict';
(() => {
 if(window.STORMX_CONTACT?.mode==='local-preview')return;
 const english=document.documentElement.lang==='en';
 const key='stormx.statistics.v2',maxAge=183*24*60*60*1000;
 let preference=null,pageCounted=false,analyticsStarted=false;
 const measurementId='G-G08FSM9CRG';
 const analyticsHost=location.hostname==='www.stormxdigital.com';
 const disableAnalytics='ga-disable-'+measurementId;
 const advertisingDenied={ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'};
 function analyticsEvent(name){
  if(!analyticsStarted||preference!=='yes')return;
  const page=new URL(location.pathname,location.origin);
  const query=new URLSearchParams(location.search);
  for(const field of ['utm_source','utm_medium','utm_campaign']){
   const value=query.get(field);
   if(validCampaignValue(field,value))page.searchParams.set(field,value);
  }
  let referrer='';
  try{referrer=new URL(document.referrer).origin;}catch{}
  window.gtag('event',name,{send_to:measurementId,page_location:page.href,page_referrer:referrer});
 }
 function setAnalyticsPreference(){
  if(!analyticsHost)return;
  window[disableAnalytics]=preference!=='yes';
  if(preference!=='yes'){
   if(analyticsStarted)window.gtag('consent','update',{...advertisingDenied,analytics_storage:'denied'});
   for(const cookie of ['_ga','_ga_'+measurementId.slice(2)]){
    for(const domain of ['', '; Domain=stormxdigital.com']){
     document.cookie=cookie+'=; Max-Age=0; Path=/; Secure; SameSite=Lax'+domain;
    }
   }
   return;
  }
  if(analyticsStarted){
   window.gtag('consent','update',{...advertisingDenied,analytics_storage:'granted'});
   return;
  }
  analyticsStarted=true;
  window.dataLayer=window.dataLayer||[];
  window.gtag=function(){window.dataLayer.push(arguments);};
  window.gtag('consent','default',{...advertisingDenied,analytics_storage:'denied'});
  window.gtag('consent','update',{...advertisingDenied,analytics_storage:'granted'});
  window.gtag('js',new Date());
  window.gtag('config',measurementId,{send_page_view:false,cookie_expires:15552000,allow_google_signals:false,allow_ad_personalization_signals:false});
  const tag=document.createElement('script');
  tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+measurementId;
  document.head.append(tag);
  analyticsEvent('page_view');
 }
 try{const saved=JSON.parse(localStorage.getItem(key));if(saved&&['yes','no'].includes(saved.choice)&&Date.now()>=saved.at&&Date.now()-saved.at<maxAge)preference=saved.choice;}catch{}
 window.stormxTrack=(event,target='')=>{
  if(preference!=='yes'||!["/casi-studio/reliance-medical", "/casi-studio/isolcore", "/casi-studio/profood", "/casi-studio/brands-cosmos", "/casi-studio", "/collaborazione", "/services/agenti-vocali-ai", "/services/automatizzazioni-ai", "/services/make-automazioni", "/services/claude-code", "/privacy", "/cookies", "/terms", "/prenota", "/blog/lead-scoring-b2b", "/blog/whatsapp-business-b2b", "/blog/appointment-setting-b2b", "/blog/automatizzare-assistenza-clienti-ai", "/blog/integrare-crm-fatturazione-automatica", "/blog/linkedin-outreach-b2b", "/blog/trovare-clienti-esteri-b2b", "/blog/software-su-misura-pmi", "/blog/segreteria-telefonica-ai-studi-professionali", "/blog/agente-vocale-ai-qualificare-lead", "/blog/ai-processi-vendita-b2b", "/blog/centralino-ai-per-aziende", "/blog/cold-email-b2b", "/blog/tanti-contatti-pochi-appuntamenti", "/blog/case-holistic-unity", "/blog/caso-studio-abeec", "/blog/caso-studio-reebok", "/blog/caso-studio-profood", "/blog/lead-generation-cos-e", "/blog/agenzia-lead-generation-b2b", "/blog/outbound-vs-inbound-marketing", "/blog/come-automatizzare-business-con-ai", "/blog/agenti-vocali-ai-per-aziende", "/blog/make-com-vs-zapier-confronto", "/en/blog/what-is-lead-generation", "/en/blog/b2b-lead-generation-agency", "/en/blog/outbound-vs-inbound-marketing", "/blog", "/en/blog", "/services/outbound-sales", "/services/lead-generation-b2b", "/en", "/casi-studio/reliance-medical-amazon", "/casi-studio/safe-industrial-amazon", "/casi-studio/powerplay-brands-marketplace", "/amazon", "/casi-studio/rms-international-amazon", "/en/case-studies", "/en/how-we-work", "/en/amazon", "/en/privacy", "/en/cookies", "/en/terms", "/en/book-a-call", "/en/services/ai-voice-agents", "/en/services/ai-automation", "/en/services/make-automation", "/en/services/custom-software", "/en/services/outbound-sales", "/en/services/b2b-lead-generation", "/en/blog/b2b-lead-scoring", "/en/blog/whatsapp-business-b2b", "/en/blog/b2b-appointment-setting", "/en/blog/ai-customer-service-automation", "/en/blog/crm-and-automated-invoicing", "/en/blog/linkedin-outreach-b2b", "/en/blog/find-international-b2b-customers", "/en/blog/custom-software-for-smes", "/en/blog/ai-receptionist-for-professional-practices", "/en/blog/ai-voice-agents-for-lead-qualification", "/en/blog/ai-in-b2b-sales-processes", "/en/blog/ai-phone-systems-for-businesses", "/en/blog/b2b-cold-email", "/en/blog/turn-b2b-leads-into-meetings", "/en/blog/holistic-unity-case-study", "/en/blog/abeec-case-study", "/en/blog/powerplay-brands-case-study", "/en/blog/profood-case-study", "/en/blog/automate-your-business-with-ai", "/en/blog/ai-voice-agents-for-businesses", "/en/blog/make-vs-zapier", "/en/case-studies/reliance-medical", "/en/case-studies/isolcore", "/en/case-studies/profood", "/en/case-studies/brands-cosmos", "/en/case-studies/reliance-medical-amazon", "/en/case-studies/safe-industrial-amazon", "/en/case-studies/powerplay-brands-marketplace", "/en/case-studies/rms-international-amazon", "/amazon/espansione-europa", "/en/amazon/european-expansion", "/services/sviluppo-commerciale-internazionale", "/en/services/international-sales-development", "/blog/audit-listing-amazon-kit-pronto-soccorso", "/en/blog/amazon-listing-audit-first-aid-kits", "/blog/amazon-visite-poche-vendite", "/en/blog/amazon-traffic-low-sales", "/blog/appuntamenti-b2b-reparto-commerciale-esterno", "/en/blog/b2b-appointments-outsourced-sales-team", "/blog/checklist-amazon-europa", "/en/blog/amazon-europe-launch-checklist", "/blog/trovare-distributori-medicali-estero", "/en/blog/find-medical-distributors-abroad", "/"].includes(location.pathname))return;
  if(['form_start','form_error'].includes(event))return;
  if(event==='form_success')analyticsEvent('generate_lead');
  if(event==='cta_click'&&(target.startsWith('whatsapp-')||target==='founder-call'))target='page-call';
  fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consent:true,page:location.pathname,event,target}),keepalive:true,credentials:'same-origin'}).catch(()=>{});
 };
 function sourceCategory(referrer){
  let host;try{host=new URL(referrer).hostname.toLowerCase();}catch{return 'unknown';}
  const match=domain=>host===domain||host.endsWith('.'+domain);
  if(match(location.hostname)||match('stormxdigital.com')||match('stormx-digital-home.marcello981.chatgpt.site')||match('stormx-digital-home.genialtrout3.chatgpt.site'))return 'internal';
  if(match('chatgpt.com')||match('chat.openai.com'))return 'chatgpt';
  if(match('claude.ai'))return 'claude';
  if(match('gemini.google.com'))return 'gemini';
  if(match('bing.com'))return 'bing';
  if(/(^|\.)google\.(com|it|co\.uk|de|fr|es|ca|com\.au)$/.test(host))return 'google';
  return 'other';
 }
 const attributionKey='stormx.landing.v1';
 function validCampaignValue(field,value){
  return Boolean(value&&(/^[a-z0-9][a-z0-9_-]{0,79}$/i.test(value)||(field==='utm_source'&&value==='chatgpt.com')));
 }
 function entrySource(){
  const source=sourceCategory(document.referrer);
  const chatgptLink=new URLSearchParams(location.search).get('utm_source')==='chatgpt.com';
  return chatgptLink&&(source==='unknown'||source==='other')?'chatgpt':source;
 }
 const campaignFields=['utm_source','utm_medium','utm_campaign'];
 function rememberLanding(){
  try{
   if(preference!=='yes'){sessionStorage.removeItem(attributionKey);return;}
   if(sessionStorage.getItem(attributionKey))return;
   const referrer=entrySource();
   if(referrer==='internal')return;
   const query=new URLSearchParams(location.search);
   const landing={landing_path:location.pathname,referral_channel:referrer};
   for(const field of campaignFields){
    const value=query.get(field);
    if(validCampaignValue(field,value))landing[field]=value;
   }
   if(query.has('gclid')||query.has('msclkid')||/^(cpc|ppc|paid|paidsearch|paidsocial)$/i.test(landing.utm_medium||''))landing.referral_channel='paid';
   sessionStorage.setItem(attributionKey,JSON.stringify(landing));
  }catch{}
 }
 document.addEventListener('formdata',({target,formData})=>{
   if(preference!=='yes'||target.getAttribute('action')!=='/api/contact')return;
   try{
    const landing=JSON.parse(sessionStorage.getItem(attributionKey));
    if(landing)for(const field of ['landing_path','referral_channel',...campaignFields]){
     if(landing[field])formData.set(field,landing[field]);
    }
   }catch{}
 },true);
 function countPage(){rememberLanding();
  if(preference!=='yes'||pageCounted)return;
  pageCounted=true;window.stormxTrack('page_view');
  const source=entrySource();
  if(source!=='internal')window.stormxTrack('referral',source);
 }
 const panel=document.createElement('section');panel.className='consent-panel';panel.setAttribute('aria-label',english?'Statistics preferences':'Preferenze statistiche');panel.hidden=Boolean(preference);
 panel.innerHTML=english?'<h2>May we measure what works?</h2><p>With your consent, we count page views, clicks and video plays, and use Google Analytics on www.stormxdigital.com. If you send a request, we also save the first page, channel and campaign tags available in this tab. The form and WhatsApp work with necessary resources only. <a href="/en/cookies">How statistics work</a>.</p><div class="consent-actions"><button type="button" data-choice="no">Necessary only</button><button type="button" data-choice="yes">Accept statistics</button></div>':'<h2>Possiamo misurare cosa funziona?</h2><p>Con il tuo consenso contiamo pagine, clic e riproduzioni video e usiamo Google Analytics su www.stormxdigital.com. Se invii una richiesta, salviamo anche la prima pagina, il canale e i tag della campagna disponibili in questa scheda. Modulo e WhatsApp funzionano anche scegliendo solo le risorse necessarie. <a href="https://www.stormxdigital.com/cookies">Come funzionano le statistiche</a>.</p><div class="consent-actions"><button type="button" data-choice="no">Solo necessarie</button><button type="button" data-choice="yes">Accetta statistiche</button></div>';
 document.body.append(panel);
 const preferenceButton=document.querySelector('[data-open-consent]');preferenceButton.hidden=false;
 preferenceButton.addEventListener('click',()=>{panel.hidden=false;panel.querySelector('button').focus();});
 panel.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
  preference=button.dataset.choice;
  try{localStorage.setItem(key,JSON.stringify({choice:preference,at:Date.now()}));}catch{}
  panel.hidden=true;setAnalyticsPreference();countPage();
 }));
 setAnalyticsPreference();countPage();
 document.querySelectorAll('video[data-video-name]').forEach(video=>{
  const milestones=new Set(),name=video.dataset.videoName;
  video.addEventListener('play',()=>{if(preference==='yes'&&!milestones.has('start')){milestones.add('start');window.stormxTrack('video_start',name);}});
  video.addEventListener('timeupdate',()=>{if(preference!=='yes'||!video.duration||video.seeking||!milestones.has('start'))return;for(const at of [25,50,75])if(video.currentTime/video.duration*100>=at&&!milestones.has(at)){milestones.add(at);window.stormxTrack('video_'+at,name);}});
  video.addEventListener('ended',()=>{if(preference==='yes'&&!milestones.has('end')){milestones.add('end');window.stormxTrack('video_complete',name);}});
 });
})();
