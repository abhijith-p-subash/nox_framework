import { Request, Response } from "express";

export function generic404(req: Request, res: Response) {
  return res.status(404).json({ message: "Not Found" });
}

export function result(
  res: Response,
  data = { message: "Ok", data: {} },
  statusCode = 200
) {
  return res.status(statusCode).json(data);
}

export function accepted(
  res: Response,
  data = { message: "Accepted", data: {} }
) {
  data.message = "Accepted";
  return res.status(202).json(data);
}

export function created(
  res: Response,
  data = { message: "Accepted", data: {} }
) {
  return res.status(201).json(data);
}

export function error(
  res: Response,
  data = { message: "Server Error", error: {} },
  statusCode = 500
) {
  return res.status(statusCode).json(data);
}

export function errorResponse(
  res: Response,
  data = { message: "Server Error", error: {} },
  statusCode = 500
) {
  return res.status(statusCode).json(data);
}

export function notFound(
  res: Response,
  data = { message: "Not Found", error: {} },
  statusCode = 404
) {
  return res.status(statusCode).json(data).end();
}

export function unauthorized(
  res: Response,
  data = { message: "Unauthorized", error: {} },
  statusCode = 401
) {
  return res.status(statusCode).json(data);
}

export function forbidden(
  res: Response,
  data = { message: "Forbidden", error: {} },
  statusCode = 403
) {
  return res.status(statusCode).json(data);
}

export function badRequest(
  res: Response,
  data = { message: "Bad Request", error: {} },
  statusCode = 400
) {
  return res.status(statusCode).json(data);
}

export function unsupportedAction(
  res: Response,
  data = { message: "Unsupported Action", error: {} },
  statusCode = 405
) {
  return res.status(statusCode).json(data);
}

export function invalid(
  res: Response,
  data = { message: "Unprocessable Entity", error: {} },
  statusCode = 422
) {
  return res.status(statusCode).json(data);
}
