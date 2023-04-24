import { useQuery, useQueryClient, useMutation } from "react-query";
import { getNoti, read_noti, no_l } from '../api/apiNotifications'


const Noti = () => {

  const queryClient = useQueryClient()

  const readMutation = useMutation({
    mutationFn: read_noti,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noti']})
      console.log('Noti leida')
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const { data: nop } = useQuery({
    queryFn: no_l,
    queryKey: ['no_lei']
  })

  const { data: noti, isLoading, isError, error } = useQuery({
    queryFn: getNoti,
    queryKey: ['noti']
  })

  console.log(noti)
  console.log(nop)

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>
  if (noti === undefined) return <div>0</div>

  return (
    <>

        {noti.length} En total
      <button onClick={() => readMutation.mutate()}>Mark as Read</button>
      {noti.map(n => (
        <div key={n.id}>
          <p>Notifiacion de : {n.from_user.username}</p>
          <p>Tipo de noti: {n.notification_type}</p>
          {n.is_read ? <p>Leida!!</p> : <p>No Leida </p>}
          {/* {n.tweet.map(t => ( */}
          {/*   <p>Tweet: {t.content}</p> */}
          {/* ))} */}
          <p>Notifiacion de : {n.tweet?.content}</p>
          <p>--- Final de notifiacion --</p>
          <br/>
        </div>
      ))}
    </>
  )
}

export default Noti
