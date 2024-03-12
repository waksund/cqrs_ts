export abstract class BaseResponse {
  status: number;

  constructor(status: number) {
    this.status = status;
  }
}

export class ErrorResponse extends BaseResponse {
  error?: string;

  constructor(status: number, error?: string) {
    super(status);
    this.error = error;
  }
}

export class SuccessResponse<T> extends BaseResponse {
  result?: T;

  constructor(result?: T) {
    super(200);
    this.result = result;
  }
}
