import { Outlet } from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import SideBar from "./SideBar";
import Search from "./Search";


const Layout = () => {
  return (
    <>
      <Toaster/>

      <div className="flex justify-center">
        <div className="shrink w-14 sm:w-14 md:w-64 lg:w-[350px] xl:w-[350px] ">

          <SideBar/>

        </div>

        <div className="shrink w-[500px] pr-6">
          <Outlet/>
        </div>

        <div className="shrink w-0 sm:w-14 md:w-64 lg:2-[450px] xl:w-[450px]">
          
          <Search/>

        </div>
      </div>
    </>
  )
}

export default Layout
