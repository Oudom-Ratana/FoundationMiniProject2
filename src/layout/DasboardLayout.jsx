import { Outlet } from "react-router";
import NavbarComponent from "../components/nav-footer/NavbarComponent";
import FooterComponent from "../components/nav-footer/FooterComponent";
import SideBarDashboard from "../components/layout/SideBarDashboard";
import ProductTableComponent from "../components/table/ProductTableComponent";

export default function DasboardLayout() {
  return (
    <div>
      {/* <NavbarComponent/> */}
        <section className="grid grid-cols-[200px_50px_1fr] gap-2">
          <SideBarDashboard/>
          <div></div>
          <div className="p-6">
            <Outlet />
          </div>
        </section>
      
    </div>
  )
}
