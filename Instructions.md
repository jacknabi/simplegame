# NeonClicker Game Project

## Setup

1.  **Database Connection**:
    Open `server/.env` and Replace the `MONGO_URI` with your actual MongoDB connection string.
    It should look like: `mongodb+srv://<username>:<password>@cluster0.khvggsw.mongodb.net/game_db?retryWrites=true&w=majority`
    *Note: You need to create a database user in MongoDB Atlas and replace <username> and <password>.*

2.  **Install Dependencies** (if you haven't already):
    ```bash
    cd server && npm install
    cd ../client && npm install
    ```

## Running the Project

To start both the backend server and the frontend client, simply run:

```bash
./start.sh
```

Or manually:

**Server**:
```bash
cd server
npm start
```
(Runs on http://localhost:5000)

**Client**:
```bash
cd client
npm run dev
```
(Runs on http://localhost:5173 usually)

## Features

- **Authentication**: Sign Up and Login with secure password hashing (bcrypt) and JWT tokens.
- **Game**: "Neon Rush" - a 30-second fast-paced target clicking game.
- **High Scores**: Automatically saves your new high score to the database if you beat your previous best.
- **UI**: Modern Dark/Neon aesthetic using Tailwind CSS.
