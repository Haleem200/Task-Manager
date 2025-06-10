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
- **Express Validator** - Input validation
- **Cookie Parser** - Cookie handling
- **Compression** - Response compression
- **Swagger** - API documentation
- **dotenv** - Environment variables

### Frontend
- **HTML5** - Markup language
- **CSS3** - Styling with responsive design
- **Vanilla JavaScript** - Client-side scripting
- **Fetch API** - HTTP requests

## 🚀 Deployment

The application is deployed on AWS EC2 with the following production setup:

- **Server**: Amazon EC2 instance running Ubuntu
- **Process Manager**: PM2 for Node.js application management
  - Zero-downtime deployments
  - Automatic restart on crashes
  - Load balancing capabilities
  - Application logs management
- **Reverse Proxy**: Nginx
  - SSL/TLS termination
  - Static file serving
  - Load balancing
  - Gzip compression
- **Domain & SSL**: Custom domain with Let's Encrypt SSL certificate
- **Monitoring**: PM2 monitoring and logging

The deployment uses industry-standard practices for security, performance, and reliability:
- Regular security updates
- SSL/TLS encryption
- Process management and monitoring
- Automated backups
- Error logging and monitoring
## 📡 API Endpoints

### Authentication Endpoints

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| POST | `/users/register` | Register a new user | No |
| POST | `/users/login` | Login user | No |
| POST | `/users/logout` | Logout user | Yes |

### User Management Endpoints

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| PATCH | `/users/` | Update current user | Yes |
| DELETE | `/users/` | Delete current user | Yes |

### Task Management Endpoints

| Method | Endpoint | Description | Authentication Required |
|--------|----------|-------------|------------------------|
| GET | `/toDos/` | Get all tasks for current user | Yes |
| POST | `/toDos/` | Create a new task | Yes |
| PATCH | `/toDos/:id` | Update a specific task | Yes |
| DELETE | `/toDos/:id` | Delete a specific task | Yes |


## 🗄️ Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  firstname: String (optional, 3-15 chars),
  age: Number (minimum 13),
  password: String (required, min 8 chars, hashed, not selected by default),
  passwordConfirm: String (required for validation, not stored)
}
```

### Task (ToDo) Model
```javascript
{
  user: ObjectId (reference to User),
  title: String (required, 4-30 chars),
  status: String (required, default: 'to-do'),
  tags: [String] (optional, max 10 chars each),
  createdAt: Date (automatic),
  updatedAt: Date (automatic)
}
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API endpoints are rate-limited to prevent abuse
- **CORS Protection**: Configured for specific allowed origins
- **Helmet**: Security headers for protection against common vulnerabilities
- **Input Validation**: Server-side validation for all user inputs
- **User Isolation**: Users can only access their own data

## 🎨 Frontend Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Inline Editing**: Edit task titles directly without opening separate forms
- **Status Toggle**: Quick checkbox to mark tasks as done/undone
- **Real-time Updates**: Changes are immediately reflected in the UI
- **Confirmation Dialogs**: Prevent accidental task deletion
- **Clean UI**: Modern and intuitive user interface

## 📁 Project Structure

```bash
Task-Manager/
│
├── 📂 controllers/
│   ├── authController.js        # Authentication logic
│   ├── errorController.js       # Global error handling
│   ├── toDoController.js        # Task CRUD operations
│   ├── userController.js        # User management
│   └── validationController.js  # Input validation rules
│
├── 📂 models/
│   ├── toDoModel.js            # Task database model
│   └── userModel.js            # User database model
│
├── 📂 routes/
│   ├── toDoRoutes.js           # Task route definitions
│   └── userRoutes.js           # User route definitions
│
├── 📂 utils/
│   ├── AppError.js             # Custom error class
│   ├── catchAsyncErrors.js     # Async error wrapper
│   └── responseHandler.js       # Response formatting utility
│
├── 📂 public/
│   ├── 📂 css/
│   │   └── styles.css          # Frontend styles
│   ├── 📂 js/
│   │   └── scripts.js          # Frontend JavaScript
│   └── index.html              # Main HTML file
│
├── 📂 logs/                     # Application logs (not in repo)
│
├── app.js                       # Express app configuration
├── server.js                    # Server startup
├── ecosystem.config.js          # PM2 configuration
├── package.json                 # Dependencies and scripts
├── .gitignore                  # Git ignore rules
└── README.md                   # Project documentation
```

