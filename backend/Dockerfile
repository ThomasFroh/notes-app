# ---- Stage 1: Build frontend ----
    FROM node:20-alpine AS build

    WORKDIR /app
    
    # Copy and install frontend dependencies
    COPY frontend/package*.json ./frontend/
    RUN cd frontend && npm install
    
    # Copy frontend source and build it
    COPY frontend ./frontend
    RUN cd frontend && npm run build
    
    # ---- Stage 2: Run backend ----
    FROM node:20-alpine
    
    WORKDIR /app
    
    # Copy backend dependencies and install
    COPY backend/package*.json ./
    RUN npm install --production
    
    # Copy backend source code
    COPY backend/ .
    
    # Copy built frontend files into backend's public directory
    COPY --from=build /app/frontend/build ./frontend/build
    
    # Expose backend port
    EXPOSE 3001
    
    CMD ["node", "index.js"]
    