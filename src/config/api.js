import axios from 'axios'

export const API = axios.create({
    baseURL :  "https://dewetour-be.vercel.app/api199/v1/"
})
// "https://dewetour-backend.herokuapp.com/api199/v1/" ||

export const setAuthToken = (token) =>{
    if(token){
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }else{
        delete API.defaults.headers.common['Authorization']
    }
}