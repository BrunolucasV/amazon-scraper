# Amazon Scraper com Bun + Vite

## 📦 Tecnologias
- Bun
- Express
- Axios
- JSDOM
- Vite (HTML, CSS, JS)

## 🚀 Como executar

### Backend
```bash
cd backend
bun install
bun add express axios jsdom cors
bun add -d @types/express @types/jsdom @types/node @types/cors
bun run index.ts
```

### Frontend
Abra o arquivo frontend/index.html no navegador ou sirva com Vite ou http-server.

## 🔍 O que o sistema faz
- Raspagem da Amazon.com.br
- Coleta: título, avaliação, número de avaliações, imagem
- Exibe os produtos com interface leve

## ❗ Observação
Se a Amazon mudar a estrutura do HTML, a raspagem pode deixar de funcionar.