import {Type, Validation} from '../config/Constants'
import { TextField } from '@material-ui/core'

export const InputRender = function({id, name, required, value, label, fullWidth, browserAutocomplete, onChange}) {
  const randStr = parseInt(100000*Math.random())+""
  if(browserAutocomplete === true){
    name = randStr
  }else{
    name = randStr+"-"+name
  }
  return (
    <>
    {/* {type === Type.TEXT ? <TextField id={id} name={name} required={required} value={value === undefined ? '' : value}
    label={label} fullWidth={true} 
    onChange={onChange} /> : null}
    {type === Type.TEXT_LONG ? <TextField id={name+randstr} name={name+randstr} required={required} value={value === undefined ? '' : value} multiline={true}
    label={label} fullWidth={true} minRows={5}
    onChange={(e) => {
      patientInfo[section_id].inputs[input_id].value = e.target.value;
      setPatientInfo({...patientInfo})
    }} /> : null}
    {type === Type.NUMBER ? <TextField id={name+randstr} type="number" name={name+randstr} required={required} value={value === undefined ? '' : value}
    label={label} fullWidth={true} 
    onChange={(e) => {
      patientInfo[section_id].inputs[input_id].value = e.target.value;
      setPatientInfo({...patientInfo})
    }} /> : null}
    {type === Type.PHONE ? <TextField type="tel" id={randstr} name={randstr} variant="filled" required={required} value={value === undefined ? '' : value}
    label={label} fullWidth={true} 
    onChange={(e) => {
      patientInfo[section_id].inputs[input_id].value = e.target.value;
      setPatientInfo({...patientInfo})
    }} /> : null}
    {type === Type.EMAIL ? <TextField type="email" id={randstr} name={randstr} required={required} value={value === undefined ? '' : value}
    label={label} fullWidth={true} 
    onChange={(e) => {
      patientInfo[section_id].inputs[input_id].value = e.target.value;
      setPatientInfo({...patientInfo})
    }} /> : null}
    {type === Type.DATE ? <Box className="itm-line">
      <Box className="itm-label">{label} {required===true? "*" : null}</Box><TextField type="date" name={name} required={required} value={value === undefined ? '' : value}
    fullWidth={true}  
    onChange={(e) => {
      patientInfo[section_id].inputs[input_id].value = e.target.value;
      setPatientInfo({...patientInfo})
    }} /></Box> : null}
    {type === Type.DROPDOWN_SINGLE ? <Box className="itm-line">
      <Box className="itm-label">{label} {required===true? "*" : null}</Box>
      <Select type="date" name={name} required={required} value={value === undefined ? '' : value}
    label={label} fullWidth={true}  
    onChange={(e) => {
      if(input_id === 'provinceCode'){
        localStorage.setItem('lastSelectedProvince', e.target.value)
      }
      patientInfo[section_id].inputs[input_id].value = e.target.value;
      setPatientInfo({...patientInfo})
    }}>
      {items.map((item, k) => {
        return <MenuItem value={item.value} key={k}>{item.label}</MenuItem>
      })}
    </Select></Box>: null}
    {type === Type.AUTOCOMPLETE_FREESOLO ? 
      <Autocomplete freeSolo required={required}
      options={items.map((option) => option)} disableClearable 
      onChange={(e, newValue) => {
        patientInfo[section_id].inputs[input_id].value = newValue;
        setPatientInfo({...patientInfo})
      }}
      onInputChange={(e, newValue) => {
        patientInfo[section_id].inputs[input_id].value = newValue;
        setPatientInfo({...patientInfo})
      }}
      value={value === undefined ? '':value}
      inputValue={value === undefined ? '':value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="normal"
          variant="filled" required={required}
          InputProps={{ ...params.InputProps, type: 'text' }}
        />
      )} />
    :null}
    {type === Type.BOOL?
      <FormControlLabel color='secondary.main' control={
        <Checkbox required={required} checked={value===undefined?false:value} onChange={(e) => {
          patientInfo[section_id].inputs[input_id].value = e.target.checked;
          setPatientInfo({...patientInfo})
        }} />
      } label={label} />
    :null} */}
    </>
  )
  //id={randstr} name={randstr} required={required} value={value === undefined ? '' : value}
  //label={label} fullWidth={true}
  
}