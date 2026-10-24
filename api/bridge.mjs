import { createHash, createHmac } from 'node:crypto';
import { isIP } from 'node:net';
const backend='https://stormx-digital-home.marcello981.chatgpt.site';
export default async function handler(req,res){
 res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');
 const error=(status)=>{res.statusCode=status;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({ok:false}));};
 try{
  const url=new URL(req.url,'https://'+req.headers.host),path=url.pathname;
  if(!/^\/api\/(contact|booking|captcha|events)$/.test(path))return error(404);
  if(req.method!==(path==='/api/captcha'?'GET':'POST'))return error(405);
  const origin='https://'+req.headers.host;
  if(req.headers.origin&&req.headers.origin!==origin)return error(403);
  const ip=String(req.headers['x-vercel-forwarded-for']||req.headers['x-forwarded-for']||'').split(',')[0].trim();
  if(!isIP(ip)||!process.env.VERCEL_BRIDGE_SECRET)return error(503);
  const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>24576)return error(413);chunks.push(chunk);}
  const body=Buffer.concat(chunks),timestamp=String(Date.now()),hash=createHash('sha256').update(body).digest('hex');
  const signature=createHmac('sha256',process.env.VERCEL_BRIDGE_SECRET).update([timestamp,req.method,path+url.search,ip,origin,hash].join('\n')).digest('hex');
  const headers={'X-StormX-Bridge-Timestamp':timestamp,'X-StormX-Bridge-IP':ip,'X-StormX-Bridge-Origin':origin,'X-StormX-Bridge-Signature':signature};
  if(req.headers['content-type'])headers['Content-Type']=req.headers['content-type'];
  if(req.headers['x-stormx-language']==='en')headers['X-StormX-Language']='en';
  const response=await fetch(backend+path+url.search,{method:req.method,headers,body:req.method==='POST'?body:undefined,redirect:'manual',signal:AbortSignal.timeout(25000)});
  res.statusCode=response.status;res.setHeader('Content-Type',response.headers.get('content-type')||'application/json');
  res.end(Buffer.from(await response.arrayBuffer()));
 }catch{error(502);}
}
