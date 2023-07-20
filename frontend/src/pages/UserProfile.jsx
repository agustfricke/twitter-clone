import { useParams, Link} from "react-router-dom"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { userProfile } from "../api/users"
import Loader from "../components/Loader"
import {
  AiOutlineArrowLeft,
} from "react-icons/ai";
import { IoMdCalendar } from "react-icons/io";
import EditProfile from "../components/EditProfile";
import MyTweets from "../components/MyTweets"
import MyLikes from "../components/MyLikes"
import MyRe from "../components/MyRe"
import MyMedia from "../components/MyMedia"
import FollowBtn from "../components/FollowBtn"
import toast from "react-hot-toast"
import { getUserTweets } from "../api/tweets"

const UserProfile = () => {

  const { username } = useParams()
  const myUser = localStorage.getItem('username')

  const [isEditing, setIsEditing] = useState(false)
  const [show, setShow] = useState(0)

  const { data: user, isLoading: loadingUser , isError: isErrorUser } = useQuery({
    queryKey: ['user', username],
    queryFn: () => userProfile(username),
  })

  const { data: tweets, isLoading: loadingTweets, isError: isErrorTweets, error: errorTweets } = useQuery({
    queryFn: () => getUserTweets(username),
    queryKey: ['user_tweets']
  })

  if(loadingTweets) return <Loader />
  if(isErrorTweets) return <div>Error: {errorTweets.message}</div>

  if (loadingUser ) return <Loader/>
  if (isErrorUser ) return toast.error('Error')


  return (
    <>
      {isEditing && (
      <EditProfile user={user} close={() => setIsEditing(false)} />
        )}
      <div className="border-b-[1px] border-neutral-800 p-5">
        <div className="flex flex-row items-start gap-3">
          <div>

            <div className="flex flex-row items-center gap-2">
              <Link to={'/'}>
                <AiOutlineArrowLeft
                  size={20}
                  className="mr-4 hover:text-slate-200 text-slate-500 cursor-pointer"
                />
              </Link>
              <p className="text-white font-semibold text-xl">
                {user.username}
              </p>
            </div>
          </div>
        </div>
      </div>


      <img className="bg-black h-[250px] w-full" src={user.cover_image} />

      <div className="flex justify-between">

        <img
          src={user.avatar}
          className="w-40 h-40 ml-3 object-cover border-8 border-black -mt-20 shadow-2xl rounded-full" />

        <div>

          {myUser === username ? (

            <button 
              onClick={() => setIsEditing(true)}
              className="bg-sky-500 mr-7 text-white font-semibold rounded-full px-7 py-3 mt-3 ml-3 hover:bg-sky-600 transition">
              Edit 
            </button>

          ) : (

              <>
                <FollowBtn user={user} page={true}/>
              </>

            )}

        </div>

      </div>

      <p className="text-start ml-4 mt-4 text-xl font-bold ">
        {user.username}
      </p>

      <div className="text-white text-start ml-4">

        <span className="text-neutral-500 hidden md:block">
          @{user.username}
        </span>

        <div className="flex gap-3 w-full p-2 text-neutral-500 ">
          <IoMdCalendar className="mt-1 mb-3" size={20} />
          Joined {' '}
          {new Date(user.date_joined).toDateString().slice(4)}
        </div>

        <div className="flex gap-3 w-full p-2 text-neutral-500 ">
          <span className="text-white">{user.followers}</span> Followers {' '} <span className="text-white">{user.following}</span> Following
        </div>

      </div>

      <div className="border-b-[1px] border-neutral-800 grid grid-cols-4 gap-4">

        <button 
          onClick={() => setShow(0)}
          className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          Tweets
        </button>

        <button  
          onClick={() => setShow(1)}
          className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          Retweets
        </button>

        <button  
          onClick={() => setShow(2)}
          className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          Media
        </button>

        <button  
          onClick={() => setShow(3)}
          className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          Likes
        </button>

      </div>

        {show === 0 && <MyTweets user={user} tweets={tweets} myUser={myUser} />}
        {show === 1 && <MyRe user={user} />}
        {show === 2 && <MyMedia tweets={tweets} />}
        {show === 3 && <MyLikes user={user} />}

    </>
  )
}

export default UserProfile
