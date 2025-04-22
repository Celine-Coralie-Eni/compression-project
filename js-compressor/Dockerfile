# Use the official Node.js image as the base
FROM node:18-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the entrypoint to the Node.js script
ENTRYPOINT ["node", "cli.js"]

# Set the default command to display help
CMD ["--help"]
