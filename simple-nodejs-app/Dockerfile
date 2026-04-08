# 1. Use an official lightweight Node.js image
FROM node:20-slim

# 2. Set the working directory
WORKDIR /app

# 3. Copy only dependency files first to leverage Docker's layer caching
COPY package*.json ./

# 4. Install dependencies (using clean install for reproducibility)
RUN npm ci --only=production

# 5. Copy the rest of the application files
COPY . .

# 6. Set environment variables (optional: best managed via Docker Compose)
ENV NODE_ENV=production

# 7. Expose the application port
EXPOSE 3000

# 8. Start the application
CMD ["node", "app.js"]
