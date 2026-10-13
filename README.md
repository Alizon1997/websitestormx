# Storm X Digital production site

Public Italian and English pages are served by Vercel at https://www.stormxdigital.com.
The contact, CAPTCHA, booking gate and consent-based metrics APIs use a signed bridge to the existing Sites backend. Stored requests and the owner-only dashboard remain there; no visitor authentication is forwarded.

Build: `npm run build`. No dependencies are required. Vercel project: `stormx-digital`.
Required production secret: `VERCEL_BRIDGE_SECRET` (also configured on the backend). Never put its value in source.

The published content is exported from Sites commit 9d20a6b2bd697f72116ac77807e6aef281599980. After editing the site in Sites, re-export the complete public pages with canonical origin https://www.stormxdigital.com and copy the generated static tree into public before committing.

Previous production deployment for rollback: dpl_3vttAsiWPzW3AQE9G7meA3itZtDK.
