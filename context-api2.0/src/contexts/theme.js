import React from "react"
import { createContext,useContext } from "react"

export const ThemeContext=createContext({
    themeMode:"light",
    darkTheme: ()=>{

    },
    lightTheme: ()=>{

    },
});

//whenever someone accesses the global context state then that component will be able access all the fields and even the functions defined inside the global object
//this above syntax replaces the manual creation of state variables of user and setUser using useState and then passing them as values in the Context .Provider

export const ThemeProvider=ThemeContext.Provider

export default function useTheme(){
    return useContext(ThemeContext)
}