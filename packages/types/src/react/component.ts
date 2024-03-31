import type { ReactChild, Context } from 'react'
import type { NavigateOptions } from 'react-router-dom'
import type { IContext } from './route'

type IProps<T = {}> = T & {
  children: ReactChild
  initialState?: any
  context: Context<IContext>
}

type SProps<T = {}> = T & NavigateOptions

interface Action {
  type: string
  payload: object
}

export {
  IProps,
  Action,
  SProps
}
