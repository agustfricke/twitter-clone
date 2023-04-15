import { AiFillHeart, AiOutlineRetweet, AiOutlineMessage } from 'react-icons/ai';
import Add from './Add';
import image from "../assets/cover.png"

const Feed = () => {
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
              <p

                className="
              text-white 
              font-semibold 
              text-xl
          ">
                Home
              </p>
            </div>
          </div>
        </div>


      </div>


      <Add/>


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
        <img className="h-11 w-11 rounded-full" src={image} />
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

export default Feed
