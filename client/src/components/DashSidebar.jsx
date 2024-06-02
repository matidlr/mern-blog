import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import {Link, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export default function DashSidebar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const {currentUser} = useSelector((state) => state.user);
  const [tab, setTab] =useState('')
   useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl){
      setTab(tabFromUrl);
    }
   }, [location.search]);

   const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok){
        console.log(data.message);
      }else{
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
<div className="min-h-screen flex flex-row bg-gray-100">
  <div className="flex flex-col w-56 bg-white rounded-r-3xl overflow-hidden">
    <ul className="flex flex-col py-4">

       
{currentUser && currentUser.isAdmin && (
    
    <li className={tab === 'dash' ? 'bg-green-200' : ''}>
      <Link  to='/dashboard?tab=dash' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"> <HiChartPie/><i className="bx bx-home"></i></span>
        <span className="text-sm font-medium">Dashboard</span>

      </Link>
    </li>
         )}
    
    
    <li className={tab === 'profile' ? 'bg-green-200' : ''}>
      <Link to='/dashboard?tab=profile' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"> <HiUser/><i className="bx bx-home"></i></span>
        <span className="text-sm font-medium">Profile</span>

      </Link>
    </li>
      
      {currentUser.isAdmin && (
    
    <li className={tab === 'posts' ? 'bg-green-200' : ''}>
      <Link to='/dashboard?tab=posts' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"> <HiDocumentText/><i className="bx bx-home"></i></span>
        <span className="text-sm font-medium">Posts</span>

      </Link>
    </li>
         )}
      {currentUser.isAdmin && (
    <>
    <li className={tab === 'users' ? 'bg-green-200' : ''}>
      <Link to='/dashboard?tab=users' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"> <HiOutlineUserGroup/><i className="bx bx-home"></i></span>
        <span className="text-sm font-medium">Users</span>

      </Link>
    </li>
      
    <li className={tab === 'comments' ? 'bg-green-200' : ''}>
      <Link to='/dashboard?tab=comments' className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"> <HiAnnotation/><i className="bx bx-home"></i></span>
        <span className="text-sm font-medium">Comments</span>

      </Link>
    </li>
    </>
     )}

    <li>
      <div onClick={handleSignout}
       className="flex flex-row items-center h-12 transform hover:translate-x-2 transition-transform ease-in duration-200 text-gray-500 hover:text-gray-800">
        <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400"> <HiArrowSmRight/><i className="bx bx-home"></i></span>
        <span className="text-sm font-medium">Sign Out</span>

      </div>
    </li>
        
    </ul>
  </div>
</div>
  );
}





