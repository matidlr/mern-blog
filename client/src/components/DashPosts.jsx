import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

export default function DashPosts() {
   const {currentUser} = useSelector((state)=> state.user);
   const [userPosts, setUserPosts] = useState([]);
   const [showMore, setShowMore] = useState(true);
   useEffect(()=> {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`)
        const data = await res.json()
        if (res.ok){
          setUserPosts(data.posts);
          if(data.posts.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
      
      }
    };
    if(currentUser.isAdmin) {
      fetchPosts();
    }
   }, [currentUser._id]);

   const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
          <>
          <div className="">
            <div className="flex gap-2">
              <h1 className="shadow-md p-1 cursor-pointer hover:bg-slate-400">Date updated</h1>
              <h1 className="shadow-md p-1 cursor-pointer hover:bg-slate-400">Post image</h1>
              <h1 className="shadow-md p-1 cursor-pointer hover:bg-slate-400">Post title</h1>
              <h1 className="shadow-md p-1 cursor-pointer hover:bg-slate-400">Category</h1>
              <h1 className="shadow-md p-1 cursor-pointer hover:bg-slate-400">Delete</h1>
              <div className="shadow-md p-1 cursor-pointer hover:bg-slate-400">
                <span>Edit</span>
              </div>
            </div>
            {userPosts.map((post) => (
                <div key={post.userId} className="mt-2 flex divide-y">
                  <div className="flex bg-white dark_border-gray-700 dark:bg-gray-800">
                    <div className="mr-9 text-sm ml-3">
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </div>
                    <div className="mr-5">
                      <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='w-20 h-10 object-cover bg-gray-500'
                        />
                      </Link>
                      </div>
                      <div className="">
                        <Link className="text-m text-gray-900 font-medium dark:text-white" to={`/post/${post.slug}`}>{post.title}</Link>
                      </div>
                      <div className="ml-5">
                        <Link className="text-m" to={`/post/${post.category}`}>{post.category}</Link>
                      </div>
                      <div className="ml-8">
                        <span className="text-red-500 hover:underline cursor-pointer">Delete</span>
                      </div>
                      <div className="ml-3.5 ">
                        <Link to={`/update-post/${post._id}`}>
                          <span className="text-green-500 hover:underline cursor-pointer">Edit</span>
                        </Link>
                      </div>
                    
                  </div>
                </div>
            ))}
          </div>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
          </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  )
}
