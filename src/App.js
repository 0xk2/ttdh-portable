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
import Routing from './config/Routing';
import { AuthProvider } from './context/AuthContext';
import { UIHelperProvider } from './context/UIHelperContext';

function App() {
  return (
    <Router>
      <Switch>
        <UIHelperProvider>
          <AuthProvider>
            <Route path={Routing.LOGIN} render={(props) => <Auth {...props} />} exact />
            <Route path={Routing.PATIENTINFO} render={(props) => <PatientInfo {...props} />} exact />
            <Route path={Routing.NCEVALUATING} render={(props) => <FormData {...props} />} exact />
            <Route path={Routing.NCRESULT} render={(props) => <Result {...props} />} exact />
            <Route path={Routing.PROFILE} render={(props) => <Dashboard {...props} />} exact />
          </AuthProvider>
        </UIHelperProvider>
      </Switch>
      <div className="footer">
        Mọi thắc mắc xin liên hệ <a href="https://thaythuocdonghanh.vn/">Mạng lưới Thầy Thuốc Đồng Hành</a>
      </div>
    </Router>
  )
}
export default App;
