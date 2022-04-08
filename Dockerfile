FROM node:16

# Create a directory for the application
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy the application files from the package
COPY . .

EXPOSE 8080
# Run the application
CMD ["npm", "app/dist/app.js"]
