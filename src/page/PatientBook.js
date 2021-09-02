import { Box, Container } from "@material-ui/core"
import PatientList from "../component/PatientList"
import { SORT } from "../config/Constants";
import { useAuth } from "../context/AuthContext"
import { useEffect, useState } from "react";
import { ArrowUpward,ArrowDownward } from "@material-ui/icons";
import {get, getDatabase, ref, child} from "firebase/database"
import { isNil } from "lodash";
import { useUIHelper } from "../context/UIHelperContext";

const db = getDatabase()

function countNC(patients,nc) {
  let total = 0;
  Object.keys(patients).map(key => {
    total = patients[key].nc === nc ? total + 1:total
    return 0
  })
  return total
}

function PatientBook(props){
  const {userInfo} = useAuth()
  const [sortBy, sort] = useState(SORT.OLDEST)
  const [patients, setPatients] = useState({})
  const {setBackdropState} = useUIHelper()
  let originalPatientKeys = userInfo === undefined?{}:userInfo.patients===undefined?{}:userInfo.patients;
  const keys = Object.keys(originalPatientKeys)
  console.log("keys.length: ",keys.length)
  setBackdropState(true)
  useEffect(() => {
    if(keys.length > 0){
      async function fetchPatients(){
        const obj = {}
        for(var i=0;i<keys.length;i++){
          const key = keys[i]
          const patientSnapShot = await get(child(ref(db),'/patients/'+key))
          const aPatient = patientSnapShot.val()
          if(isNil(aPatient)){
            continue;
          }
          const timeStamps = []
          Object.keys(aPatient.history).map(timestamp => timeStamps.push(parseInt(timestamp)))
          const lastestTimestamp = Math.max(...timeStamps)
          obj[key] = {...aPatient, nc: aPatient.history[lastestTimestamp+""].nc, "latestTimestamp": lastestTimestamp}
        }
        console.log(obj)
        setPatients({...obj})
        setBackdropState(false)
      }
      fetchPatients()
    }
  },[keys,setBackdropState])
  
  return (
    <Container maxWidth="md" className="frm-container PatientBook">
      <Box className="title pt16">Danh sách bệnh nhân ({Object.keys(patients).length})</Box>
      <Box className="controller">
        <Box className="nc-counter">
          {['nc0','nc1','nc2','nc3','nc4'].map((nc,idx) => {
            return <span key={idx} style={{marginRight: "5px"}}>{nc+': '+countNC(patients,nc)}</span>
          })}
        </Box>
        <Box>
          <div onClick={() => {sort(sortBy === SORT.LATEST?SORT.OLDEST:SORT.LATEST)}}>{sortBy === SORT.LATEST? <ArrowUpward />:<ArrowDownward />}</div>
        </Box>
      </Box>
      <PatientList {...{patients, sortBy}} />
    </Container>
  )
}

export default PatientBook;