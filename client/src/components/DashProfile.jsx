import {useSelector} from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { 
  updateStart, 
  updateSuccess, 
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
 } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Link } from 'react-router-dom';

export default function DashProfile() {
    const {currentUser} = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file){
        setImageFile(file);
        setImageFileUrl(URL.createObjectURL(file));
      }
    };
    useEffect(()=> {
      if (imageFile) {
        uploadImage();
      }
    }, [imageFile]);

    const uploadImage = async () => {
      setImageFileUploading(true);
      setImageFileUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + imageFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError(
            'Could not upload image (File must be less than 2MB)'
          );
          setImageFileUploadProgress(null);
          setImageFile(null);
          setImageFileUrl(null);
          setImageFileUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
            setImageFileUploading(false);
          });
        }
      );
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setUpdateUserError(null);
      setUpdateUserSuccess(null);
      if (Object.keys(formData).length === 0){
        setUpdateUserError('Please wait for image to upload')
        return;
      }
      if (imageFileUploading) {
        setUpdateUserError('Please wait for image to upload')
        return;
      }
      try {
        dispatch(updateStart());
        const res = await fetch(`/api/user/update/${currentUser._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok){
          dispatch(updateFailure(data.message));
          setUpdateUserError(data.message);
        }else{
          dispatch(updateSuccess(data));
          setUpdateUserSuccess('User profile updated successfully!')
        }
      } catch (error) {
        dispatch(updateFailure(error.message))
      }
    };

    const handleDeleteUser = async () => {
      setShowModal(false);
      try {
        dispatch(deleteUserStart());
        const res = await fetch(`/api/user/delete/${currentUser._id}`, {
          method: 'DELETE',
        });
        const data = await res.json();
        if (!res.ok){
           dispatch(deleteUserFailure(data.message));
        }else{
          dispatch(deleteUserSuccess(data));
        }
      } catch (error) {
        dispatch(deleteUserFailure(data.message));
      }
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
        
      }
    };

  return (
    <div className= 'max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer" onClick={()=>filePickerRef.current.click()}>
        
         <img src={imageFileUrl || currentUser.profilePicture} alt="profile"
         className="rounded-full w-full h-full object-cover border-8 border-[lightgray]" />
         </div>
      <input type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange}/>
      <input type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange}/>
      <input type='password' id='password' placeholder='password' onChange={handleChange}/>
      <button 
          type='submit'
          className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full"
          disabled={loading || imageFileUploading}>
            {loading ? 'Loading...' : 'Update'}
            </button>
     {currentUser.isAdmin && (
      <Link to={'/create-post'}>
         <button className="text-white bg-gradient-to-r from-green-500 to-pink-500 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full" >
           Create a post
         </button>
      </Link>
     )}
     

      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span onClick={()=> setShowModal(true)} className='cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='cursor-pointer'>Sign Out</span>
      </div>
      {showModal && (
           <Modal onClose={()=>setShowModal(false)}>
               <div>
                 <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                 <h3 className='ml-8 mb-4 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
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
}
