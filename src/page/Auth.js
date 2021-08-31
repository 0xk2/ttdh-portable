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
import { getAnalytics, logEvent } from "@firebase/analytics";

const auth = getAuth()
const db = getDatabase()
const FrmState = {
  PHONE: "phone",
  VERIFICATION: "code_verification"
}

function normalizeAndRemoveSpaceVNString(str) {
  str = str.toLowerCase().replaceAll(" ","");
//     We can also use this instead of from line 11 to line 17
//     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
//     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
//     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
//     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
//     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
//     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
//     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
  return str;
}

const Auth = function(props) {
  const randstr = Math.random()*1000+"";
  const [phoneNumber, setPhoneNumber] = useState('')
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
  if(isNil(currentUser) !== true && isNil(userInfo) !== true){
    if(userInfo.type === 'icu-doctor'){
      history.push(Routing.ICU)
      return <></>
    }else{
      history.push(Routing.PATIENTINFO)
      return <></>
    }
  }
  return <Container maxWidth="md" className="frm-container auth">
    {isNil(currentUser) !== true && isNil(userInfo) === true? // loggedin but there is no userInfo
    <UserProfile handleResetPhone={handleResetPhone} phoneNumber={phoneNumber || currentUser.phoneNumber} saveHandler={(newUserInfo) => {
      if(typeof(newUserInfo) === 'string'){
        setErrorMessage('Các trường sau thiếu thông tin: '+newUserInfo)
        logEvent(getAnalytics(), 'register_missing_info', newUserInfo)
      }else{
        logEvent(getAnalytics(), 'register_referal_code', newUserInfo.referralCode)
        if(normalizeAndRemoveSpaceVNString(newUserInfo.referralCode || '')==='thaythuocdonghanh2207'){
          newUserInfo.type='icu-doctor'
        }else{
          newUserInfo.type='medical-staff'
        }
        setBackdropState(true)
        set(ref(db, 'users/' + currentUser.phoneNumber), newUserInfo)
        .then(() => {
          setSuccessMessage('Thành công')
          logEvent(getAnalytics(), 'register_success', currentUser.phoneNumber)
          history.push(Routing.PATIENTINFO)
        })
        .catch((error) => {
          logEvent(getAnalytics(), 'register_failed', currentUser.phoneNumber)
          setErrorMessage('Không lưu lại được!')
        }).finally(() => {
          setBackdropState(false)
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