import { useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom";
export default function Github(){
    //const [data,setData]= useState([]);
    const data=useLoaderData(); // automatically loader waala data mil jaayega
    // useEffect(()=>{
    //     fetch('https://api.github.com/users/hiteshchoudhary')
    //     .then(res=> res.json())
    //     .then(data=>{
    //         setData(data);
    //     })
    // },[])

    return(
        <div className="text-center m-4 bg-gray-500 text-white p-4 text-3xl">Github Followers: {data.followers}</div>
    )
    }

    export const githubInfoLoader= async ()=>{
       const res=await fetch('https://api.github.com/users/hiteshchoudhary');
       return res.json();
    }