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
    <div>
      <div className='bg-gray-500 w-20 h-72'>
        <div className='bg-black-600 w-20  pt-2'>
          <Link to='/dashboard?tab=profile'>
              <div className='flex hover:bg-slate-400 items-center text-white'>
              <span className='mr-0.5'>
                <HiUser className='text-white'/>
              </span>
                 <p>Profile</p>
              </div>
          </Link>
          {currentUser.isAdmin && (
              <Link to='/dashboard?tab=posts'>
              <div className='flex hover:bg-slate-400 items-center text-white'>
              <span className='mr-0.5'>
                <HiDocumentText className='text-white'/>
              </span>
                 <p>Posts</p>
              </div>
          </Link>
          )}
         
         {currentUser.isAdmin && (
          <>
              <Link to='/dashboard?tab=users'>
              <div className='flex hover:bg-slate-400 items-center text-white'>
              <span className='mr-0.5'>
                <HiOutlineUserGroup className='text-white'/>
              </span>
                 <p>Users</p>
              </div>
          </Link>
            <Link to='/dashboard?tab=comments'>
            <div className='flex hover:bg-slate-400 items-center text-white'>
            <span className='mr-0.5'>
              <HiAnnotation className='text-white'/>
            </span>
               <p>Comments</p>
            </div>
        </Link>
        </>
          )}
          
          <div className=' text-white cursor-pointer flex hover:bg-slate-400 items-center'>
            <span className='mr-0.5'><HiArrowSmRight/></span>
            <p onClick={handleSignout}>Sign out</p>
          </div>
        </div>
      </div>
    </div>
  )
}
