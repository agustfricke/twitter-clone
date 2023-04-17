import { BsImage } from "react-icons/bs";
import { useMutation, useQueryClient } from 'react-query'
import image from "../assets/cover.png"
import { Formik, Field, Form } from 'formik'
import { addTweet } from "../api/apiTweets";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";

const Add = () => {

  const nav = useNavigate()

  const avatar = localStorage.getItem('avatar')

  const queryClient = useQueryClient()

  const addTweetMutation = useMutation({
    mutationFn: addTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets']})
      nav('/')
    },
    onError: (error) => {
      console.error(error)
    }
  })

  const genInitialValues = () => ({
  content: "",
  image: "", 
});

  const formik = useFormik({
    initialValues: {genInitialValues},
    validationSchema: yup.object({
      image: yup.mixed().required('Image is required')
      .test('fileSize', 'File too large', (value) => value && value.size < 1024 * 1024 )
      .test('fileFormat', 'Unsupported Format', (value) => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
    }),
    onSubmit: (values, { resetForm }) => {
      const { image, content } = values

      const formData = new FormData()

      try { 

      formData.append('image', image)
      formData.append('content', content)

      addTweetMutation.mutate(formData)
        resetForm({ values: genInitialValues() });
      }catch (error) {
        console.log(error)
      }
    }
  })

const SeeImage = ({ file }) => {


  const [preview, setPreview] = useState({});

  if(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
      setPreview(reader.result)
  };

    return (
      <div className="items-center bg-white  p-5">
        <img src={preview} width={250} height={250}  />
      </div>
    )
  }
}

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
type="text" name="content" onChange={formik.handleChange} value={formik.values.content} 
        className='bg-transparent grow outline-none ' placeholder="What's happening" />

      {/* <input type="file" name="image" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} /> */}

        {formik.errors.image && (
          <div>{formik.errors.image}</div>
        )}


      </div>
      <div className='flex justify-between p-3'>

          <div class="image-upload">
    <label for="file-input">
             <BsImage className="flex 
          text-neutral-500 
          cursor-pointer 
          transition 
          mt-3
          hover:text-sky-500" size={20} />
    </label>

    <input 
            type="file" name="image" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} 
              id="file-input"/>
</div>



        <button type='submit' className="bg-sky-400 hover:bg-sky-500 p-2 px-5 rounded-full text-white font-bold">
          Tweet
        </button>
      </div>
</form>

        {formik.values.image && <SeeImage file={formik.values.image} />}
    </div>

  )
}

export default Add
