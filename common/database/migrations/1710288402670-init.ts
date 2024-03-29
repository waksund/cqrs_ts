import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1710288402670 implements MigrationInterface {
  name = 'Init1710288402670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TYPE "public"."userStatusEnum" AS ENUM(\'created\', \'registered\')');
    await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "fullName" text NOT NULL, "status" "public"."userStatusEnum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" numeric(128,64) NOT NULL DEFAULT \'0\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "wallet_operations" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric(128,64) NOT NULL DEFAULT \'0\', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "walletId" uuid, CONSTRAINT "PK_534ee6e714d2637e8afef834b0b" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "books" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "title" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "books_reviews" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "estimate" numeric(2,1) NOT NULL, "userId" uuid NOT NULL, "bookId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0e49f22083fb24659d433ef26d0" PRIMARY KEY ("id"))');
    await queryRunner.query('ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "wallet_operations" ADD CONSTRAINT "FK_09cdc0c00d249b124359c9354ed" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "wallet_operations" DROP CONSTRAINT "FK_09cdc0c00d249b124359c9354ed"');
    await queryRunner.query('ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"');
    await queryRunner.query('DROP TABLE "books_reviews"');
    await queryRunner.query('DROP TABLE "books"');
    await queryRunner.query('DROP TABLE "wallet_operations"');
    await queryRunner.query('DROP TABLE "wallet"');
    await queryRunner.query('DROP TABLE "users"');
    await queryRunner.query('DROP TYPE "public"."userStatusEnum"');
  }
}
