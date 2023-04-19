import { useMutation, useQueryClient } from 'react-query'
import { useFormik } from "formik";
import { addComment } from "../api/apiComment";


const AddComment = ({ tweetId }) => {

  const id = tweetId

  console.log(tweetId)

  const avatar = localStorage.getItem('avatar')

  const queryClient = useQueryClient()

  const addCommentMutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comment']})
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const genInitialValues = () => ({
  body: "",
});

  const formik = useFormik({
    initialValues: {genInitialValues},
    onSubmit: (values, { resetForm }) => {

      const { body } = values


      addCommentMutation.mutate({ body, id: id})

        resetForm({ values: genInitialValues() });
    }
  })

  return (
    <div
      className="
      border-b-[1px] 
      border-neutral-800 
      p-5 
      ">

      <form onSubmit={formik.handleSubmit} >
        <div className='flex gap-3 w-full border-b-[1px] 
          border-neutral-800 p-3'>

          <img src={`http://127.0.0.1:8000/${avatar}`} className='h-14 w-14 rounded-full ' />

          <input 
            type="text" name="body" onChange={formik.handleChange} value={formik.values.body} 
            className='bg-transparent grow outline-none ' placeholder="Add a reply..." />


        </div>

        <div className="flex justify-end">

          <button type='submit' className="bg-sky-400 hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
            Tweet
          </button>
        </div>
      </form>

    </div>
  )
}

export default AddComment 
