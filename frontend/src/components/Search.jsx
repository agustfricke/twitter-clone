

import { FaSearch } from "react-icons/fa";
import WhoFollow from "./WhoFollow";


const Search = () => {
    return (
<>
        <div className='flex gap-3 w-full p-2 bg-gray-800 rounded-full'>
            <FaSearch src='' className='flex 
          text-gray-500
          cursor-pointer 
          transition 
          m-1
          ' size={20}/>
            <input className='bg-transparent grow outline-none ' placeholder="Search Twitter" />
        </div>

        <WhoFollow/>
        </>
    )
}

export default Search