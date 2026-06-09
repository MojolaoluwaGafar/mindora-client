import React from 'react'
import img from "../../assets/6af8d428e3af3bd910a1a0e7f5cf6384458e3511 (1).jpg"

export default function About() {
  return (
    <div id='about' className="w-full py-20 px-10">
      <div className='container mx-auto flex items-center justify-between gap-[73px]'>
        <img src={img} alt="illustration" className="w-[458px] h-[291px] rounded-lg" />

      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4 fontCreateRound">About Mindora</h1>
        <p className="mb-2 fontDMSans">
          Mindora is an AI-powered anonymous support platform designed to provide users with a safe, calm, and judgment-free space to talk about emotional, mental, and personal health concerns.
        </p>
        <p className="mb-4 fontDMSans">
          The platform combines conversational AI with supportive wellness resources to help users feel heard, supported, and guided whenever they need someone to talk to.
        </p>

        <ul className="grid grid-cols-2 gap-x-[77px] gap-y-[20px]">
          {["Privacy", "Emotional Support", "Judgment-Free Space", "Wellness Resources"].map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-[18px] text-[#383737] fontDMSans">
              <span className="w-[15px] h-[15px] bg-[#0D9488] rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}
