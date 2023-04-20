import { useState } from "react";
import { q } from "../api/apiUsers";
import { FaSearch } from "react-icons/fa";
import WhoFollow from "./WhoFollow";
import { useMutation, useQueryClient, useQuery} from 'react-query'
import SearchBox from "./TestSearch";



const Search = () => {
  
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState('')



    return (
<>

        <div  onClick={() => setShow(true)} className='flex gap-3 w-full p-2 bg-gray-800 rounded-full'>
            <FaSearch src='' className='flex 
          text-gray-500
          cursor-pointer 
          transition 
          m-1
          ' size={20}/>
            <input 
          onChange={(e) => setQuery(e.target.value)} value={query}
          className='bg-transparent grow outline-none ' placeholder="Search Twitter" />
        </div>


        <SearchBox/>
        <WhoFollow/>
        </>
    )
}

export default Search
