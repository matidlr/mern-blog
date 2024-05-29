import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from './Modal';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashUsers() {
   const {currentUser} = useSelector((state)=> state.user);
   const [users, setUsers] = useState([]);
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [userIdToDelete, setUserIdToDelete] = useState('');
   useEffect(()=> {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`)
        const data = await res.json()
        if (res.ok){
          setUsers(data.users);
          if(data.users.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
      
      }
    };
    if(currentUser.isAdmin) {
      fetchUsers();
    }
   }, [currentUser._id]);

   const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(
        `/api/user/getusers?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
      try {
        const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (res.ok) {
          setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
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
       {currentUser.isAdmin && users.length > 0 ? (
        <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg" key={currentUser._id}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Date created</th>
              <th scope="col" className="px-6 py-3">User image</th>
              <th scope="col" className="px-6 py-3">Username</th>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">Admin</th>
              <th scope="col" className="px-6 py-3">
                <span>Delete</span>
                </th>
            </tr>
            </thead>
            {users.map((user) => (
              <tbody key={user._id}>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                      />
                  </td>
                  <td className="px-6 py-4">
                   
                      {user.username}
                
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}</td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
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
        <p>You have no users yet!</p>
      )}
            {showModal && (
           <Modal onClose={()=>setShowModal(false)}>
               <div>
                 <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                 <h3 className='ml-8 mb-4 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete the user?</h3>
                 <div className="flex justify-center my-3 gap-4 ">
                   <button className='bg-red-500 rounded-lg p-2 text-white' onClick={handleDeleteUser}>
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

