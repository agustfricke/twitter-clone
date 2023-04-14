import { BsImage } from "react-icons/bs";
import image from "../assets/favicon.ico"

const Add = () => {
    return (
        <div
            className="
border-b-[1px] 
border-neutral-800 
p-5 
">
            <div className='flex gap-3 w-full border-b-[1px] 
border-neutral-800 p-3'>
                <img src={image} className='h-14 w-14 rounded-full ' />
                <input className='bg-transparent grow outline-none ' placeholder="What's happening" />
            </div>
            <div className='flex justify-between p-3'>
                <BsImage className="flex 
          text-neutral-500 
          cursor-pointer 
          transition 
          mt-3
          hover:text-sky-500" size={20} />

                <button className="bg-sky-400 hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
                    Tweet
                </button>
            </div>



        </div>

    )
}

export default Add