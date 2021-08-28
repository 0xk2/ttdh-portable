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
import PatientInfo from './page/PatientInfo/PatientInfo';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" render={(props) => <PatientInfo {...props} />} exact />
        <Route path="/sang-loc" render={(props) => <FormData {...props} />} exact />
        <Route path="/ket-qua" render={(props) => <Result {...props} />} />
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
