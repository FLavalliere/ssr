// @ts-no-check
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IndexData } from '~/typings/data'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mock from './index.mock'

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ApiService {
  async index (): Promise<IndexData> {
    return await Promise.resolve(mock)
  }
}
