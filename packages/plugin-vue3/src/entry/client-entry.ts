import { h, createSSRApp, createApp, reactive, renderSlot } from 'vue'
import { Store } from 'vuex'
import { RouteLocationNormalizedLoaded } from 'vue-router'
import { findRoute, isMicro, setStore, setPinia, setApp } from 'ssr-common-utils'
import { createPinia, Pinia } from 'pinia'
import { createRouter, createStore } from './create'
import { Routes } from './combine-router'
import { ESMFetch, IFeRouteItem } from '../types'

const { FeRoutes, App, layoutFetch } = Routes

let hasRender = false
async function getAsyncCombineData (fetch: ESMFetch | undefined, store: Store<any>, router: RouteLocationNormalizedLoaded, pinia: Pinia) {
  const layoutFetchData = layoutFetch ? await layoutFetch({ store, router, pinia }) : {}
  let fetchData = {}

  if (fetch) {
    const fetchFn = await fetch()
    fetchData = await fetchFn.default({ store, router, pinia })
  }
  return Object.assign({}, layoutFetchData ?? {}, fetchData ?? {})
}

const clientRender = async () => {
  const store = createStore()
  const router = createRouter({
    // ts-expect-error
    base: isMicro() ? window.clientPrefix : window.prefix,
    // ts-expect-error
    hashRouter: window.hashRouter
  })
  const pinia = createPinia()
  setStore(store)
  setPinia(pinia)

  // ts-expect-error
  const create = window.__USE_SSR__ ? createSSRApp : createApp

  // ts-expect-error
  if (window.__INITIAL_DATA__) {
    // ts-expect-error
    store.replaceState(window.__INITIAL_DATA__)
  }
  // ts-expect-error
  if (window.__INITIAL_PINIA_DATA__) {
    // ts-expect-error
    pinia.state.value = window.__INITIAL_PINIA_DATA__
  }

  const asyncData = reactive({
    // ts-expect-error
    value: window.__INITIAL_DATA__ ?? {}
  })
  const reactiveFetchData = reactive({
    // ts-expect-error
    value: window.__INITIAL_DATA__ ?? {}
  })
  // ts-expect-error
  const fetchData = window.__INITIAL_DATA__ ?? {} // will be remove at next major version

  const app = create({
    render () {
      return renderSlot(this.$slots, 'default', {}, () => [h(App, {
        asyncData,
        fetchData,
        reactiveFetchData,
        ssrApp: app
      })])
    }
  })
  app.use(store)
  app.use(router)
  // ts-expect-error
  app.use(pinia)
  // ts-expect-error
  setApp(app)
  router.beforeResolve(async (to, from, next) => {
    // ts-expect-error
    if (hasRender || !window.__USE_SSR__) {
      // 找到要进入的组件并提前执行 fetch 函数
      const { fetch } = findRoute<IFeRouteItem>(FeRoutes, to.path)
      const combineAysncData = await getAsyncCombineData(fetch, store, to, pinia)
      to.matched?.forEach(item => {
        item.props.default = Object.assign({}, item.props.default ?? {}, {
          fetchData: combineAysncData
        })
      })
      reactiveFetchData.value = combineAysncData
      asyncData.value = Object.assign(asyncData.value, combineAysncData)
    }
    hasRender = true
    next()
  })
  await router.isReady()

  // ts-expect-error
  app.mount(window.ssrDevInfo.rootId ?? '#app', !!window.__USE_SSR__) // judge ssr/csr
  // ts-expect-error
  if (!window.__USE_VITE__) {
    (module as any)?.hot?.accept?.() // webpack hmr for vue jsx
  }
}

clientRender()

export {
  clientRender
}
