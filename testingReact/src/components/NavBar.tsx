import { logoutFunc } from "../services/authServices";
import { useNavigate } from "react-router-dom";
export default function NavBar(){
    const navigate = useNavigate();

    function goToPostPost(){
        navigate('/createPost/')
    }
    function logoutFunction(){
        logoutFunc();
        localStorage.removeItem('token');
        navigate('/');
    }
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 
        text-center text-lg 
        *:border-2 *:border-blue-950 *:rounded-md *:bg-blue-900 *:text-blue-50">
            <div onClick={() => logoutFunction()} className=" hover:bg-blue-400 hover:text-blue-950 cursor-pointer">
                Logout
            </div>
            <div onClick={() => goToPostPost()} className=" hover:bg-blue-400 hover:text-blue-950 cursor-pointer">
                Create Post
            </div>
        </div>
    )
}