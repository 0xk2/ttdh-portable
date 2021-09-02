import { Container,Box, Drawer, Button } from "@material-ui/core";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { useEffect, useState } from "react";
import PatientBriefInfo from "../../component/PatientBriefInfo";
import { getDatabase, ref, onValue, update } from "@firebase/database"
import { useUIHelper } from "../../context/UIHelperContext";
import { ExpandMore } from "@material-ui/icons";
import { useAuth } from "../../context/AuthContext";
import {renderTimeSinceAnchorDate} from '../../utils/index';
import RenderASesion from './render/RenderASession'
import ICUDoctor from './render/icu-doctor'
import MedicalStaff from "./render/medical-staff";
import { isNil } from "lodash";

const db = getDatabase()

const getLatestSession = function(info){
  const timestampArray = []
  Object.keys(info.history).map((str) => {
    timestampArray.push(parseInt(str))
    return 0
  })
  return info.history[Math.max(...timestampArray)]
}
const patientInfoKey = ['name','gender','phone','provinceCode','districtCode','address','nc','dob']
const PatientDetail = function(props){
  const {setSuccessMessage, setBackdropState} = useUIHelper()
  const {userInfo, currentUser} = useAuth()
  const [patientDetail, setPatientDetail] = useState({
    history: {}
  })
  const [newSessionDialog, setNewSessionDialog] = useState(false)
  const [newSessionInfo, setNewSessionInfo] = useState()
  const [expandedIdx, setExpanded] = useState(0)
  const patientKey = props.location.search.substr(1,props.location.search.length)
  const saveHandler = function(newSessionVal,shortInfo,session_key){
    setBackdropState(true)
    newSessionVal['user'] = currentUser.phoneNumber
    const latestSession = getLatestSession(patientDetail)
    // status-changed logic
    const updates = {}
    if(latestSession.status === 'waiting'){
      // delete from waiting list
      updates['/waiting/'+latestSession.nc+"/"+patientKey] = null
    }
    if(newSessionInfo.visting === true){
      newSessionVal.status = 'processing'
      // add to processing list
      updates['/processing/'+shortInfo.nc+"/"+patientKey] = shortInfo
    }
    else{
      newSessionVal.status = 'done'
      // delete from processing list
      updates['/processing/'+latestSession.nc+"/"+patientKey] = null
    }
    // nc-changed logic
    if(newSessionInfo.nc !== latestSession.nc){
      // delete from "/nc[old]"
      updates['/'+latestSession.nc+"/"+patientKey] = null
      // delete "/processing/nc[old]/patientKey"
      updates['/processing/'+latestSession.nc+"/"+patientKey] = null
      // delete "/waiting/nc[old]/patientKey"
      updates['/waiting/'+latestSession.nc+"/"+patientKey] = null
    }
    /// update latestTimestamp
    updates['/'+shortInfo.nc+"/"+patientKey] = shortInfo
    // newSessionVal.status !== done => add to "/processing/nc[new]/patientKey"
    if(newSessionVal.status !== 'done'){
      updates['/processing/'+shortInfo.nc+"/"+patientKey] = shortInfo
    }
    const createdUserPhone = patientKey.split('-')[0]
    updates['/users/'+createdUserPhone+"/patients/"+patientKey] = shortInfo
    const followers = isNil(patientDetail.followers) === true ? {} : patientDetail.followers
    Object.keys(followers).map((followerId) => {
      updates['/users/'+followerId+"/patients/"+patientKey] = shortInfo
      return 0
    })
    // set new session
    updates['/patients/'+patientKey+'/history/'+session_key] = JSON.parse(JSON.stringify(newSessionVal))
    console.log(updates)
    // update(ref(db), updates)
    setBackdropState(false)
    setNewSessionDialog(false)
    setNewSessionInfo({nc: latestSession.nc})
  }
  useEffect(() => {
    setBackdropState(true)
    onValue(ref(db, '/patients/'+patientKey), (snapshot) => {
      setBackdropState(false)
      if(snapshot.val() === null){
        console.error('error!')
      }else{
        const info = snapshot.val()
        const latestSession = getLatestSession(info)
        setPatientDetail({...info, nc: latestSession.nc})
        setNewSessionInfo((state, props) => { 
          return {...state, nc: latestSession.nc}
        })
        setExpanded(Object.keys(info.history).length-1)
      }
    })
  },[patientKey,setBackdropState])
  const age = (new Date()).getFullYear() - parseInt(patientDetail.dob);
  
  return (
    <Container className="patient-detail frm-container">
      <PatientBriefInfo className="pt16" item={patientDetail} age={age} clipboardHandler={() => {
        navigator.clipboard.writeText(patientDetail.phone);
        setSuccessMessage('Đã copy!')
      }} />
      <Box>
        {Object.keys(patientDetail.history).map((timestamp,idx) => {
          const d = new Date(timestamp*1000)
          return <Accordion key={idx} className="interview-session" expanded={idx===expandedIdx?true:false} onClick={() => setExpanded(idx)}>
            <AccordionSummary  expandIcon={<ExpandMore />}>{renderTimeSinceAnchorDate(d)}</AccordionSummary>
            <AccordionDetails style={{display:"block"}}>
            {RenderASesion(patientDetail.history[timestamp])}
            </AccordionDetails>
          </Accordion>
        })}
      </Box>
      <Box className="control">
        {userInfo !== undefined?
          <Button variant="contained" color="primary" onClick={() => setNewSessionDialog(true)}>Thêm kết quả chăm sóc</Button>
        :null}
        <Button variant="outlined" color="secondary" onClick={() => props.history.goBack()}>Quay lại</Button>
      </Box>
      <Drawer anchor={'bottom'} open={newSessionDialog} onClose={() => setNewSessionDialog(false)}>
        {!isNil(userInfo) && userInfo.type === 'icu-doctor'?
          <ICUDoctor.Question initialState={newSessionInfo} onItemValueChange={(newKeyValue) => {
              setNewSessionInfo({...newSessionInfo, ...newKeyValue})
            }}
            patientInfoKey={patientInfoKey} patientDetail={patientDetail}
            saveHandler={saveHandler} onClose={() => setNewSessionDialog(false)}
          />:null
        }
        {!isNil(userInfo) && (userInfo.type === 'admin' || userInfo.type === 'medical-staff')?
          <MedicalStaff.Question initialState={newSessionInfo} onItemValueChange={(newKeyValue) => {
              setNewSessionInfo({...newSessionInfo, ...newKeyValue})
            }}
            patientInfoKey={patientInfoKey} patientDetail={patientDetail}
            saveHandler={saveHandler} onClose={() => setNewSessionDialog(false)}
          />:null
        }
      </Drawer>
    </Container>
  )
}

export default PatientDetail;