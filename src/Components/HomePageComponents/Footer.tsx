import Logo from "../../assets/Logo.png"
import { Link } from 'react-router'

export default function Footer() {
  return (
    <div className='bg-[#F0F0F0] w-full'>
        <div className='container mx-auto flex flex-col lg:flex-row lg:items-center items-start justify-between lg:px-20 px-5 py-15'>
            <div className='flex flex-col gap-3'>
                <img className='w-[149px] h-[44px]' src={Logo} alt="" />
                <p className='text-[#747272] text-[18px] fontDMSans'>A safe space to talk. Anonymous by design.</p>
            </div>

            <div className='flex flex-col lg:items-center justify-between gap-3 py-2 lg:gap-10 fontDMSans text-[#747272] text-[18px]'>
            <a href='#about'>About</a>
            <a href='#how'>How It Works</a>
            <Link to="/resources"><p>Resources</p></Link>
            <Link to="/privacy"><p>Privacy</p></Link>
            </div>

            <p className='fontDMSans text-[18px] text-[#747272]'>© 2026 Bolt. All rights reserved.</p>

        </div>
    </div>
  )
}