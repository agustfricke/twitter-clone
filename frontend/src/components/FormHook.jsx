import { useState } from 'react'

const FormHook = ({ onSubmit, values }) => {

  const [content, setContent] = useState('' || values.content)
  const [image, setImage] = useState('' || values.image)

  const handleChangeContent = (e) => setContent(e.target.value)
  const handleChangeImage = (e) => setImage(e.target.value)
    
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ content, image })
    setContent('')
    setImage('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={content} onChange={handleChangeContent} />
      <input type="file" value={image} onChange={handleChangeImage} />
    </form>
  )
}

export default FormHook
