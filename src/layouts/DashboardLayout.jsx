import React, { useState } from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import useRole from '../hooks/useRole'
import Loader from '../components/shared/Loader'
import { IoClose } from 'react-icons/io5';
import { CiMenuFries } from 'react-icons/ci';
import { GoSignOut } from "react-icons/go";
import useAuth from '../hooks/useAuth';
import Sidebar from '../pages/dashboard/common/Sidebar';
import { IoHome } from "react-icons/io5";
const PARTICIPANT_MENUS = [
    {
        name: "Profile",
        address: '/profile',
    },
    {
        name: "Analytics",
        address: '/analytics',
    },
    {
        name: "Registered Camps",
        address: '/registered-camps',
    },
    {
        name: "Payment History",
        address: '/payment-history',
    }
];

const ORGANIZER_MENUS = [
    {
        name: "Profile",
        address: '/profile',
    },
    {
        name: "Add Camp",
        address: '/add-camp',
    },
    {
        name: "Manage Camps",
        address: '/manage-camps',
    },
    {
        name: "Manage Registered Camps",
        address: '/manage-registered-camps',
    },
];




const DashboardLayout = () => {
    const { role, loading: roleLoading } = useRole()
    const [toggle, setToggle] = useState(false)

    const navigate = useNavigate();
    if (roleLoading) return <Loader className={'fixed inset-0 w-full h-full'} />

    if (role && (window.location.pathname === '/dashboard' || window.location.pathname === '/dashboard/')) return <Navigate to={`/dashboard/profile`} replace='true' />

    const toggleSidebar = () => {
        setToggle(!toggle);
    };
    return (
        <div className='flex'>
            <div className={`min-h-screen border transition-all duration-500 absolute lg:static ${toggle ? '-translate-x-[256px] lg:w-0' : ''}`}>
                <Sidebar menuList={role === 'Organizer' ? ORGANIZER_MENUS : PARTICIPANT_MENUS} role={role} setToggle={setToggle} />
            </div>
            <div className={`transition-all duration-500 flex-1 ease-in-out ${toggle ? '' : 'w-[calc(100vw-256px)]'}`}>
                <nav className={`flex justify-end px-6 items-center border-b py-2 bg-black/80 ease-in-out ${toggle ? '' : ''}`}>
                    <Link to={'/'} className='mr-2'>
                        <IoHome className='w-6 h-6 text-white' />
                    </Link>
                    <button type='button' onClick={() => setToggle(!toggle)}>
                        {
                            toggle ? <IoClose className='w-6 h-6 text-white' /> : <CiMenuFries className='w-6 h-6 text-white' />
                        }
                    </button>
                </nav>
                <div className='p-4'>
                    <Outlet />
                </div>
            </div>
        </div>

    )
}

export default DashboardLayout



{/* <div className='flex'>
<div className={` h-screen border transition-all duration-500 absolute lg:static ${toggle ? '-translate-x-[256px] lg:w-0' : ''}`}>
    <Sidebar menuList={role === 'Organizer' ? ORGANIZER_MENUS : PARTICIPANT_MENUS} role={role} setToggle={setToggle} />
</div>
<div className={`transition-all duration-500 flex-1 ease-in-out ${toggle ? '' : 'w-[calc(100vw-256px)]'}`}>
    <nav className={`flex justify-end px-6 items-center border-b py-2 bg-black/80 ease-in-out ${toggle ? '' : ''}`}>
        {
            !roleLoading && role &&
            <button type='button' className='mr-2' onClick={handleSignOut}>
                <GoSignOut className='w-6 h-6 text-white' />
            </button>
        }
        <button type='button' onClick={() => setToggle(!toggle)}>
            {
                toggle ? <IoClose className='w-6 h-6 text-white' /> : <CiMenuFries className='w-6 h-6 text-white' />
            }
        </button>
    </nav>
    <div className='p-4'>
        <Outlet />
    </div>
</div>
</div> */}