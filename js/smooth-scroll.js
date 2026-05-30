/**
 * smooth-scroll.js
 * Inicialización de Lenis para smooth scroll inercial.
 * Requiere lenis.min.js cargado ANTES que este script.
 *
 * Uso:
 *   <script src="js/lenis.min.js"></script>
 *   <script src="js/smooth-scroll.js"></script>
 */
(function () {
    /* ---------- Lenis smooth scroll ---------- */
    let lenis = null;

    if (typeof Lenis !== 'undefined') {
        lenis = new Lenis({
            duration: 1.5,                                             // Duración animación. Subir = más lento, bajar = más rápido
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing exponencial (se siente natural)
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,                                         // Activa el smooth en la rueda del mouse
            wheelMultiplier: 1,                                        // Sensibilidad rueda. 1 = normal, 1.3 = más rápido
            touchMultiplier: 2,                                        // Sensibilidad touch
        });

        window.__lenis = lenis; // Accesible desde otros scripts si se necesita

        // RAF loop para que Lenis funcione
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        document.documentElement.classList.add('lenis');
    } else {
        // Fallback si Lenis no cargó
        document.documentElement.style.scrollBehavior = 'smooth';
    }

    /* ---------- Anchor links suaves ---------- */
    const smoothScrollTo = (targetY) => {
        if (lenis) {
            lenis.scrollTo(targetY, { offset: -80 }); // -80 compensa el header fijo
        } else {
            window.scrollTo({ top: targetY - 80, behavior: 'smooth' });
        }
    };

    // Interceptar clicks en links de ancla (#seccion o /#seccion)
    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach((a) => {
        a.addEventListener('click', (e) => {
            const href = a.getAttribute('href').replace('/', '');
            if (!href || href === '#' || href.length < 2) return;
            const el = document.querySelector(href);
            if (!el) return;
            e.preventDefault();
            const top = el.getBoundingClientRect().top + window.scrollY;
            smoothScrollTo(top);
        });
    });

    /* ---------- Compatibilidad con modales ---------- */
    // Si existe un elemento con data-lenis-prevent, Lenis ya lo maneja internamente.
    // Opcionalmente podés pausar/reanudar Lenis cuando el modal se abre/cierra:
    //
    //   document.getElementById('mi-modal').addEventListener('show', () => lenis?.stop());
    //   document.getElementById('mi-modal').addEventListener('hide', () => lenis?.start());

})();
