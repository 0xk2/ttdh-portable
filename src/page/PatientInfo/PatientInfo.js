import {Container} from '@material-ui/core';
import PatientDataStructure from './dataStructure';
import DataSource from './dataSource';

/*
  TEXT: 'text',
  TEXT_LONG: 'text.long',
  NUMBER: 'number',
  PHONE: 'text.phone',
  EMAIL: 'text.email',
  DROPDOWN_SINGLE: 'dropdown.single',
  DROPDOWN_MULTIPLE: 'dropdown.multiple',
  BOOL: 'bool',
  DATE: 'date'
*/

function PatientInfo(props){
  let patientInfo = props.patientInfo === undefined ? {} : props.patientInfo;
  let sections = PatientDataStructure.sections;
  return (
    <Container maxWidth="md" className="frm-container patient-info">
      {Object.keys(sections).map((section_id, sidx) => {
        // render a section
        const section = sections[section_id]
        const {title, inputs} = section
        return (
          <div>
            {
              Object.keys(inputs).map((input_id, idx) => {
                // render a input
                return (
                  <div></div>
                )
              })
            }
          </div>
        )
      })}
    </Container>
  )
}

export default PatientInfo;