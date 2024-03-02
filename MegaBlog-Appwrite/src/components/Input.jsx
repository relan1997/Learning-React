import {forwardRef, useId} from 'react'
const Input=forwardRef(function Input({
    label='',
    type='text',
    className='',
    ...props
},ref){
    const id=useId()
    return (
        <div className='w-full'>
            {label && <label 
            className='block mb-1'
            htmlFor={id}>
            {label}
            </label>
            }
            <input
             type={type}
             className={`${className} px-3 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full`} ref={ref} {...props}/>
              
        </div> //this above syntax will give u reference into the parent component and wahan se then state ka acces liya jaayega
    )
});

export default Input