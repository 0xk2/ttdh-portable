import { Container,Box, Drawer, Button, TextField, Select, MenuItem, Checkbox, FormControlLabel } from "@material-ui/core";
import { Accordion, AccordionSummary, AccordionDetails } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import dataStructure from "../page/PatientInfo/dataStructure"
import PatientBriefInfo from "../component/PatientBriefInfo";
import { getDatabase, ref, onValue, set } from "@firebase/database"
import { useUIHelper } from "../context/UIHelperContext";
import { Check, Close, ExpandMore, Save } from "@material-ui/icons";
import Routing from '../config/Routing';
import { useAuth } from "../context/AuthContext";
import {renderTimeSinceAnchorDate} from '../utils/index';

const db = getDatabase()
const patientInfoKey = ['name','gender','phone','provinceCode','districtCode','address','nc','dob']

const renderASession = function(session){
  if(session === undefined) { return null }
  const sections = dataStructure.frmdata.sections
  let inputs = {
    "user": { "label":"Người phỏng vấn"},
    "status": { "label":"Trạng thái"},
    "nc": { "label":"Nguy cơ"},
  }
  Object.keys(sections).map((section_id) => {
    inputs = {...inputs, ...sections[section_id].inputs}
    return 0
  })
  return (
    <Fragment>
      {session['frmdata'] !== undefined ? 
      <Box className="form-result">
        <Box className="form-title">Các triệu chứng:</Box>
        {renderFormData(session['frmdata']) }
      </Box>
      : null}
      <Box className="form-result">
        <Box className="form-title">Thông tin tổng quan:</Box>
        <ul>
        {Object.keys(session).map((key,idx) => {
          console.log()
          if(key === 'frmdata'){
            return null
          }
          if(key === 'note') {
            return (
              <li key={idx}>
                <div>Ghi chú</div>
                <div className="enable-white-space">{session[key]}</div>
              </li>
            )
          }
          if(key === 'status') {
            return (
              <li key={idx}> Trạng thái: {session[key]==='waiting'?"Chờ chăm sóc":session[key]==='processing'?"Tiếp tục chăm sóc":"Đã ngừng chăm sóc"} </li>
            )
          }
          return (
            <li key={idx}> {inputs[key]!==undefined?inputs[key].label:key}: 
            {session[key] === true? <Check color="primary" size="small"/>:
              (session[key] === false || session[key] === undefined)===true?<Close color="secondary" size="small" />: " "+session[key]
            } 
            </li>
          )
        })}
        </ul>
      </Box>
    </Fragment>
  )
}
const renderFormData = function(frmData){
  const sections = frmData.sections
  return (
    sections.map((section,sidx) => {
      return (
        <ul key={sidx}>
          {
            Object.keys(section.questions).map((question_id, qidx) => {
              const question = section.questions[question_id]
              const options = question.options
              return (
                <Fragment key={qidx}>
                {
                  options.map((option,oidx) => {
                    if(option.value > 0){
                      return (
                        <li key={oidx}>{option.title}</li>
                      )
                    }
                    return null
                  })
                }    
                </Fragment>
              )
            })
          }
        </ul>
      )
    })
  )
}
//hạ sốt, kháng virus, chống đông đường uống, chống ngưng dập tiểu cầu, Corticoid, kháng sinh
const meds = {
  "med1": "Hạ sốt",
  "med2": "Kháng virus",
  "med3": "Chống đông đường uống",
  "med4": "Corticoid",
  "med5": "Kháng sinh"
}

