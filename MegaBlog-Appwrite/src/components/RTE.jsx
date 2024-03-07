import {Editor} from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
 
export default function RTE({name,control,label,defaultValue=""}){ // jo yeh control hai wahi aata hai react-hook-form se and yahi control respondsible hai saari states ko uss form mai le jaane ke liye
    return(
        //The control prop is typically an instance of Controller from react-hook-form. This Controller component is used to connect input components to the react-hook-form library. It manages the state of form inputs and handles validation, among other things.
       <div className='w-full'>
        {label && <label className='inline-block mb-1 pl-1'>{label}</label>}
            <Controller
                name={name || "Harshal"}
                control={control} // jo bhi parent element iss RTE ko call karega woh seedha yaha paas hojayega
                render={({field:{onChange}})=>(  //this field:onChange tells the component jab bhi kuch bhi component mai change hota hai
                    //enter the component that you want to render
                    <Editor
        initialValue={defaultValue}
        init={{
            initialValue: defaultValue,
            height: 500,
            menubar: true,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
        }}
        onEditorChange={onChange}
        />
                )}
            />        
       </div>
    )
}