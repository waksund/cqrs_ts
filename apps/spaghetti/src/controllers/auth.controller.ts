import { randomInt } from 'node:crypto';

import Redis from 'ioredis';
import { DataSource, Repository } from 'typeorm';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { config } from '@cfg/config';
import { DISTRIBUTED_CACHE, EMAIL_PROVIDER } from '@cfg/constants';
import {
  User,
  Wallet,
  WalletOperations,
} from '@cmn/database';
import { UserStatus } from '@cmn/types';
import {
  ConfirmCodeRequestDto,
  LoginUserRequestDto,
  RegisterUserRequestDto,
} from '@spaghetti/common/dto';
import { SomeEmailLibrary } from '@spaghetti/common/email-library';
import {
  BaseResponse,
  ErrorResponse,
  SuccessResponse,
} from '@spaghetti/common/response.dto';

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
          email: request.email,
          fullName: request.fullName,
          status: UserStatus.Created,
        });
        await this.userRepository.save(user);
      }

      const code = randomInt(1000, 9999);
      await this.redisClient.set(user.id, code, 'EX', config.get('code.ttlSec'));

      await this.someEmailLibrary.sendEmail(user.email, 'Confirmation code', `Confirmation code: ${code}`);

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
      await this.redisClient.set(user.id, code, 'EX', config.get('code.ttlSec'));

      await this.someEmailLibrary.sendEmail(user.email, 'Confirmation code', `Confirmation code: ${code}`);

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

      if (user.status === UserStatus.Created) {
        const wallet = this.walletRepository.create({
          user,
          balance: '10',
        });
        const walletOperation = this.walletOperationsRepository.create({
          wallet,
          amount: '10',
        });
        user.status = UserStatus.Registered;

        await this.dataSource.transaction(async (transactionEntityManager) => {
          await transactionEntityManager.save(wallet);
          await transactionEntityManager.save(walletOperation);
          await transactionEntityManager.save(user);
        });

        await this.someEmailLibrary.sendEmail(user.email, 'Registered', 'You have successfully registered');
      }

      return new SuccessResponse();
    } catch (e) {
      console.error('some error', e);

      return new ErrorResponse(500, 'Server Error');
    }
  }
}
