import {useDispatch} from 'react-redux'
import { Header,Footer } from './components';
import { useEffect, useState } from 'react'
import authService from './appwrite/auth';
import {login , logout} from './store/authSlice'
import './App.css'
import { Outlet } from 'react-router-dom';

function App() {
    const [loading,setLoading] = useState(true);
    const dispatch=useDispatch();

    useEffect(()=>{
      authService.getCurrentUser()  // the function of get the user if he's on the landing page ans is logged in or not
      .then((userData)=>{ // now to pass some data to the userData in the store we need to also dispatch the parameter userData
        if(userData)
          dispatch(login({userData}))
        else 
          dispatch(logout());
      })
      .finally(()=> setLoading(false))
    },[])  // .finally is something that will run even if .then is being run or .catch is being run u cant't escape it's execution
      return !loading ? (
        <div className='min-h-sc flex flex-wrap content-between bg-gray-400'>
          <div className='w-full block'>
            <Header/>
            <main>
              {/* <Outlet/> will come from React-router Dom  */}
            </main>
            <Footer/>
          </div>
        </div>
      ):(null)
}

export default App
