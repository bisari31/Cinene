import { Response } from 'express';
import { MiddlewareRequest } from '../utils/middleware';

export interface CustomRequest<T = unknown> extends MiddlewareRequest {
  body: T;
}

interface DefaultData {
  success: boolean;
  message?: string;
}

export type CustomResponse<T = unknown> = Response<DefaultData & T>;
