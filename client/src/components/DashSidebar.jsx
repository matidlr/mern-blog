import  { HiArrowSmRight, HiUser } from 'react-icons/hi';
import {Link, useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function DashSidebar() {
  const location = useLocation()
  const [tab, setTab] =useState('')
   useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const tabFromUrl = urlParams.get('tab')
    if (tabFromUrl){
      setTab(tabFromUrl);
    }
   }, [location.search]);
  return (
    <div>
      <div className='bg-black w-20'>
        <div className='bg-black-600 w-20 p-auto py-1'>
          <Link to='/dashboard?tab=profile'>
              <div className='flex hover:bg-slate-400 items-center text-white'>
              <span className='mr-0.5'>
                <HiUser className='text-white'/>
              </span>
              Profile
              </div>
          </Link>
          <div className=' text-white cursor-pointer flex hover:bg-slate-400 items-center'>
            <span className='mr-0.5'><HiArrowSmRight/></span>
            Sign out
          </div>
        </div>
      </div>
    </div>
  )
}
