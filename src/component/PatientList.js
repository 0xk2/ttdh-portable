import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import PatientBriefInfo from "./PatientBriefInfo";
import { useHistory } from "react-router";
import { useUIHelper } from "../context/UIHelperContext";
import Routing from "../config/Routing";
import {SORT} from '../config/Constants';
import { sortBy } from "lodash";

function PatientList({patients: items, sortBy: sorting}) {
  const history = useHistory()
  const {setSuccessMessage} = useUIHelper()
  //put key inside object before sorting
  Object.keys(items).map((key) => items[key].key=key)
  switch(sorting){
    case SORT.OLDEST:
      items = sortBy(items, [function(item) { return item.lastestSessionTimestamp === undefined?0:parseInt(item.lastestSessionTimestamp) }])
      break;
    case SORT.LATEST:
    default:
      items = sortBy(items, [function(item) { return item.lastestSessionTimestamp === undefined?0:parseInt(item.lastestSessionTimestamp)*-1 }])
      break;
  }
  console.log("patientlist: items ",items)
  return (
    <>
    {items.map((item,idx) => {
      const age = (new Date()).getFullYear() - parseInt(item.dob);
      return <Card className="icu-card" variant="outlined" key={idx}>
        <CardContent>
          <PatientBriefInfo item={item} age={age} clipboardHandler={() => {
            navigator.clipboard.writeText(item.phone);
            setSuccessMessage('Đã copy!')
          }} />
        </CardContent>
        <CardActions>
          <Button size="small" variant="outlined" onClick={() => {
            history.push({
              pathname: Routing.PATIENTPROFILE,
              patient_key: item.key,
              search: item.key
            })
          }}>Chi tiết</Button>
        </CardActions>
      </Card>
    })}
    </>
  )
}

export default PatientList