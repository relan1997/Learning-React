//mechanism to protect pages and routes --- naam hum Authlayout bhi de sakte hai as file ka name and function ka name alag ho sakta hai
import { useSelector } from "react-redux"
import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom"
export default function Protected({children,authentication=true}){

    const navigate=useNavigate();
    const [loader,setLoader]= useState(true);
    const authStatus = UseSelector(state => state.auth.status);
    //useEffect tells us ki login pe bhejna hai ya home-page pe bhejna hai and kaunse variable ke change hone par humme yeh validations change karni hogi
    useEffect(()=>{

        // if(authStatus==true)
        // {
        //     navigate('/');
        // }
        // else{
        //     if(!authStatus) navigate('/login')
        // }

        if(authentication &&  authStatus!==authentication)
        {
            navigate('/login');
        }
        else if(!authentication && authStatus!==authentication){
            navigate('/');
        }
        setLoader(false);
    },[authStatus, navigate,authentication]) // authStatus:kisi ke login/logoff status mai koi bhi change hua toh iss useEffect ko wapas run karna 
    // agar user koi doosri jagah navigate karta hai tab bhi tum useEffect ko call karte ho
    return loader?<h1>Loading...</h1>:<>{children}</>
}