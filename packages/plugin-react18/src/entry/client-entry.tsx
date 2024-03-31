import { createElement } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import 'react-router' // for vite prebundle list
// import { subscribe, useSnapshot } from 'valtio';
//import {  useSnapshot, proxy } from 'valtio';
//import { subscribe } from 'valtio';
//import { proxy, subscribe } from 'valtio'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import { Provider } from 'react-redux'
import { preloadComponent, isMicro, setStoreContext, setStore } from 'ssr-common-utils'
import { wrapComponent } from 'ssr-hoc-react18'
import { LayoutProps } from 'ssr-types'
import { ssrCreateContext, Routes as R, createStore } from './create'
import { AppContext } from './context'

const { FeRoutes, layoutFetch, App } = R

const clientRender = async (): Promise<void> => {
  const IApp = App ?? function(props: LayoutProps) {
    return props.children!
  }
  const context = ssrCreateContext() as any
  setStoreContext(context)
  const store = createStore(window.__VALTIO_DATA__)
  setStore(store ?? {})
  const baseName = isMicro() ? window.clientPrefix : window.prefix
  const routes = await preloadComponent(FeRoutes, baseName)
  const container = document.querySelector(window.ssrDevInfo.rootId ?? '#app')!

  console.error('AAAAAAAAA creating store herhehrehrhehrwh', store);
  console.error('AAAAAAAAA creating store herhehrehrhehrwh', store);
  console.error('AAAAAAAAA creating store herhehrehrhehrwh', store);
  console.error('AAAAAAAAA creating store herhehrehrhehrwh', store);
  console.error('AAAAAAAAA creating store herhehrehrhehrwh', store);
  console.error('AAAAAAAAA creating store herhehrehrhehrwh', store);

  console.error('RPOVDKFJSDLKFJKSLDJFLK is :', context.Provider)  
  console.error('teh store is :', store)
   // Use useSnapshot to subscribe to changes in the store
   //const snapshot = useSnapshot(store);

/*
const state = proxy({ count: 0 })

// Subscribe to all changes to the state proxy (and its child proxies)
const unsubscribe = subscribe(state, () =>

  console.log('state has changed to', state),
)
// Unsubscribe by calling the result
unsubscribe()

8/




  /*createElement(Provider, {
    // @ts-ignore
    store: store,
    children:  
    */
  const ele =     
    createElement(BrowserRouter as any, {      
        basename: baseName,
        window,        
      }, 
      /*
      createElement(Provider, {
      // @ts-ignore
      store: useSnapshot( proxy({ store }) ),
        {
        getState: () =>  store,
        subscribe: (f: any) => {
          console.error('sUSBf :', f)
          //console.error('sUSBg :', g)
          return null; //subscribe(store, f)
        }
      },
      
      // { snapshot },
      // proxy(store), // 
      // snapshot
      
      children:
      */

      
      createElement(AppContext as any, {
          context,
          children: createElement(IApp as any, null, createElement(Routes as any, null,
              routes.map(item => {
                console.error('GOT ROUTES HERE OF:', item)
                const { fetch, component, path } = item
                component.fetch = fetch
                component.layoutFetch = layoutFetch
                const WrappedComponent = wrapComponent(component)
                console.error('calling wrapElemeth ehrehrheherhe', WrappedComponent)
                return createElement(Route as any, {
                  // exact: true,
                  path,
                  element: createElement(WrappedComponent as any, {
                    key: location.pathname
                  })
                })
              })))
            })
        //})
  )
  // })

  console.error('test elele:', ele)
  if (window.__USE_SSR__) {
    // @ts-ignore
    hydrateRoot(container, ele)
  } else {
    const root = createRoot(container)
    //@ts-ignore
    root.render(ele)
  }
  if (!window.__USE_VITE__) {
    (module as any)?.hot?.accept?.()
  }
}

clientRender()

export {
  clientRender
}
