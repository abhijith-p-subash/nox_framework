import HttpStatus from "http-status-codes";
import { Response } from "express";
import * as moment from "moment-timezone";

/* 
  ResponseData
  Add additional info to response data
 */
const ResponseData = (data = {}) => ({ ...data });

/**
 * 200 - Http ok response
 * @params {object} res - response object
 * @params {object} data - response data
 * @returns {object} http ok response
 */
export function Result(res: Response, data?: any) {
  return res.status(HttpStatus.OK).json(ResponseData(data));
}

/**
 * 201 - Http created response
 * @params {object} res - response object
 * @params {object} data - response data
 * @returns {object} http created response
 */
export function Created(res: Response, data?: any) {
  return res.status(HttpStatus.CREATED).json(data);
}

/**
 * 400 - Http bad request response
 * @params {object} res - response object
 * @params {object} data - response error data
 * @returns {object} http error response
 */
export function BadRequest(
  res: Response,
  data = { error: {}, message: "Error" }
) {
  return res.status(HttpStatus.BAD_REQUEST).json(data);
}

/**
 * 401 - Http unauthorized response
 * @params {object} res - response object
 * @params {object} data - response error data
 * @returns {object} http error response
 */
export function Unauthorized(
  res: Response,
  data = { error: {}, message: "Error" }
) {
  return res.status(HttpStatus.UNAUTHORIZED).json(data);
}

/**
 * 403 - Http forbidden response
 * @params {object} res - response object
 * @params {object} data - response error data
 * @returns {object} http error response
 */
export function Forbidden(
  res: Response,
  data = { error: {}, message: "Error" }
) {
  return res.status(HttpStatus.FORBIDDEN).json(data);
}

/**
 * 404 - Http NotFound response
 * @params {object} res - response object
 * @params {object} data - response error data
 * @returns {object} http NotFound response
 */
export function NotFound(
  res: Response,
  data = { error: {}, message: "Not Found" }
) {
  return res.status(HttpStatus.NOT_FOUND).json(data);
}

/**
 * 500 - Http error response
 * @params {object} res - response object
 * @params {object} data - response error data
 * @returns {object} http error response
 */
export function ErrorResponse(
  res: Response,
  data = { error: {}, message: "Error" }
) {
  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json(data);
}
