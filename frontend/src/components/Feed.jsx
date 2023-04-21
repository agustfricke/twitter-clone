import { AiFillHeart, AiOutlineRetweet, AiOutlineMessage } from 'react-icons/ai';
import { getTweets, likeTweet, retweet } from "../api/apiTweets"
import Add from './Add';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient, useInfiniteQuery,  useQuery} from 'react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';

const Feed = () => {

  const { ref, inView } = useInView()

  const queryClient = useQueryClient()

  const { data,isLoading, isError, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'tweets',
    getTweets,
    {
      getNextPageParam: lastPage => lastPage.meta.next,
    }
  );


  const retweetMutation = useMutation({
    mutationFn: retweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets']})
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const handleRetweet = (id) => {
    retweetMutation.mutate(id)
  }

  const likeTweetMutation = useMutation({
    mutationFn: likeTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets']})
    },
    onError: (error) => {
      console.error(error)
    }
  })


  const handleLike = (id) => {
    likeTweetMutation.mutate(id)
  }

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

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

      {data.pages.map(page => (

        <div key={page.meta.page}>

          {page.data.map(t => (

        <Link to={`/tweet/${t.id}`}>
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
          {new Date(t.created_at).toDateString().slice(4)}
                </span>

              </div>

              <div className="text-white mt-1 text-start">
                {t.content}
              </div>

                <img src={t.image} />

              <div className="flex flex-row items-center mt-3 gap-10">
                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">

                  <AiOutlineMessage size={20} />

                  <p>
                    0
                  </p>

                </div>

                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                  <AiOutlineRetweet size={20}
                      { ...t.iretweeted? {color: 'green'} : {color: 'white'}}
                      onClick={() => handleRetweet(t.id)}/>
                  <p>
                    {t.retweeted_count}
                  </p>
                </div>


                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">

                  <AiFillHeart onClick={() => handleLike(t.id)} 
                    { ...t.iliked ? {color: 'red'} : {color: 'white'} }
                    size={20} />
                  <p>
                    {t.likes_count}
                  </p>
                </div>


              </div>
            </div>

          </div>
        </div>
      </Link>



          ))}

        </div>

          ))}

            <div
              ref={ref}
            >
              {isFetchingNextPage && <p>Cargando mas cabron!!!!</p>}
              {!hasNextPage && <p>Nada mas cabron!!!!</p>}
            </div>

      </>
  )
}

export default Feed
