import { Fragment } from "react"
import { Box, Select, MenuItem, FormControlLabel, Checkbox, TextField, Button } from "@material-ui/core"
import { Save, Close, Check } from "@material-ui/icons"
import { Autocomplete } from "@material-ui/lab"
import { useState } from "react"
import dataStructure from "../../PatientInfo/dataStructure"
import RenderFormData from './RenderFormData'

//hạ sốt, kháng virus, chống đông đường uống, chống ngưng dập tiểu cầu, Corticoid, kháng sinh
const meds = ["Hạ sốt","Kháng virus","Chống đông đường uống","Corticoid","Kháng sinh"]
const stopFollowingReasons = ["Đã khỏi bệnh","Đã vào viện","Đã có bác sỹ chuyên khoa chăm sóc","Không liên lạc được quá 3 lần","Từ chối chăm sóc","Đã tử vong"]
const medInitial = {}
meds.map((key) => {
  medInitial[key] = false
  return 0
})
const defaultFormValue = {visiting: true, nc:'nc3', 'Tình trạng oxy':"Không có", "Thuốc khác":"", ...medInitial, 'Lý do ngừng chăm sóc': 'Đã khỏi bệnh'}
const Question = function({initialState, patientDetail, patientInfoKey, saveHandler, onClose, onItemValueChange}){
  initialState = initialState === undefined ? 
    {...defaultFormValue}:{...defaultFormValue, ...initialState}
  const [visiting, setVisting] = useState(initialState.visiting)
  return (
    <Box className="new-sesison-dialog">
      <Box>
        <Box className="title">
          Nhật ký chăm sóc
        </Box>
        <Box className="pt8">
          <Box className="input-label">
            <Box className="input-title">Tình trạng oxy</Box> 
          </Box>
          <Select className="pt8" value={initialState['Tình trạng oxy']} fullWidth={true} onChange={(e) => {
            onItemValueChange({'Tình trạng oxy' : e.target.value})
          }}>
            <MenuItem value={"Không có"}>Không có</MenuItem>
            <MenuItem value={"Đang liên hệ"}>Đang liên hệ</MenuItem>
            <MenuItem value={"Đã có"}>Đã có</MenuItem>
          </Select>
        </Box>
        <Box className="pt8">
          <Box className="input-label">
            <Box className="input-title">Đang dùng thuốc gì?</Box> 
          </Box>
          {
            meds.map((med,idx) => {
              return (
                <Box className="pt8" key={idx}>
                <FormControlLabel control={
                  <Checkbox checked={initialState[med]} onChange={(e) => {
                    const obj = {}
                    obj[med] = e.target.checked
                    onItemValueChange(obj)
                  }} />
                } label={med} />
                </Box>
              )
            })
          }
          <TextField value={initialState['Thuốc khác']} fullWidth={true} label="Thuốc khác (nếu có)" 
          onChange={(e) => onItemValueChange({"Thuốc khác": e.target.value}) } />
        </Box>
        <TextField fullWidth={true} multiline={true} label="Ghi chú" minRows={3} value={initialState['Ghi chú']} onChange={(e) => {
          onItemValueChange({'Ghi chú' : e.target.value})
        }}></TextField>
        <Box className="pt8">
          <Box className="input-label">
            <Box className="input-title">Cập nhật phân tầng nguy cơ</Box> 
            <Box className="input-subtitle pt8">Chú ý: Bác sỹ cấp cứu chỉ xem được NC3,NC4 và chỉ bác sỹ cấp cứu mới cập nhật được NC3,NC4.</Box>
          </Box>
          <Select className="pt8" value={initialState.nc} fullWidth={true} onChange={(e) => {
            onItemValueChange({nc : e.target.value})
          }}>
            <MenuItem value={"nc4"}>NC4</MenuItem>
            <MenuItem value={"nc3"}>NC3</MenuItem>
            <MenuItem value={"nc2"}>NC2</MenuItem>
            <MenuItem value={"nc1"}>NC1</MenuItem>
            <MenuItem value={"nc0"}>NC0</MenuItem>
          </Select>
        </Box>
        <Box className="pt8">
          <FormControlLabel control={
            <Checkbox checked={initialState.visiting} onChange={(e) => {
              onItemValueChange({visiting : e.target.checked})
              setVisting(e.target.checked)
            }} />
          } label="Còn tiếp tục chăm sóc ca này trong tương lai không?" />
          {!visiting?
          <Autocomplete freeSolo 
          options={stopFollowingReasons.map((option) => option)} disableClearable 
          onChange={(e, newValue) => {
            onItemValueChange({'Lý do ngừng chăm sóc' : newValue})
          }}
          onInputChange={(e, newValue) => {
            onItemValueChange({'Lý do ngừng chăm sóc' : newValue})
          }}
          value={initialState['Lý do ngừng chăm sóc']}
          inputValue={initialState['Lý do ngừng chăm sóc']}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Lý do ngừng chăm sóc"
              margin="normal"
              variant="filled" required={true}
              InputProps={{ ...params.InputProps, type: 'text' }}
            />
          )} />:null}
        </Box>
      </Box>
      <Box className="pt16" style={{display: "flex", justifyContent: "space-between"}}>
        <Button startIcon={<Save />} variant="contained" color="secondary"
        onClick={() => {
          const newSessionKey = ['Ghi chú','nc','Tình trạng oxy','Thuốc khác', ...meds]
          const newSessionVal = {
            'renderEngine':KEY,
            visiting: initialState.visiting === false?false:true
          }
          if(initialState.visiting === false){
            newSessionKey.push('Lý do ngừng chăm sóc')
          }
          newSessionKey.map((key) => {
            newSessionVal[key] = initialState[key]
            return 0
          })
          // new key:
          const session_key = parseInt(new Date().getTime()/1000)+''
          const shortInfo = {lastestSessionTimestamp: session_key}
          patientInfoKey.map((infoKey,idx) => {
            shortInfo[infoKey] = initialState[infoKey] !== undefined? initialState[infoKey]: patientDetail[infoKey]
            return 0
          })
          saveHandler(newSessionVal,shortInfo,session_key)
        }}>Lưu lại</Button>
        <Button variant="contained" startIcon={<Close />} onClick={onClose}>Hủy</Button>
      </Box>
    </Box>
  )
}
const View = function(session){
  const sections = dataStructure.frmdata.sections
  let inputs = {
    "user": { "label":"Người thực hiện", render: (val) => {
      return <a href={"tel:"+val}>{val}</a>
    }},
    "status": { "label":"Trạng thái", render: (val) => {
      switch(val){
        case "waiting": return "Chờ chăm sóc";
        case "done": return "Đã kết thúc chăm sóc";
        case "processing": 
        default:
        return "Đang chăm sóc";
      }
    } },
    "nc": { "label":"Nguy cơ"},
    "Ghi chú":{ render: (val) => {
      return <div className="enable-white-space">{val}</div>
    } },
    "note":{ "label":"Ghi chú/Lịch sử chăm sóc",render: (val) => {
      return <div className="enable-white-space">{val}</div>
    } }
  }
  Object.keys(sections).map((section_id) => {
    inputs = {...sections[section_id].inputs, ...inputs}
    return 0
  })
  return (
    <Fragment>
      {session['frmdata'] !== undefined ? 
      <Box className="form-result">
        <Box className="form-title">Kết quả chấm nguy cơ:</Box>
        {RenderFormData(session['frmdata']) }
      </Box>
      : null}
      <Box className="form-result">
        <Box className="form-title">Thông tin chăm sóc:</Box>
        <ul>
        {Object.keys(session).map((key,idx) => {
          if(['frmdata','renderEngine'].indexOf(key) !== -1){
            return null
          }
          return (
            <li key={idx}> 
            {(inputs[key]!==undefined && inputs[key].label !== undefined)?inputs[key].label:key}
            :&nbsp;
            {(inputs[key]!==undefined && inputs[key].render !== undefined)?
              inputs[key].render(session[key]):
              session[key] === true? 
              <Check color="primary" size="small"/>:
              (session[key] === false || session[key] === undefined)===true?
              <Close color="secondary" size="small" />
              :" "+session[key]
            } 
            </li>
          )
        })}
        </ul>
      </Box>
    </Fragment>
  )
}
const KEY = "icu-doctor"
const ICUDoctor = {
  Question, View, KEY
}

export default ICUDoctor
