import { AiOutlineMessage } from 'react-icons/ai';
import { getSoloTweet } from '../api/tweets';
import { Link, useParams } from 'react-router-dom';
import { useQuery} from '@tanstack/react-query'
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import Rt from '../components/Rt';
import Like from '../components/Like';
import Comments from '../components/Comments';

const SoloTweet = () => {

  const { id } = useParams()

  const { data: tweet , isLoading, isError, error } = useQuery(['soloTweet', id], () => getSoloTweet(id))

  if(isLoading) return <Loader/>
  if(isError) return toast.error(error.message)

  return (

<>
        <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
          <div className="flex flex-row items-start gap-3">

            <img className="h-11 w-11 rounded-full" src={`http://127.0.0.1:8000${tweet.avatar}`} />
            <div>
              <div className="flex flex-row items-center gap-2">

                <p className="text-white font-semibold cursor-pointer hover:underline">
                  <Link to={`${tweet.user}`}>
                  {tweet.user}
                  </Link>
                </p>

                <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                  @{tweet.user}
                </span>

                <span className="text-neutral-500 text-sm">
          {new Date(tweet.created_at).toDateString().slice(4)}
                </span>

              </div>

              <div className="text-white mt-1 text-start">
                {tweet.content}
              </div>

                <img src={tweet.image} />

              <div className="flex flex-row items-center mt-3 gap-10">
                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">

                  <AiOutlineMessage size={20} />

                  <p>
                    0
                  </p>

                </div>

                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                        <Rt t={tweet}/>
                  <p>
                    {tweet.retweets_count}
                  </p>
                </div>


                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">

                  <Like t={tweet}/>
                  <p>
                    {tweet.likes_count}
                  </p>
                </div>


              </div>
            </div>

          </div>
        </div>

    <Comments tweet={tweet} />

    </>



  )
}

export default SoloTweet
