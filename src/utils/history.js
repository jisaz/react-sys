/**
 * history构建
 * */

import * as History from 'history';

let history = History.createHashHistory();
const push = history.push;
const replace = history.replace;

history.push = (path, state) => {
  let search = history.beforePush(path, state);
  push(search, state);
};

history.replace = (path, state) => {
  let search = history.beforePush(path, state);
  replace(search, state);
};

export default history;
