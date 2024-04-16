import { NextFunction } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log('This is a middleware from logger');
  next();
};
