import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
  const auth = getAuth(app);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleGoogleClick = async () =>{
 
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' })
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,

        }),
      })
      const data = await res.json()
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button 
         type='submit'
         className="inline-flex items-center justify-center text-black bg-white  hover:bg-gradient-to-r from-pink-500 to-orange-500 focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm py-2 border-2"
         onClick={handleGoogleClick}>
          <AiFillGoogleCircle className='w-5 h-6 mr-2 text-center'/>
          <p className=''>Continue with Google</p>
    </button>
  )}
