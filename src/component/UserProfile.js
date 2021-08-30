import { useState } from "react"
import { Box,TextField, Button } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { Save } from "@material-ui/icons"
import ResetPhoneButton from "./ResetPhoneButton"

const MedicalExperties = [
  {'title': 'Sinh viên Y'},{'title': 'Bác Sỹ'}
]
const isStringNil = function(str){
  if(str === '' || str === undefined || str === null) return true
  return false
}

const UserProfile = ({phoneNumber, handleResetPhone, save, disabledResetPhoneButton}) => {
  const [newUserInfo, setNewUserInfo] = useState({})
  const validate = () => {
    let validated = [];
    console.log(isStringNil(newUserInfo.name))
    if(isStringNil(newUserInfo.name)) { validated.push('Tên') }
    if(isStringNil(newUserInfo.email)) { validated.push('Email') }
    if(isStringNil(newUserInfo.expertise)) { validated.push('Chuyên môn') }
    if(isStringNil(newUserInfo.region)) { validated.push('Khu vực làm việc') }
    if(validated.length === 0){ return true }
    return validated
  }
  return (
    <Box>
      <Box className="pt16 title" color="secondary.main">Hoàn tất thông tin đăng ký</Box>
      <Box className="form-data">
        <TextField type="text" value={newUserInfo.name === undefined ? "":newUserInfo.name} label="Họ và tên" required={true} fullWidth={true} onChange={(e) => {
          setNewUserInfo({...newUserInfo, 'name':e.target.value})
        }} />
        <Box className="phone-ipt inline-inputs">
          <TextField type="text" value={phoneNumber} label="Số điện thoại" required={true} disabled />
          <ResetPhoneButton onClick={handleResetPhone} disabled={disabledResetPhoneButton} />
        </Box>
        
        <TextField type="email" value={newUserInfo.email === undefined ? "":newUserInfo.email} required={true} label="Email" fullWidth={true} onChange={(e) => {
          setNewUserInfo({...newUserInfo, 'email':e.target.value})
        }} />
        <Autocomplete freeSolo required
        options={MedicalExperties.map((option) => option.title)} disableClearable 
        onChange={(e, newValue) => {
          setNewUserInfo({...newUserInfo, 'expertise': newValue})
        }}
        onInputChange={(e, newValue) => {
          setNewUserInfo({...newUserInfo, 'expertise': newValue})
        }}
        value={newUserInfo.expertise === undefined ? "" : newUserInfo.expertise}
        inputValue={newUserInfo.expertise === undefined ? "" : newUserInfo.expertise}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Chuyên môn"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'text' }}
          />
        )} />
        <TextField type="text" value={newUserInfo.region === undefined ? "":newUserInfo.region} required label="Khu vực hoạt động (Phường, xã)" fullWidth={true} onChange={(e) => {
          setNewUserInfo({...newUserInfo, 'region':e.target.value})
        }} />
        <TextField type="text" value={newUserInfo.referralCode === undefined ? "":newUserInfo.referralCode} label="Mã giới thiệu (nếu có)" fullWidth={true} onChange={(e) => {
          setNewUserInfo({...newUserInfo, 'referralCode':e.target.value})
        }} />
        <Box style={{textAlign:"right"}}>
          <Button startIcon={<Save onClick={() => {
            const validated = validate()
            if(validated === true){
              save(newUserInfo)
            }else{
              save(validated.join(', '))
            }
          }} />} variant="contained" color="primary">Lưu lại</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default UserProfile;