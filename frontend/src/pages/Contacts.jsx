import { Link } from 'react-router-dom'
import { userProfile } from "../api/users"
import { useQuery } from '@tanstack/react-query'


const Contacts = () => {

  const  username = localStorage.getItem('username')

  const { data } = useQuery({
    queryKey: ['contacts'],
    queryFn: () => userProfile(username),
  })

  console.log(data)

  return (
  <>
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">

          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold text-xl">
                Contacts 
              </p>
            </div>
          </div>

        </div>
      </div>

        
        
      {data?.followed_usernames?.map((contact) => (


            <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
              <div className="flex flex-row items-start gap-3">

                <img className="h-11 w-11 rounded-full" src={`http://127.0.0.1:8000${contact.avatar}`} />

                <div>
                  <div className="flex flex-row items-center gap-2">

                    <p className="text-white font-semibold cursor-pointer hover:underline">
                      <Link to={`/chat/${contact.username}`}>
                    {contact.username}

                      </Link>
                    </p>


                  </div>


            </div>
          </div>
          </div>
      ))}
      </>

  )
}

export default Contacts
