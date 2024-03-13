import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import {
  ConfirmCodeRequestDto,
  LoginUserRequestDto,
  RegisterUserRequestDto,
} from '@commands-write/common/dto';
import { BaseResponse, SuccessResponse } from '@commands-write/common/response.dto';

import { ConfirmCommand } from '../commands/confirm.command';
import { LoginUserCommand } from '../commands/login-user.command';
import { RegisterUserCommand } from '../commands/register-user.command';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
        @Body() request: RegisterUserRequestDto,
  ): Promise<BaseResponse> {
    const code = await this.commandBus.execute(new RegisterUserCommand(request.email, request.fullName));

    return new SuccessResponse(code);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
        @Body() request: LoginUserRequestDto,
  ): Promise<BaseResponse> {
    const code = await this.commandBus.execute(new LoginUserCommand(request.email));

    return new SuccessResponse(code);
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(
        @Body() request: ConfirmCodeRequestDto,
  ): Promise<BaseResponse> {
    await this.commandBus.execute(new ConfirmCommand(request.email, request.code));

    return new SuccessResponse();
  }
}
