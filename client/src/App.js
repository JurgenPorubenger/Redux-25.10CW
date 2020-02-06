import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import MainPage from './containers/Main';
import { browserHistory ,BrowserRouter as Router, Route } from 'react-router-dom'
// import createBrowserHistory from 'history/createBrowserHistory'
// const history = createBrowserHistory();

function App() {
  return (
      <Router>
        <Provider store={store}>
            <Route path="/" component={MainPage} />
        </Provider>
      </Router>
      );
}

export default App;
