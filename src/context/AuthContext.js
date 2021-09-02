import { createContext, useContext, useState, useEffect } from "react";
import { auth } from '../firebase';
import {onAuthStateChanged,signOut} from 'firebase/auth';
import { getDatabase, ref, onValue} from "firebase/database";
import { useUIHelper } from "./UIHelperContext";
import Routing from "../config/Routing";
import { useHistory } from "react-router";

const db = getDatabase();
const AuthContext = createContext()

export const RegistrationState = {
  UNFINISHED: "unfinished",
  DONE: "done"
}

export function useAuth(){
  return useContext(AuthContext)
}

export function AuthProvider({children}) {
  const [currentUser, setCurrentUser] = useState()
  const [userInfo, setUserInfo] = useState()
  const {setBackdropState, setErrorMessage} = useUIHelper()
  const history = useHistory()
  useEffect(() => {
    setBackdropState(true)
    const unsubcribe = onAuthStateChanged(auth, (remoteUser) => {
      setBackdropState(false)
      setCurrentUser(remoteUser)
      if(remoteUser !== null){
        const {phoneNumber} = remoteUser
        const remoteUserInfo = ref(db, 'users/' + phoneNumber);
        onValue(remoteUserInfo, (snapshot) => {
          const data = snapshot.val();
          setUserInfo(data)
        });
      }else{
        history.push(Routing.LOGIN)
      }
    });
    return unsubcribe;
  },[history, setBackdropState])
  const value = {
    currentUser,
    userInfo,
    setUserInfo,
    setCurrentUser,
    signOut : function(){
      setBackdropState(true)
      signOut(auth).then(() => {
        setBackdropState(false)
        history.push(Routing.LOGIN)
      }).catch((error) => {
        setErrorMessage('Không thể đăng xuất')
      }).finally(() => {
        setBackdropState(false)
      })
    }
  }
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}