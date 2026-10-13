'use strict';
(() => {
  if(document.body.dataset.page !== 'home') {
    const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
    const close=()=>{toggle?.setAttribute('aria-expanded','false');nav?.classList.remove('is-open');};
    toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav?.classList.toggle('is-open',open);});
    nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&toggle?.getAttribute('aria-expanded')==='true'){close();toggle.focus();}});
    document.addEventListener('click',e=>{if(!e.target.closest('.nav-wrap'))close();});
    matchMedia('(min-width:1041px)').addEventListener('change',e=>{if(e.matches)close();});
  }
  // One preference, no visitor ID, and no requests before consent.
  const preferenceKey='stormx.statistics.v1',maxAge=183*24*60*60*1000;
  let preference=null;
  try {const saved=JSON.parse(localStorage.getItem(preferenceKey));if(saved&&['yes','no'].includes(saved.choice)&&Date.now()-saved.at<maxAge&&Date.now()>=saved.at)preference=saved.choice;} catch {}
  let pageCounted=false;
  window.stormxTrack=(event,target='')=>{
    if(preference!=='yes'||location.hostname==='localhost'||location.hostname==='127.0.0.1')return;
    fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({consent:true,page:location.pathname,event,target}),keepalive:true,credentials:'same-origin'}).catch(()=>{});
  };
  function countPage(){if(preference==='yes'&&!pageCounted){window.stormxTrack('page_view');pageCounted=true;}}
  const panel=document.createElement('section');panel.className='consent-panel';panel.hidden=true;panel.setAttribute('aria-label',"Statistics preferences");
  panel.innerHTML="<h2>Can we measure what works?</h2><p>With your consent we count pages, clicks and video reproductions, without creating individual profiles. The site and module also work by choosing only the necessary resources. <a href=\"/en/cookies\">How statistics work</a>.</p><div class=\"consent-actions\"><button type=\"button\" data-choice=\"no\">Only necessary</button><button type=\"button\" data-choice=\"yes\">Accepts statistics</button></div>";
  if(document.documentElement.lang==='en')panel.innerHTML="<h2>May we measure what works?</h2><p>With your consent we count pages, clicks and video views, without building individual profiles. The site and contact form work with necessary resources only. <a href=\"/en/cookies\">Read about statistics</a>.</p><div class=\"consent-actions\"><button type=\"button\" data-choice=\"no\">Necessary only</button><button type=\"button\" data-choice=\"yes\">Accept statistics</button></div>";
  document.body.append(panel);
  let preferenceOpener=null;
  panel.querySelectorAll('[data-choice]').forEach(button=>button.addEventListener('click',()=>{
    preference=button.dataset.choice;try{localStorage.setItem(preferenceKey,JSON.stringify({choice:preference,at:Date.now()}));}catch{}
    panel.hidden=true;preferenceOpener?.focus();preferenceOpener=null;countPage();
  }));
  document.querySelectorAll('[data-open-consent]').forEach(button=>button.addEventListener('click',()=>{preferenceOpener=button;panel.hidden=false;panel.querySelector('button').focus();}));
  if(!preference)panel.hidden=false;
  countPage();
  document.addEventListener('click',e=>{const a=e.target.closest('[data-track]');if(a){const [event,target]=a.dataset.track.split(':');window.stormxTrack(event==='case'?'case_open':'cta_click',target);}});
  const progress=new WeakMap();
  document.querySelectorAll('video').forEach(video=>{
    const source=video.querySelector('source')?.getAttribute('src')||video.getAttribute('src')||'';
    const name=source.includes('isolcore')?'isolcore':source.includes('intro')?'intro':'founder';
    video.addEventListener('play',()=>{document.querySelectorAll('video').forEach(other=>{if(other!==video)other.pause();});if(preference==='yes'&&!progress.has(video)){progress.set(video,new Set());window.stormxTrack('video_start',name);}});
    video.addEventListener('timeupdate',()=>{if(preference!=='yes'||!video.duration||video.seeking)return;const seen=progress.get(video);if(!seen)return;for(const milestone of [25,50,75]){if(video.currentTime/video.duration*100>=milestone&&!seen.has(milestone)){seen.add(milestone);window.stormxTrack('video_'+milestone,name);}}});
    video.addEventListener('ended',()=>{const seen=progress.get(video);if(preference==='yes'&&seen&&!seen.has(100)){seen.add(100);window.stormxTrack('video_complete',name);}});
  });
  // Preserve known legacy hash links after the domain migration.
  const aliases={'#programma':"/en/how-we-work",'#prenota':"/en/book-a-call",'#core':"/en#metodo",'#protocollo':"/en#conversazioni",'#workflow':"/en#metodo",'#soluzioni':"/en#servizi",'#about':"/en#team"};
  if(aliases[location.hash])location.replace(aliases[location.hash]);
})();

