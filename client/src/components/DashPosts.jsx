import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from './Modal';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
   const {currentUser} = useSelector((state)=> state.user);
   const [userPosts, setUserPosts] = useState([]);
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [postIdToDelete, setPostIdToDelete] = useState('');
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

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${postIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== postIdToDelete)
        );
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
                        <span onClick={()=> {
                          setShowModal(true);
                          setPostIdToDelete(post._id)
                        }} className="text-red-500 hover:underline cursor-pointer">
                             Delete
                          </span>
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
            {showModal && (
           <Modal onClose={()=>setShowModal(false)}>
               <div>
                 <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                 <h3 className='ml-8 mb-4 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete the post?</h3>
                 <div className="flex justify-center my-3 gap-4 ">
                   <button className='bg-red-500 rounded-lg p-2 text-white' onClick={handleDeletePost}>
                     Yes, I'm sure
                   </button>
                   <button onClick={()=> setShowModal(false)} className='bg-gray-500 rounded-lg p-2 text-white'>
                    No, Cancel
                   </button>
                 </div>
               </div>
           </Modal>
      ) }
    </div>
  )
}
