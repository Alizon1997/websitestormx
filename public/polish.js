'use strict';
(()=>{
 const english=document.documentElement.lang==='en';
 const header=document.querySelector('.site-header'),menu=document.querySelector('.menu-toggle'),navigation=document.querySelector('#navigation');
 const compact=window.matchMedia('(max-width:1180px)');
 if(header){
  const measure=()=>document.documentElement.style.setProperty('--header-height',Math.ceil(header.getBoundingClientRect().height)+'px');
  measure();if('ResizeObserver' in window)new ResizeObserver(measure).observe(header);
 }
 // Keep keyboard and touch navigation inside an open mobile menu.
 if(header&&menu&&navigation){
  const previousInert=new Map();let wasOpen=false;
  const sync=()=>{
   const open=compact.matches&&menu.getAttribute('aria-expanded')==='true';
   document.body.classList.toggle('navigation-open',open);
   if(open&&!wasOpen){
    navigation.scrollTop=0;
    document.querySelectorAll('main,footer,.consent-panel').forEach(n=>{previousInert.set(n,n.inert);n.inert=true;});
   }else if(!open&&wasOpen){previousInert.forEach((value,n)=>n.inert=value);previousInert.clear();}
   wasOpen=open;
  };
  new MutationObserver(sync).observe(menu,{attributes:true,attributeFilter:['aria-expanded']});compact.addEventListener('change',sync);sync();
  document.addEventListener('keydown',event=>{
   if(event.key!=='Tab'||!wasOpen)return;
   const focusable=[...header.querySelectorAll('a[href],button:not([disabled]),summary')].filter(n=>n.getClientRects().length&&!n.closest('details:not([open]) .nav-dropdown-panel'));
   const first=focusable[0],last=focusable.at(-1);if(!first||!last)return;
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  });
 }
 // Highlight the visitor's current section without changing page URLs.
 const path=location.pathname;
 if(navigation){
  const base=english?'/en':'';
  const section=path.startsWith(base+'/blog/')?base+'/blog':path.startsWith(base+(english?'/case-studies/':'/casi-studio/'))?base+(english?'/case-studies':'/casi-studio'):path;
  navigation.querySelectorAll('a[href]').forEach(a=>{const url=new URL(a.href);if(url.origin===location.origin&&url.pathname===section&&!url.hash&&!a.classList.contains('language-switch')){a.setAttribute('aria-current',path===section?'page':'true');a.closest('.nav-dropdown')?.setAttribute('data-current','');}});
 }
 // A compact, native article index on phones; the full index stays available.
 const small=window.matchMedia('(max-width:760px)');
 document.querySelectorAll('.article-toc').forEach(toc=>{
  const nav=toc.querySelector('nav'),label=toc.querySelector(':scope > .micro');if(!nav||!label)return;
  const disclosure=document.createElement('details');disclosure.className='toc-disclosure';disclosure.open=!small.matches;
  const summary=document.createElement('summary');summary.textContent=english?'In this article':'In questo articolo';disclosure.append(summary,nav);label.replaceWith(disclosure);
  small.addEventListener('change',()=>disclosure.open=!small.matches);
  nav.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{if(small.matches)disclosure.open=false;const target=document.getElementById(a.hash.slice(1));if(target){target.tabIndex=-1;target.focus({preventScroll:true});}}));
 });
 // Make an empty search recoverable in a single action.
 document.querySelectorAll('[data-filter-region]').forEach(region=>{
  const empty=region.querySelector('.filter-empty'),input=region.querySelector('[data-search-input]');if(!empty)return;
  const reset=document.createElement('button');reset.type='button';reset.className='filter-reset';reset.textContent=english?'Show all results ↗':'Mostra tutti i risultati ↗';
  reset.addEventListener('click',()=>{if(input){input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));}region.querySelector('[data-filter="all"]')?.click();(input||region.querySelector('[data-filter="all"]'))?.focus();});empty.append(reset);
 });
 // Clear custom errors as soon as a visitor edits the affected field.
 document.querySelectorAll('.contact-form input:not([type=hidden]),.contact-form textarea').forEach(input=>{
  input.addEventListener('invalid',()=>input.setAttribute('aria-invalid','true'));
  input.addEventListener('input',()=>{input.setCustomValidity('');input.removeAttribute('aria-invalid');});
 });
 // Make horizontally scrollable article tables discoverable on small screens.
 document.querySelectorAll('.article-copy table').forEach((table,index)=>{
  let wrapper=table.parentElement;
  if(!wrapper.classList.contains('table-scroll')){wrapper=document.createElement('div');table.replaceWith(wrapper);wrapper.append(table);}
  wrapper.classList.add('article-table-scroll');wrapper.setAttribute('role','region');wrapper.setAttribute('aria-label',english?'Scrollable comparison table':'Tabella di confronto scorrevole');
  const hint=document.createElement('p');hint.className='article-scroll-hint';hint.id='table-scroll-help-'+index;hint.textContent=english?'Scroll sideways to see the full table ↔':'Scorri in orizzontale per leggere tutta la tabella ↔';wrapper.before(hint);
  const update=()=>{const overflow=wrapper.scrollWidth>wrapper.clientWidth+1;hint.hidden=!overflow;wrapper.tabIndex=overflow?0:-1;if(overflow)wrapper.setAttribute('aria-describedby',hint.id);else wrapper.removeAttribute('aria-describedby');};
  update();if('ResizeObserver' in window)new ResizeObserver(update).observe(wrapper);document.fonts.ready.then(update);
 });
 // Localize displayed publication dates while preserving machine-readable dates.
 const dateFormat=new Intl.DateTimeFormat(english?'en-GB':'it-IT',{day:'numeric',month:'short',year:'numeric'});
 document.querySelectorAll('time[datetime]').forEach(time=>{
  const value=time.getAttribute('datetime');if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return;
  const [y,m,d]=value.split('-').map(Number);time.textContent=dateFormat.format(new Date(y,m-1,d));
 });
 // Secondary pages use the same consent-gated conversion contract as the forms.
 if(!document.querySelector('#contact-form'))document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');if(!link)return;
  const url=new URL(link.href,location.href);
  if(link.classList.contains('whatsapp-link')||(url.origin===location.origin&&(/\/(prenota|book-a-call)$/.test(url.pathname)||['#parliamone','#contatti'].includes(url.hash))))window.stormxTrack?.('cta_click','page-call');
  else if(link.classList.contains('project-card')&&/\/(casi-studio|case-studies)\//.test(url.pathname))window.stormxTrack?.('case_open',url.pathname.split('/').at(-1));
 });
})();
