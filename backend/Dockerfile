# Use an official Node.js runtime as a parent image
FROM node:22-alpine As development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 4000

# Define the command to run the app
CMD ["npm", "run", "dev"]
