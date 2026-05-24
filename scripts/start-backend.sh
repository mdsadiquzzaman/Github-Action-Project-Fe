#!/bin/bash

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

# Assuming backend is a sibling directory named 'node-crud-api'
BACKEND_DIR="$SCRIPT_DIR/../../Github-Action-Project-Be"

echo "🚀 Starting Backend Services (MongoDB + API)..."

# Check if backend directory exists
if [ ! -d "$BACKEND_DIR" ]; then
  echo "❌ Error: Backend directory not found at $BACKEND_DIR"
  echo "👉 Please update the BACKEND_DIR variable in this script."
  exit 1
fi

# Navigate to backend and start Docker
cd "$BACKEND_DIR" || exit
docker-compose up -d --build

echo "⏳ Waiting for Backend API to be ready on http://localhost:3000..."
until [ "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/api-docs/)" = "200" ]; do
  sleep 2
done

echo "✅ Backend API is up!"
echo "🌱 Seeding the database..."
docker-compose exec -T api node src/seeders/seed.js

echo "🎉 Backend is fully ready! You can now run the frontend tests."