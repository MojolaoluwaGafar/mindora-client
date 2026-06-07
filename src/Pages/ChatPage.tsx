import React from 'react'
import Logo from "../assets/Logo.png"
import { Link } from 'react-router'

export default function ChatPage() {
  return (
    <div className='bg-white w-full h-[103px] py-5 px-10 fontDMSans'>
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/"><img className="w-[149px]" src={Logo} alt="" /></Link>

            <button type="button" className="bg-[#FFE9E9] rounded-[48px] w-[126px] h-[47px] text-[#C00909]">End Chat</button>
        </div>
    </div>
    )
}