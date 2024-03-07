import {useState,useEffect} from 'react';
import { Container,PostForm } from '../components'; 
import appwriteService from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom';
export default function EditPost(){

    const [posts,setPosts] = useState(null);
    const {slug}=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        if(slug){  // if the post exists then what will happen
            appwriteService.getPost(slug)
            .then((post)=>{
                if(post) setPosts(post);
            })
        }  
        else{ // if the post doesn't exists then what will happen
            navigate('/')
        }
    },[slug,navigate])

    return(
        posts?(
            <div className='py-8'>
                <Container>
                    <PostForm post={posts}/>
                </Container>
            </div>
        ):null
    )
}