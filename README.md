# Customer Management Dashboard

A full-stack web application to manage customers with authentication. The frontend is built with React, Vite, TypeScript, and Tailwind CSS. The backend is built with Node.js, Express.js, MongoDB Atlas, Mongoose, JWT authentication, and bcrypt password hashing.

The backend can be deployed on AWS EC2 with Docker and Nginx, while the frontend can be deployed on Vercel or any static hosting platform.

## Live Demo

- Frontend: Add your Vercel URL here
- Backend API: `http://13.126.185.225`

## Tech Stack

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Context API
- Fetch API

### Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT authentication
- bcrypt password hashing

### DevOps and Deployment

- Docker
- AWS EC2
- Nginx reverse proxy
- Vercel frontend hosting

## Features

### Authentication

- User registration
- Login with JWT
- Protected authenticated dashboard
- Password hashing using bcrypt

### User Management

- View logged-in user profile
- Edit user details through a modal
- Context-based global user state
- Delete account from the navbar

### Customer Management

- View customer list
- Customer pagination
- Edit customer details
- Delete customers
- Validation for name, email, and phone

### Security

- JWT middleware for protected routes
- Ownership validation so users can modify only their own data
- Backend and frontend input validation
- CORS configuration for frontend access

## Project Structure

### Backend
https://github.com/GajananBodhankar/customer-deashboard-arali-assignment-backend.git

```text
customer-dashboard-backend/
|-- Models/
|   |-- customerModel.js
|   `-- userModel.js
|-- Routes/
|   `-- customer.route.js
|-- Middleware/
|   `-- auth.js
|-- Services/
|-- index.js
`-- Dockerfile
```

### Frontend

```text
customer-dashboard-arali-frontend/
|-- public/
|-- src/
|   |-- components/
|   |   |-- CustomerList.tsx
|   |   |-- EditProfileModal.tsx
|   |   |-- Navbar.tsx
|   |   |-- Pagination.tsx
|   |   `-- ProfileCard.tsx
|   |-- Context/
|   |   |-- CurrentUserContext.tsx
|   |   `-- CurrentUserContextValue.ts
|   |-- pages/
|   |   |-- Dashboard.tsx
|   |   |-- Login.tsx
|   |   `-- Register.tsx
|   |-- services/
|   |   |-- api.ts
|   |   `-- propTypes.ts
|   |-- App.tsx
|   |-- index.css
|   `-- main.tsx
|-- package.json
|-- tsconfig.json
`-- vite.config.ts
```

## Environment Variables

Create a `.env` file in the backend project:

```env
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key
PORT=3000
```

## Running Locally

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd customer-dashboard-arali-frontend
npm install
npm run dev
```

## Frontend Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Docker Setup

Build the backend Docker image:

```bash
docker build -t customer-dashboard .
```

Run the backend container:

```bash
docker run -d -p 3000:3000 --env-file .env customer-dashboard
```

## AWS EC2 Deployment

1. Launch an EC2 instance.
2. Install Docker and Nginx.
3. Copy or clone the backend project on EC2.
4. Create the backend `.env` file.
5. Build and run the Docker container.
6. Configure Nginx as a reverse proxy.

Example Nginx config:

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

## Frontend Deployment

Deploy the frontend with Vercel:

```bash
npm install -g vercel
vercel
vercel --prod
```

Or build the project and deploy the `dist/` folder to any static hosting provider:

```bash
npm run build
```

## API Endpoints

### Auth

```text
POST /customer/register
POST /customer/login
```

### Customers

```text
GET    /customer
POST   /customers
PUT    /customer/:id
DELETE /customers/:id
```

## Notes

- MongoDB Atlas must allow the backend server IP.
- For testing, `0.0.0.0/0` can be used in MongoDB Atlas network access, but it should be restricted for production.
- `unique: true` in Mongoose requires index creation.
- CORS must allow the deployed frontend domain.
- The frontend currently uses `PUT /customer/:id` for profile editing.
- The frontend currently uses `DELETE /customers/:id` for account deletion.
- Keep the frontend API base URL aligned with the deployed backend URL.

## Future Improvements

- Add role-based authentication.
- Add customer search.
- Add profile image upload.
- Add CI/CD with GitHub Actions.
- Add Docker Compose for local full-stack development.
- Add stronger form validation and user-friendly error messages.

## Author

Gajanan Bodhankar
