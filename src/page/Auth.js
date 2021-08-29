import { getAuth, RecaptchaVerifier,signInWithPhoneNumber,signOut } from "firebase/auth";
import { Button, Container, Box, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useUIHelper } from "../context/UIHelperContext";
import { useAuth } from "../context/AuthContext";
import Routing from "../config/Routing";
import { isNil } from "lodash";
import ResetPhoneButton from "../component/ResetPhoneButton";
import UserProfile from "../component/UserProfile";
import { getDatabase, ref, set } from "@firebase/database";
import { useHistory } from "react-router";

const auth = getAuth()
const db = getDatabase()
const FrmState = {
  PHONE: "phone",
  VERIFICATION: "code_verification"
}

const Auth = function(props) {
  const randstr = Math.random()*1000+"";
  const [phoneNumber, setPhoneNumber] = useState('0915585266')
  const [validationCode, setValidationCode] = useState('')
  const [frmState, setFrmState] = useState(FrmState.PHONE)
  
  const {setBackdropState, setErrorMessage, setSuccessMessage} = useUIHelper()
  const {currentUser, userInfo, setCurrentUser, setUserInfo} = useAuth()
  const history = useHistory()
  const handleResetPhone = () => {
    setBackdropState(true)
    signOut(auth).then(() => {
      setPhoneNumber("")
      setValidationCode("")
      setFrmState(FrmState.PHONE)
      setUserInfo(undefined)
      setSuccessMessage("Hủy thành công!")
    })
    .catch((error) => {
      setErrorMessage('Có lỗi, không thể hủy!')
    })
    .finally(() => {
      setBackdropState(false)
    })
  }
  
  useEffect(function(){
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
      'size': 'invisible',
      'callback': (response) => {
      }
    }, auth);
  },[])
  return <Container maxWidth="md" className="frm-container auth">
    {isNil(currentUser) !== true && isNil(userInfo) !== true?
      history.push(Routing.PATIENTINFO)
      :null
    }
    {isNil(currentUser) !== true && isNil(userInfo) === true? // loggedin but there is no userInfo
    <UserProfile handleResetPhone={handleResetPhone} phoneNumber={phoneNumber} save={(newUserInfo) => {
      if(typeof(newUserInfo) === 'string'){
        setErrorMessage('Các trường sau thiếu thông tin: '+newUserInfo)
      }else{
        set(ref(db, 'users/' + currentUser.phoneNumber), newUserInfo)
        .then(() => {
          setSuccessMessage('Thành công')
          // history.push(Routing.PATIENTINFO)
        })
        .catch((error) => {
          setErrorMessage('Không lưu lại được!')
        })
      }
    }} />
    : null
    }
    {isNil(currentUser) === true && frmState === FrmState.PHONE? 
    <Box>
      <Box className="pt16 title" color="primary.main">Đăng ký/đăng nhập bằng số điện thoại</Box>
      <Box>
        <TextField type="tel" id={randstr} value={phoneNumber}
          label="Số điện thoại" fullWidth={true} 
          onChange={(e) => {
            setPhoneNumber(e.target.value)
          }} />
      </Box>
      <Box className="pt8">
        <Button variant="contained" color="primary" onClick={() => {
          var number = '+84' + phoneNumber;
          setBackdropState(true)
          signInWithPhoneNumber(auth,number, window.recaptchaVerifier).then( function(confirmationResult) {
            window.confirmationResult = confirmationResult
            setFrmState(FrmState.VERIFICATION)
          })
          .catch(function (error) {
            setErrorMessage('Số điện thoại không đúng!')
          }).finally(() => {
            setBackdropState(false)
          });
        }}>Bắt đầu</Button>
      </Box>
    </Box>
    : null}
    {isNil(currentUser) === true && frmState === FrmState.VERIFICATION?
    <Box>
      <Box className="pt16 title" color="primary.main">Nhập mã xác thực được gửi tới số điện thoại</Box>
      <Box className="verification-control">
        <TextField type="number" id={randstr+"-code"} value={validationCode}
          label="Mã xác thực" fullWidth={true}
          onChange={(e) => {
            setValidationCode(e.target.value)
          }} />
        <Box className="pt8">
          <Button variant="contained" color="secondary" style={{marginRight: "5px"}} onClick={() => {
            setBackdropState(true)
            window.confirmationResult.confirm(validationCode).then((result) => {
              // User signed in successfully.
              setSuccessMessage("Xác minh số điện thoại thành công!")
              setCurrentUser(result.user)
            }).catch((error) => {
              setErrorMessage('Mã xác thực sai!')
            }).finally(() => {
              setBackdropState(false)
            });        
          }}>Xác minh</Button>
          <ResetPhoneButton onClick={handleResetPhone} />
        </Box>
      </Box>
    </Box>
    : null}
    <Box id="recaptcha"></Box>
  </Container>
}

export default Auth;