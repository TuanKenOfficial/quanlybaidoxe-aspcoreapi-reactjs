import logo from './logo.svg';
import './App.css';

import {Home} from './Home';
import {Floor} from './Floor';
import {Umbrella} from './Umbrella';
import {Car} from './Car';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>  
    <div className="container">
        <h3 className="m-3 d-flex justify-content-center">
          Phần mềm Quản lý bãi đỗ xe  
        </h3>
    <Navigation/>
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/floor' component={Floor}/>
      <Route path='/umbrella' component={Umbrella}/>
      <Route path='/car' component={Car}/>
    </Switch>   
    </div>
    </BrowserRouter>
  );
}

export default App;
