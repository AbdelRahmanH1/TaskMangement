# Task Manager with User Authentication

This project is a simple task manager application with user authentication features. It allows users to register, log in, manage tasks, upload a profile picture, and reset their passwords.

## Features

1. **User Authentication**
   - User registration with hashed password storage using bcrypt.
   - User login with JWT token generation upon successful authentication.
   - Middleware to protect routes that require authentication.

2. **Email Verification**
   - Verification email sent upon user registration with a unique token.
   - Endpoint to handle email verification based on the received token.

3. **Task Management**
   - CRUD operations for tasks (Create, Read, Update, Delete).
   - Secure task routes, allowing only authenticated users to manage their tasks.

4. **File Upload**
   - Profile picture upload feature using Multer.
   - Uploaded image associated with the user's profile.

5. **Additional Features**
   - Password reset functionality through email for users who forget their passwords.
   - Input validation using Joi.
   - Error handling middleware for improved robustness.

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/task-manager.git


## API Documentation

| Endpoint                  | Method | Description                     |
|---------------------------|--------|---------------------------------|
| /api/register             | POST   | Register a new user            |
| /api/login                | POST   | Log in an existing user        |
| /api/verify-email/:token  | GET    | Verify email using token       |
| /api/tasks                | GET    | Get all tasks for the user     |
| /api/tasks/:id            | GET    | Get a specific task by ID      |
| /api/tasks                | POST   | Create a new task              |
| /api/tasks/:id            | PUT    | Update an existing task        |
| /api/tasks/:id            | DELETE | Delete an existing task        |
| /api/upload-profile-pic   | POST   | Upload profile picture         |
| /api/reset-password       | POST   | Reset password for a user      |

Additionally, if you have specific API documentation, you can include it in a separate `docs` directory and reference it in the README. Similarly, if you have multiple contributors, you can list them accordingly.

Feel free to adjust and expand upon this template based on your project's specific requirements and needs.

