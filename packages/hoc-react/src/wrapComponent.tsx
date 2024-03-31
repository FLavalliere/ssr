// import * as React from 'react'
import 'react-router'
import { useContext, useEffect, useState, createElement } from 'react'
//import { withRouter, useParams, useNavigate } from 'react-router-dom';
// import { useParams, useNavigate, NavigateFunction } from 'react-router-dom';
import { NavigateFunction } from 'react-router-dom';
// import { withRouter, RouteComponentProps } from 'react-router-dom'
import { DynamicFC, StaticFC, Action, ReactESMFetch, ReactFetch } from 'ssr-types'
import { useStoreContext } from 'ssr-common-utils'
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function withRouter<ComponentProps>(Component: React.FunctionComponent<ComponentProps>) {
    function ComponentWithRouterProp(props: ComponentProps) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return <Component {...props} router={{ location, navigate, params }} />;
    }

    return ComponentWithRouterProp;
}


let hasRender = false

interface fetchType {
  fetch?: ReactESMFetch;
  layoutFetch?: ReactFetch;
}

const fetchAndDispatch = async ({ fetch, layoutFetch }: fetchType, dispatch: React.Dispatch<Action>, routerProps: NavigateFunction, state: any) => {
// const fetchAndDispatch = async ({ fetch, layoutFetch }: fetchType, dispatch: Dispatch<Action>, state: any) => {
  // const urlParams = useParams(); // Using useParams hook to get URL parameters
  // const navigate = useNavigate(); // Using useNavigate hook to access navigation function

  let asyncLayoutData = {};
  let asyncData = {};
  
  if (layoutFetch) {
    asyncLayoutData = await layoutFetch({ routerProps, state })
    // asyncLayoutData = await layoutFetch({ params: urlParams, state });
  }
  
  if (fetch) {
    const fetchFn = await fetch();
    asyncData = await fetchFn.default({ routerProps, state });
  }

  const combineData = { ...asyncLayoutData, ...asyncData };

  await dispatch({
    type: 'updateContext',
    payload: combineData,
  });
};
function wrapComponent(WrappedComponent: DynamicFC | StaticFC): any {
  // @ts-ignore
  return withRouter((props: any) => {
    const [ready, setReady] = useState(WrappedComponent.name !== 'dynamicComponent')
    // @ts-expect-error
    const { state, dispatch } = useContext(useStoreContext() as any)

    useEffect(() => {
      didMount()
    }, [])

    const didMount = async () => {
      // @ts-ignore
      if (hasRender || !window.__USE_SSR__) {
        // ssr 情况下只有路由切换的时候才需要调用 fetch
        // csr 情况首次访问页面也需要调用 fetch
        const { fetch, layoutFetch } = (WrappedComponent as DynamicFC)
        await fetchAndDispatch({ fetch, layoutFetch }, dispatch!, props, state)
        if (WrappedComponent.name === 'dynamicComponent') {
          WrappedComponent = (await (WrappedComponent as DynamicFC)()).default
          WrappedComponent.fetch = fetch
          WrappedComponent.layoutFetch = layoutFetch
          setReady(true)
        }
      }
      hasRender = true
    }
    return (
      ready ? createElement(WrappedComponent, { ...props }) : null
    )
  })
}

export {
  wrapComponent
}
