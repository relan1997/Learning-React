export default function Button({children,type='button',textColor='text-white',bgColor='bg-blue-600',className='',...props}){ // children is nothing but the text that is passed in the children parameter
    //why is className blank and the props being spread
    // this is so as to allow to allow the programmer to enter some extra class via props however he wants 
    // and the spreaded use of props allows many more random properties to be added into the button
    return(
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} `} {...props}>
            {children} 
        </button>
    )
}