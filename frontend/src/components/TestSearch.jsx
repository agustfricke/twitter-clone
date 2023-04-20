import { useQuery } from 'react-query'
import {useState} from 'react'
import {q} from '../api/apiUsers'
import axios from "axios"

// Change porducts por users

function SearchResult({isLoading, data})
{
   return (
        <div className="flex flex-col px-4 py-2
        w-full bg-gray-500 divide-y divide-gray-300">
            {isLoading && <div className="text-white">Loading...</div>}
            {data && data.map((item) => (
                <div key={item.id} className="text-gray-100 py-2">
                    {item.username}
                </div>
            ))}
        </div>
   )
}


export default function SearchBox() {

  const [search, setSearch] = useState('')
 

  const {data, isLoading, error} = useQuery({
    queryKey: ['search', search],
    queryFn: 
    () => {
    if (search) {
       return q(search)
    }
    return {products: []}
    }
  })
 
 

  return (
    <div>
        <input type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
        placeholder='Enter your search term here'
        className="p-2 w-full focus:outline-none 
        rounded-md bg-gray-600 placeholder:text-gray-500
         text-gray-50 focus:ring focus:ring-purple-500" />
        {data?.products.length > 0 && <SearchResult isLoading={isLoading} data={data.products} />}

    </div>
  )
}
