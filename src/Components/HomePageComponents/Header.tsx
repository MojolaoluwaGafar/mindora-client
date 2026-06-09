import Logo from "../../assets/Logo.png"
import { Link } from "react-router"
import { useNavigate } from "react-router"

export default function Header() {
  const navigate = useNavigate()
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    navigate("/aiChat")
  }
  return (
    <div className='bg-white w-full h-[103px] py-[24px] px-10 fontDMSans border-b border-[#F3F2F2]'>
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/"><img className="w-[149px]" src={Logo} alt="" /></Link>
            <div className='flex items-center justify-between gap-10'>
            <a href="#about">About</a>
            <a href="#how">How It Works</a>
            <Link to="/resources"><p>Resources</p></Link>
            <Link to="/privacy"><p>Privacy</p></Link>
            </div>

            <button onClick={handleClick} type="button" className="bg-[#0D9488] font-semibold rounded-[31px] w-[169px] h-[55px] text-white">Start Chatting</button>
        </div>
    </div>
  )
}