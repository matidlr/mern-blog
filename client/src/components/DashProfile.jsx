import {useSelector} from 'react-redux';

export default function DashProfile() {
    const {currentUser} = useSelector((state) => state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
      <form className="flex flex-col gap-2">
        <div className="w-32 h-32 self-center cursor-pointer">
         <img src={currentUser.profilePicture} alt="profile"
         className="rounded-full w-full h-full object-cover border-8 border-[lightgray]" />
         </div>
      <input type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
      <input type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
      <input type='password' id='password' placeholder='password' />
      <button 
          type='submit'
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">
            Update
            </button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className='cursor-pointer'>Delete Account</span>
        <span className='cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
