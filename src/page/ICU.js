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
    return <Chip color="secondary" variant="contained" label="NC4" />
  }
}

function ICU(props){
  const [waiting, setWaiting] = useState({})
  const [processing, setProcessing] = useState({})
  const [selectedTabIdx, setTab] = useState(0)
  const lblWaiting = "Chờ xác minh (" + Object.keys(waiting).length + ")"
  const lblProcessing = "Đang chăm sóc ("+ Object.keys(processing).length +")"
  const {setSuccessMessage, setErrorMessage} = useUIHelper()
  useEffect(() => {
    return onValue(ref(db, '/waiting'), (snapshot) => {
      if(snapshot.val() === null){
        setWaiting({})
      }else{
        setWaiting(snapshot.val())
      }
    })
  },[])
  useEffect(() => {
    return onValue(ref(db, '/processing'), (snapshot) => {
      if(snapshot.val() === null){
        setProcessing({})
      }else{
        setProcessing(snapshot.val())
      }
    })
  },[])
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
      <TabPanel index={0} value={selectedTabIdx}>
        {Object.keys(waiting).map((key,idx) => {
          const item = waiting[key];
          return <Card className="icu-card" variant="outlined">
            <CardContent>
              <Box>
                <Typography variant="h5" component="h2" gutterBottom>{item.name}</Typography>
                <ChipNC nc={item.nc} />
              </Box>
              <Box>
                <Chip icon={<FileCopy />} onClick={() => {
                  navigator.clipboard.writeText(item.phone);
                  setSuccessMessage('Đã copy!')
                }} label={item.phone} />
              </Box>
              <Box>
                <Typography>{districtDataSource[item.districtCode].name_with_type}</Typography>
                <Typography>Mã quận: {item.districtCode}</Typography>
              </Box>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => {
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