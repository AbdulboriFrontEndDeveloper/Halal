import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { instance } from '../API/API';
import { useEffect } from 'react';
import { FaTwitter } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";


const SocialLink = () => {
    const [getSocial, setGetSocial] = useState()
    const socialMedia = {
        twitter: <FaTwitter className='w-5 h-5 ' />,
        facebook: <FaFacebook className='w-5 h-5 ' />,
        telegram: <FaTelegramPlane className='w-5 h-5 ' />,
        instagram: <FaInstagramSquare className='w-5 h-5 ' />,
    }
    const fetchSocialLink = async () => {
        try {
            const resp = await instance.get("/social_link/")
            setGetSocial(resp.data)
            // console.log(resp.data);
        } catch (error) {
            console.log(error);
            toast.error('Qandaydir xatolik yuz berdi')
        }
    }
    useEffect(() => {
        fetchSocialLink()
    }, [])


    return (
        <ul className='flex gap-2'>
            {
                getSocial?.length ? getSocial.map((social, i) => (
                    <li key={i} className='w-10 h-10 rounded-full flex items-center justify-center bg-red-500 text-white'>
                        <a href={social?.link}>
                            {social ? socialMedia[social?.social] : null }
                        </a>
                    </li>
                )) : null
            }

        </ul>
    )
}

export default SocialLink