

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about JavaScript and React?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these amazing projects
            </p>
            <button className="text-white bg-gradient-to-r from-green-500 to-blue-500 hover:bg-gradient-to-l 
          focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium 
          rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full">
                <a href="https://projects-portfolio-mdlr.netlify.app/#" target='_blank' rel='noopener noreferrer'>
                    Projects
                </a>
            </button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg" />
        </div>
    </div>
  )
}