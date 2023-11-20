# Use an official Node runtime as a parent image
FROM node:alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install --force

# Copy the current directory contents into the container at /app
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Use Nginx to serve the production build
FROM nginx:alpine


COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy the build output from the previous stage to the nginx web server directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run the application
CMD ["nginx", "-g", "daemon off;"]