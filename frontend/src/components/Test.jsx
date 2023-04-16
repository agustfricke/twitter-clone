import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { BsImage } from "react-icons/bs";
import { useMutation, useQueryClient } from 'react-query'
import image from "../assets/cover.png"
import { Formik, Field, Form } from 'formik'
import { addTweet } from "../api/apiTweets";
import { useNavigate } from "react-router-dom";

const SeeImage = ({ file }) => {


  const [preview, setPreview] = useState({});

  if(file) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
      setPreview(reader.result)
  };

    return (
      <div>
        <img src={preview}  />
      </div>
    )
  }
}

const Test = () => {

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

  const formik = useFormik({
    initialValues: {
      image: '',
      content: ''
    },
    validationSchema: yup.object({
      image: yup.mixed().required('Image is required')
      .test('fileSize', 'File too large', (value) => value && value.size < 1024 * 1024 )
      .test('fileFormat', 'Unsupported Format', (value) => value && ['image/jpg', 'image/jpeg', 'image/png'].includes(value.type))
    }),
    onSubmit: (actions) => {
      const { image } = formik.values
      const { content } = formik.values

      const formData = new FormData()

      try { 
      formData.append('image', image)
      formData.append('content', content)


      addTweetMutation.mutate(formData)
 actions.resetForm();
        // formData.delete('image')
        // formData.delete('content')

      }catch (error) {
        console.log(error)
      }
    }
  })
  return (
    <>
      <form onSubmit={formik.handleSubmit} >
        <input type="text" name="content" onChange={formik.handleChange} />
      <input type="file" name="image" onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])} />
        {formik.errors.image && (
          <div>{formik.errors.image}</div>
        )}
        <button type="submit">Submit</button>
      </form>
        {formik.values.image && <SeeImage file={formik.values.image} />}
    </>
  )
}

export default Test
