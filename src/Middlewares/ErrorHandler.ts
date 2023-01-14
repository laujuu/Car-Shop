import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

class ErrorHandler {
  public static handle(
    error: HttpException,
    _req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const status = error.status || 500;
    const messageErr = error.message || 'Something went wrong';
    res.status(status).json({ message: messageErr });
    next();
  }
}

export default ErrorHandler;