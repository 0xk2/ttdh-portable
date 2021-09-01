import { Box, Container, Tab, Tabs } from "@material-ui/core"
import { getDatabase, ref, onValue } from "@firebase/database"
import {useState, useEffect} from 'react'
import TabPanel from "../component/TabPanel"
import PatientList from "../component/PatientList"
import {SORT} from "../config/Constants"

const db = getDatabase()

function ICU(props){
  const [waitingNC3, setWaitingNC3] = useState({})
  const [waitingNC4, setWaitingNC4] = useState({})
  const [processingNC3, setProcessingNC3] = useState({})
  const [processingNC4, setProcessingNC4] = useState({})
  const [sortBy, sort] = useState({
    waiting: SORT.LATEST,
    processing: SORT.OLDEST
  })
  const [selectedTabIdx, setTab] = useState(0)
  const lblWaiting = "Chưa chăm sóc (" + (Object.keys(waitingNC3).length + Object.keys(waitingNC4).length) + ")"
  const lblProcessing = "Đang chăm sóc ("+ (Object.keys(processingNC3).length + Object.keys(processingNC4).length) +")"
  useEffect(() => {
    return onValue(ref(db, '/waiting/nc3'), (snapshot) => {
      if(snapshot.val() === null){
        setWaitingNC3({})
      }else{
        setWaitingNC3(snapshot.val())
      }
    })
  },[])
  useEffect(() => {
    return onValue(ref(db, '/waiting/nc4'), (snapshot) => {
      if(snapshot.val() === null){
        setWaitingNC4({})
      }else{
        setWaitingNC4(snapshot.val())
      }
    })
  },[])
  useEffect(() => {
    return onValue(ref(db, '/processing/nc3'), (snapshot) => {
      if(snapshot.val() === null){
        setProcessingNC3({})
      }else{
        setProcessingNC3(snapshot.val())
      }
    })
  },[])
  useEffect(() => {
    return onValue(ref(db, '/processing/nc4'), (snapshot) => {
      if(snapshot.val() === null){
        setProcessingNC4({})
      }else{
        setProcessingNC4(snapshot.val())
      }
    })
  },[])
  const waiting = {...waitingNC3, ...waitingNC4}
  const processing = {...processingNC3, ...processingNC4}
  return (
    <Container maxWidth="md" className="frm-container icu">
      <Box className="title pt16">Bệnh nhân nặng</Box>
      <Tabs
      value={selectedTabIdx}
      indicatorColor= "secondary"
      textColor= "secondary"
      onChange={(event, newValue) => {
        setTab(newValue)
      }}
      >
        <Tab label={lblWaiting} index={0}></Tab>
        <Tab label={lblProcessing} index={1}></Tab>
      </Tabs>
      <TabPanel index={0} value={selectedTabIdx} className="tab-holder">
        {PatientList(waiting)}
      </TabPanel>
      <TabPanel index={1} value={selectedTabIdx} className="tab-holder">
        {PatientList(processing)}
      </TabPanel>
    </Container>
  )
}

export default ICU;