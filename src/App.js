import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Header from './Components/Header.js';
import Home from './Components/Home.js';
import Error_404 from './Components/Error_404.js';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Register from './Components/Register.js';
import Login from './Components/Login.js';
import Metrics from './Components/Metrics.js';
import Ranking from './Components/Ranking.js';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
            <div>
                <Header></Header>
                <Switch>
                    <Route path='/' component={Home} exact/>
                    <Route path='/registro' component={Register} exact/>
                    <Route path='/login' component={Login} exact/>
                    <Route path='/metricas' component={Metrics} exact/>
                    <Route path='/ranking' component={Ranking} exact/>
                    <Route component={Error_404}/>
                </Switch>
                {/*<Footer></Footer>*/}
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
