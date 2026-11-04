// Post-processes `next build` static output (out/) so the site works from any URL prefix,
// e.g. a preview host that serves it under /some/path/. Every page gets a <base> pointing at
// the site root, absolute asset paths become relative, and internal links do full page loads
// of `<route>/index.html` (the static host has no Next.js router).
import { readdirSync, readFileSync, statSync, writeFileSync, rmSync, renameSync } from "node:fs";
import { join, relative, sep } from "node:path";

const OUT = new URL("../out/", import.meta.url).pathname;

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const runtime = `(function(){
var root=document.baseURI;
function to(p){var h="",q="",i=p.indexOf("#");if(i>=0){h=p.slice(i);p=p.slice(0,i);}
i=p.indexOf("?");if(i>=0){q=p.slice(i);p=p.slice(0,i);}
p=p.replace(/^\\//,"");if(/\\.[a-z0-9]+$/i.test(p))return root+p+q+h;if(p&&!/\\/$/.test(p))p+="/";return root+p+"index.html"+q+h;}
window.__ghStatic=to;
addEventListener("click",function(e){
if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;
var a=e.target&&e.target.closest&&e.target.closest("a[href]");if(!a||a.target)return;
var h=a.getAttribute("href");if(!h||/^[a-z]+:/i.test(h))return;
e.preventDefault();e.stopPropagation();
if(h.charAt(0)==="#"){var el=document.getElementById(h.slice(1));if(el){el.scrollIntoView();history.replaceState(history.state,"",location.pathname+location.search+h);}return;}
location.href=h.charAt(0)==="/"?to(h):new URL(h,root).href;},true);
})();`;

const relHref = (path) => {
  // "/products/x/" -> "products/x/index.html", "/" -> "index.html", "/search/?q=1" kept with query
  const m = path.match(/^\/([^?#"]*)([?#][^"]*)?$/);
  if (!m) return path;
  let p = m[1];
  if (/\.[a-z0-9]+$/i.test(p)) return p + (m[2] ?? "");
  if (p && !p.endsWith("/")) p += "/";
  return p + "index.html" + (m[2] ?? "");
};

let pages = 0;
for (const file of walk(OUT)) {
  // RSC payloads are only used by client-side navigation, which the static build doesn't do.
  if (file.endsWith(".txt")) { rmSync(file); continue; }
  const isHtml = file.endsWith(".html"), isJs = file.endsWith(".js"), isCss = file.endsWith(".css");
  if (!isHtml && !isJs && !isCss) continue;
  let s = readFileSync(file, "utf8");
  if (isCss) {
    // url(/_next/static/media/x) is relative to the CSS file once made relative.
    s = s.replaceAll("url(/_next/static/", "url(../");
  } else {
    s = s.replaceAll('"/_next/', '"_next/').replaceAll("'/_next/", "'_next/").replaceAll('"/img/', '"img/').replaceAll('\\"/img/', '\\"img/');
  }
  // Next's polyfill has a literal U+FFFD inside strings; the escape is equivalent and survives hosts that reject it.
  if (isJs) s = s.replaceAll("\uFFFD", "\\uFFFD");
  // Some hosts reserve top-level names starting with "_", so _next/ is served as nx/.
  s = s.replaceAll("_next/", "nx/");
  if (isHtml) {
    const depth = relative(OUT, file).split(sep).length - 1;
    const root = depth ? "../".repeat(depth) : "./";
    s = s.replace(/href="(\/[^"]*)"/g, (_, p) => `href="${relHref(p)}"`);
    s = s.replace("<head>", `<head><base href="${root}"/><script>${runtime}</script>`);
    pages++;
  }
  writeFileSync(file, s);
}
renameSync(join(OUT, "_next"), join(OUT, "nx"));
console.log(`static export ready: ${pages} pages in out/`);
