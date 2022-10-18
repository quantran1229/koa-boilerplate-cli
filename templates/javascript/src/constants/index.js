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
  
  ERROR_CODE = {};
  constructor() {}
}
