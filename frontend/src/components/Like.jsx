import { AiFillHeart } from 'react-icons/ai'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { like } from '../api/tweets'

const Like = ({ t, user  }) => {

  const queryClient = useQueryClient()

  const likeMutation = useMutation({
    mutationFn: like,
    onSuccess: () => {
      queryClient.invalidateQueries('tweets')
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const found = t.liked.some((key) => {
    if(key == user){
      return true
    } else {
      return false
    }
  })


  return (
    <AiFillHeart 
      onClick={() => likeMutation.mutate(t.id)}
      { ...t.iliked || found ? {color: 'red'} : {color: 'white'} }
      size={20} />
  )
}

export default Like
