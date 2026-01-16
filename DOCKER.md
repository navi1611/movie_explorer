# Docker Setup Guide

This guide explains how to run the Movie Explorer application using Docker.

## Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)

## Quick Start

1. **Clone the repository** (if you haven't already)

2. **Create a `.env` file** in the root directory (optional, defaults are provided):
   ```env
   # Database Configuration
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=postgres
   POSTGRES_DB=movie_explorer
   POSTGRES_PORT=5432

   # Backend Configuration
   BACKEND_PORT=8000
   DATABASE_URL=postgresql+psycopg2://postgres:postgres@db:5432/movie_explorer
   CORS_ORIGINS=http://localhost:3000,http://localhost:5173

   # Frontend Configuration
   FRONTEND_PORT=3000
   VITE_API_BASE_URL=http://localhost:8000
   ```

3. **Build and start all services**:
   ```bash
   docker-compose up --build
   ```

4. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

## Docker Commands

### Start services
```bash
docker-compose up
```

### Start services in detached mode
```bash
docker-compose up -d
```

### Build and start services
```bash
docker-compose up --build
```

### Stop services
```bash
docker-compose down
```

### Stop services and remove volumes
```bash
docker-compose down -v
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

### Rebuild a specific service
```bash
docker-compose build backend
docker-compose build frontend
```

### Execute commands in containers
```bash
# Backend shell
docker-compose exec backend bash

# Database shell
docker-compose exec db psql -U postgres -d movie_explorer
```

## Services

### Database (PostgreSQL)
- **Container**: `movie_explorer_db`
- **Port**: 5432 (default)
- **Data**: Persisted in Docker volume `postgres_data`

### Backend (FastAPI)
- **Container**: `movie_explorer_backend`
- **Port**: 8000 (default)
- **Hot Reload**: Enabled via volume mount

### Frontend (React + Vite)
- **Container**: `movie_explorer_frontend`
- **Port**: 3000 (default)
- **Web Server**: Nginx

## Environment Variables

### Database
- `POSTGRES_USER`: PostgreSQL username (default: `postgres`)
- `POSTGRES_PASSWORD`: PostgreSQL password (default: `postgres`)
- `POSTGRES_DB`: Database name (default: `movie_explorer`)
- `POSTGRES_PORT`: External port mapping (default: `5432`)

### Backend
- `DATABASE_URL`: Full database connection string
- `CORS_ORIGINS`: Comma-separated list of allowed CORS origins
- `BACKEND_PORT`: External port mapping (default: `8000`)

### Frontend
- `VITE_API_BASE_URL`: Backend API URL (default: `http://localhost:8000`)
- `FRONTEND_PORT`: External port mapping (default: `3000`)

## Using External Database

If you want to use an external database (e.g., Supabase, AWS RDS), update the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL=postgresql+psycopg2://user:password@host:5432/database
```

Then comment out or remove the `db` service from `docker-compose.yml`.

## Troubleshooting

### Port already in use
If a port is already in use, change it in your `.env` file or `docker-compose.yml`.

### Database connection errors
1. Ensure the database service is healthy: `docker-compose ps`
2. Check database logs: `docker-compose logs db`
3. Verify `DATABASE_URL` in your `.env` file

### Frontend can't connect to backend
1. Ensure `VITE_API_BASE_URL` is set correctly
2. Rebuild the frontend: `docker-compose build frontend`
3. Check CORS settings in backend

### Rebuild everything from scratch
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

## Development vs Production

### Development
The current setup includes volume mounts for hot reload:
- Backend code is mounted, so changes are reflected immediately
- Frontend requires rebuild for changes (static build)

### Production
For production deployment:
1. Remove volume mounts from `docker-compose.yml`
2. Use multi-stage builds (already implemented)
3. Set appropriate environment variables
4. Use a reverse proxy (nginx/traefik) for SSL termination
5. Use secrets management for sensitive data

