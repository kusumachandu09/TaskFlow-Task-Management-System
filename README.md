                                     TaskFlow – Task Management System
TaskFlow is a full-stack task management application designed to help users organize, manage, and track their daily tasks efficiently. It provides a simple interface for managing tasks with a React frontend, Spring Boot backend, and MySQL database.

Features
- Create new tasks
- View and manage tasks
- Edit existing tasks
- Delete tasks
- Track task status
- Search and filter tasks (if enabled in the current version)

Technologies Used
Frontend
- React.js
- Vite
- JavaScript
- CSS

Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs

Database
- MySQL

Tools
- Visual Studio Code
- MySQL Workbench
- Git and GitHub
- Maven
- npm

Project Structure
TaskFlow/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── mvnw
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md

Prerequisites
Make sure you have installed:
- Java JDK
- Node.js and npm
- MySQL Server
- MySQL Workbench (optional)
- Git

Database Setup
1. Open MySQL Workbench.
2. Create a database:
CREATE DATABASE task_management;
3. Configure your database username and password locally.
4. Set the "DB_PASSWORD" environment variable before starting the backend.
Note: Never upload your actual database password to GitHub.

How to Run the Project
1. Clone the Repository
git clone https://github.com/kusumachandu09/TaskFlow-Task-Management-System.git

2. Start the Backend
Open a terminal:
cd TaskFlow-Task-Management-System/backend
Set your MySQL password in PowerShell:
$env:DB_PASSWORD="YOUR_MYSQL_PASSWORD"

Run Spring Boot:
.\mvnw.cmd spring-boot:run

Backend runs at:
"http://localhost:8080"

3. Start the Frontend
Open a second terminal:
cd TaskFlow-Task-Management-System/frontend
Install dependencies:
npm install
Start the application:
npm run dev
Open the local URL displayed in your terminal, usually:
"http://localhost:5173"

API Endpoint
Method| Endpoint| Purpose
GET| "/api/tasks"| Retrieve tasks
POST| "/api/tasks"| Create a task
PUT| "/api/tasks/{id}"| Update a task
DELETE| "/api/tasks/{id}"| Delete a task

Learning Outcomes
Through this project, I gained practical experience in:
- Full-stack application development
- React frontend development
- Java and Spring Boot backend development
- REST API integration
- MySQL database connectivity
- CRUD operations
- Connecting frontend and backend services
  
Future Improvements
- User authentication and login
- Task reminders and notifications
- Dashboard with task statistics
- Improved responsive design
  
Author
Kusuma Chikkala
GitHub: "kusumachandu09" (https://github.com/kusumachandu09)
---
TaskFlow – Organize your tasks. Manage your time. Stay productive.
