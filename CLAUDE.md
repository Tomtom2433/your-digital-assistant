# Your Digital Assistant — Claude Code

## Projet

App **TanStack Start** (full-stack React) déployée sur **Cloudflare** (via wrangler). Probablement un assistant numérique personnel (à préciser au prochain commit de contexte).

- **Repo** : `/Users/tom/Workspace/your-digital-assistant`
- **Runtime** : Cloudflare Workers (wrangler.jsonc)

## Stack

- **TanStack Start** (framework full-stack React, file-based routing)
- **Vite** + TypeScript strict
- **Tailwind CSS** + shadcn/ui
- **TanStack Query**
- **Bun** (lockfile `bun.lock`)

## Commandes

```bash
bun install
bun run dev          # dev local
bun run build
bun run preview
bun run lint
bun run format

# Deploy Cloudflare
wrangler deploy
```

## Conventions

1. **Cloudflare Workers** — pas de Node-only APIs (`fs`, `child_process`). Utiliser les Cloudflare bindings (KV, D1, R2).
2. **TanStack Start** : routes dans `src/routes/`, server functions dans `.server.ts` ou via `createServerFn`.
3. **Pas de DB Supabase ici** — si besoin de persistance, passer par Cloudflare D1 ou KV.
4. **TypeScript strict**, Zod pour validation côté server functions.

## TODO

- [ ] Documenter le use case précis du projet (à compléter au prochain commit)
- [ ] Vérifier la config `wrangler.jsonc` est à jour pour le déploiement prod
