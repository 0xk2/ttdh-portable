import {Type, Validation} from './constants'
import { TextField, Typography } from '@material-ui/core'
import DataSource from './dataSource'
import { isNil } from 'lodash'
/**
 * Work in progress
 * TODO: create a seperate module to render form input for efficiency and optimization
 */
const InputRender = function({id, name, required, value, label, fullWidth, browserAutocomplete, persistantSuggestion, dataSource, onChange}) {
  const randStr = parseInt(100000*Math.random())+""
  const simpleOnChangeHander = function(e){
    onChange(e.target.value)
  }
  if(isNil(browserAutocomplete) === true){
    name = name+"-"+randStr
  }
  return (
    <>
    {type === Type.TEXT ? <TextField id={id} name={name} required={required} value={value === undefined ? '' : value}
    label={label} fullWidth={fullWidth} 
    onChange={simpleOnChangeHander} /> : null}
    {type === Type.TEXT_LONG ? <TextField id={name+randstr} name={name+randstr} required={required} value={value === undefined ? '' : value} multiline={true}
    label={label} fullWidth={fullWidth} minRows={5}
    onChange={simpleOnChangeHander} /> : null}
    {type === Type.NUMBER ? <TextField id={name+randstr} type="number" name={name+randstr} required={required} value={value === undefined ? '' : value}
    label={label} fullWidth={fullWidth} 
    onChange={simpleOnChangeHander} /> : null}
    {type === Type.PHONE ? <TextField type="tel" id={randstr} name={randstr} variant="filled" required={required} value={value === undefined ? '' : value}
    label={label} fullWidth={fullWidth} 
    onChange={simpleOnChangeHander} /> : null}
    {type === Type.EMAIL ? <TextField type="email" id={randstr} name={randstr} required={required} value={value === undefined ? '' : value}
    label={label} fullWidth={fullWidth} 
    onChange={simpleOnChangeHander} /> : null}
    {type === Type.DATE ? <Box className="itm-line">
      <Box className="itm-label">{label} {required===true? "*" : null}</Box><TextField type="date" name={name} required={required} value={value === undefined ? '' : value}
    fullWidth={fullWidth}  
    onChange={simpleOnChangeHander} /></Box> : null}
    {type === Type.DROPDOWN_SINGLE ? 
      DropdownSingleFrm({id, name, required, value, label, fullWidth, onChange, dataSource, persistantSuggestion})
    : null}
    {type === Type.AUTOCOMPLETE_FREESOLO ? 
      AutocompleteFrm({id, name, required, value, label, fullWidth, onChange, dataSource})
    :null}
    {type === Type.BOOL?
      <FormControlLabel color='secondary.main' control={
        <Checkbox required={required} checked={value} onChange={(e) => {onChange(e.target.checked)}} />
      } label={label} />
    :null}
    {type === Type.VNADDRESS?
      VNAddress({id, name, required, value, label, fullWidth, onChange})
    :null}
    </>
  )
  
}

const DropdownSingleFrm = function({id, name, required, value, label, fullWidth, onChange, dataSource, persistantSuggestion}){
  const items = []
  if(typeof (dataSource) !== 'object'){
    dataSource = DataSource[dataSource]
  }else{
    Object.keys(dataSource).map((value, didx) => {
      items.push({value, label: dataSource[value].name_with_type === undefined ? dataSource[value].name : dataSource[value].name_with_type});
      return 0
    })
  }
  return (
    <Box className="itm-line">
      <Box className="itm-label">
        {label}&nbsp;
        {required===true? <Typography display="inline" color="secondary">*</Typography> : null}
      </Box>
      <Select id={id} name={name} required={required} value={value === undefined ? '' : value}
        label={label} fullWidth={fullWidth}  
        onChange={(e) => {
          if(persistantSuggestion){
            localStorage.setItem(name, e.target.value)
          }
          onChange(e.target.value)
        }}>
        {items.map((item, k) => {
          return <MenuItem value={item.value} key={k}>{item.label}</MenuItem>
        })}
      </Select>
    </Box>
  )
}

const AutocompleteFrm = function({id, name, required, value, label, fullWidth, onChange, dataSource}){
  const items = []
  if(Array.isArray(dataSource) === true){
    dataSource.map((itm) => { items.push(itm); return 0}) 
  }else if(Array.isArray(DataSource[dataSource]) === true){
    DataSource[dataSource].map((itm) => {items.push(itm); return 0}  )
  }else{
    return ErrorInputEl()
  }
  
  return (
    <Autocomplete id={id} name={name} freeSolo required={required} fullWidth={fullWidth}
      options={items.map((option) => option)} disableClearable 
      onChange={(e, newValue) => {
        onChange(newValue)
      }}
      onInputChange={(e, newValue) => {
        onChange(newValue)
      }}
      value={value}
      inputValue={value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="normal"
          variant="filled" required={required}
          InputProps={{ ...params.InputProps, type: 'text' }}
        />
      )} />
  )
}

const VNAddress = function({id, name, required, value, label, onChange}){
  const [province, setProvince] = useState(value.provinceCode)
  const [district, setDistrict] = useState(value.districtCode)
  const [ward, setWard] = useState(value.ward)
  const [address, setAddress] = useState(value.address)
  const [note, setNote] = useState(value.note)
  const districts = []
  Object.keys(DataSource['local.vn_district']).map((district_code, didx) => {
    const dst = DataSource['local.vn_district'][district_code]
    if(dst.parent_code === value.provinceCode){
      districts.push({value:district_code, 
        label: dst.name_with_type === undefined ? dst.name : dst.name_with_type});
    }
    return 0
  })
  return (
    <Box className="vn-address pt16">
      <Box className="title">{label}</Box>
      <Box className="pt8">
        <DropdownSingleFrm id={id+"-province"} name={name+"-province"} label="Tỉnh/Thành phố" 
        required={required} value={province} persistantSuggestion={true} dataSource='local.vn_province'
        onChange={(val) => {
          setProvince(val)
          onChange({provinceCode: val, districtCode: district, ward, address, note})
        }} dataSource='local.vn_province' />
        <DropdownSingleFrm id={id+"-district"} name={name+"-district"} label="Quận/Huyện/TP trực thuộc" 
        required={required} value={district} dataSource={districts} 
        onChange={(val) => {
          setDistrict(val)
          onChange({provinceCode: province, districtCode: val, ward, address, note})
        }} />
        <TextField id={id+"-ward"} name={name+"-ward"} label="Xã/Phường/Thị trấn" 
        required={required} value={ward} 
        onChange={(val) => {
          setWard(val)
          onChange({provinceCode: province, districtCode: district, ward: val, address, note})
        }}/>
        <TextField id={id+"-address"} name={name+"-address"} label="Tên đường/chung cư, số nhà"
        required={required} value={address} 
        onChange={(val) => {
          setAddress(val)
          onChange({provinceCode: province, districtCode: district, ward, address: val, note})
        }}/>
        <TextField id={id+"-note"} name={name+"-address"} label="Ghi chú khác"
        required={required} value={note} 
        onChange={(val) => {
          setNote(val)
          onChange({provinceCode: province, districtCode: district, ward, address, note: val})
        }}/>
      </Box>
    </Box>
  )
}

const ErrorInputEl = function(){
  return (
    <Box>Error, please contact support</Box>
  )
}

export default {
  engine: InputRender,
  Validation, Type
}