# Task Manager

A web-based task management application that allows users to create, manage, and track their tasks efficiently. Built with Node.js and vanilla JavaScript, featuring user authentication and real-time task updates.

## 🌐 Live Demo

**[View Live Project](https://task-manager.me/)**

## Features

- **User Authentication**
  - Secure signup and login functionality
  - Password validation and confirmation
  - User session management

- **Task Management**
  - Create new tasks with titles
  - Mark tasks as "to-do", "in-progress", or "done"
  - Edit task titles
  - Delete tasks
  - Real-time task status updates

- **User Interface**
  - Clean and intuitive interface
  - Responsive design
  - Visual feedback for task status
  - Confirmation dialogs for important actions

## Technical Features

- Backend validation for user inputs
- Error handling with descriptive messages
- Secure password management
- RESTful API architecture
- Session-based authentication

## Installation

1. Clone the repository:
   ```bash
   git clone [your-repository-url]
   ```

2. Navigate to the project directory:
   ```bash
   cd Task-Manager
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Set up your environment variables (create a `.env` file):
   ```
   PORT=3000
   DATABASE_URL=your_database_url
   SESSION_SECRET=your_session_secret
   ```

5. Start the server:
   ```bash
   npm start
   ```

## API Endpoints

### User Routes
- `POST /users/register` - Register a new user
- `POST /users/login` - Login user
- `POST /users/logout` - Logout user

### Task Routes
- `GET /toDos` - Get all tasks for logged-in user
- `POST /toDos` - Create a new task
- `PATCH /toDos/:id` - Update a task
- `DELETE /toDos/:id` - Delete a task

## Validation Rules

### User Validation
- Username must be between 3 and 20 characters
- Password must be at least 8 characters
- Password confirmation must match the password

### Task Validation
- Task title must be between 4 and 30 characters
- Task status must be one of: "to-do", "in-progress", "done"

## Technologies Used

- **Frontend:**
  - HTML5
  - CSS3
  - Vanilla JavaScript

- **Backend:**
  - Node.js
  - Express.js
  - Express Validator
  - Express Session

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
