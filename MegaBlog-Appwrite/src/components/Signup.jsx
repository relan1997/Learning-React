import { useState } from "react"
import authService from "../appwrite/auth"
import { Link,useNavigate } from "react-router-dom"
import { login } from "../store/authSlice"
import {Button,Input,Logo} from './index'
import { UseDispatch, useDispatch } from "react-redux"
import {useForm} from 'react-hook-form'

export default function Signup(){
    const navigate=useNavigate();
    const [error,setError]= useState('');
    const dispatch=useDispatch();
    const {register,handleSubmit} = useForm();

    const create=async(data)=>{
        setError('');
        try{
            const userData=await authService.createAccount(data);
            if(userData){
                const userData=await authService.getCurrentUser()  // agar hum user le paa rhe hai toh humme ab store update karna hoga
                if(userData) dispatch(login(userData));
                navigate('/');
            }
        }   
        catch(error){
            setError(error.message)
        }
    }

    return(
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%'/>
                    </span>
                </div> 
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

                <form onSubmit={handleSubmit(create)}>
                    <div className="space-y-5">
                        <Input
                        label='Name:'
                        placeholder="Enter your Full Name"
                        {...register('name',{
                            required:true
                        })}
                        />
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
                    >Create Account</Button>
                    </div>
                </form>               
            </div>
        </div>
    )
}