const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Fix Hola Car Music URLs
html = html.replace(/Hola%20Car%20Music/g, 'Hola%20Darkestwindow');
html = html.replace(/Hola Car Music/g, 'Hola Darkestwindow');
html = html.replace(/Car Music/g, 'Darkestwindow'); // just in case any leftover
html = html.replace(/Darkestwindow \| PPF Córdoba/g, 'Darkestwindow | Polarizados');

// Replace services section
const servicesRegex = /<section class="services" id="servicios">[\s\S]*?<\/section>/;
const newServicesHtml = `<section class="services" id="servicios">
    <div class="container">
      <div class="section-head reveal center" style="text-align: center;">
        <span class="eyebrow">Nuestros Servicios</span>
        <h2>Especialistas en <em>Protección</em>.</h2>
        <p style="margin: 0 auto;">Brindamos soluciones de alta calidad para la seguridad y el confort de tu vehículo.</p>
      </div>

      <div class="services-grid">
        <article class="service-card reveal" data-delay="0">
          <div class="img-wrap"><img src="AMAROK.jpg" alt="Polarizados"></div>
          <div class="svc-content">
            <h3 class="title">Polarizados</h3>
            <p class="desc">Láminas de control solar nanocerámico de alta calidad. Reducción de temperatura y protección UV garantizada. Disminuye el calor interior y mejora la estética de tu vehículo.</p>
          </div>
        </article>

        <article class="service-card reveal" data-delay="200">
          <div class="img-wrap"><img src="AMAROK (2).jpg" alt="Láminas Antivandálicas"></div>
          <div class="svc-content">
            <h3 class="title">Placas Antivandálicas</h3>
            <p class="desc">Films de máxima seguridad y alta resistencia para proteger los cristales contra golpes y roturas. Evita asaltos rápidos y mantiene el cristal en su lugar en caso de impacto.</p>
          </div>
        </article>
      </div>
    </div>
  </section>`;
html = html.replace(servicesRegex, newServicesHtml);

// Fix <p style="margin: 0 auto;"> in case it was already center
html = html.replace(/<div class="section-head reveal">\s*<span class="eyebrow">Nuestros Servicios<\/span>/, '<div class="section-head reveal center">\n        <span class="eyebrow">Nuestros Servicios</span>');

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('index.html updated successfully.');

const stylesPath = path.join(__dirname, 'styles.css');
let styles = fs.readFileSync(stylesPath, 'utf8');

// Replace services CSS
const cssRegex = /\/\* ═══════════════ SERVICES SPLIT ═══════════════ \*\/[\s\S]*?\/\* ═══════════════ COMPARE BEFORE \/ AFTER ═══════════════ \*\//;
const newCss = `/* ═══════════════ SERVICES GRID ═══════════════ */
.services { padding: 8rem 0; background: var(--bg-2); }

.services-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 2.5rem;
}

.service-card {
  background: var(--bg-3); border-radius: var(--radius);
  overflow: hidden; border: 1px solid var(--line);
  transition: transform 0.4s var(--ease), border-color 0.4s var(--ease), box-shadow 0.4s var(--ease);
  display: flex; flex-direction: column;
}
.service-card:hover {
  transform: translateY(-8px); border-color: rgba(241, 29, 40, 0.4);
  box-shadow: 0 20px 40px rgba(0,0,0,0.6);
}

.service-card .img-wrap {
  width: 100%; aspect-ratio: 16/10; overflow: hidden;
  position: relative;
}
.service-card .img-wrap img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.6s var(--ease);
}
.service-card:hover .img-wrap img {
  transform: scale(1.05);
}
.service-card .img-wrap::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(0deg, var(--bg-3) 0%, transparent 60%);
}

.service-card .svc-content {
  padding: 2.5rem; flex-grow: 1; display: flex; flex-direction: column;
}
.service-card .title {
  font-family: var(--font); font-size: clamp(1.5rem, 3.2vw, 2rem);
  line-height: 1.1; text-transform: uppercase; margin-bottom: 1rem;
  color: #fff;
}
.service-card .desc {
  color: var(--muted); font-size: 1.05rem; line-height: 1.6; margin: 0;
}

/* ═══════════════ COMPARE BEFORE / AFTER ═══════════════ */`;

if (styles.match(cssRegex)) {
  styles = styles.replace(cssRegex, newCss);
} else {
  // Try another replacement if compare doesn't exist
  const cssFallbackRegex = /\/\* ═══════════════ SERVICES SPLIT ═══════════════ \*\/[\s\S]*?\/\* ═══════════════ GALLERY CAROUSEL ═══════════════ \*\//;
  styles = styles.replace(cssFallbackRegex, newCss.replace('/* ═══════════════ COMPARE BEFORE / AFTER ═══════════════ */', '/* ═══════════════ GALLERY CAROUSEL ═══════════════ */'));
}

// Remove responsive rules for services split in media queries
styles = styles.replace(/\.services-split \{[\s\S]*?\}\s*/g, '');
styles = styles.replace(/\.services-visual \{[\s\S]*?\}\s*/g, '');
styles = styles.replace(/\.service-item \.inline-img \{[\s\S]*?\}\s*/g, '');
styles = styles.replace(/\.service-item \.inline-img img \{[\s\S]*?\}\s*/g, '');
styles = styles.replace(/\.service-item \{[\s\S]*?\}\s*/g, '');
styles = styles.replace(/\.service-item::before \{[\s\S]*?\}\s*/g, '');

// Insert new responsive rules
styles = styles.replace(/@media \(max-width: 1024px\) \{/, '@media (max-width: 1024px) {\n  .services-grid { grid-template-columns: 1fr; gap: 2rem; }\n  .service-card .svc-content { padding: 1.8rem; }');

fs.writeFileSync(stylesPath, styles, 'utf8');
console.log('styles.css updated successfully.');

const scriptPath = path.join(__dirname, 'script.js');
let script = fs.readFileSync(scriptPath, 'utf8');

// Remove services hover script
const scriptRegex = /\/\/ ── Services Hover Split Layout ──[\s\S]*?\(\)\(\);/g;
script = script.replace(scriptRegex, '');
fs.writeFileSync(scriptPath, script, 'utf8');
console.log('script.js updated successfully.');
