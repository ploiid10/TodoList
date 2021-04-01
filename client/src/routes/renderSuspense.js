/* eslint-disable global-require */
import React, {Suspense} from 'react'

// General Components

const GuardedRouteRenderer = React.lazy(() => import('./GuardRouteRenderer'))

const LoadingScreen = () => <div>Loading...</div>
// Default Title
const title = 'CareLuLu'

/**
 * Wrapper for suspended components
 *
 * @param RouteComponent React.Component
 * @param options Object
 * @param componentProps Object
 */
const renderSuspense = (
  RouteComponent,
  options,
  componentProps,
) => (routerProps) => {
  let props = {
    ...routerProps,
    ...componentProps,
  }



  const componentOptions = {
    title,
    ...options,
  }

  if (componentOptions.noRouterProps) {
    /**
     * If `noRouterProps` is set to true,
     * the props from `react-router` are
     * not passed to the RouteComponent.
     */
    props = {
      ...componentProps,
    }
  }

  let renderedComponent = <RouteComponent {...props} />
  // eslint-disable-next-line no-console
  if (componentOptions.requireAuth) {
    renderedComponent = (
      <GuardedRouteRenderer
        renderConditions={{...componentOptions.requireAuth}}
        render={renderedComponent}
        {...props}
      />
    )
  }

  window.document.title = componentOptions.title

  return (
    <Suspense
      fallback={<LoadingScreen/>}>
      {renderedComponent}
    </Suspense>
  )
}

export default renderSuspense
