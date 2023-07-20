
const MyMedia = ({ tweets }) => {

  return (

    <>
      {tweets.map && tweets.map(t => (
          <div className="flex flex-row items-start gap-3">

          <img src={t.image} />

          </div>
      ))}
    </>

  )
}

export default MyMedia
