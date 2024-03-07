import appwriteService from '../appwrite/config'
import { useState,useEffect } from 'react'
import { Container,PostCard } from '../components'
//import appwriteService from '../appwrite/config'
import e from 'connect-flash';
//u wont directly get all the posts humme unn posts ko query karni hogi therefore we will also use useState
export default function AllPosts(){
    const [posts,setPosts] = useState([]);
    useEffect(()=>{  // we have passed an empty array inside the getPosts as all the posts will be stored in the empty array
        appwriteService.getPosts([])
        .then((posts)=>{if(posts)
        {
            setPosts(posts.documents)
        } 
        });
        //the getPosts returns an array of Documents which will be stored in the empty array we might even wanna pass some queries into the array
    })
    return(
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                {posts.map((post)=>{
                    <div key={post.$id}className='p-2 w-1/4'>
                        <PostCard post={post}/>
                    </div>  // all the individual posts are mapped and inserted
                })}
                </div>
            </Container>
        </div>
    )
}