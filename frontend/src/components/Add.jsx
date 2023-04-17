import { BsImage } from "react-icons/bs";
import { useMutation, useQueryClient } from 'react-query'
import image from "../assets/cover.png"
import { Formik, Field, Form } from 'formik'
import { addTweet } from "../api/apiTweets";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

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

  const genInitialValues = () => ({
  content: "",
  image: "", 
});

  const formik = useFormik({
    initialValues: {genInitialValues},
    onSubmit: (values, { resetForm }) => {
      const { image, content } = values

      const formData = new FormData()

      try { 

        if (!image) {
            addTweetMutation.mutate({ content })
        } else {
            formData.append('image', image)
            formData.append('content', content)

            addTweetMutation.mutate(formData)
        }

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

      const handleClose = () => {
        setPreview(null)
      }

    return (
      <div className="flex justify-between p-5 bg-gray-800 rounded-lg">

          <div className="left-0 top-0">
          <button className="text-slate-400 hover:text-slate-200 transition-colors" onClick={handleClose}>
            <AiFillCloseCircle size={30}/>
          </button>

          </div>

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


      </div>
      <div className='flex justify-between p-3'>

          <div class="image-upload">
    <label for="file-input">
              {!formik.values.image && 

             <BsImage className="flex 
          text-neutral-500 
          cursor-pointer 
          transition 
          mt-3
          hover:text-sky-500" size={20} />

            }
    </label>

    <input 
            type="file" name="image" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} 
              id="file-input"/>
</div>


      </div>

      <div className="flex justify-center items-center">

        {formik.values.image && <SeeImage file={formik.values.image} />}
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

export default Add
