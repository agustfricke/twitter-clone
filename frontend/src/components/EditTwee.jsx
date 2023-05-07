import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useFormik } from "formik";
import { editTweet } from "../api/tweets";
import toast from "react-hot-toast";
import { AiOutlineCloseCircle } from "react-icons/ai";

const EditTweet = ({ tweet, close }) => {

  const queryClient = useQueryClient()

  const editTweetMutation = useMutation({
    mutationFn: editTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets']})
      toast.success('Tweet updated')
      close()
    }, 
    onError: (error) => {
      toast.error(error.message)
      close()
    }
  })

  const formik = useFormik({
    initialValues: {
      content: tweet.content,
      image: tweet.image,
    },
    onSubmit: (values) => {
      const { content, image } = values
      const formData = new FormData()
      formData.append('content', content)
      formData.append('id', tweet.id)
      if(image) {
        formData.append('image', image)
      }
      editTweetMutation.mutate(formData)
      console.log(formData)
    },
  })

  return (

    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#202327] h-[700px] w-[600px] rounded-md">
        <button onClick={close}>
          <AiOutlineCloseCircle className="text-white text-2xl absolute top-3 right-3 cursor-pointer" />
        </button>

        <div className="flex min-h-full items-center justify-center sm:px-6 lg:px-8">
          <div className='m-1 p-1 '>
            <div className="w-[300px]  max-w-md space-y-8 md:w-[400px] lg:w-[400px]">

              <div >
                <h2 className="mt-6 text-center text-3xl text-grey">
                  Edit Profile
                </h2>
              </div>

              <form onSubmit={formik.handleSubmit}>
                <input 
                  id='content' name='content'
                  onChange={formik.handleChange} value={formik.values.content}
                  placeholder='About you'
                  className="
                  border-b-[1px] 
                  border-neutral-800 
                  w-full
                  p-5 
                  cursor-pointer 
                  my-3
                  bg-transparent outline-neutral-800 
                  "
                />

                <input 
                  className="my-4"
                  type="file" name="image" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} 
                />

                <button type='submit' className="bg-sky-700 mt-11  my-2 w-full hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
                  Save Changes
                </button>

              </form>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default EditTweet
