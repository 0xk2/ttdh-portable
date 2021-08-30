import { Container,Box, Drawer, Button, TextField, Select, MenuItem, Checkbox, FormControlLabel } from "@material-ui/core";
import { Fragment, useEffect, useState } from "react";
import dataStructure from "../page/PatientInfo/dataStructure"
import PatientBriefInfo from "../component/PatientBriefInfo";
import { getDatabase, ref, onValue, set } from "@firebase/database"
import { useUIHelper } from "../context/UIHelperContext";
import { Save } from "@material-ui/icons";
import Routing from '../config/Routing';

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
          return (
            <li key={idx}> {inputs[key]!==undefined?inputs[key].label:inputs[key]}: {session[key]} </li>
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

const PatientDetail = function(props){
  const {setSuccessMessage, setBackdropState} = useUIHelper()
  const [patientDetail, setPatientDetail] = useState({
    history: {}
  })
  const [newSessionDialog, setNewSessionDialog] = useState(false)
  const [newSessionInfo, setNewSessionInfo] = useState({processing: true})
  const patientKey = props.location.search.substr(1,props.location.search.length)
  useEffect(() => {
    onValue(ref(db, '/patients/'+patientKey), (snapshot) => {
      console.log('patientKy: ',patientKey)
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
        console.log(timestampArray)
        console.log('info: ',info,'; latestTimestamp: ',latestTimestamp)
        setPatientDetail(info)
        setNewSessionInfo({...newSessionInfo, nc: info.history[latestTimestamp].nc})
      }
    })
  },[newSessionInfo, patientKey])
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
          return <Box className="interview-session" key={idx}>
            <Box className="session-title">Kết quả chăm sóc tại: {d.toLocaleDateString()} {d.getHours()}:{d.getMinutes()}</Box>
            <Box className="session-content">
              {renderASession(patientDetail.history[timestamp])}
            </Box>
            
          </Box>
        })}
      </Box>
      <Box className="control">
        <Button variant="contained" color="primary" onClick={() => setNewSessionDialog(true)}>Thêm kết quả chăm sóc</Button>
        <Button variant="outlined" color="secondary" onClick={() => props.history.push(Routing.ICU)}>Quay lại</Button>
      </Box>
      <Drawer anchor={'bottom'} open={newSessionDialog} onClose={() => setNewSessionDialog(false)}>
        <Box className="new-sesison-dialog">
          <Box>
            <Box className="title">
              Kết quả chăm sóc
            </Box>
            <TextField fullWidth={true} multiline={true} label="Kết quả" minRows={3} value={newSessionInfo.note} onChange={(e) => {
              setNewSessionInfo({...newSessionInfo, note: e.target.value})
            }}></TextField>
            <Box className="pt8">
              <Box className="input-label">
                <Box className="input-title">Cập nhật phân tầng nguy cơ</Box> 
                <Box className="input-subtitle pt8">Chú ý: Nguy cơ nhỏ hơn 3 và 4 sẽ ra khỏi diện quan tâm cấp cứu</Box>
              </Box>
              <Select className="pt8" value={newSessionInfo.nc} fullWidth={true} onChange={(e) => {
                setNewSessionInfo({...newSessionInfo, nc: e.target.value})
              }}>
                <MenuItem value="nc4">NC4</MenuItem>
                <MenuItem value="nc3">NC3</MenuItem>
                <MenuItem value="nc2">NC2</MenuItem>
                <MenuItem value="nc1">NC1</MenuItem>
                <MenuItem value="nc0">NC0</MenuItem>
              </Select>
            </Box>
            <Box className="pt8">
              <FormControlLabel control={
                <Checkbox checked={newSessionInfo.processing} onChange={(e) => {
                  setNewSessionInfo({...newSessionInfo, processing: e.target.checked})
                }} />
              } label="Còn tiếp tục chăm sóc ca này trong tương lai không?" />
            </Box>
          </Box>
          <Box className="pt16">
            <Button startIcon={<Save />} variant="contained" color="secondary"
            onClick={() => {
              const timestamps = []
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
              // data
              if(latestSession.status === 'waiting'){
                // delete from waiting list
                set(ref(db, '/waiting/'+latestSession.nc+"/"+patientKey), null)
              }
              if(newSessionInfo.processing === true){
                newSessionInfo.status = 'processing'
                // add to processing list
                set(ref(db, '/processing/'+shortInfo.nc+"/"+patientKey), JSON.parse(JSON.stringify(shortInfo)))
              }
              else{
                newSessionInfo.status = 'done'
                // delete from processing list
                set(ref(db, '/processing/'+latestSession.nc+"/"+patientKey), null)
              }
              delete newSessionInfo.processing
              if(newSessionInfo.nc !== latestSession.nc){
                // delete from "/nc[old]"
                set(ref(db, '/'+latestSession.nc+"/"+patientKey), null)
                // add to "/nc[new]"
                set(ref(db, '/'+shortInfo.nc+"/"+patientKey), JSON.parse(JSON.stringify(shortInfo)))
              }
              // set new session
              set(ref(db, '/patients/'+patientKey+'/history/'+session_key), JSON.parse(JSON.stringify(newSessionInfo)))
              setBackdropState(false)
              setNewSessionDialog(false)
              setNewSessionInfo({...newSessionInfo,note:""})
            }}>Lưu lại</Button>
          </Box>
        </Box>
      </Drawer>
    </Container>
  )
}

export default PatientDetail;