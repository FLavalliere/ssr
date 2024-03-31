import { createElement } from 'react'
import * as ReactDOM from 'react-dom'
import 'react-router' // for vite prebundle list
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { preloadComponent, isMicro, setStoreContext, setStore } from 'ssr-common-utils'
import { wrapComponent } from 'ssr-hoc-react'
import { LayoutProps } from 'ssr-types'
import { ssrCreateContext, Routes as R, createStore } from './create'
import { AppContext } from './context'
import { Provider } from 'react-redux'; // Assuming you're using Redux for state management

const { FeRoutes, layoutFetch, App } = R

const clientRender = async (): Promise<void> => {
  const IApp = App ?? function(props: LayoutProps) {
    return props.children!
  }
  const context = ssrCreateContext() as any
  setStoreContext(context)
  // @ts-ignore
  const store = createStore(window.__VALTIO_DATA__)
  setStore(store ?? {})
  // @ts-ignore
  const baseName = isMicro() ? window.clientPrefix : window.prefix
  const routes = await preloadComponent(FeRoutes, baseName)
  console.error('create lksdjfklsdjflksdjflksdjflksdjflk')
  console.error('create lksdjfklsdjflksdjflksdjflksdjflk')
  console.error('create lksdjfklsdjflksdjflksdjflksdjflk')
  console.error('create lksdjfklsdjflksdjflksdjflksdjflk')
  console.error('create lksdjfklsdjflksdjflksdjflksdjflk')
  // @ts-ignore
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    createElement(Provider, {
      store: store,
      children: 
            // @ts-ignore
            createElement(BrowserRouter, {
              basename: baseName
              // @ts-ignore
            }, createElement(AppContext, {
              context,
              // @ts-ignore
              children: createElement(Routes, null,
                // @ts-ignore
                createElement(IApp as any, null, createElement(Routes, null,
                  routes.map(item => {
                    const { fetch, component, path } = item
                    component.fetch = fetch
                    component.layoutFetch = layoutFetch
                    const WrappedComponent = wrapComponent(component)
                    const ee = () => {
                      return createElement(WrappedComponent, {
                        key: location.pathname
                      }) as React.ReactNode;
                    };
                    // @ts-ignore
                    return createElement(Route, {
                      // exact: true,
                      key: path,
                      path: path,
                      // @ts-ignore
                      element: ee,
                      // element: WrappedComponent
                    })
                  }))))
            }))
    })
    // @ts-ignore
    , document.querySelector(window.ssrDevInfo.rootId ?? '#app'))
  // @ts-ignore    
  if (!window.__USE_VITE__) {
    (module as any)?.hot?.accept?.()
  }
}

clientRender()

export {
  clientRender
}
