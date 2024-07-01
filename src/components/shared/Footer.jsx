import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="w-full bg-gray-50 py-8 border">
            <div className="">
                <div className="wrapper flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-gray-50 text-center md:justify-between">
                    {/* <img src="https://docs.material-tailwind.com/img/logo-ct-dark.png" alt="logo-ct" className="w-10" /> */}
                    <h1 className="font-bold text-3xl ">
                        <span className='text-red-600'>Medi</span>
                        <span>Camp</span>
                    </h1>
                    <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                        <li>
                            <Typography
                                as="a"
                                href="#"
                                color="blue-gray"
                                className="font-normal transition-colors hover:text-primary focus:text-primary"
                            >
                                <Link to={'/'}>Home</Link>
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                as="a"
                                href="#"
                                color="blue-gray"
                                className="font-normal transition-colors hover:text-primary focus:text-primary"
                            >
                                <Link to={'/camps'}>All Camps</Link>
                            </Typography>
                        </li>
                        <li>
                            <Typography
                                as="a"
                                href="#"
                                color="blue-gray"
                                className="font-normal transition-colors hover:text-primary focus:text-primary"
                            >
                                Contact Us
                            </Typography>
                        </li>

                    </ul>
                </div>
                <hr className="my-8 border-blue-gray-50" />
                <Typography color="blue-gray" className="text-center font-normal">
                    &copy; All rights reserved MCMS
                </Typography>
                <Typography color="blue-gray" className="text-center font-normal">
                    alampobon34@gmail.com
                </Typography>
            </div>
        </footer>
    );
}