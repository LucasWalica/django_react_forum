import { Post } from "../../models/models";

interface PostProps{
    post:Post
}

export function PostProp({post}:PostProps){
    return (
        <div className="border-2 rounded-md border-blue-950 
        text-center p-2 m-2">
            <div className="flex justify-center">
                <h2 className="text-2xl bg-blue-300 w-1/2 rounded-md">{post.title}</h2>
            </div>
            <p>{post.desc}</p>
            <p>Creator: {post.creatorName}</p>
            <p>Topics: {post.topic_1}, {post.topic_2}</p>
            <p>Stars: {post.stars}</p>
        </div>
    )
}
