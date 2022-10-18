/* eslint-disable require-jsdoc */
// Load .env
import dotenv from 'dotenv';
dotenv.config();

// Constant class to store constant value + value set using ENV
export default class Constant {
  static instance = new Constant();
  // Default Http Code
  HTTP_CODE = {
    Success: 200,
    Created: 201,
    SuccessNoContent: 204,
    BadRequest: 400,
    Unauthenticated: 401,
    Unauthorized: 403,
    NotFound: 404,
    Conflict: 409,
    BodyParseError: 422,
    InternalError: 500,
    Moved: 301,
  };

  // Set Constant variable as ENV variable
  APP_PORT = process.env.APP_PORT || 3000; // Port default 3000;
  APP_HOST = process.env.APP_HOST;
  STAGE = process.env.STAGE;
  LOGS_PATH = process.env.LOGS_PATH;

  // Database config
  DATABASE_CONFIG = {
    dialect: process.env.DATABASE_DIALECT,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    logging: process.env.DATABASE_LOGGING,
  };

  ERROR_CODE = {};
  constructor() {}
}
