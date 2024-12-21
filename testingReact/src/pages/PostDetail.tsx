import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostDetail } from '../services/forumService';
import { Post } from '../models/models';
import NavBar from '../components/NavBar';
import PostCommentForm from '../components/postForms/postCommentForm';

const PostDetail = () => {
    const { id } = useParams(); 
    const [data, setPost] = useState<any>(); 
    useEffect(() => {
        const fetchPostDetail = async (postId: any) => {
            if (postId) {
                const postDetail = await getPostDetail(postId);
                setPost(postDetail);
            }
        };
    
        if (id) {
            fetchPostDetail(id);
        }
    }, [id]); 

    if(!data){
        return(
            <div>
                cargando
            </div>
        )
    }

    return (
        <div>
            <NavBar/>
            <div className='bg-blue-400 p-10'>
                <p className='p-4'><strong>Creator:</strong> {data.post.creatorName}</p>
                <div className='flex justify-center text-center'>
                    <h1 className='text-2xl w-1/2 bg-blue-200 rounded-md m-2 '>{data.post.title}</h1>
                </div>
                <div className='flex flex-row justify-center gap-4'>
                    <p><strong>Topic 1:</strong> {data.post.topic_1}</p>
                    <p><strong>Topic 2:</strong> {data.post.topic_2}</p>
                </div>
                <p className='text-center'><strong>Stars:</strong> {data.post.stars}</p>
                <p className='text-center'><strong>Description:</strong> {data.post.desc}</p>
                
                <div className='p-2 mt-10'>
                    {data.comments.map((comment:any) =>{
                        return(
                            <div className='border-2 rounded-md p-2' key={comment.pk}>
                                <div className='flex flex-row gap-4 text-center
                                bg-blue-800 text-blue-200 p-2 rounded-md w-1/2 
                                justify-center'>
                                    <div className='text-xl'>
                                        {comment.creatorName}
                                    </div>
                                    <div>
                                        stars: {comment.stars}
                                    </div>
                                </div>
                                <div className='text-center'>
                                    {comment.text}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='text-center text-white'>
                <PostCommentForm postId={data.post.id} /> 
            </div>
        </div>
    );
};

export default PostDetail;