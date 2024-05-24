import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';


export default function Header  ()  {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('')
  const [visible, setVisible] = useState(false);
  const path = useLocation().pathname;
  const dispatch = useDispatch();

   const handleSubmit  = async (e) =>{
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
   };

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
    <header className='bg-slate-200 shadow-md'>
    <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
      <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>Mati</span>
          <span className='text-slate-700'>Blog</span>
        </h1>
      </Link>
      <form
        onSubmit={handleSubmit}
        className='bg-slate-100 p-3 rounded-lg flex items-center'
      >
        <input
          type='text'
          placeholder='Search...'
          className='bg-transparent focus:outline-none w-24 sm:w-64'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FaSearch className='text-slate-600 ml-2' />
        </button>
      </form>
      <ul className='flex gap-4'>
        <Link to='/'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>
            Home
          </li>
        </Link>
        <Link to='/about'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>
            About
          </li>
        </Link>
        <Link to='/projects'>
          <li className='hidden sm:inline text-slate-700 hover:underline'>
            Projects
          </li>
        </Link>
      </ul>
      <button className='text-black' onClick={()=> dispatch(toggleTheme())}>
        {theme === 'light' ? <FaSun/> : <FaMoon/> }
      </button>

    {
      currentUser ? (
        <div className='flex flex-col'>
            <Link className='bg-gray-400 px-2 rounded-lg hover:bg-gray-300' to='/dashboard'>Dashboard</Link>
            <button onClick={handleSignout} className="text-gray-700 block px-4 py-2 text-sm cursor-pointer hover:bg-gray-600 hover:text-white">Sign out</button>
       
      </div>
      ) : (
        <Link className=' px-2 py-1 rounded-lg bg-blue-300 hover:bg-blue-600' to='/sign-in'>
        <button>
          Sign in
        </button>
      </Link>
      )
    }


  
    </div>
  </header>
)
};