import fs from 'node:fs/promises';
await fs.rm('.vercel/output',{recursive:true,force:true});
await fs.mkdir('.vercel/output',{recursive:true});
await fs.cp('public','.vercel/output/static',{recursive:true});
await fs.copyFile('routes.json','.vercel/output/config.json');
for(const name of ['contact','captcha','booking','events']){
 const folder='.vercel/output/functions/api/'+name+'.func';
 await fs.mkdir(folder,{recursive:true});await fs.copyFile('api/bridge.mjs',folder+'/index.mjs');
 await fs.writeFile(folder+'/.vc-config.json',JSON.stringify({runtime:'nodejs24.x',handler:'index.mjs',launcherType:'Nodejs',maxDuration:30}));
}
console.log('Storm X: 94 bilingual public pages and secure API bridge ready.');
