// @ts-no-check
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Module } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AppController } from './index.controller'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiController } from './api.controller'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiService } from './index.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Module({
  imports: [

  ],
  controllers: [AppController, ApiController],
  providers: [ApiService]
  })

// @ts-expect-error @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class indexModule {} // eslint-disable-line @typescript-eslint/no-unused-vars
