import {Container, Button, Box} from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core'
import classnames from 'classnames';
import {useState} from 'react';
import { Save, Edit } from '@material-ui/icons';
import { CheckCircle, LocalHospital } from '@material-ui/icons';
import TabPanel from '../component/TabPanel';
import { Redirect } from 'react-router';
import Routing from '../config/Routing'
import {useUIHelper} from '../context/UIHelperContext'
import {useAuth} from '../context/AuthContext'
import { getDatabase, ref, update } from "@firebase/database";

const db = getDatabase()

const Result = (props) => {
  return (
    <Container maxWidth="md" className="frm-container result-page">
      {
        props.location.data === undefined || props.location.patientInfo === undefined ? 
        <Redirect pathname="/" /> :
        <NCResult {...props} data={props.location.data} originalFrm={props.location.originalFrm} patientInfo={props.location.patientInfo} />
      }
    </Container>
  )
}

const resultProcessing = (originalPatientInfo, formData, result, userPhoneNumber) => {
  const timestamp = parseInt(new Date().getTime()/1000)+''
  const patientInfoKey = ['name','gender','phone','provinceCode','districtCode','address']
  const interviewSessionKey = ['covidStatus','lastPositiveTestDate','testCode','testDate','testReason','ctValue','ctLevel',
  'getOutOfHospitalDate','fieldDoctor','fieldDoctorPhone','note']
  const shortInfo = {
    'nc': result.type
  }
  const interviewSection = {
    'status': 'waiting',
    'user': userPhoneNumber,
    'frmdata': formData
  }
  const patientInfo = {
    'imported_callio': false,
    'nc': result.type,
    'created_at': timestamp,
    'history': {}
  }
  Object.keys(originalPatientInfo).map((section_name) => {
    const inputs = originalPatientInfo[section_name].inputs
    const input_keys = Object.keys(inputs)
    input_keys.map((name,idx) => {
      if(name === 'age'){
        const dob = 2021 - parseInt(inputs[name].value)
        patientInfo['dob'] = dob
        shortInfo['dob'] = dob
      }
      if(patientInfoKey.indexOf(name) !== -1){
        patientInfo[name] = inputs[name].value
        shortInfo[name] = inputs[name].value
      }
      if(interviewSessionKey.indexOf(name) !== -1){
        interviewSection[name] = inputs[name].value
      }
      return 0
    })
    return 0;
  })
  patientInfo['history'][timestamp] = interviewSection
  return {patientInfo,shortInfo}
}

const NCResult = (props) => {
  const data = props.data
  const color = ["nc2","nc3","nc4"].indexOf(data.type) !== -1 ? "secondary.main" : "primary.main";
  const tabIndicatorColor = ["nc2","nc3","nc4"].indexOf(data.type) !== -1 ? "secondary" : "primary";
  const [selectedTabIdx, setTab] = useState(0)
  const {setBackdropState, setErrorMessage, setSuccessMessage} = useUIHelper()
  const {currentUser} = useAuth()
  return (
    <Box className="nc-result">
      <Box className="pt16 control">
        <Button color="primary" variant='outlined' startIcon={<Edit />}
          onClick={() => {
            props.history.push({
              pathname: Routing.NCEVALUATING,
              initFrmData: props.originalFrm,
              patientInfo: props.patientInfo
            })
          }}
        >Sàng lọc</Button>
        <Button color="secondary" variant='outlined' endIcon={<Save />}
            onClick={() => {
              setBackdropState(true)
              const {patientInfo, shortInfo} = resultProcessing(props.patientInfo, props.originalFrm, data, currentUser.phoneNumber)
              const updates = {}
              const key = currentUser.phoneNumber+'-'+parseInt(new Date().getTime()/1000)
              updates['patients'] = {}
              updates['patients'][key] = JSON.parse(JSON.stringify(patientInfo))
              updates[shortInfo['nc']] = {}
              updates[shortInfo['nc']][key] = JSON.parse(JSON.stringify(shortInfo))
              if(shortInfo['nc'] === 'nc3' || shortInfo['nc'] === 'nc4'){
                updates['waiting'] = {}
                updates['waiting'][key] = JSON.parse(JSON.stringify(shortInfo))
              }
              update(ref(db), updates)
              .then(() => {
                setSuccessMessage('Lưu bệnh nhân thành công!')
                props.history.push({
                  pathname: Routing.PATIENTINFO
                })
              })
              .catch((error) => {
                setErrorMessage('Không lưu lại được, vui lòng thử lại')
              })
              .finally(() => {
                setBackdropState(false)
              })
        }}
        >Tiếp theo</Button>
      </Box>
      <Box className={classnames("title","annoucement")} color={color}>
        <Box>{data.title}</Box>
      </Box>
      <Tabs
        value={selectedTabIdx}
        indicatorColor= {tabIndicatorColor}
        textColor= {tabIndicatorColor}
        onChange={(event, newValue) => {
          setTab(newValue)
        }}
      >
        <Tab label="Nhân viên Y Tế"></Tab>
        <Tab label="Bệnh Nhân"></Tab>
      </Tabs>
      <TabPanel index={0} value={selectedTabIdx}>
        {
          Array.isArray(data.action) === true ?
          data.action.map((act, idx) => {
            return (
              <div key={idx} className="mt8">
                <LocalHospital color={tabIndicatorColor} fontSize="small" className="text-heading-icon" /> <span>{act}</span>
              </div>
            )
          }) : <div><LocalHospital color={tabIndicatorColor} fontSize="small" className="text-heading-icon" /> <span>{data.action}</span></div>
        }
      </TabPanel>
      <TabPanel index={1} value={selectedTabIdx}>
        {
          Array.isArray(data.consults) === true ?
          data.consults.map((consult, idx) => {
            return (
              <div key={idx} className="mt8">
                <CheckCircle color={tabIndicatorColor} fontSize="small" className="text-heading-icon" /> <span>{consult}</span>
              </div>
            )
          }) : <div><CheckCircle color={tabIndicatorColor} fontSize="small" className="text-heading-icon" /> <span>{data.consults}</span></div>
        }
      </TabPanel>
    </Box>
  )
}

export default Result;