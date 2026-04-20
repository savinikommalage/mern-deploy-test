# User Manager

User Manager is a simple beginner-friendly MERN stack CRUD project with separate `frontend` and `backend` folders.

## Folder Structure

```text
User Manager/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── vite.config.mjs
│   └── package.json
└── README.md
```

## Backend Features

- Node.js and Express server
- MongoDB connection with Mongoose
- User model with `name`, `email`, and `age`
- Full CRUD API
- `cors()` and `express.json()`
- MongoDB connection string stored in `MONGO_URI`
- Runs on port `5000`

## Frontend Features

- React app using Vite and plain JavaScript
- Form to add and update users
- List of all users
- Delete button for removing users
- API base URL stored in one variable inside `frontend/src/App.jsx`

## API Routes

- `GET /api/users` - Get all users
- `POST /api/users` - Create a user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## How to Run

### 1. Start the Backend

Open a terminal inside `backend` and run:

```bash
npm install
```

Create a `.env` file in `backend` and add:

```env
MONGO_URI=your_mongodb_connection_string
```

Then start the backend:

```bash
npm run dev
```

The backend will run at `http://localhost:5000`.

### 2. Start the Frontend

Open another terminal inside `frontend` and run:

```bash
npm install
npm run dev
```

The frontend will run at `http://localhost:5173`.

## Notes

- Make sure MongoDB is running locally or use MongoDB Atlas.
- If you deploy the backend later, update the `API_BASE_URL` variable in `frontend/src/App.js`.
