import { Alert, Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

export default function SignIn ()  {
    const [formData, setFormData] = useState({});
    const {loading, error: errorMessage} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

const handleSubmit = async (e) => {
   e.preventDefault();
   if (!formData.email || !formData.password) {
    return dispatch(signInFailure('Please fill out all fields.'));
  }
   try {
     dispatch(signInStart());
     const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
     });
     const data = await res.json();
     if (data.success === false){
       dispatch(signInFailure(data.message));
     }
     if(res.ok){
      dispatch(signInSuccess(data));
      navigate('/');
     }
   } catch (error) {
     dispatch(signInFailure(error.message));
   }

}

  return (
    <div className='min-h-screen mt-20'>
       <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* left */}
          <div className="flex-1">
            <Link to='/' 
                  className='font- bold dark:text-white text-4xl'>
                <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 rounded-lg text-white'>
                  Mati
                </span>
                  Blog
          </Link>
          <p className='text-sm mt-5'>
             You can sign in 
             with your email and password or with Google.
          </p>
          </div>
          {/* right */}
          <div className="flex-1">
            <form 
                className='flex flex-col gap-4'
                onSubmit={handleSubmit}>
               <div className="">
                 <Label value='Your email'/>
                 <TextInput 
                     type='email' 
                     placeholder='name@company.com' 
                     id='email' 
                     onChange={handleChange}/>
               </div>
               <div className="">
                 <Label value='Your password'/>
                 <TextInput 
                      type='password' 
                      placeholder='Password' 
                      id='password' 
                      onChange={handleChange}/>
               </div>
               <button 
                    type="submit" 
                    className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    disabled={loading}>
                    {
                       loading ? 'Loading...' : 'Sign In'
                    }
                </button>
               
            </form>

            <div className="flex gap-2 text-sm mt-5">
               <span>Don't have an account?</span>
               <Link to='/sign-up' className='text-blue-500'>
                  Sign Up
               </Link>
            </div>
            {
              errorMessage && (
                <div class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span class="sr-only">Info</span>
                <div>
                  <span class="font-medium">{errorMessage}</span>
                </div>
              </div>
              )
            }
          </div>
       </div>
    </div>
  );
};