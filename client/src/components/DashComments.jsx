import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from './Modal';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashComments() {
   const {currentUser} = useSelector((state)=> state.user);
   const [comments, setComments] = useState([]);
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [commentIdToDelete, setCommentIdToDelete] = useState('');
   useEffect(()=> {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`)
        const data = await res.json()
        if (res.ok){
          setComments(data.comments);
          if(data.comments.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
      
      }
    };
    if(currentUser.isAdmin) {
      fetchComments();
    }
   }, [currentUser._id]);

   const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
      try {
        const res = await fetch(`/api/comment/deleteComment/${commentIdToDelete}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
          setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
          setShowModal(false);
        }else{
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
  };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 
    scrollbar-thumb-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-500">
       {currentUser.isAdmin && comments.length > 0 ? (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg" key={currentUser._id}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Date updated</th>
              <th scope="col" className="px-6 py-3">Comment content</th>
              <th scope="col" className="px-6 py-3">Number of likes</th>
              <th scope="col" className="px-6 py-3">PostId</th>
              <th scope="col" className="px-6 py-3">UserId</th>
              <th scope="col" className="px-6 py-3">
                <span>Delete</span>
                </th>
            </tr>
            </thead>
            {comments.map((comment) => (
              <tbody key={comment._id}>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">
                    {new Date(comment.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                      {comment.content}
                  </td>
                  <td className="px-6 py-4">
                   
                      {comment.numberOfLikes}
                
                  </td>
                  <td className="px-6 py-4">{comment.postId}</td>
                  <td className="px-6 py-4">{comment.userId}</td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCommentIdToDelete(comment._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer '
                    >
                      Delete
                    </span>
                  </td>
      
                </tr>
                </tbody>
            ))}
          </table>
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
        <p>You have no comments yet!</p>
      )}
            {showModal && (
           <Modal onClose={()=>setShowModal(false)}>
               <div>
                 <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                 <h3 className='ml-8 mb-4 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete the user?</h3>
                 <div className="flex justify-center my-3 gap-4 ">
                   <button className='bg-red-500 rounded-lg p-2 text-white' onClick={handleDeleteComment}>
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
};

