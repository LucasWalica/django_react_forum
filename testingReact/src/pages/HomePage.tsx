import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { getPostList } from "../services/forumService";
import { useEffect, useState } from "react";
import isAuthenthicated from "../services/authServices";
import { PostProp } from "../components/props/Post";
import { Post } from "../models/models";

export default function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getData = async () => {
      if (!isAuthenthicated()) {
        navigate("/");
      }
      const postData = await getPostList();
      setPosts(postData);
    };
    getData();
  }, []);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.topic_1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.topic_2 && post.topic_2.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="border-2 rounded-md m-2 p-2 border-blue-500 bg-blue-200">
      <NavBar />
      <div className="mt-4 mb-4">
        <div className="flex justify-center m-2">
          <div className="border-2 rounded-md border-blue-950 md:w-1/2 p-2">
            <h1 className="text-center text-2xl">Welcome to our forum</h1>
            <h2 className="text-center text-xl">Feel free to talk about any topic</h2>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="w-full md:w-1/2 p-2 border rounded text-black"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="cursor-pointer"
            onClick={() => handlePostClick(post.id)}
          >
            <PostProp post={post} />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}