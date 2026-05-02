# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start        # Sirve la carpeta public/ en el puerto 80 con npx serve
```

No hay build ni proceso de compilación. Los cambios en `public/index.html` son inmediatos al recargar el navegador.

## Arquitectura

Landing page estática de una sola página (`public/index.html`). Todo el código está en ese único archivo:

- **CSS**: embebido en `<style>` dentro del `<head>`. Variables CSS en `:root`, organizado por sección (nav, hero, sección problema, solución, beneficios, CTA, footer).
- **HTML**: secciones en orden: nav fija → hero → El problema → La solución → Resultados → CTA/Contacto → Footer.
- **JS**: inline al final del `<body>`. Solo dos comportamientos: scroll para añadir clase `scrolled` al nav, e `IntersectionObserver` para animar elementos `.reveal` al entrar en viewport.

## Contacto configurado

- WhatsApp: `+34 611 059 182`
- Email: `mariodiezagudo@gmail.com`

Los enlaces de contacto están en el hero y en la sección `#contacto` (CTA final).
