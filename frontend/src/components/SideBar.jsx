import { BsTwitter } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { RiHome7Fill } from "react-icons/ri";
import SidebarLink from "./SidebarLink";
import { useQuery } from "@tanstack/react-query";
import { getNoLeidas } from "../api/noti";
import { useNavigate } from "react-router-dom";


const SideBar = () => {

  const username = localStorage.getItem('username')
  const nav = useNavigate()

  function logout() {
    localStorage.clear()
    nav('/login')
  }

  const { data } = useQuery({
    queryKey: ["notiNoLei"],
    queryFn: getNoLeidas,
  })

  return (

    <div className="sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="space-y-2.5  mt-3 mb-2.5 xl:ml-24">
          <BsTwitter size={28} className="ml-4 mb-2" />
        <SidebarLink link='' text="Home" Icon={<RiHome7Fill size={28}/>} />
        <SidebarLink link={username} text="Profile" Icon={<BsPersonFill size={28}/>} />
        <SidebarLink link='/contacts' text="Chat" Icon={<HiOutlineEnvelope size={28}/>} />
        <SidebarLink link='/noti'text="Notifications" num={data?.length} Icon={<IoIosNotificationsOutline size={28}/>} />
          <button 
          className="ml-1 rounded-full text-xl p-4 flex text-slate-200 hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer"
          onClick={logout}><BiLogOutCircle size={28}/></button>
      </div>
    </div>
  )
}

export default SideBar
