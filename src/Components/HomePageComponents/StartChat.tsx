import { Link } from 'react-router'

export default function StartChat() {
  return (
    <div className='w-full bg-[#ffffff]'>
        <div className='container mx-auto flex items-center px-20 py-10 justify-center'>
            <div className='bg-[#E3FFFC] border border-[#B0DDD9] rounded-[28px] flex flex-col items-center justify-center gap-[18px] py-8 w-[831px] h-[293px]'>
                <h1 className="fontCreateRound text-[#000000] text-[32px]">Ready When You Are.</h1>
                <p className='fontDMSans text-[18px] text-[#747272] w-[424px] text-center'>No Pressure. No Commitment. Just A Safe Space To Talk Through Whatever Is On Your Mind.</p>
                <Link to="/talkToMindora"><button className='rounded-[31px] fontDMSans text-white bg-[#0D9488] w-[267px] h-[55px]' type='button'>Start Anonymous Chat</button></Link>
            </div>
        </div>
    </div>
  )
}