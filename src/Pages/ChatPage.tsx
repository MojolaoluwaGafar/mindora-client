import React, { useState } from 'react'
import Logo from "../assets/Logo.png"
import { Link } from 'react-router'
import { ArrowUp } from 'lucide-react'

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    const newMessages = [...messages, { sender: "user", text: input }]
    setMessages(newMessages)
    setInput("")

    // Simulate AI response
    // setTimeout(() => {
    //   setMessages([...newMessages, { sender: "ai", text: "I hear you. Thank you for sharing." }])
    // }, 800)
  }

  return (
    <div className='w-full'>
        <div className="container mx-auto flex flex-col items-center">
            <div className='flex items-center justify-between w-full border-b border-[#F3F2F2] py-[24px] px-10'>
            <Link to="/"><img className="w-[149px]" src={Logo} alt="" /></Link>
            <button
             type="button" className="bg-[#FFE9E9] rounded-[48px] w-[126px] h-[47px] font-semibold text-[#C00909]">
             End Chat
            </button>            
            </div>

            <div className="bg-[#EDF8F7] w-full h-[458px] flex flex-col justify-center">
                {messages.length === 0 ? (
                    <div className="bg-white border border-[#C8CCCC] rounded-[28px] h-[156px] w-lg lg:w-[747px] flex flex-col items-center justify-center mx-auto">
                        <h1 className="fontCreateRound text-[32px] text-[#000000]">Hi, I'm Mindora.</h1>
                        <p className="text-[#747272] fontDMSans text-[18px]">
                            Tell me how you're feeling. I'm here, and this is private.
                        </p>
                    </div>
                    ) : (
                    <div className="flex-1 overflow-y-auto px-10 pt-14 pb-8 space-y-8">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`p-4 rounded-2xl w-fit max-w-[70%] shadow ${msg.sender === "user"
                                ? "bg-[#0D9488] ml-auto rounded-t-[40px] rounded-bl-[40px] rounded-br-[7px] text-white text-right"
                                : "bg-[#FFFFFF] border border-[#C8CCCC] text-gray-800"
                        }`}>{msg.text}
                    </div>
                ))}
            </div>
        )}
    </div>


       {messages.length === 0 && (
        <div className="flex flex-wrap gap-8 px-6 py-10">
          {["I feel anxious", "I need support", "I can’t sleep", "I’m overwhelmed with work"].map((text) => (
            <button
            type='button'
            key={text}
            onClick={() => setInput(text)}
            className="bg-[#FAFAFA] border border-[#C8CCCC] rounded-full px-6 py-2 text-[#0A1916] text-[18px] hover:bg-gray-100 fontDMSans font-semibold">
              {text}
            </button>
          ))}
        </div>
      )}
      <div className="w-[80%] relative mt-15 mb-5 ">
        <input type="text" value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder="Share what’s on your mind..."
        className="border border-[#C8CCCC] rounded-[50px] h-[79px] w-full px-6 pr-20" />
        <button type="button" onClick={handleSend} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#0D9488] text-white rounded-full w-[55px] h-[55px] flex items-center justify-center">
        <ArrowUp size={30} />
        </button>
      </div>

      <p className='text-center text-[#747272] text-[14px]'>Mindora is an AI companion, not a substitute for professional care.</p>
        </div>
    </div>
  )
}
