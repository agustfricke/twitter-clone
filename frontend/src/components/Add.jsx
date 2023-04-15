import { BsImage } from "react-icons/bs";
import { useMutation, useQueryClient } from 'react-query'
import image from "../assets/cover.png"
import { Formik, Field, Form } from 'formik'
import { addTweet } from "../api/apiTweets";
import { useNavigate } from "react-router-dom";

const Add = () => {

  const nav = useNavigate()

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
              onSubmit={(values) => {
                addTweetMutation.mutate({ ...values })
              }}
            >
        <Form>
      <div className='flex gap-3 w-full border-b-[1px] 
        border-neutral-800 p-3'>
        <img src={image} className='h-14 w-14 rounded-full ' />
        
        <Field id='content' name='content'
        className='bg-transparent grow outline-none ' placeholder="What's happening" />
      </div>
      <div className='flex justify-between p-3'>
        <BsImage className="flex 
          text-neutral-500 
          cursor-pointer 
          transition 
          mt-3
          hover:text-sky-500" size={20} />

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
