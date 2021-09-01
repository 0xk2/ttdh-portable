import { Box, Container } from "@material-ui/core"
import PatientList from "../component/PatientList"
// import { SORT } from "../config/Constants";
import { useAuth } from "../context/AuthContext"
// import { useEffect, useState } from "react";
// import { ArrowUpward,ArrowDownward } from "@material-ui/icons";
// import {get, getDatabase, ref, child} from "firebase/database"
// import {getDatabase} from "firebase/database"

// const db = getDatabase()

// function countNC(patients,nc) {
//   let total = 0;
//   Object.keys(patients).map(key => {
//     total = patients[key].nc === nc ? total + 1:total
//     return 0
//   })
//   return total
// }

function PatientBook(props){
  // const {userInfo} = useAuth()
  // const [sortBy, sort] = useState(SORT.OLDEST)
  // const [patients, setPatients] = useState({})
  // let originalPatientKeys = userInfo === undefined?{}:userInfo.patients===undefined?{}:userInfo.patients;
  // useEffect(() => {
  //   Object.keys(originalPatientKeys).forEach((key) => {
  //     get(child(ref(db),'/patients/'+key)).then((patientSnapShot) => {
  //       const aPatient = {}
  //       patientSnapShot.forEach((attrSnapshot) => {
  //         if(attrSnapshot.key !== 'history'){
  //           aPatient[attrSnapshot.key] = attrSnapshot.val()
  //         }
  //       })
  //       console.log(key, aPatient)
  //       setPatients((state, props) => {return {...state, key: aPatient}})
  //     })
  //   })
  // },[originalPatientKeys])
  
  // return (
  //   <Container maxWidth="md" className="frm-container PatientBook">
  //     <Box className="title pt16">Danh sách bệnh nhân ({Object.keys(patients).length})</Box>
  //     <Box className="controller">
  //       <Box className="nc-counter">
  //         {['nc0','nc1','nc2','nc3','nc4'].map(nc => {
  //           return <span style={{marginRight: "5px"}}>{nc+': '+countNC(patients,nc)}</span>
  //         })}
  //       </Box>
  //       <Box>
  //         <div onClick={() => {sort(sortBy === SORT.LATEST?SORT.OLDEST:SORT.LATEST)}}>{sortBy === SORT.LATEST? <ArrowUpward />:<ArrowDownward />}</div>
  //       </Box>
  //     </Box>
  //     {PatientList(patients, sortBy)}
  //   </Container>
  // )
  const {userInfo} = useAuth()
  let patients = userInfo === undefined?{}:userInfo.patients;
  patients = patients === undefined ?{}:patients
  return (
    <Container maxWidth="md" className="frm-container PatientBook">
      <Box className="title pt16">Danh sách bệnh nhân</Box>
      {PatientList(patients)}
    </Container>
  )
}

export default PatientBook;