import { DataSource, Repository } from 'typeorm';
import { v4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Wallet, WalletOperations } from '../entities';

@Injectable()
export class WalletRepository {
  constructor(
        @InjectRepository(Wallet)
        private readonly walletRepository: Repository<Wallet>,
        @InjectRepository(WalletOperations)
        private readonly walletOperationsRepository: Repository<WalletOperations>,
        private readonly dataSource: DataSource,
  ) {
  }

  async walletExists(userId: string): Promise<boolean> {
    return await this.walletRepository.existsBy({ user: { id: userId } });
  }

  async insertWalletAndWalletOperation(userId: string, amount: string): Promise<void> {
    const wallet = this.walletRepository.create({
      id: v4(),
      user: { id: userId },
      balance: amount,
    });
    const walletOperation = this.walletOperationsRepository.create({
      wallet,
      amount,
    });

    await this.dataSource.transaction(async () => {
      await this.walletRepository.insert(wallet);
      await this.walletOperationsRepository.insert(walletOperation);
    });

    return void 0;
  }
}
