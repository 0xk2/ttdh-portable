import {Container, Button, Box} from '@material-ui/core';
import { Tabs, Tab } from '@material-ui/core'
import classnames from 'classnames';
import {useState} from 'react';
import { ChevronLeft, NavigateNext, Save, Edit } from '@material-ui/icons';
import { CheckCircle, LocalHospital } from '@material-ui/icons';

const TabPanel = (props) => {
  const {value, index, children} = props;
  return <Box hidden={value !== index} className="tab-pane">
    {children}
  </Box>
}

const Result = (props) => {
  return (
    <Container maxWidth="md" className="frm-container result-page">
      {
        props.location.data === undefined ? 
        <EmptyResultPage {...props}/> :
        <NCResult {...props} data={props.location.data} originalFrm={props.location.originalFrm} />
      }
    </Container>
  )
}

const EmptyResultPage = (props) => {
  return (
    <Box className="empty-result">
      <Box className="title">
        Không có kết quả!
      </Box>
      <Button color="secondary" startIcon={<ChevronLeft />}
          onClick={() => {
          props.history.push({
          pathname: '/'
        })
      }}
      >quay về trang điền form</Button>
    </Box>
  )
}

const NCResult = (props) => {
  const data = props.data
  const color = ["nc2","nc3","nc4"].indexOf(data.type) !== -1 ? "secondary.main" : "primary.main";
  const tabIndicatorColor = ["nc2","nc3","nc4"].indexOf(data.type) !== -1 ? "secondary" : "primary";
  const [selectedTabIdx, setTab] = useState(0)
  return (
    <Box className="nc-result">
      <Box className="pt16">
        <Button color="primary" variant='outlined' startIcon={<Edit />}
              onClick={() => {
              props.history.push({
              pathname: '/',
              initFrmData: props.originalFrm
            })
          }}
        >Sửa form</Button>
      </Box>
      <Box className={classnames("title","annoucement")} color={color}>
        <Box>{data.title}</Box>
        <Box className="control">
          <Button color="primary" variant='contained' startIcon={<Save />}
                onClick={() => {
                props.history.push({
                pathname: '/'
              })
            }}
          >Lưu lại</Button>
          <Button color="secondary" variant='outlined' endIcon={<NavigateNext />}
              onClick={() => {
              props.history.push({
              pathname: '/'
            })
          }}
          >Không lưu</Button>
        </Box>
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
              <div key={idx} className="mt4">
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
              <div key={idx} className="mt4">
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