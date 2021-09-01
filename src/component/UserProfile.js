import { useState } from "react"
import { Box,TextField, Button, FormControlLabel, Checkbox, Select, MenuItem } from "@material-ui/core"
import { Autocomplete } from "@material-ui/lab"
import { Save } from "@material-ui/icons"
import ResetPhoneButton from "./ResetPhoneButton"
import dataSource from '../page/PatientInfo/dataSource'

const MedicalExperties = [
  {'title': 'Sinh viên Y'},{'title': 'Bác Sỹ'}
]
const isStringNil = function(str){
  if(str === '' || str === undefined || str === null) return true
  return false
}
const HCMDistricts = {
  "99999": {
    "name": "Mạng lưới Thầy thuốc đồng hành",
    "name_with_type": "Mạng lưới Thầy thuốc đồng hành",
    "code": "99999"
  }
}
Object.keys(dataSource['local.vn_district']).map((d) => {
  if(dataSource['local.vn_district'][d].parent_code === "79"){
    HCMDistricts[d] = dataSource['local.vn_district'][d]
  }
  return 0;
})

const UserProfile = ({phoneNumber, handleResetPhone, saveHandler, disabledResetPhoneButton}) => {
  const [newUserInfo, setNewUserInfo] = useState({region:"768",referralCode:"",task_f0:false,task_test:false,task_vaccine:false,expertise:"",name:"",email:"",isTTDHMember:false})
  const validate = () => {
    let validated = [];
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
        <TextField type="text" value={newUserInfo.name} label="Họ và tên" required={true} fullWidth={true} onChange={(e) => {
          setNewUserInfo({...newUserInfo, 'name':e.target.value})
        }} />
        <Box className="phone-ipt inline-inputs">
          <TextField type="text" value={phoneNumber} label="Số điện thoại" required={true} disabled />
          <ResetPhoneButton onClick={handleResetPhone} disabled={disabledResetPhoneButton} />
        </Box>
        <TextField type="email" value={newUserInfo.email} required={true} label="Email" fullWidth={true} onChange={(e) => {
          setNewUserInfo({...newUserInfo, 'email':e.target.value})
        }} />
        <Box className="phone-ipt inline-inputs">
          <FormControlLabel className="pt8" control={<Checkbox checked={newUserInfo.isTTDHMember} onChange={(e) => setNewUserInfo({...newUserInfo, isTTDHMember:e.target.checked})} />} 
              label="Đã là thành viên trên GapoWork của mạng lưới Thầy thuốc đồng hành chưa?" />
        </Box>
        <Autocomplete freeSolo required
        options={MedicalExperties.map((option) => option.title)} disableClearable 
        onChange={(e, newValue) => {
          setNewUserInfo({...newUserInfo, 'expertise': newValue})
        }}
        onInputChange={(e, newValue) => {
          setNewUserInfo({...newUserInfo, 'expertise': newValue})
        }}
        value={newUserInfo.expertise}
        inputValue={newUserInfo.expertise}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Chuyên môn"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'text' }}
          />
        )} />
        <Box className="pt16">
          <Box>Nhiệm vụ</Box>
          <Box>
            <FormControlLabel className="pt8" control={<Checkbox checked={newUserInfo.task_f0} onChange={(e) => setNewUserInfo({...newUserInfo, task_f0:e.target.checked})} />} 
            label="Điều trị F0 tại nhà" />
          </Box>
          <Box>
            <FormControlLabel className="pt8" control={<Checkbox checked={newUserInfo.task_test} onChange={(e) => setNewUserInfo({...newUserInfo, task_test:e.target.checked})} />} 
            label="Lấy mẫu xét nghiệm" />
          </Box>
          <Box>
            <FormControlLabel className="pt8" control={<Checkbox checked={newUserInfo.task_vaccine} onChange={(e) => setNewUserInfo({...newUserInfo, task_vaccine:e.target.checked})} />} 
            label="Tiêm vaccine" />
          </Box>
        </Box>
        <Select value={newUserInfo.region}
          fullWidth={true}
          required label="Khu vực hoạt động (Phường, xã)"
          onChange={(e) => {
            setNewUserInfo({...newUserInfo, 'region':e.target.value})
          }}
        >
          {Object.keys(HCMDistricts).map((d,k) => {
            return (<MenuItem key={k} value={d}>{HCMDistricts[d].name_with_type}</MenuItem>)
          })}
        </Select>
        <TextField type="text" value={newUserInfo.referralCode} label="Mã giới thiệu (nếu có)" fullWidth={true} onChange={(e) => {
          setNewUserInfo({...newUserInfo, 'referralCode':e.target.value})
        }} />
        <Box style={{textAlign:"right"}}>
          <Button startIcon={<Save />} variant="contained" color="primary"
          onClick={() => {
            const validated = validate()
            if(validated === true){
              saveHandler(newUserInfo)
            }else{
              saveHandler(validated.join(', '))
            }
          }}>Lưu lại</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default UserProfile;