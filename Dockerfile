# Stage 1: Build the React Application
FROM node:20-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Build the app. Vite will output to /app/dist
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# NOTE: If you deploy this to a server, you will need to add a Vite .env 
# variable for VITE_API_URL so it points to your live backend URL instead of localhost.
# For local Docker, the React code hardcodes http://localhost:3000/api.

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]