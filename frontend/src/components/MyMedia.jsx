
const MyMedia = ({ tweets }) => {

  return (

    <>
      {tweets.map(t => (
          <div className="flex flex-row items-start gap-3">

          <img src={`http://127.0.0.1:8000${t.image}`} />

          </div>
      ))}
    </>

  )
}

export default MyMedia
