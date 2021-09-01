import './index.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import FormData from './page/FormData/FormData';
import PatientBook from './page/PatientBook';
import Auth from './page/Auth';
import Result from './page/Result';
import PatientInfo from './page/PatientInfo/PatientInfo';
import Routing from './config/Routing';
import { AuthProvider } from './context/AuthContext';
import { UIHelperProvider } from './context/UIHelperContext';
import ICU from './page/ICU';
import PatientDetail from './page/PatientDetail';
import AppbarLayoutRoute from './layout/AppbarLayoutRoute';
import { User } from './page/User';

function App() {
  return (
    <Router>
      <Switch>
        <UIHelperProvider>
          <AuthProvider>
            <Route path={Routing.LOGIN} render={(props) => <Auth {...props} />} exact />
            <AppbarLayoutRoute path={Routing.PATIENTBOOK} component={PatientBook} exact/>
            <AppbarLayoutRoute path={Routing.PATIENTINFO} component={PatientInfo} exact/>
            <AppbarLayoutRoute path={Routing.NCEVALUATING} component={FormData} exact/>
            <AppbarLayoutRoute path={Routing.NCRESULT} component={Result} exact/>
            <AppbarLayoutRoute path={Routing.ICU} component={ICU} exact/>
            <AppbarLayoutRoute path={Routing.PATIENTPROFILE} component={PatientDetail} exact/>
            <AppbarLayoutRoute path={Routing.USER} component={User} exact/>
            {/* <Route path={Routing.PATIENTPROFILE} render={(props) => <PatientDetail {...props} />} exact /> */}
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
