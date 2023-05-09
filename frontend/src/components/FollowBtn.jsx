import { follow } from "../api/users"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const FollowBtn = ({ user, page }) => {

  const queryClient = useQueryClient()

  const followMutation = useMutation({
    mutationFn: follow,
    onSuccess: () => {
      queryClient.invalidateQueries(['user'])
      toast.success("Followed")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  return (
              <>

                {page  ? (

                  <button 
                    onClick={() => followMutation.mutate(user.username)}
                    className="bg-slate-200 mr-7 text-black font-semibold rounded-full px-7 py-3 mt-3 ml-3 hover:bg-slate-400 transition">
                    {user.i_follow ? "Unfollow" : "Follow"} 
                  </button>

                ) : (

            <button 
                onClick={() => followMutation.mutate(user.username)}
                className="ml-auto bg-white text-black rounded-full font-bold text-sm py-1.5 px-3.5">
              {user.i_follow ? "Unfollow" : "Follow"}
            </button>


                  )}



              </>
  )
}

export default FollowBtn  
