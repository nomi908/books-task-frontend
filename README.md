# Books Task Backend

This is the backend API for the **Books Task** application. The backend is built using **Node.js** and **Express** framework. It connects to a **MongoDB** database using **Mongoose** ORM, and provides routes for managing books data.

## Features

- **MongoDB Atlas** integration to store and retrieve book data.
- **CORS** configuration to allow cross-origin requests from both local and deployed frontend.
- Provides **RESTful APIs** for managing books:
  - `GET /api/books` - Retrieve all books

## Requirements

- Node.js (v14 or higher)
- MongoDB Atlas account
- `.env` file for environment variables

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nomi908/books-task-frontend.git
   cd books-task-backend
Install dependencies:

bash
Copy
Edit
npm install
Create a .env file in the root directory of the project and add your MongoDB URI:

env
Copy
Edit
MONGODB_URI=your_mongodb_atlas_connection_string
Start the server locally:

bash
Copy
Edit
npm start
The server will run on https://books-task-production.up.railway.app/api/books.

Environment Variables
MONGODB_URI: MongoDB Atlas connection URI. You can get this from your MongoDB Atlas dashboard.

CORS Configuration
This backend allows cross-origin requests from:

Local frontend: http://localhost:3000

Deployed frontend: https://books-task-frontend.vercel.app

If you're working with a local frontend, make sure it's running on localhost:3000 or update the CORS settings accordingly.

Deployment
Deploying on Railway:
Connect the repository to Railway.

Set the environment variables on Railway (same as .env file).

Deploy the backend by following Railway's deployment instructions.

Contributing
Feel free to fork this repository and submit pull requests. Make sure to add appropriate tests for any new features you introduce.

License
This project is licensed under the MIT License - see the LICENSE file for details.

markdown
Copy
Edit

### Key Sections:

1. **Features**: Describes what the backend does (e.g., managing books, CORS, API routes).
2. **Requirements**: Lists dependencies such as Node.js and MongoDB Atlas.
3. **Installation**: Steps to clone and run the project locally.
4. **Environment Variables**: Explains the necessary environment variables, such as the MongoDB URI.
5. **CORS Configuration**: Specifies the allowed frontend URLs (local and deployed).
6. **Deployment**: Guides for deploying the backend (e.g., Railway or other platforms).
7. **Contributing**: Instructions for others to contribute to the project.
8. **License**: Adds a standard open-source license note.









