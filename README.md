# RIFASFULLPROJECT
Proyecto RIFASFULLPROJECT — plataforma de rifas (versión Venezuela).
Editor principal: Tomas Galea

## Estructura
- /server  -> Backend Node + Express + PostgreSQL
- /client  -> Frontend React

## Setup rápido
1. Backend:
   - Copiar `server/.env.example` -> `server/.env` y completar credenciales
   - `cd server && npm install`
   - `npm run dev` (o `npm start`)

2. Frontend:
   - Copiar `client/.env.example` -> `client/.env` y ajustar URL API
   - `cd client && npm install`
   - `npm start`

## Notas
- Compra: la compra crea un ticket en estado `pending`. El administrador **acepta** o **rechaza** el pago en el panel admin.
- La tabla `tickets` tiene una restricción única sobre (raffle_id, number) para evitar duplicados.
- Cambiar `JWT_SECRET` en producción.
Proyecto RIFASFULLPROJECT FULL - reconstruido