'use strict';
(() => {
 if(window.STORMX_CONTACT?.mode==='local-preview')return;
 const reportingPaths={"/blog/what-is-lead-generation": "/en/blog/what-is-lead-generation", "/blog/b2b-lead-generation-agency": "/en/blog/b2b-lead-generation-agency", "/blog/outbound-vs-inbound-marketing": "/en/blog/outbound-vs-inbound-marketing", "/blog": "/en/blog", "/": "/en", "/case-studies": "/en/case-studies", "/how-we-work": "/en/how-we-work", "/amazon": "/en/amazon", "/privacy": "/en/privacy", "/cookies": "/en/cookies", "/terms": "/en/terms", "/book-a-call": "/en/book-a-call", "/services/ai-voice-agents": "/en/services/ai-voice-agents", "/services/ai-automation": "/en/services/ai-automation", "/services/make-automation": "/en/services/make-automation", "/services/custom-software": "/en/services/custom-software", "/services/outbound-sales": "/en/services/outbound-sales", "/services/b2b-lead-generation": "/en/services/b2b-lead-generation", "/blog/b2b-lead-scoring": "/en/blog/b2b-lead-scoring", "/blog/whatsapp-business-b2b": "/en/blog/whatsapp-business-b2b", "/blog/b2b-appointment-setting": "/en/blog/b2b-appointment-setting", "/blog/ai-customer-service-automation": "/en/blog/ai-customer-service-automation", "/blog/crm-and-automated-invoicing": "/en/blog/crm-and-automated-invoicing", "/blog/linkedin-outreach-b2b": "/en/blog/linkedin-outreach-b2b", "/blog/find-international-b2b-customers": "/en/blog/find-international-b2b-customers", "/blog/custom-software-for-smes": "/en/blog/custom-software-for-smes", "/blog/ai-receptionist-for-professional-practices": "/en/blog/ai-receptionist-for-professional-practices", "/blog/ai-voice-agents-for-lead-qualification": "/en/blog/ai-voice-agents-for-lead-qualification", "/blog/ai-in-b2b-sales-processes": "/en/blog/ai-in-b2b-sales-processes", "/blog/ai-phone-systems-for-businesses": "/en/blog/ai-phone-systems-for-businesses", "/blog/b2b-cold-email": "/en/blog/b2b-cold-email", "/blog/turn-b2b-leads-into-meetings": "/en/blog/turn-b2b-leads-into-meetings", "/blog/holistic-unity-case-study": "/en/blog/holistic-unity-case-study", "/blog/abeec-case-study": "/en/blog/abeec-case-study", "/blog/powerplay-brands-case-study": "/en/blog/powerplay-brands-case-study", "/blog/profood-case-study": "/en/blog/profood-case-study", "/blog/automate-your-business-with-ai": "/en/blog/automate-your-business-with-ai", "/blog/ai-voice-agents-for-businesses": "/en/blog/ai-voice-agents-for-businesses", "/blog/make-vs-zapier": "/en/blog/make-vs-zapier", "/case-studies/reliance-medical": "/en/case-studies/reliance-medical", "/case-studies/isolcore": "/en/case-studies/isolcore", "/case-studies/profood": "/en/case-studies/profood", "/case-studies/brands-cosmos": "/en/case-studies/brands-cosmos", "/case-studies/reliance-medical-amazon": "/en/case-studies/reliance-medical-amazon", "/case-studies/safe-industrial-amazon": "/en/case-studies/safe-industrial-amazon", "/case-studies/powerplay-brands-marketplace": "/en/case-studies/powerplay-brands-marketplace", "/case-studies/rms-international-amazon": "/en/case-studies/rms-international-amazon", "/amazon/european-expansion": "/en/amazon/european-expansion", "/services/international-sales-development": "/en/services/international-sales-development", "/blog/amazon-listing-audit-first-aid-kits": "/en/blog/amazon-listing-audit-first-aid-kits", "/blog/amazon-traffic-low-sales": "/en/blog/amazon-traffic-low-sales", "/blog/b2b-appointments-outsourced-sales-team": "/en/blog/b2b-appointments-outsourced-sales-team"};
 const key='stormx.statistics.v1',maxAge=183*24*60*60*1000;
 let preference=null,pageCounted=false;
 try{const saved=JSON.parse(localStorage.getItem(key));if(saved&&['yes','no'].includes(saved.choice)&&Date.now()>=saved.at&&Date.now()-saved.at<maxAge)preference=saved.choice;}catch{}
 window.stormxTrack=(event,target='')=>{
  if(preference!=='yes'||!reportingPaths[location.pathname])return;
  if(['form_start','form_error'].includes(event))return;
  if(event==='cta_click'&&(target.startsWith('whatsapp-')||target==='founder-call'))target='page-call';
  fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consent:true,page:reportingPaths[location.pathname],event,target}),keepalive:true,credentials:'same-origin'}).catch(()=>{});
 };
 function countPage(){if(preference==='yes'&&!pageCounted){window.stormxTrack('page_view');pageCounted=true;}}
 const panel=document.createElement('section');panel.className='consent-panel';panel.setAttribute('aria-label','Statistics preferences');panel.hidden=Boolean(preference);
 panel.innerHTML='<h2>May we measure what works?</h2><p>With your consent, we count page views, clicks and video plays without building individual profiles. The form and WhatsApp work with necessary resources only. <a href="https://www.stormxdigital.com/cookies">How statistics work</a>.</p><div class="consent-actions"><button type="button" data-choice="no">Necessary only</button><button type="button" data-choice="yes">Accept statistics</button></div>';
 document.body.append(panel);
 const preferenceButton=document.querySelector('[data-open-consent]');preferenceButton.hidden=false;
 preferenceButton.addEventListener('click',()=>{panel.hidden=false;panel.querySelector('button').focus();});
 panel.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
  preference=button.dataset.choice;
  try{localStorage.setItem(key,JSON.stringify({choice:preference,at:Date.now()}));}catch{}
  panel.hidden=true;countPage();
 }));
 countPage();
 document.querySelectorAll('video[data-video-name]').forEach(video=>{
  const milestones=new Set(),name=video.dataset.videoName;
  video.addEventListener('play',()=>{if(preference==='yes'&&!milestones.has('start')){milestones.add('start');window.stormxTrack('video_start',name);}});
  video.addEventListener('timeupdate',()=>{if(preference!=='yes'||!video.duration||video.seeking||!milestones.has('start'))return;for(const at of [25,50,75])if(video.currentTime/video.duration*100>=at&&!milestones.has(at)){milestones.add(at);window.stormxTrack('video_'+at,name);}});
  video.addEventListener('ended',()=>{if(preference==='yes'&&!milestones.has('end')){milestones.add('end');window.stormxTrack('video_complete',name);}});
 });
})();
