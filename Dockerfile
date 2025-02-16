# Gunakan image Node.js resmi
FROM node:22.12.0-alpine

# Set working directory di dalam container
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm install

# Copy semua file
COPY . .

# Jalankan aplikasi
CMD ["npm", "run", "dev"]

# Ekspose port (opsional, jika aplikasi jalan di port tertentu)
EXPOSE 3001