import heroImg from "../../assets/Frame 2121454976.png"

export default function HeroSection() {
  return (
    <div className="w-full hero-gradient py-20 px-10 flex items-center justify-between">
       <div className="container mx-auto flex justify-between items-center">
         <div className="flex flex-col gap-4 w-[605px] pr-2">
            <div className="bg-[#E4FFFD] rounded-[49px] w-[164px] h-[39px] flex items-center justify-center gap-2"><span className="h-3 w-3 rounded-full bg-[#0D9488] fontDiphylleia"></span> Available 24/7</div>

            <h1 className="text-[48px] leading-12 fontCreateRound">Safe support whenever you need someone to talk to.</h1>

            <p className="text-[18px] fontDMSans">Chat Anonymously with Mindora for guidance, emotional support and Health-related conversations -Without judgment, without sign-ups.</p>

            <button className="bg-[#0D9488] rounded-[31px] text-white w-[267px] h-[55px] fontDMSans" type="button">Start Anonymous Chat</button>

        </div>

        <img src={heroImg} alt="" />
       </div>
    </div>
  )
}