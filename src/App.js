import React from 'react';
import { Route,Switch,Link,BrowserRouter} from 'react-router-dom';
import Dnd from './pages/test1/index';
import Dnd0 from './pages/test/index';
import Example from './pages/hooks/test';
import Example2 from './pages/hooks/test2';
import Menu from './pages/test2/index';

function App() {
  return (
      <div>
          <BrowserRouter>
              <Switch>
                  <Route path="/" component={Example} exact/>
                  <Route path="/Example2" component={Example2}/>
                  <Route path="/dnd" component={Dnd} />
                  <Route path="/dnd0" component={Dnd0} />
                  <Route path="/menu" component={Menu} />


              </Switch>
              <ul id="menu">
                  <li><Link to='/'>Hooks1</Link></li>
                  <li><Link to='/Example2'>Hooks2</Link></li>
                  <li><Link to='/dnd'>拖拽</Link></li>
                  <li><Link to='/dnd0'>拖拽0</Link></li>
                  <li><Link to='/menu'>Menu</Link></li>
              </ul>
          </BrowserRouter>

      </div>
  );
}

export default App;
