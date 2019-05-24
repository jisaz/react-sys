import React from 'react';
import { Provider } from 'react-redux';
import store from '-/store';
import Router from '-/routers';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router />
      </Provider>
    </div>
  );
}

export default App;
