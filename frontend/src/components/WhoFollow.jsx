import { getRandom, follow } from '../api/apiUsers'
import { useMutation, useQueryClient, useQuery} from 'react-query'

import image from "../assets/favicon.ico"

const WhoFollow = () => {

  const queryClient = useQueryClient()

  const followUserMutation = useMutation({
    mutationFn: follow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['random']})
      toast.success('User updated successfully')
    },
    onError: (error) => {
      toast.error(error)
    }
  })

  const { data: random, isLoading, isError, error } = useQuery({
    queryFn: getRandom,
    queryKey: ['random']
  })

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <>
      <div
        className="bg-gray-800 rounded-lg mt-5
        p-3
        cursor-pointer 
        ">

        <h1 className="text-start text-xl font-bold mb-6">
          Who to follow
        </h1>


          {random.map(user => (

        <div className="grid grid-cols-6 gap-4
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

            </div>



      </>
  )
}

export default WhoFollow
