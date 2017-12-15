import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import storage from './libs/storage';
import './styles/main.scss'


const APP_STORAGE = 'redux_kanban';

const store = configureStore(storage.get(APP_STORAGE) || {});

store.subscribe(() => {
  if(!storage.get('debug')) {
    storage.set(APP_STORAGE);
  }
});

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
