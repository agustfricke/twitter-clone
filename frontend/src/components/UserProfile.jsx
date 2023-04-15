import { useQuery } from "react-query"
import { getUserInfo } from "../api/apiUsers"
import { AiFillHeart, AiOutlineRetweet, AiOutlineMessage , AiOutlineArrowLeft } from 'react-icons/ai';
import Add from './Add';
import image from "../assets/favicon.ico"
import banner from "../assets/cover.png"
import { IoMdCalendar } from "react-icons/io";

const UserProfile = () => {

  // const { data: user, isLoading, isError, error } = useQuery({
  //   queryFn: getUserInfo,
  //   queryKey: ['user']
  // })

  // if (isLoading) return <div>Loading</div>
  // if (isError) return <div>Error: {error.message}</div>

  return (
    <>
      <div
        className="
      border-b-[1px] 
      border-neutral-800 
      p-5 
    ">
        <div className="flex flex-row items-start gap-3">
          <div>
            <div className="flex flex-row items-center gap-2">
              <AiOutlineArrowLeft size={20} className="mr-4 hover:text-slate-200 text-slate-500 cursor-pointer"/> 
            <p

              className="
            text-white 
            font-semibold 
            text-xl
        ">
             Elon Musk 

              </p>
            </div>
            <div className="text-white mt-1 ml-4">
              <span

                className="
                text-neutral-500
                hidden
                md:block
                ">
                233 Tweets
              </span>
            </div>
          </div>
        </div>

      </div>

        <img
className="bg-cover h-[250px] w-full "
          src={banner} />

        <img
                                        src={banner}
                                        className="w-40 h-40 ml-3 object-cover -mt-20 shadow-2xl rounded-full"
                                    />

        <p className="text-start ml-4 mt-4 text-xl font-bold ">Elon Musk</p>

            <div className="text-white text-start ml-4">
              <span

                className="
                text-neutral-500
                hidden
                md:block
                ">
              @elonmusk 
              </span>

        <div className='flex gap-3 w-full p-2 text-neutral-500 '>
            <IoMdCalendar className="mt-1 mb-3" size={20}/>
            Joined March 2009
        </div>



            </div>

        <div className="

  border-b-[1px] 
  border-neutral-800 
        grid grid-cols-4 gap-4">
      <button className="
  p-5 
  cursor-pointer 
  hover:bg-neutral-900 
  transition
">
        Tweets
      </button>
      <button className="
  p-5 
  cursor-pointer 
  hover:bg-neutral-900 
  transition
">
          Replies
      </button>
      <button className="
  p-5 
  cursor-pointer 
  hover:bg-neutral-900 
  transition
">
          Media
      </button>
      <button className="
  p-5 
  cursor-pointer 
  hover:bg-neutral-900 
  transition
">
          Likes
      </button>

      </div>
      <div
        className="
  border-b-[1px] 
  border-neutral-800 
  p-5 
  cursor-pointer 
  hover:bg-neutral-900 
  transition
">
        <div className="flex flex-row items-start gap-3">
        <img className="h-11 w-11 rouned-full" src={image} />
          <div>
            <div className="flex flex-row items-center gap-2">
              <p

                className="
          text-white 
          font-semibold 
          cursor-pointer 
          hover:underline
      ">
                Elon Musk
              </p>
              <span

                className="
          text-neutral-500
          cursor-pointer
          hover:underline
          hidden
          md:block
      ">
                @elonmusk
              </span>
              <span className="text-neutral-500 text-sm">
                12/12/12
              </span>
            </div>
            <div className="text-white mt-1 text-start">
            Doing a Twitter Spaces interview in 10 mins with the
            </div>
            <div className="flex flex-row items-center mt-3 gap-10">
              <div
                className="
          flex 
          flex-row 
          items-center 
          text-neutral-500 
          gap-2 
          cursor-pointer 
          transition 
          hover:text-sky-500
      ">
                <AiOutlineMessage size={20} />
                <p>
                  23
                </p>
              </div>
              <div
                className="
          flex 
          flex-row 
          items-center 
          text-neutral-500 
          gap-2 
          cursor-pointer 
          transition 
          hover:text-green-500
      ">
                <AiOutlineRetweet size={20} />
                <p>
                  23
                </p>
              </div>

              <div
                className="
          flex 
          flex-row 
          items-center 
          text-neutral-500 
          gap-2 
          cursor-pointer 
          transition 
          hover:text-red-500
      ">
                <AiFillHeart color={'red'} size={20} />
                <p>
                  34
                </p>
              </div>
            </div>
          </div>
        </div>
        </div>

    </>
  )
}

export default UserProfile
