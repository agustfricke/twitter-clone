import { AiFillHeart, AiOutlineRetweet, AiOutlineMessage } from 'react-icons/ai';
import { useQuery } from "react-query"
import { getTweets } from "../api/apiTweets"
import Add from './Add';
import image from "../assets/cover.png"
import { Link } from 'react-router-dom';

const Feed = () => {

  const { data: tweets, isLoading, isError, error } = useQuery({

    queryFn: getTweets,
    queryKey: ['tweets']
  })


  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <>

      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">

          <div>
            <div className="flex flex-row items-center gap-2">
              <p className="text-white font-semibold text-xl">
                Home
              </p>
            </div>
          </div>

        </div>
      </div>

      <Add/>

      {tweets.map(t => (
        <div key={t.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
          <div className="flex flex-row items-start gap-3">

            <img className="h-11 w-11 rounded-full" src={`http://127.0.0.1:8000${t.avatar}`} />
            <div>
              <div className="flex flex-row items-center gap-2">

                <p className="text-white font-semibold cursor-pointer hover:underline">
                  <Link to={`${t.user}`}>
                  {t.user}
                  </Link>
                </p>

                <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                  @{t.user}
                </span>

                <span className="text-neutral-500 text-sm">
                  {t.created_at}
                </span>

              </div>

              <div className="text-white mt-1 text-start">
                {t.content}
              </div>

              <div className="flex flex-row items-center mt-3 gap-10">
                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">

                  <AiOutlineMessage size={20} />

                  <p>
                    0
                  </p>

                </div>

                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                  <AiOutlineRetweet size={20} />
                  <p>
                    {t.retweeted.length}
                  </p>
                </div>

                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                  <AiFillHeart color={'red'} size={20} />
                  <p>
                    {t.liked.length}
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

export default Feed
