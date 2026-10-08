/**
 * Postbuild: give every public page its own HTML file.
 *
 * The launchpad is a client-rendered app, so every URL used to receive the
 * same index.html: no <title>, no canonical, no links. Crawlers that don't run
 * JavaScript saw hundreds of identical, empty pages. This writes a copy of the
 * built shell per locale and page with the translated title, a canonical URL
 * and a <noscript> list of links. The app boots exactly as before; Netlify
 * serves these files ahead of the catch-all rewrite.
 *
 * Unlocalised paths (/faq, /withdrawals, ...) get a server-side 301 to the
 * English page, which is where the app sends them anyway.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
// Netlify sets URL to the site's main address (also on deploy previews)
const SITE_URL = (process.env.URL || '').replace(/\/$/, '');

// Pages a visitor can open directly, with the title each one sets at runtime.
// Workflow steps after the advisories need wallet state, so they stay out.
const PAGES = [
  { route: '/', title: 'Staking Launchpad' },
  { route: '/overview', title: 'Advisories' },
  { route: '/faq', title: 'Validator FAQs' },
  { route: '/checklist', title: 'Validator checklist' },
  { route: '/validator-actions', title: 'Validator Actions' },
  { route: '/withdrawals', title: 'Staking withdrawals' },
  { route: '/top-up', title: 'Top up a validator' },
  { route: '/btec', title: 'BLS To Execution Change' },
  { route: '/phishing', title: 'Avoid phishing' },
  { route: '/languages', title: 'Language support' },
  { route: '/terms-of-service', title: 'Staking Launchpad' },
  ...['Besu', 'Erigon', 'Geth', 'Nethermind', 'Reth'].map(clientName => ({
    route: `/${clientName.toLowerCase()}`,
    title: 'Execution Clients: {clientName}',
    values: { clientName },
  })),
  ...['Grandine', 'Lighthouse', 'Lodestar', 'Nimbus', 'Prysm', 'Teku'].map(
    clientName => ({
      route: `/${clientName.toLowerCase()}`,
      title: 'Consensus Clients: {clientName}',
      values: { clientName },
    })
  ),
];

const DESCRIPTION =
  'Become a validator and help secure the future of Ethereum.';

// English message -> generated id, from the extracted source strings
const sourceMessages = require(path.join(ROOT, 'src/intl/en.json'));
const idByMessage = {};
Object.keys(sourceMessages).forEach(id => {
  idByMessage[sourceMessages[id].message] = id;
});

const compiledDir = path.join(ROOT, 'src/intl/compiled');
const locales = fs
  .readdirSync(compiledDir)
  .filter(f => f.endsWith('.json'))
  .map(f => f.replace(/\.json$/, ''));

// Render a compiled message: literals and simple arguments only, which is all
// the titles above use. Anything else falls back to the English text.
const translate = (locale, message, values = {}) => {
  const compiled = require(path.join(compiledDir, `${locale}.json`));
  const ast = compiled[idByMessage[message]];
  const parts = Array.isArray(ast) ? ast : [{ type: 0, value: message }];
  if (parts.some(p => p.type !== 0 && p.type !== 1)) return message;
  return parts
    .map(p => (p.type === 0 ? p.value : values[p.value] || ''))
    .join('')
    .replace(/\{(\w+)\}/g, (_, key) => values[key] || '');
};

const escapeHtml = s =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const pageUrl = (locale, route) =>
  route === '/' ? `/${locale}/` : `/${locale}${route}`;

const shell = fs.readFileSync(path.join(BUILD, 'index.html'), 'utf8');

const render = (locale, page) => {
  const title = escapeHtml(translate(locale, page.title, page.values));
  const description = escapeHtml(translate(locale, DESCRIPTION));
  const canonical = SITE_URL
    ? `<link rel="canonical" href="${SITE_URL}${pageUrl(locale, page.route)}">`
    : '';
  const links = PAGES.map(
    p =>
      `<li><a href="${pageUrl(locale, p.route)}">${escapeHtml(
        translate(locale, p.title, p.values)
      )}</a></li>`
  ).join('');

  return shell
    .replace(
      /<html lang="en">/,
      `<html lang="${locale}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">`
    )
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>${canonical}`)
    .replace(
      /<noscript>[\s\S]*?<\/noscript>/,
      `<noscript><h1>${title}</h1><p>${description}</p><ul>${links}</ul>` +
        '<p>You need to enable JavaScript to run this app.</p></noscript>'
    );
};

const write = (relPath, html) => {
  const file = path.join(BUILD, relPath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
};

let count = 0;
locales.forEach(locale => {
  PAGES.forEach(page => {
    const html = render(locale, page);
    const url = pageUrl(locale, page.route).replace(/\/$/, '');
    // /en/faq is served from en/faq.html and /en/faq/ from en/faq/index.html
    write(`${url}.html`, html);
    write(`${url}/index.html`, html);
    count += 1;
  });
});

// The untouched shell stays the fallback for every other path. The root URL
// gets the English landing page, which is where the app redirects it.
fs.writeFileSync(path.join(BUILD, 'app.html'), shell);
fs.writeFileSync(path.join(BUILD, 'index.html'), render('en', PAGES[0]));

const redirectsFile = path.join(BUILD, '_redirects');
const unlocalised = PAGES.filter(p => p.route !== '/').map(
  p => `${p.route} /en${p.route} 301\n${p.route}/ /en${p.route} 301`
);
const redirects = fs
  .readFileSync(redirectsFile, 'utf8')
  .replace(
    /^\/\*\s+\/index\.html\s+200\s*$/m,
    `${unlocalised.join('\n')}\n/*    /app.html   200`
  );
if (!redirects.includes('/app.html')) {
  throw new Error('static-pages: catch-all rewrite not found in _redirects');
}
fs.writeFileSync(redirectsFile, redirects);

console.log(
  `static-pages: wrote ${count} pages for ${locales.length} locales` +
    (SITE_URL ? ` (canonical host ${SITE_URL})` : ' (no URL set, no canonicals)')
);
