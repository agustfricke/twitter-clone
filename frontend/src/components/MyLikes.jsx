import { useQuery } from "@tanstack/react-query"
import { AiOutlineMessage } from "react-icons/ai"
import { getUserLikes } from "../api/tweets"
import { toast } from "react-hot-toast"
import Loader from "./Loader"
import Like from "./Like"
import Rt from "./Rt"
import { Link } from "react-router-dom"

const MyLikes = ({ user }) => {

  const userId = localStorage.getItem('user_id')

  const { data: likes, isLoading, isError, error } = useQuery({
    queryKey: ["tweets"],
    queryFn: () => getUserLikes(user.username),
  })

  if (isLoading) return <Loader />
  if (isError) return toast.error(error.message)

  return (
    <>
    {likes.map && likes.map(t => (
  <div key={t.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
    <div className="flex flex-row items-start gap-3">

      <img className="h-11 w-11 rounded-full" src={t.avatar} />

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

          <Link to={`/tweet/${t.id}`}>

                      <AiOutlineMessage size={20} />
                      </Link>

                      <p>
                        {t.parent.length}
                      </p>

          </div>

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
            <Rt t={t} user={userId}/>
            <p>
              {t.retweets_count}
            </p>
          </div>

          <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
            <Like t={t} user={userId} />
            <p>
              {t.likes_count}
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>

    ))}
    </>

  )
}

export default MyLikes
