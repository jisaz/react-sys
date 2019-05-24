/**
 * 路由主组件
 */

import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '-/utils/history';

import { asyncComponent, } from '-/components';

const Home = asyncComponent(() => import('-/pages/Home'));

const RouterCom = () => (
  <Router history={history}>
    <Switch>
      {/* 首页 */}
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

export default RouterCom;
