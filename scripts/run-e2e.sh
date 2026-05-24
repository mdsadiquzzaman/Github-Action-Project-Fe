#!/bin/bash
#!/bin/bash

echo "🧪 Preparing to run Frontend E2E Tests..."

# 1. Verify Backend is running
if [ "$(curl -s -o /dev/null -w '%{http_code}' http://localhost:3000/api-docs/)" != "200" ]; then
  echo "❌ Error: Backend is not running on http://localhost:3000"
  echo "👉 Please run 'npm run docker:backend' first."
  exit 1
fi

echo "✅ Backend is running."

# 2. Run Playwright (Playwright config will automatically start the Vite frontend)
echo "🚀 Starting Playwright tests..."
npx playwright test

echo "✅ E2E Tests completed!"