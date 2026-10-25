'use strict';
(()=>{
 const english=document.documentElement.lang==='en';
 const home=document.body.dataset.page==='home';
 const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('#navigation');
 function closeMenu(){menu?.setAttribute('aria-expanded','false');menu?.setAttribute('aria-label',english?'Open menu':'Apri il menu');nav?.classList.remove('is-open');}
 if(!home&&menu&&nav){
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?(english?'Close menu':'Chiudi il menu'):(english?'Open menu':'Apri il menu'));nav.classList.toggle('is-open',open);});
  nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
  document.addEventListener('click',e=>{if(!e.target.closest('.header-inner'))closeMenu();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
 }
 window.matchMedia('(min-width:1181px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
 const dropdowns=[...document.querySelectorAll('.nav-dropdown')];
 document.addEventListener('click',event=>dropdowns.forEach(d=>{if(!d.contains(event.target)||event.target.closest('a'))d.open=false;}));
 document.addEventListener('keydown',event=>{if(event.key==='Escape')dropdowns.forEach(d=>{if(d.open){d.open=false;d.querySelector('summary').focus();}});});
 if(new URLSearchParams(location.search).get('servizio')==='amazon'&&['/','/en'].includes(location.pathname))location.replace((english?'/en/amazon':'/amazon')+'#contatti');
 document.querySelectorAll('[data-filter-region]').forEach(region=>{
  const buttons=[...region.querySelectorAll('[data-filter]')],cards=[...region.querySelectorAll('[data-filter-item]')],input=region.querySelector('[data-search-input]');
  let active=location.hash==='#amazon'?'amazon':'all';
  const normalize=value=>value.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  function update(){const query=normalize(input?.value||'');let visible=0;cards.forEach(card=>{const match=(active==='all'||card.dataset.topic===active)&&(!query||normalize(card.dataset.search||card.textContent).includes(query));card.hidden=!match;if(match)visible++;});buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===active)));const count=region.querySelector('[data-result-count]');if(count)count.textContent=String(visible);region.querySelector('.filter-empty').hidden=visible>0;}
  buttons.forEach(button=>button.addEventListener('click',()=>{active=button.dataset.filter;update();}));input?.addEventListener('input',update);update();
 });
 if(!home){
  const floating=document.querySelector('.whatsapp-floating'),contact=document.querySelector('.contact');let contactVisible=false;
  function updateFloating(){floating?.classList.toggle('is-visible',scrollY>420&&!contactVisible&&menu?.getAttribute('aria-expanded')!=='true');}
  window.addEventListener('scroll',updateFloating,{passive:true});if(menu)new MutationObserver(updateFloating).observe(menu,{attributes:true,attributeFilter:['aria-expanded']});
  if(contact&&'IntersectionObserver' in window)new IntersectionObserver(entries=>{contactVisible=entries[0].isIntersecting;updateFloating();}).observe(contact);updateFloating();
  if(!document.querySelector('#contact-form')){
   const number=String(window.STORMX_CONTACT?.whatsappNumber||'393495375680').replace(/\D/g,'');
   const amazon=document.body.dataset.channel==='amazon';
   const message=english?(amazon?'Hello, I would like to discuss support for our Amazon account.':'Hello, I would like to discuss how Storm X could help our business find new customers.'):(amazon?'Ciao, vorrei capire come Storm X può aiutarci con il nostro account Amazon.':'Ciao, vorrei capire come Storm X può aiutare la mia azienda a trovare nuovi clienti.');
   document.querySelectorAll('.whatsapp-link').forEach(a=>a.href='https://wa.me/'+number+'?text='+encodeURIComponent(message));
  }
  const videos=[...document.querySelectorAll('video')];videos.forEach(video=>video.addEventListener('play',()=>videos.forEach(other=>{if(other!==video)other.pause();})));
 }
 const sectorForm=document.querySelector('#contact-form');
 if(sectorForm?.dataset.sectorMessages){
  const slug=new URLSearchParams(location.search).get('settore');
  const messages=JSON.parse(sectorForm.dataset.sectorMessages);
  if(slug&&Object.hasOwn(messages,slug)&&!sectorForm.elements.message.value.trim()){
   sectorForm.elements.message.value=messages[slug];
   sectorForm.elements.message.defaultValue=messages[slug];
  }
 }
 const toc=document.querySelector('.article-toc');
 if(toc&&'IntersectionObserver' in window){const links=[...toc.querySelectorAll('nav a')];const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>link.classList.toggle('is-active',link.hash==='#'+entry.target.id));});},{rootMargin:'-120px 0px -65% 0px',threshold:0});links.forEach(link=>{const heading=document.getElementById(link.hash.slice(1));if(heading)observer.observe(heading);});}
 document.querySelectorAll('video').forEach(v=>{v.preload='none';});
})();
