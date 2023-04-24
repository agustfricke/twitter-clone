import { BsTwitter } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { RiHome7Fill } from "react-icons/ri";

import { useQuery } from 'react-query'
import { no_l } from '../api/apiNotifications'
import { logout } from "../api/apiUsers";
import { useNavigate, Link } from "react-router-dom";

const SideBar = () => {

  const nav = useNavigate()

  const username = localStorage.getItem('username')

  const { data: nop } = useQuery({
    queryFn: no_l,
    queryKey: ['no_lei']
  })

  if (nop === undefined) return <div>0</div>

  function logoutUser () {
    logout()
    nav('/auth/login')
  }

  return (
    <>

      <Link to={'/'}>
        <button className="rounded-full h-14 w-14 p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer">
          <BsTwitter size={28} />
        </button>
      </Link>

      <Link to={'/'}>
        <button 
          className="rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer">
          <RiHome7Fill className="mr-3" size={28} />
          Home
        </button>
      </Link>

      <Link to={'/messages'}>
        <button 
          className="rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer">
          <HiOutlineEnvelope className="mr-3" size={28} />
          Messages
        </button>
      </Link>

      <Link to={'/notification'}>
        <button 
          className="rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer">
          <IoIosNotificationsOutline className="mr-3" size={28} />

        {nop.length} 
          Notifications
        </button>
      </Link>

      <Link to={`${username}`}>
        <button 
          className="rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer">
          <BsPersonFill className="mr-3" size={28} />
          Profile
        </button>
      </Link>

      <button 
        onClick={logoutUser} 
        className="rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer">
        <BiLogOutCircle className="mr-3" size={28} />
        Logout
      </button>

      </>
  )
}

export default SideBar
