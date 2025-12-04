# Building and Deploying a React-Django Web App

## 1. Create a Web App with React and Django

### Frontend: Create a React App

1. **Install Node.js**:
   - Ensure you have Node.js and npm installed. Check with:
     ```bash
     node --version
     npm --version
     ```
   - If not installed, download and install from the [official website](https://nodejs.org/).

2. **Create a New React App**:
   ```bash
   npx create-react-app frontend
   cd frontend
   ```

3. **Run the React App Locally**:
   ```bash
   npm start
   ```
   Your React app will be running at `http://localhost:3000`.

### Backend: Set Up Django

1. **Install Django**:
   - Create a new directory for your Django app and set it up:
     ```bash
     mkdir backend
     cd backend
     python -m venv venv
     source venv/bin/activate  # On Windows, use venv\Scripts\activate
     pip install django
     ```

2. **Create a New Django Project**:
   ```bash
   django-admin startproject myproject .
   ```

3. **Run the Django Server Locally**:
   ```bash
   python manage.py runserver
   ```
   Your Django app will be running at `http://localhost:8000`.

## 2. Develop Locally

### API Creation

- Create Django APIs to connect with your React frontend using Django REST Framework:
  ```bash
  pip install djangorestframework
  ```
- Add it to your `INSTALLED_APPS` in `settings.py` and create your views and serializers accordingly.

### React API Fetch

- In your React app, use the `fetch` API or libraries like `axios` to call your Django APIs:
  ```javascript
  fetch('http://localhost:8000/api/endpoint/')
      .then(response => response.json())
      .then(data => console.log(data));
  ```

## 3. Commit to GitHub

1. **Initialize a Git Repository**:
   - In your project root (parent directory of `frontend` and `backend`):
   ```bash
   git init
   ```

2. **Create a `.gitignore` File**:
   - Make sure to ignore `node_modules`, `venv`, and other unnecessary files.

3. **Commit Your Code**:
   ```bash
   git add .
   git commit -m "Initial commit"
   ```

4. **Push to GitHub**:
   - Create a new repository on GitHub and follow the instructions to push your local repository:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin master
   ```

## 4. Deploy to AWS

### Host React App in S3

1. **Build Your React App**:
   ```bash
   npm run build
   ```

2. **Set Up S3 Bucket**:
   - Go to the AWS S3 service and create a new bucket.
   - Set permissions and enable static website hosting.

3. **Upload Static Files**:
   - Upload the contents of the `build` folder to the S3 bucket.

4. **Configure Bucket Policy**:
   - Make the bucket publicly accessible by adding a bucket policy.

### Run Django Serverless in AWS Lambda

1. **Setup the Django Project for Lambda**:
   - Use `Mangum` to allow AWS Lambda to serve your Django application.
   ```bash
   pip install mangum
   ```

2. **Create a `serverless.yml` file** to configure your deployment:
   ```yaml
   service: my-django-app

   provider:
     name: aws
     runtime: python3.8
     handler: myproject.wsgi:handler

   functions:
     api:
       handler: myproject.wsgi.handler
       events:
         - httpApi:
             path: /{proxy+}
             method: any
   ```

3. **Deploy to AWS Lambda**:
   - Install the Serverless Framework if you haven't:
   ```bash
   npm install -g serverless
   ```
   - Deploy your Django app:
   ```bash
   serverless deploy
   ```

## Conclusion

You now have a complete workflow from creating a React frontend and Django backend, developing locally, committing to GitHub, and deploying to AWS using S3 and AWS Lambda.

