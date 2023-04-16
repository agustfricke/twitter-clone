import { BsImage } from "react-icons/bs";
import { useMutation, useQueryClient } from 'react-query'
import image from "../assets/cover.png"
import { Formik, Field, Form } from 'formik'
import { addTweet } from "../api/apiTweets";
import { useNavigate } from "react-router-dom";

const Add = () => {

  const nav = useNavigate()

  const avatar = localStorage.getItem('avatar')

  const queryClient = useQueryClient()

  const addTweetMutation = useMutation({
    mutationFn: addTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets']})
    },
    onError: (error) => {
      console.error(error)
    }
  })

  return (
    <div
      className="
      border-b-[1px] 
      border-neutral-800 
      p-5 
      ">
      
      <Formik
        initialValues={{
          content: '',
        }}
        onSubmit={(values, actions) => {
          addTweetMutation.mutate({ ...values })
          actions.resetForm({
            values: {
              content: '',
            },
          })}}
      >
        <Form>
      <div className='flex gap-3 w-full border-b-[1px] 
        border-neutral-800 p-3'>
            <img src={`http://127.0.0.1:8000/${avatar}`} className='h-14 w-14 rounded-full ' />
        
        <Field id='content' name='content'
        className='bg-transparent grow outline-none ' placeholder="What's happening" />
      </div>
      <div className='flex justify-end p-3'>

        <button type='submit' className="bg-sky-400 hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
          Tweet
        </button>
      </div>

</Form>
</Formik>
    </div>

  )
}

export default Add
