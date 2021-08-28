import {Container, Button, Box} from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core'
import classnames from 'classnames';
import {useState} from 'react';
import { Save, Edit } from '@material-ui/icons';
import { CheckCircle, LocalHospital } from '@material-ui/icons';
import TabPanel from '../component/TabPanel';
import { Redirect } from 'react-router';

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

const NCResult = (props) => {
  const data = props.data
  const color = ["nc2","nc3","nc4"].indexOf(data.type) !== -1 ? "secondary.main" : "primary.main";
  const tabIndicatorColor = ["nc2","nc3","nc4"].indexOf(data.type) !== -1 ? "secondary" : "primary";
  const [selectedTabIdx, setTab] = useState(0)
  return (
    <Box className="nc-result">
      <Box className="pt16 control">
        <Button color="primary" variant='outlined' startIcon={<Edit />}
              onClick={() => {
              props.history.push({
              pathname: '/sang-loc',
              initFrmData: props.originalFrm,
              patientInfo: props.patientInfo
            })
          }}
        >Sàng lọc</Button>
        <Button color="secondary" variant='outlined' endIcon={<Save />}
            onClick={() => {
            props.history.push({
            pathname: '/'
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
        <Tab label="Bác Sỹ"></Tab>
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