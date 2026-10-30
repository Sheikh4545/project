FROM mcr.microsoft.com/playwright:v1.63.0-noble

# Set working directory inside container
WORKDIR /app

# Copy dependency manifests
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Default environment variables
ENV CI=true

# Default command to run Playwright tests
CMD ["npx", "playwright", "test"]
