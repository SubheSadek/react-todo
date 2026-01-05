# ==========================================
# Development Stage
# ==========================================
FROM node:23-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy dependency files WITH correct ownership
COPY package.json pnpm-lock.yaml* ./

# RUN pnpm config set store-dir /app/.pnpm-store

RUN pnpm install

# Don't copy source code - will use volumes
EXPOSE 5173

CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]