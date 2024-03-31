// @ts-no-check
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Controller, Get, Req, Res } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Request, Response } from 'express'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render } from 'ssr-core'

import { ApiDetailService } from './detail.service'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Controller('/')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class DetailController {
  constructor (private readonly apiDeatilservice: ApiDetailService) {}

  @Get('/detail/:id')
  async handlerDetail (@Req() req: Request, @Res() res: Response): Promise<any> {
    const ctx = {
      request: req,
      response: res,
      apiDeatilservice: this.apiDeatilservice
    }
    const stream = await render(ctx, {
      stream: true,
      onError: (err) => {
        console.log('ssr error', err)
        render(ctx, {
          stream: true,
          mode: 'csr'
        }).then(csrStream => {
          csrStream.pipe(res)
        })
        return null
      },
      onReady () {
        // for normal ssr end
        stream.pipe(res)
      }
    })
  }
}
