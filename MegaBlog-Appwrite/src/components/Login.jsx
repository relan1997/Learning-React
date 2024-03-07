import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {login as authLogin} from "../store/authSlice"
import {Button , Input , Logo} from './index'
import { UseDispatch, useDispatch } from "react-redux"
import authService from "../appwrite/auth"
import { useForm } from "react-hook-form"

export default function Login(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const {register,handleSubmit} =useForm(); // register yaha ek form handling ka tareeka hai and handleSubmit ek function jo banana hi padta hai humm customly
    const [error,setError] = useState("");

    const login=async(data)=>{ // data ek pura wrapper object milta hai
        setError('');  // always write this so as to clear out any previous errors
        try{
            const session = await authService.login(data) // agar ek session mila toh user logged in hai warna woh logged in nahi hai
            if(session)
            {
                const userData= await authService.getCurrentUser()
                if(userData)
                {
                    dispatch(authLogin(userData)) // we have sent the userData to the authLogin functionality in the store
                    navigate('/'); // we have used navigate as it automatically get redirected to home route and Link ke bakchodi yeh hai ki usse click karna padta hai
                    
                }
            }
        }catch(err)
        {
            setError(error.message)
        }
    }
    return (
        <div className="flex center-items justify-center w-full">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign In to Your Account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
            </p>
            {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
            <form className="mt-8" onSubmit={handleSubmit(login)}>
                <div className="space-y-5">
                    <Input
                    label="Email:"
                    placeholder="Enter Your Email"
                    type='email'
                    {...register("email",{
                        required:true,
                        validate:{
                            matchPattern:(value)=>/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email Address must be a valid address" // basically used to match the pattern of an email address the regex syntax is written between /.../ and then we write .test(val) to match that val with the regex syntax
                        }
                    })}//because we are using here useForm therefore as a part of the syntax this part is mandatory and agar ... nahi likha toh kisi aur jagah jahan register use kia ho waha pe value overwrite hojayegi
                    /> {/* yeh jo register ke andar value pass kari hai yeh unique honi chaiye like jiss cheez ke liye hum email de rhe hai woh mention karna hoga */}
                    <Input
                    type='password'
                    label='Password:'
                    placeholder="Enter the Password"
                    {...register("password",{
                        required:true
                    })}
                    />
                    <Button
                    type='submit'
                    className='w-full'
                    >Sign Up</Button>
                </div>
            </form>  {/* handleSubmit is a key word & ek method hai jisme hum apna method daalte hai toh tell the program ki kya karna hai when a form is submitted */}
            </div> {/* handleSubmit is an event and it's important to use this event only as now in the input fields we need to use the register method and the variables that are used with the register method uska humme state handle karne ki zaroorat nahi hai */}
        </div>
    )
}