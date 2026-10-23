// Submit this site's canonical public URLs after a verified production deployment.
import fs from 'node:fs/promises';
const config=JSON.parse(await fs.readFile(new URL('./indexnow-config.json',import.meta.url),'utf8'));
if(config.host!=='www.stormxdigital.com'||!/^([a-f0-9]{32})\.txt$/.test(config.keyFile))throw new Error('Unexpected IndexNow configuration');
const key=config.keyFile.slice(0,-4),origin='https://'+config.host,keyLocation=origin+'/'+config.keyFile;
const ownership=await fetch(keyLocation);
if(!ownership.ok||(await ownership.text()).trim()!==key)throw new Error('Production ownership file not available');
const sitemap=await fetch(origin+'/sitemap.xml');if(!sitemap.ok)throw new Error('Sitemap unavailable');
const urlList=[...(await sitemap.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(x=>x[1]);
if(!urlList.length||urlList.length>10000||urlList.some(x=>{const u=new URL(x);return u.origin!==origin||/^\/(api|richieste|statistiche)(\/|$)/.test(u.pathname);}))throw new Error('Unexpected sitemap URL');
const response=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host:config.host,key,keyLocation,urlList})});
console.log(JSON.stringify({status:response.status,submittedURLs:urlList.length,meaning:response.status===200?'Received; indexing is not guaranteed':response.status===202?'Received; ownership validation pending':'Submission failed'}));
if(![200,202].includes(response.status))process.exitCode=1;
