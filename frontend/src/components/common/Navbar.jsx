import React, { useState, useEffect } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NavbarLinks } from "../../../data/navbar-links"
import { fetchCourseCategories } from './../../services/operations/courseDetailsAPI';

import ProfileDropDown from '../core/Auth/ProfileDropDown'
import MobileProfileDropDown from '../core/Auth/MobileProfileDropDown'

import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdKeyboardArrowDown } from "react-icons/md"




const Navbar = () => {
    // console.log("Printing base url: ", import.meta.env.VITE_APP_BASE_URL);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    // console.log('USER data from Navbar (store) = ', user)
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);


    const fetchSublinks = async () => {
        try {
            setLoading(true)
            const res = await fetchCourseCategories();
            // const result = await apiConnector("GET", categories.CATEGORIES_API);
            // const result = await apiConnector('GET', 'http://localhost:4000/api/v1/course/showAllCategories');
            // console.log("Printing Sublinks result:", result);
            setSubLinks(res);
        }
        catch (error) {
            console.log("Could not fetch the category list = ", error);
        }
        setLoading(false)
    }

    // console.log('data of store  = ', useSelector((state)=> state))


    useEffect(() => {
        fetchSublinks();
    }, [])


    // when user click Navbar link then it will hold yellow color
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }


    // when user scroll down , we will hide navbar , and if suddenly scroll up , we will show navbar 
    const [showNavbar, setShowNavbar] = useState('top');
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        window.addEventListener('scroll', controlNavbar);

        return () => {
            window.removeEventListener('scroll', controlNavbar);
        }
    },)

    // control Navbar
    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY)
                setShowNavbar('hide')

            else setShowNavbar('show')
        }

        else setShowNavbar('top')

        setLastScrollY(window.scrollY);
    }



    return (
        <nav className={`z-[10] flex h-16 w-full items-center justify-center border-b border-gray-200/50 backdrop-blur-xl bg-white/70 translate-y-0 transition-all ${showNavbar} shadow-lg shadow-gray-300/30`}>
             {/* <nav className={` fixed flex items-center justify-center w-full h-16 z-[10] translate-y-0 transition-all text-white ${showNavbar}`}> */}
            <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
                {/* logo */}
                <Link to="/" className="transform transition-transform duration-300 hover:scale-105">
                    <img src="https://pub-b365ff8e20e448c3a7257b35173d9a38.r2.dev/Nesolearn%20ID%20images/3d_NSN_ID_logo-removebg-preview.png" width={160} height={42} loading='lazy' alt="Logo" />
                </Link>

                {/* Nav Links - visible for only large devices*/}
                <ul className='hidden sm:flex gap-x-6 text-gray-800'>
                    {
                        NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {
                                    link.title === "Catalog" ? (
                                        <div
                                            className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName")
                                                ? "bg-[#4a9d63] backdrop-blur-md text-white rounded-xl p-2 px-4 border border-[#4a9d63]/30 shadow-lg shadow-[#4a9d63]/20"
                                                : "text-gray-800 rounded-xl p-2 px-4 hover:bg-gray-100/80 hover:backdrop-blur-md hover:border hover:border-gray-200 transition-all duration-300"
                                                }`}
                                        >
                                            <p className="font-medium">{link.title}</p>
                                            <MdKeyboardArrowDown className="transition-transform group-hover:rotate-180 duration-300" />
                                            {/* drop down menu */}
                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] 
                                                    flex-col rounded-2xl backdrop-blur-xl bg-white/95 border border-gray-200/60 p-4 text-gray-800 opacity-0 transition-all duration-300 group-hover:visible 
                                                    group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px] shadow-2xl shadow-gray-400/30"
                                            >
                                                <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-white/95 backdrop-blur-xl border-l border-t border-gray-200/60"></div>
                                                {loading ? (<p className="text-center ">Loading...</p>)
                                                    : subLinks.length ? (
                                                        <>
                                                            {subLinks?.map((subLink, i) => (
                                                                <Link
                                                                    to={`/catalog/${subLink.name
                                                                        .split(" ")
                                                                        .join("-")
                                                                        .toLowerCase()}`}
                                                                    className="rounded-xl bg-transparent py-4 pl-4 hover:bg-gradient-to-r hover:from-[#4a9d63]/10 hover:to-transparent transition-all duration-300 font-medium"
                                                                    key={i}
                                                                >
                                                                    <p>{subLink.name}</p>
                                                                </Link>
                                                            ))}
                                                        </>
                                                    ) : (
                                                        <p className="text-center">No Courses Found</p>
                                                    )}
                                            </div>
                                        </div>
                                    ) : (
                                        <Link to={link?.path}>
                                            <p className={`${matchRoute(link?.path) 
                                                ? "bg-[#4a9d63] backdrop-blur-md text-white border border-[#4a9d63]/30 shadow-lg shadow-[#4a9d63]/20" 
                                                : "text-gray-800 hover:bg-gray-100/80 hover:backdrop-blur-md hover:border hover:border-gray-200"} 
                                                rounded-xl p-2 px-4 transition-all duration-300 font-medium`}>
                                                {link.title}
                                            </p>
                                        </Link>)
                                }
                            </li>
                        ))}
                </ul>




                {/* Login/SignUp/Dashboard */}
                <div className='flex gap-x-4 items-center'>
                    {
                        user && user?.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className="relative group">
                                <AiOutlineShoppingCart className="text-[2.35rem] text-gray-800 hover:bg-gray-100/80 hover:backdrop-blur-md rounded-full p-2 duration-300 transform group-hover:scale-110" />
                                {totalItems > 0 && (
                                    <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-[#4a9d63] backdrop-blur-md text-center text-xs font-bold text-white shadow-lg animate-pulse">
                                        {totalItems}
                                    </span>
                                )}
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className={` px-5 py-2 rounded-xl transition-all duration-300 font-medium transform hover:scale-105
                                 ${matchRoute('/login') 
                                    ? 'bg-[#4a9d63] text-white backdrop-blur-md border-2 border-[#4a9d63]/40 shadow-lg shadow-[#4a9d63]/30' 
                                    : 'text-gray-800 border border-gray-300 hover:bg-gray-100/80 hover:backdrop-blur-md hover:border-gray-400 hover:shadow-lg hover:shadow-gray-300/30'} `}
                                >
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className={` px-5 py-2 rounded-xl transition-all duration-300 font-medium transform hover:scale-105
                                 ${matchRoute('/signup') 
                                    ? 'bg-[#4a9d63] text-white backdrop-blur-md border-2 border-[#4a9d63]/40 shadow-lg shadow-[#4a9d63]/30' 
                                    : 'text-gray-800 border border-gray-300 hover:bg-gray-100/80 hover:backdrop-blur-md hover:border-gray-400 hover:shadow-lg hover:shadow-gray-300/30'} `}
                                >
                                    Sign Up
                                </button>
                            </Link>
                        )
                    }

                    {/* for large devices */}
                    {token !== null && <ProfileDropDown />}

                    {/* for small devices */}
                    {token !== null && <MobileProfileDropDown />}

                </div>
            </div>
        </nav>
    )
}

export default Navbar
