import { Fragment } from "react"
import { Box, Select, MenuItem, FormControlLabel, Checkbox, TextField, Button, Typography } from "@material-ui/core"
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
const defaultFormValue = {visiting: true, nc:'nc3', 'Tình trạng oxy':"Không có", "Thuốc khác":"", ...medInitial, 'Lý do ngừng chăm sóc': 'Đã khỏi bệnh', 'Thuốc được cấp':'Không'}
const Question = function({initialState, patientDetail, shortInfoKey, saveHandler, onClose, onItemValueChange}){
  initialState = initialState === undefined ? 
    {...defaultFormValue}:{...defaultFormValue, ...initialState}
  const [visiting, setVisting] = useState(initialState.visiting)
  const [providedMedicine, setProvidedMedicine] = useState("Không")
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
            <Box className="input-title">Bệnh nhân được cấp gói thuốc gì?</Box> 
            <Box className="input-subtitle">Chú ý: việc cấp thuốc này đã được sự cho phép của Bác Sỹ chịu trách nhiệm</Box>
          </Box>
          <Select className="pt8" value={initialState['Thuốc được cấp']} fullWidth={true} onChange={(e) => {
            onItemValueChange({'Thuốc được cấp' : e.target.value})
            setProvidedMedicine(e.target.value)
          }}>
            <MenuItem value={"Gói A"}>Gói A</MenuItem>
            <MenuItem value={"Gói B"}>Gói B</MenuItem>
            <MenuItem value={"Gói C"}>Gói C</MenuItem>
            <MenuItem value={"Không"}>Không cấp thuốc trong lần chăm sóc này</MenuItem>
          </Select>
          {providedMedicine === 'Gói A'?
          <Box className="pt8">
            <Box>Gói A (dùng trong 7 ngày) là những thuốc thông dụng, bao gồm thuốc hạ sốt và thuốc nâng cao thể trạng</Box>
            <ol type="number" start={1} >
              <li>
                Paracetamol 500mg: Uống 1 viên khi sốt 38.5C. Có thể lặp lại mỗi 04 hoặc 06 giờ nếu vẫn còn sốt.
              </li>
              <li>
                Các loại vitamin (vitamin tổng hợp hoặc C). Uống ngày 2 lần: sáng 01 viên, chiều 01 viên
              </li>
            </ol>
          </Box>:null}
          {providedMedicine === 'Gói B'?
          <Box className="pt8">
            <Box>Gói B (dùng trong 3 ngày). Nếu cảm thấy khó thở (nhịp thở khi nghỉ trên 20 lần/phút hoặc đo SP02 dưới 95%). Ông bà phải <Typography color="secondary" display="inline">LIÊN HỆ NGAY</Typography> với bác sỹ để được hỗ trợ. Nếu chưa liên hệ được bác sĩ, Ông/Bà có thể uống thêm thuốc kháng viên (thuốc số 3) và thuốc kháng đông (thuốc số 4), thời gian tự uống <Typography color="secondary" display="inline">KHÔNG QUÁ 03 NGÀY</Typography>. Trong thời gian này Ông/Bà cần <Typography color="secondary" display="inline">TIẾP TỤC LIÊN HỆ</Typography> bác sỹ để được hỗ trợ, tùy tình trạng sức khỏe của Ông/Bà, bác sĩ sẽ ra quyết định dùng tiếp các thuốc này hay không.</Box>
            <ol type="number" start={3}>
              <li>
                Dexamethasone 0.5mg (Uống ngày 01 lần: sang 12 viên sau khi ăn, tương đương 06mg/ngày) <Typography color="secondary" display="inline">HOẶC</Typography> Methylprednisolone 16mg (Uống ngày 02 lần: sáng 01 viên, chiều 01 viên sau khi ăn, tương đương 32mg/ngày) <Typography color="secondary" display="inline">HOẶC</Typography> Prednisolone 5mg (Uống ngày 01 lần: sáng 08 viên sau khi ăn, tương đương 40mg/ngày)
              </li>
              <li>
                Ravaroxaban 10mg (Uống ngày 01 lần: sáng 01 viên) <Typography color="secondary" display="inline">HOẶC</Typography> Apixaban 2.5mg <Typography color="secondary" display="inline">HOẶC</Typography> Dabigatran 110mg (Uống ngày 02 lần: sáng 01 viên, chiều 01 viên)
              </li>
            </ol>
            <Box>Lưu ý: Thuốc số 3 và 4 KHÔNG sử dụng trong các trường hợp sau: Phụ nữ có thai và phụ nữ đang cho con bú, người có mắc một trong những bệnh sau: viêm dạ dàu tá tràng, suy gan, các bệnh lý dễ gây chảy máu đường tiêu hóa, đường tiết niệu và các bệnh lý dễ gây chảy máu khác.</Box>
          </Box>:null
          }
          {providedMedicine === 'Gói C'?
          <Box className="pt8">
            <Box>Gói C là thuốc kháng vi rút (được kiểm soát đặc biệt) được chỉ định đối với trường hợp F0 có triệu chứng nhẹ, thuốc này được Bộ Y Tế cung cấp trong Chương trình can thiệp cộng đồng có kiểm soát. Ông/Bà vui lòng ký Giáy cam kết sử dụng thuốc để được cấp phát và sử dụng</Box>
            <ol type="number" start={5}>
              <li>Molnupiravir viên 200mg hoặc 400mg (Uống ngày 02 lần: sáng 800mg, chiều 800mg, uống 05 ngày liên tục)</li>
            </ol>
            <Box>
            <Typography color="secondary" display="inline">Lưu ý:</Typography> Theo khuyến cáo của Bộ Y Tế, đối với người bệnh đang sử dụng thuốc Molnupiravir nếu cần phải uống thuốc kháng viêm và kháng đông theo hướng dẫn như trên thì <Typography color="secondary" display="inline">NGƯNG</Typography> sử dụng thuốc Molnupiravir
            </Box>
          </Box>
          :null}
        </Box>
        <Box className="pt8">
          <Box className="input-label">
            <Box className="input-title">Bệnh nhân đang dùng thuốc gì?</Box> 
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
        <TextField fullWidth={true} multiline={true} label="Ghi chú/Lịch sử chăm sóc" minRows={3} value={initialState['Ghi chú']} onChange={(e) => {
          onItemValueChange({'Ghi chú' : e.target.value})
        }}></TextField>
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
          const newSessionKey = ['Ghi chú','nc','Tình trạng oxy','Thuốc khác', 'Thuốc được cấp',...meds]
          const newSessionVal = {
            'renderEngine':KEY,
            visiting: initialState.visiting === false ? false:true
          }
          console.log('initialState.visiting: ',initialState.visiting)
          console.log(newSessionVal)
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
          console.log('shortInfoKey:',shortInfoKey)
          shortInfoKey.map((infoKey,idx) => {
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
            : 
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
const KEY = "medical-staff"
const MedicalStaff = {
  Question, View, KEY
}

export default MedicalStaff