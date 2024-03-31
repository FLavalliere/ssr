// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Param } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiDetailService } from './detail.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Controller('/api')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ApiController {
  constructor (private readonly apiDetailService: ApiDetailService) {}

  @Get('/detail/:id')
  async getDetailData (@Param() params) {
    const data = await this.apiDetailService.index(params.id)
    return data
  }
}
