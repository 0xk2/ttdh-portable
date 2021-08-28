import './index.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import FormData from './page/FormData/FormData';
import Dashboard from './page/Dashboard';
import Auth from './page/Auth';
import Result from './page/Result';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" render={(props) => <FormData {...props} />} exact />
        <Route path="/result" render={(props) => <Result {...props} />} />
        <Route path="/auth">
          <Auth />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
      <div className="footer">
        Mọi thắc mắc xin liên hệ <a href="https://thaythuocdonghanh.vn/">Mạng lưới Thầy Thuốc Đồng Hành</a>
      </div>
    </Router>
  )
}
export default App;
