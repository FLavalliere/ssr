// import * as React from 'react'
import 'react-router'
import { useContext, useEffect, useState, createElement } from 'react'
//import { withRouter, useParams, useNavigate } from 'react-router-dom';
// import { useParams, useNavigate, NavigateFunction  } from 'react-router-dom';
import { NavigateFunction  } from 'react-router-dom';
// import { withRouter, RouteComponentProps } from 'react-router-dom'
import { DynamicFC, StaticFC, Action, ReactESMFetch, ReactFetch } from 'ssr-types'
import { useStoreContext } from 'ssr-common-utils'

import React from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    console.error('TESTJESLKRJESLKJFKLSDJFKLSDJFLK HEREHHEHE')
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

let hasRender = false

interface fetchType {
  fetch?: ReactESMFetch;
  layoutFetch?: ReactFetch;
}

const fetchAndDispatch = async ({ fetch, layoutFetch }: fetchType, dispatch: React.Dispatch<Action>, routerProps: NavigateFunction, state: any) => {
  //const urlParams = useParams(); // Using useParams hook to get URL parameters
  //const navigate = useNavigate(); // Using useNavigate hook to access navigation function

  console.error('LAYOUT AND FETHC HERE A');
  let asyncLayoutData = {};
  let asyncData = {};
  
  if (layoutFetch) {
    console.error('LAYOUT AND FETHC HERE got layout fetch here');
    asyncLayoutData = await layoutFetch({ routerProps, state })
    // asyncLayoutData = await layoutFetch({ navigate: navigate, params: urlParams, state });
  }
  
  if (fetch) {
    console.error('LAYOUT AND FETHC HERE got fetch here 1 ');
    const fetchFn = await fetch();
    asyncData = await fetchFn.default({ routerProps, state });
  }

  const combineData = { ...asyncLayoutData, ...asyncData };

  console.error('return dispatch suing:', combineData);
  await dispatch({
    type: 'updateContext',
    payload: combineData,
  });
};
function wrapComponent(WrappedComponent: DynamicFC | StaticFC): any {
  console.error('wratp comonent here zzz:')
  console.error('wratp comonent here zzz:')
  console.error('wratp comonent here zzz:')
  console.error('wratp comonent here zzz:')
  console.error('wratp comonent here zzz:')
  return withRouter((props: any) => {
    console.error('with router here props:', props);
    const [ready, setReady] = useState(WrappedComponent.name !== 'dynamicComponent')
    // @ts-ignore
    const { state, dispatch } = useContext(useStoreContext() as any)

    console.error('with router here props: A', props);
    useEffect(() => {
      didMount()
    }, [])

    const didMount = async () => {
      console.error('with router did mount ...: A', props);
      // @ts-ignore
      if (hasRender || !window.__USE_SSR__) {
        // ssr 情况下只有路由切换的时候才需要调用 fetch
        // csr 情况首次访问页面也需要调用 fetch
        const { fetch, layoutFetch } = (WrappedComponent as DynamicFC)
        await fetchAndDispatch({ fetch, layoutFetch }, dispatch!, props, state)
        console.error('with router did completed where...', props, state);
        if (WrappedComponent.name === 'dynamicComponent') {
          WrappedComponent = (await (WrappedComponent as DynamicFC)()).default
          WrappedComponent.fetch = fetch
          WrappedComponent.layoutFetch = layoutFetch
          console.error('with router set ready here.... ');
          setReady(true)
        }
      }
      hasRender = true
    }
    console.error('ready ? or create element using ',WrappedComponent, ' and ' , props );
    return (      
      // @ts-ignore
      ready ? createElement(WrappedComponent, { ...props }) : null
    )
  })
}

export {
  wrapComponent
}
