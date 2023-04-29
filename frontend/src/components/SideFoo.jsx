import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import SidebarLink from "./SidebarLink";
import { BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";
import { IoIosNotificationsOutline } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { RiHome7Fill } from "react-icons/ri";


function Sidebar() {

  return (
    <div className="sm:flex flex-col items-center xl:items-start xl:w-[340px] p-2 fixed h-full">
      <div className="space-y-2.5  mt-3 mb-2.5 xl:ml-24">
          <BsTwitter size={28} className="ml-4" />
        <SidebarLink text="Home" Icon={<RiHome7Fill size={28}/>} />
        <SidebarLink text="Profile" Icon={<BsPersonFill size={28}/>} />
        <SidebarLink text="Chat" Icon={<HiOutlineEnvelope size={28}/>} />
        <SidebarLink text="Notifications" Icon={<IoIosNotificationsOutline size={28}/>} />
        <SidebarLink text="Logout" Icon={<BiLogOutCircle size={28}/>} />
      </div>
    </div>
  );
}

export default Sidebar;
