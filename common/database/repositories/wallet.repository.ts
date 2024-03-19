import { DataSource, Repository } from 'typeorm';
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

  async insertWalletAndWalletOperation(userId: string, amount: string): Promise<void> {
    const wallet = this.walletRepository.create({
      user: { id: userId },
      balance: amount,
    });
    const walletOperation = this.walletOperationsRepository.create({
      wallet,
      amount,
    });

    await this.dataSource.transaction(async (transactionEntityManager) => {
      await transactionEntityManager.save(wallet);
      await transactionEntityManager.save(walletOperation);
    });

    return void 0;
  }
}
