import { useId } from "react"
function Select({  // basically the drop down menu jisse hum cheeze select karenge
    options=[],  // the options that will be available to the user for selection
    label,
    className='',
    ...props
},ref){
    const id = useId();
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="">{label}</label>}
            <select {...props} id={id} ref={ref} className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}>
                {options?.map((option)=>{  //options?.map does conditional Looping of the options array where if the array is empty then map function won't be executed and else the map function will loop through all the values of the array then return the required
                    <option key={option} value={option}>
                        {option}
                    </option>
                })}                
            </select>
        </div>
    )
}

export default React.forwardRef(Select)