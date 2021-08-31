import { Card, CardContent, CardActions, Button } from "@material-ui/core";
import PatientBriefInfo from "./PatientBriefInfo";
import { useHistory } from "react-router";
import { useUIHelper } from "../context/UIHelperContext";
import Routing from "../config/Routing";

function PatientList(items) {
  const history = useHistory()
  const {setSuccessMessage} = useUIHelper()
  return (
    <>
    {Object.keys(items).map((key,idx) => {
      const item = items[key];
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
              patient_key: key,
              search: key
            })
          }}>Chi tiết</Button>
        </CardActions>
      </Card>
    })}
    </>
  )
}

export default PatientList