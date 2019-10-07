import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import Home from "./Component/Home";
import Page from "./Component/Page";
import Login from "./Component/Login";


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home}>
            </Route>
            <Route exact path="/login" component={Login}>
            </Route>
            <Route path="/:id" component={Page} >
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

}



export default App;
