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
