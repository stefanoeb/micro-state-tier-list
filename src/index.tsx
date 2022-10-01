import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { RecoilRoot } from 'recoil';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PlantsProviderMobx } from './state-handlers/mobx';
import { store } from './state-handlers/redux-toolkit';

ReactDOM.render(
  <Provider store={store}>
    <RecoilRoot>
      <PlantsProviderMobx>
        <App />
      </PlantsProviderMobx>
    </RecoilRoot>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
