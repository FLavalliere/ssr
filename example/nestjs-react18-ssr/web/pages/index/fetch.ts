import { ReactNestFetch } from 'ssr-types'
import { IndexData } from '~/typings/data'
import { useStore } from 'ssr-common-utils'

const fetch: ReactNestFetch<{
  apiService: {
    index: () => Promise<IndexData>
  }
}> = async ({ ctx }) => {
  console.error('STATE IS :', useStore());
  const { indexState } = useStore()
  const data = __isBrowser__ ? await (await window.fetch('/api/index')).json() : await ctx!.apiService?.index()
  console.error('STORE IS :', indexState)
  indexState.indexData = data
}

export default fetch
