import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const currentDate = new Date();
  console.log(
    `Ejecutando Middleware: método ${req.method} en la ruta ${req.url} el día ${currentDate.toISOString()}`,
  );
  next();
}
