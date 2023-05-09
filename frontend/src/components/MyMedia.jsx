
const MyMedia = ({ tweets }) => {

  return (

    <>
      {tweets.map(t => (
        <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
          <div className="flex flex-row items-start gap-3">

          <img src={`http://127.0.0.1:8000${t.image}`} />

          </div>
        </div>
      ))}
    </>

  )
}

export default MyMedia
