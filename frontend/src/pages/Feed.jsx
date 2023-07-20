import { getTweets } from "../api/tweets"
import { AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react';
import Loader from '../components/Loader';
import { toast } from "react-hot-toast";
import AddTweet from "../components/AddTweet";
import Like from "../components/Like";
import Rt from "../components/Rt";


const Feed = () => {

  const { ref, inView } = useInView()

  const { data, isLoading, isError, error, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
  ['tweets'],
  getTweets,
    {
      getNextPageParam: (lastPage) => lastPage.meta.next
    }
  )

  console.log(data)

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])

  if (isLoading) return <Loader/>
  if (isError) return toast.error(error.message)

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

      <AddTweet/>

    {data?.pages.map(page => (

      <div key={page.meta.page}>

        {page.data.map(t => (

            <>
            <div key={t.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
              <div className="flex flex-row items-start gap-3">

                <img className="h-11 w-11 rounded-full" src={t.avatar} />

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

          <Link to={`tweet/${t.id}`}>

                  <div className="text-white mt-1 text-start">
                    {t.content}
                  </div>
                      </Link>

                  <img src={t.image} />

                  <div className="flex flex-row items-center mt-3 gap-10">
                    <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">

          <Link to={`tweet/${t.id}`}>

                      <AiOutlineMessage size={20} />
                      </Link>

                      <p>
                        {t.parent.length}
                      </p>

                    </div>

                    <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                        <Rt t={t}/>
                      <p>
                        {t.retweets_count}
                      </p>
                    </div>


                    <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">

                      <Like t={t}/>

                      <p>
                        {t.likes_count}
                      </p>
                    </div>


                  </div>
                </div>

              </div>
            </div>

              {!isLoading && data.pages.length === 0 && <p>No results</p>}
              {!isLoading && data.pages.length  > 0 && hasNextPage && (
                <div ref={ref} >
                  {isLoading || isFetchingNextPage ? <Loader/> : null}
                </div>
              )}
            </>

        ))}
      </div>
    ))}
    </>

  )
}

export default Feed
