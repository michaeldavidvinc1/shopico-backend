import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
  node_env: process.env.NODE_ENV,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloud_api_key: process.env.CLOUDINARY_API_KEY,
  cloud_api_secret: process.env.CLOUDINARY_API_SECRET,
  host: process.env.HOST
};

export default config;
