import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getUserInfo } from "../api/apiUsers";
import { deleteTweet, userTweets, editTweet } from "../api/apiTweets";
import {
  AiFillHeart,
  AiOutlineRetweet,
  AiOutlineMessage,
  AiOutlineArrowLeft,
  AiFillEdit
} from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { IoMdCalendar } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Formik, Field, Form } from 'formik'

const UserProfile = () => {

  const { username } = useParams()

  const [show, setShow] = useState(false)

  const queryClient = useQueryClient()

  const editTweetMutation = useMutation({
    mutationFn: editTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets']})
      setShow(false)
      toast.success('Tweet edited successfully')
    },
    onError: (error) => {
      setShow(false)
      toast.error(error.message)
    }
  })

  const deleteTaskMutation = useMutation({
    mutationFn: deleteTweet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tweets']})
      toast.success('Tweet deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })


  const { data: user, isLoading: loadingUser , isError: isErrorUser , error: errorUser } = useQuery({
    queryKey: ['user', username],
    queryFn: () => getUserInfo(username),
  })

  const { data: tweets, isLoading: loadingTweets, isError: isErrorTweets, error: errorTweets } = useQuery({
    queryFn: userTweets,
    queryKey: ['tweets']
  })

  if(loadingTweets) return <div>Loading</div>
  if(isErrorTweets) return <div>Error: {errorTweets.message}</div>

  if (loadingUser) return <div>Loading</div>
  if (isErrorUser) return <div>Error: {errorUser.message}</div>

  return (
    <>


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

            <div className="text-white mt-1 ml-4">
              <span
                className="text-neutral-500 hidden md:block"
              >
                233 Tweets
              </span>
            </div>
            
          </div>
        </div>
      </div>

      <img className="bg-cover h-[250px] w-full" src={user.cover_image} />

      <div className="flex justify-between">
      <img
        src={user.avatar}
        className="w-40 h-40 ml-3 object-cover -mt-20 shadow-2xl rounded-full" />

      <Link to="/edit-profile">
        <button className="bg-sky-500 mr-7 text-white font-semibold rounded-full px-10 py-2 mt-3 ml-3 hover:bg-sky-600 transition">
          Edit 
        </button>
      </Link>

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

      </div>

      <div className="border-b-[1px] border-neutral-800 grid grid-cols-4 gap-4">

        <button className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          Tweets
        </button>

        <button className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          Replies
        </button>

        <button className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          Media
        </button>

        <button className="p-5 cursor-pointer hover:bg-neutral-900 transition">
          Likes
        </button>

      </div>

        {tweets.map(t => (
      <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
        <div className="flex flex-row items-start gap-3">

          <img className="h-11 w-11 rouned-full" src={user.avatar} />

          <div>
            <div className="flex flex-row items-center gap-2">

              <p className="text-white font-semibold cursor-pointer hover:underline">
                  {t.user}
              </p>

              <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
                @{t.user}
              </span>

              <span className="text-neutral-500 text-sm">
                  {t.created_at}
                </span>

            </div>

            <div className="text-white mt-1 text-start">
                {t.content}
            </div>

            <div className="flex flex-row items-center mt-3 gap-10">

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
                <AiOutlineMessage size={20} />
                <p>23</p>
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-green-500">
                <AiOutlineRetweet size={20} />
                <p>
                    {t.retweeted.length}
                  </p>
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <AiFillHeart color={"red"} size={20} />
                <p>
                    {t.liked.length}
                  </p>
              </div>

              <div 
                  onClick={() => deleteTaskMutation.mutate(t.id)}
                  className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500">
                <BsFillTrashFill  size={20} />
              </div>

              <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-yellow-300">
                  <button onClick={() => setShow(true)}>
                <AiFillEdit size={25} />
                  </button>
              </div>

      {show && (

        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 ">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 w-[500px] h-[200px] rounded-md">
              <p className="text-xl text-white text-center my-8 ">Edit Tweet</p>
      <Formik
        initialValues={{
                content:t.content ,
        }}
        onSubmit={(values, actions) => {
          editTweetMutation.mutate({ ...t, ...values })
          actions.resetForm({
            values: {
              content: t.content,
            },
          })}}
      >
              <Form>
                <Field name='content' id='content' className="bg-gray-700 text-white rounded-full p-2 ml-5" />
              <button type='submit'className="bg-sky-500 mr-7 text-white font-semibold rounded-full px-10 py-2 mt-3 ml-3 hover:bg-sky-600 transition">
                  Edit
              </button>
              </Form>
        </Formik>
          </div>
        </div>

      )}

            </div>
          </div>
        </div>
      </div>

        ))}
    </>
  );
};

export default UserProfile;
