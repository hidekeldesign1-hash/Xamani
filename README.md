# XAMANI — Landing

Sitio corporativo de XAMANI (Next.js 15, App Router, Tailwind CSS, Framer Motion).

## Requisitos

- Node.js 20+
- npm 10+

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Build de producción

```bash
npm run lint
npm run build
npm start
```

## Despliegue en Vercel

1. Importa el repositorio en [vercel.com](https://vercel.com).
2. **Framework Preset:** Next.js (detección automática).
3. **Build Command:** `npm run build`
4. **Output Directory:** (por defecto, dejar vacío)
5. **Install Command:** `npm install`
6. **Node.js Version:** 20.x

No se requieren variables de entorno para el despliegue actual.

### Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home + hero + secciones |
| `/manifiesto` | El Manifiesto |
| `/modelo-de-negocio` | Modelo de negocio |
| `/unirme-al-equipo` | Unirme al equipo |
| `/agenda-asesoria` | Agenda una asesoría |
| `/nuestra-historia` | Nuestra historia |

## Estructura

```
src/
  app/           # Rutas (App Router)
  components/    # UI, navegación, iconos
  sections/      # Secciones de landing
  data/          # Menú y rutas
public/
  fonts/         # Ambit, Archia (.otf)
  images/        # Assets estáticos
```
