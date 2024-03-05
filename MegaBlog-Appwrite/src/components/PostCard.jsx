import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

export default function PostCard({
    $id,  // appwrite mai jo id hai woh $id karke lete hai woh uska specific syntax hai
    title,
    featuredImage
}){
    return(
        <>
            <Link to={`/post/${$id}`}>
                <div className='w-full bg-gray-100 rounded-xl p-4 '>
                    <div className='w-full justify-center mb-4'>
                        <img src={appwriteService.getFilePreview(featuredImage)} alt={title} 
                            className='rounded-xl'
                        />  {/* appwrite service takes in a featured Image ka id as paramter and passes the url of the image */}

                    </div>
                    <h2
                    className='text-xl font-bold text-gray-800'
                    >{title}</h2>
                </div>
            </Link>
        </>
    )
}