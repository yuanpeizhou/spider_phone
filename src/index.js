import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

import Home from './components/pages/home/index'
import { BrowserRouter } from "react-router-dom";

// import App from './App';
// import { Provider } from 'react-redux'
// import { createStore } from 'redux'
// import todoApp from './reducers'
// import App from './components/App'

// let store = createStore(todoApp)

ReactDOM.render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>,

  document.getElementById('root')
);

// <Provider store={store}>
//   <App />
// </Provider>,



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
