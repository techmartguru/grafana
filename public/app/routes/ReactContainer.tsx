import React from 'react';
import ReactDOM from 'react-dom';
import coreModule from 'app/core/core_module';
import { store } from 'app/store/configureStore';
import { Provider } from 'react-redux';

function WrapInProvider(store, Component, props) {
  return (
    <Provider store={store}>
      <Component {...props} />
    </Provider>
  );
}

/** @ngInject */
export function reactContainer($route, $location) {
  return {
    restrict: 'E',
    template: '',
    link(scope, elem) {
      let component = $route.current.locals.component;
      let props = {};

      ReactDOM.render(WrapInProvider(store, component, props), elem[0]);

      scope.$on('$destroy', function() {
        ReactDOM.unmountComponentAtNode(elem[0]);
      });
    },
  };
}

coreModule.directive('reactContainer', reactContainer);
