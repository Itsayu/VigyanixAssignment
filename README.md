# Vigyanix Assignment

This repository contains a task management application built using React.js for the frontend and Node.js with Express for the backend. The application allows users to create, view, and complete tasks with specific hours and notes.

## Table of Contents
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [React Components](#react-components)
- [Key Features](#key-features)

## Technologies Used
- **Frontend**: React.js, React Bootstrap, Axios, React Quill
- **Backend**: Node.js, Express.js, Mongoose (MongoDB)
- **Styling**: Bootstrap

## File Structure

VigyanixAssignment/
│
├── backend/
│ ├── models/
│ │ └── task.js
│ ├── routes/
│ │ └── tasks.js
│ └── server.js
│
├── frontend/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── components/
│ │ │ ├── TaskForm.js
│ │ │ ├── TaskList.js
│ │ │ └── CompleteTaskModal.js
│ │ ├── App.css
│ │ ├── App.js
│ │ └── index.js
│ ├── package.json
│ └── README.md
│
└── README.md



## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Itsayu/VigyanixAssignment.git
   cd VigyanixAssignment

Install dependencies for both the frontend and backend:

## For the backend:
   ```bash
   cd backend
   npm install

## For the frontend:
   ```bash
   cd frontend
   npm install

## Running the Server
Start the backend server:
   ```bash
   cd backend
   node server.js

## Start the frontend development server:
   ```bash
   cd frontend
   npm start

The backend server will run on http://localhost:5000 and the frontend on http://localhost:3000.

React Components
TaskForm.js
This component renders a form to create a new task with task number, estimated hours, and estimated notes using a rich text editor.

TaskList.js
This component displays the list of tasks. Each task can be marked as complete, which opens a modal to input actual hours and final notes.

CompleteTaskModal.js
This component is a modal that appears when a task is to be marked as complete. It allows the user to input the actual hours spent and add final notes using a rich text editor.

Key Features
Task Management: Create, view, and complete tasks.
Rich Text Editor: Add detailed notes using React Quill.
Validation: Ensures estimated and actual hours are properly formatted.
Responsive UI: Styled using React Bootstrap for a modern and responsive design.
By following these instructions, you should be able to set up and run the task management application locally. If you encounter any issues, please refer to the code and the configuration files for additional details.
