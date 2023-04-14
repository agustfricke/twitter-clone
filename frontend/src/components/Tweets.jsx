import { useQuery } from "react-query"
import { getTweets } from "../api/apiTweets"



const Tweets = () => {

  const { data: tweets, isLoading, isError, error } = useQuery({
    queryFn: getTweets,
    queryKey: ['tweets']
  })

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <>
      {tweets.map(tweet => (
        <div key={tweet.id}>
          <h3>{tweet.content}</h3>
        </div>
      ))}
    </>
  )
}

export default Tweets
