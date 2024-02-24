
import { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/theme'
import Button from './components/Button';
import Card from './components/Card';

function App() {
  const [themeMode,setThemeMode] = useState("light");

  const lightTheme=()=>{
    setThemeMode("light");
  }

  const darkTheme=()=>{
    setThemeMode("dark");
  }

  //actual theme change

  useEffect(()=>{
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(themeMode);
  },[themeMode,setThemeMode]) //whenever there is a change in themeMode the above functionality should be called hence themeMode is a dependency of the useEffect Function
  return(
    <ThemeProvider value={{lightTheme,darkTheme,themeMode}}> {/* now using the value's prop u can get the access to whichever fields you want the access of  */}
        <div className="flex flex-wrap min-h-screen items-center">
                <div className="w-full">
                    <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                        {/*Theme Button*/}
                        <Button/>
                    </div>

                    <div className="w-full max-w-sm mx-auto">
                       {/*card Button*/}
                       <Card/>
                    </div>
                </div>
        </div>
</ThemeProvider>  

  )
}

export default App
