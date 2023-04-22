import { useQuery } from 'react-query'
import { getNoti } from '../api/apiNotifications'


const Noti = () => {

  const { data: noti, isLoading, isError, error } = useQuery({

    queryFn: getNoti,
    queryKey: ['tweets']
  })

  console.log(noti)

  if (isLoading) return <div>Loading</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <>

        {noti.length} Notifications Not leidas
      {noti.map(n => (
        <div key={n.id}>
          <p>Notifiacion de : {n.from_user.username}</p>
          <p>Tipo de noti: {n.notification_type}</p>
          <p>Leida?/???: {n.read}</p>
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
