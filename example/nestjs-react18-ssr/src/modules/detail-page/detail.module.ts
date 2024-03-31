// @ts-no-check
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Module } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiController } from './api.controller'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DetailController } from './detail.controller'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiDetailService } from './detail.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Module({
  imports: [

  ],
  controllers: [DetailController, ApiController],
  providers: [ApiDetailService]
  })

// @ts-expect-error @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class DetailModule {} // eslint-disable-line @typescript-eslint/no-unused-vars
