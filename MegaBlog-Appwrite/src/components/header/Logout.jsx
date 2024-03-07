import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"

export default function Logout(){
    const dispatch=useDispatch();
    const logoutHandler=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout());  // humne yaha logout isliye call kia hai taaki store ke andar important Information updated rahe
        })
    }
    return(
       <button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full">Logout</button>
    )
}