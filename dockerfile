# Base image with Node.js and required dependencies
FROM node:22-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies separately for caching
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install --frozen-lockfile

# Copy rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# ---- Production Image ----
FROM node:22-alpine AS runner

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

# Copy only required output for running the app
COPY --from=base /app/.next ./.next
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./
COPY --from=base /app/public ./public

EXPOSE 3000

CMD ["npm", "start"]
