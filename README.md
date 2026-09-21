# LandingAsistAI

Landing institucional de la Universidad Nacional Agraria de la Selva (UNAS), con registro de alumnos, portal estudiantil y panel de administración.

## Requisitos

- Node.js 20+
- Proyecto de Supabase (Auth + Postgres)

## Configuración

Copia `.env.example` a `.env` y completa las variables. No subas `.env`: contiene secretos.

```bash
npm install
npm run db:setup
npm run dev
```

- Web: http://localhost:5173/
- API: http://127.0.0.1:3001
- Swagger: http://127.0.0.1:3001/api/docs

## Despliegue en Render

1. Sube estos cambios a GitHub (`main`).
2. En [Render](https://dashboard.render.com) → **New** → **Web Service** → conecta `Benjamin-Paz-0210/LandingAsistAI`.
3. Configuración:
   - **Runtime:** Node
   - **Build command:** `npm ci && npm run build`
   - **Start command:** `npm start`
   - **Health check:** `/api/health`
4. Variables de entorno (las `VITE_*` hacen falta **en el build**, no solo al arrancar):

| Variable | Valor |
| --- | --- |
| `VITE_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | anon public (JWT) |
| `DATABASE_URL` | cadena del pooler de Postgres (Session, puerto 5432) |
| `ADMIN_EMAIL` | correo del admin |
| `ADMIN_PASSWORD` | contraseña del admin |

No pongas `SERVICE_ROLE_KEY`. No uses prefijo `VITE_` en `DATABASE_URL`.

5. En Supabase → Authentication → URL configuration, pon la URL de Render (`https://….onrender.com`) como **Site URL**.
6. Deploy. El plan gratuito duerme el servicio; la primera visita puede tardar ~1 min.
