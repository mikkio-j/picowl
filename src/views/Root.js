import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import GlobalStyle from '../theme/GlobalStyle';
import MainView from './MainView';
import SearchView from './SearchView';

const Root = () => (
  <>
    <Provider store={store}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={MainView} />
          <Route exact path='/search/:searchString' component={SearchView} />
        </Switch>
      </BrowserRouter>
    </Provider>
  </>
);

export default Root;
