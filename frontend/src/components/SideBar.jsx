import { BsTwitter } from "react-icons/bs";
import { FaHashtag } from "react-icons/fa";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { RiHome7Fill } from "react-icons/ri";
import { logout } from "../api/apiUsers";
import { useNavigate } from "react-router-dom";


const SideBar = () => {

  const nav = useNavigate()

  function logoutUser () {
    logout()
    nav('/auth/login')
  }
  
  return (
    <>
    <BsTwitter className="rounded-full 
      h-14
      w-14
      p-4 
      flex 
      text-slate-200
      hover:bg-blue-300 
      hover:bg-opacity-10 
      cursor-pointer" size={28} />
      <p className="rounded-full 
      text-xl
      p-3
      flex 
      text-slate-200
      hover:bg-blue-300 
      hover:bg-opacity-10 
      cursor-pointer">
      <RiHome7Fill className="mr-3" size={28} />
        Home
      </p>
      <p className="rounded-full 
      text-xl
      p-3
      flex 
      text-slate-200
      hover:bg-blue-300 
      hover:bg-opacity-10 
      cursor-pointer">
      <HiOutlineEnvelope className="mr-3" size={28} />
        Messages
      </p>
      <p className="rounded-full 
      text-xl
      p-3
      flex 
      text-slate-200
      hover:bg-blue-300 
      hover:bg-opacity-10 
      cursor-pointer">
      <IoIosNotificationsOutline className="mr-3" size={28} />
        Notifications
      </p>
      <p className="rounded-full 
      text-xl
      p-3
      flex 
      text-slate-200
      hover:bg-blue-300 
      hover:bg-opacity-10 
      cursor-pointer">
      <BsPersonFill className="mr-3" size={28} />
        Profile
      </p>

        <button onClick={logoutUser}>Logout</button>
      
    </>

  )
}

export default SideBar
