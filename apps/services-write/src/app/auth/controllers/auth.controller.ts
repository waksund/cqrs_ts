import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import {
  ConfirmCodeRequestDto,
  LoginUserRequestDto,
  RegisterUserRequestDto,
} from '@services-write/common/dto';
import { BaseResponse, SuccessResponse } from '@services-write/common/response.dto';

import { AuthService } from '../services/auth.service';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
        @Body() request: RegisterUserRequestDto,
  ): Promise<BaseResponse> {
    const code = await this.authService.register(request.email, request.fullName);

    return new SuccessResponse(code);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
        @Body() request: LoginUserRequestDto,
  ): Promise<BaseResponse> {
    const code = await this.authService.login(request.email);

    return new SuccessResponse(code);
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(
        @Body() request: ConfirmCodeRequestDto,
  ): Promise<BaseResponse> {
    await this.authService.confirm(request.email, request.code);

    return new SuccessResponse();
  }
}
