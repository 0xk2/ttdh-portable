import { Box, Container } from "@material-ui/core"
import PatientList from "../component/PatientList"
import { useAuth } from "../context/AuthContext"

function PatientBook(props){
  const {userInfo} = useAuth()
  const patients = userInfo === undefined?{}:userInfo.patients;
  return (
    <Container maxWidth="md" className="frm-container PatientBook">
      <Box className="title pt16">Danh sách bệnh nhân</Box>
      {PatientList(patients)}
    </Container>
  )
}

export default PatientBook;