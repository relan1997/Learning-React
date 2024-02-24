import { useParams } from "react-router-dom"
export default function User(){
    const {id}= useParams(); // access the params that's passed into the url
    return(
    <div className="bg-gray-600 text-white text-3xl p-3">User: {id}</div>
    )
}