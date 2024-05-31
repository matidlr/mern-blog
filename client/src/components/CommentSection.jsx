import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, TextInput, Textarea } from 'flowbite-react';
import { useEffect, useState } from 'react';
import Comment from './Comment';
import Modal from './Modal';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({ postId }) {
  const {currentUser} = useSelector((state) => state.user);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getpostcomments/${postId}`);
        if (res.ok){
          const data = await res.json();
          setComments(data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getComments();
  }, [postId]);

 const handleLike = async (commentId) => {
   try {
     if (!currentUser) {
      navigate('/sign-in');
      return;
     }
     const res = await fetch(`/api/comment/likeComment/${commentId}`, {
      method: 'PUT',
     });
     if (res.ok) {
      const data = await res.json();
      setComments(comments.map((comment) => 
        comment._id === commentId ? {
          ...comment,
          likes: data.likes,
          numberOfLikes: data.likes.length,
        } : comment
      ));
     }
   } catch (error) {
    console.log(error.message);
   }
 };

 const handleEdit = async (comment, editedContent) => {
  setComments(
    comments.map((c) =>
      c._id === comment._id ? { ...c, content: editedContent } : c
    )
  );
};

const handleDelete = async (commentId) =>{
    setShowModal(false);
    try {
      if (!currentUser){
        navigate('/sign-in')
      }
      const res = await fetch(`/api/comment/deleteComment/${commentId}`, {
        method: 'DELETE',
      });
      if (res.ok){
        const data = await res.json();
            setComments(
              comments.filter((comment) => comment._id !== commentId)
            );
      }
    } catch (error) {
      console.log(error.message);
    }
}



  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
      {currentUser ? 
      (
        <div className="flex items-center gap-1 my-5 text-gray-500 text-sm">
          <p>Signed in as:</p>
          <img  className='h-5 w-5 object-cover rounded-full'
          src={currentUser.profilePicture}/>
          <Link to={'/dashboard?tab=profile'}
                 className='text-xs text-cyan-600 hover:underline'
          > 
              @{currentUser.username}
          </Link>
        </div>
      ) : 
      (
        <div className="text-sm text-teal-500 my-5 flex gap-1">
          You must be signed in to comment.
          <Link className='text-blue-500'
              to={'/sign-in'}>
             Sign in
          </Link>
        </div>
      )}
      {currentUser && (
        <form onSubmit={handleSubmit}
        className='border border-teal-500 rounded-md p-3'>
          <Textarea
           placeholder='Add a comment...'
           rows='3'
           maxLength={200}
           onChange={(e)=> setComment(e.target.value)}
           value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className='text-gray-500 text-xs'>
              {200 - comment.length} characters remaining
            </p>
            <button  className="text-white bg-gradient-to-r from-blue-500 to-yellow-500 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-50"
            type='submit'
            >
              Submit
            </button>
          </div>
          {commentError && (
            <Alert color='failure' className='mt-5'>
              {commentError}
            </Alert>
          )}
     </form>
      )}

      {comments.length === 0 ? (
          <p className='text-sm my-5'>No comments yet</p>
        ) : (
          <>
          <div className="text-sm my-5 flex items-center gap-1">
              <p>Comments</p>
              <div className="border-gray-400 py-1 px-2 rounded-sm">
                <p>{comments.length}</p>
              </div>
          </div>
          {comments.map((comment)=> (
            <Comment
             key={comment._id}
             comment={comment}
             onLike={handleLike}
             onEdit={handleEdit}
             onDelete={(commentId) => {
              setShowModal(true);
              setCommentToDelete(commentId)
             }}
            />
          ))}
          </>
        )
      }   

{showModal && (
           <Modal onClose={()=>setShowModal(false)}>
               <div>
                 <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                 <h3 className='ml-8 mb-4 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete the comment?</h3>
                 <div className="flex justify-center my-3 gap-4 ">
                   <button className='bg-red-500 rounded-lg p-2 text-white' onClick={()=> handleDelete(commentToDelete)}>
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
