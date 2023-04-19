import { AiFillHeart, AiOutlineRetweet, AiOutlineMessage } from 'react-icons/ai';
import { getSoloTweet } from "../api/apiTweets"
import { Link, useParams } from 'react-router-dom';
import { useQuery} from 'react-query'
import AddComment from './AddComment';
import Comments from './Comments';

const SoloTweet = () => {

  const { id } = useParams()

  const { data: tweet , isLoading, isError, error } = useQuery(['soloTweet', id], () => getSoloTweet(id))

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>

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
                  <AiOutlineRetweet size={20}
                      { ...tweet.iretweeted? {color: 'green'} : {color: 'white'}}
                      onClick={() => handleRetweet(t.id)}/>
                  <p>
                    {tweet.retweeted_count}
                  </p>
                </div>


                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">

                  <AiFillHeart onClick={() => handleLike(t.id)} 
                    { ...tweet.iliked ? {color: 'red'} : {color: 'white'} }
                    size={20} />
                  <p>
                    {tweet.likes_count}
                  </p>
                </div>


              </div>
            </div>

          </div>
        </div>

        <AddComment tweetId={tweet.id}/>

        <Comments tweetId={tweet.id}/>

        </>
  )
}

export default SoloTweet
