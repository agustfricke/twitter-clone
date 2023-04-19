import { useState } from 'react';
import { getComments, deleteComment, editComment } from '../api/apiComment';
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { Link } from 'react-router-dom';
import { BsFillTrashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { Formik, Field, Form } from 'formik'

const Comments = ({ tweetId }) => {

  const id = tweetId

  const queryClient = useQueryClient()

  const [show, setShow] = useState(false)

  const myUser = localStorage.getItem('username')

  const { data: comments, isLoading, isError, error } = useQuery(['comment', id], () => getComments(id))

  const editCommentMutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment']})
      setShow(false)
      toast.success('Comment edited successfully')
    },
    onError: (error) => {
      setShow(false)
      toast.error(error)
    }
  })

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment']})
      toast.success('Comment deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })


  console.log(comments)

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>


  return (
    <>
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

                {myUser === c.user && (
                  <div className='flex justify-start gap-3 mt-4'>
              <div 
                  onClick={() => deleteCommentMutation.mutate(c.id)}
                  className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <BsFillTrashFill  size={20} />
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-yellow-300">
                  <button onClick={() => setShow(true)}>
                <AiFillEdit size={25} />
                  </button>
              </div>
                 </div> 
                  )}

      {show && (

        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 w-[500px] h-[200px] rounded-md">
              <p className="text-xl text-white text-center my-8 ">Edit Comment</p>
      <Formik
        initialValues={{
                body: c.body,
        }}
        onSubmit={(values) => {
          editCommentMutation.mutate({ id: c.id, body: values.body, tweet: c.tweet})}}
      >
              <Form>
                <Field name='body' id='body' className="bg-gray-700 text-white rounded-full p-2 ml-5" />
              <button type='submit'className="bg-sky-500 mr-7 text-white font-semibold rounded-full px-10 py-2 mt-3 ml-3 hover:bg-sky-600 transition">
                  Edit
              </button>
              </Form>
              </Formik>
          </div>
        </div>

      )}


              </div>
              </div>
        </div>
      ))}
    </>
  )
}

export default Comments
