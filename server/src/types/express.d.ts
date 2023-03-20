import { Response } from 'express';
import { MiddlewareRequest } from '../utils/middleware';

export interface CustomRequest<T = unknown, U = unknown, V = unknown>
  extends MiddlewareRequest {
  params: T;
  query: U;
  body: V;
}

interface DefaultData {
  success: boolean;
  message?: string;
}

export type CustomResponse<T = unknown> = Response<DefaultData & T>;
