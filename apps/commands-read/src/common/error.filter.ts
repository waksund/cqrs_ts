import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import type { Response } from 'express';

import { ErrorResponse } from './response.dto';

@Catch()
export class ErrorFilter {
  public catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log('error', {
      path: request.url,
      headers: request.headers,
      error: exception,
    });

    const errorResponse = exception as ErrorResponse;
    if (errorResponse && errorResponse.error) {
      response
        .status(HttpStatus.OK)
        .json(new ErrorResponse(errorResponse.status, errorResponse.error));

      return;
    }

    const httpError = exception as HttpException;
    if (httpError.getStatus) {
      const errorResponse = httpError.getResponse() as HttpException;
      response
        .status(HttpStatus.OK)
        .json(new ErrorResponse(httpError.getStatus(), errorResponse.message));

      return;
    }

    response
      .status(HttpStatus.OK)
      .json(new ErrorResponse(500, 'Server Error'));
  }
}
