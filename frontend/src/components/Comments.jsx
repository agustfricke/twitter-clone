import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query"
import { getComments, deleteComment } from "../api/tweets"
import Loader from "./Loader"
import toast from "react-hot-toast"
import AddComment from "./AddComment"
import { Link } from "react-router-dom"
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import EditComment from "./EditComment"
import { useState } from "react"

const Comments = ({ tweet }) => {

  const queryClient = useQueryClient()
  const [show, setShow] = useState(false)

  const { data: comments, isLoading, isError, error } = useQuery({
    queryKey: ["comments", tweet.id],
    queryFn: () => getComments(tweet.id)
  })

  console.log(tweet.id)
  console.log(comments)

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries("comments")
      toast.success("Comment deleted")
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  console.log(comments)

  if (isLoading) return <Loader />
  if (isError) return toast.error(error.message)

  return (

    <>
      <AddComment tweet={tweet}/>
      {comments.map(c => (
        <div key={c.id} className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
          <div className="flex flex-row items-start gap-3">

            <img className="h-11 w-11 rounded-full" src={`http://127.0.0.1:8000${c.avatar}`} />
            <div>
              <div className="flex flex-row items-center gap-2">

                <p className="text-white font-semibold cursor-pointer hover:underline">
                  <Link to={`${c.user}`}>
                    {c.user}
                  </Link>
                </p>

                <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                  @{c.user}
                </span>

                <span className="text-neutral-500 text-sm">
                  {new Date(c.created_at).toDateString().slice(4)}
                </span>

              </div>

              <div className="text-white mt-1 text-start">
                {c.body}
              </div>

              <div className='flex justify-start gap-3 mt-4'>
                <div 
                  className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                  <BsFillTrashFill  
                    onClick={() => deleteCommentMutation.mutate(c.id)}
                    size={20} />
                </div>

                <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-yellow-300">
                    <AiFillEdit 
                    onClick={() => setShow(true)}
                      size={25} />
                  {show && <EditComment c={c} close={() => setShow(false)} />}
                </div>
              </div> 

            </div>
          </div>
        </div>
      ))}
    </>

  )
}

export default Comments
