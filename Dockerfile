# Use Node.js 18 as base image
FROM node:18 AS builder

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build TypeScript code
RUN npm run build

# Use smaller Node.js image for production
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy only built files from previous stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./

# Expose port
EXPOSE 3000

# Command to run the application
CMD ["node", "./dist/index.js"]