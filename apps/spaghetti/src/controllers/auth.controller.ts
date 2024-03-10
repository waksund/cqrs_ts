import { randomInt } from 'node:crypto';

import Redis from 'ioredis';
import { DataSource, Repository } from 'typeorm';
import { v4 } from 'uuid';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { config } from '../../../../common/config/config';
import { DISTRIBUTED_CACHE, EMAIL_PROVIDER } from '../../../../common/config/constants';
import {
  Wallet,
  WalletOperations,
  User,
} from '../../../../common/database';
import { ConfirmCodeRequestDto } from '../common/dto/confirm-code.dto';
import { LoginUserRequestDto } from '../common/dto/login-user.dto';
import { RegisterUserRequestDto } from '../common/dto/register-user.dto';
import {
  type BaseResponse,
  ErrorResponse,
  SuccessResponse,
} from '../common/dto/response.dto';
import { SomeEmailLibrary } from '../common/email-library';

@Controller({
  path: 'auth',
})
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(WalletOperations)
    private readonly walletOperationsRepository: Repository<WalletOperations>,
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    private readonly dataSource: DataSource,
    @Inject(DISTRIBUTED_CACHE) private readonly redisClient: Redis,
    @Inject(EMAIL_PROVIDER) private readonly someEmailLibrary: SomeEmailLibrary,
  ) {
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() request: RegisterUserRequestDto,
  ): Promise<BaseResponse> {
    try {
      if (!request.email) {
        return new ErrorResponse(400, 'bad argument: \'email\'');
      }

      if (!request.fullName) {
        return new ErrorResponse(400, 'bad argument: \'fullName\'');
      }

      let user = await this.userRepository.findOneBy({ email: request.email });
      if (!user) {
        user = this.userRepository.create({
          id: v4(),
          email: request.email,
          fullName: request.fullName,
        });
        await this.userRepository.insert(user);
      }

      const code = randomInt(1000, 9999);
      this.redisClient.set(user.id, code, 'EX', config.get('code.ttlSec'));

      this.someEmailLibrary.sendEmail(user.email, 'Confirmation code', `Confirmation code: ${code}`);

      return new SuccessResponse(code);
    } catch (e) {
      console.error('some error', e);

      return new ErrorResponse(500, 'Server Error');
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() request: LoginUserRequestDto,
  ): Promise<BaseResponse> {
    try {
      if (!request.email) {
        return new ErrorResponse(400, 'bad argument: \'email\'');
      }

      const user = await this.userRepository.findOneBy({ email: request.email });
      if (!user) {
        return new SuccessResponse();
      }

      const code = randomInt(1000, 9999);
      this.redisClient.set(user.id, code, 'EX', config.get('code.ttlSec'));

      this.someEmailLibrary.sendEmail(user.email, 'Confirmation code', `Confirmation code: ${code}`);

      return new SuccessResponse(code);
    } catch (e) {
      console.error('some error', e);

      return new ErrorResponse(500, 'Server Error');
    }
  }

  @Post('confirm')
  @HttpCode(HttpStatus.OK)
  async confirm(
    @Body() request: ConfirmCodeRequestDto,
  ): Promise<BaseResponse> {
    try {
      if (!request.email) {
        return new ErrorResponse(400, 'bad argument: \'email\'');
      }

      if (!request.code) {
        return new ErrorResponse(400, 'bad argument: \'code\'');
      }

      const user = await this.userRepository.findOneBy({ email: request.email });
      if (!user) {
        return new ErrorResponse(400, 'user not found');
      }

      const code = await this.redisClient.get(user.id);
      if (code !== request.code) {
        return new ErrorResponse(400, 'bad argument: \'code\'');
      }

      const userBalanceExists = await this.walletRepository.existsBy({ user });
      if (!userBalanceExists) {
        const wallet = this.walletRepository.create({
          id: v4(),
          user,
          balance: '10',
        });
        const walletOperation = this.walletOperationsRepository.create({
          wallet,
          amount: '10',
        });

        await this.dataSource.transaction(async () => {
          await this.walletRepository.insert(wallet);
          await this.walletOperationsRepository.insert(walletOperation);
        });
      }

      return new SuccessResponse();
    } catch (e) {
      console.error('some error', e);

      return new ErrorResponse(500, 'Server Error');
    }
  }
}