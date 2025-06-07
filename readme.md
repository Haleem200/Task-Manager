# Task Manager API

A full-stack task management application built with Node.js, Express.js, MongoDB, and vanilla JavaScript. This application allows users to register, authenticate, and manage their personal tasks with a clean and intuitive interface.

## 🌐 Live Demo

**[View Live Project](https://task-manager.me/)**

## 🚀 Features

- **User Authentication**: Secure user registration and login with JWT tokens
- **Task Management**: Full CRUD operations for tasks (Create, Read, Update, Delete)
- **Task Status**: Toggle tasks between "to-do" and "done" status
- **Real-time Updates**: Dynamic task editing with inline editing functionality
- **Responsive Design**: Mobile-friendly interface that works on all devices
- **Security**: Rate limiting, CORS protection, and secure password hashing
- **User-specific Tasks**: Each user can only view and manage their own tasks

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **bcrypt** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Morgan** - HTTP request logger
- **Express Rate Limit** - Rate limiting middleware

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling with responsive design
- **Vanilla JavaScript** - Client-side scripting
- **Fetch API** - HTTP requests

## 📋 Prerequisites

Before running this project, make sure you have the following installed:
- Node.js (v10.0.0 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm (Node Package Manager)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Haleem200/task-manager.git
cd task-manager
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following variables:

```env
# Database
DB=mongodb://localhost:27017/taskmanager
# Or for MongoDB Atlas:
# DB=mongodb+srv://username:password@cluster.mongodb.net/taskmanager

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=3000

# Environment
NODE_ENV=development
```

### 4. Start the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000` (or your specified PORT).

## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| POST | `/users/register` | Register a new user | No |
| POST | `/users/login` | Login user | No |

### User Management Endpoints

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| GET | `/users/` | Get all users | Yes |
| PATCH | `/users/` | Update current user | Yes |
| DELETE | `/users/` | Delete current user | Yes |

### Task Management Endpoints

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| GET | `/toDos/` | Get all tasks for current user | Yes |
| POST | `/toDos/` | Create a new task | Yes |
| PATCH | `/toDos/:id` | Update a specific task | Yes |
| DELETE | `/toDos/:id` | Delete a specific task | Yes |

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API endpoints are rate-limited to prevent abuse
- **CORS Protection**: Configured for specific allowed origins
- **Helmet**: Security headers for protection against common vulnerabilities
- **Input Validation**: Server-side validation for all user inputs
- **User Isolation**: Users can only access their own data

## 📁 Project Structure

```
task-manager/
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── errorController.js     # Global error handling
│   ├── toDoController.js      # Task CRUD operations
│   └── userController.js      # User management
├── models/
│   ├── toDoModel.js          # Task database model
│   └── userModel.js          # User database model
├── routes/
│   ├── toDoRoutes.js         # Task route definitions
│   └── userRoutes.js         # User route definitions
├── utils/
│   ├── AppError.js           # Custom error class
│   ├── catchAsyncErrors.js   # Async error wrapper
│   └── responseHandler.js    # Response formatting utility
├── public/
│   ├── css/
│   │   └── styles.css        # Frontend styles
│   ├── js/
│   │   └── scripts.js        # Frontend JavaScript
│   └── index.html            # Main HTML file
├── app.js                    # Express app configuration
├── server.js                 # Server startup
├── package.json              # Dependencies and scripts
├── .gitignore               # Git ignore rules
└── README.md                # Project documentation
```

