import {FormControl, Container, Button, Box} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import NCLogic from './nclogic';
import React from 'react';
import { Edit } from '@material-ui/icons';
import { Redirect } from 'react-router';
const AlphabetBullet = ['A','B','C','D']

const FormData = (props) => {
  const initFrmData = props.location.initFrmData !== undefined ? props.location.initFrmData : NCLogic.getFrmdata()
  const [frmdata, setState] = React.useState(initFrmData)
  if(props.location.patientInfo === undefined){
    return <Redirect to="/" />
  }
  return (
    <div>
      <Container maxWidth="md" className="frm-container">
        <Box className="pt16">
          <Button color="primary" variant='outlined' startIcon={<Edit />}
                onClick={() => {
                props.history.push({
                pathname: '/',
                patientInfo: props.location.patientInfo
              })
            }}
          >Thông tin</Button>
        </Box>
        <div className="form-desc">
          <div className="col-logo">
            <img src="/logo_84.jpg" alt="Logo"/>
          </div>
          <div className="col-text">
            <div className="title">Sàng lọc nguy cơ Covid 19</div>
            <div className="subtitle">Form này dành cho <b>nhân viên y tế</b>. <br/>Xin vui lòng liên hệ <a href="https://thaythuocdonghanh.vn">Thầy Thuốc Đồng Hành</a> để được đào tạo</div>
          </div>
        </div>
        <FormControl width="100%">
          {frmdata.sections.map((section, sidx) => {
            return (
              <div className="section" key={sidx}>
                <Box className="title" color="secondary.main">{AlphabetBullet[sidx]}. {section.title}</Box>
                <Box className="subtitle" color="secondary.main">{section.subtitle}</Box>
                <div className="questions">
                  {section.questions.map((question, qidx) => {
                    return (
                      <div className="question" key={qidx}>
                        <div className="title">{qidx+1}. {question.title}</div>
                        <div className="options">
                          {question.options.map((option, oidx) => {
                            return (
                              <div key={oidx}>
                                <FormControlLabel control={<Checkbox checked={option.value === 0 ? false : true} />} label={option.title} onChange={function(event){
                                  let checked = event.target.checked;
                                  let _frmdata = {...frmdata};
                                  _frmdata.sections[sidx].questions[qidx].options[oidx].value = checked === true ? 1 : 0;
                                  setState(_frmdata)
                                }} />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </FormControl>
        <div className="control">
          <Button variant="contained" color="primary" onClick={function(){
            const result = NCLogic.calc(frmdata)
            props.history.push({
              pathname: "/ket-qua",
              search: "",
              data: result,
              originalFrm: frmdata,
              patientInfo: props.location.patientInfo
            });
          }}>
            Tính kết quả
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default FormData;