import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
 
const Footer = () => {
    const navigate = useNavigate() 
    const {userInfo} = useSelector(state => state.auth) 
    const {card_product_count,wishlist_count} = useSelector(state => state.card) 
    return (
        <footer className='bg-[#f3f6fa]'>
            <div className='w-[85%] flex flex-wrap mx-auto border-b py-16 md-lg:pb-10 sm:pb-6'>
                <div className='w-3/12 lg:w-4/12 sm:w-full'>
                    <div className='flex mt-0 flex-col gap-3'>
                        <img className='mb-10 h-auto w-[200px] ' src="/images/logo.png" alt="logo" />
                    </div> 
                </div>

                <div className='w-5/12 lg:w-8/12 sm:w-full'>
                <div className='flex justify-center sm:justify-start sm:mt-6 w-full'>
                        <div>
                <h2 className='font-bold text-lg mb-2'>Usefull Links </h2>
                <div className='flex justify-between gap-[80px] lg:gap-[40px]'>
                    <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                        <li>
                            <Link>About Us </Link>
                        </li>
                        <li>
                            <Link>About Our Shop </Link>
                        </li>
                        <li>
                            <Link>Delivery Information </Link>
                        </li>
                        <li>
                            <Link>Privacy Policy </Link>
                        </li>
                        <li>
                            <Link>Blogs  </Link>
                        </li>
                    </ul>

                    <ul className='flex flex-col gap-2 text-slate-600 text-sm font-semibold'>
                        <li>
                            <Link>Our Service </Link>
                        </li>
                        <li>
                            <Link>Company Profile</Link>
                        </li>
                        <li>
                            <Link>Delivery Information </Link>
                        </li>
                       
                    </ul>

                </div>
                        </div> 
                    </div> 
                </div>
                <div className='w-4/12 lg:w-full lg:mt-6'>
                <div className='w-full flex flex-col justify-start gap-5'>
                    <h2 className='font-bold text-lg mb-2'>Join Our Shop</h2>
                    <span>Get Email updates about tour latest and shop specials offers</span>
                    <div className='h-[50px] w-full bg-white border relative'>
                        <input className='h-full bg-transparent w-full px-3 outline-0' type="text" placeholder='Enter Your Email' />
                        <button className='h-full absolute right-0 bg-[#059473] text-white uppercase px-4 font-bold text-sm'>Subscribe</button>  

                     </div> 
                     {/* <ul className='flex justify-start items-center gap-3'>
                        <li>
                            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full' href="https://www.facebook.com/profile.php?id=100063970605701"><FaFacebook/> </a>
                        </li>

                        <li>
                            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full' href="https://x.com/bimatootechnol1"><FaSquareXTwitter/> </a>
                        </li>
                        <li>
                            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full' href="https://www.linkedin.com/company/bimatech-technology/posts/?feedView=all"><FaLinkedin/> </a>
                        </li>
                        <li>
                            <a className='w-[38px] h-[38px] hover:bg-[#059473] hover:text-white flex justify-center items-center bg-white rounded-full' href="https://github.com/ToumiFourat"><FaGithub/> </a>
                        </li>

                     </ul> */}
                </div> 
            </div> 

            </div>

            <div className='w-[90%] flex flex-wrap justify-center items-center text-slate-600 mx-auto py-5 text-center'>
                <span>Copyright @DeshKriti 2024 All Rights Reserved </span>

            </div>
            <div className='hidden fixed md-lg:block w-[50px] h-[110px] bottom-3 right-2 bg-white rounded-full p-2'>
        <div className='w-full h-full flex gap-3 flex-col justify-center items-center'>
        <div onClick={() => navigate(userInfo ? '/card' : '/login') }  className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
            <span className='text-xl text-green-500'><FaCartShopping/></span>
            {
                card_product_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                    {
                        card_product_count
                    }
                </div>
            }
            
            
        </div>
        <div  onClick={() => navigate(userInfo ? '/dashboard/my-wishlist' : '/login') } className='relative flex justify-center items-center cursor-pointer w-[35px] h-[35px] rounded-full bg-[#e2e2e2]'>
            <span className='text-xl text-green-500'><FaHeart/></span>
            {
                wishlist_count !== 0 && <div className='w-[20px] h-[20px] absolute bg-red-500 rounded-full text-white flex justify-center items-center -top-[3px] -right-[5px]'>
                    {
                       wishlist_count 
                    }
                </div>
            }
            
        </div>
        </div>
    </div>

        </footer>
    );
};

export default Footer;