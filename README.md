# task_manager_app
This project is my first fullstack application built while studying the FullStackOpen course.

The goal of this app is to practice and understand how a React frontend communicates with a Node.js + Express backend and MongoDB database.

# Features
- Create tasks
- Read all tasks
- Update task status (mark as done / not done)
- Delete tasks
- Form handling with React
- Backend validation with Mongoose
- Error handling (frontend + backend)
- REST API communication using Axios

# How to run backend it locally

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager

2. Setup backend

cd backend
npm install

3. Create a .env file

MONGODB_URI=your_mongodb_connection_string
PORT=3002

4. Then run it

npm run dev

# Frontend

cd frontend
npm install
npm run dev

Frontend will run on http://localhost:5173 while backend will run on http://localhost:3002.

# Future improvements
This project wil be upgraded after completing more parts of the FullStackOpen course with:
- User authentication
- User accounts and private tasks
- Better UI and styling
- Deployment
