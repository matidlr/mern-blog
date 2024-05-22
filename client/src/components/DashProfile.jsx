import {useSelector} from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
    const {currentUser} = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);
    const filePickerRef = useRef();
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
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storage, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = 
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImageFileUploadProgress(progress.toFixed(0));
            },
            (error) => {
              setImageFileUploadError('Could not upload image')
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=> {
                setImageFileUrl(downloadURL);
              })
            }
        )
    };
  return (
    <div className= 'max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>profile</h1>
      <form className="flex flex-col gap-2">
        <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
        <div className="relative w-32 h-32 self-center cursor-pointer" onClick={()=>filePickerRef.current.click()}>
        {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                },
              }}
            />
          )}
         <img src={imageFileUrl || currentUser.profilePicture} alt="profile"
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