import { Request, Response, NextFunction } from 'express';

//Unsure how to use this exactly

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if ('status' in err && 'errors' in err) { // Check if it's a validation error
    return res.status(400).json({
      status: false,
      errors: err['errors'],
    });
  }

  console.error(err);
  res.status(500).json({
    status: false,
    message: "Something went wrong",
    errorMessage: err.message,
  });
};

export const catchAsync = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err: Error) => errorHandler(err, req, res, next));
};
