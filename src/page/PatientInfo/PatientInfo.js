import {Container, TextField, Box, Select, MenuItem, Button, FormControlLabel, Checkbox} from '@material-ui/core';
import { Autocomplete }from '@material-ui/lab';
import PatientDataStructure from './dataStructure';
import DataSource from './dataSource';
import {useState} from 'react';
import { Tabs, Tab } from '@material-ui/core'
import TabPanel from '../../component/TabPanel';
import Routing from '../../config/Routing';
import { useUIHelper } from '../../context/UIHelperContext';
import { getAnalytics, logEvent } from '@firebase/analytics';

const Type = PatientDataStructure.Type
const Validation = PatientDataStructure.Validation

function PatientInfo(props){
  let [patientInfo,setPatientInfo] = useState(props.location.patientInfo === undefined ? 
    JSON.parse(JSON.stringify(PatientDataStructure.frmdata.sections)) : JSON.parse(JSON.stringify(props.location.patientInfo)));
  const [selectedTabIdx, setTabIndex] = useState(0)
  const lastSelectedProvince = localStorage.getItem('lastSelectedProvince') === null ? "79" : localStorage.getItem('lastSelectedProvince');
  const {setErrorMessage} = useUIHelper()
  const validate = () => {
    const missingLabels = []
    Object.keys(patientInfo).map((section_id, sidx) => {
      const _section = patientInfo[section_id]
      const _inputs = _section.inputs
      Object.keys(_inputs).map((input_id, idx) => {
        const _input = _inputs[input_id]
        if(_input.validation === Validation.REQUIRED && 
          (_input.value === undefined || _input.value === "" || _input.value === null)){
          missingLabels.push(_input.label)
        }
        return 0
      })
      return 0
    })
    if(missingLabels.length === 0) {return true}
    else {return missingLabels}
  }
  Object.keys(patientInfo).map((section_id, sidx) => {
    const _section = patientInfo[section_id]
    const _inputs = _section.inputs
    Object.keys(_inputs).map((input_id, idx) => {
      const _input = _inputs[input_id]
      if(input_id === 'provinceCode' && _input.value === undefined){
        patientInfo[section_id].inputs[input_id].value = lastSelectedProvince;
        setPatientInfo({...patientInfo})
      }
      return 0
    })
    return 0
  })
  const validationFuncs = []
  return (
    <Container maxWidth="md" className="frm-container patient-info">
      <Box className="patient-header">
        <Box className="title" color="secondary.main">Thông tin bệnh nhân</Box>
        <Box className="subtitle">Dữ liệu phục vụ chăm sóc tại nhà</Box>
      </Box>
      <Tabs
        value={selectedTabIdx}
        indicatorColor= 'primary'
        textColor= 'primary'
        onChange={(event, newValue) => {
          setTabIndex(newValue)
        }}
      >
        {
          Object.keys(patientInfo).map((section_id, sidx) => {
            return <Tab label={patientInfo[section_id].title} key={sidx}></Tab>
          })
        }
      </Tabs>
      {Object.keys(patientInfo).map((section_id, sidx) => {
        // render a section
        const section = patientInfo[section_id]
        const {inputs} = section
        return (
          <TabPanel index={sidx} value={selectedTabIdx} key={sidx}>
            {
              Object.keys(inputs).map((input_id, idx) => {
                // render a input
                const input = inputs[input_id]
                const {type, label, name, validation, value, parent_code}  = input;
                const validationFunc = PatientDataStructure.frmdata.sections[section_id].inputs[input_id].validationFunc
                const required = validation === Validation.REQUIRED ? true : false;
                const items = []
                if(type === Type.DROPDOWN_SINGLE || type === Type.DROPDOWN_MULTIPLE) {
                  const dataSourceLabel = input.dataSource
                  const dataSource = DataSource[dataSourceLabel]
                  if(parent_code !== undefined){
                    // do something
                    Object.keys(patientInfo).map((section_id, sidx) => {
                      const _section = patientInfo[section_id]
                      const _inputs = _section.inputs
                      Object.keys(_inputs).map((input_id, idx) => {
                        const _input = _inputs[input_id]
                        if(parent_code === input_id){
                          Object.keys(dataSource).map((value, didx) => {
                            if(dataSource[value].parent_code === _input.value){
                              items.push({value, label: dataSource[value].name_with_type === undefined ? dataSource[value].name : dataSource[value].name_with_type});
                            }
                            return 0
                          })      
                        }
                        return 0
                      })
                      return 0
                    })
                  }else{
                    Object.keys(dataSource).map((value, didx) => {
                      items.push({value, label: dataSource[value].name_with_type === undefined ? dataSource[value].name : dataSource[value].name_with_type});
                      return 0
                    })
                  }
                }
                if(type === Type.AUTOCOMPLETE_FREESOLO) {
                  if(Array.isArray(input.dataSource) === true){
                    input.dataSource.map((itm) => { items.push(itm); return 0}
                    ) 
                  }else{
                    DataSource[input.dataSource].map((itm) => {items.push(itm); return 0}  )
                  }
                }
                const randstr = parseInt(100000*Math.random())+"-"
                if(validationFunc !== undefined){
                  validationFuncs.push({
                    func: validationFunc,
                    value
                  })
                }
                return (
                  <div key={idx}>
                  {type === Type.TEXT ? <TextField id={randstr} name={randstr} required={required} value={value === undefined ? '' : value}
                  label={label} fullWidth={true} 
                  onChange={(e) => {
                    patientInfo[section_id].inputs[input_id].value = e.target.value;
                    setPatientInfo({...patientInfo})
                  }} /> : null}
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
                  :null}
                  </div>
                )
              })
            }
          </TabPanel>
        )
      })}
      <Box className="control">
        <Button variant="contained" color="secondary" onClick={() => {
          // missing value
          const noMissingLabels = validate()
          if(noMissingLabels !== true){
            logEvent(getAnalytics(), "add_patient_fail_missing_value", noMissingLabels)
            setErrorMessage('Các trường sau thiếu thông tin: '+noMissingLabels.join(', '))
            return;
          }
          // invalidate values
          for(var i=0;i<validationFuncs.length;i++){
            const {func, value} = validationFuncs[i]
            const validationResult = func(value)
            if(validationResult !== true){
              logEvent(getAnalytics(), "add_patient_fail_validation_failed", validationResult)
              setErrorMessage(validationResult)
              return;
            }
          }
          props.history.push({
            pathname: Routing.NCEVALUATING,
            patientInfo,
            initFrmData: props.location.initFrmData
          })
        }}>{props.location.initFrmData === undefined? "Bắt đầu sàng lọc" : "Tiếp tục"}</Button>
      </Box>
    </Container>
  )
}

export default PatientInfo;