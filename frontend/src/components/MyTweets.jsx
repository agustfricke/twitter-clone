import {
  AiOutlineMessage,
  AiFillEdit
} from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { getUserTweets, deleteTweet } from "../api/tweets";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";
import EditTweet from "./EditTweet";
import { useState } from "react";
import Like from "./Like";
import Rt from "./Rt";

const MyTweets = ({ user, myUser, tweets }) => {

  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const userId = localStorage.getItem('user_id')
  console.log(tweets)

  const deleteTweetMutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries(["tweets", user.username])
      toast.success("Tweet deleted successfully")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  // const { data, isLoading, isError, error } = useQuery({
  //   queryKey: ["tweets", user.username],
  //   queryFn: () => getUserTweets(user.username),
  // })

  if(deleteTweetMutation.isLoading) return <Loader/>
  // if (isLoading) return <Loader/>
  // if (isError) return toast.error(error.message)

  return (
    <>
    {tweets.map(t => (
  <div key={t.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
    <div className="flex flex-row items-start gap-3">

      <img className="h-11 w-11 rounded-full" src={user.avatar} />


      <div>
        <div className="flex flex-row items-center gap-2">

          <p className="text-white font-semibold cursor-pointer hover:underline">
            {t.user}
          </p>


          <span className="text-neutral-500 text-sm">
            {new Date(t.created_at).toDateString().slice(4)}
          </span>

        </div>

          <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
            @{t.user}
          </span>

        <div className="text-white mt-1 text-start">
          {t.content}
        </div>

          <img src={`http://127.0.0.1:8000${t.image}`} />

        <div className="flex flex-row items-center mt-3 gap-10">

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
            <AiOutlineMessage size={20} />
            <p>{t.parent.length}</p>
          </div>

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
            {/* <AiOutlineRetweet size={20} color={"green"} /> */}
            <Rt t={t} user={userId}/>
            <p>
                {t.retweets_count}
            </p>
          </div>

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
            {/* <AiFillHeart color={"red"} size={20} /> */}
            <Like t={t} user={userId} />
            <p>
              {t.likes_count}
            </p>
          </div>

          {myUser === user.username && (
            <>
              <div 
                className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <BsFillTrashFill  
                        onClick={() => deleteTweetMutation.mutate(t.id)}
                        size={20} />
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-yellow-300">
                  <AiFillEdit 
                        onClick={() => setIsEditing(true)}
                        size={25} />
              </div>

      {isEditing && (
      <EditTweet tweet={t} close={() => setIsEditing(false)} />
        )}
            </> 
          )}
        </div>
      </div>
    </div>
  </div>

    ))}
    </>
  )
}

export default MyTweets
