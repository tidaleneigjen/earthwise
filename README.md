# Earthwise (Django + React + TypeScript)

A full-stack web application using Django for the backend and React with TypeScript for the frontend.
The project is structured for local development and ready for deployment to AWS ECS with an RDS database.

---

## Project Structure

earthwise/
├── backend/          # Django backend
│   ├── manage.py
│   ├── settings.py
│   └── ...
├── frontend/         # React + TypeScript frontend (Vite)
│   ├── package.json
│   ├── vite.config.ts
│   └── src/
├── requirements.txt  # Python dependencies
└── README.md

---

## Local Setup

### 1. Clone the repository

git clone git@github.com:<your-username>/<your-repo>.git
cd <your-repo>

---

### 2. Set up the Django backend

Create and activate a virtual environment:

python -m venv earthwise-env
source earthwise-env/bin/activate   # On Windows: earthwise-env\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Run database migrations and start the development server:

python manage.py migrate
python manage.py runserver

The backend runs at:  
http://localhost:8000

---

### 3. Set up the React frontend

Navigate to the frontend directory and install dependencies:

cd frontend
npm install
npm run dev

The frontend runs at:  
http://localhost:5173

---

### 4. Connect the frontend and backend

The frontend fetches data from the Django API using CORS.  
In your `backend/settings.py`, include the following:

INSTALLED_APPS = [
    "corsheaders",
    "rest_framework",
    "api",
    ...
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    ...
]

CORS_ALLOW_ALL_ORIGINS = True

Restart the backend server after updating settings.

---

## Docker Setup (Planned)

The project will be containerized using Docker for easier deployment and consistent environments.

Docker components to be added:
- backend/Dockerfile: Django backend served via Gunicorn
- frontend/Dockerfile: React frontend built and served via Nginx
- docker-compose.yml: To run both containers together locally

After setup, you will be able to run:

docker-compose up --build

and access the app at:  
http://localhost:5173

---

## Technology Stack

- Backend: Django, Django REST Framework
- Frontend: React, TypeScript, Vite
- Database: SQLite (local), PostgreSQL (AWS RDS for production)
- Deployment: Docker and AWS ECS

---

## Development Notes

- Use `python manage.py createsuperuser` to create an admin account.
- Use environment variables for database credentials and secrets in production.
- Run `npm run build` to generate a production build of the frontend.

---

## License

MIT License © 2025
