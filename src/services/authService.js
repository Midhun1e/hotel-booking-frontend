import jwtDecode from "jwt-decode";
const tokenKey="token"

function logout(){
    localStorage.removeItem(tokenKey)
}

export const getCurrentUser=()=>{
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
      } catch (ex) {
          return null
      } 
}

export const setAuthToken=(token)=>{
    localStorage.setItem("token",token)
}

export default{
    logout,getCurrentUser
}