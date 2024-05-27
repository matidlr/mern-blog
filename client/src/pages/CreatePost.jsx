import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, uploadBytesResumable, ref} from 'firebase/storage';
import {app} from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [file, setFile] = useState();
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const handleUploadImage = async () => {
     try {
      if (!file){
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = 
             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
             setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL})
          });
        }
      );
     } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
     }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };
  
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-sreen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input 
              type="text" 
              placeholder="Title" 
              required 
              id='title' 
              className="flex-1" 
              onChange={(e)=> 
                setFormData({ ...formData, title: e.target.value })
              }/>
          <select 
           onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <input type="file" onChange={(e)=> setFile(e.target.files[0])}/>
          <button 
              className="border px-2 bg-gray-200" 
              type="button"
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
              >
                {
                  imageUploadProgress ? (
                  'Uploading...'
                  ) : (
                    'Upload image'
                  )
                }
            </button>
        </div>
       {formData.image && (
        <img 
           src={formData.image}
           alt='upload'
           className='w-full h-72 object-cover'
           />
       )}

        <ReactQuill 
            theme="snow" 
            placeholder='Write something...' 
            className='h-72 mb-1' 
            required
            onChange={(value) => {
              setFormData({ ...formData, content: value });
            }}/>;
        <button type='submit' className="text-white bg-gradient-to-r from-green-500 to-pink-500 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">Publish</button>
      </form>
    </div>
  )
}
