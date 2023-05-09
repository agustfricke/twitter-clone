import { editComment } from "../api/tweets"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { Formik, Field, Form } from 'formik'

const EditComment = ({ c, close }) => {

  const queryClient = useQueryClient()

  const editCommentMutation = useMutation({
    mutationFn: editComment,
    onSuccess: () => {
      queryClient.invalidateQueries("comments")
      toast.success("Comment edited")
      close()
    },
    onError: (error) => {
      toast.error(error.message)
      close()
    }
  })

  return (

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

  )
}

export default EditComment
