import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-sreen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <input type="text" placeholder="Title" required id='title' className="flex-1" />
          <select name="" id="">
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <input type="file" accept='image/*' />
          <button className="border px-2 bg-gray-200" type="button">Upload image</button>
        </div>
        <ReactQuill theme="snow" placeholder='Write something...' className='h-72 mb-1' required/>;
        <button type='submit' className="text-white bg-gradient-to-r from-green-500 to-pink-500 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">Publish</button>
      </form>
    </div>
  )
}
