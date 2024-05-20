import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('')
  const [visible, setVisible] = useState(false);
  const path = useLocation().pathname;
  const dispatch = useDispatch();

   const handleSubmit  = async (e) =>{

   }
  

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
        <div>
        <button onClick={() => setVisible(!visible)} type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
          {currentUser.name}
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      ) : (
        <Link className=' px-2 py-1 rounded-lg bg-blue-300 hover:bg-blue-600' to='/sign-in'>
        <button>
          Sign in
        </button>
      </Link>
      )
    }

    
      <div className="relative inline-block text-left">
 
{
  visible ? (
    <div  className={`visible ? "hidden" : "showing" absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
    <div className="py-1" role="none">
      
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">{currentUser.username}</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">{currentUser.email}</a>
    </div>
    <div className="py-1" role="none">
      <a href="/dashboard?tab=profile" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Profile</a>
      <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Sign out</a>
    </div>
  </div>
  ) : ('')
}

</div>
  
    </div>
  </header>
);
}

export default Header;