import { Box, Container, Tab, Tabs } from "@material-ui/core"
import { getDatabase, ref, onValue } from "@firebase/database"
import {useState, useEffect} from 'react'
import TabPanel from "../component/TabPanel"
import PatientList from "../component/PatientList"
import {SORT} from "../config/Constants"
import { ArrowDownward, ArrowUpward } from "@material-ui/icons"
import { useUIHelper } from "../context/UIHelperContext"

const db = getDatabase()

function ICU(props){
  const [waitingNC3, setWaitingNC3] = useState({})
  const [waitingNC4, setWaitingNC4] = useState({})
  const [processingNC3, setProcessingNC3] = useState({})
  const [processingNC4, setProcessingNC4] = useState({})
  const {setBackdropState} = useUIHelper()
  const [sortBy, sort] = useState({
    waiting: SORT.LATEST,
    processing: SORT.OLDEST
  })
  const [selectedTabIdx, setTab] = useState(0)
  const lblWaiting = "Chưa chăm sóc (" + (Object.keys(waitingNC3).length + Object.keys(waitingNC4).length) + ")"
  const lblProcessing = "Đang chăm sóc ("+ (Object.keys(processingNC3).length + Object.keys(processingNC4).length) +")"
  useEffect(() => {
    setBackdropState(true)
    return onValue(ref(db, '/waiting/nc3'), (snapshot) => {
      setBackdropState(false)
      if(snapshot.val() === null){
        setWaitingNC3({})
      }else{
        setWaitingNC3(snapshot.val())
      }
    })
  },[setBackdropState])
  useEffect(() => {
    setBackdropState(true)
    return onValue(ref(db, '/waiting/nc4'), (snapshot) => {
      setBackdropState(false)
      if(snapshot.val() === null){
        setWaitingNC4({})
      }else{
        setWaitingNC4(snapshot.val())
      }
    })
  },[setBackdropState])
  useEffect(() => {
    setBackdropState(true)
    return onValue(ref(db, '/processing/nc3'), (snapshot) => {
      setBackdropState(false)
      if(snapshot.val() === null){
        setProcessingNC3({})
      }else{
        setProcessingNC3(snapshot.val())
      }
    })
  },[setBackdropState])
  useEffect(() => {
    setBackdropState(true)
    return onValue(ref(db, '/processing/nc4'), (snapshot) => {
      setBackdropState(false)
      if(snapshot.val() === null){
        setProcessingNC4({})
      }else{
        setProcessingNC4(snapshot.val())
      }
    })
  },[setBackdropState])
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
        <Box className="controller">
          <Box className="nc-counter">NC3: {Object.keys(waitingNC3).length}, NC4: {Object.keys(waitingNC4).length}</Box>
          <Box>
            <div onClick={() => {sort({...sortBy, waiting: sortBy.waiting === SORT.LATEST?SORT.OLDEST:SORT.LATEST})}}>{sortBy.waiting === SORT.LATEST? <ArrowUpward />:<ArrowDownward />}</div>
          </Box>
        </Box>
        {PatientList(waiting,sortBy.waiting)}
      </TabPanel>
      <TabPanel index={1} value={selectedTabIdx} className="tab-holder">
        <Box className="controller">
          <Box className="nc-counter">NC3: {Object.keys(processingNC3).length}, NC4: {Object.keys(processingNC4).length}</Box>
          <Box>
            <div onClick={() => {sort({...sortBy, processing: sortBy.processing === SORT.LATEST?SORT.OLDEST:SORT.LATEST})}}>{sortBy.processing === SORT.LATEST? <ArrowUpward />:<ArrowDownward />}</div>
          </Box>
        </Box>
        {PatientList(processing,sortBy.processing)}
      </TabPanel>
    </Container>
  )
}

export default ICU;