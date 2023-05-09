import { BsTwitter } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { RiHome7Fill } from "react-icons/ri";
import SidebarLink from "./SidebarLink";

const SideBar = () => {

  const username = localStorage.getItem('username')

  return (

    <div className="sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="space-y-2.5  mt-3 mb-2.5 xl:ml-24">
          <BsTwitter size={28} className="ml-4 mb-2" />
        <SidebarLink link='' text="Home" Icon={<RiHome7Fill size={28}/>} />
        <SidebarLink link={username} text="Profile" Icon={<BsPersonFill size={28}/>} />
        <SidebarLink link='/chat' text="Chat" Icon={<HiOutlineEnvelope size={28}/>} />
        <SidebarLink link='/noti' text="Notifications" Icon={<IoIosNotificationsOutline size={28}/>} />
          <button 
          className="ml-1 rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer"
          onClick={() => localStorage.clear()}><BiLogOutCircle size={28}/></button>
      </div>
    </div>
  )
}

export default SideBar
