import { createContext } from 'react'
import type { IContext } from 'ssr-types'
import { proxy } from 'valtio'
import { deepClone } from 'ssr-deepclone'
import { combineRoutes } from 'ssr-common-utils'
import * as declareRoutes from '_build/ssr-declare-routes'
import * as ManualRoutes from '_build/ssr-manual-routes'
import { ReactRoutesType } from 'ssr-types'
// import {createStore as cc, applyMiddleware} from 'redux';

export const Routes = combineRoutes(declareRoutes, ManualRoutes) as ReactRoutesType

export const ssrCreateContext = () => {
  const context = createContext<IContext>({
    state: {}
  })
  if (__isBrowser__) {
    window.STORE_CONTEXT = context
  }
  return context
}

export function createStore (initialData?: any) {
  console.error('create store here init data:', initialData);
  const { store } = Routes
  console.error('the store obj :', store)
  const storeInstance = initialData ? store : deepClone(store)  
  for (const key in storeInstance) {
    console.error('in here... ' , key);
    storeInstance[key] = initialData ? proxy(initialData[key]) : proxy(storeInstance[key])
  }

  //const s = cc(()=>[], storeInstance, applyMiddleware());
  //return s;
  console.error('Regurning store heofhe', storeInstance)
  return storeInstance
}



