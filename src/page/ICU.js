import { Box, Container,Button, Tab, Tabs, Card, Chip, CardContent, CardActions, Typography } from "@material-ui/core"
import {useUIHelper} from '../context/UIHelperContext'
import { getDatabase, ref, onValue } from "@firebase/database"
import {useState, useEffect} from 'react'
import TabPanel from "../component/TabPanel"
import dataSource from "../page/PatientInfo/dataSource"
import { FileCopy } from "@material-ui/icons"

const districtDataSource = dataSource['local.vn_district']
const db = getDatabase()

function ChipNC(props){
  if(props.nc==='nc3'){
    return <Chip color="secondary" variant="outlined" label="NC3" />
  }else if(props.nc==='nc4'){
    return <Chip color="secondary" variant="default" label="NC4" />
  }
}

function ICU(props){
  const [waitingNC3, setWaitingNC3] = useState({})
  const [waitingNC4, setWaitingNC4] = useState({})
  const [processingNC3, setProcessingNC3] = useState({})
  const [processingNC4, setProcessingNC4] = useState({})
  const [selectedTabIdx, setTab] = useState(0)
  const lblWaiting = "Chưa chăm sóc (" + (Object.keys(waitingNC3).length + Object.keys(waitingNC4).length) + ")"
  const lblProcessing = "Đang chăm sóc ("+ (Object.keys(processingNC3).length + Object.keys(processingNC4).length) +")"
  const {setSuccessMessage, setErrorMessage} = useUIHelper()
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
      <Box className="title pt16">Phòng cấp cứu online</Box>
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
        {Object.keys(waiting).map((key,idx) => {
          const item = waiting[key];
          const age = (new Date()).getFullYear() - parseInt(item.dob);
          return <Card className="icu-card" variant="outlined">
            <CardContent>
              <Box className="icu-card-name">
                <Typography variant="h5" component="h2" gutterBottom>{item.name}</Typography>
                <ChipNC nc={item.nc} />
              </Box>
              <Box>
                <Chip icon={<FileCopy />} onClick={() => {
                  navigator.clipboard.writeText(item.phone);
                  setSuccessMessage('Đã copy!')
                }} label={item.phone} />
              </Box>
              <Box className="pt8">
                <Typography>{age} tuổi</Typography>
                <Typography>Ngụ tại: {item.address}</Typography>
                <Typography>{districtDataSource[item.districtCode].path_with_type}</Typography>
                <Typography>Mã khu vực: {item.districtCode}</Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" variant="outlined" onClick={() => {
                console.log("key: ",item)
              }}>Chi tiết</Button>
            </CardActions>
          </Card>
        })}
      </TabPanel>
      <TabPanel>
        {/* show lịch sử chăm sóc lần cuối */}
      </TabPanel>
    </Container>
  )
}

export default ICU;