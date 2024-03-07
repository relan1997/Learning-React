import appwriteService from '../appwrite/config'
import { Container,PostCard } from '../components'
//u wont directly get all the posts humme unn posts ko query karni hogi therefore we will also use useState
export default function AllPosts(){
    return(
        <div className="p-y-8">
            <Container>
                <PostCard/>
            </Container>
        </div>
    )
}