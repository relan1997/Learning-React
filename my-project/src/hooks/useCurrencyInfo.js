//custom hooks can use built in hooks
import { useEffect } from "react";
import { useState } from "react";

export default function useCurrencyInfo(currency){  // the entire method is exported for other components to use it
    const [data,setData]=useState({});
    useEffect(()=>{
        let url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currency}.json`
        fetch(url)
        .then((res)=>res.json())
        .then((res)=> setData(res[currency])); //currency directly refers to the key of the json object
    },[currency])  // whenever there is a change in the currency variable the useEffect method will be called
    return data; //the method returns the current value of data variable which is the json object containing the key and value pairings
}   

