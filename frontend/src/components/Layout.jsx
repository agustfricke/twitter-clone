import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"
import Search from "./Search"
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
      <Toaster/>
      <div class="grid md:grid-cols-3 gap-1 px-2 text-center ">

        <div className="text-white ml-[300px]"><SideBar/></div>
        <div className="border-x-[1px] border-neutral-800"><Outlet/></div>
        <div className="mr-[220px]  ml-5 mt-2"> <Search/> </div>

      </div>
    </>
  )
}

export default Layout
