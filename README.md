# CourseKit 🎓

An platform to help you monetize your courses with a modern, beautiful interface.

![CourseKit Preview](https://github.com/user-attachments/assets/3208197c-bfc3-410b-bd32-42bb80b6aa61)

## Features

- 🎨 Modern glassmorphism UI design
- 👤 User authentication (signup/signin)
- 👨‍💼 Admin dashboard for course management
- 📚 Course browsing and purchasing
- 💳 User purchase history
- 🔒 JWT-based authentication

## Tech Stack

**Frontend:**
- React 19 with Vite
- React Router for navigation
- Axios for API calls
- Lucide React for icons
- Modern CSS with glassmorphism effects

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- CORS enabled

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CourseKit
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```
   This will install dependencies for both frontend and backend.

3. **Configure environment variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_USER_PASSWORD=your_user_jwt_secret
   JWT_ADMIN_PASSWORD=your_admin_jwt_secret
   ```

### Running the Application

**Start both frontend and backend servers with a single command:**

```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:3000`
- Frontend dev server on `http://localhost:5173`

**Or run them separately:**

```bash
# Backend only
npm run backend

# Frontend only
npm run frontend
```

## Deployment

**Backend**: Already deployed at https://course-kit-backend.vercel.app/

**Frontend**: Ready for deployment! See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

The frontend is configured to use the production backend. To deploy:
1. Push your code to GitHub
2. Import to Vercel and select the `frontend` directory
3. Deploy!

For detailed instructions, see the [Deployment Guide](DEPLOYMENT.md).


### Accessing the Application

Open your browser and navigate to:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

## Project Structure

```
CourseKit/
├── backend/
│   ├── routes/          # API routes (user, admin, course)
│   ├── middleware/      # Authentication middleware
│   ├── db.js           # Database models
│   ├── config.js       # Configuration
│   └── index.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── pages/      # React pages
│   │   ├── components/ # Reusable components
│   │   ├── services/   # API service layer
│   │   └── App.jsx     # Main app component
│   └── index.html
└── package.json        # Root package with scripts
```

## Usage

### For Users
1. Sign up at `/signup`
2. Browse available courses
3. Purchase courses
4. View your purchased courses in the dashboard

### For Admins
1. Sign up at `/admin/signup`
2. Sign in at `/admin/signin`
3. Create, edit, and delete courses
4. View all your created courses

## Troubleshooting

**Network Error on Signup:**
- Ensure the backend server is running on port 3000
- Check MongoDB connection in the backend console
- Verify `MONGO_URL` is correctly set in `.env`

**Port Already in Use:**
- Kill the process using the port or change the port in config files

## License

ISC
