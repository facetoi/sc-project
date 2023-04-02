export const setToken=(token)=>{
    localStorage.setItem("Token",token)
}
export const getToken=()=>{
   return localStorage.getItem("Token")
}
export const clearToken = ()=>{
    return localStorage.removeItem("Token")
}