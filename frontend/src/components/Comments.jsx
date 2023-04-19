import { getComments } from '../api/apiComment';
import { useQuery} from 'react-query'

const Comments = ({ tweetId }) => {

  const id = tweetId

  const { data: comments, isLoading, isError, error } = useQuery(['comment', id], () => getComments(id))

  console.log(comments)

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>


  return (
    <>
      {comments.map(c => (
        <div key={c.id}>
          <p>{c.body}</p>
        </div>
      ))}
    </>
  )
}

export default Comments
