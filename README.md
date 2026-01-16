# Movie Explorer


### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### Backend
- **FastAPI** - Python web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Database
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.11 or higher) - [Download](https://www.python.org/downloads/)
- **PostgreSQL** (v15 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)

Optional:
- **Docker** and **Docker Compose** - [Download](https://www.docker.com/get-started)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd movie_explorer
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install
```

## Configuration

### Backend Environment Variables

Create a `.env` file in the `server` directory:

```env
# Database Configuration
# postgresql+psycopg2://postgres:4921dda4-989e-41dd-9d8c-03b927950352@db.yurabqxnonngstfufwxt.supabase.co:5432/postgres

DATABASE_URL=postgresql+psycopg2://postgres:your_password@localhost:5432/movie_explorer


# CORS Configuration (comma-separated origins)
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Frontend Environment Variables

Create a `.env` file in the `client` directory:

```env
# API Base URL
VITE_API_BASE_URL=http://localhost:8000
```

## Running the Application

### Development Mode

#### Option 1: Run Separately (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd server
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at: `http://localhost:8000`
- API Documentation: `http://localhost:8000/docs`
- Alternative API Docs: `http://localhost:8000/redoc`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

The frontend will be available at: `http://localhost:5173`

#### Option 2: Using Docker (Recommended for Production-like Environment)

See the [Docker Setup Guide](./DOCKER.md) for detailed instructions.

Quick start:
```bash
# From project root
docker-compose up --build
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 8000
- Frontend on port 3000

### Production Mode

#### Backend

```bash
cd server
source venv/bin/activate
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

#### Frontend

```bash
cd client
npm run build
npm run preview
```

The built frontend will be available at `http://localhost:4173` (default Vite preview port).

## Database Setup

### Using Local PostgreSQL

1. Create a database:
```bash
createdb movie_explorer
```

2. Update the `DATABASE_URL` in `server/.env`:
```env
DATABASE_URL=postgresql+psycopg2://postgres:your_password@localhost:5432/movie_explorer
```

3. Run migrations (if using Alembic):
```bash
cd server
alembic upgrade head
```

### Using Docker PostgreSQL

The `docker-compose.yml` includes a PostgreSQL service that automatically creates the database.

## Available Scripts

### Frontend Scripts

```bash
cd client

npm run dev      # Start
npm run build    # Build
npm run lint     # Run ESLint
```

### Backend Scripts

```bash
cd server

# Run development server
uvicorn app.main:app --reload

# Run production server
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Run with specific workers (production)
uvicorn app.main:app --workers 4 --host 0.0.0.0 --port 8000
```

### Docker Issues

See [DOCKER.md](./DOCKER.md) for Docker-specific troubleshooting.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the [Docker Setup Guide](./DOCKER.md) for Docker-related questions
- Review API documentation at `http://localhost:8000/docs`

---

**Happy Exploring! 🎬**
