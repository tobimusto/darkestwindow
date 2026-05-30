const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexHtmlPath, 'utf8');

// Title and Meta
html = html.replace(/Car Music \| PPF Córdoba/g, 'Darkestwindow | Polarizados');
html = html.replace(/Car Music/g, 'Darkestwindow');
html = html.replace(/Estética vehicular premium, multimedia y accesorios\. Especialistas en PPF\./g, 'Especialistas en polarizados nanocerámicos y antivandálicos.');
html = html.replace(/Estética vehicular, multimedia y accesorios\. Especialistas en PPF\./g, 'Especialistas en polarizados nanocerámicos y antivandálicos.');

// Phone
html = html.replace(/5493515521188/g, '5491164978368');
html = html.replace(/351-5521188/g, '11-6497-8368');

// Instagram
html = html.replace(/carmusic1/g, 'Darkestwindow');

// Logo
html = html.replace(/<img src="logo\.png"[^>]+>/, '<span style="color: white; font-size: 1.5rem; font-weight: 900; font-family: var(--font); letter-spacing: 1px;">DARKESTWINDOW</span>');

// Hero location & text
html = html.replace(/Córdoba · Especialistas en PPF/g, 'Especialistas en Polarizados');
html = html.replace(/ESTÉTICA Y/g, 'EXPERTOS EN');
html = html.replace(/TECNOLOGÍA/g, 'POLARIZADOS');
html = html.replace(/Llevamos tu vehículo al siguiente nivel\. Polarizados, tratamientos cerámicos, CarPlay, Android Auto y equipamiento premium\. Trabajamos cada milímetro como si el auto fuera nuestro\./g, 'Llevamos tu vehículo al siguiente nivel con los mejores films de control solar, nanocerámicos y antivandálicos. Trabajamos cada milímetro como si el auto fuera nuestro.');

// Services Images & Text
html = html.replace(/img\/aplicnado ppf\.jpeg/g, 'APLICANDO PPF.jpg');
html = html.replace(/img\/aplicando polarizado\.jpeg/g, 'AMAROK.jpg');
html = html.replace(/img\/PPF AUDI\.jpeg/g, 'AUDI.jpg');
html = html.replace(/img\/frente bmw\.jpeg/g, 'AMAROK (2).jpg');
html = html.replace(/img\/bmw atras\.jpeg/g, 'RCZ.jpg');
html = html.replace(/img\/gr yaris ppf\.jpeg/g, 'PPF APLICADO.jpg');

// Titles of some services to match "polarizados" vibe better, or just leave them.
// "Multimedia" -> "Láminas de Seguridad"
html = html.replace(/<h3 class="title">Multimedia<\/h3>\s*<p class="desc">Instalación de pantallas específicas, integración de Apple CarPlay y Android Auto\.<\/p>/, '<h3 class="title">Láminas Antivandálicas</h3>\n              <p class="desc">Instalación de films de máxima seguridad para proteger los cristales de tu vehículo.</p>');

// Gallery images
html = html.replace(/img\/vw con polarizado\.jpeg/g, 'AMAROK 3.jpg');
html = html.replace(/img\/WhatsApp Image 2026-05-28 at 09\.47\.56\.jpeg/g, 'AMAROK 4.jpg');
html = html.replace(/img\/WhatsApp Image 2026-05-28 at 09\.47\.57\.jpeg/g, 'ANTES.jpg');

// Footer
html = html.replace(/Estética vehicular y PPF · Córdoba/g, 'Especialistas en Polarizados');
html = html.replace(/PPF Córdoba · Hecho/g, 'Polarizados · Hecho');

// Map Location Text
html = html.replace(/<p style="color: var\(--muted\);"><i class="ph-fill ph-map-pin" style="color: var\(--accent\); margin-right: 5px;"><\/i> Córdoba<\/p>/, '<p style="color: var(--muted);"><i class="ph-fill ph-map-pin" style="color: var(--accent); margin-right: 5px;"></i> Buenos Aires</p>');

fs.writeFileSync(indexHtmlPath, html, 'utf8');
console.log('index.html updated successfully.');

const stylesPath = path.join(__dirname, 'styles.css');
let styles = fs.readFileSync(stylesPath, 'utf8');
styles = styles.replace(/img\/header\.jpeg/g, 'BMW HEADER.jpg');
fs.writeFileSync(stylesPath, styles, 'utf8');
console.log('styles.css updated successfully.');
