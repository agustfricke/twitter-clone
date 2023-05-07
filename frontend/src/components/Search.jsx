import { useState } from "react";
import { q } from "../api/apiUsers";
import { FaSearch } from "react-icons/fa";
import WhoFollow from "./WhoFollow";
import { useQuery} from 'react-query'

function SearchResult({isLoading, data})
{
   return (
            <>
            {isLoading && <div className="text-white">Loading...</div>}
            {data && data.map((user) => (
        <div className="grid grid-cols-6 gap-4
          mt-3
p-3
  border-b-[1px] 
  border-neutral-800 
  cursor-pointer 
  hover:bg-gray-900 
  transition
          rounded-lg

          ">

          <div className='col-start-1 col-end-2'>
          <img className="h-11 w-11 rouned-full" src={user.avatar} />

              </div>

              <div className=''>
              <p

                className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
                ">
                  {user.username}
              </p>

              <span

                className="
                text-neutral-500
                hidden
                md:block
                ">
                  @{user.username}
              </span>
              </div>


              <div className='col-end-7 col-span-2'>
              <button 
                  onClick={() => followUserMutation.mutate(user.username)}
                className="bg-slate-200 hover:bg-slate p-1 px-3 rounded-full ml- text-black font-bold hover:bg-slate-100">
                Follow
              </button>
              </div>


        </div>

            ))}

</>

   )
}


const Search = () => {
  
  const [search, setSearch] = useState('')
 

  const {data, isLoading } = useQuery({
    queryKey: ['search', search],
    queryFn: 
    () => {
    if (search) {
       return q(search)
    }
    return {users: []}
    }
  })


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
                  value={search}
        onChange={(e) => setSearch(e.target.value)} 
          className='bg-transparent grow outline-none ' placeholder="Search Twitter" />
        </div>

        {data?.users.length > 0 && <SearchResult isLoading={isLoading} data={data.users} />}

        <WhoFollow/>
        </>
    )
}

export default Search
