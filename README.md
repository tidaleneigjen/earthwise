# Earthwise - Author & Spiritual Leader Website

A modern web application for an author and spiritual leader, built with React and Django.

## Project Structure

```
earthwise/
├── backend/               # Django backend
│   ├── earthwise/         # Django project settings
│   ├── api/               # Django app for the API
│   ├── manage.py          # Django management script
│   └── requirements.txt   # Python dependencies
└── frontend/              # React frontend
    ├── public/            # Static files
    └── src/               # React application source
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn
- PostgreSQL (recommended) or SQLite

## Backend Setup

1. **Set up a virtual environment and install dependencies:**

   ```bash
   cd backend
   python -m venv earthwise-env
   source earthwise-env/bin/activate  # On Windows: earthwise-env\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Set up the database:**

   ```bash
   python manage.py migrate
   python manage.py createsuperuser
   ```

3. **Run the development server:**

   ```bash
   python manage.py runserver
   ```

   The API will be available at `http://localhost:8000/api/`
   Admin interface: `http://localhost:8000/admin/`

## Frontend Setup

1. **Install dependencies:**

   ```bash
   cd frontend
   npm install
   ```

2. **Run the development server:**

   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```
DEBUG=True
SECRET_KEY=your-secret-key-here
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=localhost,127.0.0.1
```

## API Endpoints

- `GET /api/content/` - List all content
- `GET /api/content/<slug>/` - Get a specific content item
- `GET /api/categories/` - List all categories
- `GET /api/profiles/` - List author profiles
- `GET /api/comments/` - List approved comments

## Deployment

For production deployment, consider using:

- Backend: Gunicorn + Nginx or similar
- Frontend: Build with `npm run build` and serve with a static file server
- Database: PostgreSQL (recommended for production)
- Environment variables for sensitive settings

## License

This project is licensed under the MIT License.
