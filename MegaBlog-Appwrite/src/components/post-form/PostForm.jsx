import { useCallback } from "react"
import {useForm} from 'react-hook-form'
import {Button,Input,Select,RTE} from '../index'
import appwriteService from '../../appwrite/config'
import { useNavigate } from "react-router-dom"
import { UseSelector, useSelector } from "react-redux"

export default function PostForm({post}){// kisi field ko agar aapko continously monitor karna hai toh watch woh karta hai
    //kisi bhi form ke andar agar value set karni hai toh woh setValue se hogi
    //agar kisi form ka aapko control chaiye toh uske liye hum control bhi pass karte hai    
    const {register,handleSubmit,watch,setValue,control,getValues} = useForm({
        defaultValues:{  // all the values that we are going to use
            title:post?.title || '',
            slug:post?.slug || '',
            content:post?.content || '',
            status:post?.status || 'active'
 
        }
    })

    const navigate=useNavigate();
    const userData = useSelector(state => state.user.userData);

    const submit=async (data)=>{
        if(post){ // data variable gives direct data access to the images
            const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;
            if(file){
                appwriteService.deleteFile(post.featuredImage)
            }
            //slug is the id of the post
            const dbPost=await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage:file? file.featuredImage:undefined,
                if(dbPost){
                    navigate(`/post/${dbPost.$id}`);
                }
            }
            )
            
        }
        else{ // kuch update karne ko nahi hai hence user ek naya form create karna chahta hai

        }
    }
    
    

    return(
        <></>
    )
}