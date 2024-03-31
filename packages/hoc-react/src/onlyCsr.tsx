// 通过使用该HOC使得组件只在客户端进行渲染
import * as React from 'react'
import { useState, useEffect } from 'react'
import { SProps } from 'ssr-types'

// @ts-ignore
type FC<T = {}, U = {}> = (props: Partial<SProps<T>> & Partial<U>) => JSX.Element;

function onlyCsr<T = {}, U = {}>(WrappedComponent: FC<T, U>) {
  // @ts-ignore
  return (props: Partial<SProps<T>> & U) => {
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
      setIsClient(true);
    }, []);
    return (
      // @ts-ignore
      isClient ? <WrappedComponent {...props}></WrappedComponent> : <></>
    );
  };
}

export {
  onlyCsr
}
