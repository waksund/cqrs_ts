import { NestFactory } from '@nestjs/core';

import { config } from '../../../common/config/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(config.get('app.port'));
}
bootstrap();
