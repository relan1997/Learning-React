import { useCallback, useEffect } from "react"
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
            const file=await appwriteService.uploadFile(data.image[0]);

            if(file)
            {
                const fileId=file.$id;
                data.featuredImage=fileId
                const dbPost=await appwriteService.createPost({
                    ...data,
                    userId:userData.$id
                }) // spread is done because jab use forms banenge toh usme userData nahi hoga so to insert the userData 
                if(dbPost)
                {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }

    }
    
    //2 input fields title and slug isme title ko watch karke humme slug ki field ko update karna hai
    //and agar kahi bhi space hai usse slug ke input field mai '-' se replace karna hai
    const slugTransform= useCallback((value)=>{
        if(value && typeof value == 'string'){
            return value.
            trim()
            .toLowerCase()
            .replace(/^[a-zA-Z\d\s]+/g,'-') //regex code for finding the replacement characters and then replacing that characters with -
            .replace(/\s/g,'-')
        }    
        return ''
    },[])
    useEffect(()=>{ // jo bhi method hum yaha call karte hai usse hum subscription mai hold karke rakh sakte hai
        const subscription=watch((value,{name})=>{
            if(name==='title'){
                setValue('slug',slugTransform(value.title,{shouldValidate:true})) // basically jab bhi slug mai kuch change hoga slugTransform jo bhi value return hoga usse hum slug ka state change kardenge
            }
        })

        return ()=>{
            subscription.unsubscribe() // basically this method helps in space optimization
        }
    },[watch,slugTransform,setValue])  // jis jis value pe hum abhi watch lagayenge agar woh values change hongi toh hum useEffect waale function ko call karenge
    return(
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
            <Input
                label="Title :"
                placeholder="Title"
                className="mb-4"
                {...register("title", { required: true })}
            />
            <Input
                label="Slug :"
                placeholder="Slug"
                className="mb-4"
                {...register("slug", { required: true })}
                onInput={(e) => {
                    setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                }}
            />
            <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
        </div>
        <div className="w-1/3 px-2">
            <Input
                label="Featured Image :"
                type="file"
                className="mb-4"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("image", { required: !post })}
            />
            {post && (
                <div className="w-full mb-4">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-lg"
                    />
                </div>
            )}
            <Select
                options={["active", "inactive"]}
                label="Status"
                className="mb-4"
                {...register("status", { required: true })}
            />
            <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                {post ? "Update" : "Submit"}
            </Button>
        </div>
    </form>
    )
}