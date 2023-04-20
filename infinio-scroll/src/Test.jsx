import { useInfiniteQuery } from 'react-query';
import React from 'react';
import { useInView } from 'react-intersection-observer'

function TweetList() {

  const { ref, inView } = useInView()

  const fetchTweets = ({ pageParam = 1 }) =>
    fetch(`http://localhost:8000/tweets/?page=${pageParam}&pages=2`)
      .then(res => res.json());

  const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery(
    'tweets',
    fetchTweets,
    {
      getNextPageParam: lastPage => lastPage.meta.next,
    }
  );


  console.log(hasNextPage)

  
  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])


  return (



    <div>
      {data?.pages?.map(page => (
        <React.Fragment key={page.meta.page}>
          {page.data.map(tweet => (
            <div key={tweet.id}>
              <p>{tweet.content}</p>
              <p>Likes: {tweet.likes_count}</p>
              <p>Retweets: {tweet.retweeted_count}</p>
            </div>
          ))}
        </React.Fragment>
      ))}

  <div>
            <div
              ref={ref}
            >
              {isFetchingNextPage && <p>Cargando mas cabron!!!!</p>}
              {!hasNextPage && <p>Nada mas cabron!!!!</p>}
            </div>
          </div>
    </div>

  );
}
export default TweetList
