import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { ApolloProvider } from 'react-apollo';

import 'normalize.css';
import 'antd-mobile/dist/antd-mobile.css';

import reducers from './redux/reducers';
import './styles/common.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import client from './services/client';

const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(reducers, applyMiddleware(...middleware));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
