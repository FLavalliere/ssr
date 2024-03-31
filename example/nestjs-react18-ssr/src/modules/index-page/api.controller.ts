// @ts-no-check
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiService } from './index.service'

@Controller('/api')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ApiController {
  constructor (private readonly apiService: ApiService) {}

  @Get('/index')
  async getIndexData (): Promise<any> {
    return await this.apiService.index()
  }
}
