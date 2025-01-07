import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET_KEY,
  jwtExpiration: process.env.JWT_EXPIRATION,
  node_env: process.env.NODE_ENV,
};

export default config;
