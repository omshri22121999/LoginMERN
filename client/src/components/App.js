import React, { Component } from 'react';
import Home from '../container/Home'
import About from '../container/About'
import NavTop from "../container/NavTop"
import SignUp from "./SignUp"
import Login from './Login'
import {Route} from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'
import '../css/style.css'
class App extends Component {

  render() {

    return (
       <div className={'container'}>
           <Row>
               <Col>
                   <NavTop/>
               </Col>
           </Row>
           <Row>
               <Col xsOffset={1}>
                   <Route exact path={'/'} component={Home}/>
                   <Route exact path={'/home'} component={Home}/>
                   <Route exact path={'/about'} component={About}/>
                   <Route exact path={'/login'} component={Login}/>
                   <Route exact path={'/signup'} component={SignUp}/>
               </Col>
           </Row>
       </div>
    );
  }
}

export default App;
