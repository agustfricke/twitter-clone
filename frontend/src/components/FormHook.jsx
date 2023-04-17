import { useState } from 'react'

const FormHook = ({ onSubmit, values }) => {

  const [content, setContent] = useState('' || values.content)
  const [image, setImage] = useState('' || values.image)

  const handleChangeContent = (e) => setContent(e.target.value)
  const handleChangeImage = (e) => setImage(e.target.files[0])

  const formData = new FormData()
  formData.append('image', image)

    
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ content, formData})
    setContent('')
    setImage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={content} onChange={handleChangeContent} />
      <input type="file" value={image} onChange={handleChangeImage} />
      <button type="submit">Submit</button>
    </form>
  )
}

export default FormHook
