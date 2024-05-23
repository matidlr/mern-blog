import  { HiArrowSmRight, HiUser } from 'react-icons/hi';
import {Link, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';

export default function DashSidebar() {
  const dispatch = useDispatch();
  const location = useLocation()
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
      <div className='bg-black w-20'>
        <div className='bg-black-600 w-20 p-auto py-1'>
          <Link to='/dashboard?tab=profile'>
              <div className='flex hover:bg-slate-400 items-center text-white'>
              <span className='mr-0.5'>
                <HiUser className='text-white'/>
              </span>
                 <p>Profile</p>
              </div>
          </Link>
          <div className=' text-white cursor-pointer flex hover:bg-slate-400 items-center'>
            <span className='mr-0.5'><HiArrowSmRight/></span>
            <p onClick={handleSignout}>Sign out</p>
          </div>
        </div>
      </div>
    </div>
  )
}
