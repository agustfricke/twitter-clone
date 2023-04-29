import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"
import Search from "./Search"
import { Toaster } from 'react-hot-toast';
import Sidebar from "./SideFoo";
import SearchFoo from "./SearchFoo";

const Layout = () => {
  return (
    <>
      <Toaster/>
      <div class="flex justify-center">
  <div class="shrink w-14 sm:w-14 md:w-64 lg:w-[350px] xl:w-[350px] ">
          <Sidebar/>
  </div>
  <div class="shrink w-[500px] pr-6">
    <Outlet/>
  </div>
  <div class="shrink w-0 sm:w-14 md:w-64 lg:2-[450px] xl:w-[450px]">
    <SearchFoo/>
  </div>
  </div>
    </>
  )
}

export default Layout
