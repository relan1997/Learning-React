import { Container,PostForm as PostFormComponent } from "../components"
export default function AddPost()
{
    return(
        <div className="p-y-8">
            <Container>
            <PostFormComponent/>
            </Container>
        </div>
    )
}