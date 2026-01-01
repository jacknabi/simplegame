#!/bin/bash
echo "Starting Game Project..."

# Start Server
echo "Starting Backend Server..."
cd server
npm start &
SERVER_PID=$!

# Start Client
echo "Starting Frontend Client..."
cd ../client
npm run dev &
CLIENT_PID=$!

# Handle shutdown
trap "kill $SERVER_PID $CLIENT_PID; exit" SIGINT

wait
