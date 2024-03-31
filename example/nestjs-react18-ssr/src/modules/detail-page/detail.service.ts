// @ts-no-check
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DetailData } from '~/typings/data'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import mock from './detail.mock'

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ApiDetailService {
  async index (id): Promise<DetailData> {
    return await Promise.resolve(mock.data[id])
  }
}
