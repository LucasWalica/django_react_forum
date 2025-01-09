import axios from "axios"
import { useNavigate } from "react-router-dom";

export async function login(userData:any){
    try{
        const response = await axios.post(`http://127.0.0.1:8000/api/login/`, userData);
        return response.data;
    }catch (error: any) {
        console.error("Error en la solicitud de login:", error.response || error);
        throw error.response?.data || { detail: "Error desconocido" };
    }
}

export async function register(userData:any){
    try{
        const response = await axios.post(`http://127.0.0.1:8000/api/registrar/`, userData, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    }catch(error){
        console.log("error", error);
    }
}


export default function isAuthenthicated(){
    const token = localStorage.getItem("token");    
    return !!token && token.trim() !== "";
}



export async function logoutFunc(){
    try{
        const response = await axios.post(`http://127.0.0.1:8000/api/logout/`);
        return response.data;
    }catch(error){
        console.log("error", error);
    }
}

