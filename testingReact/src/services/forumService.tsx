import axios from "axios";
import { Post, Comment } from "../models/models";


export async function getPostList():Promise<Post[]>{
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/posts/`, 
         {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }});
        console.log(response.data);
        return response.data.map((post:any) => new Post(
                post.id, 
                post.creatorName, 
                post.title, 
                post.topic_1, 
                post.topic_2, 
                post.desc, 
                post.stars
            ));

    }catch(error:any){
        console.log("error",  error.response ? error.response.data : error.message)
        return [];
    }
}
export async function getPostListBySearch(search:any){
    try{
        const token = localStorage.getItem('access');
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/posts/`, 
            {headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }, 
            params: search
        });
        // needs to transform into interfaces 
        console.log(response);
    }catch(error){
        console.log("error", error)
    }
}
export async function getPostDetail(postID:any){
    try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/api/blog/post/${postID}/`, 
         {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }});
        console.log('Response from API:', response.data); 
        return response.data;
    }catch(error:any){
        console.log("error",  error.response ? error.response.data : error.message)
        return [];
    }
}
export async function createPost(postData:any){
    try{
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://127.0.0.1:8000/api/blog/post/create/`,
            postData, 
         {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }});
        console.log(response);
    }catch(error:any){
        console.log("error",  error.response ? error.response.data : error.message)
        return [];
    }
}
export async function deletePost(postID:any){
    try{
        const token = localStorage.getItem('access');
        const response = await axios.delete(`http://127.0.0.1:8000/api/blog/post/${postID}/delete/`, 
         {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }});
        console.log(response);
    }catch(error){
        console.log("error", error)
    }
}
export async function createComment(commentData:any){
    try{
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://127.0.0.1:8000/api/blog/comment/create/`,
            commentData, 
         {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }});
        console.log(response);
    }catch(error){
        console.log("error", error)
    }
}
export async function deleteComment(commentID:any){
    try{
        const token = localStorage.getItem('access');
        const response = await axios.delete(`http://127.0.0.1:8000/api/blog/comment/${commentID}/delete/`, 
         {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        }});
        console.log(response);
    }catch(error){
        console.log("error", error)
    }
}