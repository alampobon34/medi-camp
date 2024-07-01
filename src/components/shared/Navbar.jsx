import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CiMenuFries } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { Button, Typography } from '@material-tailwind/react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';
import Loader from './Loader';

const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal text-primary text-[16px]"
        >
            <Link to="/" className="flex items-center">
                Home
            </Link>
        </Typography>
        <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-normal text-primary text-[16px]"
        >
            <Link to="/camps" className="flex items-center">
                Available Camps
            </Link>
        </Typography>

    </ul>
);
const Navbar = () => {
    const { user, logOut, loading } = useAuth()
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const { role, loading: roleLoading } = useRole()


    const handleSignOut = () => {
        logOut().then(() => {
            navigate('/login')
        }).catch(e => console.log(e))
    }

    return (
        <div className="relative border bg-white">
            <nav className="wrapper py-4 flex items-center justify-between">
                <div className="flex items-center">
                    {/* <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-8 mr-2" /> */}
                    <Link to={'/'} className="text-primary font-bold text-xl">
                        <span className='text-red-600'>Medi</span>
                        <span>Camp</span>
                    </Link>
                </div>
                <div className="hidden space-x-4 lg:flex">
                    {navList}
                </div>

                <div className="flex items-center gap-4">
                    {!user ? (
                        loading ? <Loader className={'!w-5 !h-5'} /> : <Link to="/login" className="">
                            <Button className=''>Join Us</Button>
                        </Link>
                    ) : (
                        <div className="relative">
                            <img
                                src={user?.photoURL}
                                alt="Profile"
                                className="h-8 w-8 rounded-full cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />
                            {dropdownOpen && (
                                <div className="z-20 absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2">
                                    <div className="px-4 py-2 bg-gray-100 cursor-default">{user.displayName}</div>
                                    <Link to="/dashboard" className="block px-4 py-2 text-primary hover:bg-gray-100">Dashboard</Link>
                                    <button type='button' onClick={handleSignOut} className="block px-4 py-2 text-primary hover:bg-gray-100 w-full text-start">Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                    <button
                        className="text-black lg:hidden"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {
                            menuOpen ? <IoClose /> : <CiMenuFries />
                        }
                    </button>
                </div>
            </nav>
            <div className={`${menuOpen ? 'block' : 'hidden'} z-10 absolute top-16 w-full border bg-white`}>
                {navList}
            </div>
        </div>
    );
};

export default Navbar;
