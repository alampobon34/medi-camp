import { Outlet } from "react-router-dom"
import Footer from "../components/shared/Footer"
import Navbar from "../components/shared/Navbar"

const MainLayout = () => {
    return (
        <div className="bg-[#F2F4F8]">
            <Navbar />
            <div className='min-h-[63vh]'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout