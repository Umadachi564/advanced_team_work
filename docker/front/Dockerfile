# Dockerfile for the fd service
FROM node:latest

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
# Install dependencies
RUN npm install react-scripts --save && npm install 

# Copy the rest of the application code

CMD ["npm", "start"]