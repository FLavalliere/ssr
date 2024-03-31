// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Module } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DetailModule } from './modules/detail-page/detail.module'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { indexModule } from './modules/index-page/index.module'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Module({
  imports: [DetailModule, indexModule]
  })
// @ts-expect-error @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {} // eslint-disable-line @typescript-eslint/no-unused-vars
