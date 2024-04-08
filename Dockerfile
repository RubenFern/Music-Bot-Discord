# Use an official Node.js runtime as the base image
FROM node:21.7.2-bookworm-slim

RUN apt update && apt install python3.11 python3-pip -y

# Create a symbolic link for Python
RUN ln -s /usr/bin/python3 /usr/bin/python

RUN npm install -g pnpm

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed packages specified in package.json
RUN pnpm install

# Copy the rest of the application to the working directory
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the application when the container launches
CMD ["node", "index.js"]