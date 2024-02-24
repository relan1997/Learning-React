import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useParams } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import User from './components/User/User.jsx'
import Github, { githubInfoLoader } from './components/Github/Github.jsx'

// const router=createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>, //now the path of `/` will render the Layout jsx-element
//     children:[{
//       path:'',
//       element:<Home/>
//     },
//     {
//       path:'about',
//       element:<About/>
//     },
//     {
//       path:'contact',
//       element:<Contact/>
//     }]  
//   }
// ])

const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='user/:id' element={<User/>}/> 
      <Route 
      loader={githubInfoLoader} //allows to fetch data inside this file and fetch's the data before even the element in the navBar is clicked even before the calling of useEffect hook
      path='github' element={<Github/>}/> 
    </Route>
  ) // :id is automatically passed into the component where the path calls it
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
