import {Container, TextField, Box, Select, MenuItem, Button, Snackbar, IconButton} from '@material-ui/core';
import PatientDataStructure from './dataStructure';
import DataSource from './dataSource';
import {useState} from 'react';
import { Tabs, Tab } from '@material-ui/core'
import TabPanel from '../../component/TabPanel';
import { Close } from '@material-ui/icons';

const Type = PatientDataStructure.Type
const Validation = PatientDataStructure.Validation

function PatientInfo(props){
  let [patientInfo,setPatientInfo] = useState(props.location.patientInfo === undefined ? PatientDataStructure.frmdata.sections : props.location.patientInfo);
  const [selectedTabIdx, setTabIndex] = useState(0)
  const [failValidationString, setValidationString] = useState('')
  const lastSelectedProvince = localStorage.getItem('lastSelectedProvince') === null ? "79" : localStorage.getItem('lastSelectedProvince');
  const validate = () => {
    const missingLabels = []
    Object.keys(patientInfo).map((section_id, sidx) => {
      const _section = patientInfo[section_id]
      const _inputs = _section.inputs
      Object.keys(_inputs).map((input_id, idx) => {
        const _input = _inputs[input_id]
        if(_input.validation === Validation.REQUIRED && _input.value === undefined){
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
  return (
    <Container maxWidth="md" className="frm-container patient-info">
      <Box className="patient-header">
        <Box className="title" color="secondary.main">Thông tin cá nhân</Box>
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
                const {type, label, name, validation, value, parent_code} = input;
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
                              items.push({value, label: dataSource[value].name});
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
                      items.push({value, label: dataSource[value].name});
                      return 0
                    })
                  }
                }
                return (
                  <div key={idx}>
                  {type === Type.TEXT ? <TextField name={name} required={required} value={value === undefined ? '' : value}
                  label={label} fullWidth={true} 
                  onChange={(e) => {
                    patientInfo[section_id].inputs[input_id].value = e.target.value;
                    setPatientInfo({...patientInfo})
                  }} /> : null}
                  {type === Type.TEXT_LONG ? <TextField name={name} required={required} value={value === undefined ? '' : value} multiline={true}
                  label={label} fullWidth={true} minRows={5}
                  onChange={(e) => {
                    patientInfo[section_id].inputs[input_id].value = e.target.value;
                    setPatientInfo({...patientInfo})
                  }} /> : null}
                  {type === Type.NUMBER ? <TextField type="number" name={name} required={required} value={value === undefined ? '' : value}
                  label={label} fullWidth={true} 
                  onChange={(e) => {
                    patientInfo[section_id].inputs[input_id].value = e.target.value;
                    setPatientInfo({...patientInfo})
                  }} /> : null}
                  {type === Type.PHONE ? <TextField type="tel" name={name} required={required} value={value === undefined ? '' : value}
                  label={label} fullWidth={true} 
                  onChange={(e) => {
                    patientInfo[section_id].inputs[input_id].value = e.target.value;
                    setPatientInfo({...patientInfo})
                  }} /> : null}
                  {type === Type.EMAIL ? <TextField type="email" name={name} required={required} value={value === undefined ? '' : value}
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
                  </div>
                )
              })
            }
          </TabPanel>
        )
      })}
      <Box className="control">
        <Button variant="contained" color="secondary" onClick={() => {
          const missingLabels = validate()
          if(missingLabels === true){
            props.history.push({
              pathname: '/sang-loc',
              patientInfo,
              initFrmData: props.location.initFrmData
            })
          }else {
            setValidationString('Các trường sau thiếu thông tin: '+missingLabels.join(', '))
          }
        }}>{props.location.initFrmData === undefined? "Bắt đầu sàng lọc" : "Tiếp tục"}</Button>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={failValidationString !== ''}
        autoHideDuration={6000}
        onClose={() => {
          setValidationString('')
        }}
        message={failValidationString}
        action={<IconButton size="small" aria-label="close" color="inherit" onClick={() => {
          setValidationString('')
        }}>
          <Close fontSize="small" />
        </IconButton>}
      />
    </Container>
  )
}

export default PatientInfo;