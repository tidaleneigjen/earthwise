# backend/Dockerfile
FROM python:3.13-alpine

# Install system dependencies
RUN apk add --no-cache build-base libpq

# Set workdir
WORKDIR /app

# Copy requirements and install
COPY backend/requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy Django app
COPY backend/ ./backend

# Expose port
EXPOSE 8000

# Run Gunicorn
CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000"]
