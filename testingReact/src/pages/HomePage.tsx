import { useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar"
import { getPostList } from "../services/forumService";
import { useEffect, useState } from "react";
import isAuthenthicated from "../services/authServices";
import { PostProp } from "../components/props/Post";
import { Post } from "../models/models";
export default function HomePage(){

    const navigate = useNavigate();
    const [posts, setPosts] = useState<Post[]>([]);
    

    useEffect(() => {

        const getData = async() => {   
            if(!isAuthenthicated()){
                navigate('/');
            };
            const postData = await getPostList();
            setPosts(postData);
        };
        getData();
        
    }, [])
    
    const handlePostClick = (postId:number) => {
        navigate(`/post/${postId}`)
    }


    return (
        <div className="border-2 rounded-md m-2 p-2 border-blue-500 bg-blue-200">
            <NavBar/>
            <div className="mt-4 mb-4">
                <div className="flex justify-center m-2">
                    <div className="border-2 rounded-md border-blue-950 md:w-1/2 p-2">
                        <h1 className="text-center text-2xl">
                            Welcome to our forum
                        </h1>
                        <h2 className="text-center text-xl">
                            feel free to talk about any topic
                        </h2>
                    </div>
                </div>
            </div>
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {posts.map(post => (
                    <div className="cursor-pointer" onClick={() => handlePostClick(post.id)}>
                        <PostProp key={post.id} post={post} />
                    </div>
                ))}
            </div>
            <Footer/>
        </div>
    )
}