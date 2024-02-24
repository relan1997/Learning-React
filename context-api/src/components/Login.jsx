import {useState,useContext} from "react"
import useCurrencyInfo from "../../../my-project/src/hooks/useCurrencyInfo";
import UserContext from "../context/UserContext";
import e from "connect-flash";
export default function Login(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const {setUser}=useContext(UserContext)

    const handleSubmit=(e)=>{
        e.preventDefault()
        setUser({username,password});
    }
    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="UserName" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}