import { Button, Container, Box } from "@material-ui/core";
import { useUIHelper } from "../context/UIHelperContext";
import {get, getDatabase, ref, child} from "firebase/database"
import exportFromJSON from "export-from-json";

const db = getDatabase()

export function User(){
  //setSuccessMessage
  const {setBackdropState, setErrorMessage} = useUIHelper()
  const exportedUsers = []
  const userKeys = ['email', 'expertise', 'name', 'region', 'task_f0', 'task_test','task_vaccine']
  const fileName = "users_"+(new Date().getTime()/1000)
  const exportType =  exportFromJSON.types.csv
  return (
    <Container className="frm-container">
      <Box className="pt16 title">
        Export all user data
      </Box>
      <Button variant="contained"
      color="primary"
      onClick={() =>{
        setBackdropState(true)
        get(
          child(ref(db),'/users/')
        ).then((snapshot) => {
          if(snapshot.exists()){
            snapshot.forEach((anUserSnapshot) => {
              var key = anUserSnapshot.key;
              // childData will be the actual contents of the child
              const shallowUserData = {
                'phone':key
              }
              anUserSnapshot.forEach((attrSnapshot) => {
                const attr = attrSnapshot.key
                if(userKeys.indexOf(attr) !== -1){
                  shallowUserData[attr] = attrSnapshot.val()
                }
              })
              exportedUsers.push(shallowUserData)
            })
            console.log(exportedUsers)
            exportFromJSON({ data:exportedUsers, fileName, exportType })
          }else{
            setErrorMessage('no data available')
          }
        }).catch((error) => {
          console.log(error)
          setErrorMessage('Error!')
        }).finally(() => {
          setBackdropState(false)
        })
      }}>Export data</Button>
    </Container>
    
  )
}