const PatientDetail = function(props){
  const {setSuccessMessage, setBackdropState} = useUIHelper()
  const {userInfo} = useAuth()
  const [patientDetail, setPatientDetail] = useState({
    history: {}
  })
  const [newSessionDialog, setNewSessionDialog] = useState(false)
  const [newSessionInfo, setNewSessionInfo] = useState({processing: true,nc:'nc3',oxy:"Không có", "Thuốc khác":""})
  const [expandedIdx, setExpanded] = useState(0)
  const patientKey = props.location.search.substr(1,props.location.search.length)
  useEffect(() => {
    onValue(ref(db, '/patients/'+patientKey), (snapshot) => {
      if(snapshot.val() === null){
        console.error('error!')
      }else{
        const info = snapshot.val()
        const timestampArray = []
        Object.keys(info.history).map((str) => {
          timestampArray.push(parseInt(str))
          return 0
        })
        const latestTimestamp = Math.max(...timestampArray)
        setPatientDetail({...info, nc: info.history[latestTimestamp].nc})
        const lastestMeds = {}
        Object.keys(meds).map((key) => {
          info.history[latestTimestamp][meds[key]] === undefined? lastestMeds[meds[key]]=false : lastestMeds[meds[key]]=true
          return 0
        })
        setNewSessionInfo((state, props) => { return {...state, nc: info.history[latestTimestamp].nc, processing: true,
          oxy: info.history[latestTimestamp].oxy !== undefined?info.history[latestTimestamp].oxy:"Không có", ...lastestMeds
        } })
        setExpanded(timestampArray.length-1)
      }
    })
  },[patientKey])
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
            {renderASession(patientDetail.history[timestamp])}
            </AccordionDetails>
          </Accordion>
        })}
      </Box>
      <Box className="control">
        {userInfo !== undefined && userInfo.type === 'icu-doctor'?
          <Button variant="contained" color="primary" onClick={() => setNewSessionDialog(true)}>Thêm kết quả chăm sóc</Button>
        :null}
        <Button variant="outlined" color="secondary" onClick={() => props.history.push(Routing.ICU)}>Quay lại</Button>
      </Box>
      <Drawer anchor={'bottom'} open={newSessionDialog} onClose={() => setNewSessionDialog(false)}>
        <Box className="new-sesison-dialog">
          <Box>
            <Box className="title">
              Kết quả chăm sóc
            </Box>
            <TextField fullWidth={true} multiline={true} label="Kết quả" minRows={3} value={newSessionInfo.note} onChange={(e) => {
              setNewSessionInfo({...newSessionInfo, note : e.target.value})
            }}></TextField>
            <Box className="pt8">
              <Box className="input-label">
                <Box className="input-title">Tình trạng oxy</Box> 
              </Box>
              <Select className="pt8" value={newSessionInfo.oxy} fullWidth={true} onChange={(e) => {
                setNewSessionInfo({...newSessionInfo, oxy : e.target.value})
              }}>
                <MenuItem value={"Không có"}>Không có</MenuItem>
                <MenuItem value={"Đang liên hệ"}>Đang liên hệ</MenuItem>
                <MenuItem value={"Đã có"}>Đã có</MenuItem>
              </Select>
            </Box>
            <Box className="pt8">
              <Box className="input-label">
                <Box className="input-title">Tình trạng thuốc</Box> 
              </Box>
              {
                Object.keys(meds).map((key,idx) => {
                  return (
                    <Box className="pt8" key={idx}>
                    <FormControlLabel control={
                      <Checkbox checked={newSessionInfo[meds[key]]} onChange={(e) => {
                        const obj = {}
                        obj[meds[key]] = e.target.checked
                        setNewSessionInfo({...newSessionInfo, ...obj})
                      }} />
                    } label={meds[key]} />
                    </Box>
                  )
                })
              }
              <TextField value={newSessionInfo['Thuốc khác']} label="Thuốc khác (nếu có)" 
              onChange={(e) => setNewSessionInfo({...newSessionInfo, "Thuốc khác": e.target.value})} />
            </Box>
            <Box className="pt8">
              <Box className="input-label">
                <Box className="input-title">Cập nhật phân tầng nguy cơ</Box> 
                <Box className="input-subtitle pt8">Chú ý: Bác sỹ cấp cứu chỉ xem được NC3,NC4 và chỉ bác sỹ cấp cứu mới cập nhật được NC3,NC4.</Box>
              </Box>
              <Select className="pt8" value={newSessionInfo.nc} fullWidth={true} onChange={(e) => {
                setNewSessionInfo({...newSessionInfo, nc : e.target.value})
              }}>
                <MenuItem value={"nc4"}>NC4</MenuItem>
                <MenuItem value={"nc3"}>NC3</MenuItem>
                <MenuItem value={"nc2"}>NC2</MenuItem>
                <MenuItem value={"nc1"}>NC1</MenuItem>
                <MenuItem value={"nc0"}>NC0</MenuItem>
              </Select>
            </Box>
            <Box className="pt8">
              <FormControlLabel control={
                <Checkbox checked={newSessionInfo.processing} onChange={(e) => {
                  setNewSessionInfo({...newSessionInfo, processing : e.target.checked})
                }} />
              } label="Còn tiếp tục chăm sóc ca này trong tương lai không?" />
            </Box>
          </Box>
          <Box className="pt16" style={{display: "flex", justifyContent: "space-between"}}>
            <Button startIcon={<Save />} variant="contained" color="secondary"
            onClick={() => {
              const timestamps = []
              const newSessionVal = {
                note: newSessionInfo.note,
                nc: newSessionInfo.nc,
                oxy: newSessionInfo.oxy,
                "Thuốc khác": newSessionInfo["Thuốc khác"]
              }
              Object.keys(meds).map((key) => {
                newSessionVal[meds[key]] = newSessionInfo[meds[key]]
                return 0
              })
              Object.keys(patientDetail.history).map((strTimestamp) => {
                timestamps.push(parseInt(strTimestamp))
                return 0
              })
              const lastestTimestamp = Math.max(...timestamps)
              const latestSession = lastestTimestamp !== undefined ? patientDetail.history[lastestTimestamp]:{nc:'', status:'waiting', note:"", processing: true}
              setBackdropState(true)
              // new key:
              const session_key = parseInt(new Date().getTime()/1000)+''
              const shortInfo = {}
              patientInfoKey.map((infoKey,idx) => {
                shortInfo[infoKey] = newSessionInfo[infoKey] !== undefined? newSessionInfo[infoKey]: patientDetail[infoKey]
                return 0
              })
              // status-changed logic
              if(latestSession.status === 'waiting'){
                // delete from waiting list
                set(ref(db, '/waiting/'+latestSession.nc+"/"+patientKey), null)
              }
              if(newSessionInfo.processing === true){
                newSessionVal.status = 'processing'
                // add to processing list
                set(ref(db, '/processing/'+shortInfo.nc+"/"+patientKey), JSON.parse(JSON.stringify(shortInfo)))
              }
              else{
                newSessionVal.status = 'done'
                // delete from processing list
                set(ref(db, '/processing/'+latestSession.nc+"/"+patientKey), null)
              }

              // nc-changed logic
              if(newSessionInfo.nc !== latestSession.nc){
                // delete from "/nc[old]"
                set(ref(db, '/'+latestSession.nc+"/"+patientKey), null)
                // add to "/nc[new]"
                set(ref(db, '/'+shortInfo.nc+"/"+patientKey), JSON.parse(JSON.stringify(shortInfo)))
                // delete "/processing/nc[old]/patientKey"
                set(ref(db, '/processing/'+latestSession.nc+"/"+patientKey), null)
                // delete "/waiting/nc[old]/patientKey"
                set(ref(db, '/waiting/'+latestSession.nc+"/"+patientKey), null)
                // newSessionVal.status !== done => add to "/processing/nc[new]/patientKey"
                if(newSessionVal.status !== 'done'){
                  set(ref(db, '/processing/'+shortInfo.nc+"/"+patientKey), JSON.parse(JSON.stringify(shortInfo)))
                }
                const createdUserPhone = patientKey.split('-')[0]
                set(ref(db, '/users/'+createdUserPhone+"/patients/"+patientKey), JSON.parse(JSON.stringify(shortInfo)))
              }
              // set new session
              
              set(ref(db, '/patients/'+patientKey+'/history/'+session_key), JSON.parse(JSON.stringify(newSessionVal)))
              setBackdropState(false)
              setNewSessionDialog(false)
              setNewSessionInfo({...newSessionInfo, ...{note:"",processing:true,nc:newSessionVal.nc}})
            }}>Lưu lại</Button>
            <Button variant="contained" startIcon={<Close />} onClick={() => setNewSessionDialog(false)}>Hủy</Button>
          </Box>
        </Box>
      </Drawer>
    </Container>
  )
}

export default PatientDetail;