import { Global, Module } from '@nestjs/common';

import { GenerateConfirmationCodeHandler, GetConfirmationCodeHandler } from './commands';

@Global()
@Module({
  providers: [
    GenerateConfirmationCodeHandler,
    GetConfirmationCodeHandler,
  ],
  exports: [
    GenerateConfirmationCodeHandler,
    GetConfirmationCodeHandler,
  ],
})
export class ConfirmationCodeModule {}
