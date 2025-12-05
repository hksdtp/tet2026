# Standalone deployment - files already built locally
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy standalone build output
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
