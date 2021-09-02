import { Box, Container } from "@material-ui/core"
import PatientList from "../component/PatientList"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"
import {SORT} from '../config/Constants'
import {ArrowUpward, ArrowDownward} from "@material-ui/icons"

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
  let patients = userInfo === undefined?{}:userInfo.patients;
  patients = patients === undefined ?{}:patients
  const [sortBy, sort] = useState({
    waiting: SORT.LATEST,
    processing: SORT.OLDEST
  })
  return (
    <Container maxWidth="md" className="frm-container patient-book">
      <Box className="title pt16">Danh sách bệnh nhân</Box>
      <Box className="controller">
        <Box className="nc-counter">
          {['nc0','nc1','nc2','nc3','nc4'].map((nc,key) => {
            return <span key={key} style={{marginRight: "5px"}}>{nc+': '+countNC(patients,nc)}</span>
          })}
        </Box>
        <Box>
          <div onClick={() => {sort(sortBy === SORT.LATEST?SORT.OLDEST:SORT.LATEST)}}>{sortBy === SORT.LATEST? <ArrowUpward />:<ArrowDownward />}</div>
        </Box>
      </Box>
      {PatientList(patients, sortBy)}
    </Container>
  )
}

export default PatientBook;