(() => {
  const widgets=[...document.querySelectorAll('.captcha-widget')];
  const pendingRefresh=new WeakMap();
  async function loadWidget(widget){
    const refreshButton=widget.querySelector('.captcha-refresh'),status=widget.querySelector('.captcha-status'),answer=widget.querySelector('[name=captcha_answer]'),image=widget.querySelector('.captcha-image'),audio=widget.querySelector('.captcha-audio');
    refreshButton.disabled=true;widget.querySelector('[name=captcha_token]').value='';answer.value='';status.textContent="Loading the code…";audio.pause();audio.hidden=true;image.hidden=true;
    try{
      const response=await fetch('/api/captcha?lang=en&purpose='+widget.dataset.captchaPurpose,{credentials:'same-origin'}),data=await response.json();
      if(!response.ok||!data.ok)throw new Error();
      widget.querySelector('[name=captcha_token]').value=data.token;image.src=data.image;image.hidden=false;audio.src=data.audio;
      status.textContent="Code ready. It expires after 5 minutes. You can request a new one.";
    }catch{status.textContent="Code unavailable. Try again shortly or email us.";}finally{refreshButton.disabled=false;}
  }
  function refresh(formOrWidget){
    const widget=formOrWidget?.matches?.('.captcha-widget')?formOrWidget:formOrWidget?.querySelector?.('.captcha-widget');if(!widget)return Promise.resolve();
    if(pendingRefresh.has(widget))return pendingRefresh.get(widget);
    const task=loadWidget(widget);pendingRefresh.set(widget,task);task.finally(()=>pendingRefresh.delete(widget));return task;
  }
  window.stormxRefreshCaptcha=refresh;
  widgets.forEach(widget=>{
    widget.querySelector('.captcha-refresh').addEventListener('click',()=>refresh(widget));
    widget.querySelector('.captcha-listen').addEventListener('click',async()=>{const audio=widget.querySelector('.captcha-audio');if(pendingRefresh.has(widget))await pendingRefresh.get(widget);else if(!audio.getAttribute('src'))await refresh(widget);audio.hidden=false;try{await audio.play();}catch{widget.querySelector('.captcha-status').textContent="Use the audio player to hear the code.";}});
    if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(x=>x.isIntersecting)){refresh(widget);observer.disconnect();}},{rootMargin:'150px'});observer.observe(widget);}else{refresh(widget);}
  });
  const form=document.querySelector('#booking-form');
  form?.addEventListener('submit',async e=>{
    e.preventDefault();if(!form.reportValidity())return;
    const button=form.querySelector('[type=submit]'),status=form.querySelector('.booking-status');if(button.disabled)return;button.disabled=true;status.hidden=false;status.textContent="Verifying…";
    try{const response=await fetch('/api/booking',{method:'POST',body:new FormData(form),headers:{Accept:'application/json','X-StormX-Language':'en'}}),data=await response.json();if(!response.ok||!data.ok){status.textContent=data.error||"Verification failed. Please try again.";await refresh(form);return;}const target=new URL(data.url);if(target.protocol!=='https:'||target.hostname!=='cal.com')throw new Error();window.stormxTrack?.('cta_click','booking-calendar');status.textContent="Opening the calendar…";location.assign(target.href);}catch{status.textContent="We couldn’t open the calendar. Try again or use the contact form.";}finally{button.disabled=false;}
  });
})();

(() => {
 if(new URLSearchParams(location.search).get('servizio')!=='amazon')return;
 const form=document.querySelector('#contact-form');if(!form)return;
 form.querySelector('[name=source_path]').value="/en/amazon";
 const title=document.querySelector('.contact-copy h2');if(title)title.innerHTML="Let’s discuss your<br><em>Amazon account.</em>";
 const intro=document.querySelector('.contact-copy>p:not(.eyebrow)');if(intro)intro.textContent="Request a free analysis of your product or account. Tell us about the marketplace, a link to the cards and your goal: we will email you to understand how to join you.";
 const message=form.elements.message;message.placeholder="Marketplace / country, Seller or Vendor account, product links and your goal.";
 if(!message.value)message.value="I’d like a review of my Amazon account.\nMarketplace / country: \nSeller or Vendor account: \nProduct links: \nGoal: ";
 form.querySelector('.submit-label').textContent="Request a free account review";
 const caption=form.querySelector('.form-caption');if(caption)caption.textContent="We’ll email you to discuss your account review. Fields marked * are required.";
})();

(() => {
 const tabs=[...document.querySelectorAll('[data-amazon-tab]')];
 if(!tabs.length)return;
 const panels=[...document.querySelectorAll('[data-amazon-panel]')];
 const select=(tab,focus=false)=>{
  for(const item of tabs){const active=item===tab;item.setAttribute('aria-selected',String(active));item.tabIndex=active?0:-1;}
  for(const panel of panels)panel.hidden=panel.dataset.amazonPanel!==tab.dataset.amazonTab;
  if(focus)tab.focus();
 };
 tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>select(tab));
  tab.addEventListener('keydown',event=>{
   let next=index;
   if(['ArrowDown','ArrowRight'].includes(event.key))next=(index+1)%tabs.length;
   else if(['ArrowUp','ArrowLeft'].includes(event.key))next=(index+tabs.length-1)%tabs.length;
   else if(event.key==='Home')next=0;
   else if(event.key==='End')next=tabs.length-1;
   else return;
   event.preventDefault();select(tabs[next],true);
  });
 });
})();

(() => {document.querySelectorAll('[data-language]').forEach(link=>{const target=new URL(link.href,location.origin);target.hash=location.hash;target.search=location.search;link.href=target.href;});})();
