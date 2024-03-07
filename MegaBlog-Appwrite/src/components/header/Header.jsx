import {Logo,Container,Logout} from '../index'
import { Link } from 'react-router-dom'
import {     useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


export default function Header(){
    const authStatus=useSelector((state)=>state.auth.status) // access the value of the variable status in the initial state of the store, basically puch rhe hai yadi tumhara user logged in hai ya nahi waise tum usse button/link dikhana chahte ho ya nahi
    const navigate=useNavigate();
    //for navigation bar we just add object into the array and then loop over each of the objects and if we ever want to add any new button in the navigation bar then we just add a new object to the array and proceed as normal
    //the navigate is used in the onClick Button function
    //we can either use navigate or Link both of them will give the same result
    const navItems=[
        {
            name:'Home',
            slug:'/', //slug usually tells kaunse url pe jaa rhe hai
            active:true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]
    //jo bhi components tum hare components ke andar aa rhe hai woh tumhara children ki tarah paas hojayega as a parameter in the container component
    return(
        <header className='py-3 shadow bg-gray-500'>
            <Container>
                <nav>
                    <div className='mr-4'>
                        <Link to='/'>
                            <Logo width='70px'/>

                        </Link>   
                    </div>
                    <ul className='flex ml-auto'>
                        {navItems.map((item)=>(
                            item.active ? (
                                <li key={item.name}>
                                    <button onClick={()=>navigate(item.slug)}
                                    className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                                    >{item.name}</button>
                                </li>
                            ):null  //basically checking if the user has logged in then that element is active and what would be shown and what not what would be shown
                        ))}
                        {authStatus && (
                            <li>
                                <Logout/>
                            </li>
                        )}
                    </ul>    
                </nav>                
            </Container>
        </header>
    )
}